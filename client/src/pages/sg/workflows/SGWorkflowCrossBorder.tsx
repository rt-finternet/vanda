import { useState, useEffect } from "react";
import { CrossPersonaCallout } from "@/components/IPEComponents";
import { Link } from "wouter";
import SGPortalNav, { SG } from "@/components/SGPortalNav";
import { CinematicBackground } from "@/components/motion";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft, ArrowRight, CheckCircle2, Users, FileSearch,
  ArrowRightLeft, Coins, BarChart3, Layers, Clock, Shield, Globe
} from "lucide-react";

const SG_LOGO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663328851912/82pWKmUqBRkgn8Ladat8sj/units-sg-orchid-logo-light-KqELedrzeYmCnakJE4pQSh.png";
const FINTERNET_LOGO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663328851912/82pWKmUqBRkgn8Ladat8sj/yP0fvxrB3mwq_e7583308.png";

/* ─── Scenario ─── */
const scenario = {
  investor: "Wei Lin Chen",
  investorType: "Singapore-based Private Wealth Client",
  distributor: "DBS Private Banking",
  asset: "German Federal Government Bond (Bund) 2.5% 10Y",
  investmentAmount: "SGD 500,000",
  eurEquivalent: "EUR 345,000 (at 1 SGD = 0.69 EUR)",
  cashLeg: "XSGD (MAS-Regulated Stablecoin by StraitsX)",
  whtRate: "Germany: 26.375% domestic → 0% via SG-DE DTA",
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
    id: 1, title: "Investor Onboarding & VC Issuance", subtitle: "Tax residency and accreditation verified on-chain",
    actor: "DBS Private Banking",
    description: "Wei Lin Chen opens a UNITS Wallet through DBS Private Banking's white-label interface. DBS, as a MAS-licensed financial institution, issues Verifiable Credentials (VCs) attesting to the investor's identity, tax residency (Singapore), accredited investor status, and source of funds. These VCs are cryptographically bound to the wallet and readable by Token Programs at settlement time.",
    systemState: {
      "Wallet Status": "Active, UNITS Wallet via DBS",
      "VC-01: Identity": "Wei Lin Chen, Singapore NRIC verified",
      "VC-07: Tax Residency": "Singapore (IRAS Tax Reference)",
      "VC-03: Accredited Investor": "MAS Accredited Investor (S$2M+ net assets)",
      "Cash Balance": "SGD 500,000 in XSGD (MAS-regulated stablecoin)",
    },
    log: [
      "DBS KYC/AML check completed against MAS requirements",
      "VCs issued: VC-01 (Identity), VC-07 (Tax Residency: SG), VC-03 (Accredited Investor)",
      "UNITS Wallet provisioned with DBS branding",
      "SGD 500,000 converted to XSGD via StraitsX (1:1 SGD-pegged, MAS-regulated)",
      "XSGD reserve attestation verified: fully backed by SGD in segregated trust account",
    ],
    icon: Users, color: "#3b82f6",
    traditionalTime: "5-15 business days", unitsTime: "< 30 minutes",
  },
  {
    id: 2, title: "Order Placement & Pre-Trade Compliance", subtitle: "Automated eligibility check across jurisdictions",
    actor: "Token Program (Compliance Engine)",
    description: "Wei Lin places an order to purchase EUR 345,000 of the 2.5% German Bund through the DBS UNITS Wallet interface. Before the order reaches the market, the Token Program performs an automated pre-trade compliance check: it reads the investor's VCs to verify eligibility (accredited investor for this instrument class), checks the Bund's distribution rules (no restrictions for Singapore investors), and pre-calculates the applicable withholding tax rate by cross-referencing VC-07 (Singapore tax resident) against the Germany-Singapore Double Taxation Agreement.",
    systemState: {
      "Order": "BUY EUR 345,000 face value, 2.5% 10Y Bund",
      "Cash Required": "SGD 500,000 in XSGD",
      "FX Rate": "1 EUR = 1.4493 SGD (atomic, no spread)",
      "Pre-Trade WHT Check": "Germany-Singapore DTA: 0% on govt bond interest",
      "Eligibility": "PASS: Accredited investor, no distribution restrictions",
    },
    log: [
      "Order received: BUY EUR 345,000 face Bund via DBS UNITS Wallet",
      "Token Program reads VC-03: Accredited Investor = TRUE",
      "Distribution rules check: German Bund, no SG investor restrictions",
      "VC-07 cross-referenced with Germany-Singapore DTA: Article 11",
      "WHT pre-calculation: 0% on government bond interest (vs 26.375% domestic)",
      "Pre-trade compliance: ALL CHECKS PASSED",
    ],
    icon: FileSearch, color: "#10b981",
    traditionalTime: "1-3 business days", unitsTime: "< 2 seconds",
  },
  {
    id: 3, title: "Atomic Cross-Currency DvP Settlement", subtitle: "Bund delivery vs XSGD payment in 2.3 seconds",
    actor: "UNITS|SG Settlement Engine",
    description: "The settlement executes as a three-legged atomic transaction: (1) the Bund toket is locked from the seller, (2) XSGD 500,000 is locked from Wei Lin's wallet, and (3) FX conversion is executed at mid-market rate. All three legs succeed or none do. There is no Herstatt risk, no correspondent banking chain, no nostro/vostro accounts. Settlement finality is achieved in 2.3 seconds.",
    systemState: {
      "Settlement Type": "Atomic 3-leg DvP with embedded FX",
      "Bund Custody": "Unsponsored Toket via DBS Euroclear account",
      "Leg 1": "Bund toket (EUR 345,000) locked from seller",
      "Leg 2": "XSGD 500,000 locked from Wei Lin's wallet",
      "Leg 3": "FX at mid-market rate (1 EUR = 1.4493 SGD)",
      "FX Model": "Layer 1: On-network stablecoin swap",
      "Finality": "2.3 seconds",
    },
    log: [
      "Settlement initiated: Atomic 3-leg DvP with embedded FX",
      "Bund held as Unsponsored Toket: DBS locks Bunds in segregated Euroclear account, mints tokets on VANDA",
      "Leg 1: Bund toket (EUR 345,000 face) locked from seller",
      "Leg 2: XSGD 500,000 locked from Wei Lin's UNITS Wallet",
      "Leg 3: FX conversion at mid-market rate (1 EUR = 1.4493 SGD)",
      "FX Model: Layer 1 (stablecoin-to-stablecoin atomic swap on VANDA), Layer 2 (CLS PvP for institutional flows, $6.5T/day), Layer 3 (DBS treasury internal FX)",
      "This trade uses Layer 1: XSGD swapped atomically for EUR stablecoin via DBS FX liquidity pool on VANDA",
      "All 3 legs validated, atomic commit executed",
      "Bund toket credited to Wei Lin's UNITS Wallet",
      "XSGD debited, EUR credited to seller's wallet",
      "Settlement finality achieved in 2.3 seconds",
      "No correspondent banking, no nostro/vostro, no Herstatt risk",
      "Coupon auto-distribution via Token Program: Euroclear credits DBS, VANDA distributes pro-rata in SGD to all toket holders",
    ],
    icon: ArrowRightLeft, color: SG.finternetAmber,
    traditionalTime: "T+2 (2 business days)", unitsTime: "2.3 seconds",
  },
  {
    id: 4, title: "Continuous Coupon Accrual & WHT", subtitle: "Real-time yield accrual with automatic treaty-rate WHT",
    actor: "Token Program (Entitlement Engine)",
    description: "From the moment of settlement, the Bund toket begins accruing coupon entitlement continuously. The Token Program reads Wei Lin's VC-07 (Singapore tax resident) and applies the Germany-Singapore DTA rate of 0% on government bond interest, so no withholding tax is deducted. No manual tax reclaim forms, no 6-18 month wait for refunds, no intermediary fees. The accrued entitlement is visible in real-time in the DBS UNITS Wallet interface.",
    systemState: {
      "Coupon Rate": "2.5% per annum (continuous accrual)",
      "Daily Accrual": "EUR 23.63 (EUR 345,000 × 2.5% / 365)",
      "WHT Applied": "0% (Germany-Singapore DTA, auto via VC-07)",
      "Net Daily Accrual": "EUR 23.63 (no WHT deduction)",
      "Traditional WHT": "26.375% domestic rate, then manual reclaim",
    },
    log: [
      "Continuous coupon accrual activated for Bund toket",
      "Token Program reads VC-07: Tax Residency = Singapore",
      "DTA lookup: Germany-Singapore, Article 11, Government bonds = 0%",
      "WHT rate applied: 0% (vs 26.375% domestic rate)",
      "Traditional process eliminated: no WHT deduction, no reclaim forms",
      "Savings: EUR 2,274/year in avoided WHT on EUR 8,625 annual coupon",
      "Accrual visible in DBS UNITS Wallet: EUR 23.63/day net",
    ],
    icon: Coins, color: "#8b5cf6",
    traditionalTime: "6-18 months for WHT reclaim", unitsTime: "Instant (0% at source)",
  },
  {
    id: 5, title: "Mid-Period Sale with Entitlement Split", subtitle: "Accrued interest splits atomically between seller and buyer",
    actor: "UNITS|SG Continuous Entitlement Engine",
    description: "After holding the Bund for 7 months, Wei Lin decides to sell. The Continuous Entitlement Engine handles this atomically: Wei Lin receives a coupon entitlement toket for exactly 7 months of accrued interest (EUR 5,031.25), and the buyer's toket begins accruing from the purchase moment. No ex-date confusion, no record date risk, no failed settlement due to entitlement disputes.",
    systemState: {
      "Holding Period": "7 months (213 days)",
      "Accrued Entitlement": "EUR 5,031.25 (213/365 × EUR 8,625)",
      "Entitlement Split": "Atomic: seller gets coupon toket, buyer accrues from now",
      "Sale Price": "Clean price only (no dirty/clean confusion)",
      "Buyer WHT Rate": "Determined by buyer's VC-07 at settlement",
    },
    log: [
      "Wei Lin initiates SELL order: EUR 345,000 face Bund toket",
      "Continuous Entitlement Engine: 213 days accrued = EUR 5,031.25",
      "Coupon entitlement toket minted for Wei Lin: EUR 5,031.25",
      "Bund toket transferred to buyer with fresh accrual start",
      "Buyer's VC-07 read: determines their WHT rate for future coupons",
      "Clean price settlement: no dirty/clean confusion",
      "Total Wei Lin return: EUR 5,031.25 coupon + capital gain on Bund",
    ],
    icon: BarChart3, color: SG.finternetCyan,
    traditionalTime: "Accrued interest disputes common", unitsTime: "Atomic, zero disputes",
  },
  {
    id: 6, title: "Structured Note Maturity & Physical Delivery", subtitle: "50-stock basket delivered atomically in 4.7 seconds",
    actor: "Token Program (Cross-Asset Conversion)",
    description: "Wei Lin also holds a Euro Stoxx 50 Linked Note that reaches maturity with physical delivery of the underlying basket. The Token Program executes this as an atomic cross-asset conversion: the structured note toket is burned, and the underlying equity tokets (ASML, LVMH, SAP, etc.) are minted directly into Wei Lin's wallet. The investor's VC-07 determines the WHT rate for each jurisdiction's equities.",
    systemState: {
      "Instrument": "Euro Stoxx 50 Linked Note (Physical Delivery)",
      "Conversion": "Atomic: Note toket burned, equity tokets minted",
      "Underlying Basket": "ASML (NL), LVMH (FR), SAP (DE), + 47 others",
      "WHT per Jurisdiction": "NL: 15%, FR: 15% (DTA), DE: 0% (DTA)",
      "Delivery Time": "4.7 seconds for 50-stock basket",
    },
    log: [
      "Structured note maturity triggered: physical delivery elected",
      "Token Program initiates cross-asset atomic conversion",
      "Note toket burned: EUR 345,000 face value",
      "Equity tokets minted: 50 underlying constituents",
      "VC-07 applied per jurisdiction: NL 15%, FR 15% (DTA), DE 0% (DTA)",
      "All equity tokets credited to Wei Lin's UNITS Wallet",
      "DBS interface shows: 50 equity positions with continuous dividend accrual",
      "Total time: 4.7 seconds for 50-stock basket delivery",
    ],
    icon: Layers, color: "#f43f5e",
    traditionalTime: "5-10 business days", unitsTime: "4.7 seconds",
  },
];

