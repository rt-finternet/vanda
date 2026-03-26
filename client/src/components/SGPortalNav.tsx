import { Link, useLocation } from "wouter";
import {
  Menu, X, ChevronDown, ChevronRight, Home,
  BookOpen, Layers, Network, Landmark, Gem,
  Wallet, Shield, Users, Globe, Zap, ArrowLeft,
  MessageCircle, ExternalLink, ArrowRightLeft,
  FileText, Coins, Scale, Building2, Briefcase
} from "lucide-react";
import { useState, useEffect } from "react";

/* ── SG Colour Palette ── */
export const SG = {
  red: "#EE2536",
  nusOrange: "#EF7C00",
  nusBlue: "#003D7C",
  masTeal: "#00A3A1",
  finternetAmber: "#F59E0B",
  finternetCyan: "#06B6D4",
  dark: "#0A1628",
  card: "#0F1D35",
  surface: "#162544",
  border: "#1E3A5F",
  headerBg: "#081425",
};

const SG_LOGO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663328851912/82pWKmUqBRkgn8Ladat8sj/units-sg-orchid-logo-light-KqELedrzeYmCnakJE4pQSh.png";
const FINTERNET_LOGO_WHITE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663328851912/82pWKmUqBRkgn8Ladat8sj/yP0fvxrB3mwq_e7583308.png";

/* ── Navigation Structure ── */
interface SGNavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  color: string;
}

/* SG Blueprint pages */
const sgNavItems: SGNavItem[] = [
  { href: "/sg", label: "Executive Summary", icon: <Home className="w-4 h-4" />, color: SG.nusOrange },
  { href: "/sg/problem", label: "Fragmented Infrastructure", icon: <Landmark className="w-4 h-4" />, color: SG.red },
  { href: "/sg/architecture", label: "Network Architecture", icon: <Network className="w-4 h-4" />, color: SG.masTeal },
  { href: "/sg/capabilities", label: "Capabilities", icon: <Zap className="w-4 h-4" />, color: SG.finternetCyan },
  { href: "/sg/assets", label: "Asset Classes", icon: <Gem className="w-4 h-4" />, color: SG.finternetAmber },
  { href: "/sg/funding", label: "Funding & Participants", icon: <Users className="w-4 h-4" />, color: SG.nusOrange },
];

/* SG Deep Dive pages */
const sgDeepDiveItems: SGNavItem[] = [
  { href: "/sg/deep-dive/units", label: "Singapore on UNITS", icon: <Network className="w-4 h-4" />, color: SG.red },
  { href: "/sg/deep-dive/dvp-settlement", label: "DvP Settlement", icon: <ArrowRightLeft className="w-4 h-4" />, color: SG.finternetCyan },
  { href: "/sg/deep-dive/tokenisation", label: "Tokenisation", icon: <Layers className="w-4 h-4" />, color: SG.nusOrange },
  { href: "/sg/deep-dive/regulatory", label: "Regulatory Framework", icon: <Scale className="w-4 h-4" />, color: SG.masTeal },
  { href: "/sg/deep-dive/collateral-highway", label: "Collateral Highway", icon: <ArrowRightLeft className="w-4 h-4" />, color: SG.finternetAmber },
  { href: "/sg/deep-dive/participants", label: "Participants Ecosystem", icon: <Users className="w-4 h-4" />, color: SG.nusBlue },
  { href: "/sg/deep-dive/vcc", label: "VCC Fund Tokenisation", icon: <Briefcase className="w-4 h-4" />, color: SG.masTeal },
  { href: "/sg/deep-dive/precious-metals", label: "Precious Metals", icon: <Gem className="w-4 h-4" />, color: SG.finternetAmber },
  { href: "/sg/deep-dive/token-programs", label: "Token Programs", icon: <Zap className="w-4 h-4" />, color: SG.finternetCyan },
  { href: "/sg/deep-dive/p-tokets", label: "P-Tokets (Portfolios)", icon: <Network className="w-4 h-4" />, color: SG.nusOrange },
];

