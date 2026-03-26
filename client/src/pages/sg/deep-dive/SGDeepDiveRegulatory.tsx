import { useRef, useState, useEffect } from "react";
import { Link } from "wouter";
import SGPortalNav, { SG } from "@/components/SGPortalNav";
import { CinematicBackground } from "@/components/motion";
import {
  ArrowRight, Shield, Scale, Landmark, CheckCircle2,
  FileText, Globe, Eye, Lock, Zap, Building2, Coins,
  Network, AlertTriangle, BookOpen, Users
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

export default function SGDeepDiveRegulatory() {
  return (
    <div className="min-h-screen text-white" style={{ background: SG.dark }}>
      <SGPortalNav />

      {/* Hero */}
      <section className="relative px-6 pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${SG.dark}, #0D1F3A 50%, #122B4A)` }} />
        <CinematicBackground variant="mixed" intensity={0.06} />
        <div className="relative max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <Scale className="w-5 h-5" style={{ color: SG.masTeal }} />
            <span className="text-xs font-medium tracking-[0.2em] uppercase" style={{ color: SG.masTeal }}>Deep Dive</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-light mb-4">
            <span className="font-semibold">Regulatory Framework</span> for UNITS|SG
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
            How the UNITS Network aligns with Singapore's regulatory landscape, from the Securities and Futures Act
            to the MAS Stablecoin Framework, and why Singapore's unified regulator model creates a uniquely
            favourable environment for programmable securities infrastructure.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-6 pb-24 space-y-20">

        {/* Singapore's Regulatory Advantage */}
        <RevealSection id="advantage">
          <section>
            <h2 className="text-2xl font-light mb-6">Singapore's <span className="font-semibold">regulatory advantage</span></h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
              Singapore has a structural advantage that no European jurisdiction can match: the Monetary Authority
              of Singapore (MAS) serves simultaneously as the central bank, the financial supervisor, and the
              securities regulator. In Europe, the equivalent functions are split across the ECB, ESMA, and
              27 national regulators, creating coordination challenges that can delay innovation by years.
            </p>
            <p className="text-sm leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.6)" }}>
              For the UNITS Network, this means a single regulatory conversation, a single approval pathway,
              and a single observer node that covers all aspects of the infrastructure: monetary policy,
              securities regulation, and payment system oversight.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl p-5" style={{ background: `${SG.masTeal}06`, border: `1px solid ${SG.masTeal}12` }}>
                <div className="text-xs uppercase tracking-wider mb-3" style={{ color: SG.masTeal }}>Singapore (MAS)</div>
                <div className="space-y-2">
                  {[
                    "Single unified regulator",
                    "Central bank + securities supervisor",
                    "One approval pathway",
                    "One observer node covers all",
                    "Active innovation mandate (FSTI 3.0)",
                    "GL1 standards benchmark sponsor",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3 h-3 mt-0.5 shrink-0" style={{ color: SG.masTeal }} />
                      <span className="text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-xl p-5" style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${SG.border}` }}>
                <div className="text-xs uppercase tracking-wider mb-3" style={{ color: "rgba(255,255,255,0.4)" }}>Europe (Multiple Bodies)</div>
                <div className="space-y-2">
                  {[
                    "ECB (monetary), ESMA (securities), 27 NCAs",
                    "Separate central bank and supervisor",
                    "Multiple approval pathways per jurisdiction",
                    "Multiple observer nodes needed",
                    "DLT Pilot Regime (limited scope)",
                    "No unified infrastructure initiative",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <AlertTriangle className="w-3 h-3 mt-0.5 shrink-0" style={{ color: "rgba(255,255,255,0.25)" }} />
                      <span className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </RevealSection>

        {/* Key Regulations */}
        <RevealSection id="regulations" delay={100}>
          <section>
            <h2 className="text-2xl font-light mb-6">Key <span className="font-semibold">regulations</span></h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
              Six regulatory frameworks govern how the UNITS Network operates in Singapore. Each one maps
              directly to specific capabilities of the protocol.
            </p>

            <div className="space-y-4">
              {[
                {
                  title: "Securities and Futures Act (SFA)",
                  icon: FileText,
                  color: SG.masTeal,
                  desc: "The primary legislation governing all securities activities in Singapore. Defines what constitutes a security, who can deal in them, and how they must be settled.",
                  mapping: [
                    { units: "tokenClass definition", sfa: "Meets SFA definition of 'securities' under Part I" },
                    { units: "Verifiable Credentials", sfa: "Enforces CMS licence requirements for participants" },
                    { units: "Transfer Restriction programs", sfa: "Implements SFA investor eligibility rules on-ledger" },
                    { units: "Observer node", sfa: "Provides MAS with supervisory access per SFA Part IX" },
                  ]
                },
                {
                  title: "Payment Services Act (PSA)",
                  icon: Coins,
                  color: SG.nusOrange,
                  desc: "Governs digital payment tokens and payment services. Critical for the XSGD stablecoin cash leg used in atomic DvP settlement.",
                  mapping: [
                    { units: "XSGD settlement", sfa: "SCS-compliant stablecoin under PSA Major Payment Institution licence" },
                    { units: "Cross-border payments", sfa: "PSA cross-border transfer service provisions" },
                    { units: "Wallet providers", sfa: "PSA digital payment token service licence requirements" },
                  ]
                },
                {
                  title: "MAS Stablecoin Framework (SCS)",
                  icon: Shield,
                  color: SG.finternetCyan,
                  desc: "Launched August 2023. Defines requirements for single-currency stablecoins pegged to SGD or G10 currencies. Provides the regulatory foundation for the cash leg of atomic DvP.",
                  mapping: [
                    { units: "XSGD as cash leg", sfa: "First SCS-regulated stablecoin, 1:1 SGD reserve requirement" },
                    { units: "Reserve management", sfa: "SCS requires segregated reserves in high-quality liquid assets" },
                    { units: "Redemption guarantee", sfa: "SCS mandates par redemption within 5 business days" },
                  ]
                },
                {
                  title: "Technology Risk Management Guidelines",
                  icon: Lock,
                  color: SG.nusBlue,
                  desc: "MAS guidelines for operational resilience of technology infrastructure in financial services. Applies to the UNITS Network as critical market infrastructure.",
                  mapping: [
                    { units: "GL1-compliant network layer", sfa: "Meets TRM requirements for system availability and resilience" },
                    { units: "Key management", sfa: "Cryptographic key management per TRM Section 11" },
                    { units: "Incident response", sfa: "TRM Section 7 incident management and reporting" },
                  ]
                },
                {
                  title: "Financial Services and Markets Act (FSMA)",
                  icon: Globe,
                  color: SG.finternetAmber,
                  desc: "Broader financial services regulation covering cross-border activities. Relevant for tokenised asset distribution beyond Singapore.",
                  mapping: [
                    { units: "Cross-ledger gateway", sfa: "FSMA provisions for cross-border financial services" },
                    { units: "Unsponsored tokets", sfa: "FSMA framework for offering foreign securities to SG investors" },
                  ]
                },
                {
                  title: "GL1 Standards Compliance",
                  icon: Network,
                  color: SG.red,
                  desc: "MAS-initiated standards and compliance benchmark for tokenised asset infrastructure. UNITS Network is designed to be fully GL1-compliant, meeting its interoperability, governance, and regulatory standards.",
                  mapping: [
                    { units: "UNITS as GL1-compliant infrastructure", sfa: "Meets GL1 interoperability and governance standards" },
                    { units: "Multi-CSD interoperability", sfa: "GL1 standards enable cross-jurisdiction compatibility" },
                    { units: "Standards-based cost efficiency", sfa: "GL1 standards reduce integration costs across member institutions" },
                  ]
                },
              ].map((reg, i) => (
                <div key={i} className="rounded-xl overflow-hidden" style={{ border: `1px solid ${reg.color}15` }}>
                  <div className="px-5 py-3 flex items-center gap-3" style={{ background: `${reg.color}08` }}>
                    <reg.icon className="w-5 h-5" style={{ color: reg.color }} />
                    <div className="text-sm font-semibold text-white/90">{reg.title}</div>
                  </div>
                  <div className="px-5 py-4" style={{ background: `${reg.color}03` }}>
                    <p className="text-xs leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.5)" }}>{reg.desc}</p>
                    <div className="space-y-2">
                      {reg.mapping.map((m, j) => (
                        <div key={j} className="flex items-start gap-3 p-2 rounded-lg" style={{ background: `${reg.color}06` }}>
                          <div className="text-[10px] font-mono shrink-0 px-2 py-0.5 rounded" style={{ background: `${reg.color}12`, color: reg.color }}>
                            UNITS
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="text-xs text-white/60">{m.units}</span>
                            <span className="text-xs mx-2" style={{ color: "rgba(255,255,255,0.2)" }}>→</span>
                            <span className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>{m.sfa}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </RevealSection>

        {/* MAS Innovation Initiatives */}
        <RevealSection id="initiatives" delay={100}>
          <section>
            <h2 className="text-2xl font-light mb-6">MAS <span className="font-semibold">innovation initiatives</span></h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
              Beyond the regulatory framework, MAS actively sponsors innovation initiatives that align
              directly with the UNITS Network's objectives. These are not just permissive regulations;
              they are active programmes with funding, governance, and industry participation.
            </p>

            <div className="space-y-4">
              {[
                {
                  title: "Project Guardian",
                  status: "Active",
                  desc: "MAS-led industry initiative testing institutional-grade asset tokenisation. Over 15 financial institutions participating in pilots across fixed income, foreign exchange, and asset management. UNITS|SG aligns with Guardian's objective of creating regulated, interoperable tokenised asset markets.",
                  color: SG.masTeal,
                },
                {
                  title: "Project Orchid",
                  status: "Experimental",
                  desc: "MAS digital SGD initiative exploring purpose-bound money and programmable payments. The UNITS Network's Token Programs for conditional transfers align with Orchid's vision of programmable money. Future integration could enable CBDC-settled DvP.",
                  color: SG.nusOrange,
                },
                {
                  title: "Project Ubin+",
                  status: "Cross-border",
                  desc: "Multi-currency cross-border settlement initiative. The UNITS cross-ledger gateway can connect to Ubin+ infrastructure for cross-border DvP, enabling Singapore-issued tokets to settle against foreign currencies atomically.",
                  color: SG.finternetCyan,
                },
                {
                  title: "Global Layer One (GL1)",
                  status: "Standards",
                  desc: "MAS-initiated standards and compliance benchmark for tokenised asset infrastructure. UNITS Network is designed to be fully GL1-compliant, adhering to its interoperability standards, governance principles, and compliance requirements while providing the protocol and application layers.",
                  color: SG.red,
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-xl" style={{ background: `${item.color}04`, border: `1px solid ${item.color}10` }}>
                  <div className="shrink-0">
                    <div className="text-[9px] font-medium px-2 py-0.5 rounded-full" style={{ background: `${item.color}15`, color: item.color }}>
                      {item.status}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white/90 mb-1">{item.title}</div>
                    <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </RevealSection>

        {/* Compliance Matrix */}
        <RevealSection id="matrix" delay={100}>
          <section>
            <h2 className="text-2xl font-light mb-6">Compliance <span className="font-semibold">matrix</span></h2>

            <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${SG.border}` }}>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr style={{ background: SG.card }}>
                      <th className="text-left p-3 font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>UNITS Capability</th>
                      <th className="text-left p-3 font-medium" style={{ color: `${SG.masTeal}80` }}>SFA</th>
                      <th className="text-left p-3 font-medium" style={{ color: `${SG.nusOrange}80` }}>PSA</th>
                      <th className="text-left p-3 font-medium" style={{ color: `${SG.finternetCyan}80` }}>SCS</th>
                      <th className="text-left p-3 font-medium" style={{ color: `${SG.nusBlue}80` }}>TRM</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { cap: "Token issuance", sfa: "✓", psa: "", scs: "", trm: "✓" },
                      { cap: "Atomic DvP", sfa: "✓", psa: "✓", scs: "✓", trm: "✓" },
                      { cap: "Proxy tokenisation", sfa: "✓", psa: "", scs: "", trm: "✓" },
                      { cap: "XSGD settlement", sfa: "", psa: "✓", scs: "✓", trm: "" },
                      { cap: "Transfer restrictions", sfa: "✓", psa: "", scs: "", trm: "" },
                      { cap: "Observer node", sfa: "✓", psa: "✓", scs: "", trm: "✓" },
                      { cap: "Cross-ledger gateway", sfa: "✓", psa: "✓", scs: "", trm: "✓" },
                      { cap: "Wallet registry", sfa: "✓", psa: "✓", scs: "", trm: "✓" },
                      { cap: "Collateral management", sfa: "✓", psa: "", scs: "", trm: "✓" },
                      { cap: "Corporate actions", sfa: "✓", psa: "", scs: "", trm: "" },
                    ].map((row, i) => (
                      <tr key={i} style={{ borderTop: `1px solid ${SG.border}` }}>
                        <td className="p-3 font-medium text-white/70">{row.cap}</td>
                        <td className="p-3 text-center" style={{ color: row.sfa ? SG.masTeal : "rgba(255,255,255,0.15)" }}>{row.sfa || "-"}</td>
                        <td className="p-3 text-center" style={{ color: row.psa ? SG.nusOrange : "rgba(255,255,255,0.15)" }}>{row.psa || "-"}</td>
                        <td className="p-3 text-center" style={{ color: row.scs ? SG.finternetCyan : "rgba(255,255,255,0.15)" }}>{row.scs || "-"}</td>
                        <td className="p-3 text-center" style={{ color: row.trm ? SG.nusBlue : "rgba(255,255,255,0.15)" }}>{row.trm || "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </RevealSection>

        {/* Observer Node Architecture */}
        <RevealSection id="observer" delay={100}>
          <section>
            <h2 className="text-2xl font-light mb-6">MAS <span className="font-semibold">observer node</span></h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
              The MAS observer node is a read-only node on the UNITS|SG network that gives MAS real-time
              supervisory access to all settlement activity. This replaces post-trade reporting with live
              monitoring, a fundamental improvement in regulatory oversight capability.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { icon: Eye, label: "Real-Time Settlement Monitoring", desc: "Every atomic DvP transaction is visible to MAS as it executes, not hours or days later in a batch report" },
                { icon: Users, label: "Participant Activity", desc: "Aggregate and per-participant trading volumes, position concentrations, and credential status" },
                { icon: Shield, label: "Compliance Verification", desc: "Real-time verification that transfer restrictions, investor eligibility, and position limits are being enforced" },
                { icon: Network, label: "Systemic Risk Dashboard", desc: "Cross-depository flows, collateral concentration, and settlement failure rates visible in real-time" },
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-xl" style={{ background: `${SG.masTeal}06`, border: `1px solid ${SG.masTeal}10` }}>
                  <item.icon className="w-5 h-5 mb-2" style={{ color: SG.masTeal }} />
                  <div className="text-sm font-medium text-white/90 mb-1">{item.label}</div>
                  <div className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </section>
        </RevealSection>

        {/* UNITS Knowledge Base Cross-Links */}
        <div className="mt-16 p-6 rounded-xl" style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${SG.border}` }}>
          <p className="text-xs uppercase tracking-widest mb-4" style={{ color: "rgba(255,255,255,0.25)" }}>UNITS Knowledge Base</p>
          <div className="flex flex-wrap gap-3">
            {[
              { href: "/sg/deep-dive/regulatory", label: "Regulatory (EU Framework)" },
              { href: "/sg/deep-dive/units", label: "UNITS Protocol" },
              { href: "/sg/deep-dive/wallet-register", label: "Wallet & Register" },
              { href: "/sg/deep-dive/cross-ledger", label: "Cross-Ledger Connectivity" },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="px-3 py-1.5 rounded-full text-xs transition-colors" style={{ color: "rgba(255,255,255,0.35)", border: `1px solid ${SG.border}` }}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-4 pt-8" style={{ borderTop: `1px solid ${SG.border}` }}>
          <Link href="/sg/deep-dive/tokenisation" className="flex items-center gap-2 text-sm transition-colors" style={{ color: "rgba(255,255,255,0.4)" }}>
            ← Tokenisation
          </Link>
          <div className="flex-1" />
          <Link href="/sg/deep-dive/collateral-highway" className="flex items-center gap-2 text-sm transition-colors" style={{ color: `${SG.masTeal}90` }}>
            Next: Collateral Highway <ArrowRight className="w-3.5 h-3.5" />
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
