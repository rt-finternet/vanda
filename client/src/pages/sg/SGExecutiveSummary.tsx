import { useRef, useState, useEffect } from "react";
import { Link } from "wouter";
import SGPortalNav, { SG } from "@/components/SGPortalNav";
import { CrossPersonaCallout } from "@/components/IPEComponents";
import { GlowingOrb, AnimatedCounter } from "@/components/motion";
import {
  ChevronDown, ArrowRight, Zap, Layers, Shield, Network,
  Landmark, Building2, Globe, Clock, Eye, Scale,
  Wallet, Gem, Users, ArrowRightLeft, BookOpen,
  MessageSquare, RefreshCw, Link2
} from "lucide-react";

const FINTERNET_LOGO_WHITE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663328851912/82pWKmUqBRkgn8Ladat8sj/yP0fvxrB3mwq_e7583308.png";
const SG_LOGO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663328851912/82pWKmUqBRkgn8Ladat8sj/units-sg-orchid-logo-light-KqELedrzeYmCnakJE4pQSh.png";

/* ── Helpers ── */
function SGBadge() {
  return (
    <span className="text-4xl md:text-5xl lg:text-6xl font-light tracking-wide">
      UNITS<span className="font-semibold" style={{ color: SG.red }}>|</span>
      <span className="font-semibold" style={{ color: SG.nusOrange }}>SG</span>
    </span>
  );
}

function SectionNumber({ num, accent = SG.nusOrange }: { num: number; accent?: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold"
        style={{ background: `${accent}20`, border: `1px solid ${accent}30`, color: accent }}
      >
        {num}
      </div>
      <div className="h-px flex-1" style={{ background: `linear-gradient(to right, ${accent}30, transparent)` }} />
    </div>
  );
}

function RevealSection({ id, children, delay = 0 }: { id: string; children: React.ReactNode; delay?: number }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      data-section={id}
      className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    >
      {children}
    </div>
  );
}

