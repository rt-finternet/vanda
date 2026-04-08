import { useState, useEffect } from "react";
import { CrossPersonaCallout } from "@/components/IPEComponents";
import { Link } from "wouter";
import SGPortalNav, { SG } from "@/components/SGPortalNav";
import { CinematicBackground } from "@/components/motion";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft, ArrowRight, CheckCircle2, Users, FileSearch,
  ArrowRightLeft, Coins, BarChart3, Layers, Clock, Shield, Globe,
  Building2, Briefcase, Lock, TrendingUp
} from "lucide-react";

const SG_LOGO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663328851912/82pWKmUqBRkgn8Ladat8sj/units-sg-orchid-logo-light-KqELedrzeYmCnakJE4pQSh.png";
const FINTERNET_LOGO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663328851912/82pWKmUqBRkgn8Ladat8sj/yP0fvxrB3mwq_e7583308.png";

/* ─── Scenario ─── */
const scenario = {
  investor: "GIC Private Limited",
  investorType: "Singapore Sovereign Wealth Fund",
  custodian: "DBS Global Transaction Services",
  asset: "German Federal Government Bond (Bund) 2.5% 10Y",
  notional: "EUR 50,000,000 (face value)",
  sgdEquivalent: "SGD 72,465,000 (at 1 EUR = 1.4493 SGD)",
  fxModel: "Layer 2: CLS PvP Settlement",
  custody: "Unsponsored Toket via DBS Euroclear Account",
  settlement: "Hybrid: T+1 Euroclear + Atomic on VANDA",
};

/* ─── Steps ─── */
interface WorkflowStep {
  id: number;
  title: string;
  subtitle: string;
  actor: string;
  description: string;
  systemState: Record<string, string>;
  log: string[];
  icon: React.ElementType;
  color: string;
  traditionalTime: string;
  unitsTime: string;
}

