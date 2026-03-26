import { useRef, useState, useEffect } from "react";
import { Link } from "wouter";
import SGPortalNav, { SG } from "@/components/SGPortalNav";
import { CinematicBackground } from "@/components/motion";
import {
  ArrowRight, Layers, Shield, Lock, CheckCircle2, Zap,
  Database, FileCheck, Landmark, Building2, Coins, Globe,
  ArrowRightLeft, Network, Eye, RefreshCw, Box, Key
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

export default function SGDeepDiveTokenisation() {
  return (
    <div className="min-h-screen text-white" style={{ background: SG.dark }}>
      <SGPortalNav />

      {/* Hero */}
      <section className="relative px-6 pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${SG.dark}, #0D1F3A 50%, #122B4A)` }} />
        <CinematicBackground variant="mixed" intensity={0.06} />
        <div className="relative max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <Layers className="w-5 h-5" style={{ color: SG.nusOrange }} />
            <span className="text-xs font-medium tracking-[0.2em] uppercase" style={{ color: SG.nusOrange }}>Deep Dive</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-light mb-4">
            <span className="font-semibold">Tokenisation</span> for Singapore
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
            How the UNITS protocol creates digital representations of Singapore securities through
            proxy tokenisation of CDP equities and MEPS+ government securities, enabling programmable
            lifecycle management while preserving existing legal ownership structures.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-6 pb-24 space-y-20">

        {/* Native vs Proxy */}
        <RevealSection id="native-vs-proxy">
          <section>
            <h2 className="text-2xl font-light mb-6">Two modes of <span className="font-semibold">tokenisation</span></h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
              The UNITS protocol supports two fundamentally different approaches to representing assets on-ledger.
              For Singapore, the proxy mode is the critical path because it allows existing CDP and MEPS+ assets
              to be brought onto the UNITS Network without disrupting the legal ownership framework.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {/* Native */}
              <div className="rounded-xl p-5" style={{ background: `${SG.finternetCyan}06`, border: `1px solid ${SG.finternetCyan}15` }}>
                <div className="flex items-center gap-2 mb-3">
                  <Box className="w-5 h-5" style={{ color: SG.finternetCyan }} />
                  <div className="text-sm font-semibold text-white/90">Native Tokenisation</div>
                </div>
                <p className="text-xs leading-relaxed mb-3" style={{ color: "rgba(255,255,255,0.5)" }}>
                  The asset is born on-ledger. The toket IS the security. There is no underlying asset
                  in a traditional depository. The UNITS ledger is the single source of truth.
                </p>
                <div className="p-3 rounded-lg" style={{ background: `${SG.finternetCyan}08` }}>
                  <div className="text-[10px] uppercase tracking-wider mb-1" style={{ color: `${SG.finternetCyan}80` }}>SG Use Cases</div>
                  <div className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
                    New VCC carbon credit issuances, natively tokenised structured notes,
                    digital-first private credit instruments
                  </div>
                </div>
              </div>

              {/* Proxy */}
              <div className="rounded-xl p-5" style={{ background: `${SG.nusOrange}06`, border: `1px solid ${SG.nusOrange}15` }}>
                <div className="flex items-center gap-2 mb-3">
                  <RefreshCw className="w-5 h-5" style={{ color: SG.nusOrange }} />
                  <div className="text-sm font-semibold text-white/90">Proxy Tokenisation</div>
                </div>
                <p className="text-xs leading-relaxed mb-3" style={{ color: "rgba(255,255,255,0.5)" }}>
                  The asset exists in a traditional depository (CDP or MEPS+). A proxy toket is created
                  on UNITS that mirrors the position. The depository remains the legal record.
                </p>
                <div className="p-3 rounded-lg" style={{ background: `${SG.nusOrange}08` }}>
                  <div className="text-[10px] uppercase tracking-wider mb-1" style={{ color: `${SG.nusOrange}80` }}>SG Use Cases</div>
                  <div className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
                    Existing SGX equities, Singapore Government Securities, MAS Bills,
                    corporate bonds held in CDP
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${SG.border}` }}>
              <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
                <span className="font-medium text-white/70">Why proxy matters for Singapore:</span> Singapore has
                approximately SGD 700 billion in securities held across CDP and MEPS+. These cannot be "re-issued"
                natively on a new ledger. Proxy tokenisation is the migration path that brings existing assets onto
                the UNITS Network while preserving the legal certainty of the existing depository framework.
              </p>
            </div>
          </section>
        </RevealSection>

        {/* Anatomy of a Toket */}
        <RevealSection id="toket-anatomy" delay={100}>
          <section>
            <h2 className="text-2xl font-light mb-6">Anatomy of a <span className="font-semibold">toket</span></h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
              Every toket on the UNITS|SG network carries a rich data structure that goes far beyond a simple
              balance entry. This is what makes securities programmable.
            </p>

            <div className="rounded-2xl overflow-hidden" style={{ background: SG.card, border: `1px solid ${SG.border}` }}>
              <div className="p-5">
                <div className="text-xs uppercase tracking-wider mb-4" style={{ color: SG.nusOrange }}>
                  Example: DBS Bank Ordinary Shares (SGX: D05)
                </div>
                <div className="space-y-3">
                  {[
                    { field: "tokenClass", value: "SG1L01001701 (DBS Group Holdings)", desc: "The ISIN-linked asset definition with lifecycle rules", icon: Database },
                    { field: "tokenPool", value: "DBS-CDP-PROXY-001", desc: "Proxy pool linked to CDP depository position", icon: Layers },
                    { field: "toket ID", value: "0xSG...a3f7", desc: "Unique on-ledger identifier for this specific unit", icon: Key },
                    { field: "owner", value: "OCBC Securities wallet", desc: "Current beneficial owner's verified wallet address", icon: Building2 },
                    { field: "credentials", value: "CMS Licence, SFA Accredited Investor", desc: "Verifiable credentials attached to the holder", icon: Shield },
                    { field: "encumbrance", value: "None (unencumbered)", desc: "Collateral or lien status, updated in real-time", icon: Lock },
                    { field: "entitlements", value: "Dividend: SGD 0.54/share (next: 15 May)", desc: "Continuous economic entitlement data", icon: Coins },
                    { field: "programs", value: "CorporateAction, TransferRestriction", desc: "Active Token Programs governing lifecycle", icon: Zap },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-lg" style={{ background: "rgba(255,255,255,0.02)" }}>
                      <item.icon className="w-4 h-4 mt-0.5 shrink-0" style={{ color: SG.nusOrange }} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-2 mb-0.5">
                          <span className="text-xs font-mono" style={{ color: `${SG.nusOrange}90` }}>{item.field}</span>
                          <span className="text-xs text-white/60 truncate">{item.value}</span>
                        </div>
                        <div className="text-[10px]" style={{ color: "rgba(255,255,255,0.35)" }}>{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </RevealSection>

        {/* Proxy Tokenisation: CDP Equities */}
        <RevealSection id="cdp-proxy" delay={100}>
          <section>
            <h2 className="text-2xl font-light mb-6">Proxy tokenisation: <span className="font-semibold">CDP equities</span></h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
              The process of creating proxy tokets for SGX-listed equities held in CDP. The CDP position
              is locked, and a corresponding proxy toket is minted on the UNITS Network. The proxy toket
              inherits all the economic rights of the underlying share.
            </p>

            <div className="rounded-2xl p-5" style={{ background: SG.card, border: `1px solid ${SG.border}` }}>
              <div className="text-xs uppercase tracking-wider mb-4" style={{ color: SG.red }}>CDP Proxy Creation Flow</div>
              <div className="space-y-3">
                {[
                  { step: "1", title: "Lock Position in CDP", desc: "The participant instructs CDP to lock a specified quantity of shares. The shares remain in CDP but are marked as 'tokenised' and cannot be transferred within CDP while locked.", color: SG.red },
                  { step: "2", title: "Verification", desc: "The UNITS settlement engine verifies the lock confirmation from CDP, validates the participant's credentials, and confirms the tokenClass definition matches the underlying security.", color: SG.nusOrange },
                  { step: "3", title: "Mint Proxy Tokets", desc: "Proxy tokets are minted into the participant's UNITS wallet. Each toket carries the full data structure (ISIN, entitlements, programs) and is linked to the locked CDP position.", color: SG.masTeal },
                  { step: "4", title: "Continuous Sync", desc: "Corporate actions, dividends, and entitlements flow through the proxy layer. When DBS declares a dividend, the Token Program on UNITS distributes it to proxy toket holders automatically.", color: SG.finternetCyan },
                  { step: "5", title: "Redemption", desc: "To unlock the CDP position, the participant burns the proxy tokets. The UNITS network confirms the burn, and CDP releases the lock. Shares are again freely transferable within CDP.", color: SG.nusBlue },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0" style={{ background: `${item.color}15`, color: item.color }}>
                        {item.step}
                      </div>
                      {item.step !== "5" && <div className="w-px flex-1 mt-1" style={{ background: `${item.color}20` }} />}
                    </div>
                    <div className="pb-4 flex-1">
                      <div className="text-sm font-medium text-white/90 mb-1">{item.title}</div>
                      <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </RevealSection>

        {/* Proxy Tokenisation: MEPS+ Government Securities */}
        <RevealSection id="meps-proxy" delay={100}>
          <section>
            <h2 className="text-2xl font-light mb-6">Proxy tokenisation: <span className="font-semibold">MEPS+ government securities</span></h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
              Government securities in MEPS+ follow the same proxy pattern but with additional considerations
              for MAS oversight and the unique characteristics of sovereign debt instruments.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {[
                { label: "SGS Bonds", desc: "10-year, 20-year, 30-year Singapore Government Securities. Proxy tokets enable fractional ownership and collateral mobilisation.", icon: Landmark, color: SG.masTeal },
                { label: "T-Bills", desc: "3-month, 6-month, 1-year Treasury Bills. Proxy tokets enable secondary market liquidity and automated rollover.", icon: FileCheck, color: SG.nusOrange },
                { label: "MAS Bills", desc: "Short-duration MAS-issued instruments. Proxy tokets enable intraday repo and collateral transformation.", icon: Coins, color: SG.finternetCyan },
                { label: "Infrastructure Bonds", desc: "HDB bonds, LTA bonds, and other statutory board issuances. Proxy tokets enable broader distribution.", icon: Building2, color: SG.nusBlue },
              ].map((item, i) => (
                <div key={i} className="rounded-xl p-4" style={{ background: `${item.color}06`, border: `1px solid ${item.color}12` }}>
                  <item.icon className="w-5 h-5 mb-2" style={{ color: item.color }} />
                  <div className="text-sm font-medium text-white/90 mb-1">{item.label}</div>
                  <div className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>{item.desc}</div>
                </div>
              ))}
            </div>

            <div className="rounded-xl p-4" style={{ background: `${SG.masTeal}06`, border: `1px solid ${SG.masTeal}12` }}>
              <div className="flex items-center gap-2 mb-2">
                <Eye className="w-4 h-4" style={{ color: SG.masTeal }} />
                <span className="text-xs font-medium text-white/80">MAS Oversight</span>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
                Because MEPS+ is operated by MAS directly, the proxy tokenisation of government securities
                has a unique governance advantage: MAS can observe the entire lifecycle of proxy tokets
                in real-time through its observer node, maintaining the same level of supervisory control
                it has over MEPS+ today, but with richer data and programmable compliance.
              </p>
            </div>
          </section>
        </RevealSection>

        {/* Token Hierarchy */}
        <RevealSection id="hierarchy" delay={100}>
          <section>
            <h2 className="text-2xl font-light mb-6">Token <span className="font-semibold">hierarchy</span></h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
              Every tokenised asset on UNITS|SG follows a three-level hierarchy: tokenClass defines the asset,
              tokenPool manages supply, and tokets are the individual units held by participants.
            </p>

            <div className="rounded-2xl overflow-hidden" style={{ background: SG.card, border: `1px solid ${SG.border}` }}>
              <div className="p-5 space-y-4">
                {/* tokenClass */}
                <div className="p-4 rounded-xl" style={{ background: `${SG.nusOrange}08`, border: `1px solid ${SG.nusOrange}12` }}>
                  <div className="text-xs uppercase tracking-wider mb-2" style={{ color: SG.nusOrange }}>tokenClass</div>
                  <div className="text-sm font-medium text-white/90 mb-1">Asset Definition</div>
                  <p className="text-xs mb-3" style={{ color: "rgba(255,255,255,0.5)" }}>
                    Defines the asset type, lifecycle rules, compliance requirements, and Token Programs.
                    One tokenClass per unique security.
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 rounded-lg text-[10px]" style={{ background: `${SG.nusOrange}06` }}>
                      <span style={{ color: `${SG.nusOrange}80` }}>Example:</span>
                      <span className="text-white/50 ml-1">SG1L01001701 (DBS Shares)</span>
                    </div>
                    <div className="p-2 rounded-lg text-[10px]" style={{ background: `${SG.nusOrange}06` }}>
                      <span style={{ color: `${SG.nusOrange}80` }}>Example:</span>
                      <span className="text-white/50 ml-1">SGXZ12345678 (SGS 10Y Bond)</span>
                    </div>
                  </div>
                </div>

                {/* tokenPool */}
                <div className="p-4 rounded-xl" style={{ background: `${SG.masTeal}08`, border: `1px solid ${SG.masTeal}12` }}>
                  <div className="text-xs uppercase tracking-wider mb-2" style={{ color: SG.masTeal }}>tokenPool</div>
                  <div className="text-sm font-medium text-white/90 mb-1">Supply Management</div>
                  <p className="text-xs mb-3" style={{ color: "rgba(255,255,255,0.5)" }}>
                    Controls issuance, burning, and total supply for a specific tranche or proxy source.
                    Multiple pools can exist per tokenClass (e.g., CDP proxy pool and native issuance pool).
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 rounded-lg text-[10px]" style={{ background: `${SG.masTeal}06` }}>
                      <span style={{ color: `${SG.masTeal}80` }}>Proxy pool:</span>
                      <span className="text-white/50 ml-1">DBS-CDP-PROXY (locked in CDP)</span>
                    </div>
                    <div className="p-2 rounded-lg text-[10px]" style={{ background: `${SG.masTeal}06` }}>
                      <span style={{ color: `${SG.masTeal}80` }}>Proxy pool:</span>
                      <span className="text-white/50 ml-1">SGS10Y-MEPS-PROXY (locked in MEPS+)</span>
                    </div>
                  </div>
                </div>

                {/* toket */}
                <div className="p-4 rounded-xl" style={{ background: `${SG.finternetCyan}08`, border: `1px solid ${SG.finternetCyan}12` }}>
                  <div className="text-xs uppercase tracking-wider mb-2" style={{ color: SG.finternetCyan }}>toket</div>
                  <div className="text-sm font-medium text-white/90 mb-1">Individual Units</div>
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
                    The actual units held in participant wallets. Each toket carries the full data structure
                    (owner, credentials, encumbrance, entitlements) and can be transferred, encumbered,
                    or redeemed independently. Supports fractional units for assets like gold and SGS bonds.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </RevealSection>

        {/* What Tokenisation Unlocks */}
        <RevealSection id="unlocks" delay={100}>
          <section>
            <h2 className="text-2xl font-light mb-6">What tokenisation <span className="font-semibold">unlocks</span></h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
              Tokenisation is not just a digital representation. It transforms what is possible with securities
              in Singapore by making them programmable, composable, and continuously settled.
            </p>

            <div className="space-y-3">
              {[
                {
                  title: "Cross-Depository Composability",
                  desc: "For the first time, CDP equities and MEPS+ government securities can be combined in a single portfolio, used as collateral for each other, and settled atomically against each other.",
                  icon: Network,
                  color: SG.masTeal,
                },
                {
                  title: "Fractional Ownership",
                  desc: "SGS bonds (minimum SGD 1,000 denomination) and blue-chip equities can be fractionalized to any denomination, enabling broader retail participation and more precise portfolio construction.",
                  icon: Layers,
                  color: SG.nusOrange,
                },
                {
                  title: "Programmable Lifecycle",
                  desc: "Coupon payments, dividend distributions, corporate actions, and redemptions execute automatically through Token Programs. No manual processing, no reconciliation, no delays.",
                  icon: Zap,
                  color: SG.finternetCyan,
                },
                {
                  title: "24/7 Settlement",
                  desc: "Securities can be traded and settled at any time, not just during SGX trading hours or MAS business hours. This is critical for Singapore's role as a bridge between Asian and European time zones.",
                  icon: Globe,
                  color: SG.finternetAmber,
                },
                {
                  title: "Collateral Mobility",
                  desc: "Any tokenised asset can be used as collateral anywhere on the UNITS Network. SGS bonds can secure equity margin, corporate bonds can back repo transactions, gold can collateralise structured notes.",
                  icon: ArrowRightLeft,
                  color: SG.red,
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-xl" style={{ background: `${item.color}04`, border: `1px solid ${item.color}10` }}>
                  <item.icon className="w-5 h-5 shrink-0 mt-0.5" style={{ color: item.color }} />
                  <div>
                    <div className="text-sm font-medium text-white/90 mb-1">{item.title}</div>
                    <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </RevealSection>

        {/* Lifecycle Comparison */}
        <RevealSection id="comparison" delay={100}>
          <section>
            <h2 className="text-2xl font-light mb-6">Lifecycle <span className="font-semibold">comparison</span></h2>

            <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${SG.border}` }}>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr style={{ background: SG.card }}>
                      <th className="text-left p-3 font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>Lifecycle Event</th>
                      <th className="text-left p-3 font-medium" style={{ color: `${SG.red}80` }}>CDP/MEPS+ Today</th>
                      <th className="text-left p-3 font-medium" style={{ color: `${SG.nusOrange}80` }}>UNITS|SG</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { event: "Issuance", today: "Paper-based prospectus, manual allocation, T+5 settlement", units: "On-ledger issuance, automated allocation, instant settlement" },
                      { event: "Transfer", today: "T+2 batch settlement via CDP/MEPS+", units: "Atomic transfer with instant finality" },
                      { event: "Dividend", today: "Record date, ex-date, payment date (weeks)", units: "Continuous entitlement, instant distribution" },
                      { event: "Coupon", today: "Scheduled batch payment via paying agent", units: "Token Program auto-executes on coupon date" },
                      { event: "Corporate action", today: "Manual notification, election, processing", units: "On-ledger notification, automated execution" },
                      { event: "Collateral pledge", today: "Manual instruction across systems", units: "On-ledger encumbrance, instant" },
                      { event: "Redemption", today: "Manual instruction, T+2 settlement", units: "Burn toket, release lock, instant" },
                      { event: "Regulatory reporting", today: "Post-trade batch reports", units: "Real-time observer node visibility" },
                    ].map((row, i) => (
                      <tr key={i} style={{ borderTop: `1px solid ${SG.border}` }}>
                        <td className="p-3 font-medium text-white/70">{row.event}</td>
                        <td className="p-3" style={{ color: "rgba(255,255,255,0.4)" }}>{row.today}</td>
                        <td className="p-3 font-medium" style={{ color: SG.nusOrange }}>{row.units}</td>
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
              { href: "/sg/deep-dive/units", label: "UNITS Protocol" },
              { href: "/sg/deep-dive/token-programs", label: "Token Programs" },
              { href: "/sg/deep-dive/corporate-actions", label: "Corporate Actions" },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="px-3 py-1.5 rounded-full text-xs transition-colors" style={{ color: "rgba(255,255,255,0.35)", border: `1px solid ${SG.border}` }}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-4 pt-8" style={{ borderTop: `1px solid ${SG.border}` }}>
          <Link href="/sg/deep-dive/dvp-settlement" className="flex items-center gap-2 text-sm transition-colors" style={{ color: "rgba(255,255,255,0.4)" }}>
            ← DvP Settlement
          </Link>
          <div className="flex-1" />
          <Link href="/sg/deep-dive/regulatory" className="flex items-center gap-2 text-sm transition-colors" style={{ color: `${SG.nusOrange}90` }}>
            Next: Regulatory Framework <ArrowRight className="w-3.5 h-3.5" />
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
