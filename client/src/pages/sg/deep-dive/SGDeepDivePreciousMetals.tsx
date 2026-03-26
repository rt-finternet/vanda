import { useRef, useState, useEffect } from "react";
import { Link } from "wouter";
import SGPortalNav, { SG } from "@/components/SGPortalNav";
import { CinematicBackground } from "@/components/motion";
import {
  Gem, Shield, Globe, ArrowRight, ChevronDown, ChevronUp,
  Zap, Network, Layers, CheckCircle2, Lock, Coins,
  Users, BarChart3, Banknote, RefreshCw, Building2, Landmark,
  AlertTriangle, Eye, BadgeCheck, Warehouse, Scale, FileText,
  ArrowRightLeft, TrendingUp, Briefcase
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

/* ───────────────────── Data ───────────────────── */
const marketStats = [
  { label: "Global Gold Holdings", value: "~205,000 tonnes", sub: "All gold ever mined" },
  { label: "Singapore Vault Capacity", value: "500+ tonnes", sub: "Brink's, Malca-Amit, Le Freeport" },
  { label: "Daily Gold Clearing (LBMA)", value: "~USD 80B", sub: "London PM Fix" },
  { label: "SG Gold Imports (2024)", value: "~USD 50B", sub: "Asia's fastest-growing hub" },
  { label: "SBMA Kilobar Standard", value: "1 kg / 99.99%", sub: "Asian-market accessible" },
  { label: "Tokenised Gold Market", value: "~USD 1.5B", sub: "PAXG + XAUT combined" },
];

const painPoints = [
  {
    title: "Minimum Bar Size Barrier",
    description: "An LBMA Good Delivery gold bar weighs 350-430 troy ounces, worth approximately USD 800,000-1,000,000. Even the SBMA Kilobar standard (1 kg, ~USD 80,000) excludes most retail investors and smaller wealth management clients from direct physical gold ownership.",
    icon: <Scale className="w-5 h-5" />,
    impact: "99%+ of investors excluded from direct physical gold",
  },
  {
    title: "Opaque Custody Chains",
    description: "Physical gold passes through multiple custodians, sub-custodians, and vault operators. Investors in gold ETFs (including SGX-listed LionGlobal Singapore Physical Gold Fund) have no visibility into which specific bars back their holdings, creating counterparty risk.",
    icon: <Eye className="w-5 h-5" />,
    impact: "Multiple layers of counterparty risk",
  },
  {
    title: "T+2 Settlement for Unallocated",
    description: "Unallocated gold settles T+2 through LBMA clearing. Allocated gold transfers require physical bar movements between vaults, taking days. Singapore-based investors buying London gold face additional cross-border settlement delays.",
    icon: <AlertTriangle className="w-5 h-5" />,
    impact: "2-5 day settlement creates funding gaps",
  },
  {
    title: "Cross-Jurisdiction Complexity",
    description: "Moving gold exposure between Singapore (SBMA/SGX vaults), London (LBMA vaults), and other jurisdictions requires navigating different regulatory regimes, tax treatments, and custody arrangements through multiple intermediaries.",
    icon: <Globe className="w-5 h-5" />,
    impact: "Fragmented custody across LBMA, SBMA, COMEX",
  },
  {
    title: "Limited Collateral Utility",
    description: "Physical gold and gold ETFs cannot be easily mobilised as collateral for margin calls, repo transactions, or structured product backing. SGX-DC margin calls require cash or approved securities — gold is excluded despite its value.",
    icon: <Lock className="w-5 h-5" />,
    impact: "Gold locked in vaults, not working as collateral",
  },
  {
    title: "No Fractional Physical Ownership",
    description: "There is no mechanism for fractional ownership of specific physical bars. Investors must choose between unallocated accounts (no bar-level ownership) or full bar purchase (USD 80K+ for kilobar, USD 800K+ for LBMA bar).",
    icon: <Coins className="w-5 h-5" />,
    impact: "Binary choice: full bar or no bar-level ownership",
  },
];

const unitsComponents = [
  {
    component: "Unified Ledger",
    goldApplication: "Bar-Level Digital Registry",
    icon: <Layers className="w-5 h-5" />,
    hex: SG.masTeal,
    details: [
      "Each LBMA/SBMA Good Delivery bar represented as a unique token on the UNITS ledger",
      "Bar serial number, refiner, assay certificate, weight, and vault location recorded immutably",
      "Fractional gram-tokets reference specific physical bars — full provenance chain",
      "Singapore vault operators (Brink's, Malca-Amit, Le Freeport) each maintain a tokenPool",
      "Real-time reconciliation between physical vault inventory and digital register",
    ],
  },
  {
    component: "Verifiable Credentials (VCs)",
    goldApplication: "Provenance & Compliance",
    icon: <BadgeCheck className="w-5 h-5" />,
    hex: SG.finternetAmber,
    details: [
      "VC-Refiner: LBMA/SBMA Good Delivery List attestation for bar origin",
      "VC-Vault: MAS-regulated vault operator credential (Brink's SG, Malca-Amit SG)",
      "VC-Chain: LBMA Responsible Gold Guidance (RGG) and SBMA compliance attestation",
      "VC-Insurance: Lloyd's or equivalent coverage attestation for vault contents",
      "VC-IPM: Singapore Investment Precious Metals GST exemption qualification (99.5%+ purity)",
    ],
  },
  {
    component: "Token Programs",
    goldApplication: "Automated Metal Operations",
    icon: <Zap className="w-5 h-5" />,
    hex: SG.red,
    details: [
      "Gold lending: automated lending pool with programmable rates, collateral requirements, and recall",
      "Auto-rebalancing: portfolio tokets containing gold automatically rebalance on price triggers",
      "Physical redemption workflow: accumulation tracking, bar allocation, vault withdrawal scheduling",
      "Vault-to-vault transfer: atomic transfer of metal exposure between Singapore and London pools",
      "Collateral management: gold tokets pledged as collateral via UNITS Collateral Highway",
    ],
  },
  {
    component: "Encumbrance Layer",
    goldApplication: "Collateral and Lending",
    icon: <Lock className="w-5 h-5" />,
    hex: SG.finternetCyan,
    details: [
      "Gold tokets as collateral for SGX-DC margin calls and fixed income positions",
      "Tri-party collateral management with gold tokets via UNITS Collateral Highway",
      "Lending encumbrance: gold on loan is encumbered, preventing double-pledge",
      "Haircut management: programmable haircuts based on metal type and market volatility",
      "Cross-asset collateral: gold tokets securing structured note or VCC fund positions",
    ],
  },
];

const sgVaults = [
  { name: "Brink's Singapore Pte Ltd", metals: "Gold, Silver", location: "Singapore", notes: "SBMA-approved, Kilobar Gold Contract vault" },
  { name: "Malca-Amit Singapore", metals: "Gold, Silver, PGMs", location: "Changi Airport", notes: "State-of-the-art facility, LBMA/SBMA member" },
  { name: "Le Freeport (Singapore Freeport)", metals: "Gold, Silver, Art", location: "Changi", notes: "Tax-advantaged bonded warehouse, duty deferral" },
  { name: "The Reserve", metals: "Gold, Silver", location: "Singapore", notes: "Independent vault, minimised counterparty risk" },
  { name: "Silver Bullion (The Safe House)", metals: "Gold, Silver", location: "Singapore", notes: "SBMA member, retail + institutional" },
  { name: "Indigo Precious Metals", metals: "Gold, Silver, PGMs", location: "Singapore", notes: "LBMA and SBMA member" },
];

const lbmaVaults = [
  { name: "HSBC Bank plc", metals: "Gold, Silver", location: "London", notes: "Largest LBMA vault operator" },
  { name: "JP Morgan Chase Bank NA", metals: "Gold, Silver", location: "London/New York", notes: "Major clearing member" },
  { name: "ICBC Standard Bank plc", metals: "Gold, Silver", location: "London", notes: "Chinese state bank subsidiary" },
  { name: "Brink's Limited", metals: "Gold, Silver", location: "London", notes: "Independent vault operator" },
];

const lifecycleComparison = [
  { step: "Acquisition", current: "Minimum 1 LBMA bar (USD 800K+) or 1 SBMA kilobar (USD 80K+), bilateral OTC, T+2", unitsSG: "From 1 gram (USD 80), atomic DvP via UNITS, T+0 settlement", improvement: "10,000x lower minimum, instant settlement" },
  { step: "Custody", current: "Vault operator + sub-custodian + fund administrator. No bar-level visibility for ETF investors", unitsSG: "Direct wallet holding with bar-level provenance. Register tracks every toket to specific vault and bar", improvement: "Full transparency, single custody layer" },
  { step: "Transfer", current: "Unallocated: T+2 via LBMA clearing. Allocated: physical bar movement, 1-5 days", unitsSG: "Atomic DvP transfer between wallets. Cash leg (SGD/USD/XSGD) settles simultaneously", improvement: "T+0 atomic, no physical movement needed" },
  { step: "Lending", current: "Bilateral gold lending, opaque rates, limited participants, manual recall", unitsSG: "Programmable lending pool via Token Program. Automated rate setting and recall", improvement: "Transparent, automated, accessible to all holders" },
  { step: "Collateral", current: "Manual pledge via custodian. Haircut negotiated bilaterally. Not accepted for SGX-DC margin", unitsSG: "Instant pledge via Collateral Highway. Programmable haircuts. Accepted for SGX-DC margin calls", improvement: "Instant mobilisation, SGX-DC eligible" },
  { step: "Physical Redemption", current: "Full bar only. Vault withdrawal requires custodian chain, 3-10 business days", unitsSG: "Accumulate tokets to bar equivalent. Token Program triggers vault withdrawal from Brink's/Malca-Amit SG", improvement: "Programmable accumulation and redemption" },
  { step: "Cross-Border", current: "Requires correspondent custodians in each jurisdiction. Tax and regulatory complexity", unitsSG: "UNITS Gateway enables cross-jurisdiction gold toket transfers. VC-based tax and regulatory compliance", improvement: "Single protocol, multi-jurisdiction" },
];

const serviceTiers = [
  {
    name: "Gold Custody as a Service",
    description: "UNITS|SG maintains the tokenPool register for Singapore and LBMA vault operators. Each vault operator's physical gold is represented as a tokenPool with bar-level tracking. Participants (DBS, OCBC, UOB, wealth managers) hold gold tokets in wallets.",
    features: ["Bar-level provenance tracking", "Real-time vault reconciliation", "SBMA + LBMA dual-standard support", "MAS-regulated custody framework", "IPM GST exemption compliance"],
    targetClients: "Vault operators, custodian banks (DBS, OCBC, UOB), MAS",
    icon: <Warehouse className="w-6 h-6" />,
    hex: SG.masTeal,
  },
  {
    name: "Gold Distribution Platform",
    description: "Banks and wealth managers (DBS Private Banking, UOB Privilege Banking, OCBC Premier) distribute fractional gold tokets to their clients. The Distributor Portal handles KYC/AML via VCs, order routing, and settlement.",
    features: ["Fractional from 1 gram", "DBS/OCBC/UOB white-label integration", "Automated KYC via VCs", "Real-time pricing (LBMA + SBMA benchmarks)", "Physical redemption workflow"],
    targetClients: "DBS Private Banking, UOB Privilege, OCBC Premier, family offices",
    icon: <Users className="w-6 h-6" />,
    hex: SG.finternetAmber,
  },
  {
    name: "Gold Collateral Highway",
    description: "Gold tokets become first-class collateral on the UNITS Collateral Highway. They can be pledged for SGX-DC margin calls, repo transactions, or structured product backing — alongside bonds and equities.",
    features: ["SGX-DC margin call eligible", "Programmable haircuts (8-12%)", "Real-time substitution", "Cross-asset collateral baskets", "Automated margin top-up"],
    targetClients: "SGX-DC clearing members, prime brokers, hedge funds",
    icon: <ArrowRightLeft className="w-6 h-6" />,
    hex: SG.finternetCyan,
  },
  {
    name: "Gold Lending & Financing",
    description: "Programmable gold lending pools enable institutional participants to lend and borrow gold tokets with automated rate discovery, collateral management, and recall mechanisms.",
    features: ["Automated lending pools", "Transparent rate discovery", "Programmable recall", "Encumbrance enforcement", "Integration with securities financing"],
    targetClients: "Bullion banks (JPMorgan SG, UBS SG, HSBC SG), trading desks",
    icon: <Banknote className="w-6 h-6" />,
    hex: "#a78bfa",
  },
];

/* ───────────────────── Component ───────────────────── */
function ExpandableSection({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-xl overflow-hidden" style={{ background: `${SG.card}`, border: `1px solid ${SG.border}` }}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-5 text-left">
        <span className="text-lg font-semibold text-white">{title}</span>
        {open ? <ChevronUp className="w-5 h-5 text-white/40" /> : <ChevronDown className="w-5 h-5 text-white/40" />}
      </button>
      {open && <div className="px-5 pb-5">{children}</div>}
    </div>
  );
}

export default function SGDeepDivePreciousMetals() {
  return (
    <>
      <SGPortalNav />
      <div className="min-h-screen" style={{ background: SG.dark, color: "rgba(255,255,255,0.85)" }}>
        <CinematicBackground />
        {/* Hero */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 opacity-20" style={{ background: `radial-gradient(ellipse at 30% 50%, ${SG.finternetAmber}30, transparent 60%), radial-gradient(ellipse at 70% 50%, ${SG.masTeal}20, transparent 60%)` }} />
          <div className="relative max-w-6xl mx-auto px-6">
            <div className="flex items-center gap-3 mb-6">
              <Gem className="w-8 h-8" style={{ color: SG.finternetAmber }} />
              <span className="text-sm font-mono tracking-wider" style={{ color: `${SG.finternetAmber}90` }}>UNITS|SG DEEP DIVE</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-white">Precious Metals</span>{" "}
              <span style={{ color: SG.finternetAmber }}>Tokenisation</span>
            </h1>
            <p className="text-lg max-w-3xl" style={{ color: "rgba(255,255,255,0.5)" }}>
              How UNITS|SG transforms Singapore's precious metals infrastructure — from LBMA Good Delivery bars and SBMA kilobars to programmable gram-tokets with bar-level provenance, instant settlement, and collateral utility.
            </p>
            <p className="text-sm mt-4 max-w-3xl" style={{ color: "rgba(255,255,255,0.35)" }}>
              Singapore is Asia's fastest-growing gold hub. In March 2026, MAS tapped JPMorgan and UBS to boost institutional gold trading liquidity. UNITS|SG provides the digital infrastructure to make Singapore's gold fully programmable.
            </p>
          </div>
        </section>

        {/* Market Stats */}
        <section className="py-12" style={{ borderTop: `1px solid ${SG.border}`, borderBottom: `1px solid ${SG.border}` }}>
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {marketStats.map((s) => (
              <div key={s.label} className="text-center p-3 rounded-lg" style={{ background: `${SG.card}`, border: `1px solid ${SG.border}` }}>
                <div className="text-lg font-bold" style={{ color: SG.finternetAmber }}>{s.value}</div>
                <div className="text-xs text-white/60 mt-1">{s.label}</div>
                <div className="text-[10px] text-white/30 mt-0.5">{s.sub}</div>
              </div>
            ))}
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-6 py-16 space-y-20">
          {/* Pain Points */}
          <RevealSection>
            <h2 className="text-2xl font-bold mb-2">The Problem: Why Gold Needs a Digital Layer</h2>
            <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.4)" }}>
              Despite Singapore's world-class vault infrastructure and MAS's push to become Asia's gold hub, the precious metals market remains fragmented, opaque, and inaccessible.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {painPoints.map((p) => (
                <div key={p.title} className="rounded-xl p-5" style={{ background: `${SG.card}`, border: `1px solid ${SG.border}` }}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg" style={{ background: `${SG.red}20` }}>
                      <div style={{ color: SG.red }}>{p.icon}</div>
                    </div>
                    <h3 className="font-semibold text-white text-sm">{p.title}</h3>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{p.description}</p>
                  <div className="mt-3 px-2 py-1 rounded text-[10px] font-mono inline-block" style={{ background: `${SG.red}15`, color: `${SG.red}90` }}>
                    {p.impact}
                  </div>
                </div>
              ))}
            </div>
          </RevealSection>

          {/* UNITS Architecture for Gold */}
          <RevealSection delay={100}>
            <h2 className="text-2xl font-bold mb-2">UNITS|SG Architecture for Precious Metals</h2>
            <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.4)" }}>
              How each layer of the UNITS protocol stack applies to gold and silver tokenisation in Singapore.
            </p>
            <div className="space-y-4">
              {unitsComponents.map((c) => (
                <ExpandableSection key={c.component} title={`${c.component} → ${c.goldApplication}`}>
                  <ul className="space-y-2">
                    {c.details.map((d, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                        <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" style={{ color: c.hex }} />
                        {d}
                      </li>
                    ))}
                  </ul>
                </ExpandableSection>
              ))}
            </div>
          </RevealSection>

          {/* Singapore Vault Network */}
          <RevealSection delay={100}>
            <h2 className="text-2xl font-bold mb-2">Singapore Vault Network</h2>
            <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.4)" }}>
              Each vault operator maintains a tokenPool on UNITS|SG. Physical bars in the vault are represented as digital tokens with bar-level provenance.
            </p>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3" style={{ color: SG.finternetAmber }}>Singapore Vaults (SBMA Network)</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr style={{ borderBottom: `1px solid ${SG.border}` }}>
                        <th className="text-left py-2 px-3 text-white/60 font-medium">Vault Operator</th>
                        <th className="text-left py-2 px-3 text-white/60 font-medium">Metals</th>
                        <th className="text-left py-2 px-3 text-white/60 font-medium">Location</th>
                        <th className="text-left py-2 px-3 text-white/60 font-medium">Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sgVaults.map((v) => (
                        <tr key={v.name} style={{ borderBottom: `1px solid ${SG.border}40` }}>
                          <td className="py-2 px-3 text-white font-medium">{v.name}</td>
                          <td className="py-2 px-3 text-white/60">{v.metals}</td>
                          <td className="py-2 px-3 text-white/60">{v.location}</td>
                          <td className="py-2 px-3 text-white/40 text-xs">{v.notes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3" style={{ color: SG.masTeal }}>London Vaults (LBMA Network — Cross-Border)</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr style={{ borderBottom: `1px solid ${SG.border}` }}>
                        <th className="text-left py-2 px-3 text-white/60 font-medium">Vault Operator</th>
                        <th className="text-left py-2 px-3 text-white/60 font-medium">Metals</th>
                        <th className="text-left py-2 px-3 text-white/60 font-medium">Location</th>
                        <th className="text-left py-2 px-3 text-white/60 font-medium">Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {lbmaVaults.map((v) => (
                        <tr key={v.name} style={{ borderBottom: `1px solid ${SG.border}40` }}>
                          <td className="py-2 px-3 text-white font-medium">{v.name}</td>
                          <td className="py-2 px-3 text-white/60">{v.metals}</td>
                          <td className="py-2 px-3 text-white/60">{v.location}</td>
                          <td className="py-2 px-3 text-white/40 text-xs">{v.notes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="p-4 rounded-xl text-xs" style={{ background: `${SG.masTeal}10`, border: `1px solid ${SG.masTeal}30` }}>
                <p style={{ color: `${SG.masTeal}` }}>
                  <strong>Dual-Standard Support:</strong> UNITS|SG supports both LBMA Good Delivery bars (350-430 troy oz, 99.5%+ fineness) and SBMA Kilobar standard (1 kg, 99.99% fineness). This dual-standard approach enables Singapore to serve both the global institutional market (LBMA) and the Asian retail/wealth market (SBMA).
                </p>
              </div>
            </div>
          </RevealSection>

          {/* Lifecycle Comparison */}
          <RevealSection delay={100}>
            <h2 className="text-2xl font-bold mb-2">Gold Lifecycle: Today vs. UNITS|SG</h2>
            <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.4)" }}>
              How each stage of the gold lifecycle transforms when precious metals are tokenised on UNITS|SG.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: `2px solid ${SG.border}` }}>
                    <th className="text-left py-3 px-3 text-white/60 font-medium w-[100px]">Stage</th>
                    <th className="text-left py-3 px-3 font-medium" style={{ color: `${SG.red}90` }}>Today</th>
                    <th className="text-left py-3 px-3 font-medium" style={{ color: `${SG.masTeal}` }}>UNITS|SG</th>
                    <th className="text-left py-3 px-3 font-medium" style={{ color: `${SG.finternetAmber}` }}>Improvement</th>
                  </tr>
                </thead>
                <tbody>
                  {lifecycleComparison.map((row) => (
                    <tr key={row.step} style={{ borderBottom: `1px solid ${SG.border}40` }}>
                      <td className="py-3 px-3 text-white font-semibold text-xs">{row.step}</td>
                      <td className="py-3 px-3 text-white/50 text-xs">{row.current}</td>
                      <td className="py-3 px-3 text-xs" style={{ color: `${SG.masTeal}` }}>{row.unitsSG}</td>
                      <td className="py-3 px-3 text-xs" style={{ color: `${SG.finternetAmber}90` }}>{row.improvement}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </RevealSection>

          {/* Service Tiers */}
          <RevealSection delay={100}>
            <h2 className="text-2xl font-bold mb-2">4-Tier Service Model for Singapore</h2>
            <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.4)" }}>
              UNITS|SG offers four distinct service tiers for precious metals, each targeting a different segment of Singapore's financial ecosystem.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {serviceTiers.map((tier) => (
                <div key={tier.name} className="rounded-xl p-6" style={{ background: `${SG.card}`, border: `1px solid ${SG.border}` }}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg" style={{ background: `${tier.hex}20` }}>
                      <div style={{ color: tier.hex }}>{tier.icon}</div>
                    </div>
                    <h3 className="font-semibold text-white">{tier.name}</h3>
                  </div>
                  <p className="text-xs mb-4" style={{ color: "rgba(255,255,255,0.5)" }}>{tier.description}</p>
                  <ul className="space-y-1.5 mb-4">
                    {tier.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>
                        <CheckCircle2 className="w-3 h-3 shrink-0" style={{ color: tier.hex }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="text-[10px] font-mono px-2 py-1 rounded inline-block" style={{ background: `${tier.hex}15`, color: `${tier.hex}90` }}>
                    {tier.targetClients}
                  </div>
                </div>
              ))}
            </div>
          </RevealSection>

          {/* Singapore Participants */}
          <RevealSection delay={100}>
            <h2 className="text-2xl font-bold mb-2">Singapore Precious Metals Ecosystem</h2>
            <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.4)" }}>
              Key participants in Singapore's precious metals infrastructure that would connect to UNITS|SG.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { title: "Regulators & Infrastructure", color: SG.red, items: ["MAS — Regulatory oversight", "SGX — Exchange infrastructure", "SBMA — Industry standards body", "IRAS — IPM GST exemption authority"] },
                { title: "Banks & Distributors", color: SG.finternetAmber, items: ["DBS — Largest SG bank, gold trading desk", "OCBC — Gold savings accounts, bullion", "UOB — Gold trading and custody", "JPMorgan SG — Global bullion operations", "UBS SG — Private banking, gold custody", "HSBC SG — Precious metals vault operations"] },
                { title: "Vault Operators & Specialists", color: SG.masTeal, items: ["Brink's Singapore — SBMA-approved vault", "Malca-Amit — Changi Airport facility", "Le Freeport — Tax-advantaged bonded storage", "Silver Bullion — Retail + institutional", "Indigo Precious Metals — LBMA/SBMA member", "StraitsX — XSGD stablecoin for settlement"] },
              ].map((group) => (
                <div key={group.title} className="rounded-xl p-5" style={{ background: `${SG.card}`, border: `1px solid ${SG.border}` }}>
                  <h3 className="font-semibold mb-3" style={{ color: group.color }}>{group.title}</h3>
                  <ul className="space-y-2">
                    {group.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>
                        <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: group.color }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </RevealSection>

          {/* Supported Metals */}
          <RevealSection delay={100}>
            <h2 className="text-2xl font-bold mb-2">Supported Metals</h2>
            <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.4)" }}>
              UNITS|SG supports all four LBMA/SBMA precious metals with the same tokenisation architecture.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { metal: "Gold", code: "XAU", bar: "LBMA 400oz / SBMA 1kg", tokets: "~12,441/LBMA bar", color: SG.finternetAmber },
                { metal: "Silver", code: "XAG", bar: "LBMA 1,000 oz", tokets: "~31,103/bar", color: "#94a3b8" },
                { metal: "Platinum", code: "XPT", bar: "1-6 kg", tokets: "~5,000/plate", color: SG.finternetCyan },
                { metal: "Palladium", code: "XPD", bar: "1-6 kg", tokets: "~5,000/plate", color: "#a78bfa" },
              ].map((m) => (
                <div key={m.code} className="rounded-xl p-4 text-center" style={{ background: `${SG.card}`, border: `1px solid ${SG.border}` }}>
                  <div className="text-xs font-mono mb-1" style={{ color: `${m.color}60` }}>{m.code}</div>
                  <div className="text-white font-bold text-lg">{m.metal}</div>
                  <div className="text-xs mt-2" style={{ color: "rgba(255,255,255,0.4)" }}>{m.bar}</div>
                  <div className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>{m.tokets}</div>
                </div>
              ))}
            </div>
            <p className="text-xs mt-4" style={{ color: "rgba(255,255,255,0.3)" }}>
              All four metals share the same tokenisation workflow, 4-tier service model, Collateral Highway integration, and distribution platform access. The only differences are bar standards, pricing benchmarks (LBMA Fix, SBMA/KIS), and vault network configurations.
            </p>
          </RevealSection>

          {/* Related Deep Dives */}
          <section className="py-12" style={{ borderTop: `1px solid ${SG.border}` }}>
            <h2 className="text-2xl font-bold mb-6">Related Pages</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { href: "/sg/deep-dive/collateral-highway", icon: <ArrowRightLeft className="w-6 h-6" />, color: SG.finternetCyan, title: "Collateral Highway", sub: "Gold tokets as first-class collateral" },
                { href: "/sg/workflows/gold-tokenisation", icon: <Gem className="w-6 h-6" />, color: SG.finternetAmber, title: "Gold Tokenisation Workflow", sub: "7-step walkthrough: vault receipt to fractional distribution" },
                { href: "/sg/workflows/commodities-collateral", icon: <ArrowRightLeft className="w-6 h-6" />, color: "#a78bfa", title: "Commodities as Collateral", sub: "Gram-tokets on the Collateral Highway" },
                { href: "/sg/deep-dive/tokenisation", icon: <Layers className="w-6 h-6" />, color: SG.masTeal, title: "Tokenisation Deep Dive", sub: "How physical assets become programmable tokets" },
              ].map((link) => (
                <Link key={link.href} href={link.href} className="rounded-xl p-5 transition-all group block" style={{ background: `${SG.card}`, border: `1px solid ${SG.border}` }}>
                  <div style={{ color: link.color }} className="mb-3">{link.icon}</div>
                  <h3 className="font-semibold text-white text-sm group-hover:underline">{link.title}</h3>
                  <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>{link.sub}</p>
                </Link>
              ))}
            </div>
          </section>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row gap-4 pt-8" style={{ borderTop: `1px solid ${SG.border}` }}>
            <Link href="/sg/deep-dive/vcc" className="flex items-center gap-2 text-sm transition-colors" style={{ color: "rgba(255,255,255,0.4)" }}>
              ← VCC Fund Tokenisation
            </Link>
            <div className="flex-1" />
            <Link href="/sg/workflows/gold-tokenisation" className="flex items-center gap-2 text-sm transition-colors" style={{ color: `${SG.finternetAmber}90` }}>
              Next: Gold Tokenisation Workflow <ArrowRight className="w-3.5 h-3.5" />
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
    </>
  );
}
