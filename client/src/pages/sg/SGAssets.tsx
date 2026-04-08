import { useRef, useState, useEffect } from "react";
import { Link } from "wouter";
import SGPortalNav, { SG } from "@/components/SGPortalNav";
import { CrossPersonaCallout } from "@/components/IPEComponents";
import { CinematicBackground } from "@/components/motion";
import {
  ArrowRight, ArrowRightLeft, Landmark, Gem, Scale,
  Layers, Shield, Globe, Network, Link2, Wallet,
  TrendingUp, BarChart3, Building2, Users, Zap
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

interface AssetClassProps {
  icon: React.ReactNode;
  name: string;
  accent: string;
  description: string;
  details: string[];
  stats?: { label: string; value: string }[];
  deepDiveHref?: string;
}

function AssetClassCard({ icon, name, accent, description, details, stats, deepDiveHref }: AssetClassProps) {
  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: SG.card, border: `1px solid ${SG.border}` }}>
      <div className="px-6 py-4 flex items-center gap-3" style={{ background: `${accent}08`, borderBottom: `1px solid ${SG.border}` }}>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${accent}15` }}>
          <span style={{ color: accent }}>{icon}</span>
        </div>
        <h3 className="text-lg font-semibold text-white/90">{name}</h3>
      </div>
      <div className="p-6">
        <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.6)" }}>{description}</p>
        <ul className="space-y-2 mb-4">
          {details.map((d, i) => (
            <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
              <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: `${accent}60` }} />
              <span>{d}</span>
            </li>
          ))}
        </ul>
        {stats && (
          <div className="grid grid-cols-3 gap-2">
            {stats.map((s, i) => (
              <div key={i} className="text-center p-2 rounded-lg" style={{ background: `${accent}08` }}>
                <div className="text-sm font-bold" style={{ color: accent }}>{s.value}</div>
                <div className="text-[10px]" style={{ color: "rgba(255,255,255,0.35)" }}>{s.label}</div>
              </div>
            ))}
          </div>
        )}
        {deepDiveHref && (
          <Link href={deepDiveHref} className="inline-flex items-center gap-2 mt-4 text-sm font-medium transition-colors hover:opacity-80" style={{ color: accent }}>
            Deep Dive <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>
    </div>
  );
}

export default function SGAssets() {
  return (
    <div className="min-h-screen text-white" style={{ background: SG.dark }}>
      <SGPortalNav />

      {/* Hero */}
      <section className="relative px-6 pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${SG.dark}, #0D1F3A 50%, #122B4A)` }} />
        <CinematicBackground variant="mixed" intensity={0.06} />
        <div className="relative max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <Gem className="w-5 h-5" style={{ color: SG.finternetAmber }} />
            <span className="text-xs font-medium tracking-[0.2em] uppercase" style={{ color: SG.finternetAmber }}>Asset Classes</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-light mb-4">
            <span className="font-semibold">Nine</span> Asset Classes, One Network
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
            Every asset class is represented as a tokenClass with standardised lifecycle management.
            From equities and government securities to gold, stablecoins, and programmable portfolio tokets.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-6 pb-24 space-y-8">

        {/* Asset Class Grid */}
        <RevealSection id="equities">
          <AssetClassCard
            icon={<ArrowRightLeft className="w-4 h-4" />}
            name="1. Equities & REITs"
            accent={SG.red}
            description="SGX-listed equities, REITs, and ETFs tokenised as tokets on the UNITS Network. CDP continues to hold the underlying securities while the network provides 24/7 settlement, fractional ownership, and composability with other asset classes."
            details={[
              "Underlying held in CDP, toket represents beneficial ownership",
              "24/7 DVP settlement against SCS stablecoins",
              "Fractional ownership enables micro-investment portfolios",
              "Corporate actions (dividends, rights issues) processed via smart contracts",
              "Can be included in P-tokets alongside bonds, gold, and other assets",
            ]}
            stats={[
              { label: "SGX Listed", value: "700+" },
              { label: "REITs", value: "40+" },
              { label: "Settlement", value: "T+0" },
            ]}
          />
        </RevealSection>

        <RevealSection id="govt-securities" delay={50}>
          <AssetClassCard
            icon={<Landmark className="w-4 h-4" />}
            name="2. Government Securities"
            accent={SG.masTeal}
            description="SGS bonds, T-bills, and MAS Bills tokenised from MEPS+ holdings. For the first time, government securities can be used as collateral for equity positions and included in unified portfolios alongside CDP assets."
            details={[
              "Underlying held in MEPS+, toket on UNITS Network",
              "Cross-system collateral: SGS bonds can back equity margin positions",
              "Repo against government securities with automated lifecycle",
              "Real-time yield calculation and coupon distribution via smart contracts",
              "MAS observer node has full visibility into tokenised government securities",
            ]}
            stats={[
              { label: "Outstanding SGS", value: "SGD 230B+" },
              { label: "T-Bill Auctions", value: "Weekly" },
              { label: "Collateral Use", value: "Cross-system" },
            ]}
          />
        </RevealSection>

        <RevealSection id="gold" delay={50}>
          <AssetClassCard
            icon={<Gem className="w-4 h-4" />}
            name="3. Gold & Precious Metals"
            accent={SG.finternetAmber}
            description="LBMA and SBMA Good Delivery gold, silver, and platinum tokenised with per-vault tokenPools. Singapore is Asia's premier gold hub with FTZ vaults, IPM GST exemption, and SBMA kilobar standards. Tokenisation enables fractional ownership from 1 gram, 24/7 trading, and use as repo collateral."
            deepDiveHref="/sg/deep-dive/precious-metals"
            details={[
              "Per-vault tokenPools backed by physical bars in Brink's Singapore, Malca-Amit Changi, Le Freeport vaults",
              "Dual standard: LBMA 400oz bars + SBMA 1kg kilobars (99.99% fineness)",
              "Fractional ownership from 1 gram with IPM GST exemption",
              "24/7 atomic settlement against XSGD stablecoins",
              "Gold tokets as SGX-DC margin collateral with real-time LBMA/SBMA price feeds",
            ]}
            stats={[
              { label: "Min. Fraction", value: "1 gram" },
              { label: "Trading", value: "24/7" },
              { label: "Repo Eligible", value: "Yes" },
            ]}
          />
        </RevealSection>

        <RevealSection id="stablecoins" delay={50}>
          <AssetClassCard
            icon={<Scale className="w-4 h-4" />}
            name="4. SCS Stablecoins"
            accent={SG.nusOrange}
            description="MAS's Stablecoin Regulatory Framework (SCS) provides the foundation for regulated SGD stablecoins as the settlement currency for the UNITS Network. This is not a crypto experiment; it is regulated digital money."
            details={[
              "Regulated under MAS Stablecoin Framework (SCS)",
              "1:1 backed by SGD reserves held in MAS-regulated banks",
              "Primary settlement currency for all DVP transactions on the network",
              "Enables 24/7 settlement without dependency on RTGS operating hours",
              "Interoperable with other SCS-regulated stablecoins (USD, EUR)",
            ]}
            stats={[
              { label: "Backing", value: "1:1 SGD" },
              { label: "Regulation", value: "MAS SCS" },
              { label: "Settlement", value: "Primary" },
            ]}
          />
        </RevealSection>

        <RevealSection id="structured" delay={50}>
          <AssetClassCard
            icon={<Layers className="w-4 h-4" />}
            name="5. Structured Notes & CDs"
            accent={SG.finternetCyan}
            description="Certificates of deposit, structured notes, and other bank-issued instruments tokenised with automated lifecycle management. Smart contracts handle coupon payments, barrier events, and maturity processing."
            details={[
              "Automated coupon calculation and distribution",
              "Barrier event monitoring for structured products",
              "Maturity processing and auto-redemption",
              "Secondary market trading 24/7 with DVP settlement",
              "Composable into P-tokets for diversified portfolio construction",
            ]}
            stats={[
              { label: "Lifecycle", value: "Automated" },
              { label: "Coupons", value: "Smart Contract" },
              { label: "Trading", value: "24/7" },
            ]}
          />
        </RevealSection>

        <RevealSection id="private-credit" delay={50}>
          <AssetClassCard
            icon={<Shield className="w-4 h-4" />}
            name="6. Private Credit & Loans"
            accent={SG.red}
            description="Trade finance receivables, syndicated loans, and private credit instruments tokenised for broader distribution. Singapore's position as a trade finance hub makes this particularly compelling."
            details={[
              "Trade finance receivables tokenised for secondary market liquidity",
              "Syndicated loan participations with automated interest distribution",
              "Real-time portfolio monitoring for credit risk management",
              "Fractional participation lowers minimum investment thresholds",
              "Compliance gates ensure only qualified investors access private credit",
            ]}
            stats={[
              { label: "Trade Finance", value: "SGD 500B+" },
              { label: "Distribution", value: "Fractional" },
              { label: "Compliance", value: "UILP Gated" },
            ]}
          />
        </RevealSection>

        <RevealSection id="vcc" delay={50}>
          <div className="rounded-2xl overflow-hidden" style={{ background: SG.card, border: `2px solid ${SG.masTeal}30` }}>
            <div className="px-6 py-4 flex items-center gap-3" style={{ background: `${SG.masTeal}10`, borderBottom: `1px solid ${SG.border}` }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${SG.masTeal}20` }}>
                <Globe className="w-4 h-4" style={{ color: SG.masTeal }} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white/90">7. VCC Fund Interests</h3>
                <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full" style={{ background: `${SG.masTeal}15`, color: SG.masTeal }}>Highlight</span>
              </div>
            </div>
            <div className="p-6">
              <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.6)" }}>
                Singapore has 1,300+ Variable Capital Companies (VCCs). Tokenising VCC ownership enables smart
                contract-driven NAV calculation, automated subscription/redemption, and inclusion in P-tokets
                alongside direct securities and gold. This transforms fund distribution.
              </p>

              <div className="rounded-xl p-4 mb-4" style={{ background: `${SG.masTeal}06`, border: `1px solid ${SG.masTeal}10` }}>
                <h4 className="text-sm font-semibold mb-3" style={{ color: SG.masTeal }}>VCC tokenisation benefits</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { title: "Automated NAV", desc: "Smart contracts calculate NAV from underlying asset prices, eliminating manual fund accounting" },
                    { title: "Instant Subscription", desc: "Investors subscribe by transferring SCS stablecoins; VCC tokets issued automatically" },
                    { title: "24/7 Redemption", desc: "No more monthly redemption windows. Investors can redeem at any time against live NAV" },
                    { title: "P-toket Inclusion", desc: "VCC interests composable with equities, bonds, gold in unified portfolio tokets" },
                  ].map((item, i) => (
                    <div key={i} className="p-3 rounded-lg" style={{ background: `${SG.masTeal}08` }}>
                      <div className="text-xs font-semibold text-white/80 mb-1">{item.title}</div>
                      <div className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>{item.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: "VCCs in Singapore", value: "1,300+" },
                  { label: "Fund AUM", value: "SGD 4T+" },
                  { label: "Redemption", value: "24/7" },
                ].map((s, i) => (
                  <div key={i} className="text-center p-2 rounded-lg" style={{ background: `${SG.masTeal}08` }}>
                    <div className="text-sm font-bold" style={{ color: SG.masTeal }}>{s.value}</div>
                    <div className="text-[10px]" style={{ color: "rgba(255,255,255,0.35)" }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </RevealSection>

        <RevealSection id="p-tokets" delay={50}>
          <AssetClassCard
            icon={<Network className="w-4 h-4" />}
            name="8. P-Tokets (Portfolio Tokets)"
            accent={SG.nusOrange}
            description="P-tokets are first-class tokenised assets that represent a portfolio of underlying tokets. A single P-toket can contain equities, bonds, gold, VCC interests, and stablecoins, all managed as one composable unit."
            details={[
              "First-class asset: P-tokets are themselves tokenClasses with full lifecycle management",
              "Compose any combination of the other 8 asset classes into a single toket",
              "Automated rebalancing via smart contracts based on predefined rules",
              "Fractional ownership of diversified portfolios from small minimum investments",
              "Can be traded, used as collateral, or included in other P-tokets (nesting)",
            ]}
            stats={[
              { label: "Composition", value: "Any Mix" },
              { label: "Rebalancing", value: "Automated" },
              { label: "Nesting", value: "Supported" },
            ]}
          />
        </RevealSection>

        <RevealSection id="unsponsored" delay={50}>
          <AssetClassCard
            icon={<Link2 className="w-4 h-4" />}
            name="9. Unsponsored Tokets"
            accent={SG.finternetAmber}
            description="Lock traditional securities at foreign depositories and issue programmable depositary receipts on the UNITS Network. Any global security becomes accessible in Singapore 24/7 without the original issuer's involvement."
            details={[
              "Lock underlying at foreign CSD (Euroclear, DTCC, JASDEC, etc.)",
              "1:1 backed toket issued on UNITS Network",
              "24/7 trading, DVP settlement, and collateral use",
              "Redemption burns the toket and releases the underlying",
              "No issuer involvement required (unsponsored model)",
            ]}
            stats={[
              { label: "Global Access", value: "Any Security" },
              { label: "Backing", value: "1:1" },
              { label: "Availability", value: "24/7" },
            ]}
          />
        </RevealSection>

        {/* Composability Summary */}
        <RevealSection id="composability" delay={100}>
          <section>
            <h2 className="text-2xl font-light mb-6">The power of <span className="font-semibold">composability</span></h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
              Because all nine asset classes share the same tokenClass standard, they can interact seamlessly.
              A participant can build a P-toket containing SGS bonds, DBS shares, gold tokets, a VCC fund interest,
              and US Treasury unsponsored tokets, then use that P-toket as collateral for a repo transaction.
              This level of composability is impossible in today's fragmented infrastructure.
            </p>

            <div className="rounded-xl p-5" style={{ background: `${SG.nusOrange}06`, border: `1px solid ${SG.nusOrange}12` }}>
              <h4 className="text-sm font-semibold mb-3" style={{ color: SG.nusOrange }}>Example P-toket composition</h4>
              <div className="space-y-2">
                {[
                  { asset: "SGS 10Y Bond", weight: "30%", source: "MEPS+", accent: SG.masTeal },
                  { asset: "DBS Group Holdings", weight: "20%", source: "CDP", accent: SG.red },
                  { asset: "Gold (LBMA)", weight: "15%", source: "Vault", accent: SG.finternetAmber },
                  { asset: "VCC Fund (Asia Credit)", weight: "15%", source: "VCC", accent: SG.masTeal },
                  { asset: "US Treasury 5Y (Unsponsored)", weight: "10%", source: "DTCC", accent: SG.finternetCyan },
                  { asset: "SCS SGD Stablecoin", weight: "10%", source: "SCS", accent: SG.nusOrange },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-2 rounded-lg" style={{ background: "rgba(255,255,255,0.02)" }}>
                    <div className="w-1.5 h-8 rounded-full" style={{ background: item.accent }} />
                    <div className="flex-1">
                      <div className="text-xs font-medium text-white/80">{item.asset}</div>
                      <div className="text-[10px]" style={{ color: "rgba(255,255,255,0.35)" }}>Source: {item.source}</div>
                    </div>
                    <div className="text-sm font-bold" style={{ color: item.accent }}>{item.weight}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </RevealSection>

        {/* IPE Cross-Persona Callout */}
        <CrossPersonaCallout />

        {/* UNITS Knowledge Base Links */}
        <div className="mt-16 p-6 rounded-xl" style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${SG.border}` }}>
          <p className="text-xs uppercase tracking-widest mb-4" style={{ color: "rgba(255,255,255,0.25)" }}>UNITS Knowledge Base</p>
          <div className="flex flex-wrap gap-3">
            {[
              { href: "/sg/deep-dive/precious-metals", label: "Precious Metals Deep Dive" },
              { href: "/sg/workflows/gold-tokenisation", label: "Gold Tokenisation Workflow" },
              { href: "/sg/workflows/commodities-collateral", label: "Commodities Collateral" },
              { href: "/sg/workflows/cross-border", label: "Cross-Border Settlement" },
              { href: "/sg/deep-dive/tokenisation", label: "Tokenisation" },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="px-3 py-1.5 rounded-full text-xs transition-colors" style={{ color: "rgba(255,255,255,0.35)", border: `1px solid ${SG.border}` }}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-4 pt-8" style={{ borderTop: `1px solid ${SG.border}` }}>
          <Link href="/sg/capabilities" className="flex items-center gap-2 text-sm transition-colors" style={{ color: "rgba(255,255,255,0.4)" }}>
            ← Capabilities
          </Link>
          <div className="flex-1" />
          <Link href="/sg/funding" className="flex items-center gap-2 text-sm transition-colors" style={{ color: `${SG.nusOrange}90` }}>
            Next: Funding & Participants <ArrowRight className="w-3.5 h-3.5" />
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