/* ── Main Page ── */
export default function SGExecutiveSummary() {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen text-white" style={{ background: SG.dark }}>
      <SGPortalNav />

      {/* ── Hero ── */}
      <section className="relative min-h-[85vh] flex flex-col items-center justify-center px-6 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0" style={{
          background: `linear-gradient(135deg, ${SG.dark} 0%, #0D1F3A 30%, #122B4A 60%, #0F2440 100%)`
        }} />
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }} />
        {/* Cinematic Glowing Orb */}
        <GlowingOrb />

        <div className="relative z-10 text-center max-w-3xl mx-auto">
          {/* SG Orchid Logo */}
          <div className="mb-6 flex flex-col items-center gap-4">
            <img src={SG_LOGO} alt="UNITS|SG" className="h-28 md:h-36 w-auto object-contain drop-shadow-[0_0_30px_rgba(238,37,54,0.15)]" />
            <span className="text-xs font-medium tracking-[0.2em] uppercase" style={{ color: SG.nusOrange }}>
              Singapore Financial Infrastructure
            </span>
          </div>

          <SGBadge />

          <p className="mt-6 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.6)" }}>
            A permissioned network layer using UNITS architecture that unifies Singapore's two depositories,
            enables <span style={{ color: SG.finternetAmber }}>24/7 settlement</span>, and brings tokenised securities,
            gold, stablecoins, and private credit onto a single programmable infrastructure.
          </p>

          <div className="mt-4 flex items-center justify-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>
            <span>Powered by</span>
            <img src={FINTERNET_LOGO_WHITE} alt="Finternet" className="h-5 opacity-50" />
          </div>

          <button
            onClick={() => contentRef.current?.scrollIntoView({ behavior: "smooth" })}
            className="mt-12 flex flex-col items-center gap-2 mx-auto group transition-colors"
            style={{ color: `${SG.nusOrange}80` }}
          >
            <span className="text-xs tracking-widest uppercase group-hover:text-white/60">5-minute read</span>
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </button>
        </div>
      </section>

      {/* ── Content ── */}
      <div ref={contentRef} className="max-w-3xl mx-auto px-6 pb-24 space-y-24">

        {/* Section 1: The Problem */}
        <RevealSection id="problem">
          <section>
            <SectionNumber num={1} accent={SG.red} />
            <h2 className="text-2xl md:text-3xl font-light mb-6">
              Why Singapore needs a <span className="font-semibold">unified network</span>
            </h2>
            <p className="text-lg leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
              Singapore has <strong className="text-white/90">two separate depositories</strong> that do not talk to each other.
              SGX CDP holds equities and corporate bonds. MAS MEPS+ holds government securities and processes interbank payments.
              Every tokenisation initiative (DBS DDEx, InvestaX, DigiFT, Sygnum) operates on its own isolated platform.
            </p>
            <p className="text-lg leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.6)" }}>
              The result: <strong className="text-white/90">fragmented liquidity</strong>, no unified portfolio view,
              and no way to use an SGS bond as collateral for an equity repo without manual processes across multiple systems.
              Building a third depository would only make this worse. The answer is a <span style={{ color: SG.nusOrange }}>network layer above both</span>.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="p-5 rounded-xl" style={{ background: `${SG.red}08`, border: `1px solid ${SG.red}15` }}>
                <div className="flex items-center gap-2 mb-3">
                  <Building2 className="w-5 h-5" style={{ color: SG.red }} />
                  <span className="text-sm font-semibold text-white/90">SGX CDP</span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                  Equities, corporate bonds, ETFs, REITs, warrants. T+2 settlement. SGD 1.2T+ under custody.
                </p>
              </div>
              <div className="p-5 rounded-xl" style={{ background: `${SG.masTeal}08`, border: `1px solid ${SG.masTeal}15` }}>
                <div className="flex items-center gap-2 mb-3">
                  <Landmark className="w-5 h-5" style={{ color: SG.masTeal }} />
                  <span className="text-sm font-semibold text-white/90">MAS MEPS+</span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                  SGS bonds, T-bills, MAS Bills, interbank SGD. Real-time gross settlement. Backbone of wholesale payments.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 rounded-xl" style={{ background: SG.card, border: `1px solid ${SG.border}` }}>
                <div className="text-xl md:text-2xl font-bold mb-1" style={{ color: SG.nusOrange }}>
                  <AnimatedCounter value={4.7} prefix="US$" suffix="T" decimals={1} />
                </div>
                <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>AUM in Singapore</div>
              </div>
              <div className="text-center p-4 rounded-xl" style={{ background: SG.card, border: `1px solid ${SG.border}` }}>
                <div className="text-xl md:text-2xl font-bold mb-1" style={{ color: SG.red }}>
                  <AnimatedCounter value={2} />
                </div>
                <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>Separate Depositories</div>
              </div>
              <div className="text-center p-4 rounded-xl" style={{ background: SG.card, border: `1px solid ${SG.border}` }}>
                <div className="text-xl md:text-2xl font-bold mb-1" style={{ color: SG.masTeal }}>
                  <AnimatedCounter value={5} suffix="+" />
                </div>
                <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>Isolated Token Platforms</div>
              </div>
            </div>

            <Link href="/sg/problem" className="inline-flex items-center gap-2 text-sm transition-colors" style={{ color: `${SG.red}90` }}>
              Go deeper: Fragmented Infrastructure <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </section>
        </RevealSection>

        {/* Section 2: The Solution */}
        <RevealSection id="solution" delay={100}>
          <section>
            <SectionNumber num={2} accent={SG.masTeal} />
            <h2 className="text-2xl md:text-3xl font-light mb-6">
              A <span className="font-semibold">network layer</span>, not a third depository
            </h2>
            <p className="text-lg leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.6)" }}>
              The UNITS Network Singapore creates a <strong className="text-white/90">permissioned protocol layer</strong> that
              sits above both SGX CDP and MAS MEPS+. It does not replace either depository. Instead, it connects them through
              a common set of standards: tokenClasses for asset definitions, tokenPools for issuance management, and the UILP
              protocol for distribution rules and compliance enforcement.
            </p>

            {/* Architecture preview */}
            <div className="rounded-2xl overflow-hidden mb-6" style={{ background: SG.card, border: `1px solid ${SG.border}` }}>
              <div className="px-6 py-4" style={{ background: "rgba(255,255,255,0.02)", borderBottom: `1px solid ${SG.border}` }}>
                <div className="text-xs uppercase tracking-widest mb-1" style={{ color: `${SG.masTeal}80` }}>Architecture</div>
                <h3 className="text-lg font-medium text-white/90">Three-Layer Stack</h3>
              </div>
              <div className="p-6 space-y-3">
                {[
                  { layer: "GL1-Compliant Infrastructure", desc: "UNITS as GL1-compliant shared ledger, multi-network compatible, endorsed by MAS, BNY, Citi, J.P. Morgan, DBS, HSBC, MUFG", color: SG.masTeal },
                  { layer: "UNITS Network (Protocol)", desc: "tokenClasses, tokenPools, UILP gates, wallet registry, distribution rules", color: SG.nusOrange },
                  { layer: "Participant Apps", desc: "Bank issuance portals, distribution interfaces, BYOW custody", color: SG.finternetCyan },
                ].map((l, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-lg" style={{ background: `${l.color}08` }}>
                    <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: l.color }} />
                    <div>
                      <div className="text-sm font-semibold text-white/85">{l.layer}</div>
                      <div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.45)" }}>{l.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {[
                { icon: <Wallet className="w-5 h-5" />, label: "BYOW", desc: "Banks bring their own wallets" },
                { icon: <Shield className="w-5 h-5" />, label: "Common Rules", desc: "UILP enforces compliance" },
                { icon: <Eye className="w-5 h-5" />, label: "MAS Observer", desc: "Real-time supervisory view" },
                { icon: <Globe className="w-5 h-5" />, label: "Multi-Chain", desc: "Works across blockchains" },
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-xl" style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${SG.border}` }}>
                  <div className="mb-3" style={{ color: SG.masTeal }}>{item.icon}</div>
                  <div className="text-sm font-medium text-white/80 mb-1">{item.label}</div>
                  <div className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>{item.desc}</div>
                </div>
              ))}
            </div>

            <div className="p-5 rounded-xl mb-6" style={{ background: `${SG.masTeal}08`, border: `1px solid ${SG.masTeal}15` }}>
              <h4 className="text-sm font-semibold mb-2" style={{ color: SG.masTeal }}>GL1 Standards Compliance</h4>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                GL1 defines the standards and compliance benchmark for tokenised asset infrastructure.
                Its members include HSBC, J.P. Morgan, MUFG, and Standard Chartered among other major global institutions.
                The UNITS Network is designed to be fully GL1-compliant, making it the first real infrastructure
                that meets these standards for Singapore's domestic market.
              </p>
            </div>

            <Link href="/sg/architecture" className="inline-flex items-center gap-2 text-sm transition-colors" style={{ color: `${SG.masTeal}90` }}>
              Go deeper: Network Architecture & GL1 Compliance <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </section>
        </RevealSection>

        {/* Section 3: What Changes? */}
        <RevealSection id="what-changes" delay={100}>
          <section>
            <SectionNumber num={3} accent={SG.finternetCyan} />
            <h2 className="text-2xl md:text-3xl font-light mb-6">
              What <span className="font-semibold">changes</span>?
            </h2>
            <p className="text-lg leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.6)" }}>
              Three transformative capabilities that no existing Singapore infrastructure provides.
            </p>

            <div className="space-y-6">
              {[
                {
                  icon: <Clock className="w-5 h-5" />,
                  title: "24/7 Atomic Settlement",
                  desc: "Participants settle DVP transactions around the clock, across weekends and holidays. Combined with SCS-regulated stablecoins as settlement currency, the network enables atomic delivery-versus-payment at any time. A wealth manager in Singapore can execute and settle a gold toket purchase at 2am SGT for a European client.",
                  accent: SG.finternetCyan,
                  stats: [
                    { value: "T+0", label: "Settlement" },
                    { value: "24/7", label: "Operating Hours" },
                    { value: "Atomic", label: "DVP Guarantee" },
                  ],
                },
                {
                  icon: <RefreshCw className="w-5 h-5" />,
                  title: "Repo & Financing Against Tokenised Assets",
                  desc: "Participants pledge tokenised financial assets and commodities (gold tokets) as collateral for repo transactions. Smart contracts manage real-time mark-to-market, auto margin calls, automatic release on maturity, and tri-party repo, replacing bilateral agreements with neutral infrastructure.",
                  accent: SG.nusOrange,
                  stats: [
                    { value: "Real-time", label: "Mark-to-Market" },
                    { value: "Auto", label: "Margin Calls" },
                    { value: "Tri-Party", label: "Repo Support" },
                  ],
                },
                {
                  icon: <Link2 className="w-5 h-5" />,
                  title: "Unsponsored Tokets (Programmable Depositary Receipts)",
                  desc: "Lock traditional securities (US Treasuries, European equities, Asian bonds) in a foreign custody account and issue unsponsored tokets on the UNITS Network. Like ADRs/GDRs but tokenised, instant, and without legacy infrastructure overhead. Any global security becomes accessible in Singapore 24/7.",
                  accent: SG.red,
                  stats: [
                    { value: "Any", label: "Global Security" },
                    { value: "24/7", label: "Accessibility" },
                    { value: "Instant", label: "Issuance" },
                  ],
                },
              ].map((cap, i) => (
                <div key={i} className="p-5 rounded-xl" style={{ background: `${cap.accent}06`, border: `1px solid ${cap.accent}15` }}>
                  <div className="flex items-center gap-2 mb-3">
                    <div style={{ color: cap.accent }}>{cap.icon}</div>
                    <h3 className="text-base font-semibold text-white/90">{cap.title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.55)" }}>{cap.desc}</p>
                  <div className="grid grid-cols-3 gap-3">
                    {cap.stats.map((s, j) => (
                      <div key={j} className="text-center p-2 rounded-lg" style={{ background: `${cap.accent}10` }}>
                        <div className="text-sm font-bold" style={{ color: cap.accent }}>{s.value}</div>
                        <div className="text-[10px]" style={{ color: "rgba(255,255,255,0.35)" }}>{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <Link href="/sg/capabilities" className="inline-flex items-center gap-2 mt-6 text-sm transition-colors" style={{ color: `${SG.finternetCyan}90` }}>
              Go deeper: Transformative Capabilities <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </section>
        </RevealSection>

        {/* Section 4: Asset Classes */}
        <RevealSection id="assets" delay={100}>
          <section>
            <SectionNumber num={4} accent={SG.finternetAmber} />
            <h2 className="text-2xl md:text-3xl font-light mb-6">
              <span className="font-semibold">Nine</span> asset classes, one network
            </h2>
            <p className="text-lg leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.6)" }}>
              Every asset class is represented as a tokenClass with standardised lifecycle management.
              Participants can compose any combination into P-tokets for holistic portfolio management.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
              {[
                { icon: <ArrowRightLeft className="w-4 h-4" />, name: "Equities & REITs", accent: SG.red },
                { icon: <Landmark className="w-4 h-4" />, name: "Government Securities", accent: SG.masTeal },
                { icon: <Gem className="w-4 h-4" />, name: "Gold & Precious Metals", accent: SG.finternetAmber, href: "/sg/deep-dive/precious-metals" },
                { icon: <Scale className="w-4 h-4" />, name: "SCS Stablecoins", accent: SG.nusOrange },
                { icon: <Layers className="w-4 h-4" />, name: "Structured Notes & CDs", accent: SG.finternetCyan },
                { icon: <Shield className="w-4 h-4" />, name: "Private Credit & Loans", accent: SG.red },
                { icon: <Globe className="w-4 h-4" />, name: "VCC Fund Interests", accent: SG.masTeal, href: "/sg/deep-dive/vcc" },
                { icon: <Network className="w-4 h-4" />, name: "P-Tokets (Portfolios)", accent: SG.nusOrange },
                { icon: <Link2 className="w-4 h-4" />, name: "Unsponsored Tokets", accent: SG.finternetAmber },
              ].map((a: any, i: number) => {
                const inner = (
                  <div key={i} className={`flex items-center gap-3 p-3 rounded-lg transition-all ${a.href ? 'cursor-pointer hover:scale-[1.02]' : ''}`} style={{ background: `${a.accent}08`, border: `1px solid ${a.accent}12` }}>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${a.accent}15` }}>
                      <span style={{ color: a.accent }}>{a.icon}</span>
                    </div>
                    <span className="text-sm font-medium text-white/80">{a.name}</span>
                    {a.href && <ArrowRight className="w-3 h-3 ml-auto" style={{ color: `${a.accent}60` }} />}
                  </div>
                );
                return a.href ? <Link key={i} href={a.href}>{inner}</Link> : inner;
              })}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link href="/sg/deep-dive/precious-metals">
                <div className="p-5 rounded-xl cursor-pointer transition-all hover:scale-[1.01]" style={{ background: `${SG.finternetAmber}08`, border: `1px solid ${SG.finternetAmber}15` }}>
                  <h4 className="text-sm font-semibold mb-2 flex items-center gap-2" style={{ color: SG.finternetAmber }}>
                    <Gem className="w-4 h-4" /> Precious Metals Highlight
                  </h4>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                    Singapore is Asia's premier gold hub with SBMA Good Delivery standards, FTZ vaults, and IPM GST exemption.
                    UNITS tokenises LBMA/SBMA kilobars into gram-denominated tokets for fractional ownership and collateral use.
                  </p>
                </div>
              </Link>
              <Link href="/sg/deep-dive/vcc">
                <div className="p-5 rounded-xl cursor-pointer transition-all hover:scale-[1.01]" style={{ background: `${SG.masTeal}08`, border: `1px solid ${SG.masTeal}15` }}>
                  <h4 className="text-sm font-semibold mb-2 flex items-center gap-2" style={{ color: SG.masTeal }}>
                    <Globe className="w-4 h-4" /> VCC Tokenisation Highlight
                  </h4>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                    Singapore has 1,300+ Variable Capital Companies. Tokenising VCC ownership enables smart contract-driven
                    NAV calculation, automated subscription/redemption, and inclusion in P-tokets alongside direct securities and gold.
                  </p>
                </div>
              </Link>
            </div>

            <Link href="/sg/assets" className="inline-flex items-center gap-2 mt-6 text-sm transition-colors" style={{ color: `${SG.finternetAmber}90` }}>
              Go deeper: All Nine Asset Classes <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </section>
        </RevealSection>

        {/* Section 5: Funding & Participants */}
        <RevealSection id="funding" delay={100}>
          <section>
            <SectionNumber num={5} accent={SG.nusOrange} />
            <h2 className="text-2xl md:text-3xl font-light mb-6">
              How do we <span className="font-semibold">fund it</span>?
            </h2>
            <p className="text-lg leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.6)" }}>
              Bootstrapped through MAS's existing grant infrastructure, minimising upfront capital.
              The network can be minimally funded via an Institute of Programmable Finance grant,
              with FSTI 3.0 Track 2 providing up to 50% co-funding for industry-wide infrastructure.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="p-5 rounded-xl" style={{ background: `${SG.nusOrange}08`, border: `1px solid ${SG.nusOrange}15` }}>
                <h3 className="text-base font-medium text-white/85 mb-3">FSTI 3.0 Track 2</h3>
                <ul className="space-y-2 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: SG.nusOrange }} />
                    <span>Up to 50% co-funding on manpower, professional services, software</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: SG.nusOrange }} />
                    <span>24-month funding period for industry-wide financial infrastructure</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: SG.nusOrange }} />
                    <span>MAS integration grants help banks connect to the network</span>
                  </li>
                </ul>
              </div>

              <div className="p-5 rounded-xl" style={{ background: `${SG.nusBlue}20`, border: `1px solid ${SG.nusBlue}30` }}>
                <h3 className="text-base font-medium text-white/85 mb-3">Institute of Programmable Finance</h3>
                <ul className="space-y-2 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: "#6B9FD4" }} />
                    <span>Research grant for protocol design and governance framework</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: "#6B9FD4" }} />
                    <span>Academic contribution to smart contract verification</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: "#6B9FD4" }} />
                    <span>Minimal funding path to bootstrap the network</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Key participants preview */}
            <div className="p-5 rounded-xl" style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${SG.border}` }}>
              <h4 className="text-sm font-semibold text-white/80 mb-3">Key Participants (40+ from Project Guardian)</h4>
              <div className="flex flex-wrap gap-2">
                {["DBS", "OCBC", "UOB", "Standard Chartered", "SGX", "MAS", "Temasek", "GIC",
                  "HSBC", "J.P. Morgan", "Citi", "InvestaX", "DigiFT", "Sygnum", "Matrixdock", "Phillip Securities"
                ].map((p, i) => (
                  <span key={i} className="text-xs px-2.5 py-1 rounded-full" style={{ background: `${SG.nusOrange}12`, color: `${SG.nusOrange}cc` }}>{p}</span>
                ))}
              </div>
            </div>

            <Link href="/sg/funding" className="inline-flex items-center gap-2 mt-6 text-sm transition-colors" style={{ color: `${SG.nusOrange}90` }}>
              Go deeper: Funding & Participants <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </section>
        </RevealSection>

        {/* Section 6: Why This Works */}
        <RevealSection id="why-works" delay={100}>
          <section>
            <SectionNumber num={6} accent={SG.red} />
            <h2 className="text-2xl md:text-3xl font-light mb-6">
              Why this <span className="font-semibold">works</span> for Singapore
            </h2>
            <p className="text-lg leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.6)" }}>
              Singapore has every ingredient: progressive regulation, world-class financial institutions,
              and the political will to lead. The UNITS Network is the missing infrastructure layer.
            </p>

            <div className="space-y-4">
              {[
                { title: "No third depository needed", desc: "The network layer unifies existing CDP and MEPS+ infrastructure. No new depository, just a protocol that connects them.", accent: SG.red },
                { title: "Portfolio integrity for the first time", desc: "A participant's full portfolio across CDP, MEPS+, gold, stablecoins, and private credit is visible and verifiable in one place.", accent: SG.nusOrange },
                { title: "Collateral mobility", desc: "Assets in CDP can be used as collateral for MEPS+ operations through the network. Gold tokets can back repo transactions. End of fragmentation.", accent: SG.masTeal },
                { title: "Global access via unsponsored tokets", desc: "Any global security becomes accessible in Singapore 24/7. Singapore becomes the gateway for round-the-clock access to world markets.", accent: SG.finternetCyan },
                { title: "Regulatory clarity", desc: "Built within MAS's existing frameworks: SCS for stablecoins, VCC for funds, Securities & Futures Act for securities. No regulatory grey areas.", accent: SG.finternetAmber },
                { title: "Minimal funding required", desc: "Bootstrapped through FSTI 3.0 and Institute of Programmable Finance grants. MAS integration grants lower the barrier for bank adoption.", accent: SG.red },
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-xl" style={{ background: `${item.accent}06`, border: `1px solid ${item.accent}12` }}>
                  <h3 className="text-sm font-semibold text-white/90 mb-1">{item.title}</h3>
                  <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </RevealSection>

        {/* ── IPE Cross-Persona Callout ── */}
        <CrossPersonaCallout />

        {/* ── Ready to Explore? ── */}
        <RevealSection id="explore" delay={100}>
          <section className="pt-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-light mb-3">
                Ready to <span className="font-semibold">explore</span>?
              </h2>
              <p className="text-base" style={{ color: "rgba(255,255,255,0.4)" }}>
                Choose how you'd like to go deeper.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/sg/architecture" className="group p-6 rounded-xl transition-all text-left" style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${SG.border}` }}>
                <Network className="w-8 h-8 mb-4 transition-colors" style={{ color: `${SG.masTeal}60` }} />
                <h3 className="text-base font-medium text-white/85 mb-2">Network Architecture</h3>
                <p className="text-sm leading-relaxed mb-3" style={{ color: "rgba(255,255,255,0.4)" }}>
                  Three-layer stack, GL1-compliant infrastructure, BYOW model, MAS observer node, and multi-chain enforcement.
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm transition-colors" style={{ color: `${SG.masTeal}70` }}>
                  Explore <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>

              <Link href="/sg/capabilities" className="group p-6 rounded-xl transition-all text-left" style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${SG.border}` }}>
                <Zap className="w-8 h-8 mb-4 transition-colors" style={{ color: `${SG.finternetCyan}60` }} />
                <h3 className="text-base font-medium text-white/85 mb-2">Capabilities</h3>
                <p className="text-sm leading-relaxed mb-3" style={{ color: "rgba(255,255,255,0.4)" }}>
                  24/7 settlement, repo against tokenised assets, unsponsored tokets as programmable depositary receipts.
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm transition-colors" style={{ color: `${SG.finternetCyan}70` }}>
                  Explore <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>

              <Link href="/deep-dive/units" className="group p-6 rounded-xl transition-all text-left" style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${SG.border}` }}>
                <BookOpen className="w-8 h-8 mb-4 transition-colors" style={{ color: `${SG.nusOrange}60` }} />
                <h3 className="text-base font-medium text-white/85 mb-2">UNITS Protocol Deep Dive</h3>
                <p className="text-sm leading-relaxed mb-3" style={{ color: "rgba(255,255,255,0.4)" }}>
                  Understand the full UNITS architecture: tokenClasses, tokenPools, UILP, and the three-plane model.
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm transition-colors" style={{ color: `${SG.nusOrange}70` }}>
                  Explore <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            </div>

            {/* Quick links - SG Pages */}
            <div className="mt-10 pt-8 text-center" style={{ borderTop: `1px solid ${SG.border}` }}>
              <p className="text-xs mb-4 uppercase tracking-widest" style={{ color: SG.nusOrange }}>Singapore Blueprint</p>
              <div className="flex flex-wrap justify-center gap-3 mb-6">
                {[
                  { href: "/sg/problem", label: "Fragmented Infrastructure" },
                  { href: "/sg/architecture", label: "Network Architecture" },
                  { href: "/sg/capabilities", label: "Capabilities" },
                  { href: "/sg/assets", label: "Asset Classes" },
                  { href: "/sg/funding", label: "Funding & Participants" },
                ].map((link) => (
                  <Link key={link.href} href={link.href} className="px-3 py-1.5 rounded-full text-xs transition-colors" style={{ color: "rgba(255,255,255,0.45)", border: `1px solid ${SG.nusOrange}30` }}>
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* UNITS Knowledge Base Links */}
              <p className="text-xs mb-4 uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.2)" }}>UNITS Knowledge Base</p>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  { href: "/sg/deep-dive/units", label: "UNITS Protocol" },
                  { href: "/sg/deep-dive/tokenisation", label: "Tokenisation" },
                  { href: "/sg/deep-dive/dvp-settlement", label: "DvP Settlement" },
                  { href: "/sg/deep-dive/collateral-highway", label: "Collateral Highway" },
                  { href: "/sg/deep-dive/precious-metals", label: "Precious Metals" },
                  { href: "/sg/deep-dive/token-programs", label: "Token Programs" },
                  { href: "/sg/deep-dive/regulatory", label: "Regulatory" },
                  { href: "/sg/workflows/cross-border", label: "Cross-Border Settlement" },
                  { href: "/sg/workflows/gold-tokenisation", label: "Gold Tokenisation" },
                ].map((link) => (
                  <Link key={link.href} href={link.href} className="px-3 py-1.5 rounded-full text-xs transition-colors" style={{ color: "rgba(255,255,255,0.25)", border: `1px solid ${SG.border}` }}>
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="mt-12 pt-6 text-center" style={{ borderTop: `1px solid ${SG.border}` }}>
              <img src={SG_LOGO} alt="UNITS|SG" className="h-12 w-auto mx-auto mb-3 opacity-30" />
              <div className="flex items-center justify-center gap-2 mb-1">
                <span className="text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>UNITS|SG</span>
                <span className="text-xs" style={{ color: "rgba(255,255,255,0.1)" }}>&middot;</span>
                <span className="text-xs" style={{ color: "rgba(255,255,255,0.15)" }}>A</span>
                <img src={FINTERNET_LOGO_WHITE} alt="Finternet Labs" className="h-3.5 opacity-25" />
                <span className="text-xs" style={{ color: "rgba(255,255,255,0.15)" }}>initiative</span>
                <span className="text-xs" style={{ color: "rgba(255,255,255,0.1)" }}>&middot;</span>
                <span className="text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>GL1-compliant</span>
              </div>
              <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.12)" }}>
                This is a conceptual blueprint for discussion purposes. Not an offer of services.
              </p>
            </div>
          </section>
        </RevealSection>
      </div>
    </div>
  );
}
