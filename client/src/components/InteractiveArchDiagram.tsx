import { useState, useRef, useEffect, useCallback } from "react";
import { useLocation } from "wouter";
import { SG } from "@/components/SGPortalNav";
import GuidedTour from "./GuidedTour";

/* ─── Layer & Node Definitions ─── */
interface ArchNode {
  id: string;
  label: string;
  href: string;
  desc: string;
}

interface ArchLayer {
  id: string;
  label: string;
  subtitle: string;
  color: string;
  y: number;
  nodes: ArchNode[];
}

const LAYERS: ArchLayer[] = [
  {
    id: "connectivity",
    label: "Cross-Ledger Connectivity",
    subtitle: "Chain Adapters · State Commitments · Global Interop",
    color: SG.finternetCyan,
    y: 0,
    nodes: [
      { id: "cross-ledger", label: "Cross-Ledger", href: "/sg/deep-dive/cross-ledger", desc: "Chain adapters, state commitments, global interoperability" },
      { id: "cross-border", label: "Cross-Border", href: "/sg/workflows/cross-border", desc: "Multi-corridor settlement across EU, HK, Japan, US, APAC" },
    ],
  },
  {
    id: "applications",
    label: "Participant Applications",
    subtitle: "Workflows · Settlement · Collateral · Tokenisation",
    color: "#8B5CF6",
    y: 1,
    nodes: [
      { id: "dvp-wf", label: "DvP Settlement", href: "/sg/workflows/dvp-settlement", desc: "Atomic delivery-versus-payment workflow" },
      { id: "gold-wf", label: "Gold Tokenisation", href: "/sg/workflows/gold-tokenisation", desc: "SBMA-grade gold lifecycle" },
      { id: "cdp-wf", label: "CDP Bridge", href: "/sg/workflows/cdp-bridge", desc: "SGX CDP proxy toket bridge" },
      { id: "collateral-wf", label: "Collateral", href: "/sg/workflows/collateral", desc: "Cross-asset collateral highway" },
    ],
  },
  {
    id: "assets",
    label: "Asset Classes (Tokets)",
    subtitle: "Equities · Fixed Income · Precious Metals · Composites",
    color: SG.finternetAmber,
    y: 2,
    nodes: [
      { id: "equities", label: "Equities", href: "/sg/deep-dive/equities", desc: "CDP proxy tokets, STI components, dividends" },
      { id: "structured", label: "Structured Notes", href: "/sg/deep-dive/structured-notes", desc: "5 note types, Marketnode integration" },
      { id: "precious", label: "Precious Metals", href: "/sg/deep-dive/precious-metals", desc: "SBMA + LBMA gold & silver gram-tokets" },
      { id: "p-tokets", label: "P-Tokets", href: "/sg/deep-dive/p-tokets", desc: "Composable portfolio tokens" },
      { id: "unsponsored", label: "Unsponsored", href: "/sg/deep-dive/unsponsored-tokets", desc: "Global access via depositary receipts" },
    ],
  },
  {
    id: "protocol",
    label: "UNITS Protocol Layer",
    subtitle: "tokenClasses · tokenPools · UILP · Wallets · Settlement",
    color: SG.nusOrange,
    y: 3,
    nodes: [
      { id: "units", label: "UNITS Protocol", href: "/sg/deep-dive/units", desc: "The universal protocol layer" },
      { id: "token-programs", label: "Token Programs", href: "/sg/deep-dive/token-programs", desc: "Pre/post-hook programmable lifecycle" },
      { id: "tokenisation", label: "Tokenisation", href: "/sg/deep-dive/tokenisation", desc: "tokenClasses, tokenPools, minting" },
      { id: "wallets", label: "Wallets & Registers", href: "/sg/deep-dive/wallet-register", desc: "BYOW, native & proxy modes" },
      { id: "dvp-dd", label: "DvP Settlement", href: "/sg/deep-dive/dvp-settlement", desc: "Atomic settlement engine" },
    ],
  },
  {
    id: "infrastructure",
    label: "Infrastructure & GL1",
    subtitle: "SGX CDP · MAS MEPS+ · GL1 Standards · MAS Observer",
    color: SG.masTeal,
    y: 4,
    nodes: [
      { id: "sgx-cdp", label: "SGX CDP", href: "/sg/deep-dive/equities", desc: "Equities and corporate bonds depository" },
      { id: "meps", label: "MAS MEPS+", href: "/sg/deep-dive/dvp-settlement", desc: "Government securities and SGD RTGS" },
      { id: "gl1", label: "GL1 Standards", href: "/sg/architecture", desc: "Global Layer One compliance" },
      { id: "observer", label: "MAS Observer", href: "/sg/architecture", desc: "Real-time supervisory node" },
    ],
  },
];