/* SG Interactive Workflows */
const sgWorkflowItems: SGNavItem[] = [
  { href: "/sg/workflows", label: "Workflows Overview", icon: <Layers className="w-4 h-4" />, color: SG.masTeal },
  { href: "/sg/workflows/cdp-bridge", label: "CDP Bridge", icon: <ArrowRightLeft className="w-4 h-4" />, color: SG.masTeal },
  { href: "/sg/workflows/atomic-dvp", label: "Atomic DvP", icon: <Zap className="w-4 h-4" />, color: SG.nusOrange },
  { href: "/sg/workflows/collateral-mobilisation", label: "Collateral Mobilisation", icon: <Shield className="w-4 h-4" />, color: "#a78bfa" },
  { href: "/sg/workflows/vcc-tokenisation", label: "VCC Fund Tokenisation", icon: <Briefcase className="w-4 h-4" />, color: SG.masTeal },
  { href: "/sg/workflows/gold-tokenisation", label: "Gold Tokenisation", icon: <Gem className="w-4 h-4" />, color: SG.finternetAmber },
  { href: "/sg/workflows/commodities-collateral", label: "Commodities Collateral", icon: <Coins className="w-4 h-4" />, color: SG.nusOrange },
  { href: "/sg/workflows/cross-border", label: "Cross-Border Settlement", icon: <Globe className="w-4 h-4" />, color: "#3b82f6" },
];

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ── Sidebar ── */
function SGSidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [location] = useLocation();

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden" onClick={onClose} />
      )}

      <aside
        className={`fixed top-0 left-0 h-full z-50 w-72 shadow-2xl transform transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ background: SG.headerBg, borderRight: `1px solid ${SG.border}` }}
      >
        {/* Header with orchid logo */}
        <div className="h-16 flex items-center justify-between px-4" style={{ borderBottom: `1px solid ${SG.border}` }}>
          <Link href="/sg" onClick={() => { scrollToTop(); onClose(); }} className="flex items-center gap-2.5 group">
            <img src={SG_LOGO} alt="UNITS|SG" className="h-9 w-9 object-contain" />
            <div className="flex items-baseline gap-0.5">
              <span className="text-sm font-bold text-white tracking-wide">UNITS</span>
              <span className="text-sm font-bold" style={{ color: SG.red }}>|</span>
              <span className="text-sm font-bold" style={{ color: SG.nusOrange }}>SG</span>
            </div>
          </Link>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-all"
            aria-label="Close navigation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable nav */}
        <div className="overflow-y-auto h-[calc(100%-4rem)] py-3 px-3">

          {/* ── SG Blueprint Section ── */}
          <div className="px-3 mb-2">
            <span className="text-[10px] uppercase tracking-[0.2em] font-semibold" style={{ color: SG.nusOrange }}>Singapore Blueprint</span>
          </div>

          {sgNavItems.map((item) => {
            const isActive = location === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => { scrollToTop(); onClose(); }}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all mb-0.5 ${
                  isActive
                    ? "bg-white/8 border"
                    : "text-white/50 hover:text-white hover:bg-white/5 border border-transparent"
                }`}
                style={isActive ? { color: item.color, borderColor: `${item.color}30` } : {}}
              >
                <span style={{ color: isActive ? item.color : undefined }}>{item.icon}</span>
                {item.label}
              </Link>
            );
          })}

          {/* ── Divider ── */}
          <div className="mx-2 my-3" style={{ borderTop: `1px solid ${SG.border}` }} />

          {/* ── SG Deep Dives ── */}
          <div className="px-3 mb-2">
            <span className="text-[10px] uppercase tracking-[0.2em] font-semibold" style={{ color: SG.finternetCyan }}>SG Deep Dives</span>
          </div>

          {sgDeepDiveItems.map((item) => {
            const isActive = location === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => { scrollToTop(); onClose(); }}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all mb-0.5 ${
                  isActive
                    ? "bg-white/8 border"
                    : "text-white/50 hover:text-white hover:bg-white/5 border border-transparent"
                }`}
                style={isActive ? { color: item.color, borderColor: `${item.color}30` } : {}}
              >
                <span style={{ color: isActive ? item.color : undefined }}>{item.icon}</span>
                {item.label}
              </Link>
            );
          })}

          {/* ── Divider ── */}
          <div className="mx-2 my-3" style={{ borderTop: `1px solid ${SG.border}` }} />

          {/* ── SG Workflows ── */}
          <div className="px-3 mb-2">
            <span className="text-[10px] uppercase tracking-[0.2em] font-semibold" style={{ color: "#a78bfa" }}>Interactive Workflows</span>
          </div>

          {sgWorkflowItems.map((item) => {
            const isActive = location === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => { scrollToTop(); onClose(); }}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all mb-0.5 ${
                  isActive
                    ? "bg-white/8 border"
                    : "text-white/50 hover:text-white hover:bg-white/5 border border-transparent"
                }`}
                style={isActive ? { color: item.color, borderColor: `${item.color}30` } : {}}
              >
                <span style={{ color: isActive ? item.color : undefined }}>{item.icon}</span>
                {item.label}
              </Link>
            );
          })}

          {/* ── Divider ── */}
          <div className="mx-2 my-3" style={{ borderTop: `1px solid ${SG.border}` }} />

          {/* Powered by Finternet */}
          <div className="px-3 py-4 flex items-center gap-2 text-[10px] text-white/20 tracking-wide uppercase">
            <span>Powered by</span>
            <img src={FINTERNET_LOGO_WHITE} alt="Finternet" className="h-3.5 opacity-50" />
          </div>
        </div>
      </aside>
    </>
  );
}

