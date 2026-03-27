import { useRef, useState, useEffect } from "react";
import { Link } from "wouter";
import SGPortalNav, { SG } from "@/components/SGPortalNav";
import { CinematicBackground } from "@/components/motion";
import {
  ArrowRight, ArrowRightLeft, Shield, Lock, CheckCircle2, Zap,
  Layers, Globe, Building2, Landmark, Coins, Network,
  RefreshCw, Eye, BarChart3, Box, Gem, Leaf
} from "lucide-react";

const SG_LOGO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663328851912/82pWKmUqBRkgn8Ladat8sj/units-sg-orchid-logo-light-KqELedrzeYmCnakJE4pQSh.png";
const FINTERNET_LOGO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663328851912/82pWKmUqBRkgn8Ladat8sj/yP0fvxrB3mwq_e7583308.png";

function RevealSection({ id, children, delay = 0 }: { id: string; children: React.ReactNode; delay?: number }) {
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

export default function SGDeepDiveCollateralHighway() {
  return (
    <div className="min-h-screen text-white" style={{ background: SG.dark }}>
      <SGPortalNav />

      {/* Hero */}
      <section className="relative px-6 pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${SG.dark}, #0D1F3A 50%, #122B4A)` }} />
        <CinematicBackground variant="mixed" intensity={0.06} />
        <div className="relative max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <ArrowRightLeft className="w-5 h-5" style={{ color: SG.finternetAmber }} />
            <span className="text-xs font-medium tracking-[0.2em] uppercase" style={{ color: SG.finternetAmber }}>Deep Dive</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-light mb-4">
            <span className="font-semibold">Collateral Highway</span> for Singapore
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
            How the UNITS Network bridges SGX CDP and MAS MEPS+ into a unified collateral ecosystem,
            enabling cross-depository collateral mobility, real-time encumbrance, and automated
            substitution across all Singapore asset classes.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-6 pb-24 space-y-20">

        {/* The Collateral Problem */}
        <RevealSection id="problem">
          <section>
            <h2 className="text-2xl font-light mb-6">The collateral <span className="font-semibold">problem</span></h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
              Singapore's dual-depository structure creates a collateral silo that costs the market billions
              in trapped liquidity. Assets in CDP cannot be used as collateral for obligations in MEPS+,
              and vice versa, without manual, time-consuming processes.
            </p>

            <div className="rounded-2xl p-5" style={{ background: SG.card, border: `1px solid ${SG.border}` }}>
              <div className="text-xs uppercase tracking-wider mb-4" style={{ color: SG.finternetAmber }}>Collateral Silos Today</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="p-4 rounded-xl" style={{ background: `${SG.red}06` }}>
                  <Building2 className="w-5 h-5 mb-2" style={{ color: SG.red }} />
                  <div className="text-sm font-medium text-white/90 mb-1">CDP Silo</div>
                  <div className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
                    SGX equities, corporate bonds, ETFs. Can only be used as collateral within CDP's
                    own margin framework. Cannot be mobilised for MEPS+ obligations.
                  </div>
                </div>
                <div className="p-4 rounded-xl" style={{ background: `${SG.masTeal}06` }}>
                  <Landmark className="w-5 h-5 mb-2" style={{ color: SG.masTeal }} />
                  <div className="text-sm font-medium text-white/90 mb-1">MEPS+ Silo</div>
                  <div className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
                    Singapore Government Securities, MAS Bills, T-Bills. High-quality liquid assets
                    trapped in a separate system, unavailable for equity margin or repo.
                  </div>
                </div>
              </div>
              <div className="p-3 rounded-lg" style={{ background: "rgba(255,255,255,0.02)" }}>
                <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>
                  A Singapore bank holding SGD 5 billion in SGS bonds in MEPS+ and SGD 2 billion in
                  SGX equities in CDP must maintain separate collateral buffers for each system.
                  The UNITS Collateral Highway unifies these into a single pool, reducing the total
                  collateral requirement by an estimated 30-40%.
                </p>
              </div>
            </div>
          </section>
        </RevealSection>

        {/* The CDP-MEPS+ Bridge */}
        <RevealSection id="bridge" delay={100}>
          <section>
            <h2 className="text-2xl font-light mb-6">The CDP-MEPS+ <span className="font-semibold">bridge</span></h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
              The UNITS Collateral Highway connects CDP and MEPS+ through proxy tokenisation, creating
              a unified collateral layer where any asset from either depository can be used as collateral
              for any obligation on the network.
            </p>

            <div className="rounded-2xl overflow-hidden" style={{ background: SG.card, border: `1px solid ${SG.border}` }}>
              <div className="p-5">
                {/* Network Topology */}
                <div className="text-xs uppercase tracking-wider mb-4" style={{ color: SG.finternetAmber }}>Network Topology</div>
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="p-3 rounded-xl text-center" style={{ background: `${SG.red}08`, border: `1px solid ${SG.red}12` }}>
                    <Building2 className="w-5 h-5 mx-auto mb-1" style={{ color: SG.red }} />
                    <div className="text-[10px] font-medium text-white/70">SGX CDP Node</div>
                    <div className="text-[9px] mt-1" style={{ color: "rgba(255,255,255,0.35)" }}>Equities, Corp Bonds</div>
                  </div>
                  <div className="p-3 rounded-xl text-center" style={{ background: `${SG.finternetAmber}08`, border: `1px solid ${SG.finternetAmber}12` }}>
                    <Network className="w-5 h-5 mx-auto mb-1" style={{ color: SG.finternetAmber }} />
                    <div className="text-[10px] font-medium text-white/70">UNITS Highway</div>
                    <div className="text-[9px] mt-1" style={{ color: "rgba(255,255,255,0.35)" }}>Unified Collateral Layer</div>
                  </div>
                  <div className="p-3 rounded-xl text-center" style={{ background: `${SG.masTeal}08`, border: `1px solid ${SG.masTeal}12` }}>
                    <Landmark className="w-5 h-5 mx-auto mb-1" style={{ color: SG.masTeal }} />
                    <div className="text-[10px] font-medium text-white/70">MAS MEPS+ Node</div>
                    <div className="text-[9px] mt-1" style={{ color: "rgba(255,255,255,0.35)" }}>SGS, T-Bills, MAS Bills</div>
                  </div>
                </div>

                {/* Connection arrows */}
                <div className="flex items-center justify-center gap-2 mb-6">
                  <div className="h-px flex-1" style={{ background: `${SG.finternetAmber}30` }} />
                  <span className="text-[10px] px-3 py-1 rounded-full" style={{ background: `${SG.finternetAmber}10`, color: SG.finternetAmber }}>
                    Bidirectional collateral flow
                  </span>
                  <div className="h-px flex-1" style={{ background: `${SG.finternetAmber}30` }} />
                </div>

                <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
                  Assets never physically move between CDP and MEPS+. Instead, proxy tokets on the UNITS
                  Network represent positions in both depositories, and the collateral highway enables
                  encumbrance, substitution, and transformation operations across the unified layer.
                </p>
              </div>
            </div>
          </section>
        </RevealSection>

        {/* Core Collateral Operations */}
        <RevealSection id="operations" delay={100}>
          <section>
            <h2 className="text-2xl font-light mb-6">Core collateral <span className="font-semibold">operations</span></h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
              The UNITS Collateral Highway supports six core operations, all executing atomically
              and visible to the MAS observer node in real-time.
            </p>

            <div className="space-y-4">
              {[
                {
                  title: "Encumbrance",
                  icon: Lock,
                  color: SG.masTeal,
                  desc: "Lock a toket as collateral for a specific obligation. The toket remains in the owner's wallet but cannot be transferred until the encumbrance is released.",
                  example: "DBS encumbers 10,000 CapitaLand tokets (CDP proxy) as margin for a derivatives position."
                },
                {
                  title: "Substitution",
                  icon: RefreshCw,
                  color: SG.nusOrange,
                  desc: "Replace one collateral asset with another of equivalent or greater value, atomically. The old collateral is released and the new collateral is encumbered in a single transaction.",
                  example: "OCBC substitutes SGS 10Y bonds (MEPS+ proxy) for DBS shares (CDP proxy) as repo collateral."
                },
                {
                  title: "Transformation",
                  icon: ArrowRightLeft,
                  color: SG.finternetCyan,
                  desc: "Convert collateral from one form to another to meet specific eligibility requirements. The transformation is atomic and preserves the collateral value.",
                  example: "UOB transforms corporate bonds into XSGD via repo to meet a cash margin call."
                },
                {
                  title: "Auto-Select",
                  icon: Zap,
                  color: SG.finternetAmber,
                  desc: "Automatically select the optimal collateral from a participant's portfolio based on eligibility rules, haircuts, and opportunity cost. Minimises collateral usage.",
                  example: "The system auto-selects the cheapest-to-deliver assets from DBS's combined CDP+MEPS+ portfolio."
                },
                {
                  title: "Cross-Depository Transfer",
                  icon: Globe,
                  color: SG.red,
                  desc: "Move collateral value between CDP and MEPS+ positions without physical asset movement. The proxy layer handles the cross-depository coordination.",
                  example: "SGS bonds in MEPS+ are used to cover equity margin in CDP, all on-ledger."
                },
                {
                  title: "Inventory Visibility",
                  icon: Eye,
                  color: SG.nusBlue,
                  desc: "Real-time view of all available collateral across both depositories, with eligibility scoring and haircut calculations. Participants see their full collateral capacity.",
                  example: "OCBC treasury sees a unified dashboard: SGD 3.2B available collateral across CDP and MEPS+."
                },
              ].map((item, i) => (
                <div key={i} className="rounded-xl overflow-hidden" style={{ border: `1px solid ${item.color}12` }}>
                  <div className="px-5 py-3 flex items-center gap-3" style={{ background: `${item.color}08` }}>
                    <item.icon className="w-4 h-4" style={{ color: item.color }} />
                    <div className="text-sm font-semibold text-white/90">{item.title}</div>
                  </div>
                  <div className="px-5 py-4" style={{ background: `${item.color}03` }}>
                    <p className="text-xs leading-relaxed mb-3" style={{ color: "rgba(255,255,255,0.5)" }}>{item.desc}</p>
                    <div className="p-2 rounded-lg" style={{ background: `${item.color}06` }}>
                      <div className="text-[10px] uppercase tracking-wider mb-0.5" style={{ color: `${item.color}70` }}>Singapore Example</div>
                      <div className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>{item.example}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </RevealSection>

        {/* Eligible Collateral */}
        <RevealSection id="eligible" delay={100}>
          <section>
            <h2 className="text-2xl font-light mb-6">Eligible <span className="font-semibold">collateral</span></h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
              The UNITS Collateral Highway accepts a broad range of Singapore assets, each with
              specific haircuts and eligibility rules enforced by Token Programs.
            </p>

            <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${SG.border}` }}>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr style={{ background: SG.card }}>
                      <th className="text-left p-3 font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>Asset Class</th>
                      <th className="text-left p-3 font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>Source</th>
                      <th className="text-left p-3 font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>Haircut</th>
                      <th className="text-left p-3 font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>Use Cases</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { asset: "SGS Bonds", source: "MEPS+", haircut: "2-5%", use: "Highest quality, all purposes" },
                      { asset: "T-Bills", source: "MEPS+", haircut: "1-2%", use: "Short-term, cash-equivalent" },
                      { asset: "MAS Bills", source: "MEPS+", haircut: "1-2%", use: "Intraday liquidity, repo" },
                      { asset: "Blue-chip equities", source: "CDP", haircut: "15-25%", use: "Margin, securities lending" },
                      { asset: "Corporate bonds (IG)", source: "CDP", haircut: "5-10%", use: "Repo, margin" },
                      { asset: "ETFs (STI tracker)", source: "CDP", haircut: "10-20%", use: "Diversified collateral" },
                      { asset: "XSGD stablecoin", source: "Native", haircut: "0%", use: "Cash collateral, margin" },
                      { asset: "Tokenised gold", source: "Native", haircut: "5-10%", use: "Alternative collateral" },
                      { asset: "VCC carbon credits", source: "Native", haircut: "20-40%", use: "ESG-linked collateral" },
                    ].map((row, i) => (
                      <tr key={i} style={{ borderTop: `1px solid ${SG.border}` }}>
                        <td className="p-3 font-medium text-white/70">{row.asset}</td>
                        <td className="p-3">
                          <span className="text-[10px] px-2 py-0.5 rounded-full" style={{
                            background: row.source === "MEPS+" ? `${SG.masTeal}12` : row.source === "CDP" ? `${SG.red}12` : `${SG.nusOrange}12`,
                            color: row.source === "MEPS+" ? SG.masTeal : row.source === "CDP" ? SG.red : SG.nusOrange
                          }}>
                            {row.source}
                          </span>
                        </td>
                        <td className="p-3" style={{ color: "rgba(255,255,255,0.5)" }}>{row.haircut}</td>
                        <td className="p-3" style={{ color: "rgba(255,255,255,0.45)" }}>{row.use}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </RevealSection>

        {/* Collateral Efficiency Gains */}
        <RevealSection id="efficiency" delay={100}>
          <section>
            <h2 className="text-2xl font-light mb-6">Efficiency <span className="font-semibold">gains</span></h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
              The unified collateral highway delivers measurable efficiency improvements for Singapore
              market participants by eliminating the dual-silo overhead.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { metric: "30-40%", label: "Collateral reduction", desc: "Through cross-depository netting" },
                { metric: "Real-time", label: "Substitution speed", desc: "From T+1 to instant" },
                { metric: "24/7", label: "Availability", desc: "Not limited to business hours" },
                { metric: "100%", label: "Visibility", desc: "Unified inventory view" },
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-xl text-center" style={{ background: `${SG.finternetAmber}06`, border: `1px solid ${SG.finternetAmber}10` }}>
                  <div className="text-xl font-bold mb-1" style={{ color: SG.finternetAmber }}>{item.metric}</div>
                  <div className="text-xs font-medium text-white/80 mb-0.5">{item.label}</div>
                  <div className="text-[10px]" style={{ color: "rgba(255,255,255,0.35)" }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </section>
        </RevealSection>

        {/* Scenario: Intraday Repo */}
        <RevealSection id="scenario" delay={100}>
          <section>
            <h2 className="text-2xl font-light mb-6">Scenario: <span className="font-semibold">intraday repo</span></h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
              A new market segment enabled by the UNITS Collateral Highway: intraday repo transactions
              that are structurally impossible in today's batch-based infrastructure.
            </p>

            <div className="rounded-2xl p-5" style={{ background: SG.card, border: `1px solid ${SG.border}` }}>
              <div className="text-xs uppercase tracking-wider mb-4" style={{ color: SG.finternetCyan }}>DBS Intraday Repo</div>
              <div className="space-y-3">
                {[
                  { time: "09:15", event: "DBS needs SGD 500M intraday liquidity for a large equity settlement on SGX" },
                  { time: "09:16", event: "DBS offers SGS 10Y bonds (MEPS+ proxy tokets) as collateral to OCBC" },
                  { time: "09:16", event: "OCBC's auto-select engine evaluates the collateral: SGS 10Y, 2% haircut, eligible" },
                  { time: "09:17", event: "Atomic repo execution: SGS bonds encumbered, 500M XSGD transferred to DBS" },
                  { time: "14:30", event: "DBS completes the equity settlement and returns 500M XSGD plus intraday interest" },
                  { time: "14:30", event: "Atomic unwind: XSGD returned, SGS bonds released, repo closed" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg" style={{ background: `${SG.finternetCyan}04` }}>
                    <span className="text-[10px] font-mono shrink-0 px-2 py-0.5 rounded" style={{ background: `${SG.finternetCyan}12`, color: SG.finternetCyan }}>
                      {item.time}
                    </span>
                    <span className="text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>{item.event}</span>
                  </div>
                ))}
              </div>
              <p className="text-[10px] mt-4" style={{ color: "rgba(255,255,255,0.3)" }}>
                Total elapsed time: 5 hours 15 minutes. In today's infrastructure, the minimum repo
                term is overnight, and cross-depository collateral would require manual coordination
                taking hours to arrange.
              </p>
            </div>
          </section>
        </RevealSection>

        {/* UNITS Knowledge Base Cross-Links */}
        <div className="mt-16 p-6 rounded-xl" style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${SG.border}` }}>
          <p className="text-xs uppercase tracking-widest mb-4" style={{ color: "rgba(255,255,255,0.25)" }}>UNITS Knowledge Base</p>
          <div className="flex flex-wrap gap-3">
            {[
              { href: "/sg/deep-dive/collateral-highway", label: "Collateral Highway (Protocol)" },
              { href: "/sg/deep-dive/dvp-settlement", label: "DvP Settlement" },
              { href: "/sg/deep-dive/token-programs", label: "Token Programs" },
              { href: "/sg/deep-dive/units", label: "UNITS Protocol" },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="px-3 py-1.5 rounded-full text-xs transition-colors" style={{ color: "rgba(255,255,255,0.35)", border: `1px solid ${SG.border}` }}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-4 pt-8" style={{ borderTop: `1px solid ${SG.border}` }}>
          <Link href="/sg/deep-dive/regulatory" className="flex items-center gap-2 text-sm transition-colors" style={{ color: "rgba(255,255,255,0.4)" }}>
            ← Regulatory Framework
          </Link>
          <div className="flex-1" />
          <Link href="/sg/deep-dive/participants" className="flex items-center gap-2 text-sm transition-colors" style={{ color: `${SG.finternetAmber}90` }}>
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
