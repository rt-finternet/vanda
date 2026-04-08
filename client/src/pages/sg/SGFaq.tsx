import { useState, useEffect } from "react";
import { Link } from "wouter";
import SGPortalNav, { SG } from "@/components/SGPortalNav";
import { CinematicBackground } from "@/components/motion";
import {
  ArrowLeft, ChevronDown, ChevronRight, Search,
  Coins, Globe, Shield, Layers, Building2, Briefcase,
  ArrowRightLeft, Gem, Scale, Wallet, FileText
} from "lucide-react";

const SG_LOGO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663328851912/82pWKmUqBRkgn8Ladat8sj/units-sg-orchid-logo-light-KqELedrzeYmCnakJE4pQSh.png";
const FINTERNET_LOGO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663328851912/82pWKmUqBRkgn8Ladat8sj/yP0fvxrB3mwq_e7583308.png";

/* ─── FAQ Categories ─── */
interface FaqItem {
  id: string;
  question: string;
  answer: string[];
  relatedPage?: { href: string; label: string };
  tags: string[];
}

interface FaqCategory {
  id: string;
  title: string;
  icon: React.ElementType;
  color: string;
  items: FaqItem[];
}

const FAQ_DATA: FaqCategory[] = [
  {
    id: "price-mechanism",
    title: "Price Alignment & Market Mechanics",
    icon: Coins,
    color: SG.finternetAmber,
    items: [
      {
        id: "cdp-price-divergence",
        question: "How is price divergence between tokenised securities on VANDA and their SGX-listed underlying minimised?",
        answer: [
          "The mechanism is identical to ETF creation/redemption arbitrage, which has kept ETF prices aligned with NAV across trillions of dollars for over three decades.",
          "Designated Market Makers (DMMs) with dual-venue access maintain continuous quotes on both SGX and VANDA. They arbitrage any divergence by buying the cheaper venue and selling the dearer one, with the CDP Bridge (lock/mint/burn/unlock) providing the creation/redemption rail.",
          "Real-time bridge execution compresses the arbitrage window dramatically. Unlike traditional ETF creation (T+1 or T+2), the CDP Bridge executes in minutes.",
          "During SGX trading hours (9:00-17:00 SGT), VANDA tokets reference the SGX last-traded price and VWAP as the canonical price source. Outside SGX hours, the toket trades freely with the reference price marked as 'indicative' — similar to how ADRs trade in New York.",
          "Circuit breakers trigger if the toket price diverges from the SGX reference by more than a configurable threshold (e.g., 5%), analogous to SGX's own dynamic circuit breakers.",
          "After-hours price discovery is a feature, not a bug. The 24/7 trading window captures price-moving events outside SGX hours. When SGX opens, the convergence trade naturally closes the gap."
        ],
        relatedPage: { href: "/sg/workflows/cdp-bridge", label: "CDP Bridge Workflow" },
        tags: ["CDP Bridge", "Price Discovery", "Market Making", "Arbitrage"],
      },
      {
        id: "gold-price-alignment",
        question: "How is alignment maintained between gold toket trading prices and international physical gold prices?",
        answer: [
          "Three alignment mechanisms keep the DBS Gold Toket price closely aligned with spot gold — typically within 0.1-0.3% of the LBMA Gold Price, consistent with empirical data from PAXG and XAUT (together representing over $5.1 billion in tokenised gold).",
          "LBMA Gold Price as the canonical reference: The LBMA Gold Price (set twice daily at 10:30 and 15:00 London time via ICE Benchmark Administration's electronic auction) serves as the NAV anchor. This is the same benchmark used by SPDR Gold Shares (GLD), the world's largest gold ETF at ~$75 billion AUM.",
          "Continuous arbitrage by the issuer and market makers: DBS, as the token issuer and custodian, has a natural arbitrage function. If the toket trades above gold spot, DBS mints new tokets (purchasing additional gold). If below, DBS buys tokets and redeems the underlying gold.",
          "Cross-venue arbitrage: Sophisticated traders arbitrage the DBS Gold Toket against COMEX (New York), Shanghai Gold Exchange, LBMA (London), and Tokyo Commodity Exchange. VANDA's 24/7 nature provides a continuous price signal when some physical markets are closed."
        ],
        relatedPage: { href: "/sg/workflows/gold-tokenisation", label: "Gold Tokenisation Workflow" },
        tags: ["Gold", "LBMA", "Price Alignment", "DBS"],
      },
      {
        id: "vcc-nav-premium",
        question: "Why does the VCC workflow show different premium-to-NAV values in the Execution Log (2.5%) and System State (1.5%)?",
        answer: [
          "The two numbers represent different moments in time, demonstrating real price discovery on VANDA's secondary market.",
          "Execution Log (2.5%): This is the premium at the moment the secondary trade was executed. The buyer agreed to pay 2.5% above the last published NAV. This is a historical record capturing the market clearing price at execution time (e.g., at 10:14 SGT).",
          "System State (1.5%): This is the current premium at the time the user is viewing the dashboard (e.g., at 14:30 SGT). After the trade executed at 2.5%, subsequent market activity moved the premium down to 1.5%.",
          "The compression from 2.5% to 1.5% suggests the trade attracted additional sellers or the NAV was updated upward — healthy market behaviour, exactly as closed-end fund premiums/discounts fluctuate on public exchanges."
        ],
        relatedPage: { href: "/sg/workflows/vcc-tokenisation", label: "VCC Tokenisation Workflow" },
        tags: ["VCC", "NAV", "Secondary Market", "Premium"],
      },
    ],
  },
  {
    id: "fx-settlement",
    title: "FX Conversion & Cross-Border Settlement",
    icon: Globe,
    color: "#3b82f6",
    items: [
      {
        id: "fx-three-layer",
        question: "How does VANDA handle FX conversion for cross-border transactions?",
        answer: [
          "VANDA supports a three-layer FX model, each optimised for different trade sizes and institutional requirements:",
          "Layer 1 — Stablecoin-to-Stablecoin (instant, on-network): XSGD ↔ EUR stablecoin atomic swap on VANDA. A liquidity provider (e.g., DBS FX desk) maintains pools in both currencies. All legs (FX + DvP) settle in one atomic transaction. Best for flows under EUR 5M. Cost: 2-5 bps.",
          "Layer 2 — CLS PvP (institutional, off-network with on-network confirmation): For larger flows, the FX leg routes through CLS (Continuous Linked Settlement), which settles ~$6.5 trillion in FX daily across 18 currencies including SGD. Both currency legs settle simultaneously (PvP), eliminating Herstatt risk entirely. Best for flows EUR 5M+. Cost: 1-3 bps.",
          "Layer 3 — Bank Treasury (simplest, most common): DBS converts SGD to EUR internally using its own FX book. The client sees a single all-in price in SGD. This is how cross-border custody works today — VANDA makes the settlement leg faster. Cost: 3-8 bps."
        ],
        relatedPage: { href: "/sg/workflows/institutional-fx", label: "Institutional FX Workflow" },
        tags: ["FX", "CLS", "Stablecoin", "Cross-Border"],
      },
      {
        id: "german-bund-support",
        question: "How does the DBS UNITS wallet support holdings such as German Bunds?",
        answer: [
          "Through the Unsponsored Toket model — the cross-border equivalent of the CDP Bridge, bridging from an international CSD (Euroclear) instead of a domestic CSD.",
          "DBS, as a direct participant in Euroclear, locks Bunds in a segregated Euroclear account earmarked for VANDA. A corresponding Unsponsored Toket is minted on VANDA representing the full economic interest: coupon payments, principal repayment, and market value.",
          "The toket carries full metadata: ISIN, coupon rate, maturity date, Euroclear safekeeping location, and bridge operator identity (DBS).",
          "When the Bund pays a coupon, Euroclear credits DBS's account. The Token Program automatically distributes the coupon pro-rata to all toket holders in SGD (converted at prevailing EUR/SGD rate).",
          "Key insight: DBS does not need new infrastructure. It already holds Bunds through its Global Transaction Services division. VANDA provides a programmable, 24/7, tokenised representation of that existing custody relationship. The UNITS wallet is a view into DBS's existing global custody network, enhanced with programmability."
        ],
        relatedPage: { href: "/sg/workflows/cross-border", label: "Cross-Border Settlement Workflow" },
        tags: ["German Bund", "Euroclear", "Unsponsored Toket", "DBS"],
      },
    ],
  },
  {
    id: "gold-operations",
    title: "Gold Tokenisation Operations",
    icon: Gem,
    color: SG.finternetCyan,
    items: [
      {
        id: "gold-physical-redemption",
        question: "For physical gold redemption, would this be handled by DBS directly or by end investors?",
        answer: [
          "The operational model follows the GLD/institutional gold ETF precedent: a two-tier redemption structure.",
          "Tier 1 — Institutional / Authorised Participant Redemption (in-kind): APs (DBS itself, plus 1-2 appointed bullion dealers) can redeem large blocks of Gold Tokets (minimum 100 troy ounces) for physical gold. Tokets are burned on VANDA, DBS instructs its LBMA-accredited vault to release corresponding gold bars. Settlement: T+2 for physical delivery (standard LBMA).",
          "Tier 2 — Retail / End-Investor Redemption (cash settlement): End investors redeem for cash (SGD or XSGD), not physical gold. The Gold Toket is sold at prevailing market price or redeemed at NAV minus a small redemption fee (e.g., 0.25%). Cash proceeds are credited to the investor's VANDA wallet.",
          "Why not direct physical redemption for retail? LBMA Good Delivery bars weigh 400 troy ounces (~12.4 kg, worth ~$1.2 million). Even kilobars (1 kg, ~$96,000) are impractical for most retail investors. This is why GLD restricts physical redemption to APs dealing in baskets of 100,000 shares (~$23 million).",
          "Possible middle ground: DBS could offer a 'small bar' redemption program for 100g or 1oz bars, fulfilled through DBS's existing precious metals desk — a value-added service, not a protocol-level feature."
        ],
        relatedPage: { href: "/sg/workflows/gold-tokenisation", label: "Gold Tokenisation Workflow" },
        tags: ["Gold", "Physical Redemption", "DBS", "LBMA"],
      },
      {
        id: "gold-management-fees",
        question: "How are management fees charged for tokenised gold — via cash or by selling underlying gold?",
        answer: [
          "The industry standard is gold-in-kind fee deduction, and VANDA follows this model.",
          "SPDR Gold Trust (GLD) charges a 0.40% annual expense ratio. The fee is not invoiced in cash. Instead, the Trust's custodian periodically sells a small quantity of gold to cover expenses. The gold backing per share decreases very slightly over time — from 0.1000 oz at inception to approximately 0.0920 oz today.",
          "On VANDA, the Token Program automates this: (1) Calculate daily accrued fee (0.40% / 365 ≈ 0.00011% per day), (2) At a configurable interval, execute a 'fee sweep' reducing gold backing per toket, (3) Credit the fee to DBS's fee account as gold tokets.",
          "No cash changes hands. No XSGD is needed. The fee is invisible to the investor except through gradual NAV drift. This is a perfect use case for Token Programs — the pre-hook validates the fee calculation, the state mutation adjusts the backing ratio, and the post-hook emits a fee event for audit.",
          "Alternative for premium products: For actively managed gold strategies, the management fee could be charged in XSGD via a separate Token Program that debits the investor's XSGD balance."
        ],
        relatedPage: { href: "/sg/workflows/gold-tokenisation", label: "Gold Tokenisation Workflow" },
        tags: ["Gold", "Management Fees", "Token Programs", "GLD"],
      },
    ],
  },
  {
    id: "xsgd-integration",
    title: "XSGD & Stablecoin Integration",
    icon: Wallet,
    color: "#8b5cf6",
    items: [
      {
        id: "xsgd-public-chain",
        question: "XSGD operates on public blockchains (Ethereum, Polygon, Solana). How is it integrated into VANDA/UNITS?",
        answer: [
          "VANDA supports three integration models for XSGD, and the architecture is designed to accommodate all three:",
          "Model 1 — Bridge Model (Wrapped XSGD): StraitsX locks XSGD on the public chain in a smart contract and mints 'XSGD-V' tokets on VANDA. Same proxy tokenisation pattern as the CDP Bridge. Pros: Leverages existing XSGD liquidity (~$30M+ in circulation), MAS Major Payment Institution licence. Cons: Bridge risk, cross-chain latency.",
          "Model 2 — Native Issuance on UNITS (Recommended Primary Path): StraitsX issues XSGD natively on the UNITS protocol as a token pool, backed by the same SGD reserves at DBS and Standard Chartered. First-class citizen, not a wrapped derivative. Pros: No bridge risk, atomic settlement, Token Program integration. Cons: Requires StraitsX UNITS integration.",
          "Model 3 — MAS Wholesale CBDC (Long-term Aspiration): If MAS issues SGD-W on a permissioned network, VANDA integrates it directly. Pros: Eliminates credit risk entirely (central bank money), regulatory gold standard. Cons: Timeline uncertain.",
          "Important: VANDA is currency-agnostic at the protocol level. Whether the settlement currency is XSGD, USDC, a bank deposit token, or a wholesale CBDC, the settlement mechanics are identical. VANDA does not depend on any single stablecoin issuer."
        ],
        relatedPage: { href: "/sg/deep-dive/cross-ledger", label: "Cross-Ledger Connectivity" },
        tags: ["XSGD", "StraitsX", "Stablecoin", "CBDC"],
      },
    ],
  },
  {
    id: "architecture",
    title: "Architecture & Protocol",
    icon: Layers,
    color: "#10b981",
    items: [
      {
        id: "vcc-programs-vs-subfunds",
        question: "What is the difference between the 5 active programs and 3 sub-funds shown in the VCC workflow?",
        answer: [
          "Programs and sub-funds are different concepts in the UNITS architecture. Programs are executable logic (verbs). Sub-funds are token pools (nouns).",
          "The 5 programs: (1) NAV Calculation Program — computes daily NAV per share class, (2) Subscription/Redemption Program — handles investor flows with minimums, lock-ups, and gates, (3) Distribution Program — calculates and distributes dividends per class, (4) Compliance/UILP Program — enforces investor eligibility and AML/KYC, (5) Fee Program — calculates management and performance fees.",
          "The 3 sub-funds: Class A (accumulating, lower fees), Class B (distributing, standard fees), Class S (distributing with performance fee, institutional).",
          "All 5 programs operate across all 3 sub-funds. Each program reads the sub-fund's configuration to determine class-specific behaviour (e.g., the Distribution Program checks whether a class is accumulating or distributing)."
        ],
        relatedPage: { href: "/sg/workflows/vcc-tokenisation", label: "VCC Tokenisation Workflow" },
        tags: ["VCC", "Token Programs", "Sub-funds", "Architecture"],
      },
      {
        id: "network-not-depository",
        question: "Is VANDA a depository or a network?",
        answer: [
          "VANDA is a network, not a depository. This is a fundamental architectural distinction.",
          "A depository (like CDP or Euroclear) is a centralised entity that holds securities on behalf of participants. It owns the ledger, sets the rules, and charges fees for access. Participants are tenants.",
          "VANDA is a network of interconnected nodes where participants bring their own wallets, APIs, and compliance frameworks. Each participant operates their own infrastructure and connects to the network through standard interfaces. Value accrues to all participants, not to a central operator.",
          "Participants bring their own: wallets (DBS Wallet, SGX Wallet, investor wallets), compliance engines (each node runs its own KYC/AML), and applications (trading interfaces, portfolio management, reporting). They compose new products without waiting for the network operator to build features.",
          "The network currently comprises 15 nodes across 5 tiers: Anchor Nodes (MAS, SGX/CDP), Infrastructure Nodes (DBS, NUS AIDF), Recognised Market Operators, Specialist Nodes (StraitsX, Marketnode), and Service Nodes (custodians, fund administrators)."
        ],
        relatedPage: { href: "/sg/deep-dive/participants", label: "Ecosystem Participants" },
        tags: ["Architecture", "Network", "Participants", "BYOI"],
      },
    ],
  },
];

