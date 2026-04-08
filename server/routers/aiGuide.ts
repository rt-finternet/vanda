/**
 * VANDA AI Guide Router — Server-side LLM integration
 *
 * Provides a tRPC mutation that accepts a user question + persona context
 * and returns an LLM-generated answer grounded in the VANDA blueprint.
 *
 * NO AMBITION DECAY.
 */
import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { invokeLLM } from "../_core/llm";

const SYSTEM_PROMPT = `You are the VANDA AI Guide, an expert on the UNITS|SG blueprint for Singapore's next-generation financial market infrastructure.

You help stakeholders understand the VANDA (Value And Network Digital Architecture) portal content. You are deeply knowledgeable about:

1. UNITS Protocol: Three-plane architecture (Token Plane, Identity Plane, Regulatory Plane), GL1 network
2. Singapore Context: MAS regulatory framework, CDP/SGX, DBS/OCBC/UOB anchor banks, MEPS+ integration
3. Asset Classes: Equities, government securities, gold/precious metals, stablecoins, structured notes, private credit, VCC funds, P-Tokets, unsponsored tokets
4. Token Programs: Pre-hooks (compliance), transfer policies, post-hooks (settlement effects), programmable instruments
5. Workflows: CDP Bridge, Atomic DvP, Collateral Mobilisation, VCC Tokenisation, Gold Tokenisation, Cross-Border Settlement, Institutional FX
6. Participants: 15-node ecosystem with MAS, CDP, MEPS+, anchor banks (DBS, OCBC, UOB), GL1 banks (HSBC, J.P. Morgan, MUFG, Standard Chartered), RMOs (Marketnode, ADDX, DDEx, BondBloX, InvestaX, StraitsX)
7. Cross-Ledger: XSGD integration, stablecoin adapters, public chain bridges
8. Regulatory: SFA, PS Act, MAS licensing framework, embedded compliance

IMPORTANT RULES:
- Answer in the context of the user's declared persona when provided
- Be concise but authoritative. Use specific numbers and names when available.
- Never fabricate data. If you don't know something, say so.
- Reference specific portal sections when relevant (e.g., "See the DvP Settlement deep-dive for details")
- Use "toket" (not "token") when referring to UNITS network assets, as this is the VANDA terminology
- Never use em-dashes. Use commas instead.
- Keep answers under 300 words unless the question demands more detail.
- When the persona is a regulator, emphasize compliance and systemic risk aspects.
- When the persona is a builder, emphasize APIs and programmability.
- When the persona is an investor, emphasize access and returns.`;

export const aiGuideRouter = router({
  ask: publicProcedure
    .input(
      z.object({
        question: z.string().min(1).max(2000),
        personaId: z.string().nullable().optional(),
        personaName: z.string().nullable().optional(),
        currentPage: z.string().optional(),
        conversationHistory: z
          .array(
            z.object({
              role: z.enum(["user", "assistant"]),
              content: z.string(),
            })
          )
          .optional()
          .default([]),
      })
    )
    .mutation(async ({ input }) => {
      const { question, personaId, personaName, currentPage, conversationHistory } = input;

      // Build context-aware messages
      const messages: { role: "system" | "user" | "assistant"; content: string }[] = [
        { role: "system", content: SYSTEM_PROMPT },
      ];

      // Add persona context
      if (personaId && personaName) {
        messages.push({
          role: "system",
          content: `The user is viewing the portal as "${personaName}" (persona ID: ${personaId}). Tailor your answer to their perspective, priorities, and level of technical detail.`,
        });
      }

      // Add page context
      if (currentPage) {
        messages.push({
          role: "system",
          content: `The user is currently on the portal page: ${currentPage}. Reference this context when relevant.`,
        });
      }

      // Add conversation history (last 10 messages max)
      const recentHistory = conversationHistory.slice(-10);
      for (const msg of recentHistory) {
        messages.push({ role: msg.role, content: msg.content });
      }

      // Add the current question
      messages.push({ role: "user", content: question });

      try {
        const result = await invokeLLM({ messages });
        const rawContent = result.choices?.[0]?.message?.content;
        const answer = typeof rawContent === "string"
          ? rawContent
          : Array.isArray(rawContent)
            ? rawContent.filter((c): c is { type: "text"; text: string } => c.type === "text").map((c) => c.text).join("\n")
            : "I could not generate a response. Please try again.";

        return {
          success: true,
          answer,
        };
      } catch (error: any) {
        console.error("[AI Guide] LLM error:", error?.message || error);
        return {
          success: false,
          answer:
            "I am temporarily unable to respond. The AI Guide requires server-side LLM access. Please try again later.",
        };
      }
    }),
});
