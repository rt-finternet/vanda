import { useRef, useState, useEffect, useCallback } from "react";
import { Link } from "wouter";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import {
  ArrowRight, ChevronDown, Shield, Zap, Globe, Layers,
  Network, Lock, Code2, ArrowRightLeft, Database,
  Building2, Landmark, Scale, Eye, Coins
} from "lucide-react";

/* ── Brand Constants ── */
const COLORS = {
  dark: "#0A1628",
  deeper: "#060F1E",
  card: "#0F1D35",
  surface: "#162544",
  border: "#1E3A5F",
  teal: "#00A3A1",
  amber: "#F59E0B",
  purple: "#A78BFA",
  cyan: "#06B6D4",
  red: "#EE2536",
};

const SG_LOGO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663328851912/82pWKmUqBRkgn8Ladat8sj/units-sg-orchid-logo-light-KqELedrzeYmCnakJE4pQSh.png";
const FINTERNET_LOGO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663328851912/82pWKmUqBRkgn8Ladat8sj/yP0fvxrB3mwq_e7583308.png";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663328851912/K7gf8xoKwZVmt9538B5Xu7/vanda-hero-network_347d9a42.png";
const VISION_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663328851912/K7gf8xoKwZVmt9538B5Xu7/vanda-vision-abstract_b3af65bf.png";
const ARCH_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663328851912/K7gf8xoKwZVmt9538B5Xu7/vanda-architecture-glow_840e0d22.png";
const GLOBE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663328851912/K7gf8xoKwZVmt9538B5Xu7/vanda-globe-connections_f18b27f7.png";

