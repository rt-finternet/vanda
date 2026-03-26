import { useState } from "react";
import { Link } from "wouter";
import SGPortalNav, { SG } from "@/components/SGPortalNav";
import { CinematicBackground } from "@/components/motion";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft, ArrowRight, CheckCircle2, Shield, Lock,
  Building2, FileCheck, Eye, Network, Layers, RefreshCw
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
    id: 1, title: "Margin Call Trigger", subtitle: "CCP Margin Requirement",
    description: "Singapore Exchange Derivatives Clearing (SGX-DC) issues a margin call to DBS Bank following increased volatility in Nikkei 225 futures. DBS needs to post SGD 100M in eligible collateral. Today this requires separate instructions to CDP (for equities) and MEPS+ (for government securities). On UNITS, both asset pools are visible in a single wallet.",
    details: [
      "CCP: SGX Derivatives Clearing (SGX-DC)",
      "Margin call recipient: DBS Bank",
      "Required collateral: SGD 100,000,000",
      "Trigger: Nikkei 225 futures volatility spike",
      "Deadline: 2 hours (intraday margin call)",
      "Today's process: Separate CDP + MEPS+ instructions (manual)",
    ],
    systemState: { "CCP": "SGX-DC", "Recipient": "DBS Bank", "Required": "SGD 100M", "Trigger": "Nikkei volatility", "Deadline": "2 hours", "Status": "Margin call issued" },
    icon: Building2, color: SG.nusOrange,
  },
  {
    id: 2, title: "Collateral Pool Assessment", subtitle: "Unified Cross-Asset View",
    description: "UNITS Network provides DBS with a single view of all eligible collateral across both CDP equities and MEPS+ government securities. The system automatically calculates haircuts, eligibility, and optimal allocation. This unified view is impossible today because CDP and MEPS+ are separate systems with no real-time cross-visibility.",
    details: [
      "CDP Equities (proxy tokets): SGD 500M available",
      "MEPS+ SGS Bonds (proxy tokets): SGD 300M available",
      "VCC Fund Interests (native tokets): SGD 50M available",
      "Total eligible pool: SGD 850M",
      "SGX-DC eligible after haircuts: SGD 680M",
      "Optimal mix calculated: 60% SGS + 30% Equities + 10% VCC",
    ],
    systemState: { "CDP Equities": "SGD 500M", "MEPS+ SGS": "SGD 300M", "VCC Funds": "SGD 50M", "Total Pool": "SGD 850M", "Post-Haircut": "SGD 680M", "Status": "Pool assessed" },
    icon: Layers, color: SG.masTeal,
  },
  {
    id: 3, title: "Collateral Pledge", subtitle: "Cross-Asset Encumbrance",
    description: "DBS pledges the optimal collateral mix to SGX-DC in a single atomic operation. SGS bonds (SGD 60M), DBS equities (SGD 30M), and VCC fund interests (SGD 10M) are simultaneously encumbered via Token Program TP-ENCUMB. The assets remain in DBS's wallet but are locked, they cannot be traded, transferred, or used for other pledges.",
    details: [
      "SGS 10Y Bond: SGD 60M pledged (haircut 5%)",
      "DBS Group Holdings (D05): SGD 30M pledged (haircut 15%)",
      "VCC Climate Fund: SGD 10M pledged (haircut 20%)",
      "Total pledged value: SGD 100M (post-haircut)",
      "Encumbrance type: CCP Margin Pledge",
      "All three pledges executed atomically (single transaction)",
    ],
    systemState: { "SGS Pledged": "SGD 60M (5% haircut)", "Equities Pledged": "SGD 30M (15% haircut)", "VCC Pledged": "SGD 10M (20% haircut)", "Total Post-Haircut": "SGD 100M", "Pledge Type": "CCP Margin", "Status": "Encumbered" },
    icon: Lock, color: "#a78bfa",
  },
  {
    id: 4, title: "Collateral Substitution", subtitle: "Real-Time Swap",
    description: "Market conditions change and DBS wants to substitute the equity collateral for additional SGS bonds (lower haircut, freeing equities for trading). On UNITS, this is a single atomic operation: release the equity encumbrance and create a new SGS encumbrance simultaneously. Today this would require separate CDP and MEPS+ instructions taking hours.",
    details: [
      "Release: DBS equities (SGD 30M) from pledge",
      "Substitute: SGS 5Y Bond (SGD 28M, haircut 5% = SGD 26.6M)",
      "Top-up: Additional SGS (SGD 3.6M) to maintain SGD 100M coverage",
      "Execution: Atomic swap (release + new pledge in single tx)",
      "Time: 0.8 seconds (vs hours for CDP + MEPS+ manual process)",
      "DBS equities now free for trading",
    ],
    systemState: { "SGS Pledged": "SGD 91.6M total", "Equities": "Released, free to trade", "VCC Pledged": "SGD 10M (unchanged)", "Coverage": "SGD 100M maintained", "Substitution": "Atomic, 0.8 seconds", "Status": "Substituted" },
    icon: RefreshCw, color: SG.finternetAmber,
  },
  {
    id: 5, title: "MAS Observer Monitoring", subtitle: "Real-Time Collateral Supervision",
    description: "MAS observer node has continuous visibility of all collateral positions across the network. The observer can see total system-wide collateral pledged, concentration risk, and individual participant exposures. This replaces the current fragmented reporting where MAS must aggregate data from CDP and MEPS+ separately.",
    details: [
      "System-wide collateral pledged: SGD 12.5B (all participants)",
      "DBS collateral utilisation: 14.7% of eligible pool",
      "Concentration risk: Within limits (no single-name > 10%)",
      "Cross-asset visibility: CDP + MEPS+ + VCC in single view",
      "Real-time mark-to-market: Continuous (vs end-of-day batch)",
      "Stress test capability: Instant scenario analysis",
    ],
    systemState: { "System Collateral": "SGD 12.5B", "DBS Utilisation": "14.7%", "Concentration": "Within limits", "Visibility": "Full cross-asset", "Valuation": "Real-time", "Status": "Monitored" },
    icon: Eye, color: SG.finternetCyan,
  },
  {
    id: 6, title: "Margin Call Satisfied", subtitle: "Collateral Position Confirmed",
    description: "SGX-DC confirms the margin call is satisfied. The entire process, from margin call to collateral pledge with cross-asset optimisation, took under 5 minutes. Today the same process takes 2-4 hours with manual coordination between CDP and MEPS+, phone calls, and separate settlement cycles.",
    details: [
      "SGX-DC confirmation: Margin call satisfied",
      "Total time: 4 minutes 32 seconds",
      "Traditional process: 2-4 hours (manual CDP + MEPS+)",
      "Improvement: 97% time reduction",
      "Manual steps eliminated: 12 (phone calls, faxes, reconciliation)",
      "Collateral remains in DBS wallet (encumbered, not transferred)",
    ],
    systemState: { "Margin Call": "Satisfied", "Time Taken": "4 min 32 sec", "Traditional": "2-4 hours", "Improvement": "97% faster", "Manual Steps": "Eliminated (12)", "Status": "Complete" },
    icon: Network, color: SG.masTeal,
  },
];

export default function SGWorkflowCollateralMobilisation() {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const step = STEPS[currentStep];

  const advance = () => {
    setCompletedSteps((prev) => { const next = new Set(Array.from(prev)); next.add(currentStep); return next; });
    if (currentStep < STEPS.length - 1) setCurrentStep(currentStep + 1);
  };
  const goBack = () => { if (currentStep > 0) setCurrentStep(currentStep - 1); };

  return (
    <div className="flex min-h-screen" style={{ background: SG.dark }}>
      <SGPortalNav />
      <div className="flex-1 md:ml-72 p-6 md:p-12 max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Link href="/sg/workflows" className="text-sm flex items-center gap-1 transition-colors" style={{ color: "rgba(255,255,255,0.4)" }}>
            <ArrowLeft className="w-4 h-4" /> Workflows
          </Link>
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-6 h-6" style={{ color: "#a78bfa" }} />
            <h1 className="text-2xl font-bold text-white">Collateral Mobilisation Workflow</h1>
          </div>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
            Cross-asset collateral pledge, substitution, and release across CDP and MEPS+
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
                  background: isActive ? step.color : isCompleted ? `#a78bfa60` : SG.border,
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
