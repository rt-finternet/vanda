import { useState, useEffect } from "react";
import { Link } from "wouter";
import SGPortalNav, { SG } from "@/components/SGPortalNav";
import { CinematicBackground } from "@/components/motion";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft, ArrowRight, CheckCircle2, Shield, Layers,
  Building2, Lock, Gem, Package, Users, Wallet, Zap
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
    id: 1, title: "Vault Receipt & Custody", subtitle: "SBMA/LBMA Good Delivery Bar Deposited",
    description: "A 1 kg SBMA Good Delivery gold kilobar (99.99% fineness) is deposited at Brink's Singapore vault by DBS Precious Metals desk. The vault operator issues a digital vault receipt with bar serial, refiner details, assay certificate, and weight confirmation. The bar meets both SBMA Kilobar standard and LBMA Good Delivery requirements.",
    details: [
      "Bar serial: KB-2026-BRK-SG-008412",
      "Refiner: Metalor Technologies (SBMA + LBMA Good Delivery List)",
      "Fineness: 999.9 (SBMA Kilobar standard)",
      "Weight: 1,000.00 grams (1 kg)",
      "Vault: Brink's Singapore Pte Ltd (SBMA-approved)",
      "Vault receipt ID: VR-BRK-SG-2026-008412",
      "Assay certificate: AC-MTR-2026-SG-44291",
      "IPM GST exemption: Qualified (99.5%+ purity, approved refiner)",
    ],
    systemState: { "Bar Serial": "KB-2026-BRK-SG-008412", "Vault": "Brink's Singapore", "Fine Weight": "1,000.00 grams", "Status": "Received & Verified" },
    icon: Package, color: SG.finternetAmber,
  },
  {
    id: 2, title: "Bar Verification", subtitle: "SBMA + LBMA Dual-Standard Attestation",
    description: "The bar undergoes verification against both SBMA and LBMA Good Delivery standards. Brink's Singapore confirms the bar serial matches the SBMA register, the refiner (Metalor) is on both Good Delivery Lists, and the bar meets minimum fineness requirements. Verifiable Credentials are issued attesting to provenance, responsible sourcing (LBMA RGG), and SBMA compliance.",
    details: [
      "SBMA Good Delivery List check: PASSED",
      "LBMA Good Delivery List check: PASSED",
      "Refiner status: Metalor (Active on both GDLs)",
      "Minimum fineness (999.9 SBMA / 995.0 LBMA): PASSED",
      "Weight tolerance: PASSED (within 0.01%)",
      "LBMA Responsible Gold Guidance (RGG): COMPLIANT",
      "SBMA Code of Conduct: COMPLIANT",
      "PSPM Act AML/CFT check: CLEARED",
    ],
    systemState: { "SBMA Status": "VERIFIED", "LBMA Status": "VERIFIED", "RGG Compliance": "PASSED", "PSPM AML": "CLEARED" },
    icon: Shield, color: "#10b981",
  },
  {
    id: 3, title: "TokenPool Creation", subtitle: "Per-Vault Metal Pool on UNITS|SG",
    description: "A tokenPool is created on UNITS|SG representing Brink's Singapore gold vault holdings. The tokenClass 'SG-GOLD' defines the semantic rules (SBMA Kilobar standard, 999.9 fineness, SBMA + LBMA dual compliance). The tokenPool 'Brink's SG Gold Pool' is the operational container where individual tokets are minted and lifecycle rules enforced. MAS is registered as the regulatory observer node.",
    details: [
      "tokenClass: SG-GOLD (XAU, 999.9 fineness, SBMA Kilobar)",
      "tokenPool: TP-BRK-SG-GOLD-2026",
      "Pool name: Brink's Singapore Gold Pool",
      "Denomination: 1 gram (fractional from 1 kg kilobar)",
      "Total units from this bar: 1,000 gram-tokets",
      "Backing ratio: 1:1 physical gold",
      "Vault operator node: Brink's Singapore",
      "Regulator observer: MAS, SBMA",
    ],
    systemState: { "tokenPool": "TP-BRK-SG-GOLD-2026", "Units Minted": "1,000 grams", "Backing": "1:1 Physical", "Status": "Active" },
    icon: Layers, color: "#8b5cf6",
  },
  {
    id: 4, title: "Toket Minting", subtitle: "Fractional Gold Units Created",
    description: "1,000 gram-denominated tokets are minted into the tokenPool, each representing exactly 1 gram of the underlying 1 kg SBMA kilobar. Every toket carries a per-unit hash linking it to the specific bar serial, vault receipt, and assay certificate. The tokenPool's Merkle root is updated. Pricing references both LBMA Fix and SBMA/Kallanish Index Service (KIS) benchmarks.",
    details: [
      "Tokets minted: 1,000 (1 gram each)",
      "Per-toket hash: SHA-256(bar_serial + gram_index + vault_receipt)",
      "Merkle root: 0x7f3c...a9e1",
      "Minimum trade size: 1 gram (approx. SGD 130)",
      "LBMA PM Fix reference: USD 2,851.25/ozt",
      "SBMA/KIS reference: SGD 125.40/gram",
      "Total value: approx. SGD 125,400",
      "IPM GST status: Exempt (qualified bar + refiner)",
      "Encumbrance: None (unencumbered, free to trade)",
    ],
    systemState: { "Tokets": "1,000", "Per Gram": "~SGD 130", "Merkle Root": "0x7f3c...a9e1", "Encumbrance": "None" },
    icon: Gem, color: SG.finternetAmber,
  },
  {
    id: 5, title: "Distribution", subtitle: "Primary Allocation to Singapore Participants",
    description: "Gold tokets are distributed to participant wallets via the Issuance Book. DBS Private Banking, OCBC Premier, and UOB Privilege Banking subscribe to allocations for their wealth management clients. Settlement is atomic DvP: gold tokets move to the buyer's wallet, SGD/XSGD moves to the seller's wallet, simultaneously. No settlement risk.",
    details: [
      "Distributor 1: DBS Private Banking, 400 gram-tokets",
      "Distributor 2: OCBC Premier Banking, 300 gram-tokets",
      "Distributor 3: UOB Privilege Banking, 300 gram-tokets",
      "Settlement: Atomic DvP (T+0)",
      "Cash leg: SGD via MEPS+ / XSGD (StraitsX)",
      "DBS allocation value: SGD 50,160",
      "OCBC allocation value: SGD 37,620",
      "UOB allocation value: SGD 37,620",
      "Total distributed: 1,000 gram-tokets (full bar)",
    ],
    systemState: { "DBS Allocation": "400 grams", "OCBC Allocation": "300 grams", "UOB Allocation": "300 grams", "Settlement": "T+0 Atomic DvP" },
    icon: Users, color: SG.masTeal,
  },
  {
    id: 6, title: "End-Investor Wallets", subtitle: "Fractional Gold in Investor Hands",
    description: "Singapore banks distribute gold tokets to end-investor wallets. Each investor can hold as little as 1 gram (~SGD 130). UNITS|SG maintains the Participant Register tracking which investor wallets hold which tokets. Investors see their gold position in real-time, with live LBMA/KIS pricing, and can trade, pledge as collateral, or request physical redemption from Brink's Singapore.",
    details: [
      "Investor A: Wei Lin (DBS PB), 200 gram-tokets (SGD 25,080)",
      "Investor B: Priya Sharma (DBS PB), 200 gram-tokets (SGD 25,080)",
      "Investor C: Ahmad bin Hassan (OCBC), 150 gram-tokets (SGD 18,810)",
      "Investor D: Tan Mei Ling (OCBC), 150 gram-tokets (SGD 18,810)",
      "Investor E: James Lim (UOB), 300 gram-tokets (SGD 37,620)",
      "Register: UNITS|SG Participant Register",
      "Wallet standard: UNITS Wallet (VC-compliant)",
      "Live pricing: LBMA Fix + SBMA/KIS daily benchmark",
      "Options: Trade, Pledge, Lend, Redeem Physical",
    ],
    systemState: { "Investors": "5 end-investors", "Total Held": "1,000 grams", "Smallest Position": "150 grams", "Register": "UNITS|SG Direct" },
    icon: Wallet, color: SG.finternetCyan,
  },
  {
    id: 7, title: "Lifecycle & Redemption", subtitle: "Collateral, Transfer, Physical Delivery",
    description: "Gold tokets on UNITS|SG are fully lifecycle-enabled. Investors can pledge tokets as collateral for SGX-DC margin calls (via the Collateral Highway), transfer to other wallets atomically, lend via repo-style arrangements, or request physical redemption from Brink's Singapore. Physical redemption triggers a reverse flow: tokets are burned, Brink's releases the equivalent weight, and physical gold is delivered to the investor's designated vault.",
    details: [
      "Collateral pledge: Wei Lin pledges 100 grams for SGX-DC margin (SGD 12,540)",
      "Transfer: James transfers 50 grams to family member's wallet (atomic, T+0)",
      "Physical redemption: Ahmad redeems 150 grams",
      "Redemption flow: Tokets burned, vault receipt updated, Brink's SG releases 150g",
      "Delivery: Allocated gold available at Brink's Singapore for collection",
      "Minimum physical redemption: 100 grams (or cash settlement at KIS price)",
      "Sub-bar redemption: Cash settlement at SBMA/KIS daily benchmark",
      "All operations recorded on UNITS|SG with full audit trail",
      "IPM GST exemption maintained throughout lifecycle",
    ],
    systemState: { "Collateral Pledged": "100g (Wei Lin)", "Transferred": "50g (James)", "Redeemed": "150g (Ahmad)", "Remaining Active": "700g" },
    icon: Building2, color: "#10b981",
  },
];

