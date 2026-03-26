/**
 * Vercel Serverless: GET /api/admin/logs
 *
 * List access logs with optional limit parameter.
 */

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { desc } from "drizzle-orm";
import { getDb } from "../_lib/db";
import { requireMethod, jsonOk, jsonError } from "../_lib/helpers";
import { accessLog } from "../../drizzle/schema";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!requireMethod(req, res, "GET")) return;

  try {
    const limit = Math.min(Math.max(Number(req.query.limit) || 100, 1), 500);
    const db = await getDb();
    const logs = await db.select().from(accessLog).orderBy(desc(accessLog.createdAt)).limit(limit);
    return jsonOk(res, logs);
  } catch (err: any) {
    console.error("[Vercel] admin/logs error:", err);
    return jsonError(res, err.message || "Internal server error", 500);
  }
}
