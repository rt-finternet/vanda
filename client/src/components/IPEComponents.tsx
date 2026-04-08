/**
 * VANDA IPE Components — The Muscles
 *
 * PersonaBadge: Floating trigger button to open persona selector
 * CrossPersonaCallout: Inline suggestion to view through another lens
 * NextSectionBar: Sticky bottom bar recommending the next section
 * IPEFloatingBar: Compact floating bar showing active persona + controls
 *
 * NO AMBITION DECAY.
 */
import { useIPE } from "@/contexts/IPEContext";
import { SG } from "@/components/SGPortalNav";
import { Link, useLocation } from "wouter";
import {
  Eye, ChevronRight, ArrowRight, Sparkles,
  Landmark, Globe, Zap, Shield, Building2, Users,
  Briefcase, Wrench, TrendingUp, PieChart, Crown, Wallet,
  Layers, MessageCircle, X,
} from "lucide-react";
import type { Persona } from "@/lib/ipe-manifest";

/* ── Icon resolver (shared with PersonaSelector) ── */
const ICON_MAP: Record<string, React.ReactNode> = {
  Landmark: <Landmark className="w-4 h-4" />,
  Globe: <Globe className="w-4 h-4" />,
  Zap: <Zap className="w-4 h-4" />,
  Shield: <Shield className="w-4 h-4" />,
  Building2: <Building2 className="w-4 h-4" />,
  Users: <Users className="w-4 h-4" />,
  Briefcase: <Briefcase className="w-4 h-4" />,
  Wrench: <Wrench className="w-4 h-4" />,
  TrendingUp: <TrendingUp className="w-4 h-4" />,
  PieChart: <PieChart className="w-4 h-4" />,
  Crown: <Crown className="w-4 h-4" />,
  Wallet: <Wallet className="w-4 h-4" />,
};

const ICON_MAP_SM: Record<string, React.ReactNode> = {
  Landmark: <Landmark className="w-3.5 h-3.5" />,
  Globe: <Globe className="w-3.5 h-3.5" />,
  Zap: <Zap className="w-3.5 h-3.5" />,
  Shield: <Shield className="w-3.5 h-3.5" />,
  Building2: <Building2 className="w-3.5 h-3.5" />,
  Users: <Users className="w-3.5 h-3.5" />,
  Briefcase: <Briefcase className="w-3.5 h-3.5" />,
  Wrench: <Wrench className="w-3.5 h-3.5" />,
  TrendingUp: <TrendingUp className="w-3.5 h-3.5" />,
  PieChart: <PieChart className="w-3.5 h-3.5" />,
  Crown: <Crown className="w-3.5 h-3.5" />,
  Wallet: <Wallet className="w-3.5 h-3.5" />,
};

function getIcon(name: string) {
  return ICON_MAP[name] || <Eye className="w-4 h-4" />;
}
function getIconSm(name: string) {
  return ICON_MAP_SM[name] || <Eye className="w-3.5 h-3.5" />;
}

// ─── Cross-Persona Callout ───────────────────────────────────────────────────

/**
 * Inline callout suggesting the reader view content through another persona's lens.
 * Rendered within page content when a cross-persona suggestion exists.
 */
export function CrossPersonaCallout() {
  const { crossSuggestion, activePersona, manifest } = useIPE();

  if (!crossSuggestion || !activePersona) return null;

  const targetPersona = manifest.personas.find(
    (p) => p.id === crossSuggestion.toPersona
  );
  if (!targetPersona) return null;

  return (
    <div
      className="rounded-xl p-4 my-6 mx-auto max-w-3xl"
      style={{
        background: `linear-gradient(135deg, ${targetPersona.color}08, ${targetPersona.color}04)`,
        border: `1px solid ${targetPersona.color}20`,
      }}
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
          style={{ background: `${targetPersona.color}15`, color: targetPersona.color }}
        >
          {getIcon(targetPersona.icon)}
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-3.5 h-3.5" style={{ color: targetPersona.color }} />
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: targetPersona.color }}>
              Another perspective
            </span>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            {crossSuggestion.text}
          </p>
          <div className="mt-2">
            <span className="text-xs text-slate-500">
              Switch to{" "}
              <span className="font-medium" style={{ color: targetPersona.color }}>
                {targetPersona.shortName}
              </span>{" "}
              view in the persona selector
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Next-Section Bar ────────────────────────────────────────────────────────

/**
 * Sticky bottom bar recommending the next section for the active persona.
 * Shows the reason why this section is relevant.
 */
export function NextSectionBar() {
  const { nextRecommendation, activePersona } = useIPE();
  const [, navigate] = useLocation();
  const [dismissed, setDismissed] = React.useState(false);

  // Reset dismissed state when recommendation changes
  React.useEffect(() => {
    setDismissed(false);
  }, [nextRecommendation?.nextSection]);

  if (!nextRecommendation || !activePersona || dismissed) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4"
      style={{ pointerEvents: "none" }}
    >
      <div
        className="max-w-3xl mx-auto rounded-xl p-4 shadow-2xl"
        style={{
          background: `linear-gradient(135deg, ${SG.card}f0, ${SG.surface}f0)`,
          border: `1px solid ${activePersona.color}30`,
          backdropFilter: "blur(12px)",
          pointerEvents: "auto",
        }}
      >
        <div className="flex items-center gap-3">
          {/* Arrow icon */}
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: `${activePersona.color}15`, color: activePersona.color }}
          >
            <ArrowRight className="w-5 h-5" />
          </div>

          {/* Content */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: activePersona.color }}>
                Recommended next
              </span>
            </div>
            <p className="text-sm font-semibold text-white mt-0.5">
              {nextRecommendation.nextLabel}
            </p>
            <p className="text-xs text-slate-400 mt-0.5 line-clamp-2">
              {nextRecommendation.reason}
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setDismissed(true)}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-500 hover:text-slate-300 hover:bg-white/5 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                navigate(nextRecommendation.nextSection);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all duration-200 hover:brightness-110"
              style={{ background: activePersona.color }}
            >
              Go
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── IPE Floating Bar ────────────────────────────────────────────────────────

