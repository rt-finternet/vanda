import { useState, useRef, useEffect, useCallback } from "react";
import { trpc } from "@/lib/trpc";
import { useAccess } from "@/contexts/AccessContext";

/* ── Brand Constants ── */
const SG = {
  gold: "#F59E0B",
  teal: "#00A3A1",
  red: "#EE2536",
  dark: "#0A1628",
  navy: "#0F1D35",
  slate: "#1E3A5F",
};

const UNITS_LOGO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663328851912/82pWKmUqBRkgn8Ladat8sj/units-sg-orchid-logo-light-KqELedrzeYmCnakJE4pQSh.png";
const FINTERNET_LOGO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663328851912/82pWKmUqBRkgn8Ladat8sj/yP0fvxrB3mwq_e7583308.png";

/* ── Animated Background ── */
function CinematicBg() {
  return (
    <div className="fixed inset-0 overflow-hidden" style={{ background: `linear-gradient(135deg, ${SG.dark} 0%, ${SG.navy} 50%, ${SG.slate} 100%)` }}>
      {/* Floating orbs */}
      <div className="absolute w-[600px] h-[600px] rounded-full opacity-20 blur-[120px]"
        style={{ top: "-10%", left: "-5%", background: `radial-gradient(circle, ${SG.gold}40, transparent 70%)`, animation: "drift1 20s ease-in-out infinite" }} />
      <div className="absolute w-[500px] h-[500px] rounded-full opacity-15 blur-[100px]"
        style={{ bottom: "-15%", right: "-10%", background: `radial-gradient(circle, ${SG.teal}40, transparent 70%)`, animation: "drift2 25s ease-in-out infinite" }} />
      <div className="absolute w-[300px] h-[300px] rounded-full opacity-10 blur-[80px]"
        style={{ top: "40%", left: "50%", background: `radial-gradient(circle, ${SG.gold}30, transparent 70%)`, animation: "drift3 18s ease-in-out infinite" }} />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: `linear-gradient(${SG.gold}20 1px, transparent 1px), linear-gradient(90deg, ${SG.gold}20 1px, transparent 1px)`, backgroundSize: "60px 60px" }} />

      {/* Vignette */}
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 30%, rgba(10,22,40,0.6) 100%)" }} />
    </div>
  );
}

