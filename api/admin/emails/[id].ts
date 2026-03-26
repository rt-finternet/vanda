/**
 * Vercel Serverless: DELETE /api/admin/emails/:id
 *
 * Delete an allowed email.
 */

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { eq } from "drizzle-orm";
import { getDb } from "../../_lib/db";
import { requireMethod, jsonOk, jsonError } from "../../_lib/helpers";
import { allowedEmails } from "../../../drizzle/schema";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!requireMethod(req, res, "DELETE")) return;

  try {
    const id = Number(req.query.id);
    if (isNaN(id)) {
      return jsonError(res, "Invalid email ID", 400);
    }

    const db = await getDb();
    await db.delete(allowedEmails).where(eq(allowedEmails.id, id));

    return jsonOk(res, { success: true });
  } catch (err: any) {
    console.error("[Vercel] admin/emails/delete error:", err);
    return jsonError(res, err.message || "Internal server error", 500);
  }
}
