import { useRef, useState, useEffect } from "react";
import { Link } from "wouter";
import SGPortalNav, { SG } from "@/components/SGPortalNav";
import { CinematicBackground } from "@/components/motion";
import {
  Zap, Shield, Lock, ArrowRight, Layers, Code2,
  CheckCircle2, AlertTriangle, Eye, RefreshCw,
  Coins, Building2, Landmark, Network, Globe,
  ArrowRightLeft, BarChart3, BookOpen, Gem,
  Users, FileText, Key, Database, Scale, Play,
  Ban, Bell, Calculator, Timer, GitBranch,
  Flame, Package, Unlock, ExternalLink, TrendingUp
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

export default function SGDeepDiveUnsponsoredTokets() {
  return (
    <div className="vanda-portal min-h-screen text-white relative" style={{ background: SG.dark }}>
      <CinematicBackground />
      <SGPortalNav />

      <div className="relative z-10 max-w-4xl mx-auto px-6 pt-28 pb-20 space-y-16">
        {/* Hero */}
        <section className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] uppercase tracking-widest" style={{ background: `${SG.finternetAmber}12`, color: SG.finternetAmber }}>
            Deep Dive
          </div>
          <h1 className="text-4xl md:text-5xl font-extralight tracking-tight">
            Unsponsored <span className="font-semibold" style={{ color: SG.finternetAmber }}>Tokets</span>
          </h1>
          <p className="text-base max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.55)" }}>
            Programmable depositary receipts that give Singapore investors 24/7 access to
            any global security without the original issuer's involvement.
          </p>
          <div className="flex items-center justify-center gap-2 pt-2">
            <img src={SG_LOGO} alt="UNITS|SG" className="h-5 opacity-60" />
            <span className="text-[10px] uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.3)" }}>7-minute read</span>
          </div>
        </section>

        {/* What Are Unsponsored Tokets */}
        <RevealSection id="what-are-they" delay={100}>
          <section>
            <h2 className="text-2xl font-light mb-4">What are unsponsored <span className="font-semibold">tokets?</span></h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
              An unsponsored toket is a programmable depositary receipt. It represents a 1:1 claim
              on a traditional security that is locked (custodied) at a foreign depository. The key
              word is "unsponsored": the original issuer of the underlying security does not need to
              be involved. Any authorised participant on the UNITS network can create an unsponsored
              toket by locking the underlying at the foreign CSD and minting a corresponding toket
              on UNITS|SG.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
              {[
                { label: "Traditional ADR", desc: "Requires issuer cooperation. Bank-intermediated. Limited to equities. Trading hours restricted to local exchange. Settlement T+2.", color: SG.red, status: "Legacy" },
                { label: "Sponsored toket", desc: "Issuer actively participates. Token Programs managed by issuer. Full lifecycle control. Best for new issuances on the UNITS network.", color: SG.masTeal, status: "Native" },
                { label: "Unsponsored toket", desc: "No issuer involvement. Lock underlying at foreign CSD. Mint programmable toket on UNITS|SG. 24/7 trading. Atomic DvP. P-Toket composable.", color: SG.finternetAmber, status: "Innovation" },
              ].map((item, i) => (
                <div key={i} className="p-5 rounded-xl" style={{ background: `${item.color}04`, border: `1px solid ${item.color}12` }}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm font-semibold text-white/90">{item.label}</div>
                    <span className="text-[9px] px-2 py-0.5 rounded-full" style={{ background: `${item.color}15`, color: item.color }}>{item.status}</span>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="p-5 rounded-xl" style={{ background: `${SG.finternetAmber}06`, border: `1px solid ${SG.finternetAmber}12` }}>
              <div className="flex items-start gap-3">
                <Globe className="w-5 h-5 shrink-0 mt-1" style={{ color: SG.finternetAmber }} />
                <div>
                  <div className="text-sm font-medium text-white/80 mb-2">The global access thesis</div>
                  <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
                    Any security held at any major global depository (Euroclear, DTCC, JASDEC, ASX, HKEX)
                    can be represented as an unsponsored toket on UNITS|SG. Singapore becomes a 24/7
                    gateway to world markets. A DBS client can hold US Treasuries, German Bunds, and
                    Japanese government bonds as tokets, trade them at 3am SGT, use them as repo
                    collateral, and compose them into P-Tokets.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </RevealSection>

        {/* Issuance Flow */}
        <RevealSection id="issuance-flow" delay={100}>
          <section>
            <h2 className="text-2xl font-light mb-4">Issuance <span className="font-semibold">flow</span></h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
              Creating an unsponsored toket follows a four-step lock-verify-mint-distribute process.
              The underlying security never leaves the foreign CSD. Only a programmable representation
              is created on the UNITS|SG network.
            </p>

            <div className="space-y-2">
              {[
                { step: "1", label: "Lock", desc: "An authorised participant deposits the underlying security into a segregated custody account at the foreign CSD (e.g., US Treasury bonds at DTCC). The securities are locked and cannot be moved until the corresponding toket is burned.", color: SG.nusOrange, icon: Lock },
                { step: "2", label: "Verify", desc: "The UNITS cross-ledger gateway verifies the custody lock via the Global CSD Adapter. The foreign CSD provides a cryptographic proof of reserve. UNITS independently confirms the lock before proceeding.", color: SG.masTeal, icon: Shield },
                { step: "3", label: "Mint", desc: "An unsponsored toket is minted on the UNITS|SG network. The toket represents a 1:1 claim on the locked underlying. It inherits the same tokenClass standard as all other tokets, making it composable, collateralisable, and programmable.", color: SG.finternetCyan, icon: Coins },
                { step: "4", label: "Distribute", desc: "The toket is available for 24/7 trading, atomic DvP settlement against XSGD, inclusion in P-Tokets, use as repo collateral, and cross-platform transfer across all six tokenisation platforms.", color: SG.finternetAmber, icon: ArrowRight },
              ].map((s, i) => (
                <div key={i} className="flex items-start gap-4 p-5 rounded-xl" style={{ background: `${s.color}04`, border: `1px solid ${s.color}10` }}>
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

        {/* Redemption Flow */}
        <RevealSection id="redemption-flow" delay={100}>
          <section>
            <h2 className="text-2xl font-light mb-4">Redemption <span className="font-semibold">flow</span></h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
              Redemption is the reverse process. The holder burns the unsponsored toket on UNITS|SG,
              which triggers the release of the underlying security at the foreign CSD.
            </p>

            <div className="space-y-2">
              {[
                { step: "1", label: "Burn request", desc: "The toket holder submits a redemption request. The Token Program fires pre-hooks to check eligibility, compliance gates, and any encumbrances (the toket cannot be redeemed if it is pledged as collateral).", color: SG.red, icon: Flame },
                { step: "2", label: "Burn execution", desc: "The unsponsored toket is burned on the UNITS|SG network. The state commitment is updated and signed. The toket ceases to exist.", color: SG.nusOrange, icon: Ban },
                { step: "3", label: "Release instruction", desc: "The cross-ledger gateway sends a release instruction to the foreign CSD via the Global CSD Adapter. The instruction is authenticated and signed.", color: SG.finternetCyan, icon: Unlock },
                { step: "4", label: "Delivery", desc: "The foreign CSD releases the underlying security from the segregated custody account. The traditional security is delivered to the holder's foreign custody account or nominee.", color: SG.masTeal, icon: Package },
              ].map((s, i) => (
                <div key={i} className="flex items-start gap-4 p-5 rounded-xl" style={{ background: `${s.color}04`, border: `1px solid ${s.color}10` }}>
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

        {/* Accessible Global Securities */}
        <RevealSection id="accessible-securities" delay={100}>
          <section>
            <h2 className="text-2xl font-light mb-4">What becomes <span className="font-semibold">accessible</span></h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
              Through the Global CSD Adapter network, unsponsored tokets can represent securities
              from any major depository. Here is the initial target universe.
            </p>

            <div className="rounded-2xl overflow-hidden" style={{ background: SG.card, border: `1px solid ${SG.border}` }}>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ borderBottom: `1px solid ${SG.border}` }}>
                      <th className="text-left p-4 text-white/50 font-medium">Foreign CSD</th>
                      <th className="text-left p-4 text-white/50 font-medium">Region</th>
                      <th className="text-left p-4 text-white/50 font-medium">Asset classes</th>
                      <th className="text-left p-4 text-white/50 font-medium">Key securities</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { csd: "DTCC", region: "Americas", assets: "Govt bonds, equities, corporates", examples: "US Treasuries, S&P 500 equities, US IG corporates" },
                      { csd: "Euroclear", region: "Europe", assets: "Govt bonds, Eurobonds, equities", examples: "German Bunds, French OATs, EU equities, structured notes" },
                      { csd: "JASDEC", region: "Japan", assets: "Govt bonds, equities", examples: "JGBs, Nikkei 225 equities" },
                      { csd: "ASX (Austraclear)", region: "APAC", assets: "Govt bonds, equities", examples: "Australian govt bonds, ASX 200 equities" },
                      { csd: "HKEX (CCASS)", region: "Greater Bay Area", assets: "Equities, bonds", examples: "Hang Seng equities, dim sum bonds" },
                      { csd: "KSD", region: "Korea", assets: "Govt bonds, equities", examples: "KTBs, KOSPI equities" },
                    ].map((row, i) => (
                      <tr key={i} style={{ borderBottom: `1px solid ${SG.border}` }}>
                        <td className="p-4 text-white/70 font-medium">{row.csd}</td>
                        <td className="p-4 text-white/50">{row.region}</td>
                        <td className="p-4 text-white/50">{row.assets}</td>
                        <td className="p-4 text-white/40 text-xs">{row.examples}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </RevealSection>

        {/* Token Programs for Unsponsored Tokets */}
        <RevealSection id="token-programs" delay={100}>
          <section>
            <h2 className="text-2xl font-light mb-4">Token Programs for <span className="font-semibold">unsponsored tokets</span></h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
              Even though the issuer is not involved, unsponsored tokets still benefit from the
              full Token Programs execution model. The Token Manager for unsponsored tokets is
              the authorised participant who created them, not the original issuer.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                {
                  program: "Coupon pass-through",
                  desc: "When the underlying bond pays a coupon at the foreign CSD, the adapter detects the event and triggers an automatic distribution to all unsponsored toket holders on UNITS|SG. No manual processing.",
                  icon: Coins,
                  color: SG.masTeal,
                },
                {
                  program: "Corporate action mirroring",
                  desc: "Stock splits, dividends, rights issues, and mergers at the foreign exchange are mirrored on the unsponsored toket. The Token Program adjusts quantities, creates new tokets, or distributes proceeds automatically.",
                  icon: RefreshCw,
                  color: SG.nusOrange,
                },
                {
                  program: "Maturity and redemption",
                  desc: "When a bond matures at the foreign CSD, the Token Program automatically burns the unsponsored toket and distributes the redemption proceeds in XSGD to all holders.",
                  icon: Timer,
                  color: SG.finternetAmber,
                },
                {
                  program: "Compliance gates",
                  desc: "UILP gates enforce Singapore regulatory requirements: FATCA attestation for US securities, investor eligibility checks, accredited investor restrictions, and MAS reporting obligations.",
                  icon: Shield,
                  color: SG.red,
                },
                {
                  program: "Proof of reserve",
                  desc: "Periodic reconciliation between UNITS proxy state and foreign CSD records. The adapter verifies that every outstanding unsponsored toket has a corresponding locked underlying. Discrepancies trigger alerts.",
                  icon: Eye,
                  color: SG.finternetCyan,
                },
                {
                  program: "FX settlement",
                  desc: "When the underlying is denominated in a foreign currency, the Token Program can integrate with StraitsX for automatic FX conversion. Coupon in USD, distribution in XSGD.",
                  icon: ArrowRightLeft,
                  color: SG.masTeal,
                },
              ].map((tp, i) => (
                <div key={i} className="p-5 rounded-xl" style={{ background: `${tp.color}04`, border: `1px solid ${tp.color}10` }}>
                  <div className="flex items-center gap-2 mb-2">
                    <tp.icon className="w-4 h-4" style={{ color: tp.color }} />
                    <div className="text-sm font-semibold text-white/90">{tp.program}</div>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>{tp.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </RevealSection>

        {/* Singapore Use Cases */}
        <RevealSection id="use-cases" delay={100}>
          <section>
            <h2 className="text-2xl font-light mb-4">Singapore <span className="font-semibold">use cases</span></h2>

            <div className="space-y-4">
              {[
                {
                  title: "Global wealth portfolio",
                  icon: TrendingUp,
                  color: SG.finternetAmber,
                  scenario: "A DBS Private Banking client wants a globally diversified portfolio: 40% Singapore (SGS bonds + STI equities), 30% US (Treasuries + S&P 500), 20% Europe (Bunds + structured notes), 10% alternatives (gold + VCC).",
                  today: "Four brokerage accounts, four custody relationships, four settlement cycles, four regulatory regimes. Manual rebalancing across time zones.",
                  units: "One P-Toket containing sponsored tokets (SGS, STI) and unsponsored tokets (US Treasuries from DTCC, Bunds from Euroclear). All on one network. Atomic rebalancing. 24/7 trading. Single portfolio view.",
                },
                {
                  title: "Cross-border repo collateral",
                  icon: ArrowRightLeft,
                  color: SG.masTeal,
                  scenario: "An OCBC treasury desk needs to post US Treasury collateral for an SGD repo transaction on the UNITS network.",
                  today: "Transfer US Treasuries from DTCC custody to a Singapore-based custodian. Wait for settlement (T+1 in the US). Then pledge the settled securities as collateral. Total time: 1-2 business days.",
                  units: "US Treasury unsponsored toket already on UNITS|SG. Atomic encumbrance as repo collateral. Haircut applied by Token Program. Collateral posted in seconds, not days.",
                },
                {
                  title: "CPFIS global diversification",
                  icon: Users,
                  color: SG.nusOrange,
                  scenario: "CPF Board wants to offer CPFIS members access to global government bonds for retirement diversification.",
                  today: "Requires bilateral agreements with foreign fund managers, foreign custody arrangements, and complex NAV calculations across time zones.",
                  units: "A CPFIS-approved P-Toket containing SGS bonds (sponsored) and US Treasuries + German Bunds (unsponsored tokets). Compliance gates enforce CPFIS eligibility. Automatic coupon pass-through in SGD.",
                },
                {
                  title: "24/7 Asian trading gateway",
                  icon: Globe,
                  color: SG.finternetCyan,
                  scenario: "A hedge fund in Singapore wants to trade Japanese equities outside JASDEC trading hours.",
                  today: "Impossible. JASDEC operates during Tokyo business hours only. After-hours trading requires OTC arrangements with limited liquidity.",
                  units: "Nikkei 225 unsponsored tokets on UNITS|SG trade 24/7. Atomic DvP against XSGD. The underlying remains safely locked at JASDEC. Singapore becomes the round-the-clock gateway for Asian securities.",
                },
              ].map((uc, i) => (
                <div key={i} className="rounded-xl overflow-hidden" style={{ border: `1px solid ${uc.color}12` }}>
                  <div className="px-5 py-3 flex items-center gap-3" style={{ background: `${uc.color}08` }}>
                    <uc.icon className="w-5 h-5" style={{ color: uc.color }} />
                    <div className="text-sm font-semibold text-white/90">{uc.title}</div>
                  </div>
                  <div className="p-5 space-y-3" style={{ background: `${uc.color}03` }}>
                    <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{uc.scenario}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="p-4 rounded-lg" style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${SG.border}` }}>
                        <div className="text-[10px] uppercase tracking-wider mb-1 text-white/30">Today</div>
                        <p className="text-[11px] leading-relaxed text-white/40">{uc.today}</p>
                      </div>
                      <div className="p-4 rounded-lg" style={{ background: `${uc.color}06`, border: `1px solid ${uc.color}10` }}>
                        <div className="text-[10px] uppercase tracking-wider mb-1" style={{ color: uc.color }}>With UNITS</div>
                        <p className="text-[11px] leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{uc.units}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </RevealSection>

        {/* Regulatory Framework */}
        <RevealSection id="regulatory" delay={100}>
          <section>
            <h2 className="text-2xl font-light mb-4">Regulatory <span className="font-semibold">framework</span></h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
              Unsponsored tokets operate within Singapore's existing regulatory framework.
              MAS oversight is built into the protocol through UILP gates and the observer node.
            </p>

            <div className="rounded-2xl overflow-hidden" style={{ background: SG.card, border: `1px solid ${SG.border}` }}>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ borderBottom: `1px solid ${SG.border}` }}>
                      <th className="text-left p-4 text-white/50 font-medium">Requirement</th>
                      <th className="text-left p-4 text-white/50 font-medium">Framework</th>
                      <th className="text-left p-4 font-medium" style={{ color: SG.finternetAmber }}>How UNITS enforces it</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { req: "Investor eligibility", framework: "SFA (Securities and Futures Act)", enforcement: "UILP gate checks accredited investor status before any unsponsored toket transfer. Non-accredited investors blocked at protocol level." },
                      { req: "Foreign securities offering", framework: "FSMA", enforcement: "Unsponsored tokets representing foreign securities comply with FSMA provisions for offering foreign securities to Singapore investors." },
                      { req: "FATCA compliance", framework: "US IRS / SG-US IGA", enforcement: "Token Program enforces FATCA attestation for all US-origin unsponsored tokets. Non-compliant holders cannot receive coupon distributions." },
                      { req: "AML/KYC", framework: "MAS Notice on AML/CFT", enforcement: "Wallet-level KYC verification required before any unsponsored toket can be held. Cross-border transfers trigger enhanced due diligence." },
                      { req: "Custody safeguards", framework: "SFA custody requirements", enforcement: "Underlying securities held in segregated accounts at foreign CSDs. Proof of reserve verified periodically by the adapter." },
                      { req: "Supervisory reporting", framework: "MAS supervisory framework", enforcement: "MAS observer node receives real-time data on all unsponsored toket creation, transfer, and redemption events." },
                    ].map((row, i) => (
                      <tr key={i} style={{ borderBottom: `1px solid ${SG.border}` }}>
                        <td className="p-4 text-white/60 font-medium">{row.req}</td>
                        <td className="p-4 text-white/40">{row.framework}</td>
                        <td className="p-4 text-white/50 text-xs">{row.enforcement}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </RevealSection>

        {/* Impact Statement */}
        <RevealSection id="impact" delay={100}>
          <section>
            <div className="p-6 rounded-2xl" style={{ background: `${SG.finternetAmber}06`, border: `1px solid ${SG.finternetAmber}12` }}>
              <h3 className="text-lg font-semibold text-white/90 mb-3">Singapore as the 24/7 global gateway</h3>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                Unsponsored tokets transform Singapore from a regional financial centre with
                limited after-hours access into a round-the-clock gateway for global securities.
                Any security at any major depository becomes tradeable, collateralisable, and
                composable on the UNITS|SG network, 24 hours a day, 7 days a week. The underlying
                securities remain safely custodied at their home depositories. Singapore provides
                the programmable overlay that makes them accessible.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                {[
                  { metric: "6+", label: "Global CSDs connected" },
                  { metric: "24/7", label: "Trading availability" },
                  { metric: "T+0", label: "Settlement finality" },
                  { metric: "1:1", label: "Backed by underlying" },
                ].map((m, i) => (
                  <div key={i} className="text-center p-4 rounded-lg" style={{ background: "rgba(255,255,255,0.03)" }}>
                    <div className="text-xl font-bold" style={{ color: SG.finternetAmber }}>{m.metric}</div>
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
            <div className="flex items-center gap-5 mb-8">
              <img src={SG_LOGO} alt="UNITS|SG" className="h-6" />
              <h2 className="text-xl font-light">UNITS <span className="font-semibold">Knowledge Base</span></h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { label: "Cross-Ledger Connectivity", href: "/sg/deep-dive/cross-ledger", desc: "Adapter architecture and state commitments" },
                { label: "Token Programs", href: "/sg/deep-dive/token-programs", desc: "Lifecycle automation and programmable rules" },
                { label: "P-Tokets (Portfolios)", href: "/sg/deep-dive/p-tokets", desc: "Composable portfolio tokets" },
                { label: "UNITS Protocol Deep Dive", href: "/sg/deep-dive/units", desc: "Three-layer architecture and design principles" },
                { label: "DvP Settlement", href: "/sg/deep-dive/dvp-settlement", desc: "Atomic settlement mechanics and models" },
                { label: "Collateral Highway", href: "/sg/deep-dive/collateral-highway", desc: "Cross-depository collateral mobilisation" },
                { label: "Cross-Border Settlement", href: "/sg/workflow/cross-border-settlement", desc: "Multi-corridor settlement workflow" },
                { label: "Asset Classes", href: "/sg/assets", desc: "Nine asset classes on UNITS|SG" },
              ].map((link, i) => (
                <Link key={i} href={link.href} className="flex items-start gap-3 p-4 rounded-lg transition-all hover:bg-white/[0.03]" style={{ border: `1px solid ${SG.border}` }}>
                  <BookOpen className="w-4 h-4 shrink-0 mt-1" style={{ color: `${SG.finternetAmber}60` }} />
                  <div>
                    <div className="text-sm text-white/70 hover:text-white/90 transition-colors">{link.label}</div>
                    <div className="text-[10px] mt-1" style={{ color: "rgba(255,255,255,0.3)" }}>{link.desc}</div>
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
                <div className="flex items-center gap-1.5 mt-1">
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
