/**
 * CinematicBackground — Cinematic Infrastructure Design
 * Slowly morphing mesh gradient blobs that drift between palette colors.
 * Used as a background layer on deep-dive and workflow pages.
 */

interface CinematicBackgroundProps {
  variant?: "teal" | "purple" | "amber" | "mixed";
  intensity?: number;
}

export default function CinematicBackground({
  variant = "mixed",
  intensity = 0.15,
}: CinematicBackgroundProps) {
  const colors: Record<string, string[]> = {
    teal: ["rgba(0,163,161,VAL)", "rgba(6,182,212,VAL)", "rgba(0,163,161,VAL)"],
    purple: ["rgba(167,139,250,VAL)", "rgba(139,92,246,VAL)", "rgba(167,139,250,VAL)"],
    amber: ["rgba(239,124,0,VAL)", "rgba(245,158,11,VAL)", "rgba(239,124,0,VAL)"],
    mixed: ["rgba(0,163,161,VAL)", "rgba(167,139,250,VAL)", "rgba(239,124,0,VAL)"],
  };

  const palette = colors[variant].map((c) => c.replace(/VAL/g, String(intensity)));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Blob 1 */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle, ${palette[0]} 0%, transparent 70%)`,
          top: "-10%",
          right: "-10%",
          animation: "drift1 20s ease-in-out infinite",
        }}
      />
      {/* Blob 2 */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle, ${palette[1]} 0%, transparent 70%)`,
          bottom: "10%",
          left: "-5%",
          animation: "drift2 25s ease-in-out infinite",
        }}
      />
      {/* Blob 3 */}
      <div
        className="absolute w-[400px] h-[400px] rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle, ${palette[2]} 0%, transparent 70%)`,
          top: "40%",
          left: "30%",
          animation: "drift3 30s ease-in-out infinite",
        }}
      />
    </div>
  );
}
