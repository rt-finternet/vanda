import { useState, useRef, useEffect } from "react";
import { Link } from "wouter";
import SGPortalNav, { SG } from "@/components/SGPortalNav";
import { CinematicBackground, LiquidGlassCard, RevealSection, AnimatedCounter } from "@/components/motion";
import {
  ArrowRight, Wallet, Database, Shield, Globe, Layers, Lock,
  Building2, Landmark, ArrowRightLeft, CheckCircle2, Eye,
  Server, GitBranch, Users, Zap, Network, BookOpen
} from "lucide-react";

const UNITS_LOGO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663328851912/82pWKmUqBRkgn8Ladat8sj/units-sg-orchid-logo-light-KqELedrzeYmCnakJE4pQSh.png";
const FINTERNET_LOGO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663328851912/82pWKmUqBRkgn8Ladat8sj/yP0fvxrB3mwq_e7583308.png";

export default function SGDeepDiveWalletsRegisters() {
  return (
    <div className="min-h-screen text-white" style={{ background: SG.dark }}>
      <SGPortalNav />

      {/* ── Hero ── */}
      <section className="relative px-6 pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${SG.dark}, #0D1F3A 50%, #122B4A)` }} />
        <CinematicBackground variant="mixed" intensity={0.06} />
        <div className="relative max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <Wallet className="w-5 h-5" style={{ color: SG.finternetAmber }} />
            <span className="text-xs font-medium tracking-[0.2em] uppercase" style={{ color: SG.finternetAmber }}>Deep Dive</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-light mb-4">
            Wallets & <span className="font-semibold">Registers</span>
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
            UNITS|SG uniquely supports <strong className="text-white/90">both</strong> the traditional register-based model
            that underpins Singapore's securities market and the wallet-based model that powers digital assets.
            This dual architecture is not a compromise; it is the bridge between today's infrastructure and tomorrow's.
          </p>

          {/* Key stats */}
          <div className="grid grid-cols-3 gap-4 mt-8">
            {[
              { value: 2, label: "Access Models", suffix: "" },
              { value: 4, label: "Bank Wallets", suffix: "+" },
              { value: 1, label: "Unified State", suffix: "" },
            ].map((s, i) => (
              <div key={i} className="text-center px-4 py-3 rounded-xl" style={{ background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.12)" }}>
                <div className="text-2xl font-bold" style={{ color: SG.finternetAmber }}>
                  <AnimatedCounter value={s.value} />{s.suffix}
                </div>
                <div className="text-[10px] tracking-widest uppercase mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why This Matters ── */}
      <RevealSection>
        <section className="px-6 py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-light mb-3">
              Why <span className="font-semibold" style={{ color: SG.finternetAmber }}>Both Models</span> Matter
            </h2>
            <p className="text-sm leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.5)" }}>
              Singapore's financial market is built on register-based infrastructure. CDP maintains the definitive
              register of securities holders under the Companies Act and Securities and Futures Act. Every SGX-listed
              equity, every government bond, every structured note: their legal ownership is determined by register entries,
              not by who holds a private key. At the same time, the future of financial infrastructure is wallet-based:
              self-custody, programmable access, cross-chain composability. UNITS|SG does not force a choice.
              It supports both, simultaneously, for the same assets.
            </p>

            <div className="grid md:grid-cols-3 gap-4">
              {[
                {
                  icon: <Database className="w-5 h-5" />,
                  title: "Register Model",
                  subtitle: "Traditional Securities",
                  color: SG.masTeal,
                  points: [
                    "CDP is the legal source of truth",
                    "Book-entry system, no physical certificates",
                    "Omnibus accounts at participant level",
                    "Corporate actions flow through register hierarchy",
                    "Regulatory reporting via participant chain",
                  ],
                },
                {
                  icon: <Wallet className="w-5 h-5" />,
                  title: "Wallet Model",
                  subtitle: "Digital Assets",
                  color: SG.finternetAmber,
                  points: [
                    "Private keys control access",
                    "On-chain state is the source of truth",
                    "Self-custody or institutional custody",
                    "Smart contracts automate lifecycle",
                    "Composability across protocols",
                  ],
                },
                {
                  icon: <Layers className="w-5 h-5" />,
                  title: "UNITS|SG Unified",
                  subtitle: "Both Models, One State",
                  color: SG.red,
                  points: [
                    "tokenPool = the register (authoritative state)",
                    "toket = the account entry (user's position)",
                    "BYOW = banks bring their own wallets",
                    "Native + Proxy modes for any asset",
                    "MAS observer sees unified state",
                  ],
                },
              ].map((col, i) => (
                <LiquidGlassCard key={i}>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-1">
                      <span style={{ color: col.color }}>{col.icon}</span>
                      <h3 className="text-sm font-semibold text-white">{col.title}</h3>
                    </div>
                    <div className="text-[10px] tracking-widest uppercase mb-4" style={{ color: col.color }}>{col.subtitle}</div>
                    <ul className="space-y-2">
                      {col.points.map((p, j) => (
                        <li key={j} className="flex items-start gap-2 text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>
                          <CheckCircle2 className="w-3 h-3 mt-0.5 shrink-0" style={{ color: col.color }} />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </LiquidGlassCard>
              ))}
            </div>
          </div>
        </section>
      </RevealSection>

      {/* ── Comparison Table ── */}
      <RevealSection delay={100}>
        <section className="px-6 py-16" style={{ background: "rgba(0,0,0,0.15)" }}>
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-light mb-8">
              Side-by-Side <span className="font-semibold" style={{ color: SG.finternetAmber }}>Comparison</span>
            </h2>

            <div className="overflow-x-auto rounded-xl" style={{ border: "1px solid rgba(245,158,11,0.12)" }}>
              <table className="w-full text-xs">
                <thead>
                  <tr style={{ background: "rgba(245,158,11,0.08)" }}>
                    <th className="text-left px-4 py-3 font-semibold text-white/80 border-b" style={{ borderColor: "rgba(245,158,11,0.1)" }}>Dimension</th>
                    <th className="text-left px-4 py-3 font-semibold border-b" style={{ color: SG.masTeal, borderColor: "rgba(245,158,11,0.1)" }}>Traditional Register</th>
                    <th className="text-left px-4 py-3 font-semibold border-b" style={{ color: SG.finternetAmber, borderColor: "rgba(245,158,11,0.1)" }}>Blockchain Wallet</th>
                    <th className="text-left px-4 py-3 font-semibold border-b" style={{ color: SG.red, borderColor: "rgba(245,158,11,0.1)" }}>UNITS|SG (Both)</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { dim: "Source of truth", reg: "Central register (CDP)", wallet: "On-chain ledger state", units: "tokenPool (native) or external ledger (proxy)" },
                    { dim: "Access mechanism", reg: "Account at participant (DBS, OCBC, HSBC)", wallet: "Private key in wallet", units: "Finternet Account + BYOW wallet" },
                    { dim: "Identity model", reg: "KYC at participant level", wallet: "Pseudonymous address", units: "Verifiable Credentials + UNITS Registry" },
                    { dim: "Corporate actions", reg: "Register-driven distribution", wallet: "Smart contract events", units: "Token Programs with pre/post hooks" },
                    { dim: "Settlement speed", reg: "T+2 via clearing house", wallet: "Instant on-chain", units: "Atomic DvP with policy enforcement" },
                    { dim: "Regulatory view", reg: "Participant reports to MAS", wallet: "No native regulatory view", units: "MAS observer node with real-time state" },
                    { dim: "Composability", reg: "None (siloed registers)", wallet: "DeFi composability", units: "P-Tokets + cross-ledger adapters" },
                    { dim: "Cross-border", reg: "Correspondent chain (slow)", wallet: "Bridge protocols (trust cost)", units: "Chain adapters with state proofs" },
                  ].map((row, i) => (
                    <tr key={i} style={{ background: i % 2 === 0 ? "rgba(15,29,53,0.5)" : "rgba(15,29,53,0.3)" }}>
                      <td className="px-4 py-3 font-medium text-white/70 border-b" style={{ borderColor: "rgba(255,255,255,0.05)" }}>{row.dim}</td>
                      <td className="px-4 py-3 border-b" style={{ color: "rgba(255,255,255,0.5)", borderColor: "rgba(255,255,255,0.05)" }}>{row.reg}</td>
                      <td className="px-4 py-3 border-b" style={{ color: "rgba(255,255,255,0.5)", borderColor: "rgba(255,255,255,0.05)" }}>{row.wallet}</td>
                      <td className="px-4 py-3 border-b font-medium" style={{ color: SG.finternetAmber, borderColor: "rgba(255,255,255,0.05)" }}>{row.units}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </RevealSection>

      {/* ── tokenPool = The Register ── */}
      <RevealSection delay={100}>
        <section className="px-6 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-2">
              <Database className="w-5 h-5" style={{ color: SG.masTeal }} />
              <span className="text-xs tracking-[0.15em] uppercase" style={{ color: SG.masTeal }}>State Architecture</span>
            </div>
            <h2 className="text-2xl font-light mb-3">
              tokenPool = <span className="font-semibold" style={{ color: SG.masTeal }}>The Register</span>
            </h2>
            <p className="text-sm leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.5)" }}>
              In the Finternet architecture, the <strong className="text-white/80">tokenPool</strong> is the functional equivalent
              of a traditional securities register. It contains every allocation event, transfer, encumbrance, and
              redemption that has occurred since token inception. It is the authoritative history, not merely the
              current state snapshot. This is what makes UNITS|SG legally compatible with Singapore's register-based
              securities framework.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Native Mode */}
              <LiquidGlassCard>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Server className="w-4 h-4" style={{ color: SG.masTeal }} />
                    <h3 className="text-sm font-semibold text-white">Native Mode</h3>
                    <span className="ml-auto text-[9px] px-2 py-0.5 rounded-full" style={{ background: `${SG.masTeal}20`, color: SG.masTeal }}>UNITS is Source of Truth</span>
                  </div>
                  <p className="text-xs leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.5)" }}>
                    When a token is issued directly on UNITS, the tokenPool is the canonical register.
                    No external system holds a conflicting view. This applies to new tokenised assets
                    issued natively on the UNITS|SG network.
                  </p>
                  <div className="space-y-2">
                    {[
                      "Maintains complete allocation history",
                      "Enforces all Token Programs before state changes",
                      "Generates state commitment proofs",
                      "Notifies Token Manager of state changes",
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
                        <CheckCircle2 className="w-3 h-3 mt-0.5 shrink-0" style={{ color: SG.masTeal }} />
                        {item}
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 px-3 py-2 rounded-lg text-xs" style={{ background: `${SG.masTeal}08`, border: `1px solid ${SG.masTeal}15` }}>
                    <span className="font-semibold" style={{ color: SG.masTeal }}>SG Example:</span>
                    <span className="ml-1" style={{ color: "rgba(255,255,255,0.5)" }}>
                      A new tokenised SGS bond issued directly on UNITS|SG. The tokenPool IS the register.
                    </span>
                  </div>
                </div>
              </LiquidGlassCard>

              {/* Proxy Mode */}
              <LiquidGlassCard>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <GitBranch className="w-4 h-4" style={{ color: SG.finternetAmber }} />
                    <h3 className="text-sm font-semibold text-white">Proxy Mode</h3>
                    <span className="ml-auto text-[9px] px-2 py-0.5 rounded-full" style={{ background: `${SG.finternetAmber}20`, color: SG.finternetAmber }}>External Ledger is Source of Truth</span>
                  </div>
                  <p className="text-xs leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.5)" }}>
                    When a token natively exists on an external ledger (CDP, Ethereum, a private chain),
                    UNITS maintains a replicated read-shadow via chain adapters. The external register
                    remains authoritative; UNITS provides the unified access layer.
                  </p>
                  <div className="space-y-2">
                    {[
                      "Mirrors external state via chain adapters",
                      "Creates proxy token entries in tokenPool",
                      "User sees unified view through Finternet Account",
                      "State proofs verify external register integrity",
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
                        <CheckCircle2 className="w-3 h-3 mt-0.5 shrink-0" style={{ color: SG.finternetAmber }} />
                        {item}
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 px-3 py-2 rounded-lg text-xs" style={{ background: `${SG.finternetAmber}08`, border: `1px solid ${SG.finternetAmber}15` }}>
                    <span className="font-semibold" style={{ color: SG.finternetAmber }}>SG Example:</span>
                    <span className="ml-1" style={{ color: "rgba(255,255,255,0.5)" }}>
                      Existing DBS shares on CDP. CDP remains the register; UNITS creates proxy tokets for programmable access.
                    </span>
                  </div>
                </div>
              </LiquidGlassCard>
            </div>
          </div>
        </section>
      </RevealSection>

      {/* ── toket = The Account Entry ── */}
      <RevealSection delay={100}>
        <section className="px-6 py-16" style={{ background: "rgba(0,0,0,0.15)" }}>
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-5 h-5" style={{ color: SG.finternetAmber }} />
              <span className="text-xs tracking-[0.15em] uppercase" style={{ color: SG.finternetAmber }}>Token Account</span>
            </div>
            <h2 className="text-2xl font-light mb-3">
              toket = <span className="font-semibold" style={{ color: SG.finternetAmber }}>The Account Entry</span>
            </h2>
            <p className="text-sm leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.5)" }}>
              A <strong className="text-white/80">toket</strong> (Token Account / Token Container) is a user-level packet
              within a tokenPool. It represents a specific user's relationship with a specific token class under a
              specific token manager. In traditional terms, it is the line item in the register that says
              "this entity holds X units of this security."
            </p>

            <div className="grid md:grid-cols-4 gap-4">
              {[
                { icon: <Layers className="w-4 h-4" />, label: "Token Allocation", desc: "Quantity held (the balance)", color: SG.finternetAmber },
                { icon: <GitBranch className="w-4 h-4" />, label: "Dependency Pointers", desc: "References to credentials that condition transferability", color: SG.masTeal },
                { icon: <Shield className="w-4 h-4" />, label: "Policy Rules", desc: "Transfer conditions specific to this holding", color: SG.red },
                { icon: <Database className="w-4 h-4" />, label: "Metadata", desc: "Issuance timestamp, token class reference, custom fields", color: "#8B5CF6" },
              ].map((item, i) => (
                <LiquidGlassCard key={i}>
                  <div className="p-4 text-center">
                    <div className="w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center" style={{ background: `${item.color}15`, border: `1px solid ${item.color}25` }}>
                      <span style={{ color: item.color }}>{item.icon}</span>
                    </div>
                    <h4 className="text-xs font-semibold text-white mb-1">{item.label}</h4>
                    <p className="text-[10px] leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>{item.desc}</p>
                  </div>
                </LiquidGlassCard>
              ))}
            </div>

            {/* Dependency example */}
            <div className="mt-8 p-5 rounded-xl" style={{ background: "rgba(15,29,53,0.6)", border: "1px solid rgba(245,158,11,0.1)" }}>
              <h4 className="text-sm font-semibold text-white mb-3">Dependency Pointers in Action</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-3 rounded-lg" style={{ background: "rgba(0,163,161,0.06)", border: `1px solid ${SG.masTeal}15` }}>
                  <div className="text-xs font-semibold mb-1" style={{ color: SG.masTeal }}>KYC Token Dependency</div>
                  <p className="text-[11px] leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                    A toket is only transferable if the holder's Finternet Account has a current, valid KYC credential
                    issued by an approved Trust Provider. The dependency pointer references the credential type and issuer.
                  </p>
                </div>
                <div className="p-3 rounded-lg" style={{ background: "rgba(245,158,11,0.06)", border: `1px solid ${SG.finternetAmber}15` }}>
                  <div className="text-xs font-semibold mb-1" style={{ color: SG.finternetAmber }}>Accreditation Dependency</div>
                  <p className="text-[11px] leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                    A structured note toket requires the holder to have an Accredited Investor credential under MAS guidelines.
                    If the credential expires, the toket becomes non-transferable until renewed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </RevealSection>

      {/* ── BYOW: Bring Your Own Wallet ── */}
      <RevealSection delay={100}>
        <section className="px-6 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-2">
              <Wallet className="w-5 h-5" style={{ color: SG.finternetAmber }} />
              <span className="text-xs tracking-[0.15em] uppercase" style={{ color: SG.finternetAmber }}>Wallet Infrastructure</span>
            </div>
            <h2 className="text-2xl font-light mb-3">
              Bring Your Own <span className="font-semibold" style={{ color: SG.finternetAmber }}>Wallet</span> (BYOW)
            </h2>
            <p className="text-sm leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.5)" }}>
              Unlike platforms that force participants onto a single wallet infrastructure, UNITS|SG allows each bank
              and financial institution to bring their own wallet technology. The network enforces common rules;
              the wallet remains the bank's domain. This preserves existing client relationships while enabling
              network-wide interoperability.
            </p>

            {/* Bank wallet cards */}
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {[
                {
                  bank: "DBS",
                  wallet: "DBS Digital Exchange Wallet",
                  desc: "Already operates DDEx with tokenised securities. Connects existing wallet infrastructure to UNITS Network for cross-bank settlement.",
                  color: SG.red,
                },
                {
                  bank: "OCBC",
                  wallet: "OCBC Custody Wallet",
                  desc: "Wealth management and custody clients access the network through OCBC's own wallet layer. Existing custody relationships preserved.",
                  color: SG.masTeal,
                },
                {
                  bank: "UOB",
                  wallet: "UOB Institutional Wallet",
                  desc: "Trade finance and institutional clients use UOB's wallet infrastructure for network access. Connects to MEPS+ for SGD settlement.",
                  color: SG.finternetAmber,
                },
                {
                  bank: "Standard Chartered",
                  wallet: "SC Ventures / Zodia Wallet",
                  desc: "Digital asset custody via Zodia Custody, connected to the UNITS Network protocol. International corridor access for cross-border flows.",
                  color: "#8B5CF6",
                },
              ].map((item, i) => (
                <LiquidGlassCard key={i}>
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold" style={{ background: `${item.color}15`, border: `1px solid ${item.color}25`, color: item.color }}>
                        {item.bank.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-white">{item.bank}</h4>
                        <div className="text-[10px]" style={{ color: item.color }}>{item.wallet}</div>
                      </div>
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{item.desc}</p>
                  </div>
                </LiquidGlassCard>
              ))}
            </div>

            {/* BYOW Integration Flow */}
            <h3 className="text-sm font-semibold text-white/80 mb-4">Wallet Integration Flow</h3>
            <div className="grid grid-cols-4 gap-3">
              {[
                { step: "1", label: "Register", desc: "Bank registers its wallet infrastructure with the UNITS Network, providing compliance certificates and technical specifications", color: SG.finternetAmber },
                { step: "2", label: "Certify", desc: "Network verifies wallet meets security, compliance, and interoperability standards. MAS observer validates regulatory compliance", color: SG.masTeal },
                { step: "3", label: "Connect", desc: "Wallet connects to UNITS Network APIs. Bank's clients can now access all asset classes, settlement, and collateral services", color: SG.red },
                { step: "4", label: "Operate", desc: "Bank maintains full control of its wallet infrastructure. UNITS Network enforces common rules across all connected wallets", color: "#8B5CF6" },
              ].map((item, i) => (
                <div key={i} className="relative p-4 rounded-xl" style={{ background: "rgba(15,29,53,0.6)", border: `1px solid ${item.color}20` }}>
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mb-2" style={{ background: `${item.color}20`, color: item.color }}>
                    {item.step}
                  </div>
                  <h4 className="text-xs font-semibold text-white mb-1">{item.label}</h4>
                  <p className="text-[10px] leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>{item.desc}</p>
                  {i < 3 && (
                    <ArrowRight className="absolute top-1/2 -right-2 w-3 h-3 -translate-y-1/2 hidden md:block" style={{ color: "rgba(255,255,255,0.15)" }} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </RevealSection>

      {/* ── Wallet Registry & Observability ── */}
      <RevealSection delay={100}>
        <section className="px-6 py-16" style={{ background: "rgba(0,0,0,0.15)" }}>
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-2">
              <Eye className="w-5 h-5" style={{ color: SG.masTeal }} />
              <span className="text-xs tracking-[0.15em] uppercase" style={{ color: SG.masTeal }}>Observability</span>
            </div>
            <h2 className="text-2xl font-light mb-3">
              Wallet <span className="font-semibold" style={{ color: SG.masTeal }}>Registry</span> & Compliance State
            </h2>
            <p className="text-sm leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.5)" }}>
              The UNITS Registry maps Finternet account addresses to registered identifiers (phone, email, DID,
              institutional ID). It also maintains the compliance state of every connected wallet, a real-time
              view of who can do what, visible to the MAS observer node.
            </p>

            <div className="grid md:grid-cols-3 gap-4">
              {[
                { icon: <Users className="w-4 h-4" />, label: "Identity Resolution", desc: "A sender can address a transfer to an email or phone number. The registry resolves this to the recipient's Finternet account address.", color: SG.finternetAmber },
                { icon: <Shield className="w-4 h-4" />, label: "Compliance State", desc: "Every wallet's Verifiable Credential status (investor suitability, accreditation, AML/KYC verification, tracked in real time.", color: SG.masTeal },
                { icon: <Eye className="w-4 h-4" />, label: "MAS Observer View", desc: "The regulator sees the unified state across all wallets and registers without needing to query each participant separately.", color: SG.red },
              ].map((item, i) => (
                <LiquidGlassCard key={i}>
                  <div className="p-5">
                    <div className="w-10 h-10 rounded-xl mb-3 flex items-center justify-center" style={{ background: `${item.color}15`, border: `1px solid ${item.color}25` }}>
                      <span style={{ color: item.color }}>{item.icon}</span>
                    </div>
                    <h4 className="text-xs font-semibold text-white mb-2">{item.label}</h4>
                    <p className="text-[11px] leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{item.desc}</p>
                  </div>
                </LiquidGlassCard>
              ))}
            </div>
          </div>
        </section>
      </RevealSection>

      {/* ── Programmable Delegation ── */}
      <RevealSection delay={100}>
        <section className="px-6 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-2">
              <Lock className="w-5 h-5" style={{ color: SG.finternetAmber }} />
              <span className="text-xs tracking-[0.15em] uppercase" style={{ color: SG.finternetAmber }}>Access Control</span>
            </div>
            <h2 className="text-2xl font-light mb-3">
              Programmable <span className="font-semibold" style={{ color: SG.finternetAmber }}>Delegation</span>
            </h2>
            <p className="text-sm leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.5)" }}>
              Delegation is the mechanism by which a user grants another account (an app, an agent, or an institution)
              the ability to operate on their token accounts within defined scope constraints. In UNITS|SG, delegation
              is never open-ended: it is always scoped to a set of token classes, a frequency limit, an amount limit,
              a time window, a purpose code, or some combination thereof.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              {[
                { title: "Recurring Payments", desc: "Subscriptions, salary disbursements, automated within policy bounds", icon: <ArrowRightLeft className="w-4 h-4" /> },
                { title: "Portfolio Rebalancing", desc: "P-Toket composition adjustments by authorised wealth managers", icon: <Layers className="w-4 h-4" /> },
                { title: "Collateral Management", desc: "Margin calls and collateral substitution by clearing houses", icon: <Building2 className="w-4 h-4" /> },
                { title: "Agentic Execution", desc: "AI agents operating within strict policy-bound delegation credentials", icon: <Zap className="w-4 h-4" /> },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl" style={{ background: "rgba(15,29,53,0.5)", border: "1px solid rgba(245,158,11,0.08)" }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${SG.finternetAmber}12` }}>
                    <span style={{ color: SG.finternetAmber }}>{item.icon}</span>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-white mb-1">{item.title}</h4>
                    <p className="text-[11px] leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-xl" style={{ background: "rgba(238,37,54,0.06)", border: `1px solid ${SG.red}15` }}>
              <div className="flex items-start gap-2">
                <Shield className="w-4 h-4 mt-0.5 shrink-0" style={{ color: SG.red }} />
                <div>
                  <div className="text-xs font-semibold mb-1" style={{ color: SG.red }}>Security Principle</div>
                  <p className="text-[11px] leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                    An autonomous agent given unrestricted access to a user's token accounts is a security risk.
                    Agentic execution must be bounded by policy. Scope constraints are encoded as part of the delegation
                    credential, digitally signed by the delegating user, and verified by UNITS before each agent-initiated operation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </RevealSection>

      {/* ── Singapore Use Cases ── */}
      <RevealSection delay={100}>
        <section className="px-6 py-16" style={{ background: "rgba(0,0,0,0.15)" }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-light mb-8">
              Singapore <span className="font-semibold" style={{ color: SG.finternetAmber }}>Use Cases</span>
            </h2>

            <div className="space-y-4">
              {[
                {
                  title: "CDP Bridge: Register to Wallet",
                  desc: "Existing SGX-listed equities and bonds held in CDP's register are represented as proxy tokets on UNITS|SG. Investors access them through their bank's BYOW wallet while CDP remains the legal register. This is the migration path from today to tomorrow.",
                  icon: <ArrowRightLeft className="w-5 h-5" />,
                  color: SG.masTeal,
                  link: "/sg/workflows/cdp-bridge",
                },
                {
                  title: "Native Tokenised Bonds",
                  desc: "New SGS bonds or corporate bonds issued directly on UNITS|SG. The tokenPool IS the register from day one. No CDP bridge needed. Token Programs handle coupon payments, maturity redemption, and corporate actions automatically.",
                  icon: <Landmark className="w-5 h-5" />,
                  color: SG.finternetAmber,
                  link: "/sg/deep-dive/structured-notes",
                },
                {
                  title: "Cross-Bank P-Toket Rebalancing",
                  desc: "A DBS wealth client holds a P-Toket composed of equities (CDP proxy), bonds (native), and gold (SBMA vault). Rebalancing requires atomic operations across three registers and two wallet infrastructures, only possible with the unified state model.",
                  icon: <Layers className="w-5 h-5" />,
                  color: SG.red,
                  link: "/sg/deep-dive/p-tokets",
                },
                {
                  title: "MAS Real-Time Supervision",
                  desc: "The MAS observer node sees the unified state across all bank wallets and all registers (CDP, MEPS+, native tokenPools). Systemic risk, concentration limits, and compliance violations are visible in real time, not in T+1 reports.",
                  icon: <Eye className="w-5 h-5" />,
                  color: "#8B5CF6",
                  link: "/sg/deep-dive/regulatory",
                },
              ].map((item, i) => (
                <Link key={i} href={item.link}>
                  <div className="flex items-start gap-4 p-5 rounded-xl cursor-pointer transition-all duration-300 hover:translate-x-1" style={{ background: "rgba(15,29,53,0.5)", border: `1px solid ${item.color}15` }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${item.color}15`, border: `1px solid ${item.color}25` }}>
                      <span style={{ color: item.color }}>{item.icon}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-white mb-1">{item.title}</h4>
                      <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{item.desc}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 mt-1 shrink-0" style={{ color: "rgba(255,255,255,0.2)" }} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </RevealSection>

      {/* ── Knowledge Base ── */}
      <section className="px-6 py-12" style={{ borderTop: "1px solid rgba(245,158,11,0.08)" }}>
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xs font-medium tracking-[0.2em] uppercase mb-4" style={{ color: "rgba(255,255,255,0.3)" }}>
            Knowledge Base
          </h3>
          <div className="flex flex-wrap gap-2">
            {[
              { href: "/sg/architecture", label: "Network Architecture" },
              { href: "/sg/deep-dive/units", label: "UNITS Protocol" },
              { href: "/sg/deep-dive/token-programs", label: "Token Programs" },
              { href: "/sg/deep-dive/p-tokets", label: "P-Tokets" },
              { href: "/sg/deep-dive/cross-ledger", label: "Cross-Ledger Connectivity" },
              { href: "/sg/deep-dive/tokenisation", label: "Tokenisation" },
              { href: "/sg/workflows/cdp-bridge", label: "CDP Bridge Workflow" },
              { href: "/sg/deep-dive/regulatory", label: "Regulatory Framework" },
              { href: "/sg/deep-dive/participants", label: "Participants Ecosystem" },
            ].map((link, i) => (
              <Link key={i} href={link.href}>
                <span className="inline-block px-3 py-1.5 rounded-full text-[10px] tracking-wider uppercase cursor-pointer transition-all duration-300 hover:scale-105"
                  style={{ background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.12)", color: "rgba(255,255,255,0.4)" }}>
                  {link.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 text-center" style={{ borderTop: "1px solid rgba(245,158,11,0.06)" }}>
        <div className="flex items-center justify-center gap-3 mb-3">
          <img src={UNITS_LOGO} alt="UNITS|SG" className="h-6 opacity-60" />
          <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.15)" }}>|</span>
          <img src={FINTERNET_LOGO} alt="Finternet" className="h-4 opacity-40" />
        </div>
        <p className="text-[10px] tracking-wider" style={{ color: "rgba(255,255,255,0.2)" }}>
          UNITS|SG: Next-Generation Securities Infrastructure for Singapore
        </p>
      </footer>
    </div>
  );
}
