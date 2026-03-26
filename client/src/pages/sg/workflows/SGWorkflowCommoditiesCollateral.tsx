import { useState, useEffect } from "react";
import { Link } from "wouter";
import SGPortalNav, { SG } from "@/components/SGPortalNav";
import { CinematicBackground } from "@/components/motion";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft, ArrowRight, CheckCircle2, Shield, Layers,
  Building2, Gem, TrendingUp, AlertTriangle, ArrowDownUp, Zap
} from "lucide-react";

const SG_LOGO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663328851912/82pWKmUqBRkgn8Ladat8sj/units-sg-orchid-logo-light-KqELedrzeYmCnakJE4pQSh.png";
const FINTERNET_LOGO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663328851912/82pWKmUqBRkgn8Ladat8sj/yP0fvxrB3mwq_e7583308.png";

interface WorkflowStep {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  details: string[];
  systemState: Record<string, string>;
  icon: React.ElementType;
  color: string;
  keyPrinciple: string;
}

const STEPS: WorkflowStep[] = [
  {
    id: 1, title: "Multi-Asset Basket Construction", subtitle: "Gold, Silver, Bonds & Equities Combined",
    description: "DBS Bank constructs a multi-asset collateral basket for a SGX-DC margin requirement. The basket includes gold gram-tokets from Brink's Singapore, silver gram-tokets from Le Freeport, Singapore Government Securities (SGS) bonds, and SGX-listed equities. Each asset carries Verifiable Credentials attesting to eligibility, and the Collateral Highway validates all assets meet SGX-DC's acceptance schedule.",
    details: [
      "Pledgor: DBS Bank Ltd (LEI: 789DYKL23Z299LD2K456)",
      "Beneficiary: SGX Derivatives Clearing (SGX-DC)",
      "Gold: 5,000 gram-tokets from Brink's SG (SGD 627,000 @ SGD 125.40/g)",
      "Silver: 10,000 gram-tokets from Le Freeport (SGD 13,200 @ SGD 1.32/g)",
      "SGS Bond: SGD 500K SGS 3.0% 2030 (SGD 512,500 market value)",
      "Equities: SGD 200K DBS Group Holdings (SGX: D05)",
      "Total basket pre-haircut: SGD 1,352,700",
      "Haircuts: Gold 8%, Silver 15%, SGS 2%, Equities 15%",
      "Total basket post-haircut: SGD 1,228,295",
      "Margin requirement: SGD 1,100,000",
      "Coverage ratio: 111.7%",
    ],
    systemState: { "Pledgor": "DBS Bank", "Beneficiary": "SGX-DC", "Basket Value": "SGD 1,352,700", "Post-Haircut": "SGD 1,228,295", "Coverage": "111.7%" },
    icon: Layers, color: SG.finternetAmber,
    keyPrinciple: "Commodity tokets carry the same VC-based eligibility framework as bonds and equities. Physical backing is verified in real-time via Brink's and Le Freeport vault attestations, not annually.",
  },
  {
    id: 2, title: "Atomic Encumbrance", subtitle: "All Assets Pledged Simultaneously",
    description: "The entire multi-asset basket is encumbered atomically in a single transaction. Gold tokets, silver tokets, SGS bonds, and equities are all locked simultaneously in DBS's UNITS Wallet. There is no moment where some assets are pledged and others are not. SGX-DC receives a single confirmation that the full basket is secured. The encumbrance is enforced by Token Programs — DBS cannot transfer or redeem pledged tokets until released.",
    details: [
      "Transaction: Atomic multi-asset pledge (single commitment)",
      "Gold encumbered: 5,000 gram-tokets → LOCKED",
      "Silver encumbered: 10,000 gram-tokets → LOCKED",
      "SGS Bond encumbered: SGD 500K SGS 3.0% 2030 → LOCKED",
      "Equities encumbered: SGD 200K DBS Group → LOCKED",
      "Token Programs: PledgeCollateral executed across 4 asset types",
      "SGX-DC confirmation: Received (single atomic receipt)",
      "Encumbrance enforcement: Protocol-level (cannot bypass)",
      "Settlement time: 1.2 seconds (all 4 assets)",
    ],
    systemState: { "Gold": "5,000g LOCKED", "Silver": "10,000g LOCKED", "SGS Bond": "LOCKED", "Equities": "LOCKED", "Status": "Fully Encumbered" },
    icon: Shield, color: "#10b981",
    keyPrinciple: "Atomic encumbrance means all assets in the basket are pledged simultaneously. No partial pledges, no settlement gaps. SGX-DC is fully protected from the first millisecond.",
  },
  {
    id: 3, title: "Continuous Valuation", subtitle: "Real-Time Mark-to-Market",
    description: "Unlike traditional collateral management with end-of-day valuations, UNITS|SG continuously marks all collateral to market. Gold and silver tokets are valued against the live LBMA spot price and SBMA/KIS daily benchmark. SGS bonds update via MAS yield curve feeds. Equities track SGX last trade price. The Collateral Highway recalculates haircut-adjusted values continuously, triggering margin calls the instant coverage drops below SGX-DC's threshold.",
    details: [
      "Gold valuation: LBMA Gold Price (AM/PM Fix) + SBMA/KIS benchmark",
      "Silver valuation: LBMA Silver Price (daily fix) + intraday spot",
      "SGS Bond valuation: MAS yield curve + real-time bid/offer",
      "Equity valuation: SGX last trade price (D05.SI)",
      "Recalculation frequency: Continuous (event-driven, not batch)",
      "Margin call trigger: Coverage ratio < 105% (SGX-DC threshold)",
      "Current coverage: 111.7% (healthy)",
      "Next LBMA Fix: 10:30 AM London (3:30 PM SGT)",
    ],
    systemState: { "Gold Spot": "SGD 125.40/g", "Silver Spot": "SGD 1.32/g", "Coverage": "111.7%", "Threshold": "105%", "Valuation": "Continuous" },
    icon: TrendingUp, color: SG.finternetCyan,
    keyPrinciple: "Continuous valuation eliminates the end-of-day batch problem. A gold price move at 2 PM SGT is reflected at 2 PM SGT, not the next morning.",
  },
  {
    id: 4, title: "Margin Call & Top-Up", subtitle: "Automated Deficit Resolution",
    description: "Gold price drops 3.2% intraday following a US Fed announcement. The Collateral Highway detects that the coverage ratio has fallen to 103.8%, below SGX-DC's 105% threshold. An automated margin call is issued to DBS. DBS tops up with additional gold gram-tokets from their unencumbered pool at Brink's Singapore. The top-up is atomic: new collateral is encumbered and the coverage ratio recalculated in a single transaction. No manual intervention, no phone calls.",
    details: [
      "Trigger: Gold spot drops from SGD 125.40 to SGD 121.39/g (-3.2%)",
      "Gold collateral impact: SGD 627,000 falls to SGD 606,950 (-SGD 20,050)",
      "Post-haircut impact: Coverage drops from 111.7% to 103.8%",
      "Margin call: SGD 150,000 additional collateral required",
      "Resolution: DBS pledges additional 1,200 gold gram-tokets from Brink's SG",
      "New gold position: 6,200 gram-tokets (SGD 752,618)",
      "New coverage ratio: 110.4% (restored above threshold)",
      "Time from trigger to resolution: 38 seconds (automated)",
    ],
    systemState: { "Price Drop": "-3.2%", "Coverage Before": "103.8%", "Top-Up": "1,200g gold", "Coverage After": "110.4%", "Resolution": "38 seconds" },
    icon: AlertTriangle, color: "#ef4444",
    keyPrinciple: "Automated margin calls with 38-second resolution replace the traditional phone-call process that takes hours or days. SGX-DC is never exposed to undercollateralisation for more than seconds.",
  },
  {
    id: 5, title: "Substitution", subtitle: "Swap Gold for SGS Bonds Atomically",
    description: "DBS decides to optimise their collateral basket by substituting 3,000 gold gram-tokets with additional SGS bonds (lower haircut at 2% vs gold's 8%, freeing gold for client distribution). The substitution is atomic: gold tokets are released and SGS bond tokets are encumbered in a single transaction. SGX-DC's exposure remains fully covered throughout — there is no moment of undercollateralisation during the swap.",
    details: [
      "Released: 3,000 gold gram-tokets (SGD 364,170 post-haircut at 8%)",
      "Pledged: SGD 350K SGS 2.75% 2029 (SGD 357,000 post-haircut at 2%)",
      "Net impact: Coverage ratio changes from 110.4% to 109.9%",
      "SGX-DC approval: Automatic (within eligible asset schedule)",
      "Gold tokets: Encumbrance removed, free to distribute to clients",
      "SGS Bond tokets: Encumbrance applied, locked in DBS wallet",
      "Substitution: Single atomic transaction (zero gap)",
      "Token Programs: ReleaseCollateral + PledgeCollateral chained",
    ],
    systemState: { "Released": "3,000g gold", "Pledged": "SGD 350K SGS", "Coverage": "109.9%", "Gap": "Zero" },
    icon: ArrowDownUp, color: "#10b981",
    keyPrinciple: "Zero-gap substitution means SGX-DC is never undercollateralised, not even for a millisecond during the swap. DBS frees gold for client distribution without any risk.",
  },
  {
    id: 6, title: "Cross-Asset Optimisation", subtitle: "Cheapest-to-Deliver Across All Asset Classes",
    description: "UNITS|SG acts as collateral agent, managing baskets that include commodity tokets alongside traditional securities. The system automatically selects the cheapest-to-deliver collateral from DBS's available pool, optimising across SGS bonds, SGX equities, and commodity tokets based on haircuts, concentration limits, and SGX-DC's eligibility schedules. Gold and silver tokets provide a new diversification dimension unavailable in today's siloed systems.",
    details: [
      "Collateral agent: UNITS|SG (automated selection)",
      "Optimisation: Cheapest-to-deliver across all asset classes",
      "Gold allocation: Up to 20% of basket (SGX-DC concentration limit)",
      "Silver allocation: Up to 10% of basket (higher haircut)",
      "Auto-substitution: If gold price rises, auto-release gold and replace with SGS bonds",
      "SGX-DC schedule: Accepts gold/silver at SBMA/LBMA haircuts",
      "Concentration monitoring: Continuous, protocol-enforced limits",
      "Optimisation frequency: Event-driven (price change, new deposit, maturity)",
    ],
    systemState: { "Gold Allocation": "18% (within 20% limit)", "Silver Allocation": "3% (within 10% limit)", "Optimisation": "Active", "Mode": "Cheapest-to-Deliver" },
    icon: Zap, color: "#8b5cf6",
    keyPrinciple: "Cross-asset optimisation across bonds, equities, and commodities unlocks cheapest-to-deliver strategies impossible in today's siloed systems where gold and securities live in separate worlds.",
  },
];

