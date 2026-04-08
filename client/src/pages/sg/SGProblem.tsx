import { useRef, useState, useEffect } from "react";
import { Link } from "wouter";
import SGPortalNav, { SG } from "@/components/SGPortalNav";
import { CrossPersonaCallout } from "@/components/IPEComponents";
import ZoneRenderer from "@/components/ZoneRenderer";
import { CinematicBackground } from "@/components/motion";
import {
  ArrowRight, Building2, Landmark, AlertTriangle, X, Check,
  ArrowRightLeft, Network, Shield, Eye, Users, Globe,
  Layers, Lock, Zap, BarChart3
} from "lucide-react";

/* ── Helpers ── */
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

export default function SGProblem() {
  return (
    <div className="min-h-screen text-white" style={{ background: SG.dark }}>
      <SGPortalNav />

      {/* Hero */}
      <section className="relative px-6 pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${SG.dark}, #0D1F3A 50%, #122B4A)` }} />
        <CinematicBackground variant="mixed" intensity={0.06} />
        <div className="relative max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5" style={{ color: SG.red }} />
            <span className="text-xs font-medium tracking-[0.2em] uppercase" style={{ color: SG.red }}>The Problem</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-light mb-4">
            Singapore's <span className="font-semibold">Fragmented</span> Infrastructure
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
            Two depositories that don't talk to each other, five or more isolated tokenisation platforms,
            and a US$4.7 trillion wealth management hub that deserves better.
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 pb-24 space-y-20">

        <ZoneRenderer pageId="/sg/problem" className="space-y-20">

        {/* The Two Depositories */}
        <ZoneRenderer.Zone zoneId="depositories" naturalIndex={0}>
        <RevealSection id="depositories">
          <section>
            <h2 className="text-2xl font-light mb-6">The <span className="font-semibold">two depositories</span></h2>

            {/* CDP Deep Dive */}
            <div className="rounded-2xl overflow-hidden mb-6" style={{ background: SG.card, border: `1px solid ${SG.border}` }}>
              <div className="px-6 py-4 flex items-center gap-3" style={{ background: `${SG.red}08`, borderBottom: `1px solid ${SG.border}` }}>
                <Building2 className="w-6 h-6" style={{ color: SG.red }} />
                <div>
                  <h3 className="text-lg font-semibold text-white/90">SGX Central Depository (CDP)</h3>
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>Operated by Singapore Exchange</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.6)" }}>
                  CDP is the central securities depository for Singapore's capital markets. It provides depository, clearing,
                  and settlement services for securities traded on SGX. All scripless securities in Singapore are held in CDP accounts.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                  {[
                    { label: "Asset Types", value: "Equities, Corporate Bonds, ETFs, REITs, Warrants, Structured Warrants" },
                    { label: "Settlement Cycle", value: "T+2 for equities, T+1 for bonds" },
                    { label: "Custody", value: "SGD 1.2T+ in securities under custody" },
                  ].map((item, i) => (
                    <div key={i} className="p-3 rounded-lg" style={{ background: `${SG.red}06` }}>
                      <div className="text-[10px] uppercase tracking-wider mb-1" style={{ color: `${SG.red}80` }}>{item.label}</div>
                      <div className="text-xs text-white/70">{item.value}</div>
                    </div>
                  ))}
                </div>
                <div className="p-3 rounded-lg" style={{ background: `${SG.red}06`, border: `1px solid ${SG.red}10` }}>
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
                    <strong className="text-white/70">Key limitation:</strong> CDP only handles SGX-listed securities.
                    Government securities (SGS, T-bills) are held separately in MEPS+. There is no unified view of a
                    participant's full portfolio across both systems.
                  </p>
                </div>
              </div>
            </div>

            {/* MEPS+ Deep Dive */}
            <div className="rounded-2xl overflow-hidden mb-6" style={{ background: SG.card, border: `1px solid ${SG.border}` }}>
              <div className="px-6 py-4 flex items-center gap-3" style={{ background: `${SG.masTeal}08`, borderBottom: `1px solid ${SG.border}` }}>
                <Landmark className="w-6 h-6" style={{ color: SG.masTeal }} />
                <div>
                  <h3 className="text-lg font-semibold text-white/90">MAS Electronic Payment System (MEPS+)</h3>
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>Operated by Monetary Authority of Singapore</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.6)" }}>
                  MEPS+ is Singapore's real-time gross settlement (RTGS) system for large-value SGD interbank payments
                  and the depository for Singapore Government Securities. It is the backbone of Singapore's wholesale
                  financial infrastructure.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                  {[
                    { label: "Asset Types", value: "SGS Bonds, T-Bills, MAS Bills, SGD Interbank Payments" },
                    { label: "Settlement", value: "Real-time gross settlement (RTGS)" },
                    { label: "Participants", value: "Banks, primary dealers, MAS" },
                  ].map((item, i) => (
                    <div key={i} className="p-3 rounded-lg" style={{ background: `${SG.masTeal}06` }}>
                      <div className="text-[10px] uppercase tracking-wider mb-1" style={{ color: `${SG.masTeal}80` }}>{item.label}</div>
                      <div className="text-xs text-white/70">{item.value}</div>
                    </div>
                  ))}
                </div>
                <div className="p-3 rounded-lg" style={{ background: `${SG.masTeal}06`, border: `1px solid ${SG.masTeal}10` }}>
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
                    <strong className="text-white/70">Key limitation:</strong> MEPS+ is designed for wholesale interbank
                    operations. It does not handle equities, corporate bonds, or retail securities. Cross-collateralisation
                    between MEPS+ government securities and CDP equities requires manual processes.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </RevealSection>
        </ZoneRenderer.Zone>

        {/* The Fragmentation Problem */}
        <ZoneRenderer.Zone zoneId="fragmentation" naturalIndex={1}>
        <RevealSection id="fragmentation" delay={100}>
          <section>
            <h2 className="text-2xl font-light mb-6">The <span className="font-semibold">fragmentation</span> problem</h2>

            <div className="rounded-2xl overflow-hidden mb-6" style={{ background: SG.card, border: `1px solid ${SG.border}` }}>
              <div className="px-6 py-4" style={{ background: "rgba(255,255,255,0.02)", borderBottom: `1px solid ${SG.border}` }}>
                <h3 className="text-lg font-medium text-white/90">What a participant sees today</h3>
              </div>
              <div className="p-6 space-y-4">
                {[
                  {
                    icon: <ArrowRightLeft className="w-5 h-5" />,
                    title: "No unified portfolio view",
                    desc: "A DBS client holding SGS bonds (MEPS+), DBS shares (CDP), and tokenised bonds (DDEx) has three separate views with three different reconciliation processes. There is no single source of truth.",
                    accent: SG.red,
                  },
                  {
                    icon: <Lock className="w-5 h-5" />,
                    title: "Collateral immobility",
                    desc: "An SGS bond in MEPS+ cannot be used as collateral for a margin position in CDP without manual transfer, multiple intermediaries, and T+1 or T+2 settlement. In a market stress scenario, this delay is unacceptable.",
                    accent: SG.nusOrange,
                  },
                  {
                    icon: <Layers className="w-5 h-5" />,
                    title: "Isolated tokenisation platforms",
                    desc: "DBS DDEx, InvestaX, DigiFT, Sygnum, and Matrixdock each operate their own tokenisation infrastructure. A tokenised bond on DDEx cannot interact with a tokenised fund on InvestaX. Each platform is a silo.",
                    accent: SG.masTeal,
                  },
                  {
                    icon: <BarChart3 className="w-5 h-5" />,
                    title: "Liquidity fragmentation",
                    desc: "Instead of one deep pool, liquidity is split across multiple platforms. Each platform has its own order book, its own settlement cycle, and its own compliance framework. Market depth suffers.",
                    accent: SG.finternetCyan,
                  },
                  {
                    icon: <Eye className="w-5 h-5" />,
                    title: "Regulatory blind spots",
                    desc: "MAS has no unified real-time view across CDP, MEPS+, and the various tokenisation platforms. Supervisory oversight requires aggregating data from multiple sources, each with different formats and timelines.",
                    accent: SG.finternetAmber,
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-lg" style={{ background: `${item.accent}06` }}>
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${item.accent}15` }}>
                      <span style={{ color: item.accent }}>{item.icon}</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white/90 mb-1">{item.title}</h4>
                      <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </RevealSection>
        </ZoneRenderer.Zone>

        {/* Not a Third Depository */}
        <ZoneRenderer.Zone zoneId="not-third" naturalIndex={2}>
        <RevealSection id="not-third" delay={100}>
          <section>
            <h2 className="text-2xl font-light mb-6">Why <span className="font-semibold">not</span> a third depository?</h2>

            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
              The instinctive response to fragmentation might be to build a new, modern depository that handles everything.
              But this would make the problem worse, not better.
            </p>

            <div className="rounded-2xl overflow-hidden mb-6" style={{ background: SG.card, border: `1px solid ${SG.border}` }}>
              <div className="p-6 space-y-4">
                {[
                  {
                    problem: "Three-way fragmentation",
                    desc: "Instead of two silos, you now have three. Participants need to connect to CDP, MEPS+, and the new depository. Reconciliation complexity increases, not decreases.",
                  },
                  {
                    problem: "Migration impossibility",
                    desc: "SGX CDP and MEPS+ have decades of established processes, legal frameworks, and participant relationships. No regulator will force migration of existing assets to a new system.",
                  },
                  {
                    problem: "Regulatory duplication",
                    desc: "A third depository requires its own regulatory framework, its own capital requirements, its own risk management. This adds cost without solving the interoperability problem.",
                  },
                  {
                    problem: "Competitive resistance",
                    desc: "SGX has no incentive to cede equities settlement to a competitor. MAS has no incentive to move government securities out of MEPS+. A third depository would face institutional resistance from day one.",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg" style={{ background: `${SG.red}06` }}>
                    <X className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: SG.red }} />
                    <div>
                      <h4 className="text-sm font-semibold text-white/90 mb-1">{item.problem}</h4>
                      <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* The answer */}
            <div className="rounded-2xl p-6" style={{ background: `${SG.nusOrange}08`, border: `1px solid ${SG.nusOrange}20` }}>
              <div className="flex items-center gap-2 mb-3">
                <Check className="w-5 h-5" style={{ color: SG.nusOrange }} />
                <h3 className="text-lg font-semibold text-white/90">The answer: a network layer above both</h3>
              </div>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.6)" }}>
                Instead of replacing either depository, the UNITS Network creates a permissioned protocol layer that
                sits above both. CDP continues to hold equities. MEPS+ continues to hold government securities.
                The network provides the unified interface, common standards, and interoperability that neither can offer alone.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { icon: <Check className="w-4 h-4" />, label: "No migration needed" },
                  { icon: <Check className="w-4 h-4" />, label: "Unified portfolio view" },
                  { icon: <Check className="w-4 h-4" />, label: "Cross-collateralisation" },
                  { icon: <Check className="w-4 h-4" />, label: "Single compliance layer" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 p-2 rounded-lg" style={{ background: `${SG.nusOrange}10` }}>
                    <span style={{ color: SG.nusOrange }}>{item.icon}</span>
                    <span className="text-xs text-white/70">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </RevealSection>
        </ZoneRenderer.Zone>

        {/* Side-by-Side Comparison */}
        <ZoneRenderer.Zone zoneId="comparison" naturalIndex={3}>
        <RevealSection id="comparison" delay={100}>
          <section>
            <h2 className="text-2xl font-light mb-6">Today vs. <span className="font-semibold">UNITS Network</span></h2>

            <div className="rounded-2xl overflow-hidden" style={{ background: SG.card, border: `1px solid ${SG.border}` }}>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ borderBottom: `1px solid ${SG.border}` }}>
                      <th className="text-left p-4 text-white/50 font-medium">Dimension</th>
                      <th className="text-left p-4 font-medium" style={{ color: `${SG.red}cc` }}>Today</th>
                      <th className="text-left p-4 font-medium" style={{ color: `${SG.nusOrange}cc` }}>UNITS Network</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { dim: "Portfolio view", today: "Separate CDP + MEPS+ accounts", units: "Single unified view across all assets" },
                      { dim: "Settlement", today: "T+2 equities, RTGS for SGS, market hours only", units: "T+0 atomic DVP, 24/7/365" },
                      { dim: "Collateral", today: "Manual transfer between systems", units: "Instant cross-system pledging" },
                      { dim: "Tokenisation", today: "5+ isolated platforms", units: "Common tokenClass standard" },
                      { dim: "New asset classes", today: "Separate platform per asset", units: "Gold, stablecoins, VCC, private credit on one network" },
                      { dim: "Regulatory view", today: "Aggregated from multiple sources", units: "Real-time MAS observer node" },
                      { dim: "Global access", today: "Separate custody arrangements", units: "Unsponsored tokets for any global security" },
                      { dim: "Operating hours", today: "SGX: 9am-5pm, MEPS+: 9am-6:30pm", units: "24 hours, 7 days, 365 days" },
                    ].map((row, i) => (
                      <tr key={i} style={{ borderBottom: `1px solid ${SG.border}` }}>
                        <td className="p-4 text-white/70 font-medium">{row.dim}</td>
                        <td className="p-4" style={{ color: "rgba(255,255,255,0.4)" }}>{row.today}</td>
                        <td className="p-4" style={{ color: "rgba(255,255,255,0.6)" }}>{row.units}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </RevealSection>
        </ZoneRenderer.Zone>

        </ZoneRenderer>

        {/* IPE Cross-Persona Callout */}
        <CrossPersonaCallout />

        {/* UNITS Knowledge Base Links */}
        <div className="mt-16 p-6 rounded-xl" style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${SG.border}` }}>
          <p className="text-xs uppercase tracking-widest mb-4" style={{ color: "rgba(255,255,255,0.25)" }}>UNITS Knowledge Base</p>
          <div className="flex flex-wrap gap-3">
            {[
              { href: "/sg/deep-dive/units", label: "Singapore on UNITS" },
              { href: "/sg/deep-dive/tokenisation", label: "Tokenisation" },
              { href: "/sg/deep-dive/dvp-settlement", label: "DvP Settlement" },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="px-3 py-1.5 rounded-full text-xs transition-colors" style={{ color: "rgba(255,255,255,0.35)", border: `1px solid ${SG.border}` }}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-4 pt-8" style={{ borderTop: `1px solid ${SG.border}` }}>
          <Link href="/sg" className="flex items-center gap-2 text-sm transition-colors" style={{ color: "rgba(255,255,255,0.4)" }}>
            ← Back to Executive Summary
          </Link>
          <div className="flex-1" />
          <Link href="/sg/architecture" className="flex items-center gap-2 text-sm transition-colors" style={{ color: `${SG.masTeal}90` }}>
            Next: Network Architecture <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-6 text-center" style={{ borderTop: `1px solid ${SG.border}` }}>
          <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663328851912/82pWKmUqBRkgn8Ladat8sj/units-sg-orchid-logo-light-KqELedrzeYmCnakJE4pQSh.png" alt="UNITS|SG" className="h-10 w-auto mx-auto mb-2 opacity-25" />
          <div className="flex items-center justify-center gap-1.5">
            <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.15)" }}>UNITS|SG</span>
            <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.08)" }}>&middot;</span>
            <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.12)" }}>Powered by</span>
            <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663328851912/82pWKmUqBRkgn8Ladat8sj/yP0fvxrB3mwq_e7583308.png" alt="Finternet" className="h-3 opacity-20" />
          </div>
        </div>
      </div>
    </div>
  );
}
