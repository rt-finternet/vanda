/**
 * Vercel Serverless: POST /api/auth/request-pin
 *
 * Validates email against allowed list, generates a dynamic PIN (or uses static),
 * sends PIN via Resend email, returns pinToken JWT.
 */

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { eq, and } from "drizzle-orm";
import jwt from "jsonwebtoken";
import crypto from "node:crypto";
import { getDb } from "../_lib/db.js";
import { requireMethod, jsonOk, jsonError, getClientIp } from "../_lib/helpers.js";
import { allowedEmails, accessLog } from "../../drizzle/schema.js";

const DEFAULT_PIN_EXPIRY_MINUTES = 10;

function generateDynamicPin(): string {
  let pin = "";
  for (let i = 0; i < 6; i++) {
    pin += crypto.randomInt(0, 10).toString();
  }
  return pin;
}

async function sendPinEmail(to: string, pin: string, recipientName: string | null, organization: string | null, expiresInMinutes: number) {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL || "noreply@finternetlab.io";

  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured");
  }

  const greeting = recipientName ? `Dear ${recipientName}` : "Hello";
  const orgLine = organization ? `<p style="color:#888;font-size:13px;">Organization: ${organization}</p>` : "";

  const html = `
    <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:24px;">
      <h2 style="color:#F59E0B;margin-bottom:16px;">UNITS|SG Portal Access</h2>
      <p>${greeting},</p>
      <p>Your access PIN is:</p>
      <div style="background:#0A1628;color:#F59E0B;font-size:32px;font-weight:bold;letter-spacing:8px;text-align:center;padding:20px;border-radius:12px;margin:16px 0;">
        ${pin}
      </div>
      <p style="color:#888;font-size:13px;">This PIN expires in ${expiresInMinutes} minutes.</p>
      ${orgLine}
      <hr style="border:none;border-top:1px solid #eee;margin:24px 0;" />
      <p style="color:#aaa;font-size:11px;">Powered by Finternet Labs</p>
    </div>
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [to],
      subject: `UNITS|SG Portal Access PIN`,
      html,
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Resend API error: ${res.status} ${errorText}`);
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!requireMethod(req, res, "POST")) return;

  try {
    const { email: rawEmail } = req.body || {};
    if (!rawEmail || typeof rawEmail !== "string") {
      return jsonError(res, "Email is required", 400);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(rawEmail)) {
      return jsonError(res, "Invalid email format", 400);
    }

    const email = rawEmail.toLowerCase();
    const db = await getDb();

    // Check if email is in allowed list
    const result = await db.select().from(allowedEmails)
      .where(and(eq(allowedEmails.email, email), eq(allowedEmails.isActive, true)))
      .limit(1);

    const allowed = result.length > 0 ? result[0] : null;

    if (!allowed) {
      return jsonError(res, "This email address is not authorised for access. Please contact your Contact at Finternet Labs.", 403);
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      return jsonError(res, "Server configuration error", 500);
    }

    const expiryMinutes = DEFAULT_PIN_EXPIRY_MINUTES;

    // Static PIN path
    if (allowed.defaultPin) {
      const ip = getClientIp(req);
      const ua = req.headers["user-agent"] || undefined;
      await db.insert(accessLog).values({ email, action: "pin_requested_static", ipAddress: ip, userAgent: ua });

      return jsonOk(res, {
        success: true,
        message: "Please enter your assigned PIN to access the portal.",
        pinToken: null,
      });
    }

    // Dynamic PIN path
    const pin = generateDynamicPin();

    const pinToken = jwt.sign(
      {
        email,
        pin,
        name: allowed.name || null,
        organization: allowed.organization || null,
        purpose: "pin-verification",
      },
      jwtSecret,
      { expiresIn: `${expiryMinutes}m` }
    );

    let deliveryMessage = `A 6-digit PIN has been sent to ${email}. It expires in ${expiryMinutes} minutes.`;

    try {
      await sendPinEmail(email, pin, allowed.name ?? null, allowed.organization ?? null, expiryMinutes);
    } catch (emailError) {
      console.error("[Vercel] Failed to send PIN email:", emailError);
      deliveryMessage = `We generated a 6-digit PIN for ${email}, but email delivery is currently unavailable. Please contact the administrator. Your PIN expires in ${expiryMinutes} minutes.`;
    }

    const ip = getClientIp(req);
    const ua = req.headers["user-agent"] || undefined;
    await db.insert(accessLog).values({ email, action: "pin_requested_dynamic", ipAddress: ip, userAgent: ua });

    return jsonOk(res, { success: true, message: deliveryMessage, pinToken });
  } catch (err: any) {
    console.error("[Vercel] request-pin error:", err);
    return jsonError(res, err.message || "Internal server error", 500);
  }
}