/* ─── Comparison Data ─── */
const comparisons = [
  { dimension: "Settlement Speed", traditional: "T+2 (2 business days)", units: "2-5 seconds", savings: "99.99%" },
  { dimension: "FX Execution", traditional: "Separate trade, 5-15bps spread", units: "3-layer model: stablecoin swap (atomic), CLS PvP (institutional), bank treasury (simplest)", savings: "5-15bps" },
  { dimension: "WHT Application", traditional: "26.375% deducted, 6-18 month reclaim", units: "0% applied at source via VC-07", savings: "100% of reclaim cost" },
  { dimension: "Correspondent Banking", traditional: "3-5 intermediaries, each taking fees", units: "Direct, no intermediaries", savings: "8-12bps" },
  { dimension: "Coupon Processing", traditional: "Annual, batch, record date mechanics", units: "Continuous, real-time, no record dates", savings: "EUR 15-25/event" },
  { dimension: "Mid-Period Sale", traditional: "Dirty/clean price, accrued interest calc", units: "Atomic entitlement split", savings: "Zero disputes" },
  { dimension: "Physical Delivery", traditional: "5-10 days, partial failures common", units: "4.7 seconds, atomic all-or-nothing", savings: "99.99%" },
  { dimension: "Herstatt Risk", traditional: "Present during FX settlement window", units: "Eliminated (atomic DvP)", savings: "100%" },
  { dimension: "Operational Cost", traditional: "EUR 45-85 per cross-border trade", units: "EUR 2-5 per trade", savings: "90-95%" },
];

