import { useState } from "react";
import { CrossPersonaCallout } from "@/components/IPEComponents";
import { Link } from "wouter";
import SGPortalNav, { SG } from "@/components/SGPortalNav";
import { CinematicBackground } from "@/components/motion";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft, ArrowRight, CheckCircle2, Database, Shield, Layers,
  ArrowRightLeft, Building2, FileCheck, Lock, Eye, Network
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
}

const STEPS: WorkflowStep[] = [
  {
    id: 1, title: "Participant Onboarding", subtitle: "UNITS Wallet Provisioning",
    description: "DBS Bank provisions a UNITS Wallet anchored to their MAS-registered Legal Entity Identifier (LEI). The wallet is linked to their existing CDP Securities Account and MEPS+ cash account, creating a unified identity across both depositories.",
    details: [
      "LEI verified: 789DYKL23Z299LD2K456 (DBS Bank Ltd)",
      "UNITS Wallet ID: UW-SG-DBS-2026-001",
      "CDP Securities Account linked: CDP-DBS-001",
      "MEPS+ Cash Account linked: MEPS-DBS-SGD-001",
      "Jurisdiction: Singapore (SG)",
      "MAS Licence: Capital Markets Services Licence",
    ],
    systemState: { "Participant": "DBS Bank Ltd", "LEI": "789DYKL23Z299LD2K456", "UNITS Wallet": "UW-SG-DBS-2026-001", "CDP Link": "Active", "MEPS+ Link": "Active", "Status": "Onboarded" },
    icon: Building2, color: SG.masTeal,
  },
  {
    id: 2, title: "Asset Selection", subtitle: "CDP Equity Identification",
    description: "DBS selects a block of DBS Group Holdings shares (SGX: D05) held in their CDP Securities Account for proxy tokenisation. The system verifies the holding with CDP and confirms the shares are unencumbered and eligible for tokenisation.",
    details: [
      "ISIN: SG1L01001701 (DBS Group Holdings)",
      "SGX Ticker: D05",
      "Quantity: 500,000 shares",
      "CDP Holding verified: Unencumbered",
      "Current market price: SGD 41.50",
      "Notional value: SGD 20,750,000",
    ],
    systemState: { "Asset": "DBS Group Holdings (D05)", "ISIN": "SG1L01001701", "Quantity": "500,000 shares", "Value": "SGD 20,750,000", "CDP Status": "Verified, Unencumbered", "Tokenisation": "Pending" },
    icon: Database, color: SG.nusOrange,
  },
  {
    id: 3, title: "CDP Lock & Proxy Mint", subtitle: "Immobilisation + Token Creation",
    description: "CDP places a regulatory hold on the 500,000 DBS shares, preventing any movement through traditional channels. Simultaneously, UNITS Network mints 500,000 proxy tokets representing the locked shares. Each toket carries a cryptographic hash linking it to the underlying CDP record.",
    details: [
      "CDP Hold Reference: CDP-HOLD-2026-00847",
      "Hold type: Regulatory Immobilisation (MAS-approved)",
      "tokenClass: TC-SG-EQUITY-SGX",
      "tokenPool: TP-SG1L01001701-PROXY",
      "Tokets minted: 500,000",
      "Per-unit hash: SHA-256 linking to CDP record",
      "Mode: Proxy (CDP remains legal record-keeper)",
    ],
    systemState: { "CDP Hold": "CDP-HOLD-2026-00847", "Hold Status": "Active, Locked", "tokenPool": "TP-SG1L01001701-PROXY", "Proxy Tokets": "500,000 minted", "Mode": "Proxy", "Legal Record": "CDP (unchanged)" },
    icon: Lock, color: "#a78bfa",
  },
  {
    id: 4, title: "Token Program Attachment", subtitle: "Lifecycle Automation",
    description: "Token Programs are attached to the tokenPool, automating corporate actions, dividend distribution, and compliance checks. The programs reference SGX corporate action schedules and MAS regulatory requirements, ensuring the proxy tokets behave identically to the underlying shares.",
    details: [
      "TP-DIV: Auto-distribute dividends on ex-date (SGX calendar)",
      "TP-CA: Corporate action pass-through (rights, splits, mergers)",
      "TP-COMP: MAS compliance gate (transfer restrictions, reporting)",
      "TP-VOTE: Proxy voting rights preserved via CDP linkage",
      "TP-ENCUMB: Encumbrance support (pledge, lien for collateral use)",
      "All programs reference CDP as source of truth for entitlements",
    ],
    systemState: { "Token Programs": "5 attached", "Dividend Auto": "Enabled (SGX calendar)", "Corporate Actions": "Pass-through active", "Compliance": "MAS gates active", "Voting Rights": "Preserved via CDP", "Encumbrance": "Enabled" },
    icon: FileCheck, color: SG.finternetAmber,
  },
  {
    id: 5, title: "MAS Observer Verification", subtitle: "Regulatory Transparency",
    description: "MAS observer node receives real-time visibility of the proxy tokenisation event. The observer can verify the 1:1 correspondence between locked CDP shares and minted tokets, confirm compliance gate activation, and monitor the tokenPool without intervening in operations.",
    details: [
      "MAS Observer Node: MAS-OBS-SG-001",
      "Verification: 500,000 CDP shares locked = 500,000 tokets minted",
      "Compliance gates: All 5 Token Programs verified",
      "Audit trail: Immutable, timestamped",
      "Intervention capability: Freeze/pause if anomaly detected",
      "Reporting: Real-time dashboard for MAS supervision team",
    ],
    systemState: { "MAS Observer": "MAS-OBS-SG-001", "Verification": "1:1 confirmed", "Compliance": "All gates verified", "Audit Trail": "Active, immutable", "Anomaly Status": "None detected", "Supervision": "Real-time" },
    icon: Eye, color: SG.finternetCyan,
  },
  {
    id: 6, title: "Tokets Live on UNITS", subtitle: "Ready for Trading & Collateral",
    description: "The 500,000 proxy tokets are now live on the UNITS Network, held in DBS's UNITS Wallet. They can be traded atomically with other UNITS participants, used as collateral via encumbrance, or settled against XSGD. CDP continues as the legal depository, while UNITS provides the programmable, 24/7 operational layer.",
    details: [
      "DBS UNITS Wallet balance: 500,000 DBS (D05) proxy tokets",
      "Available for: Atomic DvP, Collateral pledge, Repo",
      "Settlement currency: XSGD (StraitsX) or MEPS+ SGD",
      "Trading hours: 24/7/365 (vs SGX 9:00-17:00)",
      "Reversibility: Can burn tokets and release CDP hold at any time",
      "Interoperability: Cross-asset with MEPS+ government securities tokets",
      "Price alignment: Designated Market Makers (DMMs) with dual-venue access arbitrage any divergence between toket price and SGX reference, using the CDP Bridge as the creation/redemption rail, identical to ETF AP arbitrage",
      "Reference pricing: SGX VWAP used as canonical price during SGX hours (9:00-17:00 SGT); after-hours toket price marked as indicative, capturing legitimate price discovery from global events",
      "Circuit breaker: If toket price diverges from SGX reference by more than 5%, VANDA matching engine triggers a cooling-off period, analogous to SGX dynamic circuit breakers",
    ],
    systemState: { "UNITS Wallet": "500,000 DBS (D05) tokets", "Status": "Live, tradeable", "Available For": "DvP, Collateral, Repo", "Trading Hours": "24/7/365", "CDP Hold": "Active (underlying locked)", "Reversible": "Yes, burn-to-release", "Price Alignment": "DMM arbitrage + SGX reference", "Circuit Breaker": "5% divergence threshold" },
    icon: Network, color: SG.masTeal,
  },
];

