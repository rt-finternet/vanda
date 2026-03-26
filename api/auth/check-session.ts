/**
 * Vercel Serverless: GET /api/auth/check-session
 *
 * Checks if the current session (via cookie or query param) is valid.
 */

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { eq, and, gt } from "drizzle-orm";
import { getDb } from "../_lib/db";
import { requireMethod, jsonOk, jsonError, getAccessTokenFromCookies } from "../_lib/helpers";
import { accessSessions } from "../../drizzle/schema";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!requireMethod(req, res, "GET")) return;

  try {
    const token = (req.query.sessionToken as string) || getAccessTokenFromCookies(req);

    if (!token) {
      return jsonOk(res, { authenticated: false, email: null });
    }

    const db = await getDb();
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
      return jsonOk(res, { authenticated: false, email: null });
    }

    return jsonOk(res, { authenticated: true, email: result[0].email });
  } catch (err: any) {
    console.error("[Vercel] check-session error:", err);
    return jsonError(res, err.message || "Internal server error", 500);
  }
}