/* ─── Corridor Data ─── */
const corridors = [
  { corridor: "Singapore → Europe", stablecoin: "XSGD (StraitsX)", regulator: "MAS", framework: "Payment Services Act 2019", whtAdvantage: "0% on govt bonds via DTA", color: SG.masTeal },
  { corridor: "Singapore → Hong Kong", stablecoin: "XSGD → XHKD", regulator: "MAS / HKMA", framework: "PSA 2019 / SVFO", whtAdvantage: "0% on most securities via DTA", color: SG.finternetAmber },
  { corridor: "Singapore → Japan", stablecoin: "XSGD → XJPY", regulator: "MAS / JFSA", framework: "PSA 2019 / FIEA", whtAdvantage: "0-10% via SG-JP DTA", color: "#8b5cf6" },
  { corridor: "Singapore → United States", stablecoin: "XSGD → USDC", regulator: "MAS / SEC", framework: "PSA 2019 / Securities Act", whtAdvantage: "0% on govt bonds, 15% on equities via DTA", color: SG.nusOrange },
  { corridor: "Singapore → Australia", stablecoin: "XSGD → XAUD", regulator: "MAS / ASIC", framework: "PSA 2019 / Corporations Act", whtAdvantage: "0-15% via SG-AU DTA", color: SG.red },
  { corridor: "Singapore → Korea", stablecoin: "XSGD → XKRW", regulator: "MAS / FSC", framework: "PSA 2019 / FSCMA", whtAdvantage: "0-15% via SG-KR DTA", color: "#6366f1" },
];

