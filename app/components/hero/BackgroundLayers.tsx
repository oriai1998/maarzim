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
      {/* Outer circle — slow clockwise */}
      <motion.div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "min(92vw, 860px)",
          height: "min(92vw, 860px)",
          borderRadius: "50%",
          border: "1px solid var(--gold-14)",
          x: "-50%",
          y: "-50%",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
      />

      {/* Middle circle — counter-clockwise, slightly faster */}
      <motion.div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "min(63vw, 580px)",
          height: "min(63vw, 580px)",
          borderRadius: "50%",
          border: "1px solid var(--gold-10)",
          x: "-50%",
          y: "-50%",
        }}
        animate={{ rotate: -360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />

      {/* Inner circle — clockwise, fastest */}
      <motion.div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "min(36vw, 320px)",
          height: "min(36vw, 320px)",
          borderRadius: "50%",
          border: "1px solid var(--gold-08, rgba(197,174,121,0.08))",
          x: "-50%",
          y: "-50%",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />

      {/* Very faint center radial glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "min(50vw, 460px)",
          height: "min(50vw, 460px)",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse at center, rgba(197,174,121,0.045) 0%, transparent 70%)",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Bottom fade — ensures headline reads cleanly */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "40%",
          background:
            "linear-gradient(to top, #0A0A0A 0%, rgba(10,10,10,0.7) 50%, transparent 100%)",
        }}
      />

      {/* Top fade — nav area */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "15%",
          background:
            "linear-gradient(to bottom, rgba(10,10,10,0.5) 0%, transparent 100%)",
        }}
      />
    </div>
  );
}