/* ─── Connection Lines Between Layers ─── */
interface Connection {
  from: string;
  to: string;
}

const CONNECTIONS: Connection[] = [
  { from: "units", to: "equities" },
  { from: "units", to: "structured" },
  { from: "units", to: "precious" },
  { from: "token-programs", to: "p-tokets" },
  { from: "tokenisation", to: "unsponsored" },
  { from: "equities", to: "cdp-wf" },
  { from: "precious", to: "gold-wf" },
  { from: "equities", to: "dvp-wf" },
  { from: "p-tokets", to: "collateral-wf" },
  { from: "dvp-wf", to: "cross-border" },
  { from: "cross-border", to: "cross-ledger" },
  { from: "sgx-cdp", to: "units" },
  { from: "meps", to: "dvp-dd" },
  { from: "gl1", to: "wallets" },
  { from: "observer", to: "token-programs" },
];

/* ─── Layout Constants ─── */
const LAYER_HEIGHT = 90;
const LAYER_GAP = 16;
const NODE_HEIGHT = 52;
const NODE_RADIUS = 10;
const PADDING_X = 20;
const PADDING_Y = 30;
const TOTAL_HEIGHT = LAYERS.length * LAYER_HEIGHT + (LAYERS.length - 1) * LAYER_GAP + PADDING_Y * 2;