const comparisons = [
  { dimension: "Eligible Collateral", before: "Bonds & equities only", after: "Bonds, equities, gold, silver tokets" },
  { dimension: "Valuation Frequency", before: "End-of-day batch", after: "Continuous real-time (event-driven)" },
  { dimension: "Margin Call Response", before: "Hours to days (manual)", after: "Seconds (automated Token Programs)" },
  { dimension: "Substitution", before: "T+1 or T+2 with manual matching", after: "Atomic, zero-gap, single transaction" },
  { dimension: "Physical Backing Verification", before: "Annual audit only", after: "Real-time VC from vault operator" },
  { dimension: "Concentration Monitoring", before: "Periodic compliance check", after: "Continuous, protocol-enforced limits" },
  { dimension: "Collateral Optimisation", before: "Bonds/equities only", after: "Full multi-asset including commodities" },
  { dimension: "GST Treatment", before: "Complex physical delivery tax", after: "IPM exempt throughout lifecycle" },
];

export default function SGWorkflowCommoditiesCollateral() {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [revealed, setRevealed] = useState(false);
  useEffect(() => { setRevealed(true); }, []);
  const step = STEPS[currentStep];
  const StepIcon = step.icon;

  const advanceStep = () => {
    setCompletedSteps((prev) => { const next = new Set(Array.from(prev)); next.add(currentStep); return next; });
    if (currentStep < STEPS.length - 1) setCurrentStep(currentStep + 1);
  };

  return (
    <>
      <SGPortalNav />
      <div className="min-h-screen" style={{ background: SG.dark, color: "rgba(255,255,255,0.85)" }}>
        <CinematicBackground />
        <div className="max-w-6xl mx-auto px-6 py-16">
          {/* Header */}
          <div className={`mb-10 transition-all duration-700 ${revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <Link href="/sg/workflows" className="inline-flex items-center gap-2 text-sm mb-6 transition-colors" style={{ color: "rgba(255,255,255,0.4)" }}>
              <ArrowLeft className="w-4 h-4" /> Back to Workflows
            </Link>
            <div className="flex items-center gap-3 mb-3">
              <Gem className="w-7 h-7" style={{ color: SG.finternetAmber }} />
              <span className="text-xs font-mono tracking-wider" style={{ color: `${SG.finternetAmber}90` }}>UNITS|SG WORKFLOW</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Commodities as Collateral</h1>
            <p className="text-sm max-w-2xl" style={{ color: "rgba(255,255,255,0.5)" }}>
              How gold and silver gram-tokets flow through the Collateral Highway alongside SGS bonds and SGX equities,
              enabling multi-asset collateral baskets with continuous valuation, automated margin calls, and atomic substitution for SGX-DC.
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {["DBS Bank", "SGX-DC", "Brink's Singapore", "Le Freeport", "MAS", "SBMA", "SGS Bonds", "LBMA"].map((tag) => (
                <span key={tag} className="px-2.5 py-1 rounded-full text-[10px] font-medium" style={{ background: `${SG.finternetAmber}15`, color: `${SG.finternetAmber}`, border: `1px solid ${SG.finternetAmber}30` }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Step Selector */}
          <div className={`mb-8 transition-all duration-700 delay-200 ${revealed ? "opacity-100" : "opacity-0"}`}>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {STEPS.map((s, i) => {
                const isActive = i === currentStep;
                const isCompleted = completedSteps.has(i);
                return (
                  <button key={s.id} onClick={() => setCurrentStep(i)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs whitespace-nowrap transition-all shrink-0"
                    style={{
                      background: isActive ? `${s.color}20` : isCompleted ? "rgba(16,185,129,0.1)" : `${SG.card}`,
                      border: `1px solid ${isActive ? `${s.color}50` : isCompleted ? "rgba(16,185,129,0.3)" : SG.border}`,
                      color: isActive ? s.color : isCompleted ? "#10b981" : "rgba(255,255,255,0.5)",
                    }}>
                    {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5" /> : <span className="font-mono">{s.id}</span>}
                    {s.title}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step Content */}
          <div className={`transition-all duration-700 delay-300 ${revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <div className="grid md:grid-cols-[1fr_340px] gap-8">
              {/* Left: Step Details */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${step.color}15`, border: `1px solid ${step.color}30` }}>
                    <StepIcon className="w-7 h-7" style={{ color: step.color }} />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-xs font-semibold tracking-wider uppercase" style={{ color: `${step.color}cc` }}>
                        Step {step.id} of {STEPS.length}
                      </span>
                      {completedSteps.has(currentStep) && (
                        <span className="flex items-center gap-1 text-xs text-emerald-400">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                        </span>
                      )}
                    </div>
                    <h2 className="text-xl font-medium text-white">{step.title}</h2>
                    <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>{step.subtitle}</p>
                  </div>
                </div>
                <p className="leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>{step.description}</p>
                {/* Details */}
                <div className="rounded-xl p-5" style={{ background: `${SG.card}`, border: `1px solid ${SG.border}` }}>
                  <h3 className="text-sm font-medium text-white/80 mb-3">Technical Details</h3>
                  <div className="space-y-2">
                    {step.details.map((d, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
                        <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: `${step.color}80` }} />
                        <span>{d}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Key Principle */}
                <div className="rounded-xl p-5" style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${SG.border}` }}>
                  <h4 className="text-xs font-mono uppercase tracking-wider mb-2" style={{ color: "rgba(255,255,255,0.35)" }}>Key Principle</h4>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{step.keyPrinciple}</p>
                </div>
                {/* Action */}
                <div className="flex items-center gap-4">
                  <Button onClick={advanceStep} disabled={completedSteps.has(currentStep) && currentStep === STEPS.length - 1}
                    className="text-sm font-medium px-6" style={{ background: step.color, color: "white" }}>
                    {completedSteps.has(currentStep) ? (currentStep < STEPS.length - 1 ? "Next Step" : "Workflow Complete") : "Execute Step"}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
                    {completedSteps.size} of {STEPS.length} steps completed
                  </span>
                </div>
              </div>

              {/* Right: System State & Panels */}
              <div className="space-y-4">
                {/* System State */}
                <div className="rounded-xl p-4" style={{ background: `${SG.card}`, border: `1px solid ${SG.border}` }}>
                  <div className="text-xs uppercase tracking-wider mb-3" style={{ color: `${SG.finternetAmber}80` }}>System State</div>
                  <div className="space-y-2">
                    {Object.entries(step.systemState).map(([k, v]) => (
                      <div key={k} className="flex justify-between text-sm">
                        <span style={{ color: "rgba(255,255,255,0.4)" }}>{k}</span>
                        <span className="font-mono text-xs" style={{ color: "rgba(255,255,255,0.7)" }}>{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Collateral Basket */}
                <div className="rounded-xl p-4" style={{ background: `${SG.card}`, border: `1px solid ${SG.border}` }}>
                  <div className="text-xs uppercase tracking-wider mb-3" style={{ color: `${SG.finternetAmber}80` }}>Collateral Basket</div>
                  <div className="space-y-2">
                    {[
                      { label: "Gold (Brink's SG)", value: currentStep >= 5 ? "3,200g" : currentStep >= 4 ? "6,200g" : "5,000g", color: SG.finternetAmber },
                      { label: "Silver (Le Freeport)", value: "10,000g", color: "#94a3b8" },
                      { label: "SGS Bonds", value: currentStep >= 5 ? "SGD 850K" : "SGD 500K", color: SG.masTeal },
                      { label: "DBS Equities", value: "SGD 200K", color: "#8b5cf6" },
                    ].map((a) => (
                      <div key={a.label} className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full" style={{ background: a.color }} />
                          <span style={{ color: "rgba(255,255,255,0.45)" }}>{a.label}</span>
                        </div>
                        <span className="font-mono text-xs" style={{ color: a.color }}>{a.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Execution Log */}
                <div className="rounded-xl p-4" style={{ background: `${SG.card}`, border: `1px solid ${SG.border}` }}>
                  <div className="text-xs uppercase tracking-wider mb-3" style={{ color: `${SG.finternetAmber}80` }}>Execution Log</div>
                  <div className="space-y-1.5 max-h-48 overflow-y-auto">
                    {Array.from(completedSteps).sort().map((si) => (
                      <div key={si} className="flex items-center gap-2 text-xs">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                        <span className="font-mono" style={{ color: "rgba(255,255,255,0.3)" }}>
                          {new Date(Date.now() - (STEPS.length - si) * 45000).toISOString().slice(11, 19)}
                        </span>
                        <span style={{ color: "rgba(255,255,255,0.55)" }}>{STEPS[si].title}</span>
                      </div>
                    ))}
                    {completedSteps.size === 0 && (
                      <div className="text-xs italic" style={{ color: "rgba(255,255,255,0.25)" }}>No steps executed yet. Click "Execute Step" to begin.</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Before/After Comparison */}
          <div className={`mt-16 transition-all duration-700 delay-400 ${revealed ? "opacity-100" : "opacity-0"}`}>
            <h3 className="text-xl font-bold text-white mb-6">How This Changes Collateral Management</h3>
            <div className="rounded-2xl overflow-hidden" style={{ background: `${SG.card}`, border: `1px solid ${SG.border}` }}>
              <div className="grid grid-cols-3 gap-0 text-xs font-mono uppercase tracking-wider border-b" style={{ color: "rgba(255,255,255,0.35)", borderColor: SG.border }}>
                <div className="px-5 py-3">Dimension</div>
                <div className="px-5 py-3 border-l" style={{ borderColor: SG.border, color: "rgba(239,68,68,0.6)" }}>Today</div>
                <div className="px-5 py-3 border-l" style={{ borderColor: SG.border, color: "rgba(16,185,129,0.6)" }}>UNITS|SG</div>
              </div>
              {comparisons.map((c, i) => (
                <div key={i} className="grid grid-cols-3 gap-0" style={{ borderBottom: i < comparisons.length - 1 ? `1px solid rgba(255,255,255,0.04)` : "none" }}>
                  <div className="px-5 py-3.5 text-sm font-medium" style={{ color: "rgba(255,255,255,0.65)" }}>{c.dimension}</div>
                  <div className="px-5 py-3.5 text-sm border-l" style={{ borderColor: SG.border, color: "rgba(239,68,68,0.4)" }}>{c.before}</div>
                  <div className="px-5 py-3.5 text-sm border-l" style={{ borderColor: SG.border, color: "rgba(16,185,129,0.6)" }}>{c.after}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Related Links */}
          <div className={`mt-16 pt-8 transition-all duration-700 delay-500 ${revealed ? "opacity-100" : "opacity-0"}`} style={{ borderTop: `1px solid ${SG.border}` }}>
            <h3 className="text-sm uppercase tracking-wider mb-4 text-center" style={{ color: "rgba(255,255,255,0.3)" }}>Related Pages</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { href: "/sg/deep-dive/precious-metals", label: "Precious Metals Deep Dive" },
                { href: "/sg/deep-dive/collateral-highway", label: "Collateral Highway" },
                { href: "/sg/workflows/gold-tokenisation", label: "Gold Kilobar Tokenisation" },
                { href: "/sg/workflows/collateral-mobilisation", label: "Collateral Mobilisation" },
                { href: "/sg/deep-dive/dvp-settlement", label: "DvP Settlement" },
              ].map((link) => (
                <Link key={link.href} href={link.href}
                  className="px-4 py-2 rounded-full text-sm transition-colors" style={{ color: "rgba(255,255,255,0.4)", border: `1px solid ${SG.border}` }}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-12 pt-6 text-center" style={{ borderTop: `1px solid ${SG.border}` }}>
            <img src={SG_LOGO} alt="UNITS|SG" className="h-10 w-auto mx-auto mb-2 opacity-25" />
            <div className="flex items-center justify-center gap-1.5">
              <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.15)" }}>UNITS|SG</span>
              <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.08)" }}>&middot;</span>
              <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.12)" }}>Powered by</span>
              <img src={FINTERNET_LOGO} alt="Finternet" className="h-3 opacity-20" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
