/**
 * VANDA AI Guide Panel -- The Voice
 *
 * A prominent slide-out chat panel from the LEFT side, vertically centered.
 * Context-aware: knows the active persona and current page.
 * Uses server-side LLM via tRPC.
 *
 * NO AMBITION DECAY.
 */
import { useState, useRef, useEffect, useCallback } from "react";
import { useIPE } from "@/contexts/IPEContext";
import { SG } from "@/components/SGPortalNav";
import { trpc } from "@/lib/trpc";
import { IS_VERCEL } from "@/lib/useApi";
import { useIPEAnalytics } from "@/hooks/useIPEAnalytics";
import {
  X, Send, Sparkles, User, Loader2, MessageCircle,
  ChevronDown, Bot,
} from "lucide-react";
import { Streamdown } from "streamdown";

/* -- Types -- */
interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

/* -- Suggested questions per persona -- */
const SUGGESTED_QUESTIONS: Record<string, string[]> = {
  "mas-board": [
    "What is the competitive advantage for Singapore?",
    "How does VANDA compare to Project Guardian?",
    "What is the investment required?",
  ],
  "mas-fintech": [
    "How does the three-plane architecture work?",
    "What are Token Program pre-hooks?",
    "How does XSGD integrate with VANDA?",
  ],
  "mas-supervisory": [
    "How does embedded compliance work?",
    "Which MAS licences map to which node types?",
    "How is settlement risk eliminated?",
  ],
  "mas-policy": [
    "What cross-border corridors does VANDA enable?",
    "How does VCC tokenisation help fund distribution?",
    "What is the CDP Bridge migration path?",
  ],
  "abs-ceos": [
    "What is the cost saving for member banks?",
    "How does the shared infrastructure model work?",
    "What is the timeline for Phase 1?",
  ],
  "ibf-workforce": [
    "What new roles does VANDA create?",
    "What skills are needed for Token Programs?",
    "How does AI delegation affect workforce planning?",
  ],
  "imas-asset-mgmt": [
    "How does VCC tokenisation automate fund operations?",
    "Can fund units be used as collateral?",
    "How does cross-border distribution work?",
  ],
  "sfa-builders": [
    "What APIs are available for builders?",
    "How do I create a Token Program?",
    "What is the cross-ledger integration model?",
  ],
  "capital-markets": [
    "How does atomic DvP settlement work?",
    "What structured products can be tokenised?",
    "How does the collateral highway reduce costs?",
  ],
  "asset-managers": [
    "How does NAV automation work on VANDA?",
    "Can I tokenise an existing VCC fund?",
    "What is the secondary market for fund tokets?",
  ],
  "bank-csuite": [
    "What are the revenue streams for my bank?",
    "How does collateral mobility save capital?",
    "What is the competitive moat for early movers?",
  ],
  investors: [
    "What asset classes can I access?",
    "How does fractional gold ownership work?",
    "Can I pledge my tokets as collateral?",
  ],
};

const DEFAULT_SUGGESTIONS = [
  "What is VANDA and how does it work?",
  "What asset classes are supported?",
  "How does Singapore benefit from this?",
];

