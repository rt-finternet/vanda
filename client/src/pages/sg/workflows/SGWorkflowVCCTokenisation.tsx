import { useState } from "react";
import { CrossPersonaCallout } from "@/components/IPEComponents";
import { Link } from "wouter";
import SGPortalNav, { SG } from "@/components/SGPortalNav";
import { CinematicBackground } from "@/components/motion";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft, ArrowRight, CheckCircle2, Briefcase, Shield, Layers,
  ArrowRightLeft, Building2, FileCheck, Lock, Eye, Coins,
  Users, Scale, Leaf, TrendingUp, Wallet
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
    id: 1,
    title: "VCC Fund Setup",
    subtitle: "Umbrella & Sub-Fund Registration",
    description: "Fullerton Fund Management establishes a Variable Capital Company (VCC) umbrella structure registered with ACRA. The VCC contains multiple sub-funds, each with distinct investment mandates. The fund manager registers the VCC on UNITS Network, creating a tokenised representation of the umbrella and its sub-fund hierarchy.",
    details: [
      "VCC Name: Fullerton Asia Opportunities VCC",
      "ACRA UEN: 202600123A",
      "Fund Manager: Fullerton Fund Management Pte Ltd (MAS CMS Licence)",
      "Custodian: DBS Bank Ltd",
      "Auditor: PricewaterhouseCoopers LLP",
      "Sub-Fund 1: Fullerton Carbon Transition Fund (carbon credits + VCUs)",
      "Sub-Fund 2: Fullerton Asia PE Growth Fund (private equity)",
      "Sub-Fund 3: Fullerton SG Real Estate Fund (commercial property)",
      "Sub-Fund 4: Fullerton Digital Assets Fund (regulated digital assets)",
      "Base Currency: SGD | Reporting: Semi-annual NAV",
    ],
    systemState: {
      "VCC Umbrella": "Fullerton Asia Opportunities VCC",
      "ACRA UEN": "202600123A",
      "Sub-Funds": "4 registered",
      "UNITS Registration": "Active",
      "Fund Manager": "Fullerton Fund Management",
      "Status": "Registered & Tokenised",
    },
    icon: Building2,
    color: SG.masTeal,
  },
  {
    id: 2,
    title: "Sub-Fund Tokenisation",
    subtitle: "Interests Become Tokets with Share Classes",
    description: "Each sub-fund's interests are tokenised into tokets on UNITS Network. The Fullerton Carbon Transition Fund creates three share classes: Class A (institutional, min SGD 1M, lower fees), Class B (accredited investor, min SGD 200K), and Class S (sustainability-linked, where returns are partially tied to verified carbon reduction metrics). Each share class becomes a distinct tokenClass with its own NAV, fee structure, and transfer restrictions encoded as Token Programs.",
    details: [
      "tokenClass: VCC-FCTF-A (Institutional Class A)",
      "  - Min subscription: SGD 1,000,000 | Mgmt fee: 0.75% | Performance fee: 10%",
      "  - Transfer restriction: QI/AI only (MAS SFA s.305)",
      "tokenClass: VCC-FCTF-B (Accredited Investor Class B)",
      "  - Min subscription: SGD 200,000 | Mgmt fee: 1.25% | Performance fee: 15%",
      "  - Transfer restriction: AI only (MAS SFA s.305)",
      "tokenClass: VCC-FCTF-S (Sustainability-Linked Class S)",
      "  - Min subscription: SGD 500,000 | Mgmt fee: 1.00% | Performance fee: 12%",
      "  - Carbon KPI: 50,000 tCO2e reduction target per annum",
      "  - Transfer restriction: AI + ESG mandate verification",
      "Token Programs: NAV calculation, fee accrual, redemption gates, compliance gates",
      "Total AUM tokenised: SGD 180,000,000 across all classes",
    ],
    systemState: {
      "Sub-Fund": "Fullerton Carbon Transition Fund",
      "Share Classes": "3 (A, B, S)",
      "Total Tokets Issued": "180,000 units",
      "AUM": "SGD 180,000,000",
      "NAV per Unit (Class A)": "SGD 1,000.00",
      "Token Programs": "Active (5 programs: NAV Calc, Subscription/Redemption, Distribution, Compliance, Fee Accrual)",
      "Note": "3 sub-funds (Classes A, B, S) are token pools; 5 programs are executable logic that operates across all pools",
    },
    icon: Layers,
    color: SG.nusOrange,
  },
  {
    id: 3,
    title: "Primary Distribution",
    subtitle: "Subscription via UNITS Network",
    description: "GIC subscribes to SGD 25M of Class A units in the Carbon Transition Fund. The subscription flows through UNITS Network: GIC's UNITS Wallet submits a subscription request, the Token Program validates GIC's Qualified Investor status via Verifiable Credentials, the fund manager approves the allocation, and the settlement occurs atomically. XSGD payment and toket issuance happen in a single atomic transaction, eliminating the traditional T+3 to T+5 subscription settlement cycle.",
    details: [
      "Subscriber: GIC Private Limited",
      "UNITS Wallet: UW-SG-GIC-2026-001",
      "Subscription: 25,000 units of VCC-FCTF-A at NAV SGD 1,000.00",
      "Total: SGD 25,000,000",
      "Payment: XSGD atomic settlement (T+0)",
      "VC Verification: QI status confirmed (VC-QI-GIC-2026)",
      "AML/KYC: Passed (MAS CDD requirements met)",
      "Fund Manager Approval: Auto-approved (within mandate)",
      "Tokets credited to GIC wallet: 25,000 VCC-FCTF-A",
      "Traditional cycle: T+3 to T+5 | UNITS cycle: T+0 (atomic)",
    ],
    systemState: {
      "Subscriber": "GIC Private Limited",
      "Units Subscribed": "25,000 VCC-FCTF-A",
      "Settlement": "Atomic (T+0)",
      "Payment": "SGD 25,000,000 (XSGD)",
      "VC Status": "QI Verified",
      "Fund AUM (Class A)": "SGD 105,000,000",
    },
    icon: Coins,
    color: SG.finternetCyan,
  },
  {
    id: 4,
    title: "Secondary Market Trading",
    subtitle: "Peer-to-Peer Transfer with Compliance Gates",
    description: "Temasek Holdings wishes to acquire 10,000 Class A units from GIC. On UNITS Network, this is a peer-to-peer transfer that passes through the Token Program's compliance gates. The system verifies Temasek's QI status, checks the fund's transfer restrictions (no competitor holdings, concentration limits), and executes the trade atomically. The fund manager receives notification but does not need to approve the bilateral transfer, as the Token Program enforces all rules automatically.",
    details: [
      "Seller: GIC Private Limited (UW-SG-GIC-2026-001)",
      "Buyer: Temasek Holdings (UW-SG-TEMASEK-2026-001)",
      "Asset: 10,000 units VCC-FCTF-A",
      "Price: SGD 1,015.00 per unit (2.5% premium to NAV at trade execution, 10:14:23 SGT)",
      "Total consideration: SGD 10,150,000",
      "Compliance gate 1: Buyer QI status - PASSED",
      "Compliance gate 2: Concentration limit (max 30% of class) - PASSED (9.5%)",
      "Compliance gate 3: Competitor holding check - PASSED",
      "Compliance gate 4: AML screening - PASSED",
      "Settlement: Atomic DvP (tokets vs XSGD)",
      "Fund manager notification: Automatic (no approval required)",
      "Register update: Immediate on-ledger",
    ],
    systemState: {
      "Seller": "GIC (15,000 units remaining)",
      "Buyer": "Temasek (10,000 units acquired)",
      "Trade Price": "SGD 1,015.00/unit",
      "Premium to NAV": "1.5% (current, as of 14:30:00 SGT, compressed from 2.5% at trade time 10:14:23 SGT due to subsequent NAV revaluation)",
      "Settlement": "Atomic DvP (T+0)",
      "Compliance Gates": "4/4 Passed",
    },
    icon: ArrowRightLeft,
    color: SG.finternetAmber,
  },
  {
    id: 5,
    title: "Collateral Mobilisation",
    subtitle: "VCC Interests as Margin & Repo Collateral",
    description: "DBS Bank uses its holding of 50,000 Class B units (valued at SGD 50M) as collateral for a repo transaction with OCBC Bank. The Token Program creates an encumbrance on the tokets, locking them as pledged collateral while DBS retains economic ownership (NAV appreciation, distributions). The encumbrance is visible to all parties and to MAS's observer node. When the repo matures, the encumbrance is automatically released. This is the first time VCC fund interests can be mobilised as collateral without physical transfer or manual custody processes.",
    details: [
      "Collateral Provider: DBS Bank Ltd",
      "Collateral Receiver: OCBC Bank",
      "Asset: 50,000 units VCC-FCTF-B",
      "Collateral Value: SGD 50,000,000 (at NAV SGD 1,000.00)",
      "Haircut: 15% (VCC fund interests)",
      "Effective collateral: SGD 42,500,000",
      "Repo term: 30 days",
      "Repo rate: 3.85% p.a.",
      "Cash received by DBS: SGD 42,500,000 (XSGD)",
      "Encumbrance type: Pledge (Token Program enforced)",
      "Economic ownership: Retained by DBS (NAV + distributions)",
      "MAS Observer: Encumbrance visible in real-time",
      "Auto-release: On repo maturity (Day 30)",
      "Traditional process: 3-5 days manual custody | UNITS: Instant",
    ],
    systemState: {
      "Collateral Provider": "DBS Bank",
      "Pledged Units": "50,000 VCC-FCTF-B",
      "Encumbrance": "Active (Pledge)",
      "Cash Received": "SGD 42,500,000",
      "Repo Maturity": "30 days",
      "MAS Visibility": "Real-time",
    },
    icon: Lock,
    color: "#a78bfa",
  },
  {
    id: 6,
    title: "NAV Calculation & Distribution",
    subtitle: "Automated Fund Administration on UNITS",
    description: "The semi-annual NAV calculation triggers automatically via the Token Program. The fund administrator (BNP Paribas Securities Services) publishes the audited NAV on-ledger, and the Token Program automatically adjusts the per-unit value across all share classes. For the Sustainability-Linked Class S, the carbon KPI is verified against Verra's VCS registry, and the performance fee is adjusted based on actual carbon reduction achieved. Distributions are paid atomically in XSGD to all unit holders proportionally.",
    details: [
      "NAV Date: 30 June 2026",
      "Fund Administrator: BNP Paribas Securities Services",
      "Class A NAV: SGD 1,042.50 (+4.25% since inception)",
      "Class B NAV: SGD 1,038.20 (+3.82%)",
      "Class S NAV: SGD 1,055.80 (+5.58%, carbon KPI exceeded)",
      "Carbon KPI: 62,500 tCO2e reduced (target: 50,000 - exceeded by 25%)",
      "Verra VCS verification: Registry ID VCS-2026-SG-0847",
      "Distribution (Class A): SGD 12.50/unit (management fee deducted)",
      "Distribution (Class S): SGD 18.75/unit (sustainability bonus applied)",
      "Total distributions: SGD 2,812,500 paid atomically in XSGD",
      "All unit holder wallets credited simultaneously",
      "Traditional cycle: T+10 to T+15 | UNITS: T+0 (atomic)",
    ],
    systemState: {
      "NAV Date": "30 June 2026",
      "Class A NAV": "SGD 1,042.50",
      "Class S NAV": "SGD 1,055.80",
      "Carbon KPI": "125% of target",
      "Distributions Paid": "SGD 2,812,500",
      "Settlement": "Atomic (T+0)",
    },
    icon: TrendingUp,
    color: "#10b981",
  },
  {
    id: 7,
    title: "Redemption & Lifecycle",
    subtitle: "Orderly Exit with Gate Protection",
    description: "An investor submits a redemption request for 5,000 Class B units. The Token Program checks the fund's redemption gate (max 10% of class per quarter), verifies no lock-up period applies, calculates the redemption price at the next NAV date, and queues the redemption. On settlement, the tokets are burned, the investor receives XSGD at the redemption NAV, and the fund's register is updated atomically. If the redemption gate is breached, the Token Program automatically pro-rates redemptions across all requesting investors, ensuring fair treatment.",
    details: [
      "Redeemer: UOB Asset Management",
      "Units: 5,000 VCC-FCTF-B",
      "Redemption gate check: 5,000 / 80,000 = 6.25% (within 10% limit)",
      "Lock-up check: No lock-up (Class B, > 12 months held)",
      "Redemption NAV: SGD 1,038.20 per unit",
      "Gross proceeds: SGD 5,191,000",
      "Exit fee: 0.25% = SGD 12,977.50",
      "Net proceeds: SGD 5,178,022.50 (XSGD)",
      "Tokets burned: 5,000 VCC-FCTF-B",
      "Register update: Immediate on-ledger",
      "Fund AUM (Class B) post-redemption: SGD 77,860,000",
      "Traditional cycle: T+5 to T+30 | UNITS: T+1 (next NAV date)",
    ],
    systemState: {
      "Redeemer": "UOB Asset Management",
      "Units Redeemed": "5,000 VCC-FCTF-B",
      "Net Proceeds": "SGD 5,178,022.50",
      "Tokets Burned": "5,000",
      "Gate Utilisation": "6.25% of 10%",
      "Fund AUM Post": "SGD 77,860,000",
    },
    icon: Wallet,
    color: SG.red,
  },
];

