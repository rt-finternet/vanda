import { useRef, useState, useEffect } from "react";
import { Link } from "wouter";
import SGPortalNav, { SG } from "@/components/SGPortalNav";
import { CinematicBackground } from "@/components/motion";
import {
  ArrowRight, Users, Building2, Landmark, Shield, Globe,
  Coins, Layers, Network, CheckCircle2, Zap, BookOpen,
  BarChart3, Lock, Eye, Scale, Leaf, Gem
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

type ParticipantTier = {
  tier: string;
  label: string;
  color: string;
  desc: string;
  participants: { name: string; role: string; icon: typeof Building2 }[];
};

export default function SGDeepDiveParticipants() {
  const tiers: ParticipantTier[] = [
    {
      tier: "Tier 1",
      label: "Infrastructure Operators",
      color: SG.masTeal,
      desc: "The foundational layer. These institutions operate the core infrastructure that the UNITS|SG network connects to and builds upon.",
      participants: [
        { name: "MAS", role: "Central bank, unified regulator, MEPS+ operator, GL1 initiative sponsor, observer node", icon: Landmark },
        { name: "SGX Group", role: "Exchange operator, CDP depository, clearing house, market data", icon: BarChart3 },
        { name: "SGX CDP", role: "Central depository for equities, corporate bonds, ETFs", icon: Building2 },
        { name: "MEPS+", role: "Real-time gross settlement for SGD, government securities depository", icon: Coins },
      ]
    },
    {
      tier: "Tier 2",
      label: "Anchor Participants",
      color: SG.nusOrange,
      desc: "The first movers. Singapore's systemically important banks and GL1 founding members that would anchor the network with liquidity, market-making, and institutional credibility.",
      participants: [
        { name: "DBS Bank", role: "Largest SG bank, digital asset pioneer (DBS Digital Exchange), custody", icon: Building2 },
        { name: "OCBC Bank", role: "Second largest SG bank, wealth management, cross-border capabilities", icon: Building2 },
        { name: "UOB", role: "Third largest SG bank, ASEAN network, trade finance", icon: Building2 },
        { name: "HSBC", role: "Largest foreign bank in SG, GL1 founding member, global custody, securities services across 60+ markets", icon: Globe },
        { name: "J.P. Morgan", role: "GL1 founding member, Onyx blockchain platform, Partior (MAS-backed), cross-border payments", icon: Building2 },
        { name: "Standard Chartered", role: "GL1 founding member, digital asset custody (Zodia), trade finance, SG hub", icon: Globe },
        { name: "MUFG", role: "GL1 founding member, Japan's largest bank, Asia-Pacific corridor, securities services", icon: Globe },
      ]
    },
    {
      tier: "Tier 3",
      label: "Market Specialists",
      color: SG.finternetCyan,
      desc: "Domain experts who bring specific capabilities: stablecoin issuance, carbon markets, gold custody, structured products.",
      participants: [
        { name: "StraitsX (XSGD)", role: "SCS-regulated SGD stablecoin issuer, cash leg for atomic DvP", icon: Coins },
        { name: "Marketnode", role: "SGX-Temasek JV, digital asset issuance platform, structured notes", icon: Layers },
        { name: "DDEx", role: "DBS Digital Exchange, institutional-grade digital asset exchange and custody", icon: Building2 },
        { name: "BondBloX", role: "Digital bond platform, fractional bond issuance and secondary trading", icon: Layers },
        { name: "InvestaX", role: "MAS-licensed RWA tokenisation platform, STO issuance and distribution", icon: Network },
        { name: "Climate Impact X (CIX)", role: "SGX-Temasek-DBS-StanChart JV, carbon credit exchange, VCC marketplace", icon: Leaf },
        { name: "ADDX", role: "MAS-licensed private market exchange, accredited investor platform", icon: Network },
        { name: "Paxos", role: "Regulated gold tokenisation (PAXG), stablecoin infrastructure", icon: Gem },
      ]
    },
    {
      tier: "Tier 4",
      label: "Global Custodians & Asset Managers",
      color: SG.finternetAmber,
      desc: "International institutions with Singapore operations that connect the UNITS|SG network to global capital flows.",
      participants: [
        { name: "BNY Mellon", role: "Global custodian, digital asset custody, fund administration", icon: Globe },
        { name: "State Street", role: "Global custodian, ETF services, digital asset capabilities", icon: Globe },

        { name: "Citi", role: "Global custodian, Citi Token Services, trade finance", icon: Globe },
        { name: "GIC", role: "Singapore sovereign wealth fund, long-term investor, infrastructure capital", icon: Landmark },
        { name: "Temasek", role: "Singapore sovereign wealth, Marketnode co-founder, innovation capital", icon: Landmark },
      ]
    },
    {
      tier: "Tier 5",
      label: "Technology & Service Providers",
      color: SG.nusBlue,
      desc: "The technology layer that enables the network: ledger infrastructure, wallet providers, identity services, and compliance tools.",
      participants: [
        { name: "Partior", role: "MAS-backed multi-currency clearing and settlement platform (DBS, J.P. Morgan, Temasek)", icon: Network },
        { name: "Broadridge", role: "Post-trade technology, DLT repo platform, corporate actions processing", icon: Layers },
        { name: "R3 / Corda", role: "Enterprise DLT platform, privacy-preserving smart contracts", icon: Lock },
        { name: "Fireblocks", role: "Digital asset custody and key management infrastructure", icon: Shield },
        { name: "Chainalysis", role: "Blockchain analytics, compliance monitoring, transaction screening", icon: Eye },
      ]
    },
    {
      tier: "Tier 6",
      label: "Academic & Research Partners",
      color: SG.red,
      desc: "Research institutions that provide intellectual capital, talent pipeline, and independent validation for the UNITS|SG initiative.",
      participants: [
        { name: "NUS (National University of Singapore)", role: "Institute of Programmable Finance, blockchain research, talent pipeline", icon: BookOpen },
        { name: "SMU (Singapore Management University)", role: "FinTech research, regulatory sandbox studies, industry partnerships", icon: BookOpen },
        { name: "SUTD", role: "Distributed systems research, cryptography, protocol design", icon: BookOpen },
      ]
    },
  ];

  return (
    <div className="vanda-portal min-h-screen text-white" style={{ background: SG.dark }}>
      <SGPortalNav />

      {/* Hero */}
      <section className="relative px-6 pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${SG.dark}, #0D1F3A 50%, #122B4A)` }} />
        <CinematicBackground variant="mixed" intensity={0.06} />
        <div className="relative max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5" style={{ color: SG.nusBlue }} />
            <span className="text-xs font-medium tracking-[0.2em] uppercase" style={{ color: SG.nusBlue }}>Deep Dive</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-light mb-4">
            <span className="font-semibold">Participants</span> Ecosystem
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
            The UNITS|SG network requires a carefully orchestrated ecosystem of 30+ institutions across
            six tiers: infrastructure operators, anchor banks, market specialists, global custodians,
            technology providers, and academic partners. Each tier plays a distinct role in making
            the network viable.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-6 pb-24 space-y-20">

        {/* Ecosystem Overview */}
        <RevealSection id="overview">
          <section>
            <h2 className="text-2xl font-light mb-6">Ecosystem <span className="font-semibold">overview</span></h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
              Singapore's compact but deep financial ecosystem is uniquely suited for the UNITS Network.
              Unlike Europe, where participants are spread across 27 jurisdictions, Singapore concentrates
              the full spectrum of market infrastructure, banks, asset managers, and technology providers
              within a single regulatory perimeter.
            </p>

            <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-6">
              {tiers.map((t) => (
                <div key={t.tier} className="p-3 rounded-xl text-center" style={{ background: `${t.color}06`, border: `1px solid ${t.color}12` }}>
                  <div className="text-lg font-bold" style={{ color: t.color }}>{t.participants.length}</div>
                  <div className="text-[9px] font-medium text-white/60 mt-1">{t.label}</div>
                </div>
              ))}
            </div>

            <div className="p-5 rounded-xl" style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${SG.border}` }}>
              <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
                <span className="font-medium text-white/70">Total ecosystem:</span> {tiers.reduce((sum, t) => sum + t.participants.length, 0)} named
                institutions across {tiers.length} tiers. This is not aspirational; every institution listed
                has existing operations in Singapore, relevant capabilities, and strategic alignment with
                the UNITS Network objectives.
              </p>
            </div>
          </section>
        </RevealSection>

        {/* Tier-by-Tier Breakdown */}
        {tiers.map((tier, tierIdx) => (
          <RevealSection key={tier.tier} id={`tier-${tierIdx + 1}`} delay={100}>
            <section>
              <div className="flex items-center gap-5 mb-8">
                <span className="text-xs font-bold px-3 py-1.5 rounded-full" style={{ background: `${tier.color}15`, color: tier.color }}>
                  {tier.tier}
                </span>
                <h2 className="text-2xl font-light"><span className="font-semibold">{tier.label}</span></h2>
              </div>
              <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
                {tier.desc}
              </p>

              <div className="space-y-4">
                {tier.participants.map((p, i) => (
                  <div key={i} className="flex items-start gap-4 p-5 rounded-xl" style={{ background: `${tier.color}04`, border: `1px solid ${tier.color}10` }}>
                    <p.icon className="w-5 h-5 shrink-0 mt-1" style={{ color: tier.color }} />
                    <div>
                      <div className="text-sm font-medium text-white/90 mb-0.5">{p.name}</div>
                      <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{p.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </RevealSection>
        ))}

        {/* Onboarding Sequence */}
        <RevealSection id="onboarding" delay={100}>
          <section>
            <h2 className="text-2xl font-light mb-6">Onboarding <span className="font-semibold">sequence</span></h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
              The UNITS|SG network does not launch with all 40+ participants simultaneously. The onboarding
              follows a carefully sequenced approach that builds credibility and liquidity progressively.
            </p>

            <div className="rounded-2xl p-5" style={{ background: SG.card, border: `1px solid ${SG.border}` }}>
              <div className="space-y-4">
                {[
                  {
                    phase: "Phase 1: Foundation",
                    timeline: "Months 1-6",
                    color: SG.masTeal,
                    desc: "MAS observer node, SGX CDP integration, one anchor bank (DBS), StraitsX XSGD. Proof of concept: atomic DvP for SGX equities with XSGD settlement.",
                  },
                  {
                    phase: "Phase 2: Expansion",
                    timeline: "Months 7-12",
                    color: SG.nusOrange,
                    desc: "MEPS+ integration, second and third anchor banks (OCBC, UOB), Marketnode for structured notes. Proof of value: cross-depository collateral, intraday repo.",
                  },
                  {
                    phase: "Phase 3: Ecosystem",
                    timeline: "Months 13-18",
                    color: SG.finternetCyan,
                    desc: "Global custodians, CIX carbon credits, ADDX private markets, NUS research partnership. Full asset class coverage across 9 categories.",
                  },
                  {
                    phase: "Phase 4: Scale",
                    timeline: "Months 19-24",
                    color: SG.finternetAmber,
                    desc: "Cross-border connectivity (GL1-compliant interoperability), additional technology providers, full participant ecosystem operational. Production-grade infrastructure.",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0" style={{ background: `${item.color}15`, color: item.color }}>
                        {i + 1}
                      </div>
                      {i < 3 && <div className="w-px flex-1 mt-1" style={{ background: `${item.color}20` }} />}
                    </div>
                    <div className="pb-4 flex-1">
                      <div className="flex items-baseline gap-2 mb-1">
                        <div className="text-sm font-medium text-white/90">{item.phase}</div>
                        <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: `${item.color}12`, color: item.color }}>
                          {item.timeline}
                        </span>
                      </div>
                      <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </RevealSection>

        {/* Credential Requirements */}
        <RevealSection id="credentials" delay={100}>
          <section>
            <h2 className="text-2xl font-light mb-6">Credential <span className="font-semibold">requirements</span></h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
              Every participant on the UNITS|SG network must hold verifiable credentials that are
              checked on-ledger before any transaction. This is not optional; it is enforced by
              the protocol itself.
            </p>

            <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${SG.border}` }}>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr style={{ background: SG.card }}>
                      <th className="text-left p-3 font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>Participant Type</th>
                      <th className="text-left p-3 font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>Required Credentials</th>
                      <th className="text-left p-3 font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>Issuing Authority</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { type: "Bank (full)", creds: "MAS Banking Licence, CMS Licence (Securities Dealing)", auth: "MAS" },
                      { type: "Broker-dealer", creds: "CMS Licence (Securities Dealing, Fund Management)", auth: "MAS" },
                      { type: "Custodian", creds: "CMS Licence (Custodial Services)", auth: "MAS" },
                      { type: "Stablecoin issuer", creds: "MPI Licence (PSA), SCS Compliance Certificate", auth: "MAS" },
                      { type: "Exchange operator", creds: "Approved Exchange, Recognised Market Operator", auth: "MAS" },
                      { type: "Carbon exchange", creds: "Recognised Market Operator, VCC Registry Licence", auth: "MAS, NEA" },
                      { type: "Accredited investor", creds: "SFA Accredited Investor Declaration", auth: "Self-certified, verified by intermediary" },
                    ].map((row, i) => (
                      <tr key={i} style={{ borderTop: `1px solid ${SG.border}` }}>
                        <td className="p-3 font-medium text-white/70">{row.type}</td>
                        <td className="p-3" style={{ color: "rgba(255,255,255,0.5)" }}>{row.creds}</td>
                        <td className="p-3" style={{ color: "rgba(255,255,255,0.45)" }}>{row.auth}</td>
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
              { href: "/sg/workflows/cross-border", label: "Cross-Border Settlement" },
              { href: "/sg/deep-dive/precious-metals", label: "Precious Metals" },
              { href: "/sg/workflows/gold-tokenisation", label: "Gold Tokenisation" },
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
          <Link href="/sg/deep-dive/collateral-highway" className="flex items-center gap-2 text-sm transition-colors" style={{ color: "rgba(255,255,255,0.4)" }}>
            ← Collateral Highway
          </Link>
          <div className="flex-1" />
          <Link href="/sg" className="flex items-center gap-2 text-sm transition-colors" style={{ color: `${SG.nusBlue}90` }}>
            Back to SG Overview <ArrowRight className="w-3.5 h-3.5" />
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
