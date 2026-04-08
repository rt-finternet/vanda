/**
 * VANDA IPE Persona Selector — "I am..."
 *
 * A slide-out sidebar where stakeholders declare their identity.
 * Groups personas by category, shows narrative arc, estimated read time,
 * and a "Linear Mode" option for full unfiltered access.
 *
 * NO AMBITION DECAY.
 */
import { useIPE } from "@/contexts/IPEContext";
import { SG } from "@/components/SGPortalNav";
import {
  X, ChevronRight, Clock, BookOpen, Eye,
  Landmark, Globe, Zap, Shield, Building2, Users,
  Briefcase, Wrench, TrendingUp, PieChart, Crown, Wallet,
  Layers,
} from "lucide-react";
import type { Persona, PersonaGroup } from "@/lib/ipe-manifest";

/* ── Icon resolver ── */
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

function getIcon(name: string) {
  return ICON_MAP[name] || <Eye className="w-4 h-4" />;
}

/* ── Group labels & colors ── */
const GROUP_META: Record<PersonaGroup, { label: string; color: string; icon: React.ReactNode }> = {
  regulators: { label: "Regulators", color: SG.masTeal, icon: <Landmark className="w-4 h-4" /> },
  "industry-bodies": { label: "Industry Bodies", color: SG.nusOrange, icon: <Building2 className="w-4 h-4" /> },
  "market-participants": { label: "Market Participants", color: SG.finternetCyan, icon: <TrendingUp className="w-4 h-4" /> },
  "end-users": { label: "End Users", color: SG.finternetAmber, icon: <Wallet className="w-4 h-4" /> },
};

/* ── Narrative arc labels ── */
const ARC_LABELS: Record<string, string> = {
  "inverted-pyramid": "Conclusion first",
  "problem-solution": "Pain then cure",
  "technical-cascade": "Layer by layer",
  "regulatory-scaffold": "Framework first",
  "journey-map": "Today to tomorrow",
};

