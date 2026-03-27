import { useRef, useState, useEffect } from "react";
import { Link } from "wouter";
import SGPortalNav, { SG } from "@/components/SGPortalNav";
import { CinematicBackground } from "@/components/motion";
import {
  ArrowRight, Clock, RefreshCw, Link2, Zap, Shield,
  ArrowRightLeft, Globe, CheckCircle2, AlertTriangle,
  Wallet, Lock, BarChart3, TrendingUp, Gem
} from "lucide-react";

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

export default function SGCapabilities() {
  return (
    <div className="min-h-screen text-white" style={{ background: SG.dark }}>
      <SGPortalNav />

      {/* Hero */}
      <section className="relative px-6 pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${SG.dark}, #0D1F3A 50%, #122B4A)` }} />
        <CinematicBackground variant="mixed" intensity={0.06} />
        <div className="relative max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5" style={{ color: SG.finternetCyan }} />
            <span className="text-xs font-medium tracking-[0.2em] uppercase" style={{ color: SG.finternetCyan }}>Capabilities</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-light mb-4">
            Transformative <span className="font-semibold">Capabilities</span>
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
            Three capabilities that no existing Singapore infrastructure provides: 24/7 atomic settlement,
            repo and financing against tokenised assets, and unsponsored tokets as programmable depositary receipts.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-6 pb-24 space-y-20">

        {/* 24/7 Atomic Settlement */}
        <RevealSection id="settlement">
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${SG.finternetCyan}15` }}>
                <Clock className="w-5 h-5" style={{ color: SG.finternetCyan }} />
              </div>
              <h2 className="text-2xl font-light">24/7 <span className="font-semibold">Atomic Settlement</span></h2>
            </div>

            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
              The UNITS Network eliminates batch processing windows entirely. Participants settle DVP transactions
              around the clock, across weekends, public holidays, and outside market hours. Combined with
              SCS-regulated stablecoins as settlement currency, the network enables atomic delivery-versus-payment
              at any time.
            </p>

            {/* Today vs UNITS */}
            <div className="rounded-2xl overflow-hidden mb-6" style={{ background: SG.card, border: `1px solid ${SG.border}` }}>
              <div className="px-6 py-4" style={{ background: "rgba(255,255,255,0.02)", borderBottom: `1px solid ${SG.border}` }}>
                <h3 className="text-lg font-medium text-white/90">Settlement comparison</h3>
              </div>
              <div className="p-6 space-y-4">
                {/* Today */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full" style={{ background: `${SG.red}70` }} />
                    <span className="text-sm font-medium" style={{ color: `${SG.red}80` }}>Today</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      { label: "SGX Equities", value: "T+2, 9am-5pm SGT, weekdays only" },
                      { label: "SGS Bonds (MEPS+)", value: "Same-day RTGS, 9am-6:30pm SGT" },
                      { label: "Cross-system", value: "Manual transfer, T+1 minimum" },
                      { label: "Tokenised assets", value: "Platform-specific, no interop" },
                    ].map((item, i) => (
                      <div key={i} className="p-3 rounded-lg" style={{ background: `${SG.red}05`, border: `1px solid ${SG.red}10` }}>
                        <div className="text-[10px] uppercase tracking-wider mb-1" style={{ color: `${SG.red}70` }}>{item.label}</div>
                        <div className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>{item.value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* UNITS */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full" style={{ background: `${SG.finternetCyan}70` }} />
                    <span className="text-sm font-medium" style={{ color: `${SG.finternetCyan}80` }}>UNITS Network</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      { label: "All asset classes", value: "T+0 atomic DVP, 24/7/365" },
                      { label: "Settlement currency", value: "SCS-regulated SGD stablecoin" },
                      { label: "Cross-system", value: "Instant, protocol-level" },
                      { label: "Finality", value: "Atomic: both legs succeed or neither does" },
                    ].map((item, i) => (
                      <div key={i} className="p-3 rounded-lg" style={{ background: `${SG.finternetCyan}05`, border: `1px solid ${SG.finternetCyan}10` }}>
                        <div className="text-[10px] uppercase tracking-wider mb-1" style={{ color: `${SG.finternetCyan}70` }}>{item.label}</div>
                        <div className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>{item.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {[
                { value: "T+0", label: "Settlement Cycle", accent: SG.finternetCyan },
                { value: "24/7", label: "Operating Hours", accent: SG.nusOrange },
                { value: "Atomic", label: "DVP Guarantee", accent: SG.masTeal },
                { value: "SGD", label: "SCS Stablecoin", accent: SG.red },
              ].map((s, i) => (
                <div key={i} className="text-center p-4 rounded-xl" style={{ background: SG.card, border: `1px solid ${SG.border}` }}>
                  <div className="text-xl font-bold mb-1" style={{ color: s.accent }}>{s.value}</div>
                  <div className="text-[10px]" style={{ color: "rgba(255,255,255,0.35)" }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Scenario */}
            <div className="rounded-xl p-5" style={{ background: `${SG.finternetCyan}06`, border: `1px solid ${SG.finternetCyan}12` }}>
              <h4 className="text-sm font-semibold mb-2" style={{ color: SG.finternetCyan }}>Real-world scenario</h4>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
                A wealth manager in Singapore receives an instruction from a European client at 2am SGT on a Saturday.
                The client wants to buy SGD 5M in tokenised gold and pledge it as collateral for a structured note position.
                On the UNITS Network, this entire sequence (gold toket purchase, DVP settlement, and collateral pledge)
                completes in under 30 seconds. Today, this would require waiting until Monday morning, coordinating across
                multiple systems, and would take 2-3 business days.
              </p>
            </div>
          </section>
        </RevealSection>

        {/* Repo & Financing */}
        <RevealSection id="repo" delay={100}>
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${SG.nusOrange}15` }}>
                <RefreshCw className="w-5 h-5" style={{ color: SG.nusOrange }} />
              </div>
              <h2 className="text-2xl font-light">Repo & <span className="font-semibold">Financing</span></h2>
            </div>

            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
              Participants can pledge tokenised financial assets <strong className="text-white/80">and commodities (gold tokets)</strong> as
              collateral for repo transactions and financing. Smart contracts manage the entire lifecycle automatically,
              replacing manual processes that currently involve multiple intermediaries and days of processing.
            </p>

            {/* Lifecycle */}
            <div className="rounded-2xl overflow-hidden mb-6" style={{ background: SG.card, border: `1px solid ${SG.border}` }}>
              <div className="px-6 py-4" style={{ background: `${SG.nusOrange}08`, borderBottom: `1px solid ${SG.border}` }}>
                <h3 className="text-lg font-medium text-white/90">Smart contract repo lifecycle</h3>
              </div>
              <div className="p-6 space-y-3">
                {[
                  { step: "1", label: "Collateral Pledge", desc: "Participant pledges tokenised assets (bonds, equities, gold tokets, structured notes) as collateral. Smart contract locks the tokets and records the pledge.", accent: SG.nusOrange },
                  { step: "2", label: "Real-time Valuation", desc: "Collateral valued 24/7 against live price feeds. Not end-of-day snapshots, but continuous mark-to-market with configurable frequency.", accent: SG.finternetAmber },
                  { step: "3", label: "Auto Margin Calls", desc: "When LTV thresholds are breached, the protocol triggers margin calls automatically. The borrower has a configurable window to post additional collateral.", accent: SG.red },
                  { step: "4", label: "Substitution", desc: "Borrower can substitute collateral (e.g., replace gold tokets with SGS bonds) without unwinding the repo. Smart contract verifies the new collateral meets eligibility requirements.", accent: SG.masTeal },
                  { step: "5", label: "Automatic Release", desc: "On maturity or repayment, collateral is released programmatically. No manual processing, no settlement delays, no reconciliation.", accent: SG.finternetCyan },
                ].map((s, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg" style={{ background: `${s.accent}06` }}>
                    <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold" style={{ background: `${s.accent}15`, color: s.accent }}>
                      {s.step}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white/80">{s.label}</div>
                      <div className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Eligible collateral */}
            <div className="rounded-xl p-5 mb-6" style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${SG.border}` }}>
              <h4 className="text-sm font-semibold text-white/80 mb-3">Eligible collateral types</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {[
                  { name: "SGS Bonds", icon: <TrendingUp className="w-3.5 h-3.5" />, accent: SG.masTeal },
                  { name: "Corporate Bonds", icon: <BarChart3 className="w-3.5 h-3.5" />, accent: SG.nusOrange },
                  { name: "Equities", icon: <ArrowRightLeft className="w-3.5 h-3.5" />, accent: SG.red },
                  { name: "Gold Tokets", icon: <Gem className="w-3.5 h-3.5" />, accent: SG.finternetAmber },
                  { name: "Structured Notes", icon: <BarChart3 className="w-3.5 h-3.5" />, accent: SG.finternetCyan },
                  { name: "SCS Stablecoins", icon: <Wallet className="w-3.5 h-3.5" />, accent: SG.nusOrange },
                ].map((c, i) => (
                  <div key={i} className="flex items-center gap-2 p-2 rounded-lg" style={{ background: `${c.accent}08` }}>
                    <span style={{ color: c.accent }}>{c.icon}</span>
                    <span className="text-xs text-white/70">{c.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tri-party */}
            <div className="rounded-xl p-5" style={{ background: `${SG.nusOrange}06`, border: `1px solid ${SG.nusOrange}12` }}>
              <h4 className="text-sm font-semibold mb-2" style={{ color: SG.nusOrange }}>Tri-party repo</h4>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
                The UNITS Network acts as neutral infrastructure for tri-party repo, replacing bilateral agreements.
                The protocol manages collateral selection, substitution, and margin calls, functions that currently
                require a dedicated tri-party agent. This opens repo markets to a broader set of participants,
                including smaller banks and asset managers who cannot afford dedicated tri-party arrangements.
              </p>
            </div>
          </section>
        </RevealSection>

        {/* Unsponsored Tokets */}
        <RevealSection id="unsponsored" delay={100}>
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${SG.red}15` }}>
                <Link2 className="w-5 h-5" style={{ color: SG.red }} />
              </div>
              <h2 className="text-2xl font-light">Unsponsored <span className="font-semibold">Tokets</span></h2>
            </div>

            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
              A Singapore participant can <strong className="text-white/80">lock traditional securities</strong> (US Treasuries,
              European equities, Asian bonds) in their custody account at the foreign depository and
              <strong className="text-white/80"> issue unsponsored tokets</strong> on the UNITS Network representing those locked assets.
              This is a <span style={{ color: SG.red }}>programmable depositary receipt</span>, like ADRs/GDRs but tokenised,
              instant, and without legacy infrastructure overhead.
            </p>

            {/* Flow */}
            <div className="rounded-2xl overflow-hidden mb-6" style={{ background: SG.card, border: `1px solid ${SG.border}` }}>
              <div className="px-6 py-4" style={{ background: `${SG.red}08`, borderBottom: `1px solid ${SG.border}` }}>
                <h3 className="text-lg font-medium text-white/90">Issuance & redemption flow</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {/* Issuance */}
                  <div>
                    <div className="text-xs uppercase tracking-wider mb-3" style={{ color: `${SG.nusOrange}80` }}>Issuance</div>
                    <div className="space-y-2">
                      {[
                        { step: "1", label: "Lock", desc: "Participant locks traditional securities in their custody account at the foreign depository (e.g., US Treasury in BNY custody)", accent: SG.red },
                        { step: "2", label: "Verify", desc: "UNITS Network verifies the lock via custody confirmation. Proof of reserve established.", accent: SG.nusOrange },
                        { step: "3", label: "Mint", desc: "Unsponsored toket minted on the UNITS Network. Represents 1:1 claim on the locked underlying.", accent: SG.finternetCyan },
                        { step: "4", label: "Distribute", desc: "Toket available for 24/7 trading, DVP settlement, repo collateral, P-toket inclusion.", accent: SG.masTeal },
                      ].map((s, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 rounded-lg" style={{ background: `${s.accent}06` }}>
                          <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-bold" style={{ background: `${s.accent}15`, color: s.accent }}>
                            {s.step}
                          </div>
                          <div>
                            <span className="text-xs font-medium text-white/80">{s.label}: </span>
                            <span className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>{s.desc}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Redemption */}
                  <div>
                    <div className="text-xs uppercase tracking-wider mb-3" style={{ color: `${SG.masTeal}80` }}>Redemption</div>
                    <div className="space-y-2">
                      {[
                        { step: "1", label: "Burn", desc: "Holder burns the unsponsored toket on the UNITS Network", accent: SG.masTeal },
                        { step: "2", label: "Release", desc: "Burning triggers release of the underlying from the foreign custody account", accent: SG.finternetCyan },
                        { step: "3", label: "Deliver", desc: "Traditional security delivered to the holder's foreign custody account", accent: SG.nusOrange },
                      ].map((s, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 rounded-lg" style={{ background: `${s.accent}06` }}>
                          <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-bold" style={{ background: `${s.accent}15`, color: s.accent }}>
                            {s.step}
                          </div>
                          <div>
                            <span className="text-xs font-medium text-white/80">{s.label}: </span>
                            <span className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>{s.desc}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Example assets */}
            <div className="rounded-xl p-5 mb-6" style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${SG.border}` }}>
              <h4 className="text-sm font-semibold text-white/80 mb-3">Example: what becomes accessible</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {[
                  { name: "US Treasuries", region: "Americas" },
                  { name: "German Bunds", region: "Europe" },
                  { name: "JGBs", region: "Asia" },
                  { name: "UK Gilts", region: "Europe" },
                  { name: "Australian Bonds", region: "APAC" },
                  { name: "EU Equities", region: "Europe" },
                  { name: "US Equities", region: "Americas" },
                  { name: "Emerging Market Bonds", region: "Global" },
                ].map((a, i) => (
                  <div key={i} className="p-2 rounded-lg text-center" style={{ background: `${SG.finternetAmber}06` }}>
                    <div className="text-xs font-medium text-white/70">{a.name}</div>
                    <div className="text-[10px]" style={{ color: `${SG.finternetAmber}70` }}>{a.region}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Impact */}
            <div className="rounded-xl p-5" style={{ background: `${SG.red}06`, border: `1px solid ${SG.red}12` }}>
              <h4 className="text-sm font-semibold mb-2" style={{ color: SG.red }}>Impact</h4>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
                Any global security becomes accessible in Singapore 24/7 without the original issuer's involvement.
                A DBS client can hold a toket representing US Treasury bonds, trade it at 3am SGT, use it as repo
                collateral, and include it in a P-toket portfolio, all on the UNITS Network. Singapore becomes the
                gateway for round-the-clock access to world markets.
              </p>
            </div>
          </section>
        </RevealSection>

        {/* ADR/GDR Comparison */}
        <RevealSection id="comparison" delay={100}>
          <section>
            <h2 className="text-2xl font-light mb-6">Unsponsored tokets vs. <span className="font-semibold">ADRs/GDRs</span></h2>

            <div className="rounded-2xl overflow-hidden" style={{ background: SG.card, border: `1px solid ${SG.border}` }}>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ borderBottom: `1px solid ${SG.border}` }}>
                      <th className="text-left p-4 text-white/50 font-medium">Dimension</th>
                      <th className="text-left p-4 font-medium" style={{ color: "rgba(255,255,255,0.4)" }}>ADR/GDR</th>
                      <th className="text-left p-4 font-medium" style={{ color: `${SG.nusOrange}cc` }}>Unsponsored Toket</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { dim: "Issuer involvement", adr: "Often required (sponsored)", toket: "Never required" },
                      { dim: "Settlement", adr: "T+2, market hours", toket: "T+0, 24/7" },
                      { dim: "Issuance speed", adr: "Weeks to months", toket: "Minutes" },
                      { dim: "Fractional ownership", adr: "Limited", toket: "Native, any denomination" },
                      { dim: "Collateral use", adr: "Complex, separate process", toket: "Instant, protocol-level" },
                      { dim: "P-toket inclusion", adr: "Not possible", toket: "Native composability" },
                      { dim: "Regulatory reporting", adr: "Manual, periodic", toket: "Real-time via observer node" },
                      { dim: "Cost", adr: "Depositary bank fees, FX spreads", toket: "Network fees only" },
                    ].map((row, i) => (
                      <tr key={i} style={{ borderBottom: `1px solid ${SG.border}` }}>
                        <td className="p-4 text-white/70 font-medium">{row.dim}</td>
                        <td className="p-4" style={{ color: "rgba(255,255,255,0.4)" }}>{row.adr}</td>
                        <td className="p-4" style={{ color: "rgba(255,255,255,0.6)" }}>{row.toket}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </RevealSection>

        {/* UNITS Knowledge Base Links */}
        <div className="mt-16 p-6 rounded-xl" style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${SG.border}` }}>
          <p className="text-xs uppercase tracking-widest mb-4" style={{ color: "rgba(255,255,255,0.25)" }}>UNITS Knowledge Base</p>
          <div className="flex flex-wrap gap-3">
            {[
              { href: "/sg/deep-dive/dvp-settlement", label: "DvP Settlement" },
              { href: "/sg/deep-dive/collateral-highway", label: "Collateral Highway" },
              { href: "/sg/deep-dive/cross-ledger", label: "Cross-Ledger Connectivity" },
              { href: "/sg/deep-dive/token-programs", label: "Token Programs" },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="px-3 py-1.5 rounded-full text-xs transition-colors" style={{ color: "rgba(255,255,255,0.35)", border: `1px solid ${SG.border}` }}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-4 pt-8" style={{ borderTop: `1px solid ${SG.border}` }}>
          <Link href="/sg/architecture" className="flex items-center gap-2 text-sm transition-colors" style={{ color: "rgba(255,255,255,0.4)" }}>
            ← Network Architecture
          </Link>
          <div className="flex-1" />
          <Link href="/sg/assets" className="flex items-center gap-2 text-sm transition-colors" style={{ color: `${SG.finternetAmber}90` }}>
            Next: Asset Classes <ArrowRight className="w-3.5 h-3.5" />
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
