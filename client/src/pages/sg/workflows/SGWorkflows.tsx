import { Link } from "wouter";
import SGPortalNav, { SG } from "@/components/SGPortalNav";
import { CinematicBackground } from "@/components/motion";
import { ArrowRight, ArrowRightLeft, Zap, Shield, Layers, Building2, Banknote, Briefcase } from "lucide-react";

const SG_LOGO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663328851912/82pWKmUqBRkgn8Ladat8sj/units-sg-orchid-logo-light-KqELedrzeYmCnakJE4pQSh.png";
const FINTERNET_LOGO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663328851912/82pWKmUqBRkgn8Ladat8sj/yP0fvxrB3mwq_e7583308.png";

const WORKFLOWS = [
  {
    id: "cdp-bridge",
    title: "CDP Bridge",
    subtitle: "Equity Migration to UNITS",
    description: "Step-by-step migration of CDP-held equities onto the UNITS Network via proxy tokenisation. Shows how existing SGX-listed shares become programmable tokets while CDP remains the legal record-keeper.",
    steps: 6,
    icon: ArrowRightLeft,
    accent: SG.masTeal,
    participants: ["CDP", "SGX", "DBS", "UNITS Network"],
    tags: ["Proxy Mode", "Equities", "CDP"],
  },
  {
    id: "atomic-dvp",
    title: "Atomic DvP",
    subtitle: "XSGD Settlement Flow",
    description: "Real-time atomic delivery-versus-payment using XSGD stablecoin as the cash leg. Demonstrates how a Singapore Government Securities trade settles in seconds instead of T+1, with simultaneous finality on both legs.",
    steps: 7,
    icon: Zap,
    accent: SG.nusOrange,
    participants: ["DBS", "OCBC", "MAS", "StraitsX", "UNITS Network"],
    tags: ["Atomic", "XSGD", "SGS"],
  },
  {
    id: "collateral-mobilisation",
    title: "Collateral Mobilisation",
    subtitle: "CDP-MEPS+ Cross-Asset Flow",
    description: "How tokenised CDP equities and MEPS+ government securities are mobilised as collateral across the unified UNITS ledger. Shows real-time pledge, substitution, and release without moving assets between depositories.",
    steps: 6,
    icon: Shield,
    accent: "#a78bfa",
    participants: ["DBS", "GIC", "MAS", "CDP", "MEPS+", "UNITS Network"],
    tags: ["Collateral", "Cross-Asset", "Encumbrance"],
  },
  {
    id: "vcc-tokenisation",
    title: "VCC Fund Tokenisation",
    subtitle: "End-to-End Fund Lifecycle",
    description: "Complete lifecycle of a Variable Capital Company on UNITS Network: umbrella registration, sub-fund tokenisation with share classes, primary distribution via atomic subscription, secondary trading with compliance gates, collateral mobilisation, NAV calculation, and redemption with gate protection.",
    steps: 7,
    icon: Briefcase,
    accent: SG.masTeal,
    participants: ["Fullerton", "GIC", "Temasek", "DBS", "OCBC", "UOB", "BNP Paribas"],
    tags: ["VCC", "Fund Interests", "Collateral", "NAV", "Compliance Gates"],
  },
];

export default function SGWorkflows() {
  return (
    <div className="min-h-screen text-white" style={{ background: SG.dark }}>
      <SGPortalNav />
      <div className="max-w-5xl mx-auto p-6 md:p-12" style={{ color: "rgba(255,255,255,0.85)" }}>
        {/* Hero */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${SG.masTeal}20` }}>
              <Layers className="w-5 h-5" style={{ color: SG.masTeal }} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.3)" }}>Interactive Workflows</p>
              <h1 className="text-2xl font-bold text-white">UNITS|SG in Action</h1>
            </div>
          </div>
          <p className="text-base leading-relaxed max-w-3xl" style={{ color: "rgba(255,255,255,0.55)" }}>
            Walk through the key operational flows that demonstrate how UNITS Network transforms Singapore's
            capital markets infrastructure. Each workflow is interactive, showing step-by-step execution with
            real system state changes, participant actions, and execution logs.
          </p>
        </div>

        {/* Workflow Cards */}
        <div className="space-y-6">
          {WORKFLOWS.map((wf, idx) => {
            const Icon = wf.icon;
            return (
              <Link key={wf.id} href={`/sg/workflows/${wf.id}`}>
                <div
                  className="group p-6 rounded-xl border cursor-pointer transition-all duration-300 hover:scale-[1.01]"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    borderColor: SG.border,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${wf.accent}40`;
                    e.currentTarget.style.background = `${wf.accent}08`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = SG.border;
                    e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                  }}
                >
                  <div className="flex items-start gap-5">
                    {/* Number + Icon */}
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-xs font-mono" style={{ color: "rgba(255,255,255,0.2)" }}>0{idx + 1}</span>
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${wf.accent}15` }}>
                        <Icon className="w-6 h-6" style={{ color: wf.accent }} />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h2 className="text-lg font-semibold text-white">{wf.title}</h2>
                        <span className="text-xs px-2 py-0.5 rounded-full" style={{ color: wf.accent, background: `${wf.accent}15` }}>
                          {wf.steps} steps
                        </span>
                      </div>
                      <p className="text-sm font-medium mb-2" style={{ color: `${wf.accent}90` }}>{wf.subtitle}</p>
                      <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.45)" }}>{wf.description}</p>

                      {/* Participants */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {wf.participants.map((p) => (
                          <span key={p} className="text-[10px] px-2 py-0.5 rounded-full" style={{ color: "rgba(255,255,255,0.4)", border: `1px solid ${SG.border}` }}>
                            {p}
                          </span>
                        ))}
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {wf.tags.map((t) => (
                          <span key={t} className="text-[10px] px-2 py-0.5 rounded" style={{ color: `${wf.accent}80`, background: `${wf.accent}10` }}>
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Arrow */}
                    <div className="flex items-center self-center">
                      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" style={{ color: "rgba(255,255,255,0.2)" }} />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Context */}
        <div className="mt-12 p-5 rounded-xl" style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${SG.border}` }}>
          <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "rgba(255,255,255,0.2)" }}>About These Workflows</p>
          <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>
            These interactive workflows demonstrate how UNITS Network operates within Singapore's existing
            regulatory and infrastructure framework. Each flow uses real institution names, real asset classes,
            and real regulatory references to show how the network would function in production. The workflows
            are designed for MAS, SGX, CDP, and participating financial institutions to understand the
            operational model before the Proof of Value engagement.
          </p>
        </div>

        {/* Related Deep Dives */}
        <div className="mt-8 p-5 rounded-xl" style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${SG.border}` }}>
          <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "rgba(255,255,255,0.2)" }}>Related Deep Dives</p>
          <div className="flex flex-wrap gap-3">
            {[
              { href: "/sg/deep-dive/dvp-settlement", label: "DvP Settlement" },
              { href: "/sg/deep-dive/collateral-highway", label: "Collateral Highway" },
              { href: "/sg/deep-dive/tokenisation", label: "Tokenisation" },
              { href: "/sg/deep-dive/participants", label: "Participants" },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="px-3 py-1.5 rounded-full text-xs transition-colors" style={{ color: "rgba(255,255,255,0.35)", border: `1px solid ${SG.border}` }}>
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
  );
}