const STEPS: WorkflowStep[] = [
  {
    id: 1,
    title: "Client Instruction & Mandate Check",
    subtitle: "Sovereign fund instructs custodian for EUR 50M Bund purchase",
    actor: "GIC Investment Operations",
    description: "GIC instructs DBS Global Transaction Services to purchase EUR 50 million face value of the 2.5% 10-year German Bund. The instruction flows through GIC's existing custody mandate with DBS. The UNITS Token Program performs an automated mandate check: verifying GIC's investment policy permits European government bonds, checking position limits, and confirming the counterparty (DBS) is an approved broker-dealer for this asset class.",
    systemState: {
      "Instruction": "BUY EUR 50M face, 2.5% 10Y German Bund",
      "Mandate Check": "PASS: European govt bonds within GIC mandate",
      "Position Limit": "PASS: EUR 50M within EUR 500M allocation",
      "Approved Broker": "DBS Securities (MAS CMS Licence)",
      "Settlement Route": "DBS Euroclear → VANDA Unsponsored Toket",
    },
    log: [
      "GIC instruction received via SWIFT MT515 / FIX 4.4",
      "Token Program reads GIC mandate: European government bonds = PERMITTED",
      "Position limit check: EUR 50M vs EUR 500M allocation = WITHIN LIMITS",
      "Broker validation: DBS Securities, MAS CMS Licence = APPROVED",
      "Settlement route determined: Euroclear T+1, then mint Unsponsored Toket on VANDA",
      "Pre-trade compliance: ALL CHECKS PASSED",
    ],
    icon: Briefcase, color: "#3b82f6",
    traditionalTime: "2-4 hours (manual compliance)", unitsTime: "< 3 seconds",
  },
  {
    id: 2,
    title: "FX Execution via CLS PvP",
    subtitle: "SGD 72.5M converted to EUR 50M with zero Herstatt risk",
    actor: "DBS FX Desk + CLS Settlement",
    description: "For institutional flows of this size, the FX conversion uses Layer 2: CLS-integrated PvP (Payment-versus-Payment) settlement. DBS executes the FX trade on the interbank market and routes settlement through CLS, which settles approximately USD 6.5 trillion in FX daily across 18 currencies including SGD. Both legs (SGD payment and EUR receipt) settle simultaneously in CLS, eliminating Herstatt risk entirely. The VANDA Token Program holds the securities leg pending CLS confirmation.",
    systemState: {
      "FX Model": "Layer 2: CLS PvP Settlement",
      "Sell": "SGD 72,465,000",
      "Buy": "EUR 50,000,000",
      "Rate": "1 EUR = 1.4493 SGD (interbank mid-market)",
      "CLS Status": "Matched, awaiting settlement window",
      "Herstatt Risk": "ELIMINATED (PvP)",
      "CLS Daily Volume": "~USD 6.5 trillion across 18 currencies",
    },
    log: [
      "DBS FX desk executes: SELL SGD 72,465,000 / BUY EUR 50,000,000",
      "FX trade matched on interbank market at 1.4493",
      "Trade submitted to CLS for PvP settlement",
      "CLS validates: both legs matched, settlement window T+1 07:00 CET",
      "SGD leg: DBS debits GIC's SGD account, credits CLS nostro",
      "EUR leg: CLS releases EUR 50M to DBS EUR account simultaneously",
      "PvP confirmation received: zero Herstatt risk, both legs final",
      "Alternative models available: Layer 1 (stablecoin swap for smaller flows), Layer 3 (DBS treasury internal FX)",
    ],
    icon: Coins, color: SG.finternetAmber,
    traditionalTime: "T+1 with Herstatt risk window", unitsTime: "T+1 via CLS, zero Herstatt risk",
  },
  {
    id: 3,
    title: "Securities Execution on European Market",
    subtitle: "EUR 50M Bund purchased on Eurex / OTC",
    actor: "DBS Securities (European Execution)",
    description: "DBS Securities executes the Bund purchase on Eurex (the primary exchange for European government bonds) or via OTC with a European counterparty. The trade is executed at the prevailing market price. Settlement follows the European standard: T+1 in Euroclear. DBS, as a direct Euroclear participant, receives the Bunds into its Euroclear account.",
    systemState: {
      "Execution Venue": "Eurex (Frankfurt) / OTC",
      "Trade Price": "EUR 101.25 (1.25% premium to par)",
      "Face Value": "EUR 50,000,000",
      "Market Value": "EUR 50,625,000",
      "Settlement": "T+1 in Euroclear (ISIN: DE0001102580)",
      "DBS Euroclear Account": "Pending delivery",
    },
    log: [
      "DBS Securities routes order to Eurex electronic order book",
      "Order filled: EUR 50M face at 101.25 (yield: 2.37%)",
      "Trade confirmed: Eurex trade ID EX-2026-04-08-BND-50M",
      "Settlement instruction sent to Euroclear: T+1 delivery",
      "Euroclear matching: DBS vs counterparty instructions matched",
      "Settlement date: T+1 (next business day)",
    ],
    icon: TrendingUp, color: "#10b981",
    traditionalTime: "T+1 settlement in Euroclear", unitsTime: "T+1 in Euroclear, then atomic on VANDA",
  },
  {
    id: 4,
    title: "Euroclear Settlement & Toket Minting",
    subtitle: "Bunds locked in Euroclear, Unsponsored Tokets minted on VANDA",
    actor: "DBS Bridge Operator + UNITS Settlement Engine",
    description: "On T+1, Euroclear settles the Bund delivery into DBS's segregated Euroclear account earmarked for VANDA. DBS, acting as the Bridge Operator, locks the Bunds in this segregated account and mints Unsponsored Tokets on VANDA representing the full economic interest: coupon payments, principal repayment, and market value. The tokets carry full metadata: ISIN, coupon rate, maturity date, Euroclear safekeeping location, and bridge operator identity.",
    systemState: {
      "Euroclear Status": "Settled, Bunds in DBS segregated account",
      "Toket Type": "Unsponsored Toket (proxy tokenisation)",
      "Toket Metadata": "ISIN DE0001102580, 2.5% coupon, 10Y maturity",
      "Bridge Operator": "DBS Global Transaction Services",
      "Safekeeping": "Euroclear, DBS segregated account #VANDA-EU-001",
      "VANDA Status": "EUR 50M Bund tokets minted, credited to GIC wallet",
    },
    log: [
      "Euroclear settlement: T+1 delivery confirmed",
      "Bunds credited to DBS Euroclear account #VANDA-EU-001 (segregated)",
      "DBS Bridge Operator initiates toket minting on VANDA",
      "Unsponsored Toket minted: EUR 50M face, ISIN DE0001102580",
      "Metadata embedded: coupon 2.5%, maturity 2036-04-08, Euroclear safekeeping",
      "Tokets credited to GIC UNITS Wallet",
      "Reconciliation: Euroclear position = VANDA toket supply (1:1)",
      "Token Program activated: coupon distribution, corporate actions, compliance hooks",
    ],
    icon: Layers, color: "#8b5cf6",
    traditionalTime: "Manual reconciliation, 1-3 days", unitsTime: "Atomic minting on settlement confirmation",
  },
  {
    id: 5,
    title: "Custody & Continuous Entitlement",
    subtitle: "Coupons auto-distribute, corporate actions execute on-ledger",
    actor: "Token Program (Entitlement Engine)",
    description: "From the moment tokets are minted, the Token Program manages the full custody lifecycle. When the Bund pays its semi-annual coupon, Euroclear credits DBS's account. The Token Program automatically distributes the coupon pro-rata to all toket holders in SGD (converted at the prevailing EUR/SGD rate via DBS treasury). Corporate actions, maturity events, and any issuer communications are processed on-ledger. GIC's portfolio managers see the position in their UNITS Wallet with real-time accrual.",
    systemState: {
      "Coupon Rate": "2.5% per annum (semi-annual)",
      "Semi-Annual Coupon": "EUR 625,000 per payment",
      "SGD Equivalent": "~SGD 905,625 per coupon (at current FX)",
      "WHT Applied": "0% (Germany-Singapore DTA, Article 11)",
      "Accrual Method": "Continuous, real-time in UNITS Wallet",
      "Next Coupon Date": "2026-10-08",
    },
    log: [
      "Continuous coupon accrual activated: EUR 1,712.33/day",
      "WHT determination: Germany-Singapore DTA, govt bonds = 0%",
      "No withholding deducted at source (vs 26.375% domestic rate)",
      "Annual WHT savings: EUR 329,687 on EUR 1,250,000 annual coupon",
      "Coupon distribution route: Euroclear → DBS → FX conversion → SGD to GIC wallet",
      "Token Program post-hook: emit coupon event for GIC reporting systems",
      "GIC portfolio view: real-time position with continuous accrual",
    ],
    icon: BarChart3, color: SG.finternetCyan,
    traditionalTime: "Batch processing, T+3 for coupon credit", unitsTime: "Same-day, automated distribution",
  },
  {
    id: 6,
    title: "Collateral Mobilisation",
    subtitle: "EUR 50M Bund tokets pledged as collateral for SGX-DC margin",
    actor: "VANDA Collateral Highway",
    description: "GIC mobilises the Bund tokets as collateral for SGX Derivatives Clearing (SGX-DC) margin requirements. On the traditional infrastructure, this would require moving the Bunds from Euroclear to a tri-party collateral agent, a process taking 1-3 days. On VANDA, the Collateral Highway enables same-day, atomic pledge: the Bund tokets are encumbered in GIC's wallet (not moved), and SGX-DC receives a verifiable collateral claim. The Bunds continue accruing coupons for GIC while pledged.",
    systemState: {
      "Collateral Action": "Pledge EUR 50M Bund tokets to SGX-DC",
      "Collateral Value": "EUR 50,625,000 (mark-to-market)",
      "Haircut": "2% (AAA sovereign, per SGX-DC schedule)",
      "Effective Collateral": "EUR 49,612,500",
      "Encumbrance": "Active, tokets locked in GIC wallet",
      "Coupon Entitlement": "Retained by GIC (pledgor)",
      "Substitution": "Available, atomic swap with other eligible assets",
    },
    log: [
      "GIC initiates collateral pledge: EUR 50M Bund tokets → SGX-DC",
      "Token Program pre-hook: validate SGX-DC as approved collateral taker",
      "Haircut applied: 2% (German Bund, AAA sovereign rating)",
      "Effective collateral value: EUR 49,612,500",
      "Encumbrance recorded on-ledger: tokets locked, transfer restricted",
      "SGX-DC receives verifiable collateral claim (not physical transfer)",
      "Coupon entitlement retained by GIC (pledgor continues to accrue)",
      "Substitution rights: GIC can atomically swap Bund tokets for SGS bonds or equities",
      "Traditional process: 1-3 days via tri-party agent. VANDA: 4.2 seconds",
    ],
    icon: Shield, color: "#a78bfa",
    traditionalTime: "1-3 business days via tri-party agent", unitsTime: "4.2 seconds, atomic pledge",
  },
  {
    id: 7,
    title: "Exit: Secondary Sale or Redemption",
    subtitle: "24/7 liquidity or Euroclear redemption",
    actor: "GIC Investment Operations + DBS Bridge",
    description: "GIC has two exit paths. Path A: sell the Bund tokets on VANDA's secondary market, 24/7, to any eligible buyer on the network. The buyer receives the tokets, GIC receives XSGD or SGD. Path B: instruct DBS to redeem the underlying Bunds in Euroclear. DBS burns the tokets on VANDA, unlocks the Bunds in Euroclear, and sells them on the European secondary market. Cash proceeds are remitted to GIC in SGD. Both paths are available simultaneously.",
    systemState: {
      "Exit Path A": "Secondary sale on VANDA (24/7, T+0)",
      "Exit Path B": "Euroclear redemption via DBS Bridge (T+1)",
      "Current Market Value": "EUR 51,200,000 (price appreciation)",
      "Unrealised P&L": "+EUR 575,000 (+1.14%)",
      "Accrued Coupon": "EUR 342,466 (200 days accrued)",
      "Total Return": "EUR 917,466 (+1.81%)",
    },
    log: [
      "GIC reviews exit options in UNITS Wallet",
      "Path A: List EUR 50M Bund tokets on VANDA secondary market",
      "  - Available 24/7, settlement T+0 (atomic DvP)",
      "  - Buyer pays in XSGD, GIC receives SGD instantly",
      "  - Collateral encumbrance must be released first",
      "Path B: Instruct DBS to redeem via Euroclear",
      "  - DBS burns tokets on VANDA",
      "  - DBS unlocks Bunds in Euroclear segregated account",
      "  - DBS sells Bunds on European secondary market",
      "  - Cash proceeds: EUR → SGD via DBS treasury FX",
      "  - Remittance to GIC: T+2 from European sale date",
      "GIC selects Path A for immediate liquidity",
      "Collateral release: SGX-DC encumbrance removed (atomic)",
      "Secondary sale executed: EUR 50M at 102.40, settled in 3.1 seconds",
    ],
    icon: Globe, color: "#f43f5e",
    traditionalTime: "T+2 to T+5 (European sale + FX + remittance)", unitsTime: "3.1 seconds (Path A) or T+2 (Path B)",
  },
];

