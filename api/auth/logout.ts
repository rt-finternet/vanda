/**
 * Vercel Serverless: POST /api/auth/logout
 *
 * Deletes the session from DB and clears the session cookie.
 */

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { eq } from "drizzle-orm";
import { getDb } from "../_lib/db.js";
import { requireMethod, jsonOk, jsonError, getAccessTokenFromCookies, clearAccessCookie } from "../_lib/helpers.js";
import { accessSessions } from "../../drizzle/schema.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!requireMethod(req, res, "POST")) return;

  try {
    const token = getAccessTokenFromCookies(req);

    if (token) {
      const db = await getDb();
      await db.delete(accessSessions).where(eq(accessSessions.sessionToken, token));
      clearAccessCookie(res);
    }

    return jsonOk(res, { success: true });
  } catch (err: any) {
    console.error("[Vercel] logout error:", err);
    return jsonError(res, err.message || "Internal server error", 500);
  }
}
