/**
 * GlowingOrb: Cinematic Infrastructure Design
 * Triple-layer radial glow with expanding sonar rings behind the orchid logo.
 * Breathing pulse at 6s cycle. Used in the hero section.
 */
import { useEffect, useRef } from "react";

export default function GlowingOrb() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
      {/* Layer 1: Teal core glow */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-30"
        style={{
          background: "radial-gradient(circle, rgba(0,163,161,0.6) 0%, rgba(0,163,161,0) 70%)",
          animation: "breathe 6s ease-in-out infinite",
        }}
      />
      {/* Layer 2: Purple mid glow */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(167,139,250,0.5) 0%, rgba(167,139,250,0) 70%)",
          animation: "breathe 8s ease-in-out infinite 1s",
        }}
      />
      {/* Layer 3: Amber outer glow */}
      <div
        className="absolute w-[700px] h-[700px] rounded-full opacity-15"
        style={{
          background: "radial-gradient(circle, rgba(239,124,0,0.3) 0%, rgba(239,124,0,0) 70%)",
          animation: "breathe 10s ease-in-out infinite 2s",
        }}
      />
      {/* Sonar ring 1 */}
      <div
        className="absolute w-[200px] h-[200px] rounded-full"
        style={{
          border: "1px solid rgba(0,163,161,0.3)",
          animation: "sonar 4s ease-out infinite",
        }}
      />
      {/* Sonar ring 2 */}
      <div
        className="absolute w-[200px] h-[200px] rounded-full"
        style={{
          border: "1px solid rgba(6,182,212,0.2)",
          animation: "sonar 4s ease-out infinite 1.3s",
        }}
      />
      {/* Sonar ring 3 */}
      <div
        className="absolute w-[200px] h-[200px] rounded-full"
        style={{
          border: "1px solid rgba(167,139,250,0.15)",
          animation: "sonar 4s ease-out infinite 2.6s",
        }}
      />
    </div>
  );
}
