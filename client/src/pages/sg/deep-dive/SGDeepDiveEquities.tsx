/*
 * SGDeepDiveEquities.tsx
 * Design: Cinematic dark-theme, motionsites-inspired
 * Palette: SG navy (#0A1628), MAS teal (#00A3A1), Finternet amber (#F59E0B), NUS orange (#EF7C00)
 * Premium generated visuals for hero, settlement flow, dividend flow, cross-depository
 */
import { Link } from "wouter";
import SGPortalNav, { SG } from "@/components/SGPortalNav";
import { CinematicBackground, RevealSection, AnimatedCounter, LiquidGlassCard } from "@/components/motion";
import {
  ArrowLeft, Building2, TrendingUp, Clock, Zap, Shield, Layers,
  ArrowRightLeft, BarChart3, Coins, Users, Eye, Network, BookOpen, ChevronRight
} from "lucide-react";

const SG_LOGO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663328851912/82pWKmUqBRkgn8Ladat8sj/units-sg-orchid-logo-light-KqELedrzeYmCnakJE4pQSh.png";
const FINTERNET_LOGO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663328851912/82pWKmUqBRkgn8Ladat8sj/yP0fvxrB3mwq_e7583308.png";

/* ── Generated Visual Assets ── */
const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663328851912/K7gf8xoKwZVmt9538B5Xu7/equities-hero-QpduZrgJHrntqiNbfQfPqk.webp";
const SETTLEMENT_FLOW_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663328851912/K7gf8xoKwZVmt9538B5Xu7/equities-settlement-flow-25cyemfcz88pajAPsxNb2e.webp";
const DIVIDEND_FLOW_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663328851912/K7gf8xoKwZVmt9538B5Xu7/equities-dividend-flow-RAWgwDkHRyA3tib7GeXeyo.webp";
const CROSS_DEPO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663328851912/K7gf8xoKwZVmt9538B5Xu7/equities-cross-depository-WDQJbeiMjZiKYndHyKqiDN.webp";

/* ── STI Components Data ── */
const STI_COMPONENTS = [
  { ticker: "D05", name: "DBS Group", sector: "Banking", weight: "15.2%" },
  { ticker: "O39", name: "OCBC", sector: "Banking", weight: "11.8%" },
  { ticker: "U11", name: "UOB", sector: "Banking", weight: "11.4%" },
  { ticker: "Z74", name: "Singtel", sector: "Telecom", weight: "5.8%" },
  { ticker: "BN4", name: "Keppel", sector: "Infrastructure", weight: "4.2%" },
  { ticker: "C38U", name: "CapitaLand Invest", sector: "REIT", weight: "3.9%" },
  { ticker: "A17U", name: "CapitaLand Ascendas", sector: "REIT", weight: "3.7%" },
  { ticker: "C6L", name: "SIA", sector: "Aviation", weight: "3.5%" },
  { ticker: "G13", name: "Genting Singapore", sector: "Hospitality", weight: "2.8%" },
  { ticker: "BS6", name: "YZJ Shipbuilding", sector: "Industrial", weight: "2.6%" },
  { ticker: "S63", name: "ST Engineering", sector: "Defence", weight: "2.5%" },
  { ticker: "9CI", name: "CapitaLand Integrated", sector: "REIT", weight: "2.4%" },
  { ticker: "H78", name: "Hongkong Land", sector: "Property", weight: "2.3%" },
  { ticker: "V03", name: "Venture Corp", sector: "Technology", weight: "2.1%" },
  { ticker: "U96", name: "Sembcorp Industries", sector: "Utilities", weight: "2.0%" },
];

