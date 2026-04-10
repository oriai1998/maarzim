"use client";

import { motion } from "framer-motion";

export function BackgroundLayers() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      {/* Outermost circle — slowest, most faint */}
      <motion.div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "min(110vw, 1040px)",
          height: "min(110vw, 1040px)",
          borderRadius: "50%",
          border: "1px solid rgba(197,174,121,0.06)",
          x: "-50%",
          y: "-50%",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
      />

      {/* Outer circle — slow clockwise */}
      <motion.div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "min(88vw, 840px)",
          height: "min(88vw, 840px)",
          borderRadius: "50%",
          border: "1px solid var(--gold-12, rgba(197,174,121,0.12))",
          x: "-50%",
          y: "-50%",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
      />

      {/* Middle circle — counter-clockwise */}
      <motion.div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "min(60vw, 560px)",
          height: "min(60vw, 560px)",
          borderRadius: "50%",
          border: "1px solid var(--gold-10)",
          x: "-50%",
          y: "-50%",
        }}
        animate={{ rotate: -360 }}
        transition={{ duration: 65, repeat: Infinity, ease: "linear" }}
      />

      {/* Inner circle — clockwise, faster */}
      <motion.div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "min(34vw, 300px)",
          height: "min(34vw, 300px)",
          borderRadius: "50%",
          border: "1px solid rgba(197,174,121,0.08)",
          x: "-50%",
          y: "-50%",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 42, repeat: Infinity, ease: "linear" }}
      />

      {/* Center radial glow — slightly more present */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "min(55vw, 500px)",
          height: "min(55vw, 500px)",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse at center, rgba(197,174,121,0.06) 0%, transparent 65%)",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Bottom gradient — longer fade so headline has full contrast */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "52%",
          background:
            "linear-gradient(to top, #0A0A0A 0%, rgba(10,10,10,0.85) 35%, rgba(10,10,10,0.4) 65%, transparent 100%)",
        }}
      />

      {/* Top fade — softens nav entry */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "20%",
          background:
            "linear-gradient(to bottom, rgba(10,10,10,0.55) 0%, transparent 100%)",
        }}
      />
    </div>
  );
}
