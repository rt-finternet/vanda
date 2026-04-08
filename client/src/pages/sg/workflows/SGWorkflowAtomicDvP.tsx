import { useState } from "react";
import { CrossPersonaCallout } from "@/components/IPEComponents";
import { Link } from "wouter";
import SGPortalNav, { SG } from "@/components/SGPortalNav";
import { CinematicBackground } from "@/components/motion";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft, ArrowRight, CheckCircle2, Zap, Shield, Lock,
  Banknote, Building2, FileCheck, Eye, Network, Clock
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
    id: 1, title: "Trade Initiation", subtitle: "SGS Bond Purchase Order",
    description: "OCBC Bank initiates a purchase of Singapore Government Securities (SGS) 10-year bonds from DBS Bank. Today this would settle T+1 through MEPS+. On UNITS Network, both parties have wallets linked to their MEPS+ accounts and hold tokenised SGS bonds.",
    details: [
      "Buyer: OCBC Bank (UW-SG-OCBC-2026-001)",
      "Seller: DBS Bank (UW-SG-DBS-2026-001)",
      "Asset: SGS 10Y Bond (ISIN: SG7Z48000009)",
      "Quantity: SGD 50,000,000 face value",
      "Price: 101.25 (SGD 50,625,000)",
      "Settlement: Atomic DvP (vs T+1 traditional)",
    ],
    systemState: { "Trade ID": "TRD-SG-2026-04821", "Buyer": "OCBC Bank", "Seller": "DBS Bank", "Asset": "SGS 10Y (SG7Z48000009)", "Amount": "SGD 50,625,000", "Status": "Initiated" },
    icon: Building2, color: SG.nusOrange,
  },
  {
    id: 2, title: "Pre-Trade Validation", subtitle: "Compliance & Balance Check",
    description: "UNITS Network validates both parties before execution. DBS's wallet is checked for sufficient SGS tokets, OCBC's wallet is checked for sufficient XSGD balance. MAS compliance gates verify both parties hold valid Capital Markets Services Licences and the trade meets regulatory thresholds.",
    details: [
      "DBS SGS toket balance: 200,000,000 (sufficient for 50,000,000)",
      "OCBC XSGD balance: 75,000,000 (sufficient for 50,625,000)",
      "VC-01 Institutional Identity: Both verified",
      "VC-02 Eligibility: Both approved for SGS trading",
      "VC-04 Regulatory Compliance: MAS CMSL verified",
      "Large trade reporting threshold: Not triggered (below SGD 100M)",
    ],
    systemState: { "DBS SGS Balance": "200M (sufficient)", "OCBC XSGD Balance": "75M (sufficient)", "DBS Credentials": "All verified", "OCBC Credentials": "All verified", "Compliance": "Passed", "Status": "Validated" },
    icon: Shield, color: SG.masTeal,
  },
  {
    id: 3, title: "Atomic Lock", subtitle: "Simultaneous Encumbrance",
    description: "Both legs of the trade are locked simultaneously in a single atomic operation. DBS's 50,000,000 SGS tokets and OCBC's 50,625,000 XSGD are encumbered at the same instant. Neither party can move these assets until the settlement completes or the lock expires.",
    details: [
      "Securities leg: 50,000,000 SGS tokets locked in DBS wallet",
      "Cash leg: 50,625,000 XSGD locked in OCBC wallet",
      "Lock type: Atomic DvP Encumbrance",
      "Lock reference: LOCK-DVP-2026-04821",
      "Expiry: 30 seconds (auto-release if settlement fails)",
      "Both locks created in single transaction (atomic guarantee)",
    ],
    systemState: { "Securities Lock": "50M SGS locked (DBS)", "Cash Lock": "50.625M XSGD locked (OCBC)", "Lock Ref": "LOCK-DVP-2026-04821", "Lock Type": "Atomic DvP", "Expiry": "30 seconds", "Status": "Both legs locked" },
    icon: Lock, color: "#a78bfa",
  },
  {
    id: 4, title: "Settlement Execution", subtitle: "Simultaneous Transfer",
    description: "The settlement engine executes both transfers in a single atomic transaction. SGS tokets move from DBS to OCBC, XSGD moves from OCBC to DBS. Both transfers succeed or both fail. There is zero settlement risk, the transfer is final and irrevocable.",
    details: [
      "Securities transfer: DBS -> OCBC (50,000,000 SGS tokets)",
      "Cash transfer: OCBC -> DBS (50,625,000 XSGD)",
      "Execution time: 1.2 seconds",
      "Finality: Immediate, irrevocable",
      "Settlement risk: Zero (atomic guarantee)",
      "Compared to T+1 MEPS+: 24+ hours eliminated",
    ],
    systemState: { "Securities": "DBS -> OCBC (50M SGS)", "Cash": "OCBC -> DBS (50.625M XSGD)", "Execution Time": "1.2 seconds", "Finality": "Immediate", "Settlement Risk": "Zero", "Status": "Settled" },
    icon: Zap, color: SG.nusOrange,
  },
  {
    id: 5, title: "Post-Trade Processing", subtitle: "Automated Reconciliation",
    description: "Post-trade processing happens automatically. MEPS+ records are updated to reflect the new beneficial ownership (since the SGS tokets are proxy-linked to MEPS+ records). Token Programs trigger automatic reporting to MAS. Both parties' UNITS Wallets reflect updated balances instantly.",
    details: [
      "MEPS+ record updated: Beneficial ownership transferred",
      "DBS new SGS balance: 150,000,000 tokets",
      "OCBC new SGS balance: 50,000,000 tokets",
      "DBS new XSGD balance: +50,625,000",
      "OCBC new XSGD balance: -50,625,000",
      "MAS reporting: Automated via Token Program TP-COMP",
    ],
    systemState: { "DBS SGS": "150M tokets", "OCBC SGS": "50M tokets", "DBS XSGD": "+50.625M", "OCBC XSGD": "-50.625M", "MEPS+ Sync": "Updated", "MAS Report": "Auto-filed" },
    icon: FileCheck, color: SG.finternetAmber,
  },
  {
    id: 6, title: "MAS Observer Audit", subtitle: "Real-Time Supervision",
    description: "MAS observer node has real-time visibility of the entire settlement. The observer can verify the atomic execution, confirm both legs settled simultaneously, and access the complete audit trail. No manual reconciliation or T+1 confirmation is needed.",
    details: [
      "MAS Observer: Full trade lifecycle visible",
      "Atomic verification: Both legs confirmed simultaneous",
      "Audit trail: Immutable, timestamped, cryptographically signed",
      "Reconciliation: Not needed (single source of truth)",
      "Anomaly detection: None triggered",
      "Supervision dashboard: Updated in real-time",
    ],
    systemState: { "MAS Observer": "Full visibility", "Atomic Verified": "Both legs simultaneous", "Audit Trail": "Complete, immutable", "Reconciliation": "Not needed", "Anomalies": "None", "Status": "Supervised" },
    icon: Eye, color: SG.finternetCyan,
  },
  {
    id: 7, title: "Settlement Complete", subtitle: "Finality Achieved",
    description: "The entire DvP settlement is complete. What traditionally takes T+1 (over 24 hours) through MEPS+ has been executed in 1.2 seconds with zero settlement risk. Both parties have final, irrevocable positions. The trade is available for the next operation immediately, whether that is another trade, collateral pledge, or repo.",
    details: [
      "Total elapsed time: 1.2 seconds (vs 24+ hours T+1)",
      "Settlement risk eliminated: 100%",
      "Counterparty credit risk: Zero (atomic)",
      "Manual reconciliation: Eliminated",
      "Regulatory reporting: Automatic",
      "Next available operation: Immediate (trade, pledge, repo)",
    ],
    systemState: { "Settlement": "Complete", "Time": "1.2 seconds", "Risk": "Zero", "Finality": "Irrevocable", "Next Op": "Immediately available", "Improvement": "24h -> 1.2s" },
    icon: Network, color: SG.masTeal,
  },
];