/* ─── Component ─── */
export default function InteractiveArchDiagram() {
  const [, navigate] = useLocation();
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [hoveredLayer, setHoveredLayer] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; label: string; desc: string } | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ width: 900, height: TOTAL_HEIGHT });
  const [animPhase, setAnimPhase] = useState(0);

  // Guided Tour state
  const [tourHighlightLayer, setTourHighlightLayer] = useState<string | null>(null);
  const [tourHighlightNodes, setTourHighlightNodes] = useState<string[]>([]);
  const [tourHighlightConnections, setTourHighlightConnections] = useState<[string, string][]>([]);
  const isTourActive = tourHighlightLayer !== null || tourHighlightNodes.length > 0;

  // Responsive width
  useEffect(() => {
    const updateDims = () => {
      if (containerRef.current) {
        const w = containerRef.current.clientWidth;
        setDims({ width: Math.max(w, 320), height: TOTAL_HEIGHT });
      }
    };
    updateDims();
    window.addEventListener("resize", updateDims);
    return () => window.removeEventListener("resize", updateDims);
  }, []);

  // Entrance animation
  useEffect(() => {
    const timer = setTimeout(() => setAnimPhase(1), 200);
    return () => clearTimeout(timer);
  }, []);

  // Calculate node positions
  const getNodePositions = useCallback(() => {
    const positions: Record<string, { x: number; y: number; w: number; h: number }> = {};
    const usableWidth = dims.width - PADDING_X * 2;

    LAYERS.forEach((layer) => {
      const layerY = PADDING_Y + layer.y * (LAYER_HEIGHT + LAYER_GAP);
      const nodeCount = layer.nodes.length;
      const nodeWidth = Math.min(150, (usableWidth - (nodeCount - 1) * 8) / nodeCount);
      const totalNodesWidth = nodeCount * nodeWidth + (nodeCount - 1) * 8;
      const startX = PADDING_X + (usableWidth - totalNodesWidth) / 2;

      layer.nodes.forEach((node, i) => {
        positions[node.id] = {
          x: startX + i * (nodeWidth + 8),
          y: layerY + 30,
          w: nodeWidth,
          h: NODE_HEIGHT,
        };
      });
    });
    return positions;
  }, [dims.width]);

  const nodePositions = getNodePositions();

  const getNodeLayer = (nodeId: string): ArchLayer | undefined => {
    return LAYERS.find(l => l.nodes.some(n => n.id === nodeId));
  };

  const getNode = (nodeId: string): ArchNode | undefined => {
    for (const layer of LAYERS) {
      const node = layer.nodes.find(n => n.id === nodeId);
      if (node) return node;
    }
    return undefined;
  };

  const handleNodeClick = (nodeId: string) => {
    const node = getNode(nodeId);
    if (node) navigate(node.href);
  };

  const handleNodeHover = (nodeId: string | null, e?: React.MouseEvent) => {
    if (isTourActive) return; // Disable manual hover during tour
    setHoveredNode(nodeId);
    if (nodeId && e) {
      const node = getNode(nodeId);
      const layer = getNodeLayer(nodeId);
      if (node && layer) {
        setHoveredLayer(layer.id);
        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) {
          setTooltip({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top - 60,
            label: node.label,
            desc: node.desc,
          });
        }
      }
    } else {
      setHoveredLayer(null);
      setTooltip(null);
    }
  };

  // Check if a connection is active (manual hover OR tour highlight)
  const isConnectionActive = (conn: Connection) => {
    // Tour mode
    if (isTourActive) {
      return tourHighlightConnections.some(
        ([from, to]) => (conn.from === from && conn.to === to) || (conn.from === to && conn.to === from)
      );
    }
    // Manual hover
    if (!hoveredNode) return false;
    return conn.from === hoveredNode || conn.to === hoveredNode;
  };

  // Check if a node is highlighted (manual hover OR tour highlight)
  const isNodeHighlighted = (nodeId: string) => {
    if (isTourActive) {
      if (tourHighlightNodes.length === 0) return true; // "all" step: everything highlighted
      return tourHighlightNodes.includes(nodeId);
    }
    return hoveredNode === nodeId;
  };

  // Check if a node is dimmed
  const isNodeDimmed = (nodeId: string) => {
    if (isTourActive) {
      if (tourHighlightNodes.length === 0) return false; // "all" step: nothing dimmed
      return !tourHighlightNodes.includes(nodeId) &&
        !tourHighlightConnections.some(([from, to]) => from === nodeId || to === nodeId);
    }
    if (!hoveredNode) return false;
    return nodeId !== hoveredNode &&
      !CONNECTIONS.some(c => isConnectionActive(c) && (c.from === nodeId || c.to === nodeId));
  };

  // Check if a layer is highlighted
  const isLayerHighlighted = (layerId: string) => {
    if (isTourActive) {
      if (tourHighlightLayer === "all" || !tourHighlightLayer) return tourHighlightNodes.length === 0;
      return tourHighlightLayer === layerId;
    }
    return hoveredLayer === layerId;
  };

  return (
    <div ref={containerRef} className="relative w-full" style={{ minHeight: TOTAL_HEIGHT }}>
      {/* Tooltip */}
      {tooltip && !isTourActive && (
        <div
          className="absolute z-50 pointer-events-none px-3 py-2 rounded-lg text-xs max-w-[200px]"
          style={{
            left: Math.min(tooltip.x, dims.width - 210),
            top: Math.max(tooltip.y, 0),
            background: "rgba(10, 15, 30, 0.95)",
            border: `1px solid ${SG.border}`,
            backdropFilter: "blur(12px)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
          }}
        >
          <div className="font-semibold text-white/90 mb-0.5">{tooltip.label}</div>
          <div style={{ color: "rgba(255,255,255,0.5)" }}>{tooltip.desc}</div>
          <div className="mt-1 text-[10px]" style={{ color: SG.finternetCyan }}>Click to explore →</div>
        </div>
      )}

      <svg
        ref={svgRef}
        width={dims.width}
        height={dims.height}
        viewBox={`0 0 ${dims.width} ${dims.height}`}
        className="w-full"
        style={{ overflow: "visible" }}
      >
        <defs>
          {LAYERS.map(layer => (
            <filter key={`glow-${layer.id}`} id={`glow-${layer.id}`} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feFlood floodColor={layer.color} floodOpacity="0.3" />
              <feComposite in2="blur" operator="in" />
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          ))}

          <pattern id="pulse-dots" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
            <circle cx="4" cy="4" r="1" fill="rgba(255,255,255,0.3)">
              <animate attributeName="opacity" values="0.1;0.5;0.1" dur="2s" repeatCount="indefinite" />
            </circle>
          </pattern>

          {CONNECTIONS.map((conn, i) => {
            const fromLayer = getNodeLayer(conn.from);
            const toLayer = getNodeLayer(conn.to);
            if (!fromLayer || !toLayer) return null;
            return (
              <linearGradient key={`grad-${i}`} id={`conn-grad-${i}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={fromLayer.color} stopOpacity="0.4" />
                <stop offset="100%" stopColor={toLayer.color} stopOpacity="0.4" />
              </linearGradient>
            );
          })}
        </defs>

        {/* Background grid */}
        <g opacity={0.03}>
          {Array.from({ length: Math.floor(dims.width / 40) }).map((_, i) => (
            <line key={`vg-${i}`} x1={i * 40} y1={0} x2={i * 40} y2={dims.height} stroke="white" strokeWidth="0.5" />
          ))}
          {Array.from({ length: Math.floor(dims.height / 40) }).map((_, i) => (
            <line key={`hg-${i}`} x1={0} y1={i * 40} x2={dims.width} y2={i * 40} stroke="white" strokeWidth="0.5" />
          ))}
        </g>

        {/* Connection lines */}
        <g>
          {CONNECTIONS.map((conn, i) => {
            const fromPos = nodePositions[conn.from];
            const toPos = nodePositions[conn.to];
            if (!fromPos || !toPos) return null;

            const fromCx = fromPos.x + fromPos.w / 2;
            const fromCy = fromPos.y + fromPos.h / 2;
            const toCx = toPos.x + toPos.w / 2;
            const toCy = toPos.y + toPos.h / 2;

            const active = isConnectionActive(conn);
            const midY = (fromCy + toCy) / 2;

            // During tour, dim non-active connections more aggressively
            const baseOpacity = isTourActive
              ? (active ? 0.8 : 0.04)
              : (hoveredNode ? (active ? 1 : 0.1) : 0.25);

            return (
              <g key={`conn-${i}`}>
                <path
                  d={`M ${fromCx} ${fromCy} C ${fromCx} ${midY}, ${toCx} ${midY}, ${toCx} ${toCy}`}
                  fill="none"
                  stroke={active ? "rgba(255,255,255,0.5)" : `url(#conn-grad-${i})`}
                  strokeWidth={active ? 2.5 : 1}
                  strokeDasharray={active ? "none" : "4 4"}
                  opacity={baseOpacity}
                  style={{ transition: "all 0.6s ease" }}
                />
                {active && (
                  <circle r="3" fill="white" opacity="0.8">
                    <animateMotion
                      dur="1.5s"
                      repeatCount="indefinite"
                      path={`M ${fromCx} ${fromCy} C ${fromCx} ${midY}, ${toCx} ${midY}, ${toCx} ${toCy}`}
                    />
                  </circle>
                )}
              </g>
            );
          })}
        </g>

        {/* Layer backgrounds and labels */}
        {LAYERS.map((layer, li) => {
          const layerY = PADDING_Y + layer.y * (LAYER_HEIGHT + LAYER_GAP);
          const highlighted = isLayerHighlighted(layer.id);
          const opacity = animPhase === 0 ? 0 : 1;
          const translateY = animPhase === 0 ? 20 : 0;

          return (
            <g
              key={layer.id}
              style={{
                opacity,
                transform: `translateY(${translateY}px)`,
                transition: `all 0.6s ease ${li * 0.1}s`,
              }}
            >
              <rect
                x={PADDING_X - 8}
                y={layerY - 4}
                width={dims.width - PADDING_X * 2 + 16}
                height={LAYER_HEIGHT + 8}
                rx={12}
                fill={highlighted ? `${layer.color}10` : "transparent"}
                stroke={highlighted ? `${layer.color}30` : `${layer.color}08`}
                strokeWidth={highlighted ? 1.5 : 1}
                style={{ transition: "all 0.5s ease" }}
              />

              <text
                x={PADDING_X}
                y={layerY + 14}
                fill={layer.color}
                fontSize="10"
                fontWeight="600"
                letterSpacing="0.05em"
                opacity={highlighted ? 1 : 0.7}
                style={{ transition: "opacity 0.5s ease" }}
              >
                {layer.label.toUpperCase()}
              </text>
              <text
                x={PADDING_X}
                y={layerY + 25}
                fill="rgba(255,255,255,0.25)"
                fontSize="8"
              >
                {layer.subtitle}
              </text>
            </g>
          );
        })}

        {/* Nodes */}
        {LAYERS.map((layer, li) => {
          const opacity = animPhase === 0 ? 0 : 1;
          const translateY = animPhase === 0 ? 20 : 0;

          return layer.nodes.map((node, ni) => {
            const pos = nodePositions[node.id];
            if (!pos) return null;
            const highlighted = isNodeHighlighted(node.id);
            const dimmed = isNodeDimmed(node.id);

            return (
              <g
                key={node.id}
                style={{
                  cursor: "pointer",
                  opacity: dimmed ? 0.12 : opacity,
                  transform: `translateY(${translateY}px) ${highlighted && isTourActive ? "scale(1.02)" : ""}`,
                  transition: `all 0.5s ease ${li * 0.1 + ni * 0.05}s`,
                  transformOrigin: `${pos.x + pos.w / 2}px ${pos.y + pos.h / 2}px`,
                }}
                onClick={() => handleNodeClick(node.id)}
                onMouseEnter={(e) => handleNodeHover(node.id, e)}
                onMouseLeave={() => handleNodeHover(null)}
              >
                {/* Node glow on highlight */}
                {highlighted && (
                  <rect
                    x={pos.x - 2}
                    y={pos.y - 2}
                    width={pos.w + 4}
                    height={pos.h + 4}
                    rx={NODE_RADIUS + 2}
                    fill="none"
                    stroke={layer.color}
                    strokeWidth={isTourActive ? 2.5 : 2}
                    opacity={isTourActive ? 0.7 : 0.5}
                    filter={`url(#glow-${layer.id})`}
                    style={{ transition: "all 0.5s ease" }}
                  />
                )}

                <rect
                  x={pos.x}
                  y={pos.y}
                  width={pos.w}
                  height={pos.h}
                  rx={NODE_RADIUS}
                  fill={highlighted ? `${layer.color}18` : `${layer.color}08`}
                  stroke={highlighted ? `${layer.color}60` : `${layer.color}20`}
                  strokeWidth={highlighted ? 1.5 : 1}
                  style={{ transition: "all 0.3s ease" }}
                />

                <text
                  x={pos.x + pos.w / 2}
                  y={pos.y + pos.h / 2 - 4}
                  textAnchor="middle"
                  fill={highlighted ? "white" : "rgba(255,255,255,0.75)"}
                  fontSize={pos.w < 120 ? "9" : "10"}
                  fontWeight="500"
                  style={{ transition: "fill 0.3s ease" }}
                >
                  {node.label}
                </text>

                <text
                  x={pos.x + pos.w / 2}
                  y={pos.y + pos.h / 2 + 10}
                  textAnchor="middle"
                  fill={highlighted ? layer.color : "rgba(255,255,255,0.2)"}
                  fontSize="7"
                  style={{ transition: "fill 0.3s ease" }}
                >
                  {highlighted ? "Click to explore →" : "Deep Dive"}
                </text>

                <circle
                  cx={pos.x + pos.w - 8}
                  cy={pos.y + 8}
                  r={highlighted ? 4 : 2.5}
                  fill={layer.color}
                  opacity={highlighted ? 0.9 : 0.4}
                  style={{ transition: "all 0.3s ease" }}
                >
                  {highlighted && (
                    <animate attributeName="r" values="2.5;4.5;2.5" dur="1.5s" repeatCount="indefinite" />
                  )}
                </circle>
              </g>
            );
          });
        })}

        {/* Animated data flow particles */}
        {[0, 1, 2].map(i => {
          const conn = CONNECTIONS[i * 4];
          if (!conn) return null;
          const fromPos = nodePositions[conn.from];
          const toPos = nodePositions[conn.to];
          if (!fromPos || !toPos) return null;
          const fromCx = fromPos.x + fromPos.w / 2;
          const fromCy = fromPos.y + fromPos.h / 2;
          const toCx = toPos.x + toPos.w / 2;
          const toCy = toPos.y + toPos.h / 2;
          const midY = (fromCy + toCy) / 2;

          return (
            <circle key={`particle-${i}`} r="2" fill={SG.finternetAmber} opacity={isTourActive ? 0.2 : 0.5}>
              <animateMotion
                dur={`${3 + i}s`}
                repeatCount="indefinite"
                path={`M ${fromCx} ${fromCy} C ${fromCx} ${midY}, ${toCx} ${midY}, ${toCx} ${toCy}`}
              />
            </circle>
          );
        })}
      </svg>

      {/* Legend + Tour button */}
      <div className="flex flex-wrap items-center gap-3 mt-4 justify-center">
        {LAYERS.map(layer => (
          <div
            key={layer.id}
            className="flex items-center gap-1.5 text-[10px] cursor-default"
            onMouseEnter={() => { if (!isTourActive) setHoveredLayer(layer.id); }}
            onMouseLeave={() => { if (!isTourActive) setHoveredLayer(null); }}
            style={{
              color: isLayerHighlighted(layer.id) ? layer.color : "rgba(255,255,255,0.35)",
              transition: "color 0.3s",
            }}
          >
            <div
              className="w-2 h-2 rounded-full"
              style={{
                background: layer.color,
                opacity: isLayerHighlighted(layer.id) ? 1 : 0.5,
                transition: "opacity 0.3s",
              }}
            />
            {layer.label}
          </div>
        ))}
        <div className="mx-2 h-4 w-px" style={{ background: "rgba(255,255,255,0.1)" }} />
        <GuidedTour
          onHighlightLayer={setTourHighlightLayer}
          onHighlightNodes={setTourHighlightNodes}
          onHighlightConnections={setTourHighlightConnections}
        />
      </div>
    </div>
  );
}
