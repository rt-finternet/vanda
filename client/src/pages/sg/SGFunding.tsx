import { useRef, useState, useEffect } from "react";
import { Link } from "wouter";
import SGPortalNav, { SG } from "@/components/SGPortalNav";
import { CinematicBackground } from "@/components/motion";
import {
  ArrowRight, Users, Building2, Landmark, GraduationCap,
  Wallet, Globe, Shield, Zap, CheckCircle2, ArrowRightLeft,
  TrendingUp, DollarSign, Network, BookOpen
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

export default function SGFunding() {
  return (
    <div className="min-h-screen text-white" style={{ background: SG.dark }}>
      <SGPortalNav />

      {/* Hero */}
      <section className="relative px-6 pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${SG.dark}, #0D1F3A 50%, #122B4A)` }} />
        <CinematicBackground variant="mixed" intensity={0.06} />
        <div className="relative max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5" style={{ color: SG.nusOrange }} />
            <span className="text-xs font-medium tracking-[0.2em] uppercase" style={{ color: SG.nusOrange }}>Funding & Participants</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-light mb-4">
            <span className="font-semibold">Funding</span> & Participants
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
            Bootstrapped through MAS's existing grant infrastructure, with 40+ potential participants
            from Project Guardian and Singapore's financial ecosystem.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-6 pb-24 space-y-20">

        {/* Funding Pathways */}
        <RevealSection id="funding-pathways">
          <section>
            <h2 className="text-2xl font-light mb-6">Funding <span className="font-semibold">pathways</span></h2>
            <p className="text-sm leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.6)" }}>
              The UNITS Network can be bootstrapped with minimal upfront capital by leveraging MAS's existing
              grant infrastructure. Two complementary pathways provide different levels of funding and scope.
            </p>

            {/* FSTI 3.0 */}
            <div className="rounded-2xl overflow-hidden mb-6" style={{ background: SG.card, border: `1px solid ${SG.border}` }}>
              <div className="px-6 py-4 flex items-center gap-3" style={{ background: `${SG.nusOrange}08`, borderBottom: `1px solid ${SG.border}` }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${SG.nusOrange}15` }}>
                  <DollarSign className="w-4 h-4" style={{ color: SG.nusOrange }} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white/90">FSTI 3.0 Track 2</h3>
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>Financial Sector Technology & Innovation</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.6)" }}>
                  FSTI 3.0 Track 2 is designed for industry-wide financial infrastructure projects. It provides
                  up to 50% co-funding on eligible costs, with a 24-month funding period. The UNITS Network
                  qualifies as shared infrastructure that benefits the entire Singapore financial ecosystem.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="p-4 rounded-lg" style={{ background: `${SG.nusOrange}06` }}>
                    <h4 className="text-xs uppercase tracking-wider mb-2" style={{ color: `${SG.nusOrange}80` }}>Eligible Costs</h4>
                    <ul className="space-y-1.5">
                      {[
                        "Manpower costs (protocol engineers, smart contract developers)",
                        "Professional services (legal, regulatory advisory)",
                        "Software and infrastructure (cloud, DLT nodes)",
                        "Training and capability building",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
                          <CheckCircle2 className="w-3 h-3 mt-0.5 flex-shrink-0" style={{ color: SG.nusOrange }} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-4 rounded-lg" style={{ background: `${SG.nusOrange}06` }}>
                    <h4 className="text-xs uppercase tracking-wider mb-2" style={{ color: `${SG.nusOrange}80` }}>Key Terms</h4>
                    <div className="space-y-3">
                      {[
                        { label: "Co-funding", value: "Up to 50%" },
                        { label: "Duration", value: "24 months" },
                        { label: "Scope", value: "Industry-wide infrastructure" },
                        { label: "Applicant", value: "Consortium or lead FI" },
                      ].map((item, i) => (
                        <div key={i} className="flex justify-between">
                          <span className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{item.label}</span>
                          <span className="text-xs font-medium text-white/70">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-lg" style={{ background: `${SG.nusOrange}06`, border: `1px solid ${SG.nusOrange}10` }}>
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
                    <strong className="text-white/70">MAS Integration Grants:</strong> Separately, MAS provides
                    integration grants to help individual banks connect to shared infrastructure. This lowers the
                    barrier for bank adoption, as each participant's integration costs are partially subsidised.
                  </p>
                </div>
              </div>
            </div>

            {/* Institute of Programmable Finance */}
            <div className="rounded-2xl overflow-hidden mb-6" style={{ background: SG.card, border: `1px solid ${SG.border}` }}>
              <div className="px-6 py-4 flex items-center gap-3" style={{ background: `${SG.nusBlue}15`, borderBottom: `1px solid ${SG.border}` }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${SG.nusBlue}25` }}>
                  <GraduationCap className="w-4 h-4" style={{ color: "#6B9FD4" }} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white/90">Institute of Programmable Finance</h3>
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>NUS-anchored research initiative</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.6)" }}>
                  The Institute of Programmable Finance, anchored at NUS, provides a research-driven pathway
                  for protocol design and governance framework development. This is the minimal funding path
                  to bootstrap the network, combining academic rigour with practical implementation.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                  {[
                    { title: "Protocol Design", desc: "Formal verification of UNITS protocol smart contracts and tokenClass specifications", accent: "#6B9FD4" },
                    { title: "Governance Framework", desc: "Research-backed governance model for multi-stakeholder network operation", accent: "#6B9FD4" },
                    { title: "Regulatory Sandbox", desc: "Academic partnership with MAS for sandbox testing and regulatory feedback", accent: "#6B9FD4" },
                  ].map((item, i) => (
                    <div key={i} className="p-3 rounded-lg" style={{ background: `${SG.nusBlue}10` }}>
                      <div className="text-xs font-semibold text-white/80 mb-1">{item.title}</div>
                      <div className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>{item.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Funding comparison */}
            <div className="rounded-2xl overflow-hidden" style={{ background: SG.card, border: `1px solid ${SG.border}` }}>
              <div className="px-6 py-4" style={{ background: "rgba(255,255,255,0.02)", borderBottom: `1px solid ${SG.border}` }}>
                <h3 className="text-lg font-medium text-white/90">Funding pathway comparison</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ borderBottom: `1px solid ${SG.border}` }}>
                      <th className="text-left p-4 text-white/50 font-medium">Dimension</th>
                      <th className="text-left p-4 font-medium" style={{ color: `${SG.nusOrange}cc` }}>FSTI 3.0 Track 2</th>
                      <th className="text-left p-4 font-medium" style={{ color: "#6B9FD4" }}>Institute of Prog. Finance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { dim: "Funding level", fsti: "Higher (50% co-funding)", ipf: "Research grant level" },
                      { dim: "Timeline", fsti: "24 months", ipf: "12-18 months" },
                      { dim: "Scope", fsti: "Full production infrastructure", ipf: "Protocol design + sandbox" },
                      { dim: "Applicant", fsti: "Consortium / lead FI", ipf: "NUS + industry partners" },
                      { dim: "Output", fsti: "Production-ready network", ipf: "Validated protocol + governance" },
                      { dim: "Risk", fsti: "Lower (proven grant structure)", ipf: "Lower (academic partnership)" },
                    ].map((row, i) => (
                      <tr key={i} style={{ borderBottom: `1px solid ${SG.border}` }}>
                        <td className="p-4 text-white/70 font-medium">{row.dim}</td>
                        <td className="p-4" style={{ color: "rgba(255,255,255,0.5)" }}>{row.fsti}</td>
                        <td className="p-4" style={{ color: "rgba(255,255,255,0.5)" }}>{row.ipf}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </RevealSection>

        {/* Participant Map */}
        <RevealSection id="participants" delay={100}>
          <section>
            <h2 className="text-2xl font-light mb-6">Participant <span className="font-semibold">ecosystem</span></h2>
            <p className="text-sm leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.6)" }}>
              Singapore's financial ecosystem already has 40+ institutions with tokenisation experience from
              Project Guardian and related initiatives. These are the natural participants for the UNITS Network.
            </p>

            {/* Categories */}
            <div className="space-y-4">
              {/* Local Banks */}
              <div className="rounded-xl overflow-hidden" style={{ background: SG.card, border: `1px solid ${SG.border}` }}>
                <div className="px-5 py-3 flex items-center gap-2" style={{ background: `${SG.red}06`, borderBottom: `1px solid ${SG.border}` }}>
                  <Building2 className="w-4 h-4" style={{ color: SG.red }} />
                  <span className="text-sm font-semibold text-white/90">Local Banks</span>
                </div>
                <div className="p-5">
                  <div className="grid grid-cols-3 gap-3 mb-3">
                    {[
                      { name: "DBS", role: "Largest bank, operates DDEx", highlight: true },
                      { name: "OCBC", role: "Wealth management, custody services", highlight: false },
                      { name: "UOB", role: "Trade finance, institutional banking", highlight: false },
                    ].map((b, i) => (
                      <div key={i} className="p-3 rounded-lg" style={{
                        background: b.highlight ? `${SG.red}08` : "rgba(255,255,255,0.02)",
                        border: b.highlight ? `1px solid ${SG.red}15` : `1px solid ${SG.border}`
                      }}>
                        <div className="text-sm font-medium text-white/85">{b.name}</div>
                        <div className="text-[10px]" style={{ color: "rgba(255,255,255,0.4)" }}>{b.role}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Global Banks */}
              <div className="rounded-xl overflow-hidden" style={{ background: SG.card, border: `1px solid ${SG.border}` }}>
                <div className="px-5 py-3 flex items-center gap-2" style={{ background: `${SG.masTeal}06`, borderBottom: `1px solid ${SG.border}` }}>
                  <Globe className="w-4 h-4" style={{ color: SG.masTeal }} />
                  <span className="text-sm font-semibold text-white/90">Global Banks (Singapore Operations)</span>
                </div>
                <div className="p-5">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {[
                      { name: "HSBC", role: "GL1 member, custody" },
                      { name: "J.P. Morgan", role: "GL1 member, Onyx" },
                      { name: "Citi", role: "Token services, global custody" },
                      { name: "Standard Chartered", role: "GL1 member, Zodia Custody" },
                      { name: "BNY", role: "Largest custodian, asset servicing" },
                      { name: "MUFG", role: "GL1 member, Japan link" },
                      { name: "Deutsche Bank", role: "Custody, securities" },
                      { name: "BNP Paribas", role: "Securities services" },
                    ].map((b, i) => (
                      <div key={i} className="p-2 rounded-lg" style={{ background: `${SG.masTeal}06` }}>
                        <div className="text-xs font-medium text-white/80">{b.name}</div>
                        <div className="text-[10px]" style={{ color: "rgba(255,255,255,0.35)" }}>{b.role}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Digital Asset Platforms */}
              <div className="rounded-xl overflow-hidden" style={{ background: SG.card, border: `1px solid ${SG.border}` }}>
                <div className="px-5 py-3 flex items-center gap-2" style={{ background: `${SG.finternetCyan}06`, borderBottom: `1px solid ${SG.border}` }}>
                  <Zap className="w-4 h-4" style={{ color: SG.finternetCyan }} />
                  <span className="text-sm font-semibold text-white/90">Digital Asset Platforms</span>
                </div>
                <div className="p-5">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {[
                      { name: "InvestaX", role: "Licensed RMO, tokenisation" },
                      { name: "DigiFT", role: "Licensed RMO, tokenised bonds" },
                      { name: "Sygnum", role: "Digital asset bank" },
                      { name: "Matrixdock", role: "Tokenised T-bills" },
                      { name: "Marketnode", role: "SGX-Temasek JV, digital bonds" },
                      { name: "Fazz", role: "Stablecoin infrastructure" },
                      { name: "StraitsX", role: "SCS stablecoin issuer" },
                    ].map((p, i) => (
                      <div key={i} className="p-2 rounded-lg" style={{ background: `${SG.finternetCyan}06` }}>
                        <div className="text-xs font-medium text-white/80">{p.name}</div>
                        <div className="text-[10px]" style={{ color: "rgba(255,255,255,0.35)" }}>{p.role}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sovereign & Infrastructure */}
              <div className="rounded-xl overflow-hidden" style={{ background: SG.card, border: `1px solid ${SG.border}` }}>
                <div className="px-5 py-3 flex items-center gap-2" style={{ background: `${SG.finternetAmber}06`, borderBottom: `1px solid ${SG.border}` }}>
                  <Landmark className="w-4 h-4" style={{ color: SG.finternetAmber }} />
                  <span className="text-sm font-semibold text-white/90">Sovereign & Infrastructure</span>
                </div>
                <div className="p-5">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {[
                      { name: "MAS", role: "Regulator, Project Guardian" },
                      { name: "SGX", role: "Exchange, CDP operator" },
                      { name: "Temasek", role: "Sovereign wealth, innovation" },
                      { name: "GIC", role: "Sovereign wealth fund" },
                      { name: "NUS", role: "Research, Inst. of Prog. Finance" },
                      { name: "Euroclear", role: "ICSD, settlement infrastructure" },
                      { name: "Phillip Securities", role: "Brokerage, distribution" },
                      { name: "CGS-CIMB", role: "Brokerage, ASEAN link" },
                    ].map((p, i) => (
                      <div key={i} className="p-2 rounded-lg" style={{ background: `${SG.finternetAmber}06` }}>
                        <div className="text-xs font-medium text-white/80">{p.name}</div>
                        <div className="text-[10px]" style={{ color: "rgba(255,255,255,0.35)" }}>{p.role}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </RevealSection>

        {/* Phased Rollout */}
        <RevealSection id="rollout" delay={100}>
          <section>
            <h2 className="text-2xl font-light mb-6">Phased <span className="font-semibold">rollout</span></h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
              The network launches in three phases, each adding participants and asset classes progressively.
            </p>

            <div className="space-y-4">
              {[
                {
                  phase: "Phase 1: Foundation",
                  timeline: "Months 1-6",
                  accent: SG.nusOrange,
                  items: [
                    "3-5 founding participants (DBS, OCBC, Standard Chartered, Euroclear, StraitsX)",
                    "SGS bonds and SCS stablecoins as initial asset classes",
                    "Basic DVP settlement and wallet registry",
                    "MAS observer node operational",
                    "Institute of Programmable Finance research partnership",
                  ],
                },
                {
                  phase: "Phase 2: Expansion",
                  timeline: "Months 6-12",
                  accent: SG.masTeal,
                  items: [
                    "10-15 participants including global banks and digital asset platforms",
                    "Add equities, corporate bonds, gold tokets",
                    "Repo and financing capabilities live",
                    "P-toket creation enabled",
                    "FSTI 3.0 Track 2 application submitted",
                  ],
                },
                {
                  phase: "Phase 3: Full Network",
                  timeline: "Months 12-24",
                  accent: SG.finternetCyan,
                  items: [
                    "25+ participants across all categories",
                    "All 9 asset classes operational",
                    "Unsponsored tokets for global securities",
                    "VCC tokenisation live",
                    "Cross-border interoperability via UNITS protocol, both GL1-compliant",
                  ],
                },
              ].map((p, i) => (
                <div key={i} className="rounded-xl overflow-hidden" style={{ background: SG.card, border: `1px solid ${SG.border}` }}>
                  <div className="px-5 py-3 flex items-center justify-between" style={{ background: `${p.accent}08`, borderBottom: `1px solid ${SG.border}` }}>
                    <h3 className="text-sm font-semibold text-white/90">{p.phase}</h3>
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: `${p.accent}15`, color: p.accent }}>{p.timeline}</span>
                  </div>
                  <div className="p-5">
                    <ul className="space-y-2">
                      {p.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
                          <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: p.accent }} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </RevealSection>

        {/* Revenue Model */}
        <RevealSection id="revenue" delay={100}>
          <section>
            <h2 className="text-2xl font-light mb-6">Sustainable <span className="font-semibold">revenue</span> model</h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
              After the grant-funded bootstrap phase, the network sustains itself through transaction-based fees,
              similar to how existing CSDs operate but with lower costs due to automation.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: "Settlement Fees", desc: "Per-transaction fee for DVP settlement, significantly lower than current CSD fees due to smart contract automation", accent: SG.nusOrange },
                { title: "Custody Fees", desc: "Annual basis point fee on assets under custody in the network, tiered by asset class and volume", accent: SG.masTeal },
                { title: "Issuance Fees", desc: "One-time fee for tokenClass creation and tokenPool setup, covering compliance verification and network registration", accent: SG.finternetCyan },
                { title: "Data & Analytics", desc: "Premium data feeds for participants and regulators, including real-time portfolio analytics and market intelligence", accent: SG.finternetAmber },
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-xl" style={{ background: `${item.accent}06`, border: `1px solid ${item.accent}12` }}>
                  <h4 className="text-sm font-semibold text-white/90 mb-2">{item.title}</h4>
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </RevealSection>

        {/* UNITS Knowledge Base Links */}
        <div className="mt-16 p-6 rounded-xl" style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${SG.border}` }}>
          <p className="text-xs uppercase tracking-widest mb-4" style={{ color: "rgba(255,255,255,0.25)" }}>UNITS Knowledge Base</p>
          <div className="flex flex-wrap gap-3">
            {[
              { href: "/sg/deep-dive/participants", label: "Participants & Roles" },
              { href: "/sg/deep-dive/regulatory", label: "Regulatory Approvals" },
              { href: "/proof-of-value", label: "PoV Plan" },
              { href: "/tools/value-calculator", label: "Value Calculator" },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="px-3 py-1.5 rounded-full text-xs transition-colors" style={{ color: "rgba(255,255,255,0.35)", border: `1px solid ${SG.border}` }}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-4 pt-8" style={{ borderTop: `1px solid ${SG.border}` }}>
          <Link href="/sg/assets" className="flex items-center gap-2 text-sm transition-colors" style={{ color: "rgba(255,255,255,0.4)" }}>
            ← Asset Classes
          </Link>
          <div className="flex-1" />
          <Link href="/sg" className="flex items-center gap-2 text-sm transition-colors" style={{ color: `${SG.nusOrange}90` }}>
            Back to Executive Summary <ArrowRight className="w-3.5 h-3.5" />
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
