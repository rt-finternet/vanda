import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SG } from "@/components/SGPortalNav";
import { Play, Pause, SkipForward, SkipBack, X, Compass } from "lucide-react";

/* ─── Tour Step Definitions ─── */
interface TourStep {
  layerId: string;
  title: string;
  narration: string;
  highlightNodes: string[];
  highlightConnections: [string, string][];
  accent: string;
}

const TOUR_STEPS: TourStep[] = [
  {
    layerId: "infrastructure",
    title: "Infrastructure & GL1",
    narration:
      "The foundation begins here. SGX CDP handles equities and corporate bonds, MAS MEPS+ covers government securities and SGD real-time gross settlement, GL1 standards ensure global interoperability, and the MAS Observer node provides real-time supervisory oversight. This is not a replacement. It is an overlay that preserves every existing connection.",
    highlightNodes: ["sgx-cdp", "meps", "gl1", "observer"],
    highlightConnections: [],
    accent: SG.masTeal,
  },
  {
    layerId: "protocol",
    title: "UNITS Protocol Layer",
    narration:
      "Above the infrastructure sits the UNITS Protocol, the universal abstraction layer that makes every asset programmable. tokenClasses define what an asset is. tokenPools hold the balances. Token Programs attach pre-hook and post-hook logic to every lifecycle event. Wallets and Registers coexist; UNITS|SG supports both models natively, bridging traditional account-based systems with blockchain-native wallets.",
    highlightNodes: ["units", "token-programs", "tokenisation", "wallets", "dvp-dd"],
    highlightConnections: [
      ["sgx-cdp", "units"],
      ["meps", "dvp-dd"],
      ["gl1", "wallets"],
      ["observer", "token-programs"],
    ],
    accent: SG.nusOrange,
  },
  {
    layerId: "assets",
    title: "Asset Classes: Tokets",
    narration:
      "Every asset class becomes a toket, a tokenised representation with full lifecycle programmability. Equities arrive via CDP proxy tokets. Structured Notes carry embedded coupon logic. Precious Metals are backed by SBMA-grade gold. P-Tokets compose multiple assets into a single programmable portfolio. And Unsponsored Tokets unlock global access to securities held at foreign depositories.",
    highlightNodes: ["equities", "structured", "precious", "p-tokets", "unsponsored"],
    highlightConnections: [
      ["units", "equities"],
      ["units", "structured"],
      ["units", "precious"],
      ["token-programs", "p-tokets"],
      ["tokenisation", "unsponsored"],
    ],
    accent: SG.finternetAmber,
  },
  {
    layerId: "applications",
    title: "Participant Applications",
    narration:
      "Workflows bring the protocol to life. Atomic DvP settlement eliminates counterparty risk. Gold Tokenisation follows SBMA vault standards. The CDP Bridge connects SGX equities to the tokenised world. A cross-asset Collateral Highway lets participants pledge any toket as margin. Each workflow is powered by Token Programs, not custom code.",
    highlightNodes: ["dvp-wf", "gold-wf", "cdp-wf", "collateral-wf"],
    highlightConnections: [
      ["equities", "cdp-wf"],
      ["precious", "gold-wf"],
      ["equities", "dvp-wf"],
      ["p-tokets", "collateral-wf"],
    ],
    accent: "#8B5CF6",
  },
  {
    layerId: "connectivity",
    title: "Cross-Ledger Connectivity",
    narration:
      "At the top sits the global reach layer. Chain Adapters translate between UNITS Protocol and external ledgers. State commitments ensure atomic finality across jurisdictions. Multi-corridor settlement connects Singapore to Europe, Hong Kong, Japan, the US, Australia, and Korea. This is not a closed system. It is a node in a global network of interoperable financial infrastructure.",
    highlightNodes: ["cross-ledger", "cross-border"],
    highlightConnections: [
      ["dvp-wf", "cross-border"],
      ["cross-border", "cross-ledger"],
    ],
    accent: SG.finternetCyan,
  },
  {
    layerId: "all",
    title: "The Complete Architecture",
    narration:
      "From infrastructure to global connectivity, five layers working in concert. VANDA does not replace existing systems. It overlays them with a programmable, composable, and interoperable protocol. Every node you see is a deep-dive waiting to be explored. Click any node to learn more, or navigate the portal to discover the full blueprint for next-generation financial market infrastructure.",
    highlightNodes: [],
    highlightConnections: [],
    accent: SG.finternetAmber,
  },
];