/* ── Corporate Action Types ── */
const CORPORATE_ACTIONS = [
  {
    type: "Cash Dividend",
    today: "T+5 to T+10 after record date. CDP processes batch file, banks credit accounts next business day.",
    units: "Instant distribution at record date. Token Program calculates per-toket entitlement and credits XSGD atomically.",
    saving: "5-10 days",
    icon: Coins,
  },
  {
    type: "Rights Issue",
    today: "Paper-based subscription forms, 2-3 week subscription period, manual excess application, refund cheques.",
    units: "Atomic subscription via Token Program. Excess allocation computed instantly. Refund credited in same transaction.",
    saving: "2-3 weeks",
    icon: TrendingUp,
  },
  {
    type: "Stock Split",
    today: "CDP processes overnight batch. Trading halted during record date. New shares reflected next business day.",
    units: "Token Program executes split atomically. All proxy tokets redenominated in a single transaction. No trading halt required.",
    saving: "1 day",
    icon: Layers,
  },
  {
    type: "Bonus Issue",
    today: "Similar to rights issue. CDP batch processing. New shares credited 3-5 business days after record date.",
    units: "Token Program mints additional proxy tokets proportionally. Credited to all holders atomically at record date.",
    saving: "3-5 days",
    icon: BarChart3,
  },
  {
    type: "Scrip Dividend",
    today: "Election period of 2-3 weeks. Manual processing of elections. New shares credited 1-2 weeks after election close.",
    units: "Election recorded on-chain. Token Program processes elections atomically. New tokets or cash credited instantly at close.",
    saving: "3-5 weeks",
    icon: ArrowRightLeft,
  },
];

/* ── Settlement Models ── */
const SETTLEMENT_MODELS = [
  { model: "Gross Real-Time", desc: "Each trade settles individually, securities and cash move atomically", useCase: "Large block trades, institutional crosses", latency: "< 2 seconds" },
  { model: "Continuous Net", desc: "Netting windows every 15 minutes, net positions settle atomically", useCase: "High-frequency retail flow, market-maker inventory", latency: "< 15 minutes" },
  { model: "End-of-Day Net", desc: "Full multilateral netting across all participants, single net settlement", useCase: "Bulk retail trades, ETF creation/redemption", latency: "End of day" },
];

