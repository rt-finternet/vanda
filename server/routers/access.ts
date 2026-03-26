import { publicProcedure, router } from "../_core/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import crypto from "node:crypto";
import jwt from "jsonwebtoken";
import { eq, and, gt } from "drizzle-orm";
import { allowedEmails, accessSessions, accessLog } from "../../drizzle/schema";
import { getDb } from "../db";
import { notifyOwner } from "../_core/notification";
import { ENV } from "../_core/env";
import { sendPortalPinEmail } from "../pinEmail";
import { checkRateLimit } from "../rateLimiter";
import { getSessionCookieOptions } from "../_core/cookies";
import { nanoid } from "nanoid";

const ACCESS_COOKIE = "units_sg_access";
const DEFAULT_PIN_EXPIRY_MINUTES = 10;

/** Generate a cryptographically random 6-digit PIN */
function generateDynamicPin(): string {
  let pin = "";
  for (let i = 0; i < 6; i++) {
    pin += crypto.randomInt(0, 10).toString();
  }
  return pin;
}

function getClientIp(ctx: any): string | undefined {
  const forwarded = ctx.req.headers["x-forwarded-for"];
  if (forwarded) {
    const first = Array.isArray(forwarded) ? forwarded[0] : forwarded.split(",")[0];
    return first?.trim();
  }
  return ctx.req.socket?.remoteAddress;
}

function getAccessToken(ctx: any, inputToken?: string | null): string | null {
  if (inputToken) return inputToken;
  const cookies = ctx.req.headers.cookie;
  if (!cookies) return null;
  const match = cookies.match(new RegExp(`(?:^|;\\s*)${ACCESS_COOKIE}=([^;]+)`));
  return match ? match[1] : null;
}