export default function SGWorkflowVCCTokenisation() {
  const [currentStep, setCurrentStep] = useState(0);
  const step = STEPS[currentStep];
  const Icon = step.icon;

  return (
    <div className="vanda-portal min-h-screen" style={{ background: SG.dark }}>
      <SGPortalNav />

      <div className="max-w-5xl mx-auto px-4 md:px-6 py-8">
        {/* Back link */}
        <Link href="/sg/workflows" className="inline-flex items-center gap-2 text-sm mb-6 transition-colors" style={{ color: `${SG.masTeal}99` }}>
          <ArrowLeft className="w-4 h-4" />
          Back to Workflows
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${SG.masTeal}15`, border: `1px solid ${SG.masTeal}30` }}>
              <Briefcase className="w-5 h-5" style={{ color: SG.masTeal }} />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] font-semibold" style={{ color: SG.nusOrange }}>Interactive Workflow</p>
              <h1 className="text-2xl md:text-3xl font-bold text-white">VCC Fund Tokenisation</h1>
            </div>
          </div>
          <p className="text-sm leading-relaxed max-w-3xl" style={{ color: "rgba(255,255,255,0.5)" }}>
            End-to-end lifecycle of a Variable Capital Company on UNITS Network: from umbrella registration
            and sub-fund tokenisation through primary distribution, secondary trading, collateral mobilisation,
            NAV calculation, and redemption. Uses real Singapore institutions and the VCC framework under the
            Variable Capital Companies Act 2018.
          </p>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.4)" }}>
              Step {currentStep + 1} of {STEPS.length}
            </span>
            <span className="text-xs" style={{ color: step.color }}>{step.title}</span>
          </div>
          <div className="h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.05)" }}>
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%`, background: step.color }}
            />
          </div>
          {/* Step indicators */}
          <div className="flex justify-between mt-2">
            {STEPS.map((s, i) => {
              const StepIcon = s.icon;
              const isActive = i === currentStep;
              const isComplete = i < currentStep;
              return (
                <button
                  key={s.id}
                  onClick={() => setCurrentStep(i)}
                  className="flex flex-col items-center gap-1 transition-all"
                  title={s.title}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      isActive ? "ring-2 ring-offset-1 ring-offset-transparent" : ""
                    }`}
                    style={{
                      background: isComplete ? `${s.color}30` : isActive ? `${s.color}20` : "rgba(255,255,255,0.03)",
                      borderColor: isActive ? s.color : "transparent",

                    }}
                  >
                    {isComplete ? (
                      <CheckCircle2 className="w-4 h-4" style={{ color: s.color }} />
                    ) : (
                      <StepIcon className="w-3.5 h-3.5" style={{ color: isActive ? s.color : "rgba(255,255,255,0.2)" }} />
                    )}
                  </div>
                  <span className="text-[9px] hidden md:block max-w-[60px] text-center truncate" style={{ color: isActive ? s.color : "rgba(255,255,255,0.2)" }}>
                    {s.title.split(" ")[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main content card */}
        <div className="rounded-xl p-6 md:p-8 mb-6" style={{ background: SG.card, border: `1px solid ${SG.border}` }}>
          {/* Step header */}
          <div className="flex items-start gap-5 mb-8">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${step.color}15`, border: `1px solid ${step.color}30` }}>
              <Icon className="w-6 h-6" style={{ color: step.color }} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: `${step.color}15`, color: step.color }}>
                  Step {step.id}
                </span>
                <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>{step.subtitle}</span>
              </div>
              <h2 className="text-xl font-bold text-white">{step.title}</h2>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
            {step.description}
          </p>

          {/* Execution log */}
          <div className="rounded-lg p-4 mb-6" style={{ background: "rgba(0,0,0,0.3)", border: `1px solid ${SG.border}` }}>
            <p className="text-[10px] uppercase tracking-widest mb-3 flex items-center gap-3" style={{ color: step.color }}>
              <FileCheck className="w-3.5 h-3.5" />
              Execution Log
            </p>
            <div className="space-y-1.5">
              {step.details.map((detail, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-[10px] font-mono shrink-0 mt-1" style={{ color: "rgba(255,255,255,0.15)" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className={`text-xs font-mono leading-relaxed ${detail.startsWith("  ") ? "pl-4" : ""}`} style={{ color: "rgba(255,255,255,0.5)" }}>
                    {detail}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* System state */}
          <div className="rounded-lg p-4" style={{ background: `${step.color}08`, border: `1px solid ${step.color}15` }}>
            <p className="text-[10px] uppercase tracking-widest mb-3 flex items-center gap-3" style={{ color: step.color }}>
              <Eye className="w-3.5 h-3.5" />
              System State
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {Object.entries(step.systemState).map(([key, value]) => (
                <div key={key}>
                  <p className="text-[10px] uppercase tracking-wider mb-0.5" style={{ color: "rgba(255,255,255,0.25)" }}>{key}</p>
                  <p className="text-xs font-medium text-white">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center justify-between mb-12">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className="gap-2 border-white/10 text-white/60 hover:text-white hover:bg-white/5 disabled:opacity-30"
          >
            <ArrowLeft className="w-4 h-4" /> Previous
          </Button>

          <div className="flex items-center gap-1.5">
            {STEPS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentStep(i)}
                className="w-2 h-2 rounded-full transition-all"
                style={{
                  background: i === currentStep ? STEPS[i].color : i < currentStep ? `${STEPS[i].color}50` : "rgba(255,255,255,0.1)",
                }}
              />
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentStep(Math.min(STEPS.length - 1, currentStep + 1))}
            disabled={currentStep === STEPS.length - 1}
            className="gap-2 border-white/10 text-white/60 hover:text-white hover:bg-white/5 disabled:opacity-30"
          >
            Next <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* VCC Framework Context */}
        <div className="rounded-xl p-6 mb-8" style={{ background: `${SG.masTeal}08`, border: `1px solid ${SG.masTeal}20` }}>
          <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-3">
            <Scale className="w-4 h-4" style={{ color: SG.masTeal }} />
            About the VCC Framework
          </h3>
          <p className="text-xs leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.5)" }}>
            The Variable Capital Company (VCC) is Singapore's bespoke corporate structure for investment funds,
            enacted under the Variable Capital Companies Act 2018. Unlike traditional unit trusts, a VCC is a
            body corporate that can issue and redeem shares without shareholder approval, making it ideal for
            tokenisation. A single VCC umbrella can house multiple sub-funds with segregated assets and liabilities,
            each of which can be independently tokenised on UNITS Network.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "VCCs Registered", value: "1,000+", sub: "Since 2020 launch" },
              { label: "AUM in VCCs", value: "SGD 200B+", sub: "Estimated total" },
              { label: "FSTI Grant", value: "Up to SGD 150K", sub: "Per VCC setup" },
              { label: "Tax Incentives", value: "s.13R / s.13X", sub: "Fund tax exemptions" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-lg font-bold" style={{ color: SG.masTeal }}>{stat.value}</p>
                <p className="text-[10px] uppercase tracking-wider text-white/40">{stat.label}</p>
                <p className="text-[9px] text-white/25">{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sub-Fund Types */}
        <div className="rounded-xl p-6 mb-8" style={{ background: SG.card, border: `1px solid ${SG.border}` }}>
          <h3 className="text-sm font-semibold text-white mb-4">VCC Sub-Fund Types on UNITS Network</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { name: "Carbon & ESG Funds", desc: "Tokenised VCUs, carbon credits, and ESG-linked instruments with on-chain verification against Verra/Gold Standard registries", icon: Leaf, color: "#10b981" },
              { name: "Private Equity Funds", desc: "Illiquid PE interests become tradeable tokets with compliance gates enforcing transfer restrictions and lock-up periods", icon: TrendingUp, color: SG.nusOrange },
              { name: "Real Estate Funds", desc: "Commercial property portfolios tokenised with fractional ownership, automated rental distributions, and NAV-linked redemptions", icon: Building2, color: SG.finternetCyan },
              { name: "Hedge Funds", desc: "Multi-strategy fund interests with programmable gates, side pockets, and real-time NAV calculation on UNITS", icon: Layers, color: SG.finternetAmber },
              { name: "Infrastructure Funds", desc: "Long-dated infrastructure assets (ports, utilities, data centres) with tokenised interests and automated cash flow distributions", icon: Briefcase, color: "#a78bfa" },
              { name: "Digital Asset Funds", desc: "Regulated digital asset exposure through VCC wrapper, with MAS-compliant custody and on-chain portfolio rebalancing", icon: Coins, color: SG.red },
            ].map((fund) => (
              <div key={fund.name} className="flex items-start gap-3 p-4 rounded-lg" style={{ background: `${fund.color}05`, border: `1px solid ${fund.color}15` }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${fund.color}15` }}>
                  <fund.icon className="w-4 h-4" style={{ color: fund.color }} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white mb-1">{fund.name}</p>
                  <p className="text-[11px] leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>{fund.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Collateral Use Cases */}
        <div className="rounded-xl p-6 mb-8" style={{ background: SG.card, border: `1px solid ${SG.border}` }}>
          <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-3">
            <Shield className="w-4 h-4" style={{ color: "#a78bfa" }} />
            VCC Interests as Collateral
          </h3>
          <p className="text-xs leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.45)" }}>
            Tokenised VCC fund interests unlock collateral use cases that are impossible with traditional fund structures.
            The Token Program's encumbrance model enables real-time pledging, automated margin calls, and instant release,
            all while the investor retains economic ownership.
          </p>
          <div className="space-y-4">
            {[
              { type: "Margin Collateral", desc: "Pledge VCC units to satisfy initial margin requirements at SGX-DC. Automated mark-to-market with real-time NAV feeds. Auto-top-up if collateral value drops below maintenance threshold.", haircut: "15-25%", example: "DBS pledges PE fund units for derivatives margin" },
              { type: "Repo Collateral", desc: "Use VCC interests in repo transactions for short-term funding. Encumbrance created atomically, released on maturity. Cash counterparty sees real-time collateral value.", haircut: "10-20%", example: "OCBC repos carbon fund units for 30-day funding" },
              { type: "Lombard Lending", desc: "Borrow against VCC holdings for liquidity without selling. Token Program enforces LTV ratios and triggers margin calls automatically if NAV declines.", haircut: "20-35%", example: "UOB client borrows SGD against RE fund holdings" },
              { type: "Cross-Collateral", desc: "Pool VCC interests from multiple sub-funds as a diversified collateral basket. Token Program calculates aggregate value and applies portfolio-level haircuts.", haircut: "10-15%", example: "GIC uses mixed PE + carbon + RE basket as collateral" },
            ].map((uc) => (
              <div key={uc.type} className="p-4 rounded-lg" style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${SG.border}` }}>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-semibold text-white">{uc.type}</p>
                  <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: "rgba(167,139,250,0.1)", color: "#a78bfa" }}>
                    Haircut: {uc.haircut}
                  </span>
                </div>
                <p className="text-[11px] leading-relaxed mb-2" style={{ color: "rgba(255,255,255,0.4)" }}>{uc.desc}</p>
                <p className="text-[10px] italic" style={{ color: "rgba(255,255,255,0.25)" }}>Example: {uc.example}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Deep Dives */}
        <div className="p-5 rounded-xl mb-8" style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${SG.border}` }}>
          <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "rgba(255,255,255,0.2)" }}>UNITS Knowledge Base</p>
          <div className="flex flex-wrap gap-3">
            {[
              { href: "/sg/deep-dive/vcc", label: "VCC Fund Tokenisation" },
              { href: "/sg/deep-dive/tokenisation", label: "SG Tokenisation" },
              { href: "/sg/deep-dive/collateral-highway", label: "Collateral Highway" },
              { href: "/deep-dive/tokenisation", label: "Tokenisation Architecture" },
              { href: "/deep-dive/token-programs", label: "Token Programs" },
              { href: "/deep-dive/collateral-highway", label: "EU Collateral Highway" },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="px-3 py-1.5 rounded-full text-xs transition-colors" style={{ color: "rgba(255,255,255,0.35)", border: `1px solid ${SG.border}` }}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* IPE Cross-Persona Callout */}
        <CrossPersonaCallout />
        {/* Footer */}
        <div className="pt-6 text-center" style={{ borderTop: `1px solid ${SG.border}` }}>
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
