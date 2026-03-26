/**
 * Vercel Serverless: /api/admin/emails
 *
 * GET  - List all allowed emails
 * POST - Add a new allowed email
 */

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { desc } from "drizzle-orm";
import { getDb } from "../_lib/db";
import { requireMethod, jsonOk, jsonError } from "../_lib/helpers";
import { allowedEmails } from "../../drizzle/schema";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!requireMethod(req, res, ["GET", "POST"])) return;

  try {
    const db = await getDb();

    if (req.method === "GET") {
      const emails = await db.select().from(allowedEmails).orderBy(desc(allowedEmails.createdAt));
      return jsonOk(res, emails);
    }

    // POST - Add email
    const { email, name, organization, defaultPin } = req.body || {};

    if (!email || typeof email !== "string") {
      return jsonError(res, "Email is required", 400);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return jsonError(res, "Invalid email format", 400);
    }

    if (defaultPin && (typeof defaultPin !== "string" || defaultPin.length !== 6 || !/^\d{6}$/.test(defaultPin))) {
      return jsonError(res, "Static PIN must be exactly 6 digits", 400);
    }

    try {
      await db.insert(allowedEmails).values({
        email: email.toLowerCase(),
        name: name || null,
        organization: organization || null,
        defaultPin: defaultPin || null,
      });
      return jsonOk(res, { success: true }, 201);
    } catch (err: any) {
      if (err.code === "ER_DUP_ENTRY") {
        return jsonError(res, "This email already exists in the allowed list.", 409);
      }
      throw err;
    }
  } catch (err: any) {
    console.error("[Vercel] admin/emails error:", err);
    return jsonError(res, err.message || "Internal server error", 500);
  }
}