export default function SGDeepDiveEquities() {
  return (
    <div className="min-h-screen text-white" style={{ background: SG.dark }}>
      <SGPortalNav />

      {/* ── Hero Section with Generated Visual ── */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="" className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, ${SG.dark}cc 0%, transparent 30%, transparent 60%, ${SG.dark} 100%)` }} />
        </div>
        <CinematicBackground />
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <Link href="/sg/assets" className="inline-flex items-center gap-2 text-sm mb-8 hover:underline" style={{ color: SG.finternetAmber }}>
            <ArrowLeft className="w-4 h-4" /> Asset Classes
          </Link>
          <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: SG.masTeal }}>Deep Dive</p>
          <h1 className="text-5xl md:text-7xl font-extralight mb-6">
            Equities <span className="font-semibold" style={{ color: SG.finternetAmber }}>Settlement</span>
          </h1>
          <p className="text-lg md:text-xl font-light max-w-3xl mx-auto leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
            Proxy tokenisation of SGX-listed equities held in CDP, enabling atomic settlement against
            XSGD on MEPS+, real-time corporate actions, and programmable portfolio construction.
          </p>
          <div className="flex justify-center gap-8 mt-10">
            {[
              { label: "CDP Securities Value", value: 800, suffix: "B SGD" },
              { label: "Daily SGX Turnover", value: 1.2, suffix: "B SGD", decimals: 1 },
              { label: "STI Components", value: 30, suffix: " stocks" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-light" style={{ color: SG.finternetAmber }}>
                  <AnimatedCounter value={s.value} duration={2000} decimals={s.decimals || 0} />{s.suffix}
                </div>
                <div className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── The Problem: Settlement Fragmentation ── */}
      <RevealSection>
        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: SG.masTeal }}>The Challenge</p>
            <h2 className="text-3xl md:text-4xl font-extralight mb-6">
              Two depositories, <span className="font-semibold" style={{ color: SG.red }}>one settlement gap</span>
            </h2>
            <p className="text-lg font-light leading-relaxed mb-12" style={{ color: "rgba(255,255,255,0.7)" }}>
              Singapore's equity market operates across two separate depositories. Securities settle in CDP
              while cash settles in MEPS+. This structural separation creates a 48-hour settlement cycle (T+2),
              requires pre-funding, and introduces counterparty risk during the settlement window. Corporate
              actions flow through batch processes that add further delays of 5 to 10 days for dividends and
              up to 3 weeks for rights issues.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <LiquidGlassCard>
                <div className="p-8">
                  <h3 className="text-xl font-semibold mb-4" style={{ color: SG.red }}>Today's Pain Points</h3>
                  <div className="space-y-4">
                    {[
                      { label: "Settlement Cycle", value: "T+2 (48 hours)", desc: "Capital locked for 2 business days per trade" },
                      { label: "Pre-funding", value: "Required", desc: "Buyers must pre-fund before trade execution" },
                      { label: "Counterparty Risk", value: "48-hour window", desc: "Exposure between trade and settlement" },
                      { label: "Dividend Processing", value: "T+5 to T+10", desc: "Batch processing through CDP and banks" },
                      { label: "Cross-Depository", value: "Manual reconciliation", desc: "CDP and MEPS+ operate independently" },
                    ].map((p, i) => (
                      <div key={i} className="flex justify-between items-start py-3" style={{ borderBottom: `1px solid ${SG.border}` }}>
                        <div>
                          <div className="text-sm font-medium">{p.label}</div>
                          <div className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>{p.desc}</div>
                        </div>
                        <span className="text-sm font-mono shrink-0 ml-4" style={{ color: SG.red }}>{p.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </LiquidGlassCard>

              <LiquidGlassCard>
                <div className="p-8">
                  <h3 className="text-xl font-semibold mb-4" style={{ color: SG.masTeal }}>With UNITS</h3>
                  <div className="space-y-4">
                    {[
                      { label: "Settlement Cycle", value: "T+0 (< 2 sec)", desc: "Atomic settlement, capital freed instantly" },
                      { label: "Pre-funding", value: "Not required", desc: "Atomic DvP ensures simultaneous exchange" },
                      { label: "Counterparty Risk", value: "Zero", desc: "Both legs settle or neither does" },
                      { label: "Dividend Processing", value: "Instant", desc: "Token Program distributes at record date" },
                      { label: "Cross-Depository", value: "Unified layer", desc: "CDP and MEPS+ bridged through UNITS" },
                    ].map((p, i) => (
                      <div key={i} className="flex justify-between items-start py-3" style={{ borderBottom: `1px solid ${SG.border}` }}>
                        <div>
                          <div className="text-sm font-medium">{p.label}</div>
                          <div className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>{p.desc}</div>
                        </div>
                        <span className="text-sm font-mono shrink-0 ml-4" style={{ color: SG.masTeal }}>{p.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </LiquidGlassCard>
            </div>
          </div>
        </section>
      </RevealSection>

      {/* ── Settlement Timeline Visual ── */}
      <RevealSection>
        <section className="py-24 px-6" style={{ background: SG.card }}>
          <div className="max-w-6xl mx-auto">
            <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: SG.finternetAmber }}>Settlement Comparison</p>
            <h2 className="text-3xl md:text-4xl font-extralight mb-4">
              From T+2 to <span className="font-semibold" style={{ color: SG.masTeal }}>T+0</span>
            </h2>
            <p className="text-base font-light mb-10" style={{ color: "rgba(255,255,255,0.6)" }}>
              UNITS compresses the entire settlement lifecycle into a single atomic transaction.
            </p>
            <div className="rounded-2xl overflow-hidden border" style={{ borderColor: SG.border }}>
              <img src={SETTLEMENT_FLOW_IMG} alt="Settlement timeline: T+2 today vs T+0 with UNITS" className="w-full h-auto" />
            </div>
          </div>
        </section>
      </RevealSection>

      {/* ── Settlement Models ── */}
      <RevealSection>
        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: SG.masTeal }}>Flexible Settlement</p>
            <h2 className="text-3xl md:text-4xl font-extralight mb-10">
              Three settlement <span className="font-semibold" style={{ color: SG.finternetCyan }}>models</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {SETTLEMENT_MODELS.map((m, i) => (
                <LiquidGlassCard key={i}>
                  <div className="p-8 h-full flex flex-col">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: `${SG.masTeal}20` }}>
                      {i === 0 ? <Zap className="w-6 h-6" style={{ color: SG.masTeal }} /> :
                       i === 1 ? <Clock className="w-6 h-6" style={{ color: SG.finternetAmber }} /> :
                       <BarChart3 className="w-6 h-6" style={{ color: SG.finternetCyan }} />}
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{m.model}</h3>
                    <p className="text-sm font-light mb-4 flex-1" style={{ color: "rgba(255,255,255,0.6)" }}>{m.desc}</p>
                    <div className="pt-4" style={{ borderTop: `1px solid ${SG.border}` }}>
                      <div className="flex justify-between text-xs mb-2">
                        <span style={{ color: "rgba(255,255,255,0.4)" }}>Use case</span>
                        <span style={{ color: SG.finternetAmber }}>{m.useCase}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span style={{ color: "rgba(255,255,255,0.4)" }}>Latency</span>
                        <span className="font-mono" style={{ color: SG.masTeal }}>{m.latency}</span>
                      </div>
                    </div>
                  </div>
                </LiquidGlassCard>
              ))}
            </div>
          </div>
        </section>
      </RevealSection>

      {/* ── STI Component Grid ── */}
      <RevealSection>
        <section className="py-24 px-6" style={{ background: SG.card }}>
          <div className="max-w-6xl mx-auto">
            <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: SG.nusOrange }}>Market Coverage</p>
            <h2 className="text-3xl md:text-4xl font-extralight mb-4">
              STI <span className="font-semibold" style={{ color: SG.finternetAmber }}>30</span> as proxy tokets
            </h2>
            <p className="text-base font-light mb-10" style={{ color: "rgba(255,255,255,0.6)" }}>
              All 30 Straits Times Index components are eligible for proxy tokenisation, covering approximately
              70% of SGX market capitalisation. Each proxy toket carries the full ISIN, corporate action
              entitlements, and dividend rights of the underlying CDP holding.
            </p>

            <div className="rounded-2xl overflow-hidden border" style={{ borderColor: SG.border, background: SG.surface }}>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ borderBottom: `2px solid ${SG.border}` }}>
                      <th className="text-left px-6 py-4 font-medium text-xs tracking-wider uppercase" style={{ color: "rgba(255,255,255,0.4)" }}>Ticker</th>
                      <th className="text-left px-6 py-4 font-medium text-xs tracking-wider uppercase" style={{ color: "rgba(255,255,255,0.4)" }}>Company</th>
                      <th className="text-left px-6 py-4 font-medium text-xs tracking-wider uppercase" style={{ color: "rgba(255,255,255,0.4)" }}>Sector</th>
                      <th className="text-right px-6 py-4 font-medium text-xs tracking-wider uppercase" style={{ color: "rgba(255,255,255,0.4)" }}>STI Weight</th>
                      <th className="text-center px-6 py-4 font-medium text-xs tracking-wider uppercase" style={{ color: "rgba(255,255,255,0.4)" }}>Proxy Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {STI_COMPONENTS.map((s, i) => (
                      <tr key={i} className="transition-colors hover:bg-white/5" style={{ borderBottom: `1px solid ${SG.border}` }}>
                        <td className="px-6 py-3 font-mono font-semibold" style={{ color: SG.finternetAmber }}>{s.ticker}</td>
                        <td className="px-6 py-3">{s.name}</td>
                        <td className="px-6 py-3" style={{ color: "rgba(255,255,255,0.6)" }}>{s.sector}</td>
                        <td className="px-6 py-3 text-right font-mono">{s.weight}</td>
                        <td className="px-6 py-3 text-center">
                          <span className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full" style={{ background: `${SG.masTeal}20`, color: SG.masTeal }}>
                            <Shield className="w-3 h-3" /> Eligible
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-6 py-4 text-xs text-center" style={{ color: "rgba(255,255,255,0.3)", borderTop: `1px solid ${SG.border}` }}>
                Showing top 15 of 30 STI components. All 30 are eligible for proxy tokenisation via CDP Bridge.
              </div>
            </div>
          </div>
        </section>
      </RevealSection>

      {/* ── Cross-Depository Architecture ── */}
      <RevealSection>
        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: SG.finternetCyan }}>Architecture</p>
            <h2 className="text-3xl md:text-4xl font-extralight mb-4">
              Cross-depository <span className="font-semibold" style={{ color: SG.masTeal }}>atomic bridge</span>
            </h2>
            <p className="text-base font-light mb-10" style={{ color: "rgba(255,255,255,0.6)" }}>
              UNITS bridges CDP (securities) and MEPS+ (cash) into a single settlement layer. The atomic
              guarantee ensures that equity delivery and cash payment happen simultaneously, or not at all.
              No pre-funding, no counterparty risk, no reconciliation.
            </p>
            <div className="rounded-2xl overflow-hidden border" style={{ borderColor: SG.border }}>
              <img src={CROSS_DEPO_IMG} alt="Cross-depository atomic bridge: CDP and MEPS+ connected through UNITS" className="w-full h-auto" />
            </div>

            <div className="grid md:grid-cols-4 gap-6 mt-12">
              {[
                { icon: Building2, label: "CDP", desc: "Securities leg: equity proxy tokets locked and transferred", color: SG.nusOrange },
                { icon: Coins, label: "MEPS+", desc: "Cash leg: XSGD transferred via MAS real-time gross settlement", color: SG.masTeal },
                { icon: Shield, label: "Atomic DvP", desc: "Both legs execute in a single indivisible transaction", color: SG.finternetAmber },
                { icon: Eye, label: "MAS Observer", desc: "Real-time supervisory visibility into every settlement", color: SG.finternetCyan },
              ].map((n, i) => (
                <div key={i} className="text-center p-6 rounded-xl" style={{ background: SG.surface, border: `1px solid ${SG.border}` }}>
                  <n.icon className="w-8 h-8 mx-auto mb-3" style={{ color: n.color }} />
                  <div className="font-semibold mb-2">{n.label}</div>
                  <div className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>{n.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </RevealSection>

      {/* ── Real-Time Dividend Distribution ── */}
      <RevealSection>
        <section className="py-24 px-6" style={{ background: SG.card }}>
          <div className="max-w-6xl mx-auto">
            <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: SG.finternetAmber }}>Automated Corporate Actions</p>
            <h2 className="text-3xl md:text-4xl font-extralight mb-4">
              Real-time <span className="font-semibold" style={{ color: SG.finternetAmber }}>dividend distribution</span>
            </h2>
            <p className="text-base font-light mb-10" style={{ color: "rgba(255,255,255,0.6)" }}>
              Token Programs automate the entire corporate action lifecycle. When a company declares a dividend,
              the Token Program calculates per-toket entitlements, verifies holder eligibility, and distributes
              XSGD to every proxy toket holder atomically, replacing the current 5-10 day batch process.
            </p>
            <div className="rounded-2xl overflow-hidden border mb-12" style={{ borderColor: SG.border }}>
              <img src={DIVIDEND_FLOW_IMG} alt="Automated dividend distribution through Token Programs" className="w-full h-auto" />
            </div>

            {/* Corporate Actions Comparison Table */}
            <h3 className="text-xl font-light mb-6">Corporate action <span className="font-semibold">comparison</span></h3>
            <div className="rounded-2xl overflow-hidden border" style={{ borderColor: SG.border, background: SG.surface }}>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ borderBottom: `2px solid ${SG.border}` }}>
                      <th className="text-left px-6 py-4 font-medium text-xs tracking-wider uppercase" style={{ color: "rgba(255,255,255,0.4)" }}>Action</th>
                      <th className="text-left px-6 py-4 font-medium text-xs tracking-wider uppercase" style={{ color: "rgba(255,255,255,0.4)" }}>Today (CDP Batch)</th>
                      <th className="text-left px-6 py-4 font-medium text-xs tracking-wider uppercase" style={{ color: "rgba(255,255,255,0.4)" }}>UNITS (Token Program)</th>
                      <th className="text-right px-6 py-4 font-medium text-xs tracking-wider uppercase" style={{ color: "rgba(255,255,255,0.4)" }}>Time Saved</th>
                    </tr>
                  </thead>
                  <tbody>
                    {CORPORATE_ACTIONS.map((ca, i) => (
                      <tr key={i} className="transition-colors hover:bg-white/5" style={{ borderBottom: `1px solid ${SG.border}` }}>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <ca.icon className="w-5 h-5 shrink-0" style={{ color: SG.finternetAmber }} />
                            <span className="font-medium">{ca.type}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{ca.today}</td>
                        <td className="px-6 py-4 text-xs leading-relaxed" style={{ color: SG.masTeal }}>{ca.units}</td>
                        <td className="px-6 py-4 text-right font-mono font-semibold" style={{ color: SG.finternetAmber }}>{ca.saving}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </RevealSection>

      {/* ── Proxy Toket Architecture ── */}
      <RevealSection>
        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: SG.masTeal }}>Token Architecture</p>
            <h2 className="text-3xl md:text-4xl font-extralight mb-10">
              Equity proxy <span className="font-semibold" style={{ color: SG.finternetCyan }}>toket anatomy</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <LiquidGlassCard>
                <div className="p-8">
                  <h3 className="text-lg font-semibold mb-6" style={{ color: SG.finternetAmber }}>Metadata Layer</h3>
                  <div className="space-y-3">
                    {[
                      { field: "tokenClass", value: "TC-SG-EQUITY-SGX" },
                      { field: "isin", value: "SG1L01001701" },
                      { field: "ticker", value: "D05 (DBS Group)" },
                      { field: "depository", value: "CDP" },
                      { field: "currency", value: "SGD" },
                      { field: "fractionalUnit", value: "0.001 shares" },
                      { field: "dividendEligible", value: "true" },
                      { field: "votingRights", value: "pass-through" },
                      { field: "corporateActionProgram", value: "TP-CDP-CA-001" },
                    ].map((m, i) => (
                      <div key={i} className="flex justify-between py-2 text-sm" style={{ borderBottom: `1px solid ${SG.border}` }}>
                        <span className="font-mono text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>{m.field}</span>
                        <span className="font-mono text-xs" style={{ color: SG.masTeal }}>{m.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </LiquidGlassCard>

              <LiquidGlassCard>
                <div className="p-8">
                  <h3 className="text-lg font-semibold mb-6" style={{ color: SG.finternetCyan }}>Programmability Layer</h3>
                  <div className="space-y-5">
                    {[
                      { hook: "Pre-Transfer", desc: "Verify buyer eligibility, check foreign ownership limits, validate lot size", color: SG.nusOrange },
                      { hook: "State Transition", desc: "Atomic DvP: equity toket moves to buyer, XSGD moves to seller simultaneously", color: SG.masTeal },
                      { hook: "Post-Transfer", desc: "Update CDP shadow record, emit MAS observer event, recalculate portfolio weights", color: SG.finternetCyan },
                      { hook: "Corporate Action", desc: "Dividend distribution, rights subscription, stock split, bonus issue, scrip election", color: SG.finternetAmber },
                      { hook: "Compliance", desc: "Real-time short-selling detection, insider trading window enforcement, position limits", color: SG.red },
                    ].map((h, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="w-1 rounded-full shrink-0" style={{ background: h.color }} />
                        <div>
                          <div className="text-sm font-semibold" style={{ color: h.color }}>{h.hook}</div>
                          <div className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>{h.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </LiquidGlassCard>
            </div>
          </div>
        </section>
      </RevealSection>

      {/* ── Singapore Use Cases ── */}
      <RevealSection>
        <section className="py-24 px-6" style={{ background: SG.card }}>
          <div className="max-w-6xl mx-auto">
            <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: SG.nusOrange }}>Singapore Use Cases</p>
            <h2 className="text-3xl md:text-4xl font-extralight mb-10">
              Unlocking <span className="font-semibold" style={{ color: SG.finternetAmber }}>new capabilities</span>
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "REIT Fractionalisation",
                  desc: "Singapore's 40+ listed REITs can be fractionalized to any denomination. A retail investor can hold SGD 50 worth of CapitaLand Ascendas REIT, receiving proportional distributions automatically via Token Programs.",
                  icon: Building2, color: SG.masTeal,
                },
                {
                  title: "Equity-Backed Collateral",
                  desc: "Blue-chip equity proxy tokets can be used as collateral for SGX-DC derivatives margin, repo transactions, or structured note issuance, without moving them out of the investor's portfolio.",
                  icon: Shield, color: SG.finternetAmber,
                },
                {
                  title: "P-Toket Composition",
                  desc: "Equity proxy tokets can be composed into P-Tokets (portfolio tokets) alongside bonds, gold, and stablecoins. A single P-Toket can represent a balanced portfolio that rebalances automatically.",
                  icon: Network, color: SG.finternetCyan,
                },
                {
                  title: "Cross-Border Access",
                  desc: "International investors can access SGX equities through unsponsored tokets on their home UNITS instance, settling in their local currency while the cross-ledger adapter handles FX conversion.",
                  icon: ArrowRightLeft, color: SG.nusOrange,
                },
                {
                  title: "Instant IPO Settlement",
                  desc: "New listings can settle on T+0 instead of the current T+4 IPO settlement cycle. Allocation, payment, and share delivery happen atomically, reducing the capital lockup period for investors.",
                  icon: TrendingUp, color: SG.masTeal,
                },
                {
                  title: "Algorithmic Market Making",
                  desc: "Market makers can deploy Token Programs that automatically provide liquidity, manage inventory, and hedge positions across equity and derivatives markets on the UNITS Network.",
                  icon: BarChart3, color: SG.finternetAmber,
                },
              ].map((uc, i) => (
                <LiquidGlassCard key={i}>
                  <div className="p-6 h-full">
                    <uc.icon className="w-8 h-8 mb-4" style={{ color: uc.color }} />
                    <h3 className="text-lg font-semibold mb-3">{uc.title}</h3>
                    <p className="text-sm font-light leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>{uc.desc}</p>
                  </div>
                </LiquidGlassCard>
              ))}
            </div>
          </div>
        </section>
      </RevealSection>

      {/* ── MAS Supervisory View ── */}
      <RevealSection>
        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: SG.masTeal }}>Regulatory Integration</p>
            <h2 className="text-3xl md:text-4xl font-extralight mb-10">
              MAS <span className="font-semibold" style={{ color: SG.masTeal }}>supervisory view</span>
            </h2>

            <LiquidGlassCard>
              <div className="p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-12">
                  <div>
                    <Eye className="w-10 h-10 mb-6" style={{ color: SG.masTeal }} />
                    <h3 className="text-xl font-semibold mb-4">Real-Time Market Surveillance</h3>
                    <p className="text-sm font-light leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
                      The MAS observer node receives a real-time event stream of every equity settlement,
                      corporate action distribution, and collateral movement on the UNITS Network. This replaces
                      the current T+1 trade reporting regime with continuous, granular visibility.
                    </p>
                    <div className="space-y-3">
                      {[
                        "Real-time settlement monitoring across CDP and MEPS+",
                        "Automated short-selling detection and position limit enforcement",
                        "Insider trading window compliance verification",
                        "Foreign ownership limit tracking per counter",
                        "Systemic risk dashboards with live exposure data",
                      ].map((item, i) => (
                        <div key={i} className="flex items-start gap-3 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                          <Shield className="w-4 h-4 mt-0.5 shrink-0" style={{ color: SG.masTeal }} />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="rounded-xl p-6" style={{ background: SG.dark, border: `1px solid ${SG.border}` }}>
                      <div className="text-xs tracking-wider uppercase mb-4" style={{ color: "rgba(255,255,255,0.3)" }}>MAS Observer Event Stream</div>
                      <div className="space-y-2 font-mono text-xs">
                        {[
                          { time: "09:00:01.234", event: "SETTLEMENT", detail: "D05 x 10,000 | DBS → OCBC | SGD 415,000" },
                          { time: "09:00:01.235", event: "DvP_ATOMIC", detail: "Securities + Cash confirmed | Hash: 0x7f3a..." },
                          { time: "09:00:01.236", event: "MAS_ACK", detail: "Observer receipt confirmed | Seq: 847291" },
                          { time: "09:15:00.001", event: "DIVIDEND", detail: "D05 interim | SGD 0.54/share | 847 holders" },
                          { time: "09:15:00.002", event: "DISTRIBUTION", detail: "XSGD 457,380 distributed | All holders credited" },
                          { time: "09:30:12.891", event: "COLLATERAL", detail: "C38U x 50,000 encumbered | SGX-DC margin" },
                          { time: "09:30:12.892", event: "POSITION", detail: "Foreign ownership D05: 28.4% (limit: 30%)" },
                        ].map((e, i) => (
                          <div key={i} className="flex gap-3 py-1" style={{ borderBottom: `1px solid ${SG.border}` }}>
                            <span style={{ color: "rgba(255,255,255,0.3)" }}>{e.time}</span>
                            <span className="shrink-0 w-24" style={{ color: e.event.includes("MAS") ? SG.masTeal : SG.finternetAmber }}>{e.event}</span>
                            <span style={{ color: "rgba(255,255,255,0.5)" }}>{e.detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </LiquidGlassCard>
          </div>
        </section>
      </RevealSection>

      {/* ── Knowledge Base ── */}
      <section className="py-20 px-6" style={{ borderTop: `1px solid ${SG.border}` }}>
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <BookOpen className="w-5 h-5" style={{ color: SG.finternetAmber }} />
            <h2 className="text-xl font-light">Knowledge Base</h2>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { label: "DvP Settlement", href: "/sg/deep-dive/dvp-settlement" },
              { label: "CDP Bridge Workflow", href: "/sg/workflows/cdp-bridge" },
              { label: "Tokenisation", href: "/sg/deep-dive/tokenisation" },
              { label: "Token Programs", href: "/sg/deep-dive/token-programs" },
              { label: "P-Tokets", href: "/sg/deep-dive/p-tokets" },
              { label: "Collateral Highway", href: "/sg/deep-dive/collateral-highway" },
              { label: "Participants Ecosystem", href: "/sg/deep-dive/participants" },
              { label: "Structured Notes", href: "/sg/deep-dive/structured-notes" },
              { label: "Regulatory Framework", href: "/sg/deep-dive/regulatory" },
            ].map((link, i) => (
              <Link key={i} href={link.href} className="flex items-center justify-between px-4 py-3 rounded-lg text-sm transition-colors hover:bg-white/5" style={{ border: `1px solid ${SG.border}` }}>
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4" style={{ color: SG.finternetAmber }} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-12 px-6 text-center" style={{ borderTop: `1px solid ${SG.border}` }}>
        <img src={SG_LOGO} alt="UNITS|SG" className="h-10 w-auto mx-auto mb-2 opacity-25" />
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>Powered by</span>
          <img src={FINTERNET_LOGO} alt="Finternet" className="h-4 w-auto opacity-30" />
        </div>
        <p className="text-xs" style={{ color: "rgba(255,255,255,0.15)" }}>Restricted</p>
      </footer>
    </div>
  );
}