export default function SGWorkflowCDPBridge() {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const step = STEPS[currentStep];

  const advance = () => {
    setCompletedSteps((prev) => { const next = new Set(Array.from(prev)); next.add(currentStep); return next; });
    if (currentStep < STEPS.length - 1) setCurrentStep(currentStep + 1);
  };
  const goBack = () => { if (currentStep > 0) setCurrentStep(currentStep - 1); };

  return (
    <div className="vanda-portal min-h-screen text-white" style={{ background: SG.dark }}>
      <SGPortalNav />
      <div className="max-w-5xl mx-auto p-6 md:p-12">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/sg/workflows" className="text-sm flex items-center gap-1 transition-colors" style={{ color: "rgba(255,255,255,0.4)" }}>
            <ArrowLeft className="w-4 h-4" /> Workflows
          </Link>
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-4 mb-2">
            <ArrowRightLeft className="w-6 h-6" style={{ color: SG.masTeal }} />
            <h1 className="text-2xl font-bold text-white">CDP Bridge Workflow</h1>
          </div>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
            Proxy tokenisation of CDP-held equities onto the UNITS Network
          </p>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center gap-1 mb-8">
          {STEPS.map((s, i) => {
            const isCompleted = completedSteps.has(i);
            const isActive = i === currentStep;
            return (
              <button
                key={s.id}
                onClick={() => setCurrentStep(i)}
                className="flex-1 h-2 rounded-full transition-all cursor-pointer"
                style={{
                  background: isActive ? step.color : isCompleted ? `${SG.masTeal}60` : SG.border,
                  boxShadow: isActive ? `0 0 8px ${step.color}40` : "none",
                }}
              />
            );
          })}
        </div>

        {/* Step Counter */}
        <div className="flex items-center gap-2 mb-6">
          <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ color: step.color, background: `${step.color}15` }}>
            Step {step.id} of {STEPS.length}
          </span>
          <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>{step.subtitle}</span>
        </div>

        {/* Main Step Content */}
        <div
          key={currentStep}
          className="p-8 rounded-2xl border mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500"
          style={{ background: SG.card, borderColor: `${step.color}30` }}
        >
          <div className="flex items-center gap-5 mb-8">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ background: `${step.color}15` }}>
              <step.icon className="w-7 h-7" style={{ color: step.color }} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{step.title}</h2>
              <p className="text-sm" style={{ color: `${step.color}90` }}>{step.subtitle}</p>
            </div>
          </div>

          <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>{step.description}</p>

          {/* Details */}
          <div className="space-y-2 mb-6">
            {step.details.map((d, i) => (
              <div key={i} className="flex items-start gap-2 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
                <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: `${step.color}60` }} />
                <span>{d}</span>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-3 pt-4" style={{ borderTop: `1px solid ${SG.border}` }}>
            <Button variant="ghost" onClick={goBack} disabled={currentStep === 0} className="text-white/40 hover:text-white gap-2">
              <ArrowLeft className="w-4 h-4" /> Back
            </Button>
            <div className="flex-1" />
            {currentStep < STEPS.length - 1 ? (
              <Button onClick={advance} className="gap-2 text-white" style={{ background: step.color }}>
                Next: {STEPS[currentStep + 1].title} <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button onClick={advance} className="gap-2 text-white" style={{ background: SG.masTeal }}>
                <CheckCircle2 className="w-4 h-4" /> Complete Workflow
              </Button>
            )}
          </div>
        </div>

        {/* System State Panel */}
        <div
          key={`state-${currentStep}`}
          className="p-6 rounded-xl border mb-6 animate-in fade-in slide-in-from-right-4 duration-500"
          style={{ background: "rgba(255,255,255,0.02)", borderColor: SG.border }}
        >
          <p className="text-xs uppercase tracking-widest mb-4" style={{ color: "rgba(255,255,255,0.25)" }}>System State</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {Object.entries(step.systemState).map(([key, value]) => (
              <div key={key} className="p-4 rounded-lg" style={{ background: SG.card }}>
                <p className="text-[10px] uppercase tracking-wider mb-1" style={{ color: "rgba(255,255,255,0.25)" }}>{key}</p>
                <p className="text-xs font-medium" style={{ color: step.color }}>{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Execution Log */}
        <div className="p-6 rounded-xl border" style={{ background: "rgba(255,255,255,0.02)", borderColor: SG.border }}>
          <p className="text-xs uppercase tracking-widest mb-4" style={{ color: "rgba(255,255,255,0.25)" }}>Execution Log</p>
          <div className="space-y-2 font-mono text-xs">
            {STEPS.slice(0, currentStep + 1).map((s, i) => (
              <div key={i} className="flex items-center gap-3">
                {completedSteps.has(i) ? (
                  <CheckCircle2 className="w-3.5 h-3.5" style={{ color: SG.masTeal }} />
                ) : i === currentStep ? (
                  <div className="w-3.5 h-3.5 rounded-full animate-pulse" style={{ background: step.color }} />
                ) : (
                  <div className="w-3.5 h-3.5 rounded-full" style={{ background: SG.border }} />
                )}
                <span style={{ color: i === currentStep ? "white" : "rgba(255,255,255,0.35)" }}>{s.title}</span>
              </div>
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
  );
}
