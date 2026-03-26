/**
 * LiquidGlassCard — Cinematic Infrastructure Design
 * Glassmorphism card with gradient border sweep on hover.
 * Provides tactile feedback through lift, glow, and shimmer.
 */
import { useRef, useState } from "react";

interface LiquidGlassCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  style?: React.CSSProperties;
}

export default function LiquidGlassCard({
  children,
  className = "",
  glowColor = "rgba(0,163,161,0.4)",
  style,
}: LiquidGlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden transition-all duration-300 ${className}`}
      style={{
        ...style,
        transform: isHovered ? "translateY(-2px)" : "translateY(0)",
        boxShadow: isHovered
          ? `0 8px 32px ${glowColor.replace("0.4", "0.15")}, 0 0 0 1px ${glowColor.replace("0.4", "0.2")}`
          : "none",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gradient follow cursor */}
      {isHovered && (
        <div
          className="absolute pointer-events-none transition-opacity duration-300"
          style={{
            width: 300,
            height: 300,
            left: mousePos.x - 150,
            top: mousePos.y - 150,
            background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
            opacity: 0.15,
          }}
        />
      )}
      {/* Border shimmer */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none rounded-[inherit]"
          style={{
            background: `linear-gradient(${Math.atan2(mousePos.y - 100, mousePos.x - 100) * (180 / Math.PI)}deg, ${glowColor} 0%, transparent 50%)`,
            opacity: 0.1,
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "exclude",
            WebkitMaskComposite: "xor",
            padding: 1,
          }}
        />
      )}
      {children}
    </div>
  );
}
