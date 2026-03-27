import { useRef, useState, useEffect } from "react";
import { Link } from "wouter";
import SGPortalNav, { SG } from "@/components/SGPortalNav";
import { CinematicBackground } from "@/components/motion";
import {
  ArrowRight, Network, Building2, Landmark, Coins,
  Layers, Shield, Globe, Zap, CheckCircle2, BookOpen,
  BarChart3, Lock, Eye, Wallet, ArrowRightLeft, Server,
  TrendingUp, Gem, FileText
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

/* ── Network Diagram Data ── */
/* Five tiers:
   Tier 1 (top): MAS - Central Bank & Unified Regulator
   Tier 2 (upper-mid): SGX CDP, MEPS+ - Core Infrastructure
   Tier 3 (mid): Anchor Banks - DBS, OCBC, UOB (local)
   Tier 3b (mid-lower): GL1 Global Banks - HSBC, J.P. Morgan, StanChart, MUFG
   Tier 4 (lower): Tokenisation RMOs & Platforms - DDEx, BondBloX, ADDX, InvestaX, Marketnode, StraitsX
*/
const nodes = [
  /* Tier 1: Regulator */
  { id: "mas", label: "MAS", subtitle: "Central Bank &\nUnified Regulator", x: 50, y: 8, color: SG.red, tier: 1 },
  /* Tier 2: Core Infrastructure */
  { id: "cdp", label: "SGX CDP", subtitle: "Equities &\nCorporate Bonds", x: 30, y: 28, color: SG.nusOrange, tier: 2 },
  { id: "meps", label: "MEPS+", subtitle: "Government\nSecurities & SGD", x: 70, y: 28, color: SG.masTeal, tier: 2 },
  /* Tier 3: Anchor Banks (local) */
  { id: "dbs", label: "DBS", subtitle: "Anchor Bank", x: 17, y: 44, color: SG.finternetCyan, tier: 3 },
  { id: "ocbc", label: "OCBC", subtitle: "Anchor Bank", x: 50, y: 44, color: SG.finternetCyan, tier: 3 },
  { id: "uob", label: "UOB", subtitle: "Anchor Bank", x: 83, y: 44, color: SG.finternetCyan, tier: 3 },
  /* Tier 3b: GL1 Global Banks */
  { id: "hsbc", label: "HSBC", subtitle: "GL1 Member\nLargest Foreign Bank", x: 12, y: 58, color: SG.masTeal, tier: 3 },
  { id: "jpm", label: "J.P. Morgan", subtitle: "GL1 Member\nOnyx / Partior", x: 37, y: 58, color: SG.masTeal, tier: 3 },
  { id: "sc", label: "StanChart", subtitle: "GL1 Member\nGlobal Hub", x: 63, y: 58, color: SG.masTeal, tier: 3 },
  { id: "mufg", label: "MUFG", subtitle: "GL1 Member\nJapan Corridor", x: 88, y: 58, color: SG.masTeal, tier: 3 },
  /* Tier 4: Tokenisation RMOs & Platforms */
  { id: "ddex", label: "DDEx", subtitle: "DBS Digital\nExchange", x: 8, y: 74, color: SG.finternetAmber, tier: 4 },
  { id: "bondblox", label: "BondBloX", subtitle: "Digital Bond\nPlatform", x: 25, y: 74, color: SG.finternetAmber, tier: 4 },
  { id: "addx", label: "ADDX", subtitle: "Private Markets\nRMO", x: 42, y: 74, color: SG.finternetAmber, tier: 4 },
  { id: "investax", label: "InvestaX", subtitle: "RWA\nTokenisation", x: 58, y: 74, color: SG.finternetAmber, tier: 4 },
  { id: "marketnode", label: "Marketnode", subtitle: "Digital Market\nInfrastructure", x: 75, y: 74, color: SG.finternetAmber, tier: 4 },
  { id: "straitsx", label: "StraitsX", subtitle: "XSGD\nStablecoin", x: 92, y: 74, color: SG.finternetAmber, tier: 4 },
];

const connections: [string, string, string?][] = [
  /* MAS to core infra */
  ["mas", "cdp"], ["mas", "meps"],
  /* CDP-MEPS+ bridge */
  ["cdp", "meps", "bridge"],
  /* Core infra to anchor banks */
  ["cdp", "dbs"], ["cdp", "ocbc"], ["cdp", "uob"],
  ["meps", "dbs"], ["meps", "ocbc"], ["meps", "uob"],
  /* Core infra to GL1 global banks */
  ["cdp", "hsbc"], ["cdp", "jpm"], ["cdp", "sc"],
  ["meps", "hsbc"], ["meps", "jpm"], ["meps", "sc"], ["meps", "mufg"],
  /* Anchor banks to GL1 banks (cross-tier connections) */
  ["dbs", "hsbc"], ["dbs", "jpm"], ["ocbc", "sc"], ["uob", "mufg"],
  /* Banks to tokenisation platforms */
  ["dbs", "ddex"], ["dbs", "bondblox"], ["dbs", "addx"],
  ["ocbc", "addx"], ["ocbc", "investax"],
  ["uob", "investax"], ["uob", "marketnode"],
  ["hsbc", "marketnode"], ["jpm", "bondblox"],
  ["sc", "marketnode"], ["sc", "straitsx"],
  ["mufg", "addx"],
  /* Cross-connections among platforms */
  ["ddex", "bondblox"], ["addx", "investax"], ["marketnode", "straitsx"],
  /* Banks to StraitsX for cash leg */
  ["dbs", "straitsx"], ["ocbc", "straitsx"], ["hsbc", "straitsx"], ["jpm", "straitsx"],
  /* MAS oversight */
  ["mas", "dbs"], ["mas", "hsbc"], ["mas", "sc"],
];

function NetworkDiagram() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const nodeMap = Object.fromEntries(nodes.map(n => [n.id, n]));

  return (
    <div className="relative w-full" style={{ paddingBottom: "70%" }}>
      <svg
        viewBox="0 0 100 90"
        className="absolute inset-0 w-full h-full"
        style={{ overflow: "visible" }}
      >
        {/* Connection lines */}
        {connections.map(([from, to, type], i) => {
          const a = nodeMap[from];
          const b = nodeMap[to];
          const isHighlighted = hoveredNode === from || hoveredNode === to;
          const isBridge = type === "bridge";
          return (
            <line
              key={i}
              x1={a.x} y1={a.y}
              x2={b.x} y2={b.y}
              stroke={isBridge ? SG.nusOrange : isHighlighted ? SG.finternetCyan : `${SG.finternetCyan}25`}
              strokeWidth={isBridge ? 0.5 : isHighlighted ? 0.35 : 0.15}
              strokeDasharray={isBridge ? "1.2 0.6" : "none"}
              style={{ transition: "all 0.3s ease" }}
            />
          );
        })}
      </svg>

      {/* Tier labels */}
      {[
        { label: "Regulator", y: "8%", color: SG.red },
        { label: "Core Infrastructure", y: "28%", color: SG.masTeal },
        { label: "Anchor Banks", y: "44%", color: SG.finternetCyan },
        { label: "GL1 Global Banks", y: "58%", color: SG.masTeal },
        { label: "Tokenisation Platforms & RMOs", y: "74%", color: SG.finternetAmber },
      ].map((tier, i) => (
        <div
          key={i}
          className="absolute left-0 text-[0.35rem] md:text-[0.5rem] font-medium tracking-wider uppercase"
          style={{ top: tier.y, transform: "translateY(-50%) rotate(-90deg) translateX(-100%)", transformOrigin: "left center", color: `${tier.color}40`, whiteSpace: "nowrap" }}
        />
      ))}

      {/* Node circles */}
      {nodes.map((node) => {
        const isHovered = hoveredNode === node.id;
        const widthClass = node.tier <= 2 ? "w-[14%]" : node.tier === 3 ? "w-[12%]" : "w-[11%]";
        return (
          <div
            key={node.id}
            className={`absolute ${widthClass} flex flex-col items-center justify-center cursor-pointer`}
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              transform: "translate(-50%, -50%)",
              zIndex: isHovered ? 10 : 1,
            }}
            onMouseEnter={() => setHoveredNode(node.id)}
            onMouseLeave={() => setHoveredNode(null)}
          >
            <div
              className="rounded-xl flex flex-col items-center justify-center p-1.5 md:p-2 transition-all duration-300"
              style={{
                background: isHovered ? `${node.color}25` : `${node.color}10`,
                border: `1.5px solid ${isHovered ? node.color : `${node.color}35`}`,
                boxShadow: isHovered ? `0 0 20px ${node.color}20` : "none",
                width: "100%",
                aspectRatio: "1.3",
              }}
            >
              <div className="text-[0.5rem] md:text-[0.65rem] font-bold text-white/90 text-center leading-tight">{node.label}</div>
              <div className="text-[0.3rem] md:text-[0.45rem] text-center leading-tight mt-0.5 whitespace-pre-line" style={{ color: `${node.color}80` }}>
                {node.subtitle}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function SGDeepDiveUNITS() {
  return (
    <div className="min-h-screen text-white" style={{ background: SG.dark }}>
      <SGPortalNav />

      {/* Hero */}
      <section className="relative px-6 pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${SG.dark}, #0D1F3A 50%, #122B4A)` }} />
        <CinematicBackground variant="teal" intensity={0.08} />
        <div className="relative max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <Network className="w-5 h-5" style={{ color: SG.masTeal }} />
            <span className="text-xs font-medium tracking-[0.2em] uppercase" style={{ color: SG.masTeal }}>Deep Dive</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-light mb-4">
            Singapore on <span className="font-semibold">UNITS</span>
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
            UNITS|SG, built in partnership with Finternet Labs on the UNITS protocol stack, bridges
            Singapore's two depositories (SGX CDP and MEPS+), four anchor banks, and six tokenisation
            platforms into a single GL1-compliant interoperable network. Each institution maintains its
            regulatory independence while sharing a common token and identity infrastructure.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-6 pb-24 space-y-20">

        {/* Network Diagram */}
        <RevealSection id="network-diagram">
          <section>
            <h2 className="text-2xl font-light mb-3 text-center">The Singapore Ecosystem on <span className="font-semibold">UNITS</span></h2>
            <p className="text-sm leading-relaxed mb-8 text-center" style={{ color: "rgba(255,255,255,0.5)" }}>
              UNITS|SG unifies MAS, SGX CDP, MEPS+, Singapore's anchor banks, GL1 global banks, and the full ecosystem
              of MAS-licensed tokenisation platforms into a single GL1-compliant network. Seventeen nodes.
              One protocol. One identity layer.
            </p>

            <div className="rounded-2xl p-4 md:p-8 mb-6" style={{ background: SG.card, border: `1px solid ${SG.border}` }}>
              <NetworkDiagram />
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
              <div className="flex items-center gap-2">
                <div className="w-8 h-px" style={{ background: SG.finternetCyan }} />
                <span>UNITS / UILP overlay</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-px" style={{ background: SG.nusOrange, borderTop: `1px dashed ${SG.nusOrange}` }} />
                <span>CDP-MEPS+ bridge (new)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded" style={{ background: `${SG.red}20`, border: `1px solid ${SG.red}40` }} />
                <span>Regulator</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded" style={{ background: `${SG.finternetCyan}20`, border: `1px solid ${SG.finternetCyan}40` }} />
                <span>Anchor Banks</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded" style={{ background: `${SG.masTeal}20`, border: `1px solid ${SG.masTeal}40` }} />
                <span>GL1 Global Banks</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded" style={{ background: `${SG.finternetAmber}20`, border: `1px solid ${SG.finternetAmber}40` }} />
                <span>Tokenisation RMOs</span>
              </div>
            </div>
          </section>
        </RevealSection>

        {/* Tier 1 & 2: Core Infrastructure */}
        <RevealSection id="core-infra" delay={100}>
          <section>
            <h2 className="text-2xl font-light mb-6">Core <span className="font-semibold">infrastructure</span></h2>
            <p className="text-sm leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.6)" }}>
              Singapore's financial infrastructure is anchored by two complementary depositories: SGX CDP
              for equities and corporate bonds, and MEPS+ for government securities and SGD settlement.
              Both are unified under a single regulator (MAS). The dual-depository bridge that connects
              them through the UNITS protocol is the structural innovation at the heart of UNITS|SG.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {[
                {
                  icon: Landmark,
                  title: "MAS (Observer & Regulator)",
                  color: SG.red,
                  desc: "The hub of the network. MAS serves as both central bank and unified financial supervisor, giving Singapore a single regulatory perimeter across all asset classes. On UNITS, MAS operates the observer node with real-time supervisory access across all participants and platforms. As GL1 standards sponsor, MAS ensures the network meets international interoperability benchmarks.",
                },
                {
                  icon: BarChart3,
                  title: "SGX CDP (Equities Depository)",
                  color: SG.nusOrange,
                  desc: "Singapore's central depository for equities, corporate bonds, ETFs, and structured warrants. On UNITS, CDP-held assets are proxy-tokenised into tokets that mirror positions with real-time synchronisation. CDP remains the legal depository while UNITS provides programmable settlement, collateral mobilisation, and 24/7 trading capabilities.",
                },
                {
                  icon: Coins,
                  title: "MEPS+ (Government Securities)",
                  color: SG.masTeal,
                  desc: "MAS Electronic Payment System handles real-time gross settlement for SGD and serves as the depository for Singapore Government Securities (SGS), MAS Bills, and T-Bills. On UNITS, MEPS+ assets are proxy-tokenised, enabling them to be used as collateral alongside CDP equities for the first time in a single atomic operation.",
                },
              ].map((node, i) => (
                <div key={i} className="rounded-xl overflow-hidden" style={{ background: SG.card, border: `1px solid ${node.color}15` }}>
                  <div className="px-4 py-3 flex items-center gap-2" style={{ background: `${node.color}08`, borderBottom: `1px solid ${node.color}10` }}>
                    <node.icon className="w-4 h-4" style={{ color: node.color }} />
                    <div className="text-sm font-semibold text-white/90">{node.title}</div>
                  </div>
                  <div className="p-4">
                    <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{node.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </RevealSection>

        {/* Tier 3: Anchor Banks */}
        <RevealSection id="anchor-banks" delay={100}>
          <section>
            <h2 className="text-2xl font-light mb-6">Anchor <span className="font-semibold">banks</span></h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
              Singapore's systemically important banks form the liquidity backbone. Each bank operates
              its own BYOW (Bring Your Own Wallet) infrastructure while connecting to the shared UNITS
              protocol. Together with GL1 global banks, they provide the distribution, custody, and market-making capabilities
              that make the network viable.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  title: "DBS Bank",
                  icon: Building2,
                  color: SG.finternetCyan,
                  tags: ["DDEx operator", "Security token issuer", "Repo collateral pioneer"],
                  desc: "Singapore's largest bank and operator of DDEx, the world's first bank-backed digital exchange. DBS brings institutional-grade digital asset infrastructure, security token offerings, and has pioneered tokenised fund collateral for repo transactions. On UNITS, DBS connects its DDEx platform to the shared protocol, enabling cross-platform settlement.",
                },
                {
                  title: "OCBC Bank",
                  icon: Building2,
                  color: SG.finternetCyan,
                  tags: ["Wealth management", "ASEAN network", "Private banking"],
                  desc: "OCBC brings deep wealth management capabilities and private banking distribution. On UNITS, OCBC's wealth platform can offer clients access to tokenised VCC fund interests, structured products, and cross-border securities through a single interface connected to the shared protocol.",
                },
                {
                  title: "UOB",
                  icon: Building2,
                  color: SG.finternetCyan,
                  tags: ["ASEAN connectivity", "Trade finance", "SME banking"],
                  desc: "UOB's strength is ASEAN connectivity across Thailand, Indonesia, Malaysia, and Vietnam. On UNITS, UOB extends the network's reach into Southeast Asian markets, enabling cross-border collateral mobilisation and trade finance tokenisation across the region.",
                },
              ].map((bank, i) => (
                <div key={i} className="rounded-xl overflow-hidden" style={{ background: SG.card, border: `1px solid ${bank.color}15` }}>
                  <div className="px-4 py-3 flex items-center gap-2" style={{ background: `${bank.color}08`, borderBottom: `1px solid ${bank.color}10` }}>
                    <bank.icon className="w-4 h-4" style={{ color: bank.color }} />
                    <div className="text-sm font-semibold text-white/90">{bank.title}</div>
                  </div>
                  <div className="p-4">
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {bank.tags.map((tag, j) => (
                        <span key={j} className="text-[9px] px-2 py-0.5 rounded-full" style={{ background: `${bank.color}10`, color: `${bank.color}80` }}>{tag}</span>
                      ))}
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{bank.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <h3 className="text-xl font-light mt-10 mb-4">GL1 <span className="font-semibold">global banks</span></h3>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
              GL1 founding members operating in Singapore connect to UNITS as global bank nodes, bringing international
              reach, cross-border corridors, and institutional distribution. Each operates its own wallet infrastructure
              while accessing the shared protocol.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  title: "HSBC",
                  icon: Building2,
                  color: SG.nusOrange,
                  tags: ["GL1 founding member", "Largest foreign bank in SG", "International Wealth"],
                  desc: "Singapore's largest foreign bank by assets. HSBC brings its International Wealth platform, securities services, and global custody network to UNITS. As a GL1 founding member, HSBC connects Singapore's tokenised assets to its 60+ market network, enabling cross-border distribution of gold tokets, VCC interests, and structured products.",
                },
                {
                  title: "J.P. Morgan",
                  icon: Building2,
                  color: SG.nusOrange,
                  tags: ["GL1 founding member", "Onyx / Kinexys", "Partior"],
                  desc: "J.P. Morgan's Onyx digital assets platform and its role as co-founder of Partior (the MAS-backed multi-currency clearing network) make it a natural UNITS participant. On UNITS, J.P. Morgan provides institutional-grade collateral mobilisation, cross-currency DvP via Partior rails, and global prime brokerage connectivity.",
                },
                {
                  title: "Standard Chartered",
                  icon: Building2,
                  color: SG.nusOrange,
                  tags: ["GL1 founding member", "Zodia Custody", "Global reach"],
                  desc: "Standard Chartered brings global reach, Zodia institutional custody, and GL1 membership credentials. On UNITS, StanChart serves as the bridge to international markets, connecting Singapore's tokenised assets to global institutional investors and providing custody infrastructure for digital securities.",
                },
                {
                  title: "MUFG",
                  icon: Building2,
                  color: SG.nusOrange,
                  tags: ["GL1 founding member", "Japan corridor", "Progmat platform"],
                  desc: "Japan's largest bank and a GL1 founding member. MUFG's Progmat security token platform and its dominant position in Japan-Singapore trade corridors make it a key UNITS participant. On UNITS, MUFG enables cross-border settlement between SGX and JPX, yen-denominated collateral mobilisation, and distribution of Singapore-originated tokets to Japanese institutional investors.",
                },
              ].map((bank, i) => (
                <div key={i} className="rounded-xl overflow-hidden" style={{ background: SG.card, border: `1px solid ${bank.color}15` }}>
                  <div className="px-4 py-3 flex items-center gap-2" style={{ background: `${bank.color}08`, borderBottom: `1px solid ${bank.color}10` }}>
                    <bank.icon className="w-4 h-4" style={{ color: bank.color }} />
                    <div className="text-sm font-semibold text-white/90">{bank.title}</div>
                  </div>
                  <div className="p-4">
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {bank.tags.map((tag, j) => (
                        <span key={j} className="text-[9px] px-2 py-0.5 rounded-full" style={{ background: `${bank.color}10`, color: `${bank.color}80` }}>{tag}</span>
                      ))}
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{bank.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </RevealSection>

        {/* Tier 4: Tokenisation Platforms & RMOs */}
        <RevealSection id="tokenisation-rmos" delay={100}>
          <section>
            <h2 className="text-2xl font-light mb-6">Tokenisation <span className="font-semibold">platforms & RMOs</span></h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
              Singapore has the richest ecosystem of MAS-licensed tokenisation platforms in Asia. On UNITS,
              these platforms connect to the shared protocol, enabling cross-platform settlement, unified
              compliance, and interoperable secondary markets. Each platform retains its specialisation
              while gaining access to the entire network's liquidity and asset base.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {[
                {
                  title: "DDEx (DBS Digital Exchange)",
                  icon: TrendingUp,
                  color: SG.finternetAmber,
                  license: "MAS-licensed RMO",
                  speciality: "Security tokens, crypto, structured notes",
                  desc: "The world's first bank-backed digital exchange, operated by DBS. DDEx offers institutional-grade trading of security tokens, cryptocurrencies, and tokenised structured notes. Recently pioneered tokenised fund collateral for repo transactions. On UNITS, DDEx becomes the primary venue for institutional digital asset trading with atomic DvP settlement.",
                },
                {
                  title: "BondBloX",
                  icon: FileText,
                  color: SG.finternetAmber,
                  license: "MAS-designated (G-ADBGS)",
                  speciality: "Digital bonds, fixed income",
                  desc: "MAS-designated digital asset platform under the Global-Asia Digital Bond Grant Scheme (G-ADBGS). BondBloX specialises in fractionalised bond trading, making fixed income accessible at lower denominations. On UNITS, BondBloX-issued digital bonds become interoperable with the broader network, enabling cross-collateralisation with equities and government securities.",
                },
                {
                  title: "ADDX",
                  icon: Gem,
                  color: SG.finternetAmber,
                  license: "MAS-licensed CMS & RMO",
                  speciality: "Private markets, PE, RE, hedge funds",
                  desc: "Backed by SGX Group, ADDX is Singapore's leading private markets exchange. Uses blockchain and smart contracts to tokenise and fractionalise private equity, real estate, hedge funds, and fixed income. On UNITS, ADDX-tokenised private market assets gain secondary liquidity and can be used as collateral through the shared protocol.",
                },
                {
                  title: "InvestaX",
                  icon: Layers,
                  color: SG.finternetAmber,
                  license: "MAS-licensed CMS & RMO",
                  speciality: "RWA tokenisation, funds, real estate",
                  desc: "Institutional-grade tokenisation platform for real-world assets. InvestaX enables financial institutions and asset managers to tokenise, distribute, and trade RWAs compliantly. Recently launched tokenised high-yield corporate bonds. On UNITS, InvestaX-originated tokens settle atomically and gain cross-platform liquidity.",
                },
                {
                  title: "Marketnode",
                  icon: Server,
                  color: SG.finternetAmber,
                  license: "Digital market infrastructure",
                  speciality: "Bond issuance, fixed income digitisation",
                  desc: "Backed by Euroclear, HSBC, SGX Group, and Temasek. Marketnode is APAC's trusted and neutral digital market infrastructure, focused on bond issuance, listing, and settlement digitisation. On UNITS, Marketnode provides the bridge between traditional fixed income infrastructure and the tokenised network, leveraging its Euroclear connection for cross-border interoperability.",
                },
                {
                  title: "StraitsX (XSGD)",
                  icon: Wallet,
                  color: SG.finternetAmber,
                  license: "MAS-licensed (SCS framework)",
                  speciality: "SGD stablecoin, payment rails",
                  desc: "Operator of XSGD, the first SCS-regulated SGD stablecoin with guaranteed 1:1 reserve backing and par redemption within 5 business days. On UNITS, XSGD provides the cash leg for atomic DvP settlement across all platforms, enabling simultaneous delivery of securities and payment in a single transaction.",
                },
              ].map((platform, i) => (
                <div key={i} className="rounded-xl overflow-hidden" style={{ background: SG.card, border: `1px solid ${platform.color}15` }}>
                  <div className="px-4 py-3" style={{ background: `${platform.color}08`, borderBottom: `1px solid ${platform.color}10` }}>
                    <div className="flex items-center gap-2 mb-1">
                      <platform.icon className="w-4 h-4" style={{ color: platform.color }} />
                      <div className="text-sm font-semibold text-white/90">{platform.title}</div>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      <span className="text-[9px] px-2 py-0.5 rounded-full" style={{ background: `${SG.masTeal}15`, color: `${SG.masTeal}80` }}>{platform.license}</span>
                      <span className="text-[9px] px-2 py-0.5 rounded-full" style={{ background: `${platform.color}10`, color: `${platform.color}70` }}>{platform.speciality}</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{platform.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </RevealSection>

        {/* UNITS Protocol Design Principles */}
        <RevealSection id="design-principles" delay={100}>
          <section>
            <h2 className="text-2xl font-light mb-6">Protocol design <span className="font-semibold">principles</span></h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
              The UNITS protocol is designed to be deployed in any market. Singapore's implementation
              follows seven design principles that ensure the network can evolve without disrupting
              existing infrastructure or regulatory frameworks.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { principle: "Overlay, not replace", desc: "UNITS sits above CDP and MEPS+. Both depositories remain the legal record-keepers. The protocol adds programmability without changing ownership structures.", color: SG.masTeal },
                { principle: "Single regulatory perimeter", desc: "MAS supervises the entire network through one observer node. No cross-jurisdictional coordination required. One regulator, one view, one set of rules.", color: SG.red },
                { principle: "GL1 interoperability", desc: "Built to the GL1 standard from day one. Any GL1-compliant network globally can connect to UNITS|SG for cross-border settlement and collateral mobilisation.", color: SG.finternetCyan },
                { principle: "Distributed tokenisation", desc: "Six MAS-licensed platforms (DDEx, BondBloX, ADDX, InvestaX, Marketnode, StraitsX) each specialise in different asset classes while sharing one protocol.", color: SG.finternetAmber },
                { principle: "Composability by default", desc: "Every toket shares the same tokenClass standard. Equities, bonds, gold, VCC interests, and stablecoins can be combined into P-Tokets or used as cross-asset collateral.", color: SG.nusOrange },
                { principle: "Compliance is structural", desc: "UILP gates enforce transfer restrictions, investor eligibility, and regulatory reporting on-ledger. Compliance is not a bolt-on; it is embedded in every transaction.", color: SG.red },
                { principle: "Programmable lifecycle", desc: "Token Programs automate corporate actions, coupon payments, rebalancing, and redemptions. The same execution model applies across all asset classes and platforms.", color: SG.finternetCyan },
                { principle: "Incremental adoption", desc: "Participants can join incrementally. Phase 1 connects depositories. Phase 2 adds banks. Phase 3 integrates tokenisation platforms. No big-bang migration required.", color: SG.masTeal },
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-xl" style={{ background: `${item.color}04`, border: `1px solid ${item.color}10` }}>
                  <div className="text-sm font-semibold text-white/90 mb-1">{item.principle}</div>
                  <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </RevealSection>

        {/* What UNITS Enables */}
        <RevealSection id="what-units-enables" delay={100}>
          <section>
            <h2 className="text-2xl font-light mb-6">What UNITS <span className="font-semibold">enables</span></h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
              The UNITS protocol brings seven transformative capabilities to Singapore's market infrastructure.
              Each capability is structurally impossible with the current fragmented architecture.
            </p>

            <div className="space-y-3">
              {[
                {
                  icon: Zap,
                  title: "Atomic DvP Settlement",
                  desc: "Securities and cash settle simultaneously or not at all. No more settlement risk, no more failed trades, no more T+2 waiting periods. DBS delivers equities via DDEx, OCBC pays in XSGD via StraitsX, both legs complete in one atomic transaction.",
                  color: SG.masTeal,
                },
                {
                  icon: ArrowRightLeft,
                  title: "Cross-Depository Collateral",
                  desc: "Use SGS bonds (MEPS+) as collateral for equity margin calls (CDP) in a single atomic operation. Today this requires manual processes across two separate systems with overnight reconciliation.",
                  color: SG.nusOrange,
                },
                {
                  icon: Globe,
                  title: "Cross-Platform Interoperability",
                  desc: "A BondBloX digital bond can be used as collateral on ADDX. An InvestaX-tokenised fund can settle against XSGD on DDEx. All platforms share the same token standard, identity layer, and compliance gates through UNITS.",
                  color: SG.finternetAmber,
                },
                {
                  icon: Layers,
                  title: "Proxy Tokenisation",
                  desc: "Existing CDP and MEPS+ assets are proxy-tokenised without changing legal ownership. The depositories remain the legal record-keepers. UNITS creates a programmable overlay that enables new capabilities without disrupting existing infrastructure.",
                  color: SG.finternetCyan,
                },
                {
                  icon: Shield,
                  title: "Unified Compliance Layer",
                  desc: "UILP enforces compliance rules across all asset types, platforms, and participants. Transfer restrictions, investor eligibility, and regulatory reporting happen on-ledger, not in separate post-trade systems across six different platforms.",
                  color: SG.red,
                },
                {
                  icon: Eye,
                  title: "MAS Observer Node",
                  desc: "MAS gets real-time supervisory access to all network activity, across both depositories and all six tokenisation platforms, without operational control. One observer node replaces quarterly reporting from multiple sources.",
                  color: SG.finternetAmber,
                },
                {
                  icon: Lock,
                  title: "Token Programs",
                  desc: "Automated lifecycle management: coupon payments, corporate actions, redemptions, and transfer restrictions execute as programmable rules on-ledger. Consistent across DDEx security tokens, BondBloX digital bonds, ADDX private market tokens, and InvestaX RWA tokens.",
                  color: SG.finternetCyan,
                },
              ].map((cap, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-xl" style={{ background: `${cap.color}04`, border: `1px solid ${cap.color}10` }}>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${cap.color}12` }}>
                    <cap.icon className="w-5 h-5" style={{ color: cap.color }} />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white/90 mb-1">{cap.title}</div>
                    <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{cap.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </RevealSection>

        {/* Protocol Stack */}
        <RevealSection id="protocol-stack" delay={100}>
          <section>
            <h2 className="text-2xl font-light mb-6">Protocol <span className="font-semibold">stack</span></h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
              The UNITS protocol is a universal three-layer stack. The protocol is the same
              everywhere. The infrastructure adapts to each market's depositories, regulators, and participants.
            </p>

            <div className="space-y-3">
              {[
                {
                  layer: "Layer 3: Participant Applications",
                  items: ["DDEx trading", "BondBloX bonds", "ADDX private markets", "InvestaX RWA", "Marketnode issuance", "StraitsX payments", "DBS portal", "OCBC wealth", "UOB trade finance", "HSBC securities services", "J.P. Morgan Onyx", "StanChart custody", "MUFG Japan corridor"],
                  color: SG.finternetCyan,
                  desc: "Platform-specific applications built on the UNITS protocol. Each participant brings their own interface and specialisation while sharing the common infrastructure. Thirteen applications, one protocol.",
                },
                {
                  layer: "Layer 2: UNITS Protocol",
                  items: ["tokenClasses", "tokenPools", "UILP gates", "wallet registry", "Token Programs", "cross-ledger gateway"],
                  color: SG.nusOrange,
                  desc: "The universal protocol layer. Defines how assets are represented (tokenClasses), how compliance is enforced (UILP gates), and how settlement occurs (atomic DvP). The same protocol connects DDEx security tokens, BondBloX digital bonds, and ADDX private market tokens seamlessly.",
                },
                {
                  layer: "Layer 1: GL1-Compliant Infrastructure",
                  items: ["DLT consensus", "Identity management", "Key management", "Network governance", "Regulatory interface", "Standards compliance"],
                  color: SG.masTeal,
                  desc: "GL1-compliant shared ledger infrastructure. Multi-network compatible. Built to the GL1 standard initiated by MAS, BIS, and seven central banks. Ensures UNITS|SG can interoperate with any GL1-compliant network globally.",
                },
              ].map((layer, i) => (
                <div key={i} className="rounded-xl overflow-hidden" style={{ border: `1px solid ${layer.color}15` }}>
                  <div className="px-5 py-3" style={{ background: `${layer.color}10` }}>
                    <div className="text-sm font-semibold text-white/90">{layer.layer}</div>
                  </div>
                  <div className="p-5" style={{ background: `${layer.color}04` }}>
                    <p className="text-xs leading-relaxed mb-3" style={{ color: "rgba(255,255,255,0.5)" }}>{layer.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {layer.items.map((item, j) => (
                        <span key={j} className="text-[10px] px-2.5 py-1 rounded-full" style={{ background: `${layer.color}10`, color: `${layer.color}90` }}>
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </RevealSection>

        {/* UNITS Knowledge Base */}
        <RevealSection id="knowledge-base" delay={100}>
          <section>
            <div className="flex items-center gap-3 mb-6">
              <img src={SG_LOGO} alt="UNITS|SG" className="h-6" />
              <h2 className="text-xl font-light">UNITS <span className="font-semibold">Knowledge Base</span></h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { label: "Token Programs", href: "/sg/deep-dive/token-programs", desc: "Lifecycle automation and programmable rules" },
                { label: "P-Tokets (Portfolios)", href: "/sg/deep-dive/p-tokets", desc: "Composable portfolio tokets" },
                { label: "DvP Settlement", href: "/sg/deep-dive/dvp-settlement", desc: "Atomic settlement mechanics and models" },
                { label: "Tokenisation Framework", href: "/sg/deep-dive/tokenisation", desc: "How assets become tokets" },
                { label: "Collateral Highway", href: "/sg/deep-dive/collateral-highway", desc: "Cross-CSD collateral mobilisation" },
                { label: "Precious Metals", href: "/sg/deep-dive/precious-metals", desc: "Gold and precious metals tokenisation" },
                { label: "VCC Fund Interests", href: "/sg/deep-dive/vcc", desc: "Variable Capital Company tokenisation" },
                { label: "Asset Classes", href: "/sg/assets", desc: "Nine asset classes on UNITS|SG" },
              ].map((link, i) => (
                <Link key={i} href={link.href} className="flex items-start gap-3 p-3 rounded-lg transition-all hover:bg-white/[0.03]" style={{ border: `1px solid ${SG.border}` }}>
                  <BookOpen className="w-4 h-4 shrink-0 mt-0.5" style={{ color: `${SG.masTeal}60` }} />
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
