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
  Ban, Bell, Calculator, Timer, GitBranch
} from "lucide-react";

const SG_LOGO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663328851912/82pWKmUqBRkgn8Ladat8sj/units-sg-orchid-logo-light-KqELedrzeYmCnakJE4pQSh.png";
const FINTERNET_LOGO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663328851912/82pWKmUqBRkgn8Ladat8sj/yP0fvxrB3mwq_e7583308.png";

function RevealSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
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

export default function SGDeepDiveTokenPrograms() {
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
            <span className="text-xs font-medium tracking-[0.2em] uppercase" style={{ color: SG.finternetCyan }}>Deep Dive</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-light mb-4">
            <span className="font-semibold">Token Programs</span>
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
            The programmable lifecycle rules that make tokets fundamentally different from static balance entries.
            Token Programs are executable code registered by Token Managers that implement pre-hooks,
            post-hooks, and transfer policies for every asset class on the UNITS|SG network.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-6 pb-24 space-y-20">

        {/* What is a Token Program */}
        <RevealSection>
          <section>
            <h2 className="text-2xl font-light mb-6">What is a <span className="font-semibold">Token Program</span></h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
              A Token Program is executable code attached to a tokenClass that governs how tokets behave
              throughout their lifecycle. Every transfer, every coupon payment, every corporate action, every
              compliance check passes through the Token Program before UNITS commits the state change.
              The UNITS protocol provides the execution environment. The Token Manager defines the business logic.
            </p>

            <div className="rounded-2xl overflow-hidden" style={{ background: SG.card, border: `1px solid ${SG.border}` }}>
              <div className="p-5">
                <div className="text-xs uppercase tracking-wider mb-4" style={{ color: SG.finternetCyan }}>
                  Token Program Execution Model
                </div>

                {/* Visual flow */}
                <div className="space-y-3">
                  {[
                    {
                      phase: "Pre-Hook",
                      icon: Shield,
                      color: SG.red,
                      desc: "Invoked before every transfer. The pre-hook validates the transaction against compliance rules, checks credential dependencies, verifies encumbrance status, and can veto the transfer entirely. If the pre-hook rejects, the state change never happens.",
                      examples: ["KYC credential verification", "Accredited investor check", "Transfer restriction enforcement", "Sanctions screening"],
                    },
                    {
                      phase: "State Transition",
                      icon: Database,
                      color: SG.masTeal,
                      desc: "UNITS executes the state change: updating the tokenPool, moving tokets between wallets, recording the allocation event. This only happens if the pre-hook approves. The state transition is atomic, there is no partial execution.",
                      examples: ["Ownership transfer", "Mint new tokets", "Burn on redemption", "Encumbrance update"],
                    },
                    {
                      phase: "Post-Hook",
                      icon: Bell,
                      color: SG.nusOrange,
                      desc: "Invoked after the state change is committed. The post-hook handles downstream effects: notifying external systems, triggering settlement legs, updating audit logs, distributing entitlements. Post-hooks cannot reverse the state change.",
                      examples: ["CDP notification of ownership change", "Dividend entitlement update", "Audit log emission", "Settlement confirmation"],
                    },
                  ].map((item, i) => (
                    <div key={i} className="rounded-xl overflow-hidden" style={{ border: `1px solid ${item.color}15` }}>
                      <div className="px-5 py-3 flex items-center gap-3" style={{ background: `${item.color}10` }}>
                        <item.icon className="w-5 h-5" style={{ color: item.color }} />
                        <div className="text-sm font-semibold text-white/90">{item.phase}</div>
                      </div>
                      <div className="p-5" style={{ background: `${item.color}04` }}>
                        <p className="text-xs leading-relaxed mb-3" style={{ color: "rgba(255,255,255,0.5)" }}>{item.desc}</p>
                        <div className="flex flex-wrap gap-2">
                          {item.examples.map((ex, j) => (
                            <span key={j} className="text-[10px] px-2.5 py-1 rounded-full" style={{ background: `${item.color}10`, color: `${item.color}90` }}>
                              {ex}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </RevealSection>

        {/* Three Programmability Levels */}
        <RevealSection delay={100}>
          <section>
            <h2 className="text-2xl font-light mb-6">Three levels of <span className="font-semibold">programmability</span></h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
              Programmability in UNITS exists at three distinct levels, each with different scope and authority.
              Rules are additive: a user can only be more restrictive than the Token Manager, never less.
              This creates a layered compliance model where the Token Manager sets the floor and users can raise it.
            </p>

            <div className="space-y-4">
              {[
                {
                  level: "Token Manager Level",
                  subtitle: "Baseline rules set by the issuer or custodian",
                  color: SG.finternetCyan,
                  icon: Building2,
                  desc: "The Token Manager defines the baseline programmability of a tokenClass. These are the non-negotiable rules that apply to every toket in the class. In Singapore, this means MAS-regulated entities like SGX, DBS, or Marketnode define the transfer eligibility, encumbrance rules, and lifecycle automation for their respective asset classes.",
                  rules: [
                    { label: "Transfer eligibility", detail: "Only to KYC-verified accounts in approved jurisdictions" },
                    { label: "Encumbrance rules", detail: "Pledged tokets locked until pledge release" },
                    { label: "Pre-hook callbacks", detail: "Token Manager code invoked before each transfer, may veto" },
                    { label: "Post-hook callbacks", detail: "Invoked after transfer for notification, auditing, settlement" },
                  ],
                },
                {
                  level: "Group Level",
                  subtitle: "Multi-party governance for shared accounts",
                  color: SG.nusOrange,
                  icon: Users,
                  desc: "A group of users, such as a joint account, syndicate, or institutional committee, may impose shared governance rules requiring multiple authenticating parties before a transfer executes. This is implemented via authentication chains where a transfer instruction must carry valid signatures from the required subset of group members.",
                  rules: [
                    { label: "Threshold signing", detail: "3-of-5 committee approval for large transfers" },
                    { label: "Syndicate governance", detail: "Lead arranger + 2 participants for loan transfers" },
                    { label: "Joint account rules", detail: "Both signatories required above SGD 1M" },
                  ],
                },
                {
                  level: "User Level",
                  subtitle: "Self-imposed restrictions on own holdings",
                  color: SG.masTeal,
                  icon: Key,
                  desc: "Individual users may impose additional restrictions on their own toket holdings. These are personal safeguards that cannot override Token Manager rules, they can only be more restrictive. A user cannot relax a KYC requirement, but they can add a time-lock or recipient whitelist on top of it.",
                  rules: [
                    { label: "Minimum balance retention", detail: "Cannot transfer below a self-set floor" },
                    { label: "Time locks", detail: "Transfer restricted until a specific timestamp" },
                    { label: "Recipient whitelists", detail: "Transfers only to pre-approved addresses" },
                  ],
                },
              ].map((item, i) => (
                <div key={i} className="rounded-2xl overflow-hidden" style={{ background: SG.card, border: `1px solid ${item.color}15` }}>
                  <div className="px-6 py-4 flex items-center gap-3" style={{ background: `${item.color}08`, borderBottom: `1px solid ${SG.border}` }}>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${item.color}15` }}>
                      <item.icon className="w-4 h-4" style={{ color: item.color }} />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-white/90">{item.level}</h3>
                      <div className="text-[10px]" style={{ color: "rgba(255,255,255,0.4)" }}>{item.subtitle}</div>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.55)" }}>{item.desc}</p>
                    <div className="space-y-2">
                      {item.rules.map((rule, j) => (
                        <div key={j} className="flex items-start gap-3 p-3 rounded-lg" style={{ background: "rgba(255,255,255,0.02)" }}>
                          <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: `${item.color}70` }} />
                          <div>
                            <span className="text-xs font-medium text-white/80">{rule.label}: </span>
                            <span className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>{rule.detail}</span>
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

        {/* Dependency Pointers */}
        <RevealSection delay={100}>
          <section>
            <h2 className="text-2xl font-light mb-6">Dependency <span className="font-semibold">pointers</span></h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
              A toket may declare dependencies, references to other tokens or Verifiable Credentials that must
              be in a valid state for the toket to be transferable. This is how compliance becomes composable:
              instead of checking a static database, the Token Program checks live credential status at transfer time.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  type: "KYC Credential",
                  icon: Shield,
                  color: SG.masTeal,
                  desc: "The toket is only transferable if the holder has a current, valid KYC credential issued by an approved Trust Provider. In Singapore, this means credentials issued by MAS-licensed banks or approved CMS holders.",
                },
                {
                  type: "Accredited Investor",
                  icon: FileText,
                  color: SG.nusOrange,
                  desc: "Securities restricted to accredited investors under MAS guidelines carry a dependency pointer to the holder's AI credential. If the credential expires or is revoked, the toket becomes non-transferable until renewed.",
                },
                {
                  type: "Pledge Dependency",
                  icon: Lock,
                  color: SG.red,
                  desc: "A toket pledged as collateral carries a dependency pointer to the pledge token issued by the lending institution. Transfer of the pledged toket requires release of the pledge token first.",
                },
                {
                  type: "Compliance Certificate",
                  icon: CheckCircle2,
                  color: SG.finternetCyan,
                  desc: "Structured notes and private credit instruments may require the holder to maintain a current suitability assessment. The dependency pointer references the certificate type and issuing institution.",
                },
              ].map((item, i) => (
                <div key={i} className="rounded-xl p-5" style={{ background: `${item.color}06`, border: `1px solid ${item.color}12` }}>
                  <item.icon className="w-5 h-5 mb-3" style={{ color: item.color }} />
                  <div className="text-sm font-medium text-white/90 mb-2">{item.type}</div>
                  <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </RevealSection>

        {/* Singapore Token Programs Catalogue */}
        <RevealSection delay={100}>
          <section>
            <h2 className="text-2xl font-light mb-2">Singapore Token Programs <span className="font-semibold">catalogue</span></h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
              Each asset class on the UNITS|SG network has purpose-built Token Programs that automate
              its lifecycle. These are not generic smart contracts. They are tailored to Singapore's regulatory
              framework, market conventions, and institutional workflows.
            </p>

            <div className="space-y-4">
              {/* CDP Corporate Actions */}
              <div className="rounded-2xl overflow-hidden" style={{ background: SG.card, border: `1px solid ${SG.red}15` }}>
                <div className="px-5 py-4 flex items-center gap-3" style={{ background: `${SG.red}08`, borderBottom: `1px solid ${SG.border}` }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${SG.red}15` }}>
                    <ArrowRightLeft className="w-4 h-4" style={{ color: SG.red }} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white/90">CDP Corporate Actions Program</h3>
                    <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.35)" }}>Equities, REITs, ETFs</span>
                  </div>
                </div>
                <div className="p-5 space-y-3">
                  <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                    Manages the full lifecycle of proxy tokets representing SGX-listed equities held in CDP.
                    Every corporate action that CDP processes for the underlying shares is mirrored automatically
                    on the UNITS Network through the Token Program.
                  </p>
                  <div className="space-y-2">
                    {[
                      { event: "Dividend Distribution", pre: "Verify record-date ownership via proxy toket holders", post: "Auto-distribute SGD dividend to all holder wallets via SCS stablecoin", color: SG.red },
                      { event: "Rights Issue", pre: "Calculate entitlement per holder, verify eligibility credentials", post: "Mint rights tokets, accept subscription via SCS, issue new shares", color: SG.nusOrange },
                      { event: "Stock Split", pre: "Validate split ratio from CDP notification", post: "Adjust toket quantities across all holders atomically", color: SG.masTeal },
                      { event: "Bonus Issue", pre: "Verify entitlement and CDP confirmation", post: "Mint additional proxy tokets to eligible holders", color: SG.finternetCyan },
                    ].map((item, i) => (
                      <div key={i} className="rounded-lg p-3" style={{ background: "rgba(255,255,255,0.02)" }}>
                        <div className="text-xs font-medium mb-2" style={{ color: item.color }}>{item.event}</div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <div className="text-[10px] uppercase tracking-wider mb-1" style={{ color: "rgba(255,255,255,0.25)" }}>Pre-Hook</div>
                            <div className="text-[11px]" style={{ color: "rgba(255,255,255,0.45)" }}>{item.pre}</div>
                          </div>
                          <div>
                            <div className="text-[10px] uppercase tracking-wider mb-1" style={{ color: "rgba(255,255,255,0.25)" }}>Post-Hook</div>
                            <div className="text-[11px]" style={{ color: "rgba(255,255,255,0.45)" }}>{item.post}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* MEPS+ Coupon Distribution */}
              <div className="rounded-2xl overflow-hidden" style={{ background: SG.card, border: `1px solid ${SG.masTeal}15` }}>
                <div className="px-5 py-4 flex items-center gap-3" style={{ background: `${SG.masTeal}08`, borderBottom: `1px solid ${SG.border}` }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${SG.masTeal}15` }}>
                    <Landmark className="w-4 h-4" style={{ color: SG.masTeal }} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white/90">MEPS+ Fixed Income Program</h3>
                    <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.35)" }}>SGS Bonds, T-Bills, MAS Bills</span>
                  </div>
                </div>
                <div className="p-5 space-y-3">
                  <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                    Automates the lifecycle of government securities proxy tokets. Coupon calculations, maturity
                    processing, and T-bill rollovers execute on-ledger without manual intervention. MAS observer
                    node has real-time visibility into all program executions.
                  </p>
                  <div className="space-y-2">
                    {[
                      { event: "Coupon Payment", pre: "Calculate accrued interest, verify holder positions", post: "Distribute coupon via SCS stablecoin to all proxy toket holders", color: SG.masTeal },
                      { event: "T-Bill Maturity", pre: "Verify maturity date, calculate redemption amount", post: "Burn proxy tokets, distribute principal + final interest via SCS", color: SG.nusOrange },
                      { event: "MAS Bill Rollover", pre: "Check rollover instructions from holder", post: "Burn maturing tokets, mint new-issue tokets, settle difference", color: SG.finternetCyan },
                      { event: "Auction Settlement", pre: "Validate auction allocation from MAS", post: "Mint proxy tokets for successful bidders, debit SCS payment", color: SG.finternetAmber },
                    ].map((item, i) => (
                      <div key={i} className="rounded-lg p-3" style={{ background: "rgba(255,255,255,0.02)" }}>
                        <div className="text-xs font-medium mb-2" style={{ color: item.color }}>{item.event}</div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <div className="text-[10px] uppercase tracking-wider mb-1" style={{ color: "rgba(255,255,255,0.25)" }}>Pre-Hook</div>
                            <div className="text-[11px]" style={{ color: "rgba(255,255,255,0.45)" }}>{item.pre}</div>
                          </div>
                          <div>
                            <div className="text-[10px] uppercase tracking-wider mb-1" style={{ color: "rgba(255,255,255,0.25)" }}>Post-Hook</div>
                            <div className="text-[11px]" style={{ color: "rgba(255,255,255,0.45)" }}>{item.post}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Gold Lifecycle */}
              <div className="rounded-2xl overflow-hidden" style={{ background: SG.card, border: `1px solid ${SG.finternetAmber}15` }}>
                <div className="px-5 py-4 flex items-center gap-3" style={{ background: `${SG.finternetAmber}08`, borderBottom: `1px solid ${SG.border}` }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${SG.finternetAmber}15` }}>
                    <Gem className="w-4 h-4" style={{ color: SG.finternetAmber }} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white/90">Gold Lifecycle Program</h3>
                    <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.35)" }}>LBMA/SBMA Precious Metals</span>
                  </div>
                </div>
                <div className="p-5 space-y-3">
                  <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                    Manages gold tokets from vault custody verification through fractional ownership to physical
                    redemption. Integrates with LBMA and SBMA price feeds for continuous valuation and
                    enforces IPM GST exemption rules for Singapore-vaulted precious metals.
                  </p>
                  <div className="space-y-2">
                    {[
                      { event: "Vault Verification", pre: "Verify LBMA/SBMA Good Delivery status, confirm bar serial", post: "Update tokenPool with verified custody proof", color: SG.finternetAmber },
                      { event: "Fractional Transfer", pre: "Validate minimum 1g transfer, check recipient credentials", post: "Update gram-level ownership, recalculate vault allocation", color: SG.nusOrange },
                      { event: "Collateral Pledge", pre: "Mark-to-market against LBMA PM fix, verify haircut ratio", post: "Lock tokets, issue encumbrance record to lending institution", color: SG.masTeal },
                      { event: "Physical Redemption", pre: "Verify minimum kilobar quantity, confirm vault availability", post: "Burn tokets, instruct vault operator for physical delivery", color: SG.red },
                    ].map((item, i) => (
                      <div key={i} className="rounded-lg p-3" style={{ background: "rgba(255,255,255,0.02)" }}>
                        <div className="text-xs font-medium mb-2" style={{ color: item.color }}>{item.event}</div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <div className="text-[10px] uppercase tracking-wider mb-1" style={{ color: "rgba(255,255,255,0.25)" }}>Pre-Hook</div>
                            <div className="text-[11px]" style={{ color: "rgba(255,255,255,0.45)" }}>{item.pre}</div>
                          </div>
                          <div>
                            <div className="text-[10px] uppercase tracking-wider mb-1" style={{ color: "rgba(255,255,255,0.25)" }}>Post-Hook</div>
                            <div className="text-[11px]" style={{ color: "rgba(255,255,255,0.45)" }}>{item.post}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* VCC NAV Program */}
              <div className="rounded-2xl overflow-hidden" style={{ background: SG.card, border: `1px solid ${SG.masTeal}15` }}>
                <div className="px-5 py-4 flex items-center gap-3" style={{ background: `${SG.masTeal}08`, borderBottom: `1px solid ${SG.border}` }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${SG.masTeal}15` }}>
                    <Globe className="w-4 h-4" style={{ color: SG.masTeal }} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white/90">VCC Fund Program</h3>
                    <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.35)" }}>Variable Capital Companies</span>
                  </div>
                </div>
                <div className="p-5 space-y-3">
                  <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                    Transforms VCC fund administration from monthly batch processing to continuous on-ledger
                    operations. NAV calculation, subscription, redemption, and distribution all execute through
                    Token Programs with full audit trails visible to MAS.
                  </p>
                  <div className="space-y-2">
                    {[
                      { event: "NAV Calculation", pre: "Aggregate underlying asset prices from oracle feeds", post: "Publish updated NAV per unit, update subscription/redemption pricing", color: SG.masTeal },
                      { event: "Subscription", pre: "Verify investor credentials (AI status, KYC), validate SCS payment", post: "Mint VCC tokets, allocate to investor wallet, update AUM", color: SG.nusOrange },
                      { event: "Redemption", pre: "Calculate redemption value at current NAV, check lock-up period", post: "Burn VCC tokets, distribute SCS proceeds to investor", color: SG.finternetCyan },
                      { event: "Distribution", pre: "Calculate per-unit distribution from fund income", post: "Auto-distribute to all VCC toket holders via SCS", color: SG.finternetAmber },
                    ].map((item, i) => (
                      <div key={i} className="rounded-lg p-3" style={{ background: "rgba(255,255,255,0.02)" }}>
                        <div className="text-xs font-medium mb-2" style={{ color: item.color }}>{item.event}</div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <div className="text-[10px] uppercase tracking-wider mb-1" style={{ color: "rgba(255,255,255,0.25)" }}>Pre-Hook</div>
                            <div className="text-[11px]" style={{ color: "rgba(255,255,255,0.45)" }}>{item.pre}</div>
                          </div>
                          <div>
                            <div className="text-[10px] uppercase tracking-wider mb-1" style={{ color: "rgba(255,255,255,0.25)" }}>Post-Hook</div>
                            <div className="text-[11px]" style={{ color: "rgba(255,255,255,0.45)" }}>{item.post}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* SGX-DC Margin Management */}
              <div className="rounded-2xl overflow-hidden" style={{ background: SG.card, border: `1px solid ${SG.nusOrange}15` }}>
                <div className="px-5 py-4 flex items-center gap-3" style={{ background: `${SG.nusOrange}08`, borderBottom: `1px solid ${SG.border}` }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${SG.nusOrange}15` }}>
                    <BarChart3 className="w-4 h-4" style={{ color: SG.nusOrange }} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white/90">SGX-DC Margin Program</h3>
                    <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.35)" }}>Collateral and Margin Management</span>
                  </div>
                </div>
                <div className="p-5 space-y-3">
                  <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                    Automates the collateral lifecycle for SGX Derivatives Clearing. Continuous mark-to-market
                    against live price feeds, automated margin calls, collateral substitution, and cross-asset
                    optimisation, all executing on-ledger without manual intervention.
                  </p>
                  <div className="space-y-2">
                    {[
                      { event: "Margin Call", pre: "Continuous mark-to-market, detect breach of maintenance ratio", post: "Auto-notify participant, initiate collateral top-up from pre-approved pool", color: SG.nusOrange },
                      { event: "Collateral Substitution", pre: "Validate replacement asset eligibility and haircut", post: "Atomic swap: release old collateral, lock new collateral", color: SG.masTeal },
                      { event: "Cross-Asset Optimisation", pre: "Calculate optimal collateral mix across SGS, equities, gold", post: "Rebalance collateral pool to minimise haircut-weighted cost", color: SG.finternetCyan },
                    ].map((item, i) => (
                      <div key={i} className="rounded-lg p-3" style={{ background: "rgba(255,255,255,0.02)" }}>
                        <div className="text-xs font-medium mb-2" style={{ color: item.color }}>{item.event}</div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <div className="text-[10px] uppercase tracking-wider mb-1" style={{ color: "rgba(255,255,255,0.25)" }}>Pre-Hook</div>
                            <div className="text-[11px]" style={{ color: "rgba(255,255,255,0.45)" }}>{item.pre}</div>
                          </div>
                          <div>
                            <div className="text-[10px] uppercase tracking-wider mb-1" style={{ color: "rgba(255,255,255,0.25)" }}>Post-Hook</div>
                            <div className="text-[11px]" style={{ color: "rgba(255,255,255,0.45)" }}>{item.post}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* P-Toket Rebalancing */}
              <div className="rounded-2xl overflow-hidden" style={{ background: SG.card, border: `1px solid ${SG.finternetCyan}15` }}>
                <div className="px-5 py-4 flex items-center gap-3" style={{ background: `${SG.finternetCyan}08`, borderBottom: `1px solid ${SG.border}` }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${SG.finternetCyan}15` }}>
                    <Network className="w-4 h-4" style={{ color: SG.finternetCyan }} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white/90">P-Toket Rebalancing Program</h3>
                    <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.35)" }}>Portfolio Tokets</span>
                  </div>
                </div>
                <div className="p-5 space-y-3">
                  <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                    Manages the composition and rebalancing of P-Tokets, the portfolio tokets that combine
                    multiple asset classes into a single composable unit. Drift detection, threshold-based
                    rebalancing, and nested P-Toket management all execute through Token Programs.
                  </p>
                  <div className="space-y-2">
                    {[
                      { event: "Drift Detection", pre: "Compare current weights against target allocation", post: "Flag drift exceeding threshold, queue rebalancing instruction", color: SG.finternetCyan },
                      { event: "Rebalancing Execution", pre: "Calculate required trades, verify liquidity across asset classes", post: "Execute atomic multi-leg trades: sell overweight, buy underweight", color: SG.nusOrange },
                      { event: "Composition Change", pre: "Validate new target allocation against compliance rules", post: "Update P-Toket definition, trigger rebalancing to new targets", color: SG.masTeal },
                    ].map((item, i) => (
                      <div key={i} className="rounded-lg p-3" style={{ background: "rgba(255,255,255,0.02)" }}>
                        <div className="text-xs font-medium mb-2" style={{ color: item.color }}>{item.event}</div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <div className="text-[10px] uppercase tracking-wider mb-1" style={{ color: "rgba(255,255,255,0.25)" }}>Pre-Hook</div>
                            <div className="text-[11px]" style={{ color: "rgba(255,255,255,0.45)" }}>{item.pre}</div>
                          </div>
                          <div>
                            <div className="text-[10px] uppercase tracking-wider mb-1" style={{ color: "rgba(255,255,255,0.25)" }}>Post-Hook</div>
                            <div className="text-[11px]" style={{ color: "rgba(255,255,255,0.45)" }}>{item.post}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </RevealSection>

        {/* Today vs Token Programs Comparison */}
        <RevealSection delay={100}>
          <section>
            <h2 className="text-2xl font-light mb-6">Today vs <span className="font-semibold">Token Programs</span></h2>

            <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${SG.border}` }}>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr style={{ background: SG.card }}>
                      <th className="text-left p-3 font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>Lifecycle Event</th>
                      <th className="text-left p-3 font-medium" style={{ color: "rgba(255,255,255,0.4)" }}>Today (Manual)</th>
                      <th className="text-left p-3 font-medium" style={{ color: SG.finternetCyan }}>Token Program</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { event: "Dividend", today: "Record date, ex-date, payment date. CDP distributes via batch. 2-4 week cycle.", units: "Continuous entitlement tracking. Auto-distribute via SCS on payment date. Same-day." },
                      { event: "Coupon", today: "Paying agent calculates, batch payment via MEPS+. Manual reconciliation.", units: "Token Program auto-calculates accrued interest, distributes via SCS. Zero reconciliation." },
                      { event: "Corporate action", today: "CDP notifies brokers. Brokers notify clients. Manual election. Weeks of processing.", units: "On-ledger notification to all toket holders. Automated election and execution." },
                      { event: "Margin call", today: "SGX-DC calculates overnight. Manual notification. Participant has hours to respond.", units: "Continuous mark-to-market. Instant notification. Auto-top-up from pre-approved pool." },
                      { event: "Fund subscription", today: "Paper form, wire transfer, T+3 to T+5 settlement. Monthly dealing dates.", units: "SCS payment triggers instant mint. 24/7 subscription at live NAV." },
                      { event: "Collateral pledge", today: "Manual instruction across CDP, MEPS+, custodian. Days to settle.", units: "On-ledger encumbrance. Instant. Cross-asset eligible." },
                      { event: "Compliance check", today: "Pre-trade compliance in separate system. Post-trade reconciliation.", units: "Pre-hook validates credentials at transfer time. No separate system needed." },
                      { event: "Rebalancing", today: "Portfolio manager calculates, places multiple orders, settles over days.", units: "Drift detection triggers atomic multi-leg rebalancing. Minutes, not days." },
                    ].map((row, i) => (
                      <tr key={i} style={{ borderTop: `1px solid ${SG.border}` }}>
                        <td className="p-3 font-medium text-white/70">{row.event}</td>
                        <td className="p-3" style={{ color: "rgba(255,255,255,0.35)" }}>{row.today}</td>
                        <td className="p-3 font-medium" style={{ color: SG.finternetCyan }}>{row.units}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </RevealSection>

        {/* MAS Observer Integration */}
        <RevealSection delay={100}>
          <section>
            <h2 className="text-2xl font-light mb-6">MAS observer <span className="font-semibold">integration</span></h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
              Every Token Program execution is visible to the MAS observer node in real-time. This transforms
              regulatory oversight from periodic batch reporting to continuous supervisory visibility. MAS does
              not need to request data. The data flows to the observer node as Token Programs execute.
            </p>

            <div className="rounded-xl p-5" style={{ background: `${SG.masTeal}06`, border: `1px solid ${SG.masTeal}12` }}>
              <div className="flex items-center gap-2 mb-4">
                <Eye className="w-5 h-5" style={{ color: SG.masTeal }} />
                <span className="text-sm font-semibold text-white/90">What MAS Sees</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { label: "Pre-hook rejections", desc: "Every failed transfer attempt with reason code, credential that failed, and participant identity" },
                  { label: "Corporate action flows", desc: "Real-time dividend distributions, rights issue subscriptions, and corporate action elections across all proxy tokets" },
                  { label: "Collateral movements", desc: "Every pledge, release, substitution, and margin call across all asset classes and participants" },
                  { label: "Compliance violations", desc: "Attempted transfers that breach Token Manager rules, with full audit trail of the pre-hook evaluation" },
                  { label: "VCC fund flows", desc: "Subscription, redemption, and distribution activity across all tokenised VCCs with real-time AUM" },
                  { label: "Cross-border activity", desc: "All unsponsored toket creation, cross-ledger transfers, and foreign security access patterns" },
                ].map((item, i) => (
                  <div key={i} className="p-3 rounded-lg" style={{ background: `${SG.masTeal}08` }}>
                    <div className="text-xs font-semibold text-white/80 mb-1">{item.label}</div>
                    <div className="text-[11px]" style={{ color: "rgba(255,255,255,0.4)" }}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </RevealSection>

        {/* Token Program Architecture */}
        <RevealSection delay={100}>
          <section>
            <h2 className="text-2xl font-light mb-6">Architecture <span className="font-semibold">principles</span></h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
              Token Programs follow five design principles that ensure they are secure, auditable, and
              composable across the entire UNITS|SG network.
            </p>

            <div className="space-y-3">
              {[
                {
                  principle: "UNITS enforces, Token Manager defines",
                  desc: "The UNITS protocol provides the execution environment. The Token Manager, whether SGX, DBS, MAS, or Marketnode, defines the business logic. This separation ensures that no single entity controls both the rules and the enforcement.",
                  icon: GitBranch,
                  color: SG.finternetCyan,
                },
                {
                  principle: "Additive restriction only",
                  desc: "Each programmability level can only add restrictions, never relax them. A user cannot override a Token Manager's KYC requirement. A group cannot bypass an encumbrance rule. Rules compose upward, creating a layered compliance model.",
                  icon: Layers,
                  color: SG.nusOrange,
                },
                {
                  principle: "Atomic execution",
                  desc: "Token Program execution is all-or-nothing. If the pre-hook rejects, no state change occurs. If the state transition fails, no post-hook fires. There is no partial execution, no inconsistent state, no need for reconciliation.",
                  icon: Zap,
                  color: SG.red,
                },
                {
                  principle: "Full audit trail",
                  desc: "Every Token Program execution, whether successful or rejected, generates an immutable audit record. Pre-hook evaluations, state transitions, and post-hook notifications are all recorded with timestamps, participant identities, and credential references.",
                  icon: FileText,
                  color: SG.masTeal,
                },
                {
                  principle: "Composable across asset classes",
                  desc: "Token Programs from different asset classes can interact. A P-Toket rebalancing program can trigger equity transfers, bond trades, and gold movements in a single atomic operation. The programs compose because they share the same execution model.",
                  icon: Network,
                  color: SG.finternetAmber,
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-xl" style={{ background: `${item.color}04`, border: `1px solid ${item.color}10` }}>
                  <item.icon className="w-5 h-5 shrink-0 mt-0.5" style={{ color: item.color }} />
                  <div>
                    <div className="text-sm font-medium text-white/90 mb-1">{item.principle}</div>
                    <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </RevealSection>

        {/* Knowledge Base */}
        <div className="mt-16 p-6 rounded-xl" style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${SG.border}` }}>
          <p className="text-xs uppercase tracking-widest mb-4" style={{ color: "rgba(255,255,255,0.25)" }}>UNITS Knowledge Base</p>
          <div className="flex flex-wrap gap-3">
            {[
              { href: "/sg/deep-dive/units", label: "UNITS Protocol" },
              { href: "/sg/deep-dive/tokenisation", label: "Tokenisation" },
              { href: "/sg/deep-dive/dvp-settlement", label: "DvP Settlement" },
              { href: "/sg/deep-dive/collateral-highway", label: "Collateral Highway" },
              { href: "/sg/deep-dive/p-tokets", label: "P-Tokets (Portfolios)" },
              { href: "/sg/deep-dive/unsponsored-tokets", label: "Unsponsored Tokets" },
              { href: "/sg/deep-dive/cross-ledger", label: "Cross-Ledger Connectivity" },
              { href: "/sg/deep-dive/structured-notes", label: "Structured Notes" },
              { href: "/sg/deep-dive/vcc", label: "VCC Fund Interests" },
              { href: "/sg/deep-dive/precious-metals", label: "Precious Metals" },
              { href: "/sg/assets", label: "Asset Classes" },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="px-3 py-1.5 rounded-full text-xs transition-colors hover:bg-white/[0.05]" style={{ color: "rgba(255,255,255,0.35)", border: `1px solid ${SG.border}` }}>
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
          <Link href="/sg/deep-dive/collateral-highway" className="flex items-center gap-2 text-sm transition-colors" style={{ color: `${SG.finternetCyan}90` }}>
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