/**
 * Compact floating bar in the bottom-right showing:
 * - Active persona badge (or "Linear" if none)
 * - Persona selector trigger
 * - AI Guide trigger
 */
export function IPEFloatingBar() {
  const {
    activePersona,
    toggleSelector,
    toggleAiGuide,
    aiGuideOpen,
  } = useIPE();

  return (
    <div
      className="fixed bottom-6 right-6 z-[55] flex items-center gap-2"
    >
      {/* AI Guide button */}
      <button
        onClick={toggleAiGuide}
        className="w-11 h-11 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-105"
        style={{
          background: aiGuideOpen ? SG.finternetCyan : SG.card,
          border: `1px solid ${aiGuideOpen ? SG.finternetCyan : SG.border}`,
          color: aiGuideOpen ? "#fff" : SG.finternetCyan,
        }}
        title="AI Guide"
      >
        <MessageCircle className="w-5 h-5" />
      </button>

      {/* Persona badge / selector trigger */}
      <button
        onClick={toggleSelector}
        className="h-11 rounded-full flex items-center gap-2 px-4 shadow-lg transition-all duration-200 hover:scale-105"
        style={{
          background: activePersona ? `${activePersona.color}20` : SG.card,
          border: `1px solid ${activePersona ? `${activePersona.color}40` : SG.border}`,
        }}
        title="Choose your perspective"
      >
        {activePersona ? (
          <>
            <span style={{ color: activePersona.color }}>
              {getIconSm(activePersona.icon)}
            </span>
            <span
              className="text-sm font-semibold"
              style={{ color: activePersona.color }}
            >
              {activePersona.shortName}
            </span>
          </>
        ) : (
          <>
            <Layers className="w-3.5 h-3.5" style={{ color: SG.nusOrange }} />
            <span className="text-sm font-semibold" style={{ color: SG.nusOrange }}>
              I am...
            </span>
          </>
        )}
        <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
      </button>
    </div>
  );
}

// ─── Keyword Highlighter ─────────────────────────────────────────────────────

/**
 * Highlights IPE keywords within text content.
 * Used inside content zones to make relevant terms pop.
 */
export function KeywordHighlight({
  text,
  keywords,
  color,
}: {
  text: string;
  keywords: string[];
  color: string;
}) {
  if (!keywords.length) return <>{text}</>;

  const pattern = new RegExp(
    `(${keywords.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`,
    "gi"
  );

  const parts = text.split(pattern);

  return (
    <>
      {parts.map((part, i) => {
        const isKeyword = keywords.some(
          (k) => k.toLowerCase() === part.toLowerCase()
        );
        if (isKeyword) {
          return (
            <span
              key={i}
              className="font-semibold px-0.5 rounded"
              style={{
                color,
                background: `${color}10`,
                textDecoration: `underline ${color}30`,
                textUnderlineOffset: "2px",
              }}
            >
              {part}
            </span>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

// ─── Persona Context Banner ──────────────────────────────────────────────────

/**
 * A subtle banner at the top of each page showing the active persona context.
 * Includes narrative arc and section position in the persona's journey.
 */
export function PersonaContextBanner() {
  const { activePersona, narrativeArc, currentPage } = useIPE();

  if (!activePersona || !narrativeArc) return null;

  const sectionOrder = activePersona.sectionOrder;
  const currentIndex = sectionOrder.indexOf(currentPage);
  const totalSections = sectionOrder.length;

  return (
    <div
      className="w-full px-6 py-2.5"
      style={{
        background: `linear-gradient(90deg, ${activePersona.color}08, transparent)`,
        borderBottom: `1px solid ${activePersona.color}15`,
      }}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-6 h-6 rounded flex items-center justify-center"
            style={{ background: `${activePersona.color}20`, color: activePersona.color }}
          >
            {getIconSm(activePersona.icon)}
          </div>
          <span className="text-xs text-slate-400">
            Viewing as{" "}
            <span className="font-semibold" style={{ color: activePersona.color }}>
              {activePersona.shortName}
            </span>
          </span>
          <span className="text-xs text-slate-600">|</span>
          <span className="text-xs text-slate-500">
            {narrativeArc.label}
          </span>
        </div>

        {currentIndex >= 0 && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">
              Section {currentIndex + 1} of {totalSections}
            </span>
            {/* Progress dots */}
            <div className="flex items-center gap-1">
              {sectionOrder.map((_, i) => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                  style={{
                    background:
                      i <= currentIndex ? activePersona.color : `${SG.border}`,
                    opacity: i === currentIndex ? 1 : 0.6,
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Need React import for useState/useEffect in NextSectionBar
import React from "react";
