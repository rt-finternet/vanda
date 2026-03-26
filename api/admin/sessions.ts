/**
 * Vercel Serverless: GET /api/admin/sessions
 *
 * List active sessions.
 */

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { gt, desc } from "drizzle-orm";
import { getDb } from "../_lib/db";
import { requireMethod, jsonOk, jsonError } from "../_lib/helpers";
import { accessSessions } from "../../drizzle/schema";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!requireMethod(req, res, "GET")) return;

  try {
    const db = await getDb();
    const now = new Date();
    const sessions = await db.select().from(accessSessions)
      .where(gt(accessSessions.expiresAt, now))
      .orderBy(desc(accessSessions.createdAt));
    return jsonOk(res, sessions);
  } catch (err: any) {
    console.error("[Vercel] admin/sessions error:", err);
    return jsonError(res, err.message || "Internal server error", 500);
  }
}
