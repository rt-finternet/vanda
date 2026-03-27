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
  Ban, Bell, Calculator, Timer, GitBranch, Link2,
  Server, Radio, Cpu, Workflow, Cable, Plug
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

export default function SGDeepDiveCrossLedger() {
  return (
    <div className="min-h-screen text-white relative" style={{ background: SG.dark }}>
      <CinematicBackground />
      <SGPortalNav />

      <div className="relative z-10 max-w-4xl mx-auto px-6 pt-28 pb-20 space-y-16">
        {/* Hero */}
        <section className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] uppercase tracking-widest" style={{ background: `${SG.finternetCyan}12`, color: SG.finternetCyan }}>
            Deep Dive
          </div>
          <h1 className="text-4xl md:text-5xl font-extralight tracking-tight">
            Cross-Ledger <span className="font-semibold" style={{ color: SG.finternetCyan }}>Connectivity</span>
          </h1>
          <p className="text-base max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.55)" }}>
            How the UNITS protocol connects Singapore's depositories, tokenisation platforms,
            and global ledgers through a unified adapter architecture.
          </p>
          <div className="flex items-center justify-center gap-2 pt-2">
            <img src={SG_LOGO} alt="UNITS|SG" className="h-5 opacity-60" />
            <span className="text-[10px] uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.3)" }}>7-minute read</span>
          </div>
        </section>

        {/* Why Cross-Ledger Matters */}
        <RevealSection id="why-cross-ledger" delay={100}>
          <section>
            <h2 className="text-2xl font-light mb-4">Why cross-ledger <span className="font-semibold">matters</span></h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
              Singapore's financial infrastructure is not a single system. It is a constellation of
              independent ledgers: SGX CDP for equities, MEPS+ for government securities, DDEx for
              digital securities, BondBloX for digital bonds, ADDX for private markets, and InvestaX
              for real-world assets. Each operates its own state model, its own API, and its own
              settlement finality rules. Without a connectivity layer, a toket on one platform cannot
              interact with a toket on another.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { problem: "Siloed settlement", desc: "A DDEx security token and a BondBloX digital bond cannot settle against each other. Each platform has its own settlement cycle and finality model.", color: SG.red },
                { problem: "Trapped collateral", desc: "SGS bonds on MEPS+ cannot be used as margin for CDP equity positions. Collateral is locked within the system where it was issued.", color: SG.nusOrange },
                { problem: "No unified portfolio view", desc: "A wealth manager with positions across CDP, ADDX, and InvestaX must reconcile three separate systems. No single source of truth exists.", color: SG.finternetAmber },
                { problem: "Manual cross-border", desc: "Accessing a US Treasury or German Bund requires foreign brokerage accounts, correspondent custody chains, and T+2 settlement in the foreign market.", color: SG.finternetCyan },
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-xl" style={{ background: `${item.color}04`, border: `1px solid ${item.color}10` }}>
                  <div className="text-sm font-semibold text-white/90 mb-1">{item.problem}</div>
                  <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </RevealSection>

        {/* Adapter Architecture */}
        <RevealSection id="adapter-architecture" delay={100}>
          <section>
            <h2 className="text-2xl font-light mb-4">Adapter <span className="font-semibold">architecture</span></h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
              The UNITS protocol does not replace existing ledgers. It connects them through
              adapters: purpose-built components that bridge between UNITS' internal state model
              and the diverse APIs, protocols, and state formats of external systems. Each adapter
              performs two functions: state ingestion (reading external state into UNITS) and
              transactability (executing operations on external ledgers through a unified API).
            </p>

            <div className="space-y-3">
              {[
                {
                  type: "Depository Adapters",
                  icon: Landmark,
                  color: SG.masTeal,
                  targets: ["SGX CDP (equities, corporate bonds)", "MAS MEPS+ (SGS, MAS bills, SGD RTGS)"],
                  trust: "Authenticated API with mutual TLS. State updates signed by depository operator key. UNITS verifies signatures against registered public keys.",
                  desc: "Connect to Singapore's two central depositories. These are private ledger adapters with explicit integration agreements. The depository remains the legal record-keeper; UNITS creates a programmable proxy layer above.",
                },
                {
                  type: "Platform Adapters",
                  icon: Network,
                  color: SG.nusOrange,
                  targets: ["DDEx (digital securities)", "BondBloX (digital bonds)", "ADDX (private markets)", "InvestaX (RWA tokens)", "Marketnode (bond issuance)"],
                  trust: "API key + HMAC request signing with JWT rotation. Each platform provides an authenticated endpoint conforming to the Finternet OpenAPI spec.",
                  desc: "Connect to Singapore's six MAS-licensed tokenisation platforms. Each platform specialises in different asset classes but shares the same adapter interface, enabling cross-platform settlement and collateral mobility.",
                },
                {
                  type: "Stablecoin Adapter",
                  icon: Coins,
                  color: SG.finternetAmber,
                  targets: ["StraitsX XSGD (SCS-regulated stablecoin)"],
                  trust: "Smart contract event monitoring + authenticated API. XSGD mint/burn events are verified on-chain before UNITS updates proxy state.",
                  desc: "Connects the cash leg of settlement. XSGD is the SCS-regulated stablecoin that enables atomic DvP: the securities leg and cash leg settle simultaneously through the adapter.",
                },
                {
                  type: "Global CSD Adapters",
                  icon: Globe,
                  color: SG.finternetCyan,
                  targets: ["Euroclear (European securities)", "DTCC (US securities)", "JASDEC (Japanese securities)", "Other GL1-compliant networks"],
                  trust: "Custody confirmation protocol. Foreign CSD locks underlying asset and provides cryptographic proof of reserve. UNITS mints unsponsored toket only after verification.",
                  desc: "Connect to global depositories for cross-border access. These adapters enable unsponsored tokets: lock a US Treasury at DTCC, mint a programmable toket on UNITS|SG. The underlying remains safely custodied at the foreign CSD.",
                },
              ].map((adapter, i) => (
                <div key={i} className="rounded-xl overflow-hidden" style={{ border: `1px solid ${adapter.color}15` }}>
                  <div className="px-5 py-3 flex items-center gap-3" style={{ background: `${adapter.color}10` }}>
                    <adapter.icon className="w-5 h-5" style={{ color: adapter.color }} />
                    <div className="text-sm font-semibold text-white/90">{adapter.type}</div>
                  </div>
                  <div className="p-5 space-y-3" style={{ background: `${adapter.color}04` }}>
                    <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{adapter.desc}</p>
                    <div>
                      <div className="text-[10px] uppercase tracking-wider mb-2" style={{ color: `${adapter.color}70` }}>Connected systems</div>
                      <div className="flex flex-wrap gap-2">
                        {adapter.targets.map((t, j) => (
                          <span key={j} className="text-[10px] px-2.5 py-1 rounded-full" style={{ background: `${adapter.color}10`, color: `${adapter.color}90` }}>{t}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-wider mb-1" style={{ color: `${adapter.color}70` }}>Trust model</div>
                      <p className="text-[11px] leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>{adapter.trust}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </RevealSection>

        {/* State Commitment Model */}
        <RevealSection id="state-commitment" delay={100}>
          <section>
            <h2 className="text-2xl font-light mb-4">State <span className="font-semibold">commitment model</span></h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
              Every toket on the UNITS network has an associated state commitment: a cryptographic
              hash of the toket's current state (allocation, dependencies, policies, metadata), signed
              by the UNITS operator's key. This is the mechanism that ensures cross-ledger consistency.
            </p>

            <div className="rounded-2xl overflow-hidden mb-6" style={{ background: SG.card, border: `1px solid ${SG.border}` }}>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ borderBottom: `1px solid ${SG.border}` }}>
                      <th className="text-left p-4 text-white/50 font-medium">Property</th>
                      <th className="text-left p-4 font-medium" style={{ color: SG.finternetCyan }}>UNITS approach</th>
                      <th className="text-left p-4 text-white/40 font-medium">Rationale</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { prop: "Structure", approach: "Per-row hash commitments", rationale: "Each toket has exactly one commitment. No global aggregation. Simpler and more scalable than Merkle trees." },
                      { prop: "Storage", approach: "O(N) where N = number of tokets", rationale: "Linear scaling. No sub-linear global state proofs, but no cross-user dependencies either." },
                      { prop: "Finality", approach: "Commitment is final once signed", rationale: "A token transfer, once committed against the UNITS state commitment, is irreversible." },
                      { prop: "Verification", approach: "External verifiers check per-toket proofs", rationale: "Any party can verify a specific toket's state without downloading the entire state tree." },
                      { prop: "Trust", approach: "UNITS operator signs commitments", rationale: "Operator is trusted for faithful execution, correct hashing, and not modifying state without valid instruction." },
                    ].map((row, i) => (
                      <tr key={i} style={{ borderBottom: `1px solid ${SG.border}` }}>
                        <td className="p-4 text-white/60 font-medium">{row.prop}</td>
                        <td className="p-4 text-white/50">{row.approach}</td>
                        <td className="p-4 text-white/35 text-xs">{row.rationale}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="p-4 rounded-xl" style={{ background: `${SG.masTeal}06`, border: `1px solid ${SG.masTeal}12` }}>
              <div className="flex items-start gap-3">
                <Eye className="w-5 h-5 shrink-0 mt-0.5" style={{ color: SG.masTeal }} />
                <div>
                  <div className="text-sm font-medium text-white/80 mb-1">MAS observer verification</div>
                  <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
                    The MAS observer node can independently verify any toket's state commitment
                    without operational control. This provides real-time supervisory assurance that
                    cross-ledger transfers are executed faithfully across all connected systems.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </RevealSection>

        {/* Cross-Ledger Transfer Flow */}
        <RevealSection id="transfer-flow" delay={100}>
          <section>
            <h2 className="text-2xl font-light mb-4">Cross-ledger <span className="font-semibold">transfer flow</span></h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
              When a toket needs to move between connected systems, the cross-ledger gateway
              orchestrates a multi-step atomic transfer. Here is how a CDP equity is used as
              collateral for a MEPS+ SGS bond position.
            </p>

            <div className="space-y-2">
              {[
                { step: "1", label: "Initiation", desc: "Participant submits a cross-ledger collateral request: encumber 10,000 DBS shares (CDP) as margin for SGS bond repo (MEPS+).", color: SG.masTeal, icon: Play },
                { step: "2", label: "Pre-hook validation", desc: "Token Programs on both legs fire pre-hooks. CDP adapter checks share availability and transfer restrictions. MEPS+ adapter verifies collateral eligibility and haircut.", color: SG.nusOrange, icon: Shield },
                { step: "3", label: "CDP lock", desc: "CDP adapter instructs SGX CDP to encumber the shares. CDP confirms lock and returns a signed state proof. UNITS updates the proxy toket state to 'encumbered'.", color: SG.finternetAmber, icon: Lock },
                { step: "4", label: "MEPS+ credit", desc: "MEPS+ adapter instructs MAS MEPS+ to credit the collateral position. MEPS+ confirms and returns a signed state proof. UNITS updates the collateral toket state.", color: SG.finternetCyan, icon: CheckCircle2 },
                { step: "5", label: "Atomic commit", desc: "Both state updates are committed atomically. If either leg fails, both roll back. The cross-ledger gateway ensures all-or-nothing execution.", color: SG.masTeal, icon: Zap },
                { step: "6", label: "State publication", desc: "New state commitments for both tokets are signed and published. MAS observer node receives real-time notification of the cross-depository collateral movement.", color: SG.red, icon: Eye },
              ].map((s, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-xl" style={{ background: `${s.color}04`, border: `1px solid ${s.color}10` }}>
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

        {/* Singapore Connectivity Map */}
        <RevealSection id="connectivity-map" delay={100}>
          <section>
            <h2 className="text-2xl font-light mb-4">Singapore connectivity <span className="font-semibold">map</span></h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
              The UNITS|SG network connects 14 nodes through the cross-ledger gateway.
              Each connection type has its own adapter, trust model, and state synchronisation protocol.
            </p>

            <div className="rounded-2xl overflow-hidden" style={{ background: SG.card, border: `1px solid ${SG.border}` }}>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ borderBottom: `1px solid ${SG.border}` }}>
                      <th className="text-left p-4 text-white/50 font-medium">Node</th>
                      <th className="text-left p-4 text-white/50 font-medium">Type</th>
                      <th className="text-left p-4 text-white/50 font-medium">Adapter</th>
                      <th className="text-left p-4 text-white/50 font-medium">State sync</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { node: "SGX CDP", type: "Depository", adapter: "Private ledger", sync: "Real-time (event-driven)" },
                      { node: "MAS MEPS+", type: "Depository", adapter: "Private ledger", sync: "Real-time (event-driven)" },
                      { node: "DBS", type: "Anchor bank", adapter: "Bank API", sync: "Near real-time" },
                      { node: "OCBC", type: "Anchor bank", adapter: "Bank API", sync: "Near real-time" },
                      { node: "UOB", type: "Anchor bank", adapter: "Bank API", sync: "Near real-time" },
                      { node: "HSBC", type: "GL1 global bank", adapter: "Bank API", sync: "Near real-time" },
                      { node: "J.P. Morgan", type: "GL1 global bank", adapter: "Onyx / Bank API", sync: "Near real-time" },
                      { node: "StanChart", type: "GL1 global bank", adapter: "Bank API", sync: "Near real-time" },
                      { node: "MUFG", type: "GL1 global bank", adapter: "Bank API", sync: "Near real-time" },
                      { node: "DDEx", type: "RMO platform", adapter: "Platform API", sync: "Real-time" },
                      { node: "BondBloX", type: "RMO platform", adapter: "Platform API", sync: "Real-time" },
                      { node: "ADDX", type: "RMO platform", adapter: "Platform API", sync: "Real-time" },
                      { node: "InvestaX", type: "RMO platform", adapter: "Platform API", sync: "Real-time" },
                      { node: "Marketnode", type: "RMO platform", adapter: "Platform API", sync: "Real-time" },
                      { node: "StraitsX", type: "Stablecoin", adapter: "Smart contract", sync: "On-chain events" },
                      { node: "MAS Observer", type: "Supervisor", adapter: "Read-only", sync: "Real-time (all events)" },
                    ].map((row, i) => (
                      <tr key={i} style={{ borderBottom: `1px solid ${SG.border}` }}>
                        <td className="p-4 text-white/70 font-medium">{row.node}</td>
                        <td className="p-4 text-white/50">{row.type}</td>
                        <td className="p-4 text-white/50">{row.adapter}</td>
                        <td className="p-4 text-white/40">{row.sync}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </RevealSection>

        {/* Global Connectivity */}
        <RevealSection id="global-connectivity" delay={100}>
          <section>
            <h2 className="text-2xl font-light mb-4">Global <span className="font-semibold">connectivity</span></h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
              Beyond Singapore's domestic infrastructure, the cross-ledger gateway connects to
              global depositories and GL1-compliant networks. This is the foundation for unsponsored
              tokets and cross-border settlement.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                {
                  corridor: "Singapore to Americas",
                  icon: Globe,
                  color: SG.finternetCyan,
                  csd: "DTCC",
                  assets: "US Treasuries, US equities, corporate bonds",
                  mechanism: "Custody lock at DTCC, unsponsored toket mint on UNITS|SG. Settlement in XSGD or USD stablecoin.",
                },
                {
                  corridor: "Singapore to Europe",
                  icon: Building2,
                  color: SG.nusOrange,
                  csd: "Euroclear (via Marketnode bridge)",
                  assets: "German Bunds, EU equities, Eurobonds, structured notes",
                  mechanism: "Marketnode's Euroclear connection provides the custody bridge. Unsponsored tokets represent European securities on UNITS|SG.",
                },
                {
                  corridor: "Singapore to Japan",
                  icon: Landmark,
                  color: SG.finternetAmber,
                  csd: "JASDEC",
                  assets: "JGBs, Japanese equities",
                  mechanism: "Direct adapter to JASDEC. Custody lock and unsponsored toket issuance follow the same protocol as DTCC.",
                },
                {
                  corridor: "GL1 Network Mesh",
                  icon: Network,
                  color: SG.masTeal,
                  csd: "Any GL1-compliant network",
                  assets: "Any tokenised asset on a GL1 network",
                  mechanism: "Native GL1 interoperability. No adapter required for GL1-to-GL1 transfers. Shared standards enable direct cross-network settlement.",
                },
              ].map((c, i) => (
                <div key={i} className="p-4 rounded-xl" style={{ background: `${c.color}04`, border: `1px solid ${c.color}10` }}>
                  <div className="flex items-center gap-2 mb-2">
                    <c.icon className="w-4 h-4" style={{ color: c.color }} />
                    <div className="text-sm font-semibold text-white/90">{c.corridor}</div>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider" style={{ color: `${c.color}60` }}>CSD: </span>
                      <span className="text-xs text-white/60">{c.csd}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider" style={{ color: `${c.color}60` }}>Assets: </span>
                      <span className="text-xs text-white/50">{c.assets}</span>
                    </div>
                    <p className="text-[11px] leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>{c.mechanism}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </RevealSection>

        {/* Security and Trust */}
        <RevealSection id="security" delay={100}>
          <section>
            <h2 className="text-2xl font-light mb-4">Security and <span className="font-semibold">trust model</span></h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
              Cross-ledger connectivity introduces trust boundaries. The UNITS protocol manages
              these through a layered security model where each adapter type carries appropriate
              trust assumptions.
            </p>

            <div className="space-y-3">
              {[
                {
                  title: "Private ledger adapters (CDP, MEPS+)",
                  items: [
                    "Mutual TLS with client certificates issued by a Finternet-governed Certificate Authority",
                    "State updates signed by the private ledger operator's key",
                    "UNITS holds registered public keys for each depository to verify state proofs",
                    "Explicit integration agreements with SLA-backed uptime guarantees",
                  ],
                  color: SG.masTeal,
                },
                {
                  title: "Platform adapters (DDEx, BondBloX, ADDX, InvestaX, Marketnode)",
                  items: [
                    "JWT tokens signed with platform operator keys, rotated on a defined schedule",
                    "API key + HMAC request signing for all state-changing operations",
                    "Conformance to Finternet OpenAPI spec for standardised interface",
                    "Platform-specific UILP gates enforced before any cross-platform transfer",
                  ],
                  color: SG.nusOrange,
                },
                {
                  title: "Global CSD adapters (Euroclear, DTCC, JASDEC)",
                  items: [
                    "Custody confirmation protocol: foreign CSD provides cryptographic proof of reserve",
                    "Unsponsored toket minted only after custody lock is independently verified",
                    "Redemption triggers release only after burn is confirmed on UNITS",
                    "Periodic reconciliation between UNITS proxy state and foreign CSD records",
                  ],
                  color: SG.finternetCyan,
                },
              ].map((section, i) => (
                <div key={i} className="rounded-xl overflow-hidden" style={{ border: `1px solid ${section.color}12` }}>
                  <div className="px-5 py-3" style={{ background: `${section.color}08` }}>
                    <div className="text-sm font-semibold text-white/85">{section.title}</div>
                  </div>
                  <div className="p-5" style={{ background: `${section.color}03` }}>
                    <div className="space-y-2">
                      {section.items.map((item, j) => (
                        <div key={j} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: `${section.color}60` }} />
                          <span className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </RevealSection>

        {/* Today vs UNITS Cross-Ledger */}
        <RevealSection id="comparison" delay={100}>
          <section>
            <h2 className="text-2xl font-light mb-4">Today vs <span className="font-semibold">UNITS cross-ledger</span></h2>

            <div className="rounded-2xl overflow-hidden" style={{ background: SG.card, border: `1px solid ${SG.border}` }}>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ borderBottom: `1px solid ${SG.border}` }}>
                      <th className="text-left p-4 text-white/50 font-medium">Dimension</th>
                      <th className="text-left p-4 text-white/40 font-medium">Today</th>
                      <th className="text-left p-4 font-medium" style={{ color: SG.finternetCyan }}>UNITS cross-ledger</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { dim: "CDP to MEPS+ collateral", today: "Manual process, overnight reconciliation, fax-based in some cases", units: "Atomic cross-depository encumbrance in seconds" },
                      { dim: "Cross-platform settlement", today: "Impossible. DDEx and BondBloX cannot settle against each other", units: "Unified DvP across all 6 platforms via adapter layer" },
                      { dim: "Foreign securities access", today: "Foreign brokerage account, correspondent custody, T+2 settlement", units: "Unsponsored toket: lock at foreign CSD, mint on UNITS|SG, trade 24/7" },
                      { dim: "Portfolio view", today: "Manual aggregation across CDP, MEPS+, and 6 platforms", units: "Single unified view via UNITS state. P-Tokets compose across all sources" },
                      { dim: "Regulatory visibility", today: "Quarterly reports from each system separately", units: "MAS observer node sees all cross-ledger movements in real-time" },
                      { dim: "Settlement finality", today: "Varies by system: T+2 (CDP), RTGS (MEPS+), platform-specific", units: "Atomic finality across all connected systems" },
                    ].map((row, i) => (
                      <tr key={i} style={{ borderBottom: `1px solid ${SG.border}` }}>
                        <td className="p-4 text-white/60 font-medium">{row.dim}</td>
                        <td className="p-4 text-white/35">{row.today}</td>
                        <td className="p-4 text-white/50">{row.units}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </RevealSection>

        {/* Knowledge Base */}
        <RevealSection id="knowledge-base" delay={100}>
          <section>
            <div className="flex items-center gap-3 mb-6">
              <img src={SG_LOGO} alt="UNITS|SG" className="h-6" />
              <h2 className="text-xl font-light">UNITS <span className="font-semibold">Knowledge Base</span></h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { label: "UNITS Protocol Deep Dive", href: "/sg/deep-dive/units", desc: "Three-layer architecture and design principles" },
                { label: "Token Programs", href: "/sg/deep-dive/token-programs", desc: "Lifecycle automation and programmable rules" },
                { label: "P-Tokets (Portfolios)", href: "/sg/deep-dive/p-tokets", desc: "Composable portfolio tokets" },
                { label: "Unsponsored Tokets", href: "/sg/deep-dive/unsponsored-tokets", desc: "Global securities access via depositary receipts" },
                { label: "DvP Settlement", href: "/sg/deep-dive/dvp-settlement", desc: "Atomic settlement mechanics and models" },
                { label: "Collateral Highway", href: "/sg/deep-dive/collateral-highway", desc: "Cross-depository collateral mobilisation" },
                { label: "Precious Metals", href: "/sg/deep-dive/precious-metals", desc: "Gold and precious metals tokenisation" },
                { label: "Cross-Border Settlement", href: "/sg/workflow/cross-border-settlement", desc: "Multi-corridor settlement workflow" },
              ].map((link, i) => (
                <Link key={i} href={link.href} className="flex items-start gap-3 p-3 rounded-lg transition-all hover:bg-white/[0.03]" style={{ border: `1px solid ${SG.border}` }}>
                  <BookOpen className="w-4 h-4 shrink-0 mt-0.5" style={{ color: `${SG.finternetCyan}60` }} />
                  <div>
                    <div className="text-sm text-white/70 hover:text-white/90 transition-colors">{link.label}</div>
                    <div className="text-[10px] mt-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>{link.desc}</div>
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
                <div className="flex items-center gap-1.5 mt-0.5">
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
