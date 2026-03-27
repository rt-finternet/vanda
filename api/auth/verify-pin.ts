/**
 * Vercel Serverless: POST /api/auth/verify-pin
 *
 * Validates PIN (dynamic via JWT or static via DB), creates a session,
 * sets a session cookie, and returns the session token.
 */

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { eq, and } from "drizzle-orm";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";
import { getDb } from "../_lib/db.js";
import { requireMethod, jsonOk, jsonError, setAccessCookie, getClientIp } from "../_lib/helpers.js";
import { allowedEmails, accessSessions, accessLog } from "../../drizzle/schema.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!requireMethod(req, res, "POST")) return;

  try {
    const { email: rawEmail, pin, pinToken } = req.body || {};

    if (!rawEmail || typeof rawEmail !== "string") {
      return jsonError(res, "Email is required", 400);
    }
    if (!pin || typeof pin !== "string" || pin.length !== 6) {
      return jsonError(res, "A valid 6-digit PIN is required", 400);
    }

    const email = rawEmail.toLowerCase();
    const db = await getDb();
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      return jsonError(res, "Server configuration error", 500);
    }

    let valid = false;

    if (pinToken) {
      // Dynamic PIN path: verify JWT + PIN match
      try {
        const decoded = jwt.verify(pinToken, jwtSecret) as {
          email: string;
          pin: string;
          purpose: string;
        };

        if (decoded.purpose !== "pin-verification") {
          return jsonError(res, "Invalid token purpose.", 401);
        }
        if (decoded.email !== email) {
          return jsonError(res, "Email mismatch. Please request a new PIN.", 401);
        }
        if (decoded.pin !== pin) {
          return jsonError(res, "Invalid PIN. Please check and try again.", 401);
        }
        valid = true;
      } catch (err: any) {
        if (err.name === "TokenExpiredError") {
          return jsonError(res, "Your PIN has expired. Please request a new one.", 401);
        }
        return jsonError(res, "Invalid PIN token. Please request a new PIN.", 401);
      }
    } else {
      // Static PIN path: verify against DB
      const emailRecord = await db.select().from(allowedEmails)
        .where(and(eq(allowedEmails.email, email), eq(allowedEmails.isActive, true)))
        .limit(1);

      if (emailRecord.length > 0 && emailRecord[0].defaultPin && emailRecord[0].defaultPin === pin) {
        valid = true;
        // Update access stats
        await db.update(allowedEmails).set({
          accessCount: (emailRecord[0].accessCount || 0) + 1,
          lastAccessAt: new Date(),
        }).where(eq(allowedEmails.id, emailRecord[0].id));
      }
    }

    if (!valid) {
      return jsonError(res, "Invalid or expired PIN. Please request a new one.", 401);
    }

    // Create session
    const sessionToken = nanoid(64);
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    await db.insert(accessSessions).values({
      email,
      sessionToken,
      expiresAt,
    });

    setAccessCookie(res, sessionToken);

    const ip = getClientIp(req);
    const ua = req.headers["user-agent"] || undefined;
    await db.insert(accessLog).values({ email, action: "pin_verified", ipAddress: ip, userAgent: ua });

    return jsonOk(res, { success: true, email, sessionToken });
  } catch (err: any) {
    console.error("[Vercel] verify-pin error:", err);
    return jsonError(res, err.message || "Internal server error", 500);
  }
}
