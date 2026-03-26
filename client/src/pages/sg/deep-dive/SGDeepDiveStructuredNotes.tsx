import { useRef, useState, useEffect } from "react";
import { Link } from "wouter";
import SGPortalNav, { SG } from "@/components/SGPortalNav";
import { CinematicBackground } from "@/components/motion";
import {
  Layers, Shield, ArrowRight, Code2, BookOpen,
  CheckCircle2, BarChart3, Coins, Building2,
  Landmark, Globe, ArrowRightLeft, TrendingUp,
  Zap, Lock, Eye, RefreshCw, Calculator, Timer,
  Package, GitBranch, FileText, Users, Scale
} from "lucide-react";

const SG_LOGO = "https://framerusercontent.com/images/DXJMn8XhMFOmkOFrvdVhSiFYsU.png";
const FINTERNET_LOGO = "https://framerusercontent.com/images/HVmPWKMOClR3MiXxlfsqGPug.png";

function RevealSection({ children, id, delay = 0 }: { children: React.ReactNode; id: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setTimeout(() => setVisible(true), delay); obs.disconnect(); } }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return (
    <div ref={ref} id={id} className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
      {children}
    </div>
  );
}

export default function SGDeepDiveStructuredNotes() {
  return (
    <div className="min-h-screen text-white relative" style={{ background: SG.dark }}>
      <CinematicBackground />
      <SGPortalNav />

      <div className="relative z-10 max-w-4xl mx-auto px-6 pt-28 pb-20 space-y-16">
        {/* Hero */}
        <section className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] uppercase tracking-widest" style={{ background: `${SG.masTeal}12`, color: SG.masTeal }}>
            Deep Dive
          </div>
          <h1 className="text-4xl md:text-5xl font-extralight tracking-tight">
            Structured <span className="font-semibold" style={{ color: SG.masTeal }}>Notes</span>
          </h1>
          <p className="text-base max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.55)" }}>
            How UNITS transforms structured products from opaque, illiquid instruments
            into transparent, composable, and programmable tokets with automated lifecycle management.
          </p>
          <div className="flex items-center justify-center gap-2 pt-2">
            <img src={SG_LOGO} alt="UNITS|SG" className="h-5 opacity-60" />
            <span className="text-[10px] uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.3)" }}>8-minute read</span>
          </div>
        </section>

        {/* The Problem with Structured Notes Today */}
        <RevealSection id="problem" delay={100}>
          <section>
            <h2 className="text-2xl font-light mb-4">The problem <span className="font-semibold">today</span></h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
              Structured notes are among the most complex instruments in capital markets.
              They combine a debt component with embedded derivatives to create customised
              risk-return profiles. In Singapore, structured notes are widely used by private
              wealth clients and institutional investors, but the current infrastructure
              creates significant friction.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { pain: "Opacity", desc: "Investors cannot see the underlying components, barrier levels, or real-time Greeks. They rely on monthly statements from the issuer.", icon: Eye, color: SG.red },
                { pain: "Illiquidity", desc: "Secondary market is thin. Bid-ask spreads of 2-5% are common. Investors are effectively locked in until maturity or autocall.", icon: Lock, color: SG.nusOrange },
                { pain: "Settlement complexity", desc: "Physical delivery at maturity requires coordination across multiple CSDs, time zones, and currencies. Partial delivery failures are common.", icon: Timer, color: SG.finternetAmber },
                { pain: "Manual lifecycle", desc: "Barrier observations, autocall checks, coupon calculations, and corporate action adjustments are all manual processes with T+3 to T+5 notification delays.", icon: RefreshCw, color: "#8b5cf6" },
                { pain: "Counterparty risk", desc: "The investor bears full credit risk of the issuer. No segregation of the underlying components. If the issuer defaults, recovery is uncertain.", icon: Shield, color: SG.finternetCyan },
                { pain: "Tax complexity", desc: "Cross-border structured notes involve multiple WHT jurisdictions for the underlying basket. Manual tax reclaim across 10-50 jurisdictions.", icon: Calculator, color: SG.masTeal },
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-xl" style={{ background: `${item.color}04`, border: `1px solid ${item.color}10` }}>
                  <div className="flex items-center gap-2 mb-2">
                    <item.icon className="w-4 h-4" style={{ color: item.color }} />
                    <div className="text-sm font-semibold text-white/90">{item.pain}</div>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </RevealSection>

        {/* Anatomy of a Tokenised Structured Note */}
        <RevealSection id="anatomy" delay={100}>
          <section>
            <h2 className="text-2xl font-light mb-4">Anatomy of a <span className="font-semibold">tokenised structured note</span></h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
              On UNITS, a structured note is decomposed into its constituent parts. Each part
              is a toket with its own Token Program. The composite instrument is itself a toket
              that references its components, making the entire structure transparent and programmable.
            </p>

            <div className="space-y-2">
              {[
                { layer: "Wrapper toket", desc: "The structured note itself. A composite toket that references all underlying components. Holds the term sheet parameters (barrier levels, autocall triggers, coupon schedule, maturity date) as on-chain metadata.", color: SG.masTeal, icon: Package },
                { layer: "Bond component", desc: "The fixed-income leg. A zero-coupon or coupon-bearing bond toket issued by the structuring bank. Provides the capital protection floor (if any). Accrues continuously via Token Program.", color: SG.finternetCyan, icon: Landmark },
                { layer: "Derivative overlay", desc: "The embedded option(s). Represented as derivative tokets with parameters (strike, barrier, observation dates, knock-in/knock-out levels) encoded in the Token Program. Greeks computed in real-time.", color: SG.finternetAmber, icon: TrendingUp },
                { layer: "Underlying basket", desc: "The reference assets. Can be equity tokets (sponsored or unsponsored), commodity tokets (gold, oil), FX pairs, or indices. Each underlying is independently observable on-chain.", color: SG.nusOrange, icon: BarChart3 },
                { layer: "Collateral pool", desc: "Segregated collateral backing the note. Unlike traditional structured notes where the investor bears full issuer credit risk, UNITS can require the issuer to post collateral in a segregated on-chain pool.", color: SG.red, icon: Shield },
              ].map((l, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-xl" style={{ background: `${l.color}04`, border: `1px solid ${l.color}10` }}>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${l.color}12` }}>
                    <l.icon className="w-5 h-5" style={{ color: l.color }} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white/90 mb-1">{l.layer}</div>
                    <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{l.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </RevealSection>

        {/* Token Programs for Structured Notes */}
        <RevealSection id="token-programs" delay={100}>
          <section>
            <h2 className="text-2xl font-light mb-4">Token Programs for <span className="font-semibold">structured notes</span></h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
              The lifecycle of a structured note is fully automated through Token Programs.
              Every event that traditionally requires manual processing, from barrier observations
              to autocall triggers to physical delivery, is handled by pre-hook/state/post-hook
              execution.
            </p>

            <div className="rounded-2xl overflow-hidden" style={{ background: SG.card, border: `1px solid ${SG.border}` }}>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ borderBottom: `1px solid ${SG.border}` }}>
                      <th className="text-left p-4 text-white/50 font-medium">Lifecycle event</th>
                      <th className="text-left p-4 text-white/50 font-medium">Today</th>
                      <th className="text-left p-4 font-medium" style={{ color: SG.masTeal }}>On UNITS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { event: "Barrier observation", today: "Manual check by back office at market close. Results communicated T+1 to T+3 via email or statement.", units: "Token Program reads underlying toket prices at observation timestamp. Result recorded on-chain instantly. Investor notified in real-time." },
                      { event: "Autocall trigger", today: "Issuer checks conditions on observation date. If triggered, sends early redemption notice. Settlement in T+5 to T+10.", units: "Token Program evaluates autocall condition automatically. If triggered, burns the note toket and distributes redemption amount atomically. Settlement in seconds." },
                      { event: "Coupon calculation", today: "Calculated by issuer based on observation levels. Paid quarterly or semi-annually. Investor sees result weeks after observation.", units: "Token Program computes coupon in real-time based on underlying levels. Accrues continuously. Distributed automatically on payment date." },
                      { event: "Physical delivery", today: "At maturity, issuer delivers underlying basket. Requires coordination across CSDs. 5-10 business days. Partial failures common.", units: "Atomic cross-asset conversion: note toket burned, underlying equity/commodity tokets minted directly into investor wallet. Seconds, not days." },
                      { event: "Knock-in event", today: "Monitored by issuer. Investor may not know until next statement. Protection level change communicated retroactively.", units: "Token Program monitors continuously. Knock-in recorded on-chain the instant it occurs. Investor wallet reflects updated risk profile immediately." },
                      { event: "Corporate action on underlying", today: "Issuer adjusts terms manually. New term sheet issued. Investor informed weeks later.", units: "Underlying toket's Token Program propagates corporate action. Wrapper toket adjusts automatically. Barrier levels, strike prices recalculated in real-time." },
                    ].map((row, i) => (
                      <tr key={i} style={{ borderBottom: `1px solid ${SG.border}` }}>
                        <td className="p-4 text-white/70 font-medium text-xs">{row.event}</td>
                        <td className="p-4 text-white/40 text-xs">{row.today}</td>
                        <td className="p-4 text-white/55 text-xs">{row.units}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </RevealSection>

        {/* Singapore Structured Note Types */}
        <RevealSection id="sg-types" delay={100}>
          <section>
            <h2 className="text-2xl font-light mb-4">Singapore <span className="font-semibold">structured note types</span></h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
              The following structured note types are commonly issued and distributed in
              Singapore. Each benefits from tokenisation on UNITS in specific ways.
            </p>

            <div className="space-y-3">
              {[
                {
                  type: "Equity-Linked Notes (ELN)",
                  underlying: "STI components, US tech, Euro Stoxx 50",
                  structure: "Capital-at-risk with enhanced coupon. Barrier at 60-70% of initial level. Autocall at 100-105%.",
                  unitsAdvantage: "Real-time barrier monitoring via Token Program. Underlying equity tokets (sponsored for STI, unsponsored for US/EU) observable on-chain. Autocall settlement in seconds vs T+5.",
                  color: SG.masTeal,
                  icon: TrendingUp,
                },
                {
                  type: "Fixed Coupon Notes (FCN)",
                  underlying: "Single stock or basket (DBS, OCBC, UOB common)",
                  structure: "Fixed coupon (8-15% p.a.) with knock-in barrier. Physical delivery if barrier breached at maturity.",
                  unitsAdvantage: "Continuous knock-in monitoring. If physical delivery triggered, underlying bank equity tokets delivered atomically. No CSD coordination needed.",
                  color: SG.finternetAmber,
                  icon: Coins,
                },
                {
                  type: "Accumulator / Decumulator",
                  underlying: "Single stock with daily observation",
                  structure: "Daily accumulation at discount if above strike. Double accumulation if below knock-in. Knock-out if above barrier.",
                  unitsAdvantage: "Token Program executes daily observation and accumulation automatically. Each accumulated lot is a separate toket. Investor sees real-time position build-up.",
                  color: SG.nusOrange,
                  icon: BarChart3,
                },
                {
                  type: "Range Accrual Notes",
                  underlying: "Interest rates (SORA, SOFR) or FX (USD/SGD)",
                  structure: "Coupon accrues only on days when reference rate is within specified range. Enhanced yield for range-bound view.",
                  unitsAdvantage: "Token Program checks range condition daily and updates accrual in real-time. Investor sees exact accrual days and projected coupon continuously.",
                  color: SG.finternetCyan,
                  icon: Calculator,
                },
                {
                  type: "Principal-Protected Notes",
                  underlying: "Multi-asset basket (equities + commodities + FX)",
                  structure: "100% capital protection at maturity. Participation in upside of underlying basket. Typically 3-5 year tenor.",
                  unitsAdvantage: "Bond component and derivative overlay separately visible. Collateral pool ensures protection is real, not just an issuer promise. Transparent Greeks.",
                  color: "#8b5cf6",
                  icon: Shield,
                },
              ].map((note, i) => (
                <div key={i} className="rounded-xl overflow-hidden" style={{ border: `1px solid ${note.color}12` }}>
                  <div className="px-5 py-3 flex items-center gap-3" style={{ background: `${note.color}08` }}>
                    <note.icon className="w-5 h-5" style={{ color: note.color }} />
                    <div className="text-sm font-semibold text-white/90">{note.type}</div>
                  </div>
                  <div className="p-5 space-y-3" style={{ background: `${note.color}03` }}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="p-3 rounded-lg" style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${SG.border}` }}>
                        <div className="text-[10px] uppercase tracking-wider mb-1 text-white/30">Underlying</div>
                        <p className="text-[11px] leading-relaxed text-white/50">{note.underlying}</p>
                      </div>
                      <div className="p-3 rounded-lg" style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${SG.border}` }}>
                        <div className="text-[10px] uppercase tracking-wider mb-1 text-white/30">Structure</div>
                        <p className="text-[11px] leading-relaxed text-white/50">{note.structure}</p>
                      </div>
                      <div className="p-3 rounded-lg" style={{ background: `${note.color}06`, border: `1px solid ${note.color}10` }}>
                        <div className="text-[10px] uppercase tracking-wider mb-1" style={{ color: note.color }}>UNITS advantage</div>
                        <p className="text-[11px] leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>{note.unitsAdvantage}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </RevealSection>

        {/* Issuance on UNITS */}
        <RevealSection id="issuance" delay={100}>
          <section>
            <h2 className="text-2xl font-light mb-4">Issuance on <span className="font-semibold">UNITS</span></h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
              Structured note issuance on UNITS follows a five-step process. The issuer
              (typically a bank like DBS, UOB, or OCBC) creates the composite toket with
              all parameters encoded in the Token Program.
            </p>

            <div className="space-y-2">
              {[
                { step: "1", label: "Term sheet encoding", desc: "The issuer encodes all term sheet parameters into the Token Program: barrier levels, autocall triggers, coupon formula, observation dates, maturity date, physical delivery rules. These become immutable on-chain rules.", color: SG.masTeal, icon: FileText },
                { step: "2", label: "Underlying linking", desc: "The Token Program is linked to the underlying tokets (equity, commodity, FX). For Singapore equities, these are sponsored tokets via CDP. For foreign securities, these are unsponsored tokets via the cross-ledger adapter.", color: SG.finternetCyan, icon: GitBranch },
                { step: "3", label: "Collateral posting", desc: "The issuer posts collateral into a segregated on-chain pool. The collateral ratio is enforced by the Token Program. If the ratio falls below threshold, the program triggers a margin call or automatic top-up.", color: SG.finternetAmber, icon: Lock },
                { step: "4", label: "Distribution", desc: "The structured note toket is distributed to investors via the issuer's platform (e.g., DBS digibank, UOB TMRW). Investors receive the toket in their UNITS wallet. Compliance gates check accredited investor status.", color: SG.nusOrange, icon: Users },
                { step: "5", label: "Lifecycle activation", desc: "From the moment of issuance, the Token Program begins executing: monitoring barriers, accruing coupons, checking autocall conditions, and processing corporate actions on the underlying. Fully automated.", color: "#8b5cf6", icon: Zap },
              ].map((s, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-xl" style={{ background: `${s.color}04`, border: `1px solid ${s.color}10` }}>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${s.color}12` }}>
                    <s.icon className="w-5 h-5" style={{ color: s.color }} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: `${s.color}15`, color: s.color }}>Step {s.step}</span>
                      <span className="text-sm font-medium text-white/90">{s.label}</span>
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </RevealSection>

        {/* Marketnode Integration */}
        <RevealSection id="marketnode" delay={100}>
          <section>
            <h2 className="text-2xl font-light mb-4">Marketnode <span className="font-semibold">integration</span></h2>
            <div className="p-5 rounded-xl" style={{ background: `${SG.finternetAmber}06`, border: `1px solid ${SG.finternetAmber}12` }}>
              <div className="flex items-start gap-3">
                <Building2 className="w-5 h-5 shrink-0 mt-0.5" style={{ color: SG.finternetAmber }} />
                <div>
                  <div className="text-sm font-medium text-white/80 mb-2">Marketnode as structuring platform</div>
                  <p className="text-xs leading-relaxed mb-3" style={{ color: "rgba(255,255,255,0.5)" }}>
                    Marketnode, backed by SGX Group and Euroclear, operates as a digital market
                    infrastructure for bond issuance and structured products. On UNITS, Marketnode
                    serves as the primary structuring and issuance platform for tokenised structured notes.
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      "Term sheet digitisation and encoding",
                      "Regulatory filing with MAS",
                      "Distribution to private banks",
                      "Lifecycle event processing",
                      "Secondary market facilitation",
                      "Cross-border settlement via Euroclear link",
                    ].map((cap, i) => (
                      <div key={i} className="flex items-center gap-2 text-[11px]" style={{ color: "rgba(255,255,255,0.45)" }}>
                        <CheckCircle2 className="w-3 h-3 shrink-0" style={{ color: SG.finternetAmber }} />
                        {cap}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </RevealSection>

        {/* Impact */}
        <RevealSection id="impact" delay={100}>
          <section>
            <div className="p-6 rounded-2xl" style={{ background: `${SG.masTeal}06`, border: `1px solid ${SG.masTeal}12` }}>
              <h3 className="text-lg font-semibold text-white/90 mb-3">Transforming structured products</h3>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                Tokenised structured notes on UNITS transform every aspect of the product:
                from opaque to transparent (all components visible on-chain), from illiquid
                to tradeable (24/7 secondary market with atomic DvP), from manual to automated
                (Token Programs handle the entire lifecycle), and from unsecured to collateralised
                (segregated on-chain collateral pools). For Singapore's private wealth market,
                where structured notes are a core product, this represents a fundamental upgrade
                in investor protection, operational efficiency, and market access.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                {[
                  { metric: "100%", label: "Component transparency" },
                  { metric: "24/7", label: "Secondary trading" },
                  { metric: "T+0", label: "Physical delivery" },
                  { metric: "Real-time", label: "Barrier monitoring" },
                ].map((m, i) => (
                  <div key={i} className="text-center p-3 rounded-lg" style={{ background: "rgba(255,255,255,0.03)" }}>
                    <div className="text-xl font-bold" style={{ color: SG.masTeal }}>{m.metric}</div>
                    <div className="text-[10px] text-white/40 mt-1">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </RevealSection>

        {/* Knowledge Base */}
        <RevealSection id="knowledge-base" delay={100}>
          <section>
            <div className="flex items-center gap-3 mb-6">
              <img src={SG_LOGO} alt="UNITS|SG" className="h-6" />
              <h2 className="text-xl font-light">UNITS <span className="font-semibold">Knowledge Base</span></h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { label: "Token Programs", href: "/sg/deep-dive/token-programs", desc: "Lifecycle automation and programmable rules" },
                { label: "P-Tokets (Portfolios)", href: "/sg/deep-dive/p-tokets", desc: "Composable portfolio tokets" },
                { label: "Unsponsored Tokets", href: "/sg/deep-dive/unsponsored-tokets", desc: "Global securities as programmable receipts" },
                { label: "Cross-Ledger Connectivity", href: "/sg/deep-dive/cross-ledger", desc: "Adapter architecture and state commitments" },
                { label: "DvP Settlement", href: "/sg/deep-dive/dvp-settlement", desc: "Atomic settlement mechanics" },
                { label: "Cross-Border Settlement", href: "/sg/workflow/cross-border-settlement", desc: "Multi-corridor settlement workflow" },
                { label: "Collateral Highway", href: "/sg/deep-dive/collateral-highway", desc: "Cross-depository collateral mobilisation" },
                { label: "Asset Classes", href: "/sg/assets", desc: "Nine asset classes on UNITS|SG" },
              ].map((link, i) => (
                <Link key={i} href={link.href} className="flex items-start gap-3 p-3 rounded-lg transition-all hover:bg-white/[0.03]" style={{ border: `1px solid ${SG.border}` }}>
                  <BookOpen className="w-4 h-4 shrink-0 mt-0.5" style={{ color: `${SG.masTeal}60` }} />
                  <div>
                    <div className="text-sm text-white/70 hover:text-white/90 transition-colors">{link.label}</div>
                    <div className="text-[10px] mt-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>{link.desc}</div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </RevealSection>

        {/* Footer */}
        <div className="pt-12 border-t" style={{ borderColor: SG.border }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={SG_LOGO} alt="UNITS|SG" className="h-8 opacity-40" />
              <div>
                <div className="text-xs text-white/30">UNITS|SG</div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.15)" }}>Powered by</span>
                  <img src={FINTERNET_LOGO} alt="Finternet Labs" className="h-3 opacity-20" />
                </div>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>GL1-compliant</span>
            </div>
          </div>
          <p className="text-xs mt-3" style={{ color: "rgba(255,255,255,0.12)" }}>
            This is a conceptual blueprint for discussion purposes. Not an offer of services.
          </p>
        </div>
      </div>
    </div>
  );
}
