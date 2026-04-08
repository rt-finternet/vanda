import { useRef, useState, useEffect } from "react";
import { Link } from "wouter";
import SGPortalNav, { SG } from "@/components/SGPortalNav";
import { CinematicBackground } from "@/components/motion";
import {
  ArrowRight, ArrowRightLeft, Shield, Lock, CheckCircle2, Zap,
  Clock, Layers, Globe, AlertTriangle, Database, FileCheck,
  Landmark, Building2, Banknote, Users, Eye, Network
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

export default function SGDeepDiveDVP() {
  return (
    <div className="vanda-portal min-h-screen text-white" style={{ background: SG.dark }}>
      <SGPortalNav />

      {/* Hero */}
      <section className="relative px-6 pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${SG.dark}, #0D1F3A 50%, #122B4A)` }} />
        <CinematicBackground variant="mixed" intensity={0.06} />
        <div className="relative max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <ArrowRightLeft className="w-5 h-5" style={{ color: SG.masTeal }} />
            <span className="text-xs font-medium tracking-[0.2em] uppercase" style={{ color: SG.masTeal }}>Deep Dive</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-light mb-4">
            Atomic <span className="font-semibold">DvP Settlement</span> for Singapore
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
            How the UNITS Network enables simultaneous delivery of securities and payment in Singapore,
            using XSGD stablecoins as the cash leg and bridging CDP equities with MEPS+ government securities
            into a single atomic settlement layer.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-6 pb-24 space-y-20">

        {/* The Atomic Guarantee */}
        <RevealSection id="atomic-guarantee">
          <section>
            <h2 className="text-2xl font-light mb-6">The <span className="font-semibold">atomic guarantee</span></h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
              In an atomic DvP transaction, the security leg and the cash leg settle simultaneously or not at all.
              There is no window where one party has delivered but the other has not. This eliminates principal risk,
              the single largest source of settlement failure in securities markets globally.
            </p>
            <p className="text-sm leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.6)" }}>
              In Singapore today, this guarantee does not exist across depositories. A DBS trader selling SGX-listed
              equities (held in CDP) and buying Singapore Government Securities (held in MEPS+) executes two
              separate settlement processes with no atomic linkage between them. The UNITS Network changes this.
            </p>

            <div className="rounded-2xl overflow-hidden" style={{ background: SG.card, border: `1px solid ${SG.border}` }}>
              <div className="p-5">
                <div className="text-xs uppercase tracking-wider mb-4" style={{ color: SG.masTeal }}>The Atomic Guarantee</div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { icon: Lock, label: "Both or Neither", desc: "Security and cash legs are cryptographically bound. If either fails, both revert." },
                    { icon: Zap, label: "Instant Finality", desc: "No T+2 waiting period. Settlement is final the moment both legs are confirmed." },
                    { icon: Shield, label: "Zero Principal Risk", desc: "No window where one party has delivered but the other has not." },
                  ].map((item, i) => (
                    <div key={i} className="p-5 rounded-xl" style={{ background: `${SG.masTeal}08` }}>
                      <item.icon className="w-5 h-5 mb-2" style={{ color: SG.masTeal }} />
                      <div className="text-sm font-medium text-white/90 mb-2">{item.label}</div>
                      <div className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>{item.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </RevealSection>

        {/* Singapore's Settlement Problem */}
        <RevealSection id="sg-problem" delay={100}>
          <section>
            <h2 className="text-2xl font-light mb-6">Singapore's <span className="font-semibold">settlement problem</span></h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
              Singapore operates two separate settlement systems that were never designed to work together.
              This creates structural inefficiencies that the UNITS Network resolves through atomic DvP.
            </p>

            <div className="space-y-4 mb-8">
              {/* CDP */}
              <div className="rounded-xl p-5" style={{ background: `${SG.red}06`, border: `1px solid ${SG.red}15` }}>
                <div className="flex items-center gap-4 mb-3">
                  <Building2 className="w-5 h-5" style={{ color: SG.red }} />
                  <div className="text-sm font-semibold text-white/90">SGX CDP Settlement</div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Cycle", value: "T+2 (moving to T+1)" },
                    { label: "Assets", value: "Equities, corporate bonds, ETFs" },
                    { label: "Cash leg", value: "SGD via banking system" },
                    { label: "Finality", value: "End-of-day batch" },
                  ].map((item, i) => (
                    <div key={i} className="p-3 rounded-lg" style={{ background: `${SG.red}08` }}>
                      <div className="text-[10px] uppercase tracking-wider" style={{ color: `${SG.red}80` }}>{item.label}</div>
                      <div className="text-xs text-white/70">{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* MEPS+ */}
              <div className="rounded-xl p-5" style={{ background: `${SG.masTeal}06`, border: `1px solid ${SG.masTeal}15` }}>
                <div className="flex items-center gap-4 mb-3">
                  <Landmark className="w-5 h-5" style={{ color: SG.masTeal }} />
                  <div className="text-sm font-semibold text-white/90">MAS MEPS+ Settlement</div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Cycle", value: "Same-day RTGS" },
                    { label: "Assets", value: "SGS, MAS Bills, T-Bills" },
                    { label: "Cash leg", value: "SGD via MAS accounts" },
                    { label: "Finality", value: "Real-time for SGD, batch for securities" },
                  ].map((item, i) => (
                    <div key={i} className="p-3 rounded-lg" style={{ background: `${SG.masTeal}08` }}>
                      <div className="text-[10px] uppercase tracking-wider" style={{ color: `${SG.masTeal}80` }}>{item.label}</div>
                      <div className="text-xs text-white/70">{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* The gap */}
              <div className="rounded-xl p-5" style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${SG.border}` }}>
                <div className="flex items-center gap-4 mb-3">
                  <AlertTriangle className="w-5 h-5" style={{ color: SG.finternetAmber }} />
                  <div className="text-sm font-semibold text-white/90">The Gap Between Them</div>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                  There is no mechanism for atomic settlement across CDP and MEPS+. A transaction involving
                  both an SGX equity and a government security requires two separate settlement instructions,
                  two separate confirmation cycles, and carries principal risk during the gap between them.
                  Cross-asset collateral operations (using SGS bonds to cover equity margin) require manual
                  processes across both systems.
                </p>
              </div>
            </div>
          </section>
        </RevealSection>

        {/* Three Settlement Models */}
        <RevealSection id="models" delay={100}>
          <section>
            <h2 className="text-2xl font-light mb-6">Three <span className="font-semibold">settlement models</span></h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
              The UNITS protocol supports three settlement models, each applicable to different Singapore market scenarios.
              All three provide the atomic guarantee, but they differ in how netting is applied.
            </p>

            <div className="space-y-4">
              {[
                {
                  model: "Model 1: Gross / Gross",
                  desc: "Each transaction settles individually, both security and cash legs. Ideal for large block trades between Singapore institutions.",
                  example: "DBS sells 10,000 Singtel shares to OCBC. The shares and XSGD move atomically in a single transaction.",
                  color: SG.masTeal,
                  useCase: "Institutional block trades, government securities primary auctions"
                },
                {
                  model: "Model 2: Gross / Net",
                  desc: "Securities settle gross (each transaction individually) but cash is netted across multiple transactions. Reduces SGD liquidity requirements.",
                  example: "UOB executes 50 equity trades during the day. Each equity delivery is individual, but the net SGD obligation settles once.",
                  color: SG.nusOrange,
                  useCase: "Active trading desks, market makers on SGX"
                },
                {
                  model: "Model 3: Net / Net",
                  desc: "Both securities and cash are netted before settlement. Maximum capital efficiency but requires a netting window.",
                  example: "End-of-day multilateral netting across all SGX equity trades, with net positions settling atomically.",
                  color: SG.finternetCyan,
                  useCase: "High-volume retail flow, ETF creation/redemption"
                },
              ].map((item, i) => (
                <div key={i} className="rounded-xl overflow-hidden" style={{ border: `1px solid ${item.color}20` }}>
                  <div className="px-5 py-3 flex items-center gap-3" style={{ background: `${item.color}10` }}>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold" style={{ background: `${item.color}20`, color: item.color }}>
                      {i + 1}
                    </div>
                    <div className="text-sm font-semibold text-white/90">{item.model}</div>
                  </div>
                  <div className="px-5 py-4" style={{ background: `${item.color}04` }}>
                    <p className="text-xs leading-relaxed mb-3" style={{ color: "rgba(255,255,255,0.55)" }}>{item.desc}</p>
                    <div className="p-4 rounded-lg mb-2" style={{ background: `${item.color}08` }}>
                      <div className="text-[10px] uppercase tracking-wider mb-1" style={{ color: `${item.color}80` }}>Singapore Example</div>
                      <div className="text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>{item.example}</div>
                    </div>
                    <div className="text-[10px]" style={{ color: "rgba(255,255,255,0.35)" }}>Best for: {item.useCase}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </RevealSection>

        {/* Atomic DvP Flow: Singapore Example */}
        <RevealSection id="flow" delay={100}>
          <section>
            <h2 className="text-2xl font-light mb-6">Atomic DvP <span className="font-semibold">flow</span></h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
              A step-by-step walkthrough of an atomic DvP transaction on the UNITS|SG network.
              DBS sells 5,000 CapitaLand shares to OCBC for 18,750 XSGD.
            </p>

            <div className="space-y-4">
              {[
                {
                  step: 1,
                  title: "Trade Instruction",
                  desc: "DBS submits a sell instruction: 5,000 CapitaLand tokets (proxy from CDP) at SGD 3.75 per share. OCBC submits the matching buy instruction.",
                  icon: FileCheck,
                  detail: "Both instructions reference the same trade ID from SGX matching engine"
                },
                {
                  step: 2,
                  title: "Credential Verification",
                  desc: "The UNITS settlement engine verifies both parties hold valid verifiable credentials: CMS licence attestation, AML/KYC clearance, and sufficient balance.",
                  icon: Shield,
                  detail: "DBS wallet: 5,000 CapitaLand tokets confirmed. OCBC wallet: 18,750 XSGD confirmed."
                },
                {
                  step: 3,
                  title: "UILP Gate Check",
                  desc: "The Unified Institutional Liquidity Protocol checks transfer restrictions: investor eligibility, position limits, and any regulatory holds on the securities.",
                  icon: Lock,
                  detail: "CapitaLand tokenClass rules: no transfer restriction for licensed CMS holders"
                },
                {
                  step: 4,
                  title: "Atomic Swap Execution",
                  desc: "The settlement engine executes the atomic swap: 5,000 CapitaLand tokets move from DBS wallet to OCBC wallet, and 18,750 XSGD moves from OCBC wallet to DBS wallet, in a single atomic transaction.",
                  icon: ArrowRightLeft,
                  detail: "Both legs are cryptographically bound. If either fails, both revert."
                },
                {
                  step: 5,
                  title: "State Update & Finality",
                  desc: "The on-ledger state is updated. Both parties see the new positions immediately. The MAS observer node receives the settlement confirmation in real-time.",
                  icon: CheckCircle2,
                  detail: "Settlement finality: immediate. No T+2 waiting period."
                },
                {
                  step: 6,
                  title: "CDP Synchronisation",
                  desc: "The proxy token layer synchronises the position change back to SGX CDP, updating the beneficial ownership record in the existing depository system.",
                  icon: Database,
                  detail: "CDP reflects the new ownership. Legal title transfer is complete."
                },
              ].map((item) => (
                <div key={item.step} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0" style={{ background: `${SG.masTeal}15`, color: SG.masTeal }}>
                      {item.step}
                    </div>
                    {item.step < 6 && <div className="w-px flex-1 mt-2" style={{ background: `${SG.masTeal}20` }} />}
                  </div>
                  <div className="pb-6 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <item.icon className="w-4 h-4" style={{ color: SG.masTeal }} />
                      <div className="text-sm font-medium text-white/90">{item.title}</div>
                    </div>
                    <p className="text-xs leading-relaxed mb-2" style={{ color: "rgba(255,255,255,0.55)" }}>{item.desc}</p>
                    <div className="text-[10px] px-3 py-1.5 rounded-lg inline-block" style={{ background: `${SG.masTeal}08`, color: `${SG.masTeal}90` }}>
                      {item.detail}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </RevealSection>

        {/* The XSGD Advantage */}
        <RevealSection id="xsgd" delay={100}>
          <section>
            <h2 className="text-2xl font-light mb-6">The <span className="font-semibold">XSGD</span> advantage</h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
              Singapore has a practical advantage over Europe for atomic DvP: the cash leg is already available.
              While the ECB's Digital Euro is still years from production, Singapore has SCS-regulated stablecoins
              that can serve as the settlement currency today.
            </p>

            <div className="rounded-2xl overflow-hidden" style={{ background: SG.card, border: `1px solid ${SG.border}` }}>
              <div className="p-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 rounded-xl" style={{ background: `${SG.nusOrange}08` }}>
                    <div className="text-xs uppercase tracking-wider mb-3" style={{ color: SG.nusOrange }}>XSGD (StraitsX)</div>
                    <div className="space-y-2">
                      {[
                        "SCS-regulated since August 2023",
                        "1:1 SGD-pegged, fully reserved",
                        "Major Payment Institution licence",
                        "Already integrated with DBS, OCBC",
                        "Programmable, on-chain settlement",
                      ].map((item, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3 h-3 mt-0.5 shrink-0" style={{ color: SG.nusOrange }} />
                          <span className="text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="p-5 rounded-xl" style={{ background: "rgba(255,255,255,0.03)" }}>
                    <div className="text-xs uppercase tracking-wider mb-3" style={{ color: "rgba(255,255,255,0.4)" }}>Digital Euro (ECB)</div>
                    <div className="space-y-2">
                      {[
                        "Preparation phase until October 2025",
                        "Production timeline uncertain",
                        "Wholesale CBDC still in design",
                        "Pontes/Appia infrastructure pending",
                        "Regulatory framework still evolving",
                      ].map((item, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <Clock className="w-3 h-3 mt-0.5 shrink-0" style={{ color: "rgba(255,255,255,0.3)" }} />
                          <span className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </RevealSection>

        {/* Cross-Depository Settlement */}
        <RevealSection id="cross-depository" delay={100}>
          <section>
            <h2 className="text-2xl font-light mb-6">Cross-depository <span className="font-semibold">settlement</span></h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
              The most transformative capability of UNITS|SG is enabling atomic settlement across CDP and MEPS+.
              Today this is structurally impossible. On UNITS, it becomes a single transaction.
            </p>

            <div className="rounded-2xl p-5" style={{ background: SG.card, border: `1px solid ${SG.border}` }}>
              <div className="text-xs uppercase tracking-wider mb-4" style={{ color: SG.finternetCyan }}>Example: Cross-Depository Repo</div>
              <p className="text-xs leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.55)" }}>
                UOB wants to use SGS 10-year bonds (held in MEPS+) as collateral for an equity margin call on SGX (settled via CDP).
                Today this requires manual processes across both systems. On UNITS:
              </p>
              <div className="space-y-2">
                {[
                  { step: "1", text: "UOB's SGS bond tokets (proxy from MEPS+) are encumbered on-ledger as collateral" },
                  { step: "2", text: "The encumbrance is atomically linked to the equity margin requirement from CDP" },
                  { step: "3", text: "If the margin call is satisfied, the encumbrance releases automatically" },
                  { step: "4", text: "If the margin call fails, the collateral is liquidated atomically via DvP" },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-3 p-4 rounded-lg" style={{ background: `${SG.finternetCyan}06` }}>
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0" style={{ background: `${SG.finternetCyan}15`, color: SG.finternetCyan }}>
                      {item.step}
                    </div>
                    <span className="text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>{item.text}</span>
                  </div>
                ))}
              </div>
              <p className="text-[10px] mt-4" style={{ color: "rgba(255,255,255,0.3)" }}>
                This entire flow executes atomically. The SGS bond never physically moves from MEPS+, but its
                economic value is mobilised across the UNITS Network for collateral purposes.
              </p>
            </div>
          </section>
        </RevealSection>

        {/* Settlement Comparison */}
        <RevealSection id="comparison" delay={100}>
          <section>
            <h2 className="text-2xl font-light mb-6">Settlement <span className="font-semibold">comparison</span></h2>

            <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${SG.border}` }}>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr style={{ background: SG.card }}>
                      <th className="text-left p-3 font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>Dimension</th>
                      <th className="text-left p-3 font-medium" style={{ color: `${SG.red}80` }}>CDP Today</th>
                      <th className="text-left p-3 font-medium" style={{ color: `${SG.masTeal}80` }}>MEPS+ Today</th>
                      <th className="text-left p-3 font-medium" style={{ color: `${SG.nusOrange}80` }}>UNITS|SG</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { dim: "Settlement cycle", cdp: "T+2 (T+1 planned)", meps: "Same-day batch", units: "Atomic (instant)" },
                      { dim: "Operating hours", cdp: "SGX trading hours", meps: "MAS business hours", units: "24/7/365" },
                      { dim: "Cash leg", cdp: "Banking system SGD", meps: "MAS account SGD", units: "XSGD stablecoin" },
                      { dim: "Principal risk", cdp: "During settlement window", meps: "During batch cycle", units: "Zero (atomic)" },
                      { dim: "Cross-asset", cdp: "Equities only", meps: "Govt securities only", units: "All assets unified" },
                      { dim: "Collateral mobility", cdp: "Within CDP only", meps: "Within MEPS+ only", units: "Cross-depository" },
                      { dim: "Finality", cdp: "End-of-day", meps: "End-of-batch", units: "Immediate" },
                      { dim: "Regulatory visibility", cdp: "Post-trade reporting", meps: "MAS direct access", units: "Real-time observer node" },
                    ].map((row, i) => (
                      <tr key={i} style={{ borderTop: `1px solid ${SG.border}` }}>
                        <td className="p-3 font-medium text-white/70">{row.dim}</td>
                        <td className="p-3" style={{ color: "rgba(255,255,255,0.45)" }}>{row.cdp}</td>
                        <td className="p-3" style={{ color: "rgba(255,255,255,0.45)" }}>{row.meps}</td>
                        <td className="p-3 font-medium" style={{ color: SG.nusOrange }}>{row.units}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </RevealSection>

        {/* MAS Observer Node */}
        <RevealSection id="observer" delay={100}>
          <section>
            <h2 className="text-2xl font-light mb-6">MAS <span className="font-semibold">observer node</span></h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
              Every atomic DvP transaction on the UNITS|SG network is visible to the MAS observer node in real-time.
              This is not post-trade reporting. It is live supervisory access to settlement activity as it happens.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                { icon: Eye, label: "Real-Time Visibility", desc: "MAS sees every settlement instruction, credential verification, and state change as it occurs" },
                { icon: Shield, label: "No Operational Control", desc: "The observer node is read-only. MAS can monitor but cannot interfere with settlement execution" },
                { icon: Globe, label: "Systemic Risk Monitoring", desc: "Aggregate settlement volumes, concentration risk, and cross-depository flows visible in real-time" },
              ].map((item, i) => (
                <div key={i} className="p-5 rounded-xl" style={{ background: `${SG.masTeal}06`, border: `1px solid ${SG.masTeal}12` }}>
                  <item.icon className="w-5 h-5 mb-2" style={{ color: SG.masTeal }} />
                  <div className="text-sm font-medium text-white/90 mb-2">{item.label}</div>
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
              { href: "/sg/workflows/atomic-dvp", label: "Atomic DvP Workflow" },
              { href: "/sg/workflows/cross-border", label: "Cross-Border Settlement" },
              { href: "/sg/deep-dive/units", label: "UNITS Protocol" },
              { href: "/sg/deep-dive/collateral-highway", label: "Collateral Highway" },
              { href: "/sg/deep-dive/precious-metals", label: "Precious Metals" },
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
            ← Executive Summary
          </Link>
          <div className="flex-1" />
          <Link href="/sg/deep-dive/tokenisation" className="flex items-center gap-2 text-sm transition-colors" style={{ color: `${SG.nusOrange}90` }}>
            Next: Tokenisation <ArrowRight className="w-3.5 h-3.5" />
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
