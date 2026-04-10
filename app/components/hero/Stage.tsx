"use client";

import { motion } from "framer-motion";
import { SITE } from "@/lib/config";

const EASE = [0.32, 0.72, 0, 1] as const;

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
        gap: "clamp(20px, 4vw, 60px)",
        zIndex: 3,
        pointerEvents: "none",
      }}
    >
      {/* Left vertical label — "אנחנו הם" */}
      <motion.p
        className="hidden-mobile"
        style={{
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: "0.24em",
          textTransform: "uppercase",
          color: "var(--cream-mute)",
          writingMode: "vertical-rl",
          textOrientation: "mixed",
          transform: "rotate(180deg)",
          margin: 0,
          userSelect: "none",
        }}
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.9, duration: 0.8, ease: EASE }}
      >
        אנחנו הם
      </motion.p>

      {/* Center photo card — portrait format like Dulcedo */}
      <motion.div
        style={{
          width: "clamp(120px, 16vw, 210px)",
          aspectRatio: "3 / 4",
          overflow: "hidden",
          position: "relative",
          border: "1px solid var(--gold-20)",
          flexShrink: 0,
        }}
        initial={{ opacity: 0, scale: 0.85, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.35, ease: EASE }}
      >
        {/* Dark tinted placeholder — replace with <Image> when real photo is available */}
        <div
          style={{
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(160deg, #1c1810 0%, #0d0b08 45%, #171208 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Gift box mark — editorial tone */}
          <svg
            viewBox="0 0 64 80"
            fill="none"
            width="52"
            height="64"
            aria-hidden="true"
          >
            {/* Box body */}
            <rect
              x="6"
              y="34"
              width="52"
              height="38"
              stroke="rgba(197,174,121,0.35)"
              strokeWidth="0.8"
            />
            {/* Lid */}
            <rect
              x="4"
              y="26"
              width="56"
              height="10"
              stroke="rgba(197,174,121,0.35)"
              strokeWidth="0.8"
            />
            {/* Vertical ribbon */}
            <line
              x1="32"
              y1="26"
              x2="32"
              y2="72"
              stroke="rgba(197,174,121,0.25)"
              strokeWidth="0.8"
            />
            {/* Horizontal ribbon on lid */}
            <line
              x1="4"
              y1="31"
              x2="60"
              y2="31"
              stroke="rgba(197,174,121,0.25)"
              strokeWidth="0.8"
            />
            {/* Bow left */}
            <path
              d="M32 26 C28 18 18 20 20 26"
              stroke="rgba(197,174,121,0.4)"
              strokeWidth="0.8"
              fill="none"
            />
            {/* Bow right */}
            <path
              d="M32 26 C36 18 46 20 44 26"
              stroke="rgba(197,174,121,0.4)"
              strokeWidth="0.8"
              fill="none"
            />
          </svg>
        </div>

        {/* Subtle shimmer sweep */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(115deg, transparent 25%, rgba(197,174,121,0.07) 50%, transparent 75%)",
            backgroundSize: "200% 100%",
          }}
          animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "linear",
            repeatDelay: 4,
          }}
        />
      </motion.div>

      {/* Right vertical label — brand name */}
      <motion.p
        className="hidden-mobile"
        style={{
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: "0.24em",
          textTransform: "uppercase",
          color: "var(--cream-mute)",
          writingMode: "vertical-rl",
          textOrientation: "mixed",
          margin: 0,
          userSelect: "none",
        }}
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.9, duration: 0.8, ease: EASE }}
      >
        {SITE.name}®
      </motion.p>
    </div>
  );
}
