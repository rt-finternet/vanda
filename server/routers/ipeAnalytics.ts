/**
 * IPE Analytics Router
 * Tracks persona selections, cross-persona clicks, AI Guide queries,
 * next-section clicks, and page views for engagement analysis.
 */
import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { ipeAnalytics } from "../../drizzle/schema";
import { desc, sql } from "drizzle-orm";

const trackEventInput = z.object({
  eventType: z.enum([
    "persona_select",
    "cross_persona_click",
    "ai_guide_query",
    "next_section_click",
    "page_view",
  ]),
  personaId: z.string().max(64),
  sectionPath: z.string().max(256),
  targetPersonaId: z.string().max(64).optional(),
  targetSection: z.string().max(256).optional(),
  queryText: z.string().max(500).optional(),
  sessionToken: z.string().max(128).optional(),
});

export const ipeAnalyticsRouter = router({
  /**
   * Track an IPE event. Fire-and-forget from the frontend.
   * Public procedure -- no auth required (analytics should work for all visitors).
   */
  trackEvent: publicProcedure
    .input(trackEventInput)
    .mutation(async ({ input }) => {
      try {
        const db = await getDb();
        if (!db) {
          console.warn("[IPE Analytics] Database not available, skipping event");
          return { success: false };
        }

        await db.insert(ipeAnalytics).values({
          eventType: input.eventType,
          personaId: input.personaId,
          sectionPath: input.sectionPath,
          targetPersonaId: input.targetPersonaId ?? null,
          targetSection: input.targetSection ?? null,
          queryText: input.queryText ?? null,
          sessionToken: input.sessionToken ?? null,
        });

        return { success: true };
      } catch (error) {
        console.error("[IPE Analytics] Failed to track event:", error);
        return { success: false };
      }
    }),

  /**
   * Get analytics summary (admin only in future, public for now).
   * Returns counts by event type and persona.
   */
  getSummary: publicProcedure.query(async () => {
    try {
      const db = await getDb();
      if (!db) return { events: [], total: 0 };

      const results = await db
        .select({
          eventType: ipeAnalytics.eventType,
          personaId: ipeAnalytics.personaId,
          count: sql<number>`count(*)`.as("count"),
        })
        .from(ipeAnalytics)
        .groupBy(ipeAnalytics.eventType, ipeAnalytics.personaId)
        .orderBy(desc(sql`count(*)`));

      const total = results.reduce((sum, r) => sum + Number(r.count), 0);

      return { events: results, total };
    } catch (error) {
      console.error("[IPE Analytics] Failed to get summary:", error);
      return { events: [], total: 0 };
    }
  }),

  /**
   * Get recent events for debugging/monitoring.
   */
  getRecent: publicProcedure
    .input(z.object({ limit: z.number().min(1).max(100).default(20) }))
    .query(async ({ input }) => {
      try {
        const db = await getDb();
        if (!db) return [];

        return await db
          .select()
          .from(ipeAnalytics)
          .orderBy(desc(ipeAnalytics.createdAt))
          .limit(input.limit);
      } catch (error) {
        console.error("[IPE Analytics] Failed to get recent events:", error);
        return [];
      }
    }),
});
