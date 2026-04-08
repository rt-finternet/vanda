import { useRef, useState, useEffect } from "react";
import { Link } from "wouter";
import SGPortalNav, { SG } from "@/components/SGPortalNav";
import { CinematicBackground } from "@/components/motion";
import {
  Network, ArrowRight, Layers, CheckCircle2, Lock,
  Coins, Building2, Landmark, Globe, Shield,
  BarChart3, Gem, Zap, RefreshCw, Users,
  ArrowRightLeft, TrendingUp, PieChart, GitBranch,
  Wallet, Eye, FileText, Calculator, Timer,
  Briefcase, Target, Boxes
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
const exampleComposition = [
  { asset: "SGS 10Y Bond", weight: 30, source: "MEPS+", accent: SG.masTeal, icon: Landmark },
  { asset: "DBS Group Holdings", weight: 20, source: "CDP", accent: SG.red, icon: Building2 },
  { asset: "Gold (LBMA/SBMA)", weight: 15, source: "Vault", accent: SG.finternetAmber, icon: Gem },
  { asset: "VCC Fund (Asia Credit)", weight: 15, source: "VCC", accent: SG.masTeal, icon: Briefcase },
  { asset: "US Treasury 5Y (Unsponsored)", weight: 10, source: "DTCC", accent: SG.finternetCyan, icon: Globe },
  { asset: "SCS SGD Stablecoin", weight: 10, source: "SCS", accent: SG.nusOrange, icon: Coins },
];

export default function SGDeepDivePTokets() {
  return (
    <div className="vanda-portal min-h-screen text-white" style={{ background: SG.dark }}>
      <SGPortalNav />

      {/* Hero */}
      <section className="relative px-6 pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${SG.dark}, #0D1F3A 50%, #122B4A)` }} />
        <CinematicBackground variant="mixed" intensity={0.06} />
        <div className="relative max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <Network className="w-5 h-5" style={{ color: SG.nusOrange }} />
            <span className="text-xs font-medium tracking-[0.2em] uppercase" style={{ color: SG.nusOrange }}>Deep Dive</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-light mb-4">
            <span className="font-semibold">P-Tokets</span>
            <span className="text-lg ml-3" style={{ color: "rgba(255,255,255,0.4)" }}>Portfolio Tokets</span>
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
            A P-Toket is a first-class tokenised asset that represents a portfolio of underlying tokets.
            It is not a wrapper, not a fund, not an index. It is a composable, programmable, tradeable
            asset that collapses the entire portfolio management stack into a single on-ledger object.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-6 pb-24 space-y-20">

        {/* Why P-Tokets Matter */}
        <RevealSection>
          <section>
            <h2 className="text-2xl font-light mb-6">Why <span className="font-semibold">P-Tokets</span> matter</h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
              Today, a diversified portfolio exists as disconnected entries across multiple systems.
              Your equities sit in CDP, your bonds in MEPS+, your gold in a vault, your fund interests
              in a transfer agent's books. Rebalancing means placing separate orders across separate
              systems, settling over different timelines, and reconciling across different record-keepers.
              There is no single object that represents "my portfolio" as a programmable, transferable unit.
            </p>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
              P-Tokets change this. Because all nine asset classes on the UNITS|SG network share the
              same tokenClass standard, they can be composed into a single P-Toket that carries its own
              Token Programs for rebalancing, compliance, and lifecycle management. The P-Toket is itself
              a tokenClass, which means it can be traded, pledged as collateral, nested inside other P-Tokets,
              and governed by its own pre-hooks and post-hooks.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  label: "Today",
                  color: "rgba(255,255,255,0.15)",
                  items: [
                    "Assets scattered across CDP, MEPS+, custodians",
                    "Manual rebalancing via multiple brokers",
                    "Days to settle cross-asset trades",
                    "Cannot pledge a portfolio as single unit",
                  ],
                },
                {
                  label: "ETF / Fund",
                  color: "rgba(255,255,255,0.15)",
                  items: [
                    "Fixed composition set by fund manager",
                    "Monthly dealing dates, T+3 settlement",
                    "Management fees 0.5% to 2%+",
                    "No customisation per investor",
                  ],
                },
                {
                  label: "P-Toket",
                  color: SG.nusOrange,
                  items: [
                    "Custom composition per investor",
                    "Automated rebalancing via Token Programs",
                    "Atomic multi-leg settlement in minutes",
                    "Pledge entire P-Toket as single collateral",
                  ],
                },
              ].map((col, i) => (
                <div key={i} className="rounded-xl overflow-hidden" style={{ border: `1px solid ${col.color}20` }}>
                  <div className="px-4 py-2.5 text-xs font-semibold" style={{ background: `${col.color}10`, color: col.color === SG.nusOrange ? SG.nusOrange : "rgba(255,255,255,0.5)" }}>
                    {col.label}
                  </div>
                  <div className="p-4 space-y-2">
                    {col.items.map((item, j) => (
                      <div key={j} className="flex items-start gap-2">
                        <div className="w-1 h-1 rounded-full mt-1.5 shrink-0" style={{ background: col.color === SG.nusOrange ? SG.nusOrange : "rgba(255,255,255,0.2)" }} />
                        <span className="text-[11px] leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </RevealSection>

        {/* Anatomy of a P-Toket */}
        <RevealSection delay={100}>
          <section>
            <h2 className="text-2xl font-light mb-6">Anatomy of a <span className="font-semibold">P-Toket</span></h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
              A P-Toket is a tokenClass like any other on the UNITS Network. It has a Token Manager,
              Token Programs, dependency pointers, and a tokenPool. What makes it special is that its
              underlying value is derived from other tokets rather than from a single external asset.
            </p>

            <div className="rounded-2xl overflow-hidden" style={{ background: SG.card, border: `1px solid ${SG.border}` }}>
              <div className="p-5 space-y-4">
                {[
                  {
                    layer: "Token Manager",
                    icon: Building2,
                    color: SG.finternetCyan,
                    desc: "The entity that creates and governs the P-Toket. This could be a wealth manager (DBS Private Bank, UOB Privilege Banking), a robo-advisor, or the investor themselves. The Token Manager defines the target allocation, rebalancing rules, and compliance requirements.",
                  },
                  {
                    layer: "Composition Definition",
                    icon: PieChart,
                    color: SG.nusOrange,
                    desc: "The target allocation expressed as a set of tokenClass references and weight percentages. The composition is stored on-ledger as part of the P-Toket's tokenClass configuration. It can be static (fixed weights) or dynamic (rules-based, e.g., 60/40 equity-bond with quarterly rebalancing).",
                  },
                  {
                    layer: "Underlying Tokets",
                    icon: Layers,
                    color: SG.masTeal,
                    desc: "The actual tokets held in the P-Toket's tokenPool. These are real assets: SGS bonds, CDP equities, gold tokets, VCC interests, stablecoins. They are not synthetic exposures. The P-Toket owns them, and the ownership is recorded on-ledger.",
                  },
                  {
                    layer: "Token Programs",
                    icon: Zap,
                    color: SG.red,
                    desc: "The executable code that governs the P-Toket's lifecycle: drift detection, rebalancing execution, NAV calculation, compliance checks, distribution. These compose with the Token Programs of the underlying tokets, creating a layered execution model.",
                  },
                  {
                    layer: "Dependency Pointers",
                    icon: GitBranch,
                    color: SG.finternetAmber,
                    desc: "References to credentials and conditions that must be satisfied for the P-Toket to be transferable. If the P-Toket contains accredited-investor-only securities, the P-Toket itself inherits that restriction. Compliance composes upward.",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-5 rounded-xl" style={{ background: `${item.color}04`, border: `1px solid ${item.color}10` }}>
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${item.color}12` }}>
                      <item.icon className="w-4 h-4" style={{ color: item.color }} />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white/90 mb-2">{item.layer}</div>
                      <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </RevealSection>

        {/* Example Composition */}
        <RevealSection delay={100}>
          <section>
            <h2 className="text-2xl font-light mb-6">Example <span className="font-semibold">composition</span></h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
              A Singapore-based institutional investor constructs a balanced P-Toket spanning six asset
              classes. Every component is a real toket on the UNITS|SG network, held in the P-Toket's
              tokenPool, governed by the P-Toket's Token Programs.
            </p>

            <div className="rounded-2xl overflow-hidden" style={{ background: SG.card, border: `1px solid ${SG.border}` }}>
              {/* Visual bar chart */}
              <div className="p-5">
                <div className="flex gap-1 h-6 rounded-lg overflow-hidden mb-5">
                  {exampleComposition.map((item, i) => (
                    <div
                      key={i}
                      className="relative group cursor-default"
                      style={{ width: `${item.weight}%`, background: item.accent, opacity: 0.8 }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-[9px] font-bold text-white/90">{item.weight}%</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  {exampleComposition.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 rounded-lg" style={{ background: "rgba(255,255,255,0.02)" }}>
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${item.accent}12` }}>
                        <item.icon className="w-4 h-4" style={{ color: item.accent }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-medium text-white/80">{item.asset}</div>
                        <div className="text-[10px]" style={{ color: "rgba(255,255,255,0.35)" }}>Source: {item.source}</div>
                      </div>
                      <div className="text-sm font-bold tabular-nums" style={{ color: item.accent }}>{item.weight}%</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="px-5 py-4" style={{ background: `${SG.nusOrange}06`, borderTop: `1px solid ${SG.border}` }}>
                <div className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                  This P-Toket can be traded as a single unit, pledged as collateral for a repo transaction,
                  or nested inside a larger P-Toket. When the 10Y SGS bond pays a coupon, the MEPS+ Token
                  Program distributes it into the P-Toket's stablecoin allocation. When DBS declares a dividend,
                  the CDP Token Program routes it the same way. The investor sees a single asset with
                  automated lifecycle management across six underlying systems.
                </div>
              </div>
            </div>
          </section>
        </RevealSection>

        {/* Lifecycle Operations */}
        <RevealSection delay={100}>
          <section>
            <h2 className="text-2xl font-light mb-6">Lifecycle <span className="font-semibold">operations</span></h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
              Every P-Toket lifecycle event is governed by Token Programs. The P-Toket's own programs
              coordinate with the underlying tokets' programs to create a seamless, automated experience.
            </p>

            <div className="space-y-4">
              {[
                {
                  event: "Creation",
                  icon: Boxes,
                  color: SG.finternetCyan,
                  desc: "The Token Manager defines the composition and registers the P-Toket as a new tokenClass. The investor deposits the underlying tokets (or SCS stablecoin for automatic acquisition). The P-Toket Token Program validates that all components meet the target allocation within tolerance, then mints the P-Toket.",
                  detail: "Pre-hook: Verify all underlying tokets are valid tokenClasses, check investor credentials. Post-hook: Mint P-Toket, record composition snapshot.",
                },
                {
                  event: "Drift Detection",
                  icon: Target,
                  color: SG.finternetAmber,
                  desc: "Market movements cause the actual weights to diverge from target weights. The Token Program continuously monitors drift. When any component exceeds the defined threshold (e.g., 5% relative drift), the program flags the P-Toket for rebalancing.",
                  detail: "Pre-hook: Calculate current weights from live valuations. Post-hook: Queue rebalancing instruction if drift exceeds threshold.",
                },
                {
                  event: "Rebalancing",
                  icon: RefreshCw,
                  color: SG.nusOrange,
                  desc: "The rebalancing Token Program calculates the required trades: sell overweight components, buy underweight components. All legs execute atomically. There is no partial rebalancing, no settlement risk between legs, no timing mismatch.",
                  detail: "Pre-hook: Verify liquidity across all asset classes, calculate optimal trade sizes. Post-hook: Execute atomic multi-leg trades, update composition snapshot.",
                },
                {
                  event: "Income Distribution",
                  icon: Coins,
                  color: SG.masTeal,
                  desc: "When underlying tokets generate income (bond coupons, equity dividends, VCC distributions, gold lending fees), the income flows into the P-Toket's stablecoin allocation. The Token Program can either accumulate for reinvestment or distribute to the P-Toket holder.",
                  detail: "Pre-hook: Identify income source and amount. Post-hook: Route to stablecoin allocation or distribute to holder per configuration.",
                },
                {
                  event: "Collateral Pledge",
                  icon: Lock,
                  color: SG.red,
                  desc: "The entire P-Toket can be pledged as collateral for a repo, margin, or lending transaction. The lending institution sees a single collateral object with a transparent composition. Mark-to-market uses the live valuations of all underlying components.",
                  detail: "Pre-hook: Verify no existing encumbrance, calculate collateral value with haircuts per component. Post-hook: Lock P-Toket, issue encumbrance record.",
                },
                {
                  event: "Redemption",
                  icon: ArrowRightLeft,
                  color: SG.finternetCyan,
                  desc: "The investor redeems the P-Toket. The Token Program unwinds the composition: each underlying toket is transferred back to the investor's wallet, or sold for SCS stablecoin if the investor prefers cash. The P-Toket is burned.",
                  detail: "Pre-hook: Verify no encumbrances, check lock-up period. Post-hook: Transfer underlying tokets to investor, burn P-Toket.",
                },
              ].map((item, i) => (
                <div key={i} className="rounded-xl overflow-hidden" style={{ border: `1px solid ${item.color}12` }}>
                  <div className="px-5 py-3 flex items-center gap-3" style={{ background: `${item.color}08` }}>
                    <item.icon className="w-4 h-4" style={{ color: item.color }} />
                    <span className="text-sm font-semibold text-white/90">{item.event}</span>
                  </div>
                  <div className="p-5" style={{ background: `${item.color}03` }}>
                    <p className="text-xs leading-relaxed mb-3" style={{ color: "rgba(255,255,255,0.5)" }}>{item.desc}</p>
                    <div className="text-[10px] p-2.5 rounded-lg" style={{ background: "rgba(255,255,255,0.02)", color: "rgba(255,255,255,0.35)" }}>
                      {item.detail}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </RevealSection>

        {/* Nesting */}
        <RevealSection delay={100}>
          <section>
            <h2 className="text-2xl font-light mb-6">P-Toket <span className="font-semibold">nesting</span></h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
              Because a P-Toket is itself a tokenClass, it can be included as a component in another P-Toket.
              This enables institutional-grade portfolio construction where a top-level allocation contains
              sub-portfolios, each with their own rebalancing rules and compliance requirements.
            </p>

            <div className="rounded-2xl p-5" style={{ background: SG.card, border: `1px solid ${SG.border}` }}>
              <div className="text-xs uppercase tracking-wider mb-4" style={{ color: SG.nusOrange }}>
                Nested P-Toket Example
              </div>

              {/* Top level */}
              <div className="rounded-xl p-4 mb-3" style={{ background: `${SG.nusOrange}06`, border: `1px solid ${SG.nusOrange}15` }}>
                <div className="flex items-center gap-3 mb-4">
                  <Network className="w-4 h-4" style={{ color: SG.nusOrange }} />
                  <span className="text-sm font-semibold text-white/90">Master P-Toket: Balanced Growth</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {/* Sub P-Toket 1 */}
                  <div className="rounded-lg p-3" style={{ background: `${SG.masTeal}08`, border: `1px solid ${SG.masTeal}12` }}>
                    <div className="flex items-center gap-2 mb-2">
                      <Landmark className="w-3.5 h-3.5" style={{ color: SG.masTeal }} />
                      <span className="text-xs font-medium text-white/80">Fixed Income P-Toket</span>
                    </div>
                    <div className="text-[10px] font-bold mb-2" style={{ color: SG.masTeal }}>40% allocation</div>
                    <div className="space-y-1">
                      {["SGS 10Y (50%)", "MAS Bills (30%)", "Corp Bonds (20%)"].map((item, i) => (
                        <div key={i} className="text-[10px]" style={{ color: "rgba(255,255,255,0.35)" }}>{item}</div>
                      ))}
                    </div>
                  </div>

                  {/* Sub P-Toket 2 */}
                  <div className="rounded-lg p-3" style={{ background: `${SG.red}08`, border: `1px solid ${SG.red}12` }}>
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-3.5 h-3.5" style={{ color: SG.red }} />
                      <span className="text-xs font-medium text-white/80">Equity P-Toket</span>
                    </div>
                    <div className="text-[10px] font-bold mb-2" style={{ color: SG.red }}>35% allocation</div>
                    <div className="space-y-1">
                      {["STI Blue Chips (60%)", "US Tech (Unsponsored) (25%)", "ASEAN ETF (15%)"].map((item, i) => (
                        <div key={i} className="text-[10px]" style={{ color: "rgba(255,255,255,0.35)" }}>{item}</div>
                      ))}
                    </div>
                  </div>

                  {/* Sub P-Toket 3 */}
                  <div className="rounded-lg p-3" style={{ background: `${SG.finternetAmber}08`, border: `1px solid ${SG.finternetAmber}12` }}>
                    <div className="flex items-center gap-2 mb-2">
                      <Gem className="w-3.5 h-3.5" style={{ color: SG.finternetAmber }} />
                      <span className="text-xs font-medium text-white/80">Alternatives P-Toket</span>
                    </div>
                    <div className="text-[10px] font-bold mb-2" style={{ color: SG.finternetAmber }}>25% allocation</div>
                    <div className="space-y-1">
                      {["Gold (SBMA) (40%)", "VCC Asia Credit (35%)", "SCS Stablecoin (25%)"].map((item, i) => (
                        <div key={i} className="text-[10px]" style={{ color: "rgba(255,255,255,0.35)" }}>{item}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>
                Each sub-P-Toket has its own rebalancing rules. The Fixed Income P-Toket rebalances monthly
                to maintain duration targets. The Equity P-Toket rebalances when drift exceeds 5%.
                The Alternatives P-Toket rebalances quarterly. The Master P-Toket rebalances across the
                three sub-portfolios semi-annually. All rebalancing is atomic and automated.
              </div>
            </div>
          </section>
        </RevealSection>

        {/* Compliance Composition */}
        <RevealSection delay={100}>
          <section>
            <h2 className="text-2xl font-light mb-6">Compliance <span className="font-semibold">composition</span></h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
              When a P-Toket contains components with different compliance requirements, the P-Toket
              inherits the union of all restrictions. Compliance composes upward, never downward.
              This is enforced by the UNITS protocol, not by convention.
            </p>

            <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${SG.border}` }}>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr style={{ background: SG.card }}>
                      <th className="text-left p-3 font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>Component</th>
                      <th className="text-left p-3 font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>Restriction</th>
                      <th className="text-left p-3 font-medium" style={{ color: SG.nusOrange }}>P-Toket Inherits</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { component: "SGS Bond", restriction: "KYC verified", inherits: "KYC required for P-Toket holder" },
                      { component: "VCC Fund", restriction: "Accredited Investor", inherits: "AI credential required for P-Toket holder" },
                      { component: "US Treasury (Unsponsored)", restriction: "FATCA compliant", inherits: "FATCA attestation required" },
                      { component: "Gold", restriction: "IPM GST exempt", inherits: "IPM status verified for gold component" },
                      { component: "Corporate Bond", restriction: "Qualified Institutional Buyer", inherits: "QIB status required if present" },
                    ].map((row, i) => (
                      <tr key={i} style={{ borderTop: `1px solid ${SG.border}` }}>
                        <td className="p-3 font-medium text-white/70">{row.component}</td>
                        <td className="p-3" style={{ color: "rgba(255,255,255,0.4)" }}>{row.restriction}</td>
                        <td className="p-3 font-medium" style={{ color: SG.nusOrange }}>{row.inherits}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-5 py-3" style={{ background: `${SG.red}06`, borderTop: `1px solid ${SG.border}` }}>
                <div className="flex items-start gap-2">
                  <Shield className="w-4 h-4 mt-0.5 shrink-0" style={{ color: SG.red }} />
                  <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.5)" }}>
                    If any component requires Accredited Investor status, the entire P-Toket requires it.
                    A retail investor cannot bypass AI restrictions by holding the P-Toket instead of the
                    underlying VCC interest directly. The pre-hook validates all inherited restrictions at transfer time.
                  </span>
                </div>
              </div>
            </div>
          </section>
        </RevealSection>

        {/* Use Cases */}
        <RevealSection delay={100}>
          <section>
            <h2 className="text-2xl font-light mb-6">Singapore <span className="font-semibold">use cases</span></h2>

            <div className="space-y-4">
              {[
                {
                  title: "Wealth Management",
                  subtitle: "DBS Private Bank, UOB Privilege Banking",
                  icon: Wallet,
                  color: SG.finternetCyan,
                  desc: "A relationship manager constructs a bespoke P-Toket for a high-net-worth client: 40% SGS bonds, 25% STI blue chips, 15% gold, 10% VCC hedge fund, 10% SCS stablecoin. The client sees a single asset in their portfolio. Rebalancing, income collection, and compliance are all automated. The RM can adjust the composition with a single instruction.",
                },
                {
                  title: "Institutional Collateral",
                  subtitle: "SGX-DC, MAS repo operations",
                  icon: Lock,
                  color: SG.red,
                  desc: "An institutional participant pledges a P-Toket as collateral for SGX-DC margin. The clearing house sees a diversified collateral basket with transparent composition. Mark-to-market is continuous, using live valuations of all components. If one component drops in value, the P-Toket's margin Token Program can auto-substitute from a pre-approved pool.",
                },
                {
                  title: "Robo-Advisory",
                  subtitle: "Automated portfolio management at scale",
                  icon: Calculator,
                  color: SG.masTeal,
                  desc: "A licensed robo-advisor creates P-Toket templates: Conservative (70% bonds, 20% gold, 10% stablecoin), Balanced (40% bonds, 35% equities, 15% gold, 10% stablecoin), Growth (60% equities, 20% VCC, 10% gold, 10% stablecoin). Each client gets their own P-Toket instance with automated rebalancing. The robo-advisor manages thousands of P-Tokets through a single Token Manager interface.",
                },
                {
                  title: "CPF Investment Scheme",
                  subtitle: "Retirement portfolio construction",
                  icon: Users,
                  color: SG.nusOrange,
                  desc: "A CPF member constructs a P-Toket within the CPFIS framework. The Token Program enforces CPFIS investment limits: maximum 35% in equities, approved instruments only, no leverage. The P-Toket's pre-hook validates every composition change against CPFIS rules before execution. MAS has real-time visibility into aggregate CPFIS P-Toket allocations.",
                },
                {
                  title: "Cross-Border Diversification",
                  subtitle: "Global access via unsponsored tokets",
                  icon: Globe,
                  color: SG.finternetAmber,
                  desc: "A Singapore investor builds a globally diversified P-Toket: 30% local (SGS + STI), 30% US (Treasury + S&P 500 via unsponsored tokets from DTCC), 20% Europe (Bunds via unsponsored tokets from Euroclear), 20% alternatives (gold + VCC). All components settle on the UNITS|SG network. No foreign brokerage accounts needed.",
                },
              ].map((item, i) => (
                <div key={i} className="rounded-2xl overflow-hidden" style={{ background: SG.card, border: `1px solid ${item.color}12` }}>
                  <div className="px-5 py-4 flex items-center gap-3" style={{ background: `${item.color}06`, borderBottom: `1px solid ${SG.border}` }}>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${item.color}12` }}>
                      <item.icon className="w-4 h-4" style={{ color: item.color }} />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white/90">{item.title}</h3>
                      <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.35)" }}>{item.subtitle}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </RevealSection>

        {/* MAS Supervisory View */}
        <RevealSection delay={100}>
          <section>
            <h2 className="text-2xl font-light mb-6">MAS supervisory <span className="font-semibold">view</span></h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
              P-Tokets give MAS unprecedented visibility into portfolio construction and risk concentration
              across the Singapore market. Because every P-Toket's composition is on-ledger, the MAS
              observer node can aggregate and analyse portfolio patterns in real-time.
            </p>

            <div className="rounded-xl p-5" style={{ background: `${SG.masTeal}06`, border: `1px solid ${SG.masTeal}12` }}>
              <div className="flex items-center gap-2 mb-4">
                <Eye className="w-5 h-5" style={{ color: SG.masTeal }} />
                <span className="text-sm font-semibold text-white/90">What MAS Sees</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { label: "Aggregate asset allocation", desc: "Total market exposure across all P-Tokets by asset class, geography, and risk profile" },
                  { label: "Concentration risk", desc: "Detection of crowded trades or excessive exposure to single issuers across all P-Tokets" },
                  { label: "Rebalancing activity", desc: "Volume and direction of rebalancing trades, identifying market impact patterns" },
                  { label: "Compliance inheritance", desc: "Verification that all P-Tokets correctly inherit restrictions from underlying components" },
                  { label: "CPFIS compliance", desc: "Real-time monitoring of CPFIS P-Tokets against investment scheme limits" },
                  { label: "Collateral transparency", desc: "Full look-through into P-Tokets pledged as collateral, with component-level valuations" },
                ].map((item, i) => (
                  <div key={i} className="p-4 rounded-lg" style={{ background: `${SG.masTeal}08` }}>
                    <div className="text-xs font-semibold text-white/80 mb-2">{item.label}</div>
                    <div className="text-[11px]" style={{ color: "rgba(255,255,255,0.4)" }}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </RevealSection>

        {/* Technical Properties */}
        <RevealSection delay={100}>
          <section>
            <h2 className="text-2xl font-light mb-6">Technical <span className="font-semibold">properties</span></h2>

            <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${SG.border}` }}>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr style={{ background: SG.card }}>
                      <th className="text-left p-3 font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>Property</th>
                      <th className="text-left p-3 font-medium" style={{ color: SG.nusOrange }}>P-Toket Behaviour</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { prop: "tokenClass type", value: "First-class tokenClass, same as any other asset on UNITS" },
                      { prop: "Transferability", value: "Fully transferable subject to inherited compliance restrictions" },
                      { prop: "Divisibility", value: "Fractional ownership supported, minimum unit defined by Token Manager" },
                      { prop: "Collateral eligibility", value: "Can be pledged as single collateral unit with look-through valuation" },
                      { prop: "Nesting depth", value: "Configurable by Token Manager, typically 2-3 levels maximum" },
                      { prop: "Rebalancing frequency", value: "Configurable: continuous, daily, weekly, monthly, or threshold-triggered" },
                      { prop: "NAV calculation", value: "Real-time from underlying toket valuations via oracle feeds" },
                      { prop: "Income handling", value: "Configurable: accumulate, reinvest, or distribute per Token Program" },
                      { prop: "Audit trail", value: "Full composition history, every rebalancing event, every income distribution" },
                      { prop: "MAS visibility", value: "Complete look-through to underlying components via observer node" },
                    ].map((row, i) => (
                      <tr key={i} style={{ borderTop: `1px solid ${SG.border}` }}>
                        <td className="p-3 font-medium text-white/70">{row.prop}</td>
                        <td className="p-3" style={{ color: "rgba(255,255,255,0.5)" }}>{row.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </RevealSection>

        {/* Knowledge Base */}
        <div className="mt-16 p-6 rounded-xl" style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${SG.border}` }}>
          <p className="text-xs uppercase tracking-widest mb-4" style={{ color: "rgba(255,255,255,0.25)" }}>UNITS Knowledge Base</p>
          <div className="flex flex-wrap gap-3">
            {[
              { href: "/sg/deep-dive/token-programs", label: "Token Programs" },
              { href: "/sg/deep-dive/tokenisation", label: "Tokenisation" },
              { href: "/sg/deep-dive/collateral-highway", label: "Collateral Highway" },
              { href: "/sg/deep-dive/vcc", label: "VCC Fund Interests" },
              { href: "/sg/deep-dive/precious-metals", label: "Precious Metals" },
              { href: "/sg/assets", label: "Asset Classes" },
              { href: "/sg/deep-dive/units", label: "UNITS Protocol" },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="px-3 py-1.5 rounded-full text-xs transition-colors hover:bg-white/[0.05]" style={{ color: "rgba(255,255,255,0.35)", border: `1px solid ${SG.border}` }}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-4 pt-8" style={{ borderTop: `1px solid ${SG.border}` }}>
          <Link href="/sg/deep-dive/token-programs" className="flex items-center gap-2 text-sm transition-colors" style={{ color: "rgba(255,255,255,0.4)" }}>
            ← Token Programs
          </Link>
          <div className="flex-1" />
          <Link href="/sg/assets" className="flex items-center gap-2 text-sm transition-colors" style={{ color: `${SG.nusOrange}90` }}>
            Next: Asset Classes <ArrowRight className="w-3.5 h-3.5" />
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