/* ── Particle Field ── */
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.3 + 0.1,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245, 158, 11, ${p.alpha})`;
        ctx.fill();
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(245, 158, 11, ${0.05 * (1 - dist / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: 1 }} />;
}

/* ── PIN Input Component ── */
function PinInput({ value, onChange, disabled }: { value: string; onChange: (v: string) => void; disabled?: boolean }) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const digits = value.padEnd(6, "").split("").slice(0, 6);

  const handleChange = useCallback((index: number, char: string) => {
    if (!/^\d?$/.test(char)) return;
    const newDigits = [...digits];
    newDigits[index] = char;
    const newValue = newDigits.join("").replace(/\s/g, "");
    onChange(newValue);
    if (char && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  }, [digits, onChange]);

  const handleKeyDown = useCallback((index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  }, [digits]);

  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    onChange(pasted);
    const focusIndex = Math.min(pasted.length, 5);
    inputRefs.current[focusIndex]?.focus();
  }, [onChange]);

  return (
    <div className="flex gap-3 justify-center" onPaste={handlePaste}>
      {digits.map((d, i) => (
        <input
          key={i}
          ref={(el) => { inputRefs.current[i] = el; }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={d}
          disabled={disabled}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onFocus={(e) => e.target.select()}
          className="w-14 h-16 text-center text-2xl font-bold rounded-xl border-2 outline-none transition-all duration-300 focus:scale-105"
          style={{
            background: d ? "rgba(245,158,11,0.08)" : "rgba(15,29,53,0.8)",
            borderColor: d ? `${SG.gold}60` : "rgba(255,255,255,0.1)",
            color: "#ffffff",
            fontFamily: "'Courier New', monospace",
            boxShadow: d ? `0 0 20px ${SG.gold}15, inset 0 0 10px ${SG.gold}08` : "none",
          }}
        />
      ))}
    </div>
  );
}

/* ── Main PinGate Page ── */
export default function PinGate() {
  const { login } = useAccess();
  const [step, setStep] = useState<"email" | "pin">("email");
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");
  const [pinToken, setPinToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const requestPin = trpc.access.requestPin.useMutation();
  const verifyPin = trpc.access.verifyPin.useMutation();

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsSubmitting(true);

    try {
      const result = await requestPin.mutateAsync({ email: email.trim().toLowerCase() });
      setPinToken(result.pinToken ?? null);
      setSuccess(result.message);
      setStep("pin");
    } catch (err: any) {
      setError(err.message || "Failed to request PIN. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePinSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.length !== 6) return;
    setError(null);
    setIsSubmitting(true);

    try {
      const result = await verifyPin.mutateAsync({
        email: email.trim().toLowerCase(),
        pin,
        pinToken,
      });
      if (result.success) {
        login(result.email, result.sessionToken);
      }
    } catch (err: any) {
      setError(err.message || "Invalid PIN. Please try again.");
      setPin("");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Auto-submit when 6 digits entered
  useEffect(() => {
    if (pin.length === 6 && step === "pin" && !isSubmitting) {
      handlePinSubmit(new Event("submit") as any);
    }
  }, [pin]);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <CinematicBg />
      <ParticleField />

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-md mx-4">
        {/* Glass card */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: "rgba(15,29,53,0.85)",
            backdropFilter: "blur(40px) saturate(1.5)",
            WebkitBackdropFilter: "blur(40px) saturate(1.5)",
            border: "1px solid rgba(245,158,11,0.15)",
            boxShadow: `0 32px 80px rgba(0,0,0,0.5), 0 0 60px ${SG.gold}08, inset 0 1px 0 rgba(255,255,255,0.05)`,
          }}
        >
          {/* Header */}
          <div className="text-center pt-10 pb-6 px-8">
            <div className="flex items-center justify-center gap-3 mb-6">
              <img src={UNITS_LOGO} alt="UNITS|SG" className="h-12" style={{ filter: "drop-shadow(0 0 20px rgba(245,158,11,0.2))" }} />
            </div>

            <div className="w-16 h-px mx-auto mb-4" style={{ background: `linear-gradient(90deg, transparent, ${SG.gold}40, transparent)` }} />

            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-[10px] tracking-[0.2em] uppercase" style={{ color: "rgba(255,255,255,0.35)" }}>Powered by</span>
              <img src={FINTERNET_LOGO} alt="Finternet" className="h-4 opacity-60" />
            </div>

            <p className="text-[10px] tracking-[0.15em] uppercase mt-4" style={{ color: SG.gold }}>
              Secure Stakeholder Access
            </p>
          </div>

          {/* Divider */}
          <div className="mx-8 h-px" style={{ background: `linear-gradient(90deg, transparent, rgba(245,158,11,0.15), transparent)` }} />

          {/* Form */}
          <div className="px-8 py-8">
            {step === "email" ? (
              <form onSubmit={handleEmailSubmit}>
                <label className="block text-xs tracking-widest uppercase mb-3" style={{ color: "rgba(255,255,255,0.4)" }}>
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@organisation.com"
                  required
                  disabled={isSubmitting}
                  className="w-full px-4 py-3.5 rounded-xl text-sm outline-none transition-all duration-300 focus:ring-2"
                  style={{
                    background: "rgba(10,22,40,0.6)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#e2e8f0",
                    fontFamily: "'Inter', system-ui, sans-serif",
                  }}
                />

                {error && (
                  <div className="mt-4 px-4 py-3 rounded-lg text-sm" style={{ background: "rgba(238,37,54,0.1)", border: `1px solid ${SG.red}30`, color: SG.red }}>
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting || !email}
                  className="w-full mt-6 py-3.5 rounded-xl text-sm font-semibold tracking-wide uppercase transition-all duration-300 disabled:opacity-40"
                  style={{
                    background: `linear-gradient(135deg, ${SG.gold}, ${SG.gold}CC)`,
                    color: SG.dark,
                    boxShadow: `0 4px 20px ${SG.gold}30`,
                  }}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: SG.dark, borderTopColor: "transparent" }} />
                      Verifying...
                    </span>
                  ) : (
                    "Request Access PIN"
                  )}
                </button>
              </form>
            ) : (
              <form onSubmit={handlePinSubmit}>
                {success && (
                  <div className="mb-6 px-4 py-3 rounded-lg text-sm" style={{ background: "rgba(0,163,161,0.1)", border: `1px solid ${SG.teal}30`, color: SG.teal }}>
                    {success}
                  </div>
                )}

                <label className="block text-xs tracking-widest uppercase mb-4 text-center" style={{ color: "rgba(255,255,255,0.4)" }}>
                  Enter 6-Digit PIN
                </label>

                <PinInput value={pin} onChange={setPin} disabled={isSubmitting} />

                {error && (
                  <div className="mt-4 px-4 py-3 rounded-lg text-sm" style={{ background: "rgba(238,37,54,0.1)", border: `1px solid ${SG.red}30`, color: SG.red }}>
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting || pin.length !== 6}
                  className="w-full mt-6 py-3.5 rounded-xl text-sm font-semibold tracking-wide uppercase transition-all duration-300 disabled:opacity-40"
                  style={{
                    background: `linear-gradient(135deg, ${SG.gold}, ${SG.gold}CC)`,
                    color: SG.dark,
                    boxShadow: `0 4px 20px ${SG.gold}30`,
                  }}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: SG.dark, borderTopColor: "transparent" }} />
                      Verifying...
                    </span>
                  ) : (
                    "Verify & Enter Portal"
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => { setStep("email"); setPin(""); setError(null); setSuccess(null); }}
                  className="w-full mt-3 py-2 text-xs tracking-widest uppercase transition-opacity hover:opacity-100"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                >
                  Use a different email
                </button>
              </form>
            )}
          </div>

          {/* Footer */}
          <div className="px-8 pb-6">
            <div className="h-px mb-4" style={{ background: `linear-gradient(90deg, transparent, rgba(245,158,11,0.1), transparent)` }} />
            <p className="text-center text-[10px] tracking-wider" style={{ color: "rgba(255,255,255,0.2)" }}>
              Next-Generation Securities Infrastructure
            </p>
            <p className="text-center text-[9px] mt-1" style={{ color: "rgba(255,255,255,0.12)" }}>
              Authorised stakeholders only. Access is logged.
            </p>
          </div>
        </div>

        {/* Glow effect under card */}
        <div
          className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-8 rounded-full blur-xl"
          style={{ background: `linear-gradient(90deg, ${SG.gold}10, ${SG.teal}15, ${SG.gold}10)` }}
        />
      </div>
    </div>
  );
}
