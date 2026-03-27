/**
 * Vercel Serverless: PATCH /api/admin/emails/:id/toggle
 *
 * Toggle an allowed email's active status.
 */

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { eq } from "drizzle-orm";
import { getDb } from "../../../_lib/db.js";
import { requireMethod, jsonOk, jsonError } from "../../../_lib/helpers.js";
import { allowedEmails } from "../../../../drizzle/schema.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!requireMethod(req, res, "PATCH")) return;

  try {
    const id = Number(req.query.id);
    if (isNaN(id)) {
      return jsonError(res, "Invalid email ID", 400);
    }

    const { isActive } = req.body || {};
    if (typeof isActive !== "boolean") {
      return jsonError(res, "isActive boolean is required", 400);
    }

    const db = await getDb();
    await db.update(allowedEmails).set({ isActive }).where(eq(allowedEmails.id, id));

    return jsonOk(res, { success: true });
  } catch (err: any) {
    console.error("[Vercel] admin/emails/toggle error:", err);
    return jsonError(res, err.message || "Internal server error", 500);
  }
}
