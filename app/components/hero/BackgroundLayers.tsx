"use client";

import { motion } from "framer-motion";

const AURORA_BLOBS: Array<{
  id: string;
  size: number;
  x: string[];
  y: string[];
  opacity: number;
  duration: number;
}> = [
  { id: "a", size: 700, x: ["15%", "35%", "20%", "15%"], y: ["-5%", "10%", "5%", "-5%"], opacity: 0.055, duration: 28 },
  { id: "b", size: 500, x: ["60%", "45%", "70%", "60%"], y: ["10%", "25%", "5%", "10%"], opacity: 0.04, duration: 22 },
  { id: "c", size: 400, x: ["40%", "55%", "30%", "40%"], y: ["50%", "35%", "60%", "50%"], opacity: 0.03, duration: 34 },
];

export function BackgroundLayers() {
  return (
    <div
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}
    >
      {/* Aurora blobs */}
      {AURORA_BLOBS.map((blob) => (
        <motion.div
          key={blob.id}
          style={{
            position: "absolute",
            width: blob.size,
            height: blob.size,
            borderRadius: "50%",
            background: "radial-gradient(ellipse, var(--gold) 0%, transparent 70%)",
            opacity: blob.opacity,
            translateX: "-50%",
            translateY: "-50%",
            willChange: "left, top",
          }}
          animate={{ left: blob.x, top: blob.y }}
          transition={{
            duration: blob.duration,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Subtle grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cpath d='M 60 0 L 0 0 0 60' fill='none' stroke='rgba(196,153,58,0.07)' stroke-width='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, transparent 30%, black 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, transparent 30%, black 100%)",
        }}
      />

      {/* Vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 100% 80% at 50% 120%, rgba(8,6,8,0.85) 0%, transparent 60%)",
        }}
      />
    </div>
  );
}
