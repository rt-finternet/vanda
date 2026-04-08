import { useRef, useState, useEffect } from "react";
import { Link } from "wouter";
import SGPortalNav, { SG } from "@/components/SGPortalNav";
import { CinematicBackground } from "@/components/motion";
import {
  ArrowRight, Shield, Layers, Building2, Leaf, TrendingUp,
  Lock, Globe, FileCheck, Landmark, Briefcase, BarChart3,
  Wallet, Network, Eye, RefreshCw, CheckCircle2
} from "lucide-react";

const SG_LOGO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663328851912/82pWKmUqBRkgn8Ladat8sj/units-sg-orchid-logo-light-KqELedrzeYmCnakJE4pQSh.png";
const FINTERNET_LOGO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663328851912/82pWKmUqBRkgn8Ladat8sj/yP0fvxrB3mwq_e7583308.png";

function RevealSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setTimeout(() => setVisible(true), delay); observer.disconnect(); }
    }, { threshold: 0.15 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);
  return (
    <div ref={ref} className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
      {children}
    </div>
  );
}

export default function SGDeepDiveVCC() {
  return (
    <div className="vanda-portal min-h-screen text-white" style={{ background: SG.dark }}>
      <SGPortalNav />
      <div className="max-w-4xl mx-auto p-6 md:p-12" style={{ color: "rgba(255,255,255,0.85)" }}>

        {/* Hero */}
        <RevealSection>
          <div className="mb-12">
            <div className="flex items-center gap-5 mb-8">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${SG.masTeal}20` }}>
                <Briefcase className="w-6 h-6" style={{ color: SG.masTeal }} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.3)" }}>SG Deep Dive</p>
                <h1 className="text-3xl font-bold text-white">VCC Fund Tokenisation</h1>
              </div>
            </div>
            <p className="text-lg leading-relaxed max-w-3xl" style={{ color: "rgba(255,255,255,0.55)" }}>
              How interests in Variable Capital Company (VCC) funds and sub-funds are tokenised,
              traded, and used as collateral on the UNITS Network. Carbon credits are one example,
              the VCC structure spans private equity, real estate, hedge funds, infrastructure,
              digital assets, and more.
            </p>
          </div>
        </RevealSection>

        {/* What is a VCC */}
        <RevealSection delay={100}>
          <section className="mb-12">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
              <Landmark className="w-5 h-5" style={{ color: SG.nusOrange }} />
              What is a VCC?
            </h2>
            <div className="p-6 rounded-xl" style={{ background: SG.card, border: `1px solid ${SG.border}` }}>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.6)" }}>
                The Variable Capital Company (VCC) is Singapore's flagship corporate structure for investment funds,
                introduced by MAS in January 2020. Unlike traditional unit trusts, a VCC is a legal entity that can
                issue and redeem shares without shareholder approval, making it ideal for open-ended and closed-ended
                funds alike. Critically, a single VCC can operate as an umbrella structure with multiple sub-funds,
                each with its own investment strategy, asset class, and investor base, while sharing a single legal
                entity and regulatory filing.
              </p>
              <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
                As of 2025, over 1,000 VCCs have been incorporated in Singapore, managing assets across every major
                asset class. The VCC Grant Scheme (extended through 2025) has catalysed adoption, with MAS positioning
                the VCC as the default vehicle for Singapore's ambition to become Asia's premier fund domicile.
              </p>

              {/* VCC Structure Diagram */}
              <div className="p-5 rounded-lg" style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${SG.border}` }}>
                <p className="text-xs uppercase tracking-widest mb-4 text-center" style={{ color: "rgba(255,255,255,0.25)" }}>VCC Umbrella Structure</p>
                <div className="flex flex-col items-center gap-3">
                  <div className="px-6 py-3 rounded-lg text-center" style={{ background: `${SG.masTeal}15`, border: `1px solid ${SG.masTeal}30` }}>
                    <p className="text-sm font-semibold" style={{ color: SG.masTeal }}>VCC Umbrella Entity</p>
                    <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.35)" }}>Single legal entity, MAS-regulated</p>
                  </div>
                  <div className="w-px h-4" style={{ background: SG.border }} />
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full">
                    {[
                      { name: "Sub-Fund A", type: "Private Equity", color: SG.nusOrange },
                      { name: "Sub-Fund B", type: "Real Estate", color: "#a78bfa" },
                      { name: "Sub-Fund C", type: "Carbon Credits", color: SG.masTeal },
                      { name: "Sub-Fund D", type: "Hedge Fund", color: SG.finternetAmber },
                      { name: "Sub-Fund E", type: "Infrastructure", color: SG.finternetCyan },
                      { name: "Sub-Fund F", type: "Digital Assets", color: SG.red },
                    ].map((sf) => (
                      <div key={sf.name} className="p-4 rounded-lg text-center" style={{ background: `${sf.color}08`, border: `1px solid ${sf.color}20` }}>
                        <p className="text-xs font-medium" style={{ color: sf.color }}>{sf.name}</p>
                        <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.3)" }}>{sf.type}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </RevealSection>

        {/* Tokenisation of Fund Interests */}
        <RevealSection delay={150}>
          <section className="mb-12">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
              <Layers className="w-5 h-5" style={{ color: SG.masTeal }} />
              Tokenising VCC Fund Interests
            </h2>
            <div className="p-6 rounded-xl" style={{ background: SG.card, border: `1px solid ${SG.border}` }}>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.6)" }}>
                On the UNITS Network, each VCC sub-fund becomes a <strong className="text-white">tokenPool</strong>,
                and each share or unit of interest in that sub-fund becomes a <strong className="text-white">toket</strong>.
                The VCC itself maps to a <strong className="text-white">tokenClass</strong> that defines the common
                rules across all sub-funds (regulatory compliance, KYC requirements, transfer restrictions).
              </p>

              {/* Mapping Table */}
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ borderBottom: `1px solid ${SG.border}` }}>
                      <th className="text-left p-3 text-xs uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.3)" }}>VCC Concept</th>
                      <th className="text-left p-3 text-xs uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.3)" }}>UNITS Mapping</th>
                      <th className="text-left p-3 text-xs uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.3)" }}>Function</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { vcc: "VCC Entity", units: "tokenClass", fn: "Defines fund-level rules, compliance gates, investor eligibility" },
                      { vcc: "Sub-Fund", units: "tokenPool", fn: "Manages share issuance, NAV tracking, lifecycle for one strategy" },
                      { vcc: "Share / Unit", units: "toket", fn: "Represents one unit of interest, carries per-unit hash and metadata" },
                      { vcc: "Share Class (A, B, C)", units: "tokenPool variant", fn: "Different fee structures, lock-ups, or voting rights within same sub-fund" },
                      { vcc: "Fund Manager", units: "Wallet + VC-03", fn: "Authorised operator with fund management credentials" },
                      { vcc: "Investor", units: "Wallet + VC-01/02", fn: "Accredited investor identity with eligibility credentials" },
                      { vcc: "Transfer Agent", units: "Token Program", fn: "Automated subscription, redemption, and transfer processing" },
                    ].map((row, i) => (
                      <tr key={i} style={{ borderTop: `1px solid ${SG.border}` }}>
                        <td className="p-3 font-medium text-white/70">{row.vcc}</td>
                        <td className="p-3 font-medium" style={{ color: SG.masTeal }}>{row.units}</td>
                        <td className="p-3" style={{ color: "rgba(255,255,255,0.45)" }}>{row.fn}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                This mapping preserves the legal structure of the VCC while adding programmability. The fund manager
                retains full control over issuance and redemption through Token Programs, while investors gain
                24/7 transferability, real-time NAV visibility, and the ability to use their fund interests as
                collateral, all without changing the underlying VCC legal framework.
              </p>
            </div>
          </section>
        </RevealSection>

        {/* Sub-Fund Types */}
        <RevealSection delay={200}>
          <section className="mb-12">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
              <BarChart3 className="w-5 h-5" style={{ color: SG.nusOrange }} />
              VCC Sub-Fund Asset Classes on UNITS
            </h2>
            <div className="space-y-4">
              {[
                {
                  name: "Private Equity",
                  icon: TrendingUp,
                  color: SG.nusOrange,
                  description: "PE fund interests are traditionally illiquid with 7-10 year lock-ups. On UNITS, tokenised PE interests can be traded on secondary markets with transfer restrictions enforced by Token Programs. The fund manager controls who can buy (accredited investors only), while investors gain liquidity they never had.",
                  example: "Temasek-backed PE fund with SGD 500M AUM. 1,000 tokets at SGD 500K each. Secondary trading enabled after 2-year lock-up via Token Program.",
                  participants: "Temasek, GIC, DBS Private Bank, Fullerton Fund Management",
                },
                {
                  name: "Real Estate",
                  icon: Building2,
                  color: "#a78bfa",
                  description: "Real estate VCC sub-funds hold commercial, residential, or industrial property portfolios. Tokenisation enables fractional ownership of Singapore real estate, with rental income distributed automatically via Token Programs on distribution dates.",
                  example: "Marina Bay commercial property fund. SGD 200M AUM, 10,000 tokets at SGD 20K each. Quarterly rental distribution automated.",
                  participants: "CapitaLand, Mapletree, Frasers, OCBC",
                },
                {
                  name: "Carbon Credits & ESG",
                  icon: Leaf,
                  color: SG.masTeal,
                  description: "VCC sub-funds holding verified carbon credits (VCUs, GS-VERs) or broader ESG assets. Climate Impact X (CIX) carbon credits are tokenised with provenance tracking via per-unit hashes. Each toket carries the vintage, project, and verification standard as metadata.",
                  example: "CIX Verified Carbon Unit fund. 100,000 VCUs from Southeast Asian forestry projects. Each toket = 1 tCO2e with full provenance chain.",
                  participants: "Climate Impact X, DBS, Standard Chartered, Temasek",
                },
                {
                  name: "Hedge Funds",
                  icon: BarChart3,
                  color: SG.finternetAmber,
                  description: "Hedge fund VCC sub-funds with various strategies (long/short, macro, quant). Tokenisation enables real-time NAV tracking (vs monthly statements), automated performance fee calculation, and instant subscription/redemption within gate limits.",
                  example: "Multi-strategy hedge fund. SGD 1B AUM, daily NAV on-chain. Redemption gates enforced by Token Program (max 10% per quarter).",
                  participants: "Dymon Asia, Three Arrows (successor), Quantedge, UOB Asset Management",
                },
                {
                  name: "Infrastructure",
                  icon: Globe,
                  color: SG.finternetCyan,
                  description: "Infrastructure VCC sub-funds investing in ASEAN infrastructure projects (ports, power, telecoms, data centres). Long-duration assets with stable cash flows. Tokenisation enables institutional investors to rebalance infrastructure allocations without full fund redemption.",
                  example: "ASEAN Infrastructure Fund. SGD 2B AUM across 15 projects. Tokets tradeable on secondary market with 1-year initial lock-up.",
                  participants: "GIC, Temasek Infrastructure, Keppel, Sembcorp",
                },
                {
                  name: "Digital Assets",
                  icon: Network,
                  color: SG.red,
                  description: "VCC sub-funds holding digital assets (Bitcoin, Ethereum, stablecoins, DeFi positions). The VCC wrapper provides MAS-regulated access to digital assets for institutional investors who cannot hold crypto directly. Token Programs enforce custody rules and rebalancing.",
                  example: "Institutional Digital Asset Fund. SGD 100M AUM. Diversified across BTC, ETH, XSGD yield strategies. MAS-regulated custody.",
                  participants: "DBS Digital Exchange, Sygnum, Matrixport, Independent Reserve",
                },
              ].map((sf) => {
                const Icon = sf.icon;
                return (
                  <div key={sf.name} className="p-5 rounded-xl" style={{ background: SG.card, border: `1px solid ${SG.border}` }}>
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `${sf.color}15` }}>
                        <Icon className="w-4.5 h-4.5" style={{ color: sf.color }} />
                      </div>
                      <h3 className="text-base font-semibold text-white">{sf.name}</h3>
                    </div>
                    <p className="text-sm leading-relaxed mb-3" style={{ color: "rgba(255,255,255,0.55)" }}>{sf.description}</p>
                    <div className="p-4 rounded-lg mb-3" style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${SG.border}` }}>
                      <p className="text-xs font-medium mb-1" style={{ color: sf.color }}>Example</p>
                      <p className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>{sf.example}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {sf.participants.split(", ").map((p) => (
                        <span key={p} className="text-[10px] px-2 py-0.5 rounded-full" style={{ color: "rgba(255,255,255,0.35)", border: `1px solid ${SG.border}` }}>
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </RevealSection>

        {/* Trading Tokenised VCC Interests */}
        <RevealSection delay={250}>
          <section className="mb-12">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
              <RefreshCw className="w-5 h-5" style={{ color: SG.finternetAmber }} />
              Trading Tokenised VCC Interests
            </h2>
            <div className="p-6 rounded-xl" style={{ background: SG.card, border: `1px solid ${SG.border}` }}>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.6)" }}>
                Tokenised VCC interests can be traded on the UNITS Network through atomic DvP, enabling a secondary
                market for traditionally illiquid fund interests. The fund manager retains control through Token Programs
                that enforce transfer restrictions, investor eligibility, and regulatory compliance.
              </p>

              {/* Trading Flow */}
              <div className="space-y-3 mb-6">
                {[
                  { step: "1", title: "Seller lists VCC tokets", desc: "GIC lists 100 tokets of the PE sub-fund for sale at NAV + 2% premium", color: SG.nusOrange },
                  { step: "2", title: "Buyer eligibility check", desc: "Token Program TP-COMP verifies buyer (DBS Private Bank client) holds VC-01 accredited investor credential", color: SG.masTeal },
                  { step: "3", title: "Fund manager approval", desc: "Token Program TP-TRANSFER checks fund manager's pre-approved buyer list or triggers approval request", color: "#a78bfa" },
                  { step: "4", title: "Atomic DvP execution", desc: "100 PE tokets transfer to buyer, XSGD payment transfers to seller, simultaneously and irrevocably", color: SG.finternetAmber },
                  { step: "5", title: "Register update", desc: "VCC share register updated automatically. MAS reporting triggered. NAV recalculated.", color: SG.finternetCyan },
                ].map((s) => (
                  <div key={s.step} className="flex items-start gap-3 p-4 rounded-lg" style={{ background: "rgba(255,255,255,0.02)" }}>
                    <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold" style={{ background: `${s.color}15`, color: s.color }}>
                      {s.step}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{s.title}</p>
                      <p className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-lg" style={{ background: `${SG.masTeal}08`, border: `1px solid ${SG.masTeal}20` }}>
                <p className="text-xs font-medium mb-1" style={{ color: SG.masTeal }}>Key Advantage</p>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
                  Today, secondary trading of VCC interests requires manual transfer agent processing, paper-based
                  KYC verification, and 5-10 business days for settlement. On UNITS, the entire process executes
                  in seconds with automated compliance, creating genuine liquidity for previously illiquid fund interests.
                </p>
              </div>
            </div>
          </section>
        </RevealSection>

        {/* VCC as Collateral */}
        <RevealSection delay={300}>
          <section className="mb-12">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
              <Shield className="w-5 h-5" style={{ color: "#a78bfa" }} />
              VCC Interests as Collateral
            </h2>
            <div className="p-6 rounded-xl" style={{ background: SG.card, border: `1px solid ${SG.border}` }}>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.6)" }}>
                One of the most transformative capabilities of tokenised VCC interests is their use as collateral.
                Today, fund interests are rarely accepted as collateral because they are illiquid, hard to value
                in real-time, and difficult to liquidate. On UNITS, tokenised VCC interests become first-class
                collateral assets with real-time valuation, programmable encumbrance, and instant liquidation paths.
              </p>

              {/* Collateral Use Cases */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                {[
                  {
                    title: "Margin Collateral",
                    icon: Lock,
                    color: SG.nusOrange,
                    desc: "Pledge tokenised VCC interests as margin collateral with SGX-DC or other CCPs. Real-time NAV provides continuous mark-to-market. Haircuts applied automatically based on asset class and liquidity profile.",
                  },
                  {
                    title: "Repo & Securities Financing",
                    icon: RefreshCw,
                    color: SG.masTeal,
                    desc: "Use VCC tokets in repo transactions. Borrow XSGD against VCC interests with automated margin calls and substitution. The fund interest remains in the borrower's wallet but is encumbered.",
                  },
                  {
                    title: "Lombard Lending",
                    icon: Wallet,
                    color: "#a78bfa",
                    desc: "Banks can accept tokenised VCC interests as collateral for lombard loans. DBS, OCBC, UOB, or HSBC can lend against a client's PE or real estate fund holdings with automated LTV monitoring.",
                  },
                  {
                    title: "Cross-Collateralisation",
                    icon: Layers,
                    color: SG.finternetAmber,
                    desc: "Combine VCC interests with other UNITS assets (equities, SGS bonds) in a single collateral pool. The unified ledger enables cross-asset optimisation that is impossible when assets sit in separate systems.",
                  },
                ].map((uc) => {
                  const Icon = uc.icon;
                  return (
                    <div key={uc.title} className="p-4 rounded-lg" style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${SG.border}` }}>
                      <div className="flex items-center gap-2 mb-2">
                        <Icon className="w-4 h-4" style={{ color: uc.color }} />
                        <p className="text-sm font-medium text-white">{uc.title}</p>
                      </div>
                      <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>{uc.desc}</p>
                    </div>
                  );
                })}
              </div>

              {/* Collateral Lifecycle */}
              <div className="p-4 rounded-lg" style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${SG.border}` }}>
                <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "rgba(255,255,255,0.25)" }}>Collateral Lifecycle on UNITS</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: "Pledge", desc: "Encumber tokets via TP-ENCUMB" },
                    { label: "Valuation", desc: "Real-time NAV from fund manager" },
                    { label: "Margin Call", desc: "Auto-trigger if LTV breaches threshold" },
                    { label: "Substitution", desc: "Swap collateral atomically" },
                    { label: "Top-Up", desc: "Add more tokets to maintain coverage" },
                    { label: "Release", desc: "Remove encumbrance on repayment" },
                    { label: "Liquidation", desc: "Force-sell via atomic DvP if default" },
                  ].map((step, i) => (
                    <div key={step.label} className="flex items-center gap-3">
                      <div className="px-3 py-1.5 rounded-lg" style={{ background: `${SG.masTeal}08`, border: `1px solid ${SG.masTeal}15` }}>
                        <p className="text-[10px] font-medium" style={{ color: SG.masTeal }}>{step.label}</p>
                        <p className="text-[9px]" style={{ color: "rgba(255,255,255,0.3)" }}>{step.desc}</p>
                      </div>
                      {i < 6 && <ArrowRight className="w-3 h-3" style={{ color: SG.border }} />}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </RevealSection>

        {/* Carbon Credits Example */}
        <RevealSection delay={350}>
          <section className="mb-12">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
              <Leaf className="w-5 h-5" style={{ color: SG.masTeal }} />
              Example: Carbon Credit VCC on UNITS
            </h2>
            <div className="p-6 rounded-xl" style={{ background: SG.card, border: `1px solid ${SG.border}` }}>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.6)" }}>
                A carbon credit VCC sub-fund demonstrates the full power of tokenisation. Each Verified Carbon Unit (VCU)
                becomes a toket with rich metadata: project name, vintage year, verification standard (Verra, Gold Standard),
                geography, and co-benefits. This provenance data is immutable and travels with the toket through every
                transaction, solving the double-counting problem that plagues traditional carbon markets.
              </p>

              {/* Carbon Credit Toket Anatomy */}
              <div className="p-4 rounded-lg mb-4" style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${SG.border}` }}>
                <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "rgba(255,255,255,0.25)" }}>Carbon Credit Toket Anatomy</p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "tokenClass", value: "TC-SG-VCC-CARBON" },
                    { label: "tokenPool", value: "TP-CIX-REDD-2024" },
                    { label: "Project", value: "Kalimantan Forests REDD+" },
                    { label: "Vintage", value: "2024" },
                    { label: "Standard", value: "Verra VCS" },
                    { label: "Volume", value: "1 tCO2e per toket" },
                    { label: "Geography", value: "Indonesia (Borneo)" },
                    { label: "Co-benefits", value: "Biodiversity, Community" },
                    { label: "Registry Link", value: "Verra Registry ID: VCS-2847" },
                    { label: "CIX Verification", value: "CIX-VER-2024-08472" },
                  ].map((item) => (
                    <div key={item.label} className="p-2 rounded" style={{ background: SG.surface }}>
                      <p className="text-[10px] uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.25)" }}>{item.label}</p>
                      <p className="text-xs font-medium" style={{ color: SG.masTeal }}>{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                When a corporation purchases these carbon credit tokets to offset emissions, the retirement is recorded
                on-ledger with the buyer's identity and the specific tokets retired. This creates an auditable,
                tamper-proof retirement chain that satisfies both voluntary carbon market standards and Singapore's
                upcoming mandatory climate disclosure requirements.
              </p>
            </div>
          </section>
        </RevealSection>

        {/* Regulatory Framework */}
        <RevealSection delay={400}>
          <section className="mb-12">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
              <FileCheck className="w-5 h-5" style={{ color: SG.finternetCyan }} />
              Regulatory Alignment
            </h2>
            <div className="p-6 rounded-xl" style={{ background: SG.card, border: `1px solid ${SG.border}` }}>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ borderBottom: `1px solid ${SG.border}` }}>
                      <th className="text-left p-3 text-xs uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.3)" }}>Regulation</th>
                      <th className="text-left p-3 text-xs uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.3)" }}>Requirement</th>
                      <th className="text-left p-3 text-xs uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.3)" }}>UNITS Compliance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { reg: "VCC Act 2018", req: "Share register maintenance", units: "On-ledger register, real-time, immutable" },
                      { reg: "SFA (Cap 289)", req: "Investor accreditation", units: "VC-01/02 credentials verified per transfer" },
                      { reg: "MAS Notice SFA 04-N12", req: "AML/CFT for fund managers", units: "Token Program enforces KYC/AML gates" },
                      { reg: "VCC Regulations", req: "Sub-fund segregation", units: "Separate tokenPools per sub-fund" },
                      { reg: "PSA 2019", req: "Digital payment token rules", units: "XSGD settlement compliant" },
                      { reg: "Climate Disclosure", req: "Carbon credit provenance", units: "Per-toket metadata with verification chain" },
                    ].map((row, i) => (
                      <tr key={i} style={{ borderTop: `1px solid ${SG.border}` }}>
                        <td className="p-3 font-medium text-white/70">{row.reg}</td>
                        <td className="p-3" style={{ color: "rgba(255,255,255,0.45)" }}>{row.req}</td>
                        <td className="p-3 font-medium" style={{ color: SG.masTeal }}>{row.units}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </RevealSection>

        {/* UNITS Knowledge Base Cross-Links */}
        <div className="mt-16 p-6 rounded-xl" style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${SG.border}` }}>
          <p className="text-xs uppercase tracking-widest mb-4" style={{ color: "rgba(255,255,255,0.25)" }}>UNITS Knowledge Base</p>
          <div className="flex flex-wrap gap-3">
            {[
              { href: "/sg/deep-dive/tokenisation", label: "Tokenisation (Protocol)" },
              { href: "/sg/deep-dive/token-programs", label: "Token Programs" },
              { href: "/sg/deep-dive/units", label: "UNITS Protocol" },
              { href: "/sg/deep-dive/collateral-highway", label: "SG Collateral Highway" },
              { href: "/sg/deep-dive/regulatory", label: "SG Regulatory Framework" },
              { href: "/sg/deep-dive/participants", label: "SG Participants" },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="px-3 py-1.5 rounded-full text-xs transition-colors" style={{ color: "rgba(255,255,255,0.35)", border: `1px solid ${SG.border}` }}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-4 pt-8" style={{ borderTop: `1px solid ${SG.border}` }}>
          <Link href="/sg/deep-dive/tokenisation" className="flex items-center gap-2 text-sm transition-colors" style={{ color: "rgba(255,255,255,0.4)" }}>
            &larr; Tokenisation
          </Link>
          <div className="flex-1" />
          <Link href="/sg/deep-dive/participants" className="flex items-center gap-2 text-sm transition-colors" style={{ color: `${SG.nusOrange}90` }}>
            Next: Participants <ArrowRight className="w-3.5 h-3.5" />
          </Link>
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