/* ─── Main Component ─── */
export default function SGWorkflowCrossBorder() {
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
      <div className="vanda-portal min-h-screen" style={{ background: SG.dark, color: "rgba(255,255,255,0.85)" }}>
        <CinematicBackground />
        <div className="max-w-6xl mx-auto px-6 py-16">
          {/* Header */}
          <div className={`mb-10 transition-all duration-700 ${revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <Link href="/sg/workflows" className="inline-flex items-center gap-2 text-sm mb-6 transition-colors" style={{ color: "rgba(255,255,255,0.4)" }}>
              <ArrowLeft className="w-4 h-4" /> Back to Workflows
            </Link>
            <div className="flex items-center gap-4 mb-3">
              <Globe className="w-7 h-7" style={{ color: "#3b82f6" }} />
              <span className="text-xs font-mono tracking-wider" style={{ color: "rgba(59,130,246,0.6)" }}>UNITS|SG WORKFLOW</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Cross-Border Settlement</h1>
            <p className="text-sm max-w-2xl" style={{ color: "rgba(255,255,255,0.5)" }}>
              A Singapore private wealth client buys a German Bund using XSGD stablecoin with atomic cross-currency DvP,
              automatic treaty-rate WHT, continuous coupon accrual, and structured note physical delivery.
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {["DBS Private Banking", "Wei Lin Chen", "XSGD (StraitsX)", "German Bund", "MAS", "Germany-SG DTA", "Atomic FX"].map((tag) => (
                <span key={tag} className="px-3 py-1.5 rounded-full text-[10px] font-medium" style={{ background: "rgba(59,130,246,0.1)", color: "#60a5fa", border: "1px solid rgba(59,130,246,0.2)" }}>
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
                    <div className="flex items-center gap-4 mb-1">
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
                  <div className="flex items-center gap-3 mb-4">
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
                    {currentStep === 0 && "VC-based onboarding eliminates paper forms and manual tax documentation. DBS issues machine-readable credentials in minutes, not weeks."}
                    {currentStep === 1 && "Pre-trade compliance is automated and instant. No manual checks, no compliance team bottleneck, no rejected trades after the fact."}
                    {currentStep === 2 && "Atomic 3-leg DvP eliminates Herstatt risk entirely. No correspondent banking chain means no intermediary fees and no settlement failures."}
                    {currentStep === 3 && "Automatic 0% WHT via DTA saves EUR 2,274/year on this single bond. Across a portfolio, the savings are transformative."}
                    {currentStep === 4 && "Atomic entitlement split eliminates the entire dirty/clean price confusion and accrued interest disputes that plague cross-border bond trading."}
                    {currentStep === 5 && "50-stock physical delivery in 4.7 seconds replaces a 5-10 day process with common partial delivery failures."}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Comparison Table */}
          <div className={`mt-16 transition-all duration-700 delay-400 ${revealed ? "opacity-100" : "opacity-0"}`}>
            <h3 className="text-xl font-bold text-white mb-6">End-to-End Comparison</h3>
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

          {/* Corridor Expansion */}
          <div className={`mt-16 transition-all duration-700 delay-500 ${revealed ? "opacity-100" : "opacity-0"}`}>
            <h3 className="text-xl font-bold text-white mb-2">Cross-Border Corridor Expansion</h3>
            <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.4)" }}>
              The same architecture extends to multiple corridors from Singapore, each leveraging favourable DTA terms.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              {corridors.map((c) => (
                <div key={c.corridor} className="rounded-xl p-5" style={{ background: SG.card, border: `1px solid ${SG.border}` }}>
                  <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-3">
                    <Globe className="w-4 h-4" style={{ color: c.color }} /> {c.corridor}
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between"><span style={{ color: "rgba(255,255,255,0.35)" }}>Stablecoin</span><span style={{ color: "rgba(255,255,255,0.6)" }}>{c.stablecoin}</span></div>
                    <div className="flex justify-between"><span style={{ color: "rgba(255,255,255,0.35)" }}>Regulator</span><span style={{ color: "rgba(255,255,255,0.6)" }}>{c.regulator}</span></div>
                    <div className="flex justify-between"><span style={{ color: "rgba(255,255,255,0.35)" }}>Framework</span><span style={{ color: "rgba(255,255,255,0.6)" }}>{c.framework}</span></div>
                    <div className="flex justify-between"><span style={{ color: "rgba(255,255,255,0.35)" }}>WHT Advantage</span><span style={{ color: "#10b981" }}>{c.whtAdvantage}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Related Links */}
          <div className={`mt-16 pt-8 transition-all duration-700 delay-600 ${revealed ? "opacity-100" : "opacity-0"}`} style={{ borderTop: `1px solid ${SG.border}` }}>
            <h3 className="text-sm uppercase tracking-wider mb-4 text-center" style={{ color: "rgba(255,255,255,0.3)" }}>Related Pages</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { href: "/sg/deep-dive/dvp-settlement", label: "DvP Settlement" },
                { href: "/sg/deep-dive/cross-ledger", label: "Cross-Ledger Connectivity" },
                { href: "/sg/deep-dive/unsponsored-tokets", label: "Unsponsored Tokets" },
                { href: "/sg/deep-dive/tokenisation", label: "Tokenisation" },
                { href: "/sg/deep-dive/token-programs", label: "Token Programs" },
                { href: "/sg/workflows/atomic-dvp", label: "Atomic DvP Workflow" },
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