/* ── Top Bar ── */
export default function SGPortalNav() {
  const [location] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const currentItem = sgNavItems.find((item) => location === item.href) || sgDeepDiveItems.find((item) => location === item.href) || sgWorkflowItems.find((item) => location === item.href);
  const breadcrumb = currentItem ? currentItem.label : "";

  return (
    <>
      <SGSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <header
        className="sticky top-0 z-30 backdrop-blur-xl shadow-[0_14px_40px_rgba(3,8,20,0.28)]"
        style={{ background: `${SG.headerBg}ee`, borderBottom: `1px solid rgba(255,255,255,0.05)` }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="h-14 flex items-center gap-4">
            {/* Menu button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 -ml-2 rounded-lg text-white/50 hover:text-white hover:bg-white/8 transition-all"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Logo */}
            <Link href="/sg" onClick={scrollToTop} className="flex items-center gap-2 shrink-0 group">
              <img src={SG_LOGO} alt="UNITS|SG" className="h-8 w-8 object-contain" />
              <span className="text-sm font-bold text-white tracking-wide">UNITS</span>
              <span className="text-sm font-bold" style={{ color: SG.red }}>|</span>
              <span className="text-sm font-bold" style={{ color: SG.nusOrange }}>SG</span>
            </Link>

            {/* Breadcrumb */}
            {breadcrumb && breadcrumb !== "Executive Summary" && (
              <div className="hidden sm:flex items-center gap-2 text-xs text-white/30 truncate">
                <span className="text-white/15">/</span>
                <span className="truncate">{breadcrumb}</span>
              </div>
            )}

            {/* Spacer */}
            <div className="flex-1" />

            {/* Powered by Finternet */}
            <div className="hidden md:flex items-center gap-1.5 text-[10px] text-white/20 tracking-wide uppercase">
              <span>Powered by</span>
              <img src={FINTERNET_LOGO_WHITE} alt="Finternet" className="h-3.5 opacity-50" />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