export const accessRouter = router({
  /** Step 1: User enters email, we validate and send PIN */
  requestPin: publicProcedure
    .input(z.object({ email: z.string().email() }))
    .mutation(async ({ input, ctx }) => {
      const email = input.email.toLowerCase();

      // Rate limiting: max 3 PIN requests per email per 10 minutes
      const rateCheck = checkRateLimit(email, 3, 10 * 60 * 1000);
      if (!rateCheck.allowed) {
        const minutes = Math.ceil((rateCheck.retryAfterSeconds ?? 600) / 60);
        throw new TRPCError({
          code: "TOO_MANY_REQUESTS",
          message: `Too many PIN requests. Please try again in ${minutes} minute${minutes !== 1 ? "s" : ""}. Maximum 3 requests per 10 minutes.`,
        });
      }

      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });

      // Check if email is in allowed list
      const result = await db.select().from(allowedEmails)
        .where(and(eq(allowedEmails.email, email), eq(allowedEmails.isActive, true)))
        .limit(1);

      const allowed = result.length > 0 ? result[0] : null;

      if (!allowed) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "This email address is not authorised for access. Please contact your Contact at Finternet Labs.",
        });
      }

      const expiryMinutes = DEFAULT_PIN_EXPIRY_MINUTES;

      // Static PIN path: user has a defaultPin set, no email needed
      if (allowed.defaultPin) {
        const ip = getClientIp(ctx);
        const ua = ctx.req.headers["user-agent"] as string || undefined;
        await db.insert(accessLog).values({ email, action: "pin_requested_static", ipAddress: ip, userAgent: ua });

        return {
          success: true,
          message: `Please enter your assigned PIN to access the portal.`,
          pinToken: null,
        };
      }

      // Dynamic PIN path: generate PIN, embed in JWT, email it
      const pin = generateDynamicPin();

      const pinToken = jwt.sign(
        {
          email,
          pin,
          name: allowed.name || null,
          organization: allowed.organization || null,
          purpose: "pin-verification",
        },
        ENV.cookieSecret,
        { expiresIn: `${expiryMinutes}m` }
      );

      let deliveryMessage = `A 6-digit PIN has been sent to ${email}. It expires in ${expiryMinutes} minutes.`;

      try {
        await sendPortalPinEmail({
          to: email,
          pin,
          recipientName: allowed.name ?? null,
          organization: allowed.organization ?? null,
          expiresInMinutes: expiryMinutes,
        });
      } catch (emailError) {
        const emailFailureReason = emailError instanceof Error ? emailError.message : "Unknown email delivery error";
        console.error("[Access] Failed to send PIN email:", emailError);

        let ownerFallbackDelivered = false;
        try {
          await notifyOwner({
            title: `UNITS|SG Portal Access PIN fallback for ${email}`,
            content: `PIN: ${pin}\n\nRequested by: ${allowed.name || email}\nOrganization: ${allowed.organization || "N/A"}\n\nThis PIN expires in ${expiryMinutes} minutes. Direct email delivery failed with: ${emailFailureReason}. This fallback notification was sent to the project owner.`,
          });
          ownerFallbackDelivered = true;
        } catch (notifyError) {
          console.error("[Access] Failed to send owner fallback notification:", notifyError);
        }

        deliveryMessage = ownerFallbackDelivered
          ? `We generated a 6-digit PIN for ${email}, but email delivery is currently unavailable. The project owner has been notified with a fallback copy. Your PIN expires in ${expiryMinutes} minutes.`
          : `We generated a 6-digit PIN for ${email}, but email delivery is currently unavailable and the fallback notification also failed. Please contact the administrator immediately. Your PIN expires in ${expiryMinutes} minutes.`;
      }

      const ip = getClientIp(ctx);
      const ua = ctx.req.headers["user-agent"] as string || undefined;
      await db.insert(accessLog).values({ email, action: "pin_requested_dynamic", ipAddress: ip, userAgent: ua });

      return {
        success: true,
        message: deliveryMessage,
        pinToken,
      };
    }),

  /** Step 2: User enters PIN, we validate and create session */
  verifyPin: publicProcedure
    .input(z.object({
      email: z.string().email(),
      pin: z.string().length(6),
      pinToken: z.string().nullish(),
    }))
    .mutation(async ({ input, ctx }) => {
      const email = input.email.toLowerCase();
      let valid = false;

      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });

      if (input.pinToken) {
        // Dynamic PIN path: verify JWT + PIN match (stateless)
        try {
          const decoded = jwt.verify(input.pinToken, ENV.cookieSecret) as {
            email: string;
            pin: string;
            purpose: string;
          };

          if (decoded.purpose !== "pin-verification") {
            throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid token purpose." });
          }
          if (decoded.email !== email) {
            throw new TRPCError({ code: "UNAUTHORIZED", message: "Email mismatch. Please request a new PIN." });
          }
          if (decoded.pin !== input.pin) {
            throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid PIN. Please check and try again." });
          }
          valid = true;
        } catch (err: any) {
          if (err instanceof TRPCError) throw err;
          if (err.name === "TokenExpiredError") {
            throw new TRPCError({ code: "UNAUTHORIZED", message: "Your PIN has expired. Please request a new one." });
          }
          throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid PIN token. Please request a new PIN." });
        }
      } else {
        // Static PIN path: verify against DB
        const emailRecord = await db.select().from(allowedEmails)
          .where(and(eq(allowedEmails.email, email), eq(allowedEmails.isActive, true)))
          .limit(1);

        if (emailRecord.length > 0 && emailRecord[0].defaultPin && emailRecord[0].defaultPin === input.pin) {
          valid = true;
          // Update access stats
          await db.update(allowedEmails).set({
            accessCount: (emailRecord[0].accessCount || 0) + 1,
            lastAccessAt: new Date(),
          }).where(eq(allowedEmails.id, emailRecord[0].id));
        }
      }

      if (!valid) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid or expired PIN. Please request a new one.",
        });
      }

      // Create session
      const sessionToken = nanoid(64);
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

      await db.insert(accessSessions).values({
        email,
        sessionToken,
        expiresAt,
      });

      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.cookie(ACCESS_COOKIE, sessionToken, {
        ...cookieOptions,
        maxAge: 24 * 60 * 60 * 1000,
      });

      const ip = getClientIp(ctx);
      const ua = ctx.req.headers["user-agent"] as string || undefined;
      await db.insert(accessLog).values({ email, action: "pin_verified", ipAddress: ip, userAgent: ua });

      return { success: true, email, sessionToken };
    }),

  /** Check if current session is valid */
  checkSession: publicProcedure
    .input(z.object({ sessionToken: z.string() }).optional())
    .query(async ({ input, ctx }) => {
      const token = getAccessToken(ctx, input?.sessionToken);
      if (!token) {
        return { authenticated: false, email: null };
      }

      const db = await getDb();
      if (!db) return { authenticated: false, email: null };

      const now = new Date();
      const result = await db.select().from(accessSessions)
        .where(
          and(
            eq(accessSessions.sessionToken, token),
            gt(accessSessions.expiresAt, now),
          )
        )
        .limit(1);

      if (result.length === 0) {
        return { authenticated: false, email: null };
      }

      return { authenticated: true, email: result[0].email };
    }),

  /** Logout from portal */
  logout: publicProcedure.mutation(async ({ ctx }) => {
    const token = getAccessToken(ctx);
    if (token) {
      const db = await getDb();
      if (db) {
        await db.delete(accessSessions).where(eq(accessSessions.sessionToken, token));
      }
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(ACCESS_COOKIE, { ...cookieOptions, maxAge: -1 });
    }
    return { success: true };
  }),
});