export default function SGWorkflowAtomicDvP() {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const step = STEPS[currentStep];

  const advance = () => {
    setCompletedSteps((prev) => { const next = new Set(Array.from(prev)); next.add(currentStep); return next; });
    if (currentStep < STEPS.length - 1) setCurrentStep(currentStep + 1);
  };
  const goBack = () => { if (currentStep > 0) setCurrentStep(currentStep - 1); };

  return (
    <div className="min-h-screen text-white" style={{ background: SG.dark }}>
      <SGPortalNav />
      <div className="max-w-5xl mx-auto p-6 md:p-12">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Link href="/sg/workflows" className="text-sm flex items-center gap-1 transition-colors" style={{ color: "rgba(255,255,255,0.4)" }}>
            <ArrowLeft className="w-4 h-4" /> Workflows
          </Link>
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Zap className="w-6 h-6" style={{ color: SG.nusOrange }} />
            <h1 className="text-2xl font-bold text-white">Atomic DvP Workflow</h1>
          </div>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
            Real-time atomic delivery-versus-payment with XSGD settlement
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
                  background: isActive ? step.color : isCompleted ? `${SG.nusOrange}60` : SG.border,
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
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ background: `${step.color}15` }}>
              <step.icon className="w-7 h-7" style={{ color: step.color }} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{step.title}</h2>
              <p className="text-sm" style={{ color: `${step.color}90` }}>{step.subtitle}</p>
            </div>
          </div>

          <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>{step.description}</p>

          <div className="space-y-2 mb-6">
            {step.details.map((d, i) => (
              <div key={i} className="flex items-start gap-2 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
                <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: `${step.color}60` }} />
                <span>{d}</span>
              </div>
            ))}
          </div>

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

        {/* System State */}
        <div
          key={`state-${currentStep}`}
          className="p-6 rounded-xl border mb-6 animate-in fade-in slide-in-from-right-4 duration-500"
          style={{ background: "rgba(255,255,255,0.02)", borderColor: SG.border }}
        >
          <p className="text-xs uppercase tracking-widest mb-4" style={{ color: "rgba(255,255,255,0.25)" }}>System State</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {Object.entries(step.systemState).map(([key, value]) => (
              <div key={key} className="p-3 rounded-lg" style={{ background: SG.card }}>
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
              <div key={i} className="flex items-center gap-2">
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
