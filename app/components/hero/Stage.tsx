"use client";

import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ── Abstract luxury visual ──────────────────────────────── */
function LuxuryMark() {
  return (
    <svg
      viewBox="0 0 260 340"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%" }}
      aria-hidden="true"
    >
      {/* Outer frame — portrait format */}
      <rect x="1" y="1" width="258" height="338" stroke="rgba(197,174,121,0.22)" strokeWidth="0.6" />

      {/* Inner frame — inset */}
      <rect x="14" y="14" width="232" height="312" stroke="rgba(197,174,121,0.14)" strokeWidth="0.4" />

      {/* Diagonal cross hairlines — fashion editorial detail */}
      <line x1="14" y1="14" x2="246" y2="326" stroke="rgba(197,174,121,0.07)" strokeWidth="0.4" />
      <line x1="246" y1="14" x2="14" y2="326" stroke="rgba(197,174,121,0.07)" strokeWidth="0.4" />

      {/* Horizontal mid-line */}
      <line x1="14" y1="170" x2="246" y2="170" stroke="rgba(197,174,121,0.10)" strokeWidth="0.4" />

      {/* Vertical mid-line */}
      <line x1="130" y1="14" x2="130" y2="326" stroke="rgba(197,174,121,0.10)" strokeWidth="0.4" />

      {/* Center emblem — thin gold ring */}
      <circle cx="130" cy="170" r="40" stroke="rgba(197,174,121,0.30)" strokeWidth="0.6" />
      <circle cx="130" cy="170" r="28" stroke="rgba(197,174,121,0.18)" strokeWidth="0.4" />

      {/* Center diamond */}
      <path
        d="M130 148 L152 170 L130 192 L108 170 Z"
        stroke="rgba(197,174,121,0.35)"
        strokeWidth="0.5"
        fill="rgba(197,174,121,0.03)"
      />

      {/* Corner ornaments — top-left */}
      <path d="M14 14 L34 14 M14 14 L14 34" stroke="rgba(197,174,121,0.45)" strokeWidth="0.7" />
      {/* Corner ornaments — top-right */}
      <path d="M246 14 L226 14 M246 14 L246 34" stroke="rgba(197,174,121,0.45)" strokeWidth="0.7" />
      {/* Corner ornaments — bottom-left */}
      <path d="M14 326 L34 326 M14 326 L14 306" stroke="rgba(197,174,121,0.45)" strokeWidth="0.7" />
      {/* Corner ornaments — bottom-right */}
      <path d="M246 326 L226 326 M246 326 L246 306" stroke="rgba(197,174,121,0.45)" strokeWidth="0.7" />

      {/* Top text area — "מארזים" stylised */}
      <text
        x="130"
        y="60"
        textAnchor="middle"
        fontSize="9"
        fontWeight="600"
        letterSpacing="8"
        fill="rgba(197,174,121,0.45)"
        fontFamily="system-ui, sans-serif"
      >
        מארזים
      </text>

      {/* Bottom year */}
      <text
        x="130"
        y="300"
        textAnchor="middle"
        fontSize="8"
        fontWeight="400"
        letterSpacing="5"
        fill="rgba(197,174,121,0.30)"
        fontFamily="system-ui, sans-serif"
      >
        EST. 2022
      </text>

      {/* Tick marks on frame edges — ruler-like precision */}
      {[0.25, 0.5, 0.75].map((t) => (
        <g key={t}>
          <line
            x1={14 + t * 232} y1="14"
            x2={14 + t * 232} y2="22"
            stroke="rgba(197,174,121,0.25)" strokeWidth="0.5"
          />
          <line
            x1={14 + t * 232} y1="318"
            x2={14 + t * 232} y2="326"
            stroke="rgba(197,174,121,0.25)" strokeWidth="0.5"
          />
          <line
            x1="14" y1={14 + t * 312}
            x2="22" y2={14 + t * 312}
            stroke="rgba(197,174,121,0.25)" strokeWidth="0.5"
          />
          <line
            x1="238" y1={14 + t * 312}
            x2="246" y2={14 + t * 312}
            stroke="rgba(197,174,121,0.25)" strokeWidth="0.5"
          />
        </g>
      ))}
    </svg>
  );
}

/* ── Stage ───────────────────────────────────────────────── */
export function Stage() {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        display: "flex",
        alignItems: "center",
        gap: "clamp(24px, 5vw, 72px)",
        zIndex: 3,
        pointerEvents: "none",
      }}
    >
      {/* Left vertical label — editorial flanking text */}
      <motion.p
        className="hidden-mobile"
        style={{
          fontSize: 9,
          fontWeight: 500,
          letterSpacing: "0.30em",
          textTransform: "uppercase",
          color: "rgba(240,234,214,0.28)",
          writingMode: "vertical-rl",
          textOrientation: "mixed",
          transform: "rotate(180deg)",
          margin: 0,
          userSelect: "none",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 1.2, ease: EASE }}
      >
        WE ARE
      </motion.p>

      {/* Center card — luxury editorial mark */}
      <motion.div
        style={{
          width: "clamp(130px, 17vw, 220px)",
          aspectRatio: "3 / 4",
          overflow: "hidden",
          position: "relative",
          flexShrink: 0,
          background: "rgba(12,10,8,0.6)",
          backdropFilter: "blur(2px)",
        }}
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.3, ease: EASE }}
      >
        <LuxuryMark />

        {/* Shimmer — very slow, once every 8s */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(120deg, transparent 20%, rgba(197,174,121,0.05) 50%, transparent 80%)",
            backgroundSize: "200% 100%",
          }}
          animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 7 }}
        />
      </motion.div>

      {/* Right vertical label */}
      <motion.p
        className="hidden-mobile"
        style={{
          fontSize: 9,
          fontWeight: 500,
          letterSpacing: "0.30em",
          textTransform: "uppercase",
          color: "rgba(240,234,214,0.28)",
          writingMode: "vertical-rl",
          textOrientation: "mixed",
          margin: 0,
          userSelect: "none",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 1.2, ease: EASE }}
      >
        MAARZIM®
      </motion.p>
    </div>
  );
}