const STEP_DURATION = 12000; // 12 seconds per step

/* ─── Guided Tour Component ─── */
interface GuidedTourProps {
  onHighlightLayer: (layerId: string | null) => void;
  onHighlightNodes: (nodeIds: string[]) => void;
  onHighlightConnections: (connections: [string, string][]) => void;
}

export default function GuidedTour({
  onHighlightLayer,
  onHighlightNodes,
  onHighlightConnections,
}: GuidedTourProps) {
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number>(0);

  // Start the tour
  const startTour = useCallback(() => {
    setIsActive(true);
    setCurrentStep(0);
    setIsPlaying(true);
    setProgress(0);
  }, []);

  // Stop the tour
  const stopTour = useCallback(() => {
    setIsActive(false);
    setIsPlaying(false);
    setCurrentStep(0);
    setProgress(0);
    onHighlightLayer(null);
    onHighlightNodes([]);
    onHighlightConnections([]);
    if (timerRef.current) clearInterval(timerRef.current);
  }, [onHighlightLayer, onHighlightNodes, onHighlightConnections]);

  // Go to next step
  const nextStep = useCallback(() => {
    setCurrentStep((prev) => {
      if (prev >= TOUR_STEPS.length - 1) {
        stopTour();
        return 0;
      }
      return prev + 1;
    });
    setProgress(0);
  }, [stopTour]);

  // Go to previous step
  const prevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(0, prev - 1));
    setProgress(0);
  }, []);

  // Toggle play/pause
  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  // Update highlights when step changes
  useEffect(() => {
    if (!isActive) return;
    const step = TOUR_STEPS[currentStep];
    if (!step) return;

    if (step.layerId === "all") {
      onHighlightLayer(null);
      onHighlightNodes([]);
      onHighlightConnections([]);
    } else {
      onHighlightLayer(step.layerId);
      onHighlightNodes(step.highlightNodes);
      onHighlightConnections(step.highlightConnections);
    }
  }, [currentStep, isActive, onHighlightLayer, onHighlightNodes, onHighlightConnections]);

  // Auto-advance timer
  useEffect(() => {
    if (!isActive || !isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    startTimeRef.current = Date.now();
    setProgress(0);

    timerRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const pct = Math.min(elapsed / STEP_DURATION, 1);
      setProgress(pct);

      if (pct >= 1) {
        nextStep();
      }
    }, 50);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, isPlaying, currentStep, nextStep]);

  const step = TOUR_STEPS[currentStep];

  if (!isActive) {
    return (
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        onClick={startTour}
        className="flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-medium tracking-wide cursor-pointer"
        style={{
          background: `linear-gradient(135deg, ${SG.finternetAmber}18, ${SG.finternetCyan}12)`,
          border: `1px solid ${SG.finternetAmber}30`,
          color: SG.finternetAmber,
          backdropFilter: "blur(12px)",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.borderColor = `${SG.finternetAmber}60`;
          (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 20px ${SG.finternetAmber}15`;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.borderColor = `${SG.finternetAmber}30`;
          (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
        }}
      >
        <Compass size={14} />
        GUIDED TOUR
      </motion.button>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className="w-full mt-6"
      >
        {/* Tour panel */}
        <div
          className="relative rounded-xl overflow-hidden"
          style={{
            background: "rgba(10, 15, 30, 0.85)",
            border: `1px solid ${step?.accent || SG.border}25`,
            backdropFilter: "blur(20px)",
            boxShadow: `0 0 40px ${step?.accent || SG.finternetAmber}08`,
          }}
        >
          {/* Progress bar */}
          <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: "rgba(255,255,255,0.05)" }}>
            <motion.div
              className="h-full"
              style={{
                width: `${progress * 100}%`,
                background: `linear-gradient(90deg, ${step?.accent || SG.finternetAmber}, ${step?.accent || SG.finternetAmber}80)`,
                boxShadow: `0 0 8px ${step?.accent || SG.finternetAmber}40`,
              }}
            />
          </div>

          {/* Step indicator dots */}
          <div className="flex items-center justify-center gap-1.5 pt-4 pb-2">
            {TOUR_STEPS.map((s, i) => (
              <button
                key={i}
                onClick={() => {
                  setCurrentStep(i);
                  setProgress(0);
                }}
                className="transition-all duration-300 rounded-full cursor-pointer"
                style={{
                  width: i === currentStep ? 20 : 6,
                  height: 6,
                  background: i === currentStep ? s.accent : i < currentStep ? `${s.accent}60` : "rgba(255,255,255,0.15)",
                  boxShadow: i === currentStep ? `0 0 8px ${s.accent}40` : "none",
                }}
              />
            ))}
          </div>

          {/* Content */}
          <div className="px-6 pb-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                {/* Step number and title */}
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="text-[10px] font-mono tracking-widest"
                    style={{ color: step?.accent || SG.finternetAmber, opacity: 0.7 }}
                  >
                    {String(currentStep + 1).padStart(2, "0")} / {String(TOUR_STEPS.length).padStart(2, "0")}
                  </span>
                  <div className="h-px flex-1" style={{ background: `${step?.accent || SG.border}20` }} />
                </div>

                <h3
                  className="text-lg font-semibold tracking-wide mb-2"
                  style={{ color: step?.accent || "white" }}
                >
                  {step?.title}
                </h3>

                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.6)" }}
                >
                  {step?.narration}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div
            className="flex items-center justify-between px-6 py-3"
            style={{ borderTop: `1px solid rgba(255,255,255,0.05)` }}
          >
            <button
              onClick={stopTour}
              className="flex items-center gap-1.5 text-[10px] tracking-wider cursor-pointer"
              style={{ color: "rgba(255,255,255,0.3)", transition: "color 0.2s" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.7)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.3)")}
            >
              <X size={12} />
              EXIT TOUR
            </button>

            <div className="flex items-center gap-3">
              <button
                onClick={prevStep}
                disabled={currentStep === 0}
                className="p-1.5 rounded-full cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed"
                style={{
                  color: "rgba(255,255,255,0.5)",
                  background: "rgba(255,255,255,0.05)",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  if (currentStep > 0) (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.1)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.05)";
                }}
              >
                <SkipBack size={14} />
              </button>

              <button
                onClick={togglePlay}
                className="p-2.5 rounded-full cursor-pointer"
                style={{
                  background: `${step?.accent || SG.finternetAmber}20`,
                  color: step?.accent || SG.finternetAmber,
                  border: `1px solid ${step?.accent || SG.finternetAmber}30`,
                  transition: "all 0.3s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = `${step?.accent || SG.finternetAmber}30`;
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 16px ${step?.accent || SG.finternetAmber}20`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = `${step?.accent || SG.finternetAmber}20`;
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
                }}
              >
                {isPlaying ? <Pause size={16} /> : <Play size={16} />}
              </button>

              <button
                onClick={nextStep}
                disabled={currentStep >= TOUR_STEPS.length - 1}
                className="p-1.5 rounded-full cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed"
                style={{
                  color: "rgba(255,255,255,0.5)",
                  background: "rgba(255,255,255,0.05)",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  if (currentStep < TOUR_STEPS.length - 1) (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.1)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.05)";
                }}
              >
                <SkipForward size={14} />
              </button>
            </div>

            <span
              className="text-[10px] font-mono"
              style={{ color: "rgba(255,255,255,0.2)" }}
            >
              {isPlaying ? "AUTO" : "PAUSED"}
            </span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
