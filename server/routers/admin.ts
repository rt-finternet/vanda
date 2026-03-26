import { publicProcedure, router } from "../_core/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { eq, gt, desc, sql } from "drizzle-orm";
import { allowedEmails, accessSessions, accessLog } from "../../drizzle/schema";
import { getDb } from "../db";

/**
 * Admin router for managing stakeholder access.
 * 
 * NOTE: We use publicProcedure here because admin access is gated by the PIN-based
 * AccessContext on the client side. The admin dashboard is only accessible to
 * authenticated stakeholders who have passed the PIN gate. In a future iteration,
 * we could add server-side admin role checks based on the access session email.
 */

async function requireDb() {
  const db = await getDb();
  if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });
  return db;
}

export const adminRouter = router({
  /** List all allowed emails */
  listEmails: publicProcedure.query(async () => {
    const db = await requireDb();
    return db.select().from(allowedEmails).orderBy(desc(allowedEmails.createdAt));
  }),

  /** Add a new allowed email */
  addEmail: publicProcedure
    .input(z.object({
      email: z.string().email(),
      name: z.string().optional(),
      organization: z.string().optional(),
      defaultPin: z.string().length(6).optional(),
    }))
    .mutation(async ({ input }) => {
      const db = await requireDb();
      try {
        await db.insert(allowedEmails).values({
          email: input.email.toLowerCase(),
          name: input.name || null,
          organization: input.organization || null,
          defaultPin: input.defaultPin || null,
        });
        return { success: true };
      } catch (err: any) {
        if (err.code === "ER_DUP_ENTRY") {
          throw new TRPCError({ code: "CONFLICT", message: "This email already exists in the allowed list." });
        }
        throw err;
      }
    }),

  /** Toggle email active status */
  toggleEmail: publicProcedure
    .input(z.object({ id: z.number(), isActive: z.boolean() }))
    .mutation(async ({ input }) => {
      const db = await requireDb();
      await db.update(allowedEmails).set({ isActive: input.isActive }).where(eq(allowedEmails.id, input.id));
      return { success: true };
    }),

  /** Delete an allowed email */
  deleteEmail: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = await requireDb();
      await db.delete(allowedEmails).where(eq(allowedEmails.id, input.id));
      return { success: true };
    }),

  /** List access logs */
  listLogs: publicProcedure
    .input(z.object({ limit: z.number().min(1).max(500).default(100) }).optional())
    .query(async ({ input }) => {
      const db = await requireDb();
      const limit = input?.limit ?? 100;
      return db.select().from(accessLog).orderBy(desc(accessLog.createdAt)).limit(limit);
    }),

  /** List active sessions */
  listSessions: publicProcedure.query(async () => {
    const db = await requireDb();
    const now = new Date();
    return db.select().from(accessSessions)
      .where(gt(accessSessions.expiresAt, now))
      .orderBy(desc(accessSessions.createdAt));
  }),

  /** Revoke a session */
  revokeSession: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = await requireDb();
      await db.delete(accessSessions).where(eq(accessSessions.id, input.id));
      return { success: true };
    }),

  /** Dashboard stats */
  stats: publicProcedure.query(async () => {
    const db = await requireDb();
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

    return {
      totalEmails: Number(emailRows?.total ?? 0),
      activeEmails: Number(emailRows?.active ?? 0),
      activeSessions: Number(sessionRows?.count ?? 0),
      totalLogs: Number(logRows?.count ?? 0),
    };
  }),
});