/* ─── Comparison Data ─── */
const comparisons = [
  { dimension: "End-to-End Settlement", traditional: "T+1 to T+3 (multiple legs)", units: "T+1 Euroclear + atomic on VANDA", savings: "1-2 days" },
  { dimension: "FX Settlement Risk", traditional: "Herstatt risk during settlement window", units: "CLS PvP, zero Herstatt risk", savings: "100% risk eliminated" },
  { dimension: "Collateral Mobilisation", traditional: "1-3 days via tri-party agent", units: "4.2 seconds, atomic pledge", savings: "99.99%" },
  { dimension: "Coupon Processing", traditional: "Batch, T+3 credit, manual reconciliation", units: "Same-day, automated, continuous accrual", savings: "3 days" },
  { dimension: "WHT Application", traditional: "26.375% deducted, 6-18 month reclaim", units: "0% at source via DTA (automated)", savings: "EUR 329,687/year" },
  { dimension: "Collateral Substitution", traditional: "1-2 days, manual instruction chain", units: "Atomic swap, < 5 seconds", savings: "99.99%" },
  { dimension: "Portfolio Visibility", traditional: "End-of-day statements, T+1 reconciliation", units: "Real-time position, continuous accrual", savings: "24 hours" },
  { dimension: "Exit Liquidity", traditional: "European market hours only (T+2)", units: "24/7 secondary market (T+0) or Euroclear (T+2)", savings: "Extended access" },
  { dimension: "Operational Cost", traditional: "EUR 150-350 per cross-border institutional trade", units: "EUR 10-25 per trade", savings: "90-95%" },
];

