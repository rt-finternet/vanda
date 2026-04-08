import { useRef, useState, useEffect } from "react";
import { Link } from "wouter";
import SGPortalNav, { SG } from "@/components/SGPortalNav";
import { CrossPersonaCallout } from "@/components/IPEComponents";
import ZoneRenderer from "@/components/ZoneRenderer";
import { CinematicBackground } from "@/components/motion";
import {
  ArrowRight, Network, Layers, Shield, Globe, Wallet, Eye,
  Server, Database, GitBranch, Lock, CheckCircle2, Users,
  Building2, Landmark, ArrowRightLeft, Zap
} from "lucide-react";
import InteractiveArchDiagram from "@/components/InteractiveArchDiagram";

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

export default function SGArchitecture() {
  return (
    <div className="min-h-screen text-white" style={{ background: SG.dark }}>
      <SGPortalNav />

      {/* Hero */}
      <section className="relative px-6 pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${SG.dark}, #0D1F3A 50%, #122B4A)` }} />
        <CinematicBackground variant="mixed" intensity={0.06} />
        <div className="relative max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <Network className="w-5 h-5" style={{ color: SG.masTeal }} />
            <span className="text-xs font-medium tracking-[0.2em] uppercase" style={{ color: SG.masTeal }}>Architecture</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-light mb-4">
            Network <span className="font-semibold">Architecture</span> & GL1 Compliance
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
            A GL1-compliant shared ledger, multi-network compatible infrastructure providing
            the protocol and application layers for Singapore's domestic tokenised asset market.
          </p>
        </div>
      </section>

      {/* Interactive Architecture Diagram */}
      <div className="max-w-5xl mx-auto px-6 pt-8 pb-12">
        <RevealSection id="interactive-diagram">
          <section>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-light mb-2">Interactive <span className="font-semibold">Architecture Map</span></h2>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>Hover to explore connections. Click any component to open its deep-dive.</p>
            </div>
            <div className="rounded-2xl p-4 md:p-6" style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${SG.border}` }}>
              <InteractiveArchDiagram />
            </div>
          </section>
        </RevealSection>
      </div>

      <div className="max-w-3xl mx-auto px-6 pb-24 space-y-20">

        <ZoneRenderer pageId="/sg/architecture" className="space-y-20">

        {/* Three-Layer Architecture */}
        <ZoneRenderer.Zone zoneId="three-layer" naturalIndex={0}>
        <RevealSection id="three-layer">
          <section>
            <h2 className="text-2xl font-light mb-6">The <span className="font-semibold">three-layer</span> stack</h2>
            <p className="text-sm leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.6)" }}>
              The UNITS Network does not operate in isolation. It is the middle layer of a three-tier architecture
              where each layer has distinct responsibilities, governance, and participants.
            </p>

            {/* Visual stack */}
            <div className="space-y-3 mb-8">
              {/* Layer 3: Participant Apps */}
              <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${SG.finternetCyan}25` }}>
                <div className="px-5 py-3 flex items-center gap-3" style={{ background: `${SG.finternetCyan}10` }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${SG.finternetCyan}20` }}>
                    <Users className="w-4 h-4" style={{ color: SG.finternetCyan }} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white/90">Layer 3: Participant Applications</div>
                    <div className="text-[10px] uppercase tracking-wider" style={{ color: `${SG.finternetCyan}80` }}>Governed by individual banks & FIs</div>
                  </div>
                </div>
                <div className="px-5 py-4" style={{ background: `${SG.finternetCyan}04` }}>
                  <p className="text-sm mb-3" style={{ color: "rgba(255,255,255,0.55)" }}>
                    Each participant builds their own client-facing applications on top of the UNITS Network APIs.
                    This is where differentiation happens: user experience, product packaging, advisory services.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Issuance Portals", "Distribution Interfaces", "Custody Dashboards", "BYOW Wallets", "Advisory Tools", "Compliance UIs"].map(t => (
                      <span key={t} className="text-xs px-2 py-0.5 rounded-full" style={{ background: `${SG.finternetCyan}12`, color: `${SG.finternetCyan}cc` }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex justify-center">
                <div className="w-px h-6" style={{ background: `linear-gradient(to bottom, ${SG.finternetCyan}30, ${SG.nusOrange}30)` }} />
              </div>

              {/* Layer 2: UNITS Network */}
              <div className="rounded-xl overflow-hidden" style={{ border: `2px solid ${SG.nusOrange}40` }}>
                <div className="px-5 py-3 flex items-center gap-3" style={{ background: `${SG.nusOrange}12` }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${SG.nusOrange}20` }}>
                    <Layers className="w-4 h-4" style={{ color: SG.nusOrange }} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white/90">Layer 2: UNITS Network (Protocol Layer)</div>
                    <div className="text-[10px] uppercase tracking-wider" style={{ color: `${SG.nusOrange}80` }}>Network governance + MAS observer</div>
                  </div>
                </div>
                <div className="px-5 py-4" style={{ background: `${SG.nusOrange}06` }}>
                  <p className="text-sm mb-3" style={{ color: "rgba(255,255,255,0.55)" }}>
                    The protocol layer that provides common standards, distribution rules, and compliance enforcement.
                    This is where the UNITS architecture lives: tokenClasses, tokenPools, UILP gates, and the wallet registry.
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {[
                      { label: "tokenClasses", desc: "Asset definitions with lifecycle rules" },
                      { label: "tokenPools", desc: "Issuance management and supply control" },
                      { label: "UILP Gates", desc: "Distribution rules and compliance" },
                      { label: "Wallet Registry", desc: "BYOW registration and verification" },
                      { label: "Settlement Engine", desc: "Atomic DVP with SCS stablecoins" },
                      { label: "Observer Node", desc: "MAS real-time supervisory access" },
                    ].map((item, i) => (
                      <div key={i} className="p-2 rounded-lg" style={{ background: `${SG.nusOrange}08` }}>
                        <div className="text-xs font-medium" style={{ color: SG.nusOrange }}>{item.label}</div>
                        <div className="text-[10px]" style={{ color: "rgba(255,255,255,0.4)" }}>{item.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex justify-center">
                <div className="w-px h-6" style={{ background: `linear-gradient(to bottom, ${SG.nusOrange}30, ${SG.masTeal}30)` }} />
              </div>

              {/* Standards: GL1 Compliance */}
              <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${SG.masTeal}25` }}>
                <div className="px-5 py-3 flex items-center gap-3" style={{ background: `${SG.masTeal}10` }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${SG.masTeal}20` }}>
                    <Globe className="w-4 h-4" style={{ color: SG.masTeal }} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white/90">Standards: GL1-Compliant (Global Layer One)</div>
                    <div className="text-[10px] uppercase tracking-wider" style={{ color: `${SG.masTeal}80` }}>MAS-initiated benchmark (15+ FI members)</div>
                  </div>
                </div>
                <div className="px-5 py-4" style={{ background: `${SG.masTeal}04` }}>
                  <p className="text-sm mb-3" style={{ color: "rgba(255,255,255,0.55)" }}>
                    GL1 is a standards and compliance benchmark initiated by MAS, defining interoperability standards,
                    governance principles, and compliance requirements for tokenised asset infrastructure.
                    The UNITS Network is designed to be fully GL1-compliant.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Interoperability Standards", "Governance Principles", "Compliance Requirements", "Cross-Border Compatibility", "Multi-Network Support"].map(t => (
                      <span key={t} className="text-xs px-2 py-0.5 rounded-full" style={{ background: `${SG.masTeal}12`, color: `${SG.masTeal}cc` }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Existing depositories */}
            <div className="rounded-xl p-5" style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${SG.border}` }}>
              <div className="text-xs uppercase tracking-wider mb-3" style={{ color: "rgba(255,255,255,0.3)" }}>Connected Infrastructure</div>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-3 p-3 rounded-lg" style={{ background: `${SG.red}06` }}>
                  <Building2 className="w-5 h-5" style={{ color: SG.red }} />
                  <div>
                    <div className="text-sm font-medium text-white/80">SGX CDP</div>
                    <div className="text-[10px]" style={{ color: "rgba(255,255,255,0.4)" }}>Equities, corporate bonds</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg" style={{ background: `${SG.masTeal}06` }}>
                  <Landmark className="w-5 h-5" style={{ color: SG.masTeal }} />
                  <div>
                    <div className="text-sm font-medium text-white/80">MAS MEPS+</div>
                    <div className="text-[10px]" style={{ color: "rgba(255,255,255,0.4)" }}>Government securities, SGD</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </RevealSection>
        </ZoneRenderer.Zone>

        {/* GL1 Settlement Layer */}
        <ZoneRenderer.Zone zoneId="gl1" naturalIndex={1}>
        <RevealSection id="gl1" delay={100}>
          <section>
            <h2 className="text-2xl font-light mb-6"><span className="font-semibold">GL1</span> compliance</h2>

            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
              The Global Layer One (GL1) initiative was launched by MAS in 2023 as a standards and compliance benchmark
              for tokenised asset infrastructure. It now includes 15+ major financial institutions as members.
              The UNITS Network is designed to be fully GL1-compliant, meeting its interoperability, governance,
              and regulatory standards.
            </p>

            <div className="rounded-2xl overflow-hidden mb-6" style={{ background: SG.card, border: `1px solid ${SG.border}` }}>
              <div className="px-6 py-4" style={{ background: `${SG.masTeal}08`, borderBottom: `1px solid ${SG.border}` }}>
                <h3 className="text-lg font-medium text-white/90">GL1 Members</h3>
                <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>Standards and compliance benchmark for tokenised assets</p>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                  {[
                    { name: "HSBC", role: "Banking / Custody", highlight: true },
                    { name: "J.P. Morgan", role: "Banking / Onyx", highlight: true },
                    { name: "MUFG", role: "Banking / Japan", highlight: true },
                    { name: "Standard Chartered", role: "Banking / Zodia Custody", highlight: true },
                  ].map((m, i) => (
                    <div key={i} className="p-3 rounded-lg" style={{
                      background: m.highlight ? `${SG.nusOrange}10` : "rgba(255,255,255,0.02)",
                      border: m.highlight ? `1px solid ${SG.nusOrange}25` : `1px solid ${SG.border}`
                    }}>
                      <div className="text-sm font-medium text-white/85">{m.name}</div>
                      <div className="text-[10px]" style={{ color: m.highlight ? `${SG.nusOrange}80` : "rgba(255,255,255,0.35)" }}>{m.role}</div>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-lg" style={{ background: `${SG.masTeal}06`, border: `1px solid ${SG.masTeal}10` }}>
                  <p className="text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
                    <strong className="text-white/80">Why this matters:</strong> GL1 membership by HSBC, J.P. Morgan, MUFG, and Standard Chartered
                    means these institutions are committed to the same interoperability standards. A tokenised SGS bond on the
                    GL1-compliant UNITS Network can be recognised across any GL1-compliant infrastructure globally, creating
                    seamless cross-border collateral mobility and settlement interoperability.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </RevealSection>
        </ZoneRenderer.Zone>

        {/* Bring Your Own Wallet */}
        <ZoneRenderer.Zone zoneId="byow" naturalIndex={2}>
        <RevealSection id="byow" delay={100}>
          <section>
            <h2 className="text-2xl font-light mb-6">Bring Your Own <span className="font-semibold">Wallet</span> (BYOW)</h2>

            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
              Unlike platforms that force participants onto a single wallet infrastructure, the UNITS Network
              allows each bank and financial institution to bring their own wallet technology. This is critical
              for adoption, since no bank will abandon its existing custody infrastructure.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {[
                {
                  bank: "DBS",
                  wallet: "DBS Digital Exchange wallet infrastructure",
                  desc: "Already operates DDEx with tokenised securities. Connects existing wallet to UNITS Network.",
                  accent: SG.red,
                },
                {
                  bank: "OCBC",
                  wallet: "OCBC custody wallet",
                  desc: "Wealth management and custody clients access the network through OCBC's own wallet layer.",
                  accent: SG.nusOrange,
                },
                {
                  bank: "UOB",
                  wallet: "UOB institutional wallet",
                  desc: "Trade finance and institutional clients use UOB's wallet infrastructure for network access.",
                  accent: SG.masTeal,
                },
                {
                  bank: "Standard Chartered",
                  wallet: "SC Ventures / Zodia wallet",
                  desc: "Digital asset custody via Zodia Custody, connected to the UNITS Network protocol.",
                  accent: SG.finternetCyan,
                },
              ].map((item, i) => (
                <div key={i} className="p-5 rounded-xl" style={{ background: `${item.accent}06`, border: `1px solid ${item.accent}12` }}>
                  <h4 className="text-sm font-semibold text-white/90 mb-1">{item.bank}</h4>
                  <div className="text-xs mb-2" style={{ color: item.accent }}>{item.wallet}</div>
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="rounded-xl p-5" style={{ background: SG.card, border: `1px solid ${SG.border}` }}>
              <h4 className="text-sm font-semibold text-white/80 mb-3">How BYOW works</h4>
              <div className="space-y-2">
                {[
                  { step: "1", label: "Register", desc: "Bank registers its wallet infrastructure with the UNITS Network, providing compliance certificates and technical specifications" },
                  { step: "2", label: "Certify", desc: "Network verifies wallet meets security, compliance, and interoperability standards. MAS observer validates regulatory compliance" },
                  { step: "3", label: "Connect", desc: "Wallet connects to UNITS Network APIs. Bank's clients can now access all asset classes, settlement, and collateral services" },
                  { step: "4", label: "Operate", desc: "Bank maintains full control of its wallet infrastructure. UNITS Network enforces common rules across all connected wallets" },
                ].map((s, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg" style={{ background: "rgba(255,255,255,0.02)" }}>
                    <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold" style={{ background: `${SG.nusOrange}15`, color: SG.nusOrange }}>
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
          </section>
        </RevealSection>
        </ZoneRenderer.Zone>

        {/* Observer Nodes */}
        <ZoneRenderer.Zone zoneId="observer" naturalIndex={3}>
        <RevealSection id="observer" delay={100}>
          <section>
            <h2 className="text-2xl font-light mb-6">MAS <span className="font-semibold">Observer</span> Node</h2>

            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
              MAS operates a regulatory observer node with live visibility into compliance state across the entire network.
              This is not a reporting system; it is real-time supervisory infrastructure.
            </p>

            <div className="rounded-2xl overflow-hidden" style={{ background: SG.card, border: `1px solid ${SG.border}` }}>
              <div className="px-6 py-4" style={{ background: `${SG.masTeal}08`, borderBottom: `1px solid ${SG.border}` }}>
                <div className="flex items-center gap-2">
                  <Eye className="w-5 h-5" style={{ color: SG.masTeal }} />
                  <h3 className="text-lg font-medium text-white/90">What MAS sees in real time</h3>
                </div>
              </div>
              <div className="p-6 space-y-3">
                {[
                  { label: "Compliance state", desc: "Every wallet's VC (Verifiable Credential) status (investor suitability, accreditation, AML/KYC verification)", icon: <Shield className="w-4 h-4" /> },
                  { label: "Concentration risk", desc: "Portfolio-level exposure across all participants. Sector, issuer, and asset class concentration visible in real time", icon: <ArrowRightLeft className="w-4 h-4" /> },
                  { label: "Settlement finality", desc: "Every DVP transaction from initiation to atomic settlement. No more T+2 uncertainty about whether trades will fail", icon: <CheckCircle2 className="w-4 h-4" /> },
                  { label: "Collateral positions", desc: "All pledged collateral, margin levels, and repo positions across the network. Early warning on systemic stress", icon: <Lock className="w-4 h-4" /> },
                  { label: "Cross-border flows", desc: "Unsponsored toket issuance and redemption. Visibility into foreign securities represented on the network", icon: <Globe className="w-4 h-4" /> },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg" style={{ background: `${SG.masTeal}06` }}>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${SG.masTeal}15` }}>
                      <span style={{ color: SG.masTeal }}>{item.icon}</span>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white/80">{item.label}</div>
                      <div className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </RevealSection>
        </ZoneRenderer.Zone>

        {/* Multi-Chain Connectivity */}
        <ZoneRenderer.Zone zoneId="multi-chain" naturalIndex={4}>
        <RevealSection id="multi-chain" delay={100}>
          <section>
            <h2 className="text-2xl font-light mb-6"><span className="font-semibold">Multi-chain</span> enforcement</h2>

            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
              Participants can operate on different blockchains. DBS might use one chain, OCBC another.
              The UNITS protocol enforces common rules across all chains, ensuring consistent governance
              regardless of the underlying technology. This is critical for a network that must accommodate
              diverse institutional preferences.
            </p>

            <div className="rounded-xl p-5" style={{ background: SG.card, border: `1px solid ${SG.border}` }}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { label: "Common Standards", desc: "tokenClass definitions, UILP rules, and settlement protocols are chain-agnostic", accent: SG.nusOrange },
                  { label: "Cross-Chain DVP", desc: "Atomic settlement works across chains via the UNITS protocol layer, not chain-specific bridges", accent: SG.masTeal },
                  { label: "Unified Compliance", desc: "VC verification and regulatory reporting work identically regardless of which chain holds the toket", accent: SG.finternetCyan },
                ].map((item, i) => (
                  <div key={i} className="p-4 rounded-lg" style={{ background: `${item.accent}06` }}>
                    <h4 className="text-sm font-semibold mb-2" style={{ color: item.accent }}>{item.label}</h4>
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>{item.desc}</p>
                  </div>
                ))}
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
              { href: "/sg/deep-dive/units", label: "UNITS Protocol" },
              { href: "/sg/deep-dive/wallet-register", label: "Wallet & Register" },
              { href: "/sg/deep-dive/cross-ledger", label: "Cross-Ledger Connectivity" },
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
          <Link href="/sg/problem" className="flex items-center gap-2 text-sm transition-colors" style={{ color: "rgba(255,255,255,0.4)" }}>
            ← Fragmented Infrastructure
          </Link>
          <div className="flex-1" />
          <Link href="/sg/capabilities" className="flex items-center gap-2 text-sm transition-colors" style={{ color: `${SG.finternetCyan}90` }}>
            Next: Capabilities <ArrowRight className="w-3.5 h-3.5" />
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