/* ─── Main Component ─── */
export default function SGFaq() {
  const [revealed, setRevealed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(FAQ_DATA.map(c => c.id))
  );

  useEffect(() => { setRevealed(true); }, []);

  const toggleItem = (id: string) => {
    setExpandedItems(prev => {
      const next = new Set(Array.from(prev));
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const toggleCategory = (id: string) => {
    setExpandedCategories(prev => {
      const next = new Set(Array.from(prev));
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  /* Filter by search */
  const filteredData = FAQ_DATA.map(cat => ({
    ...cat,
    items: cat.items.filter(item => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        item.question.toLowerCase().includes(q) ||
        item.answer.some(a => a.toLowerCase().includes(q)) ||
        item.tags.some(t => t.toLowerCase().includes(q))
      );
    }),
  })).filter(cat => cat.items.length > 0);

  const totalQuestions = FAQ_DATA.reduce((sum, cat) => sum + cat.items.length, 0);
  const filteredQuestions = filteredData.reduce((sum, cat) => sum + cat.items.length, 0);

  return (
    <>
      <SGPortalNav />
      <div className="vanda-portal min-h-screen" style={{ background: SG.dark, color: "rgba(255,255,255,0.85)" }}>
        <CinematicBackground />
        <div className="max-w-4xl mx-auto px-6 py-16">
          {/* Header */}
          <div className={`mb-10 transition-all duration-700 ${revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <Link href="/sg" className="inline-flex items-center gap-2 text-sm mb-6 transition-colors" style={{ color: "rgba(255,255,255,0.4)" }}>
              <ArrowLeft className="w-4 h-4" /> Back to Executive Summary
            </Link>
            <div className="flex items-center gap-4 mb-3">
              <FileText className="w-7 h-7" style={{ color: SG.finternetAmber }} />
              <span className="text-xs font-mono tracking-wider" style={{ color: `${SG.finternetAmber}99` }}>TECHNICAL APPENDIX</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">FAQ & Technical Reference</h1>
            <p className="text-sm max-w-2xl" style={{ color: "rgba(255,255,255,0.5)" }}>
              Detailed answers to stakeholder questions on price mechanics, FX settlement, gold operations,
              stablecoin integration, and protocol architecture. {totalQuestions} questions across {FAQ_DATA.length} categories.
            </p>
          </div>

          {/* Search */}
          <div className={`mb-8 transition-all duration-700 delay-100 ${revealed ? "opacity-100" : "opacity-0"}`}>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "rgba(255,255,255,0.3)" }} />
              <input
                type="text"
                placeholder="Search questions, topics, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl text-sm bg-transparent outline-none"
                style={{
                  background: SG.card,
                  border: `1px solid ${SG.border}`,
                  color: "rgba(255,255,255,0.8)",
                }}
              />
              {searchQuery && (
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
                  {filteredQuestions} of {totalQuestions} questions
                </span>
              )}
            </div>
          </div>

          {/* FAQ Categories */}
          <div className={`space-y-6 transition-all duration-700 delay-200 ${revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            {filteredData.map((cat) => {
              const CatIcon = cat.icon;
              const isExpanded = expandedCategories.has(cat.id);
              return (
                <div key={cat.id} className="rounded-xl overflow-hidden" style={{ background: SG.card, border: `1px solid ${SG.border}` }}>
                  {/* Category Header */}
                  <button
                    onClick={() => toggleCategory(cat.id)}
                    className="w-full flex items-center gap-3 px-6 py-4 text-left transition-colors"
                    style={{ borderBottom: isExpanded ? `1px solid ${SG.border}` : "none" }}
                  >
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${cat.color}15`, border: `1px solid ${cat.color}30` }}>
                      <CatIcon className="w-4 h-4" style={{ color: cat.color }} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-white">{cat.title}</h3>
                      <span className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>{cat.items.length} question{cat.items.length > 1 ? "s" : ""}</span>
                    </div>
                    {isExpanded
                      ? <ChevronDown className="w-4 h-4" style={{ color: "rgba(255,255,255,0.3)" }} />
                      : <ChevronRight className="w-4 h-4" style={{ color: "rgba(255,255,255,0.3)" }} />
                    }
                  </button>

                  {/* Questions */}
                  {isExpanded && (
                    <div className="divide-y" style={{ borderColor: SG.border }}>
                      {cat.items.map((item) => {
                        const isOpen = expandedItems.has(item.id);
                        return (
                          <div key={item.id}>
                            <button
                              onClick={() => toggleItem(item.id)}
                              className="w-full flex items-start gap-3 px-6 py-4 text-left transition-colors hover:bg-white/[0.02]"
                            >
                              {isOpen
                                ? <ChevronDown className="w-4 h-4 mt-0.5 shrink-0" style={{ color: cat.color }} />
                                : <ChevronRight className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "rgba(255,255,255,0.3)" }} />
                              }
                              <span className="text-sm font-medium" style={{ color: isOpen ? "white" : "rgba(255,255,255,0.7)" }}>
                                {item.question}
                              </span>
                            </button>
                            {isOpen && (
                              <div className="px-6 pb-5 pl-13">
                                <div className="space-y-3 ml-7">
                                  {item.answer.map((para, i) => (
                                    <p key={i} className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                                      {para}
                                    </p>
                                  ))}
                                  {/* Tags */}
                                  <div className="flex flex-wrap gap-1.5 pt-2">
                                    {item.tags.map(tag => (
                                      <span key={tag} className="px-2 py-0.5 rounded-full text-[10px]" style={{ background: `${cat.color}10`, color: `${cat.color}aa`, border: `1px solid ${cat.color}20` }}>
                                        {tag}
                                      </span>
                                    ))}
                                  </div>
                                  {/* Related Page Link */}
                                  {item.relatedPage && (
                                    <Link href={item.relatedPage.href} className="inline-flex items-center gap-1.5 text-xs mt-2 transition-colors" style={{ color: cat.color }}>
                                      <ArrowRightLeft className="w-3 h-3" />
                                      See: {item.relatedPage.label}
                                    </Link>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* No Results */}
          {filteredData.length === 0 && (
            <div className="text-center py-16">
              <Search className="w-8 h-8 mx-auto mb-3" style={{ color: "rgba(255,255,255,0.15)" }} />
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>No questions match "{searchQuery}"</p>
            </div>
          )}

          {/* Sources */}
          <div className={`mt-16 rounded-xl p-6 transition-all duration-700 delay-300 ${revealed ? "opacity-100" : "opacity-0"}`} style={{ background: SG.card, border: `1px solid ${SG.border}` }}>
            <h3 className="text-sm font-mono uppercase tracking-wider mb-4" style={{ color: "rgba(255,255,255,0.35)" }}>Sources & References</h3>
            <div className="space-y-2 text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
              <p>[1] Vettafi, "A Closer Look at Authorized Participants in the ETF Ecosystem," January 2026.</p>
              <p>[2] Ashfaq et al., "Tokenized Gold in Crypto Markets: Tracking Accuracy," MDPI, 2026.</p>
              <p>[3] SPDR Gold Trust Prospectus, State Street Global Advisors, 2025.</p>
              <p>[4] CLS Group, "CLSSettlement — Settle FX Trades & Manage FX Risk," 2025.</p>
              <p>[5] MAS, "Project Guardian — Industry Pilots," 2024-2026.</p>
            </div>
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
    </>
  );
}