/* ─── FX Model Comparison ─── */
const fxModels = [
  {
    layer: "Layer 1: Stablecoin Swap",
    description: "XSGD ↔ EUR stablecoin atomic swap on VANDA. Best for flows under EUR 5M.",
    speed: "< 3 seconds",
    risk: "Stablecoin issuer risk",
    cost: "2-5 bps spread",
    color: SG.masTeal,
  },
  {
    layer: "Layer 2: CLS PvP",
    description: "Institutional FX via CLS Payment-versus-Payment. Best for flows EUR 5M+. Used in this workflow.",
    speed: "T+1 (CLS window)",
    risk: "Zero (PvP)",
    cost: "1-3 bps (interbank)",
    color: SG.finternetAmber,
  },
  {
    layer: "Layer 3: Bank Treasury",
    description: "DBS converts SGD to EUR internally. Simplest model, most common for custody clients.",
    speed: "Intraday",
    risk: "Bank credit risk",
    cost: "3-8 bps (bank spread)",
    color: "#8b5cf6",
  },
];

/* ─── Main Component ─── */
export default function SGWorkflowInstitutionalFX() {
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
              <Building2 className="w-7 h-7" style={{ color: "#3b82f6" }} />
              <span className="text-xs font-mono tracking-wider" style={{ color: "rgba(59,130,246,0.6)" }}>UNITS|SG WORKFLOW</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Institutional FX & Foreign Securities</h1>
            <p className="text-sm max-w-2xl" style={{ color: "rgba(255,255,255,0.5)" }}>
              A Singapore sovereign wealth fund purchases EUR 50M of German Bunds through DBS, with CLS PvP FX settlement,
              Euroclear custody, Unsponsored Toket minting on VANDA, automated coupon distribution, and same-day collateral
              mobilisation for SGX-DC margin.
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {["GIC", "DBS GTS", "CLS", "Euroclear", "SGX-DC", "German Bund", "CLS PvP", "Collateral Highway"].map((tag) => (
                <span key={tag} className="px-2.5 py-1 rounded-full text-[10px] font-medium" style={{ background: "rgba(59,130,246,0.1)", color: "#60a5fa", border: "1px solid rgba(59,130,246,0.2)" }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Scenario Card */}
          <div className={`mb-10 rounded-xl p-6 transition-all duration-700 delay-100 ${revealed ? "opacity-100" : "opacity-0"}`} style={{ background: SG.card, border: `1px solid ${SG.border}` }}>
            <h3 className="text-sm font-mono uppercase tracking-wider mb-4" style={{ color: "rgba(59,130,246,0.6)" }}>Scenario</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {Object.entries(scenario).map(([key, val]) => (
                <div key={key} className="flex justify-between text-sm">
                  <span style={{ color: "rgba(255,255,255,0.35)" }}>{key.replace(/([A-Z])/g, " $1").replace(/^./, s => s.toUpperCase())}</span>
                  <span className="text-right font-mono text-xs" style={{ color: "rgba(255,255,255,0.7)" }}>{val}</span>
                </div>
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
                      background: isActive ? `${s.color}20` : isCompleted ? "rgba(16,185,129,0.1)" : SG.card,
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
              {/* Left */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${step.color}15`, border: `1px solid ${step.color}30` }}>
                    <StepIcon className="w-7 h-7" style={{ color: step.color }} />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-xs font-semibold tracking-wider uppercase" style={{ color: `${step.color}cc` }}>Step {step.id} of {STEPS.length}</span>
                      <span className="text-xs px-2 py-0.5 rounded" style={{ background: `${step.color}15`, color: step.color }}>{step.actor}</span>
                    </div>
                    <h2 className="text-xl font-medium text-white">{step.title}</h2>
                    <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>{step.subtitle}</p>
                  </div>
                </div>
                <p className="leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>{step.description}</p>
                {/* Event Log */}
                <div className="rounded-xl p-5" style={{ background: SG.card, border: `1px solid ${SG.border}` }}>
                  <h3 className="text-sm font-medium text-white/80 mb-3">Event Log</h3>
                  <div className="space-y-1.5 font-mono text-xs">
                    {step.log.map((entry, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400 mt-0.5 shrink-0" />
                        <span style={{ color: "rgba(255,255,255,0.55)" }}>{entry}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Time Comparison */}
                <div className="rounded-xl p-5" style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${SG.border}` }}>
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="w-4 h-4" style={{ color: "rgba(255,255,255,0.35)" }} />
                    <h4 className="text-xs font-mono uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.35)" }}>Traditional vs UNITS|SG</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs mb-1" style={{ color: "rgba(239,68,68,0.5)" }}>Traditional</div>
                      <div className="text-sm font-mono" style={{ color: "rgba(239,68,68,0.7)" }}>{step.traditionalTime}</div>
                    </div>
                    <div>
                      <div className="text-xs mb-1" style={{ color: "rgba(16,185,129,0.5)" }}>UNITS|SG</div>
                      <div className="text-sm font-mono" style={{ color: "rgba(16,185,129,0.8)" }}>{step.unitsTime}</div>
                    </div>
                  </div>
                </div>
                {/* Action */}
                <div className="flex items-center gap-4">
                  <Button onClick={advanceStep} disabled={completedSteps.has(currentStep) && currentStep === STEPS.length - 1}
                    className="text-sm font-medium px-6" style={{ background: step.color, color: "white" }}>
                    {completedSteps.has(currentStep) ? (currentStep < STEPS.length - 1 ? "Next Step" : "Workflow Complete") : "Execute Step"}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>{completedSteps.size} of {STEPS.length} steps completed</span>
                </div>
              </div>

              {/* Right: System State */}
              <div className="space-y-4">
                <div className="rounded-xl p-4" style={{ background: SG.card, border: `1px solid ${SG.border}` }}>
                  <div className="text-xs uppercase tracking-wider mb-3" style={{ color: `${step.color}80` }}>System State</div>
                  <div className="space-y-2">
                    {Object.entries(step.systemState).map(([k, v]) => (
                      <div key={k} className="flex justify-between text-sm">
                        <span style={{ color: "rgba(255,255,255,0.4)" }}>{k}</span>
                        <span className="font-mono text-xs text-right max-w-[180px]" style={{ color: "rgba(255,255,255,0.7)" }}>{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Execution Progress */}
                <div className="rounded-xl p-4" style={{ background: SG.card, border: `1px solid ${SG.border}` }}>
                  <div className="text-xs uppercase tracking-wider mb-3" style={{ color: "rgba(16,185,129,0.6)" }}>Execution Progress</div>
                  <div className="space-y-1.5 max-h-48 overflow-y-auto">
                    {Array.from(completedSteps).sort().map((si) => (
                      <div key={si} className="flex items-center gap-2 text-xs">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                        <span className="font-mono" style={{ color: "rgba(255,255,255,0.3)" }}>
                          {new Date(Date.now() - (STEPS.length - si) * 60000).toISOString().slice(11, 19)}
                        </span>
                        <span style={{ color: "rgba(255,255,255,0.55)" }}>{STEPS[si].title}</span>
                      </div>
                    ))}
                    {completedSteps.size === 0 && (
                      <div className="text-xs italic" style={{ color: "rgba(255,255,255,0.25)" }}>No steps executed yet.</div>
                    )}
                  </div>
                </div>
                {/* Key Advantage */}
                <div className="rounded-xl p-4" style={{ background: SG.card, border: `1px solid ${SG.border}` }}>
                  <div className="text-xs uppercase tracking-wider mb-3" style={{ color: `${SG.finternetAmber}80` }}>
                    <Shield className="w-3.5 h-3.5 inline mr-1" /> Key Advantage
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                    {currentStep === 0 && "Automated mandate and compliance checks replace 2-4 hours of manual verification. Token Programs read investment policies as executable rules, not PDF documents."}
                    {currentStep === 1 && "CLS PvP eliminates Herstatt risk on the EUR 50M FX leg. Both currency legs settle simultaneously, not sequentially. This is the institutional gold standard for FX settlement."}
                    {currentStep === 2 && "DBS executes on European venues using existing market access. VANDA does not replace the execution venue, it enhances what happens after execution: custody, settlement, and programmability."}
                    {currentStep === 3 && "Unsponsored Toket model means DBS does not need new infrastructure. It leverages its existing Euroclear membership. VANDA provides a programmable view into DBS's existing global custody network."}
                    {currentStep === 4 && "Continuous coupon accrual with automatic 0% WHT via DTA saves EUR 329,687/year on this single position. Across GIC's EUR bond portfolio, the savings are transformative."}
                    {currentStep === 5 && "Same-day collateral mobilisation of foreign securities is currently impossible through traditional custody chains. VANDA's Collateral Highway enables this in 4.2 seconds."}
                    {currentStep === 6 && "Dual exit paths give GIC maximum flexibility: instant liquidity on VANDA (24/7) or traditional Euroclear redemption. The choice is always available."}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* FX Model Comparison */}
          <div className={`mt-16 transition-all duration-700 delay-400 ${revealed ? "opacity-100" : "opacity-0"}`}>
            <h3 className="text-xl font-bold text-white mb-2">Three-Layer FX Model</h3>
            <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.4)" }}>
              VANDA supports three FX conversion models, each optimised for different trade sizes and institutional requirements.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              {fxModels.map((m) => (
                <div key={m.layer} className="rounded-xl p-5" style={{ background: SG.card, border: `1px solid ${SG.border}` }}>
                  <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                    <Coins className="w-4 h-4" style={{ color: m.color }} /> {m.layer}
                  </h4>
                  <p className="text-xs mb-4 leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>{m.description}</p>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between"><span style={{ color: "rgba(255,255,255,0.35)" }}>Speed</span><span style={{ color: "rgba(255,255,255,0.6)" }}>{m.speed}</span></div>
                    <div className="flex justify-between"><span style={{ color: "rgba(255,255,255,0.35)" }}>Risk</span><span style={{ color: "rgba(255,255,255,0.6)" }}>{m.risk}</span></div>
                    <div className="flex justify-between"><span style={{ color: "rgba(255,255,255,0.35)" }}>Cost</span><span style={{ color: "#10b981" }}>{m.cost}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Comparison Table */}
          <div className={`mt-16 transition-all duration-700 delay-500 ${revealed ? "opacity-100" : "opacity-0"}`}>
            <h3 className="text-xl font-bold text-white mb-6">End-to-End Comparison: Institutional Cross-Border</h3>
            <div className="rounded-2xl overflow-hidden" style={{ background: SG.card, border: `1px solid ${SG.border}` }}>
              <div className="grid grid-cols-4 gap-0 text-xs font-mono uppercase tracking-wider border-b" style={{ color: "rgba(255,255,255,0.35)", borderColor: SG.border }}>
                <div className="px-4 py-3">Dimension</div>
                <div className="px-4 py-3 border-l" style={{ borderColor: SG.border, color: "rgba(239,68,68,0.6)" }}>Today</div>
                <div className="px-4 py-3 border-l" style={{ borderColor: SG.border, color: "rgba(16,185,129,0.6)" }}>UNITS|SG</div>
                <div className="px-4 py-3 border-l" style={{ borderColor: SG.border, color: "rgba(59,130,246,0.6)" }}>Savings</div>
              </div>
              {comparisons.map((c, i) => (
                <div key={i} className="grid grid-cols-4 gap-0" style={{ borderBottom: i < comparisons.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                  <div className="px-4 py-3 text-sm font-medium" style={{ color: "rgba(255,255,255,0.65)" }}>{c.dimension}</div>
                  <div className="px-4 py-3 text-xs border-l" style={{ borderColor: SG.border, color: "rgba(239,68,68,0.4)" }}>{c.traditional}</div>
                  <div className="px-4 py-3 text-xs border-l" style={{ borderColor: SG.border, color: "rgba(16,185,129,0.6)" }}>{c.units}</div>
                  <div className="px-4 py-3 text-xs font-mono border-l" style={{ borderColor: SG.border, color: "rgba(59,130,246,0.7)" }}>{c.savings}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Related Links */}
          <div className={`mt-16 pt-8 transition-all duration-700 delay-600 ${revealed ? "opacity-100" : "opacity-0"}`} style={{ borderTop: `1px solid ${SG.border}` }}>
            <h3 className="text-sm uppercase tracking-wider mb-4 text-center" style={{ color: "rgba(255,255,255,0.3)" }}>Related Pages</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { href: "/sg/workflows/cross-border", label: "Cross-Border Settlement (Private Wealth)" },
                { href: "/sg/deep-dive/dvp-settlement", label: "DvP Settlement" },
                { href: "/sg/deep-dive/collateral-highway", label: "Collateral Highway" },
                { href: "/sg/deep-dive/cross-ledger", label: "Cross-Ledger Connectivity" },
                { href: "/sg/deep-dive/tokenisation", label: "Tokenisation" },
                { href: "/sg/workflows/collateral-mobilisation", label: "Collateral Mobilisation Workflow" },
              ].map((link) => (
                <Link key={link.href} href={link.href}
                  className="px-4 py-2 rounded-full text-sm transition-colors" style={{ color: "rgba(255,255,255,0.4)", border: `1px solid ${SG.border}` }}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* IPE Cross-Persona Callout */}
        <CrossPersonaCallout />
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
