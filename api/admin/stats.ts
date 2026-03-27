/**
 * Vercel Serverless: GET /api/admin/stats
 *
 * Dashboard statistics: total emails, active emails, active sessions, total logs.
 */

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { gt, sql } from "drizzle-orm";
import { getDb } from "../_lib/db.js";
import { requireMethod, jsonOk, jsonError } from "../_lib/helpers.js";
import { allowedEmails, accessSessions, accessLog } from "../../drizzle/schema.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!requireMethod(req, res, "GET")) return;

  try {
    const db = await getDb();
    const now = new Date();

    const [emailRows] = await db.select({
      total: sql<number>`COUNT(*)`,
      active: sql<number>`SUM(CASE WHEN ${allowedEmails.isActive} = true THEN 1 ELSE 0 END)`,
    }).from(allowedEmails);

    const [sessionRows] = await db.select({
      count: sql<number>`COUNT(*)`,
    }).from(accessSessions).where(gt(accessSessions.expiresAt, now));

    const [logRows] = await db.select({
      count: sql<number>`COUNT(*)`,
    }).from(accessLog);

    return jsonOk(res, {
      totalEmails: Number(emailRows?.total ?? 0),
      activeEmails: Number(emailRows?.active ?? 0),
      activeSessions: Number(sessionRows?.count ?? 0),
      totalLogs: Number(logRows?.count ?? 0),
    });
  } catch (err: any) {
    console.error("[Vercel] admin/stats error:", err);
    return jsonError(res, err.message || "Internal server error", 500);
  }
}