/* -- Main Component -- */
export default function AIGuidePanel() {
  const {
    aiGuideOpen,
    setAiGuideOpen,
    activePersona,
    currentPage,
    manifest,
  } = useIPE();

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const askMutation = trpc.aiGuide.ask.useMutation();
  const { trackAiGuideQuery } = useIPEAnalytics();

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  // Focus input when panel opens
  useEffect(() => {
    if (aiGuideOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [aiGuideOpen]);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isLoading) return;

      const userMessage: ChatMessage = { role: "user", content: text.trim() };
      setMessages((prev) => [...prev, userMessage]);
      setInput("");
      setIsLoading(true);

      // Track AI Guide query
      trackAiGuideQuery(
        activePersona?.id ?? "linear",
        currentPage,
        text.trim()
      );

      try {
        const result = await askMutation.mutateAsync({
          question: text.trim(),
          personaId: activePersona?.id ?? null,
          personaName: activePersona?.name ?? null,
          currentPage,
          conversationHistory: messages.slice(-10),
        });

        const assistantMessage: ChatMessage = {
          role: "assistant",
          content: result.answer,
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } catch (error) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "I encountered an error processing your question. Please try again.",
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, askMutation, activePersona, currentPage, messages]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const suggestions = activePersona
    ? SUGGESTED_QUESTIONS[activePersona.id] || DEFAULT_SUGGESTIONS
    : DEFAULT_SUGGESTIONS;

  if (!aiGuideOpen) return null;

  const aiColor = SG.finternetCyan;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
        onClick={() => setAiGuideOpen(false)}
      />

      {/* Panel -- LEFT SIDE, vertically centered */}
      <div
        className="fixed z-[61] w-[440px] max-w-[92vw] overflow-hidden flex flex-col rounded-2xl"
        style={{
          left: "16px",
          top: "50%",
          transform: "translateY(-50%)",
          height: "min(680px, 85vh)",
          background: `linear-gradient(180deg, ${SG.dark} 0%, #0D1F3A 100%)`,
          border: `1px solid ${aiColor}30`,
          borderLeft: `3px solid ${aiColor}`,
          boxShadow: `8px 0 40px ${aiColor}10, 0 8px 32px rgba(0,0,0,0.6)`,
        }}
      >
        {/* Header */}
        <div
          className="px-5 py-4 flex items-center justify-between shrink-0"
          style={{
            background: `linear-gradient(135deg, ${SG.headerBg}, ${SG.dark})`,
            borderBottom: `1px solid ${aiColor}20`,
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                background: `${aiColor}20`,
                color: aiColor,
                boxShadow: `0 0 16px ${aiColor}15`,
              }}
            >
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">AI Guide</h3>
              <p className="text-xs text-slate-400">
                {activePersona
                  ? <>Context: <span style={{ color: activePersona.color, fontWeight: 600 }}>{activePersona.shortName}</span></>
                  : "Ask anything about the blueprint"}
              </p>
            </div>
          </div>
          <button
            onClick={() => setAiGuideOpen(false)}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages area */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-5 py-4 space-y-4"
          style={{ scrollBehavior: "smooth" }}
        >
          {/* Welcome message */}
          {messages.length === 0 && (
            <div className="space-y-4">
              {/* Greeting */}
              <div
                className="rounded-xl p-4"
                style={{
                  background: `${aiColor}08`,
                  border: `1px solid ${aiColor}15`,
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4" style={{ color: aiColor }} />
                  <span className="text-sm font-semibold" style={{ color: aiColor }}>
                    VANDA AI Guide
                  </span>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {manifest.aiGuide.greeting}
                </p>
                {activePersona && (
                  <p className="text-xs text-slate-400 mt-2">
                    I know you are viewing as{" "}
                    <span className="font-semibold" style={{ color: activePersona.color }}>
                      {activePersona.shortName}
                    </span>
                    . My answers will be tailored to your perspective.
                  </p>
                )}
              </div>

              {/* Suggested questions */}
              <div>
                <p className="text-xs text-slate-500 mb-2 px-1">Try asking:</p>
                <div className="space-y-1.5">
                  {suggestions.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => sendMessage(q)}
                      className="w-full text-left text-sm text-slate-300 rounded-lg px-3 py-2.5 transition-all duration-200 hover:bg-white/5"
                      style={{
                        border: `1px solid ${SG.border}`,
                      }}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Chat messages */}
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-xl px-4 py-3 ${
                  msg.role === "user" ? "rounded-br-sm" : "rounded-bl-sm"
                }`}
                style={
                  msg.role === "user"
                    ? {
                        background: activePersona
                          ? `${activePersona.color}20`
                          : `${SG.nusOrange}20`,
                        border: `1px solid ${
                          activePersona ? `${activePersona.color}30` : `${SG.nusOrange}30`
                        }`,
                      }
                    : {
                        background: SG.card,
                        border: `1px solid ${SG.border}`,
                      }
                }
              >
                {msg.role === "assistant" ? (
                  <div className="text-sm text-slate-200 leading-relaxed prose prose-invert prose-sm max-w-none">
                    <Streamdown>{msg.content}</Streamdown>
                  </div>
                ) : (
                  <p className="text-sm text-slate-200">{msg.content}</p>
                )}
              </div>
            </div>
          ))}

          {/* Loading indicator */}
          {isLoading && (
            <div className="flex justify-start">
              <div
                className="rounded-xl rounded-bl-sm px-4 py-3"
                style={{ background: SG.card, border: `1px solid ${SG.border}` }}
              >
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" style={{ color: aiColor }} />
                  <span className="text-xs text-slate-400">Thinking...</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input area */}
        <div
          className="shrink-0 px-4 py-3"
          style={{
            background: `linear-gradient(135deg, ${SG.headerBg}, ${SG.dark})`,
            borderTop: `1px solid ${aiColor}15`,
          }}
        >
          <div
            className="flex items-end gap-2 rounded-xl px-3 py-2"
            style={{
              background: SG.surface,
              border: `1px solid ${SG.border}`,
            }}
          >
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about the blueprint..."
              rows={1}
              className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 resize-none outline-none max-h-[80px]"
              style={{ minHeight: "24px" }}
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || isLoading}
              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all duration-200 disabled:opacity-30"
              style={{
                background: input.trim() ? aiColor : "transparent",
                color: input.trim() ? "#fff" : aiColor,
              }}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <p className="text-[10px] text-slate-600 mt-1.5 text-center">
            AI Guide answers are based on the VANDA blueprint content
          </p>
        </div>
      </div>
    </>
  );
}