export default function SGWorkflowGoldTokenisation() {
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
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Gold Kilobar Tokenisation</h1>
            <p className="text-sm max-w-2xl" style={{ color: "rgba(255,255,255,0.5)" }}>
              7-step workflow: SBMA kilobar deposited at Brink's Singapore → dual-standard verification → tokenPool creation → gram-toket minting → distribution via DBS/OCBC/UOB → end-investor wallets → lifecycle & physical redemption.
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {["Brink's Singapore", "DBS Private Banking", "OCBC Premier", "UOB Privilege", "SBMA", "LBMA", "MAS", "StraitsX XSGD"].map((tag) => (
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
                {/* Price Reference */}
                <div className="rounded-xl p-4" style={{ background: `${SG.card}`, border: `1px solid ${SG.border}` }}>
                  <div className="text-xs uppercase tracking-wider mb-3" style={{ color: `${SG.finternetAmber}80` }}>Gold Price Reference</div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>LBMA PM Fix (USD/ozt)</div>
                      <div className="text-lg font-mono" style={{ color: SG.finternetAmber }}>2,851.25</div>
                    </div>
                    <div>
                      <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>SBMA/KIS (SGD/gram)</div>
                      <div className="text-lg font-mono" style={{ color: SG.finternetAmber }}>125.40</div>
                    </div>
                    <div>
                      <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>SGD/ozt</div>
                      <div className="text-sm font-mono" style={{ color: "rgba(255,255,255,0.6)" }}>3,842.18</div>
                    </div>
                    <div>
                      <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>USD/SGD</div>
                      <div className="text-sm font-mono" style={{ color: "rgba(255,255,255,0.6)" }}>1.3475</div>
                    </div>
                  </div>
                </div>
                {/* Vault Status */}
                <div className="rounded-xl p-4" style={{ background: `${SG.card}`, border: `1px solid ${SG.border}` }}>
                  <div className="text-xs uppercase tracking-wider mb-3" style={{ color: `${SG.finternetAmber}80` }}>Vault Status</div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span style={{ color: "rgba(255,255,255,0.4)" }}>Brink's Singapore</span>
                      <span className="text-emerald-400 text-xs">ACTIVE</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span style={{ color: "rgba(255,255,255,0.4)" }}>Bar KB-2026-BRK-SG-008412</span>
                      <span className="text-xs" style={{ color: SG.finternetAmber }}>TOKENISED</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span style={{ color: "rgba(255,255,255,0.4)" }}>Tokets Outstanding</span>
                      <span className="font-mono" style={{ color: "rgba(255,255,255,0.7)" }}>1,000</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span style={{ color: "rgba(255,255,255,0.4)" }}>Backing Ratio</span>
                      <span className="text-emerald-400 font-mono">1:1</span>
                    </div>
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

          {/* Related Links */}
          <div className={`mt-16 pt-8 transition-all duration-700 delay-500 ${revealed ? "opacity-100" : "opacity-0"}`} style={{ borderTop: `1px solid ${SG.border}` }}>
            <h3 className="text-sm uppercase tracking-wider mb-4 text-center" style={{ color: "rgba(255,255,255,0.3)" }}>Related Pages</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { href: "/sg/deep-dive/precious-metals", label: "Precious Metals Deep Dive" },
                { href: "/sg/deep-dive/tokenisation", label: "Tokenisation Architecture" },
                { href: "/sg/deep-dive/collateral-highway", label: "Collateral Highway" },
                { href: "/sg/workflows/commodities-collateral", label: "Commodities as Collateral" },
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