/* ── Persona Card ── */
function PersonaCard({
  persona,
  isActive,
  onSelect,
}: {
  persona: Persona;
  isActive: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className="w-full text-left rounded-lg p-3 transition-all duration-200 group"
      style={{
        background: isActive ? `${persona.color}18` : "transparent",
        border: isActive ? `1px solid ${persona.color}40` : "1px solid transparent",
      }}
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
          style={{
            background: `${persona.color}20`,
            color: persona.color,
          }}
        >
          {getIcon(persona.icon)}
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span
              className="text-sm font-semibold truncate"
              style={{ color: isActive ? persona.color : "#e2e8f0" }}
            >
              {persona.shortName}
            </span>
            {isActive && (
              <span
                className="text-[10px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider"
                style={{ background: `${persona.color}30`, color: persona.color }}
              >
                Active
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 mt-0.5 line-clamp-2">
            {persona.description}
          </p>
          {/* Meta row */}
          <div className="flex items-center gap-3 mt-1.5">
            <span className="flex items-center gap-1 text-[10px] text-slate-500">
              <Clock className="w-3 h-3" />
              {persona.estimatedReadTime}
            </span>
            <span className="flex items-center gap-1 text-[10px] text-slate-500">
              <BookOpen className="w-3 h-3" />
              {ARC_LABELS[persona.narrativeArc] || persona.narrativeArc}
            </span>
          </div>
        </div>

        {/* Arrow */}
        <ChevronRight
          className="w-4 h-4 text-slate-600 group-hover:text-slate-400 transition-colors shrink-0 mt-1"
        />
      </div>
    </button>
  );
}

/* ── Main Component ── */
export default function PersonaSelector() {
  const {
    activePersona,
    selectorOpen,
    setSelectorOpen,
    setPersona,
    personaGroups,
    narrativeArc,
  } = useIPE();

  if (!selectorOpen) return null;

  const groupOrder: PersonaGroup[] = [
    "regulators",
    "industry-bodies",
    "market-participants",
    "end-users",
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
        onClick={() => setSelectorOpen(false)}
      />

      {/* Sidebar */}
      <div
        className="fixed top-0 right-0 z-[61] h-full w-[380px] max-w-[90vw] overflow-y-auto"
        style={{
          background: `linear-gradient(180deg, ${SG.dark} 0%, #0D1F3A 100%)`,
          borderLeft: `1px solid ${SG.border}`,
          boxShadow: "-8px 0 32px rgba(0,0,0,0.5)",
        }}
      >
        {/* Header */}
        <div
          className="sticky top-0 z-10 px-5 py-4 flex items-center justify-between"
          style={{
            background: SG.headerBg,
            borderBottom: `1px solid ${SG.border}`,
          }}
        >
          <div>
            <h2 className="text-base font-bold text-white">I am...</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Choose your perspective to reshape the blueprint
            </p>
          </div>
          <button
            onClick={() => setSelectorOpen(false)}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Active persona banner */}
        {activePersona && narrativeArc && (
          <div
            className="mx-4 mt-4 p-3 rounded-lg"
            style={{
              background: `${activePersona.color}10`,
              border: `1px solid ${activePersona.color}25`,
            }}
          >
            <div className="flex items-center gap-2 mb-1">
              <div
                className="w-6 h-6 rounded flex items-center justify-center"
                style={{ background: `${activePersona.color}25`, color: activePersona.color }}
              >
                {getIcon(activePersona.icon)}
              </div>
              <span className="text-sm font-semibold" style={{ color: activePersona.color }}>
                Viewing as {activePersona.shortName}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              <span className="font-medium text-slate-300">{narrativeArc.label}:</span>{" "}
              {narrativeArc.description}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              {activePersona.realWorld}
            </p>
          </div>
        )}

        {/* Linear Mode button */}
        <div className="px-4 mt-4">
          <button
            onClick={() => {
              setPersona(null);
              setSelectorOpen(false);
            }}
            className="w-full text-left rounded-lg p-3 transition-all duration-200"
            style={{
              background: !activePersona ? `${SG.nusOrange}15` : "transparent",
              border: !activePersona
                ? `1px solid ${SG.nusOrange}40`
                : `1px solid ${SG.border}`,
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{
                  background: !activePersona ? `${SG.nusOrange}25` : `${SG.border}`,
                  color: !activePersona ? SG.nusOrange : "#94a3b8",
                }}
              >
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <span
                  className="text-sm font-semibold"
                  style={{ color: !activePersona ? SG.nusOrange : "#e2e8f0" }}
                >
                  Linear Mode
                </span>
                <p className="text-xs text-slate-400 mt-0.5">
                  Full blueprint, no filtering. All sections visible.
                </p>
              </div>
              {!activePersona && (
                <span
                  className="text-[10px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider ml-auto"
                  style={{ background: `${SG.nusOrange}30`, color: SG.nusOrange }}
                >
                  Active
                </span>
              )}
            </div>
          </button>
        </div>

        {/* Divider */}
        <div className="mx-4 mt-4 mb-2">
          <div className="h-px" style={{ background: SG.border }} />
        </div>

        {/* Persona groups */}
        <div className="px-4 pb-8 space-y-4">
          {groupOrder.map((groupId) => {
            const personas = personaGroups.get(groupId) || [];
            const meta = GROUP_META[groupId];
            if (personas.length === 0) return null;

            return (
              <div key={groupId}>
                {/* Group header */}
                <div className="flex items-center gap-2 mb-2 px-1">
                  <div
                    className="w-5 h-5 rounded flex items-center justify-center"
                    style={{ color: meta.color }}
                  >
                    {meta.icon}
                  </div>
                  <span
                    className="text-xs font-bold uppercase tracking-wider"
                    style={{ color: meta.color }}
                  >
                    {meta.label}
                  </span>
                  <span className="text-[10px] text-slate-500 ml-auto">
                    {personas.length} personas
                  </span>
                </div>

                {/* Persona cards */}
                <div className="space-y-1">
                  {personas.map((p) => (
                    <PersonaCard
                      key={p.id}
                      persona={p}
                      isActive={activePersona?.id === p.id}
                      onSelect={() => {
                        setPersona(p.id);
                        setSelectorOpen(false);
                      }}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div
          className="sticky bottom-0 px-5 py-3"
          style={{
            background: `linear-gradient(transparent, ${SG.dark})`,
          }}
        >
          <p className="text-[10px] text-slate-500 text-center">
            IPE v1.0 - Content adapts to your declared context
          </p>
        </div>
      </div>
    </>
  );
}