/* ── Particle Field (Canvas-based for performance) ── */
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number; color: string }[] = [];
    const colors = [COLORS.teal, COLORS.amber, COLORS.purple, COLORS.cyan];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Create particles
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.4 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 163, 161, ${0.06 * (1 - dist / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw and update particles
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color.replace(")", `, ${p.opacity})`).replace("rgb", "rgba").replace("#", "");
        // Convert hex to rgba
        const hex = p.color;
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${p.opacity})`;
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      }

      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ opacity: 0.7 }} />;
}

/* ── Morphing Blob Background ── */
function MorphingBlobs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Teal blob */}
      <div className="absolute w-[600px] h-[600px] -top-40 -left-40 blur-3xl"
        style={{
          background: `radial-gradient(circle, rgba(0,163,161,0.12), transparent 70%)`,
          animation: "morph 18s ease-in-out infinite, drift1 25s ease-in-out infinite",
        }} />
      {/* Purple blob */}
      <div className="absolute w-[500px] h-[500px] top-1/3 -right-32 blur-3xl"
        style={{
          background: `radial-gradient(circle, rgba(167,139,250,0.10), transparent 70%)`,
          animation: "morph 22s ease-in-out infinite reverse, drift2 30s ease-in-out infinite",
        }} />
      {/* Amber blob */}
      <div className="absolute w-[400px] h-[400px] -bottom-20 left-1/3 blur-3xl"
        style={{
          background: `radial-gradient(circle, rgba(245,158,11,0.08), transparent 70%)`,
          animation: "morph 15s ease-in-out infinite, drift3 20s ease-in-out infinite",
        }} />
    </div>
  );
}

/* ── Text Reveal Animation ── */
function TextReveal({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <span ref={ref} className={className}>
      {text.split("").map((char, i) => (
        <motion.span key={i} style={{ display: "inline-block" }}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: delay + i * 0.025, ease: [0.25, 0.46, 0.45, 0.94] }}>
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

/* ── Magnetic Button ── */
function MagneticButton({ children, className = "", href }: { children: React.ReactNode; className?: string; href: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("translate(0, 0)");

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.25;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.25;
    setTransform(`translate(${x}px, ${y}px)`);
  };

  return (
    <div ref={ref} onMouseMove={handleMouseMove} onMouseLeave={() => setTransform("translate(0, 0)")}
      style={{ transform, transition: "transform 0.2s ease-out", display: "inline-block" }}>
      <Link href={href} className={className}>{children}</Link>
    </div>
  );
}

/* ── Gradient Border Card ── */
function GradientBorderCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div style={{
      background: `conic-gradient(from var(--angle, 0deg), ${COLORS.teal}, ${COLORS.purple}, ${COLORS.amber}, ${COLORS.teal})`,
      animation: "gradientRotate 6s linear infinite",
      padding: "1px",
      borderRadius: "1rem",
    }}>
      <div className={className} style={{ background: COLORS.card, borderRadius: "calc(1rem - 1px)" }}>
        {children}
      </div>
    </div>
  );
}

/* ── Parallax Image ── */
function ParallaxImage({ src, alt, speed = 0.15 }: { src: string; alt: string; speed?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div ref={ref} className="relative overflow-hidden rounded-2xl">
      <motion.div style={{ y }}>
        <img src={src} alt={alt} className="w-full h-auto" loading="lazy" />
      </motion.div>
      {/* Overlay gradient */}
      <div className="absolute inset-0" style={{
        background: `linear-gradient(180deg, transparent 60%, ${COLORS.dark})`
      }} />
    </div>
  );
}

/* ── Animated Counter ── */
function Counter({ value, suffix = "", prefix = "", decimals = 0 }: { value: number; suffix?: string; prefix?: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const startTime = Date.now();
    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(eased * value);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [isInView, value]);

  return <span ref={ref}>{prefix}{display.toFixed(decimals)}{suffix}</span>;
}

/* ── Section Divider ── */
function SectionDivider() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="h-px flex-1 max-w-[200px]" style={{ background: `linear-gradient(to right, transparent, ${COLORS.border})` }} />
      <div className="w-2 h-2 rounded-full mx-4" style={{ background: COLORS.teal, boxShadow: `0 0 12px ${COLORS.teal}40` }} />
      <div className="h-px flex-1 max-w-[200px]" style={{ background: `linear-gradient(to left, transparent, ${COLORS.border})` }} />
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   VANDA LANDING PAGE
   ════════════════════════════════════════════════════════════════ */
export default function VandaLanding() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div className="min-h-screen text-white" style={{ background: COLORS.deeper }}>

      {/* ── Floating Nav ── */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? `${COLORS.dark}E6` : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? `1px solid ${COLORS.border}40` : "1px solid transparent",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={SG_LOGO} alt="VANDA" className="h-8 w-auto" />
            <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: COLORS.amber }}>VANDA</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#vision" className="text-xs tracking-widest uppercase hidden sm:block" style={{ color: "rgba(255,255,255,0.5)" }}>Vision</a>
            <a href="#why" className="text-xs tracking-widest uppercase hidden sm:block" style={{ color: "rgba(255,255,255,0.5)" }}>Why</a>
            <a href="#architecture" className="text-xs tracking-widest uppercase hidden sm:block" style={{ color: "rgba(255,255,255,0.5)" }}>Architecture</a>
            <a href="#global" className="text-xs tracking-widest uppercase hidden sm:block" style={{ color: "rgba(255,255,255,0.5)" }}>Global</a>
            <Link href="/sg"
              className="px-5 py-2 rounded-full text-xs font-semibold tracking-widest uppercase"
              style={{
                background: `linear-gradient(135deg, ${COLORS.amber}, ${COLORS.amber}CC)`,
                color: COLORS.dark,
                boxShadow: `0 0 20px ${COLORS.amber}30`,
              }}>
              Enter Portal
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* ══════════════════════════════════════════════════════════
          SECTION 1: HERO
          ══════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Multi-layer background */}
        <div className="absolute inset-0" style={{
          background: `radial-gradient(ellipse 80% 60% at 50% 40%, ${COLORS.teal}08, transparent),
                       radial-gradient(ellipse 60% 50% at 80% 20%, ${COLORS.purple}06, transparent),
                       radial-gradient(ellipse 50% 40% at 20% 80%, ${COLORS.amber}05, transparent),
                       linear-gradient(180deg, ${COLORS.deeper}, ${COLORS.dark})`
        }} />
        <ParticleField />
        <MorphingBlobs />

        {/* Hero content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          {/* Logo with glow */}
          <motion.div className="mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}>
            <div className="relative inline-block">
              <div className="absolute inset-0 blur-3xl" style={{ background: `radial-gradient(circle, ${COLORS.teal}20, transparent 70%)` }} />
              <img src={SG_LOGO} alt="VANDA" className="h-20 w-auto mx-auto relative" />
            </div>
          </motion.div>

          {/* Title with character reveal */}
          <div className="mb-6">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none">
              <TextReveal text="VANDA" delay={0.3} className="block" />
            </h1>
            <motion.div className="mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}>
              <p className="text-lg md:text-xl tracking-[0.3em] uppercase font-light" style={{ color: COLORS.amber }}>
                Value And Network Digital Architecture
              </p>
            </motion.div>
          </div>

          {/* Subtitle */}
          <motion.p className="text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ color: "rgba(255,255,255,0.55)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}>
            A next-generation financial market infrastructure that reimagines how value is created,
            represented, and transferred. Not a depository. Not a blockchain. A universal programmable ledger
            for Singapore and beyond.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.8 }}>
            <MagneticButton href="/sg"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm font-semibold tracking-widest uppercase"
              >
              <span style={{ color: COLORS.dark }}>Explore the Blueprint</span>
              <ArrowRight className="w-4 h-4" style={{ color: COLORS.dark }} />
            </MagneticButton>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div className="absolute bottom-10 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 1 }}>
            <a href="#vision" className="flex flex-col items-center gap-2">
              <span className="text-[10px] tracking-[0.4em] uppercase" style={{ color: "rgba(255,255,255,0.25)" }}>Scroll</span>
              <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                <ChevronDown className="w-5 h-5" style={{ color: "rgba(255,255,255,0.2)" }} />
              </motion.div>
            </a>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECTION 2: THE VISION
          ══════════════════════════════════════════════════════════ */}
      <section id="vision" className="relative py-32 overflow-hidden">
        <MorphingBlobs />
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}>

            {/* Section badge */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold"
                style={{ background: `${COLORS.teal}15`, border: `1px solid ${COLORS.teal}30`, color: COLORS.teal }}>
                01
              </div>
              <div className="h-px flex-1" style={{ background: `linear-gradient(to right, ${COLORS.teal}30, transparent)` }} />
            </div>

            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              Why the Next-Generation FMI<br />
              <span style={{ color: COLORS.teal }}>Need Not Be a Depository</span>
            </h2>
            <p className="text-base md:text-lg max-w-3xl mb-16 leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
              For decades, securities infrastructure has been built around the depository model: a central entity
              that holds assets, maintains the golden record, and intermediates every transfer. This model served
              the paper era well. But in a world of programmable value, it becomes the bottleneck.
            </p>
          </motion.div>

          {/* Vision image with parallax */}
          <motion.div className="mb-16"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}>
            <ParallaxImage src={VISION_IMG} alt="From legacy to unified" />
          </motion.div>

          {/* Comparison: Old vs New */}
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}>
              <div className="rounded-2xl p-8" style={{ background: `${COLORS.card}`, border: `1px solid ${COLORS.red}20` }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${COLORS.red}15` }}>
                    <Building2 className="w-5 h-5" style={{ color: COLORS.red }} />
                  </div>
                  <h3 className="text-lg font-semibold" style={{ color: COLORS.red }}>The Depository Model</h3>
                </div>
                <ul className="space-y-4">
                  {[
                    "Central entity holds all assets in omnibus accounts",
                    "T+2 settlement with reconciliation overhead",
                    "Siloed asset classes, each with bespoke plumbing",
                    "Corporate actions processed in batch, days late",
                    "Cross-border requires correspondent chains",
                    "Innovation gated by infrastructure vendor cycles",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: COLORS.red }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}>
              <GradientBorderCard className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${COLORS.teal}15` }}>
                    <Network className="w-5 h-5" style={{ color: COLORS.teal }} />
                  </div>
                  <h3 className="text-lg font-semibold" style={{ color: COLORS.teal }}>The VANDA Model</h3>
                </div>
                <ul className="space-y-4">
                  {[
                    "Distributed tokenPools: assets live where they are governed",
                    "Atomic T+0 DvP with no reconciliation needed",
                    "One universal protocol for all asset classes",
                    "Token Programs execute corporate actions in real-time",
                    "Cross-ledger connectivity via chain adapters",
                    "Participants compose new products without waiting",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: COLORS.teal }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </GradientBorderCard>
            </motion.div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ══════════════════════════════════════════════════════════
          SECTION 3: WHAT IS VANDA?
          ══════════════════════════════════════════════════════════ */}
      <section id="why" className="relative py-32 overflow-hidden">
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}>

            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold"
                style={{ background: `${COLORS.amber}15`, border: `1px solid ${COLORS.amber}30`, color: COLORS.amber }}>
                02
              </div>
              <div className="h-px flex-1" style={{ background: `linear-gradient(to right, ${COLORS.amber}30, transparent)` }} />
            </div>

            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              What is <span style={{ color: COLORS.amber }}>VANDA</span>?
            </h2>
            <p className="text-base md:text-lg max-w-3xl mb-16 leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
              VANDA is a blueprint for a next-generation financial market infrastructure built on the
              UNITS protocol, a universal, intelligent, programmable ledger that creates and represents
              all types of value and identity in programmable formats. Named after Singapore's national
              flower, it grows from local roots to connect globally.
            </p>
          </motion.div>

          {/* Core pillars */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              {
                icon: <Database className="w-6 h-6" />,
                title: "Universal Ledger",
                desc: "A single protocol layer that supports equities, fixed income, gold, structured notes, fund units, and any future asset class, all on one unified infrastructure.",
                color: COLORS.teal,
              },
              {
                icon: <Code2 className="w-6 h-6" />,
                title: "Programmable Value",
                desc: "Token Programs embed business logic directly into assets. Dividends, coupons, margin calls, and corporate actions execute automatically, with no batch processing and no delays.",
                color: COLORS.amber,
              },
              {
                icon: <Globe className="w-6 h-6" />,
                title: "Connected Globally",
                desc: "Cross-ledger adapters connect Singapore to every major financial centre. Assets move across borders in seconds, not days. Unsponsored tokets bring global securities home.",
                color: COLORS.purple,
              },
            ].map((pillar, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}>
                <div className="rounded-2xl p-8 h-full group hover:scale-[1.02] transition-transform duration-300"
                  style={{
                    background: COLORS.card,
                    border: `1px solid ${pillar.color}15`,
                    boxShadow: `0 0 0 0 ${pillar.color}00`,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 0 40px ${pillar.color}15`;
                    (e.currentTarget as HTMLElement).style.borderColor = `${pillar.color}30`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 0 0 0 ${pillar.color}00`;
                    (e.currentTarget as HTMLElement).style.borderColor = `${pillar.color}15`;
                  }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                    style={{ background: `${pillar.color}12`, border: `1px solid ${pillar.color}20` }}>
                    <div style={{ color: pillar.color }}>{pillar.icon}</div>
                  </div>
                  <h3 className="text-lg font-semibold mb-3">{pillar.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{pillar.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Stats */}
          <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}>
            {[
              { value: 6, suffix: "+", label: "Asset Classes", color: COLORS.teal },
              { value: 15, suffix: "", label: "Deep Dives", color: COLORS.amber },
              { value: 8, suffix: "", label: "Workflow Models", color: COLORS.purple },
              { value: 0, suffix: "T+0", label: "Settlement", color: COLORS.cyan, isText: true },
            ].map((stat, i) => (
              <div key={i} className="text-center p-6 rounded-xl" style={{ background: `${stat.color}08`, border: `1px solid ${stat.color}10` }}>
                <div className="text-3xl md:text-4xl font-bold mb-2" style={{ color: stat.color }}>
                  {stat.isText ? stat.suffix : <Counter value={stat.value} suffix={stat.suffix} />}
                </div>
                <div className="text-xs tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.4)" }}>{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <SectionDivider />

      {/* ══════════════════════════════════════════════════════════
          SECTION 4: ARCHITECTURE
          ══════════════════════════════════════════════════════════ */}
      <section id="architecture" className="relative py-32 overflow-hidden">
        <MorphingBlobs />
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}>

            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold"
                style={{ background: `${COLORS.purple}15`, border: `1px solid ${COLORS.purple}30`, color: COLORS.purple }}>
                03
              </div>
              <div className="h-px flex-1" style={{ background: `linear-gradient(to right, ${COLORS.purple}30, transparent)` }} />
            </div>

            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              Three Layers.<br />
              <span style={{ color: COLORS.purple }}>Infinite Possibilities.</span>
            </h2>
            <p className="text-base md:text-lg max-w-3xl mb-16 leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
              VANDA's architecture separates concerns into three composable layers: the unified ledger
              foundation, the programmable middleware, and the application ecosystem. Each layer can evolve
              independently while maintaining structural integrity.
            </p>
          </motion.div>

          {/* Architecture image */}
          <motion.div className="mb-16"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}>
            <ParallaxImage src={ARCH_IMG} alt="Three-layer architecture" speed={0.1} />
          </motion.div>

          {/* Layer cards */}
          <div className="space-y-6">
            {[
              {
                layer: "Layer 1",
                title: "Unified Ledger",
                subtitle: "The Foundation",
                desc: "TokenPools hold the canonical state of all assets. Registers maintain ownership records. The UNITS protocol ensures every transaction is atomic, final, and auditable. Both wallet-based and register-based models are supported natively.",
                color: COLORS.teal,
                icon: <Database className="w-5 h-5" />,
                features: ["TokenPool registers", "Atomic state transitions", "MAS supervisory view", "Dual-model support"],
              },
              {
                layer: "Layer 2",
                title: "Token Programs",
                subtitle: "The Intelligence",
                desc: "Pre-hook validation, state mutation, post-hook notification. Every lifecycle event, from dividend distribution to margin calls, is encoded as a Token Program that executes deterministically. No batch files. No manual intervention.",
                color: COLORS.amber,
                icon: <Code2 className="w-5 h-5" />,
                features: ["Pre/State/Post execution", "CDP corporate actions", "MEPS+ coupon flows", "Composable P-Tokets"],
              },
              {
                layer: "Layer 3",
                title: "Applications",
                subtitle: "The Ecosystem",
                desc: "Wallets, trading platforms, wealth management tools, and regulatory dashboards all connect through standard APIs. Participants build on the infrastructure without waiting for vendor cycles. The Finternet App provides the universal gateway.",
                color: COLORS.purple,
                icon: <Layers className="w-5 h-5" />,
                features: ["BYOW wallets", "Participant APIs", "Regulatory dashboards", "Cross-ledger bridges"],
              },
            ].map((layer, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1 }}>
                <div className="rounded-2xl p-8 md:p-10 flex flex-col md:flex-row gap-8"
                  style={{ background: COLORS.card, border: `1px solid ${layer.color}15` }}>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ background: `${layer.color}15` }}>
                        <div style={{ color: layer.color }}>{layer.icon}</div>
                      </div>
                      <span className="text-xs tracking-widest uppercase" style={{ color: layer.color }}>{layer.layer}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-1">{layer.title}</h3>
                    <p className="text-sm mb-4" style={{ color: `${layer.color}90` }}>{layer.subtitle}</p>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>{layer.desc}</p>
                  </div>
                  <div className="md:w-56 flex flex-wrap md:flex-col gap-2">
                    {layer.features.map((f, j) => (
                      <div key={j} className="px-3 py-2 rounded-lg text-xs"
                        style={{ background: `${layer.color}08`, border: `1px solid ${layer.color}15`, color: `${layer.color}CC` }}>
                        {f}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ══════════════════════════════════════════════════════════
          SECTION 5: GLOBAL CONNECTIVITY
          ══════════════════════════════════════════════════════════ */}
      <section id="global" className="relative py-32 overflow-hidden">
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}>

            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold"
                style={{ background: `${COLORS.cyan}15`, border: `1px solid ${COLORS.cyan}30`, color: COLORS.cyan }}>
                04
              </div>
              <div className="h-px flex-1" style={{ background: `linear-gradient(to right, ${COLORS.cyan}30, transparent)` }} />
            </div>

            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              Singapore at the Centre.<br />
              <span style={{ color: COLORS.cyan }}>Connected to the World.</span>
            </h2>
            <p className="text-base md:text-lg max-w-3xl mb-16 leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
              VANDA does not operate in isolation. Through cross-ledger chain adapters, it connects Singapore's
              financial ecosystem to Euroclear, DTCC, HKEX, JPX, ASX, and emerging digital asset networks.
              Unsponsored tokets bring global securities into Singapore's programmable environment.
            </p>
          </motion.div>

          {/* Globe image */}
          <motion.div className="mb-16"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}>
            <ParallaxImage src={GLOBE_IMG} alt="Global connectivity from Singapore" speed={0.1} />
          </motion.div>

          {/* Corridors grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { name: "Euroclear", region: "Europe", assets: "Bonds, Equities", color: COLORS.teal },
              { name: "DTCC", region: "United States", assets: "Treasuries, Equities", color: COLORS.amber },
              { name: "HKEX / CCASS", region: "Hong Kong", assets: "H-Shares, ETFs", color: COLORS.purple },
              { name: "JPX / JASDEC", region: "Japan", assets: "JGBs, Equities", color: COLORS.cyan },
              { name: "ASX / Austraclear", region: "Australia", assets: "AGBs, Equities", color: COLORS.teal },
              { name: "KSD", region: "South Korea", assets: "KTBs, Equities", color: COLORS.amber },
            ].map((corridor, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}>
                <div className="rounded-xl p-5 h-full group hover:scale-[1.03] transition-transform duration-300"
                  style={{ background: COLORS.card, border: `1px solid ${corridor.color}15` }}>
                  <div className="text-xs tracking-widest uppercase mb-2" style={{ color: corridor.color }}>{corridor.region}</div>
                  <div className="text-sm font-semibold mb-1">{corridor.name}</div>
                  <div className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>{corridor.assets}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ══════════════════════════════════════════════════════════
          SECTION 6: CTA
          ══════════════════════════════════════════════════════════ */}
      <section className="relative py-32 overflow-hidden">
        <ParticleField />
        <div className="absolute inset-0" style={{
          background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${COLORS.teal}08, transparent)`
        }} />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}>

            <img src={SG_LOGO} alt="VANDA" className="h-16 w-auto mx-auto mb-8 opacity-40" />

            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              Ready to Explore<br />
              <span style={{ color: COLORS.amber }}>the Blueprint?</span>
            </h2>
            <p className="text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
              The VANDA portal contains 15 deep-dive analyses, 8 workflow models, and a comprehensive
              architecture for Singapore's next-generation financial infrastructure. Access is restricted
              to authorised stakeholders.
            </p>

            <MagneticButton href="/sg"
              className="inline-flex items-center gap-3 px-10 py-5 rounded-full text-base font-semibold tracking-widest uppercase">
              <span style={{ color: COLORS.dark }}>Enter the Portal</span>
              <ArrowRight className="w-5 h-5" style={{ color: COLORS.dark }} />
            </MagneticButton>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-12 border-t" style={{ borderColor: COLORS.border }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img src={SG_LOGO} alt="VANDA" className="h-8 w-auto opacity-20" />
              <div className="h-6 w-px" style={{ background: COLORS.border }} />
              <div className="flex items-center gap-2">
                <span className="text-[10px] tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.2)" }}>Powered by</span>
                <img src={FINTERNET_LOGO} alt="Finternet" className="h-3 opacity-20" />
              </div>
            </div>
            <p className="text-[10px] tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.15)" }}>
              Confidential. Authorised Stakeholders Only
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
