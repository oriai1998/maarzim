"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

/* ── Orbiting decorative elements ───────────────────────── */
const ORBITALS = [
  {
    id: "ribbon",
    size: 36,
    orbitR: 200,
    startAngle: 20,
    duration: 18,
    delay: 0,
    floatY: 6,
    svg: (
      <svg viewBox="0 0 36 36" fill="none">
        <path
          d="M18 4 C11 4 8 9 10 14 C12 18 16 17 18 15 C20 17 24 18 26 14 C28 9 25 4 18 4 Z"
          fill="#C4993A"
          opacity="0.9"
        />
        <path d="M18 15 L15 32 M18 15 L21 32" stroke="#C4993A" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="18" cy="15" r="2.5" fill="#E2BC6D" />
      </svg>
    ),
  },
  {
    id: "star",
    size: 24,
    orbitR: 175,
    startAngle: 120,
    duration: 24,
    delay: 2,
    floatY: 8,
    svg: (
      <svg viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"
          fill="#E2BC6D"
          opacity="0.85"
        />
      </svg>
    ),
  },
  {
    id: "leaf",
    size: 28,
    orbitR: 210,
    startAngle: 220,
    duration: 30,
    delay: 4,
    floatY: 5,
    svg: (
      <svg viewBox="0 0 28 28" fill="none">
        <path
          d="M14 3 C6 3 3 10 5 16 C7 22 12 24 14 24 C16 24 19 20 20 16 C22 10 22 3 14 3 Z"
          fill="#C4993A"
          opacity="0.7"
        />
        <path d="M14 24 L14 26" stroke="#C4993A" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M14 10 Q 18 14 14 18" stroke="#E2BC6D" strokeWidth="0.8" fill="none" opacity="0.8" />
      </svg>
    ),
  },
  {
    id: "gem",
    size: 20,
    orbitR: 190,
    startAngle: 310,
    duration: 20,
    delay: 1,
    floatY: 10,
    svg: (
      <svg viewBox="0 0 20 20" fill="none">
        <polygon
          points="10,2 18,8 15,18 5,18 2,8"
          fill="#E2BC6D"
          opacity="0.75"
        />
        <polygon points="10,2 14,7 10,6 6,7" fill="#F0E6D0" opacity="0.4" />
      </svg>
    ),
  },
] as const;

/* ── Exclusive box SVG ───────────────────────────────────── */
function ExclusiveBoxLarge() {
  return (
    <svg viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ width: "100%", height: "100%" }}>
      <defs>
        <radialGradient id="s-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#C4993A" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#C4993A" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="s-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#251c10" />
          <stop offset="100%" stopColor="#0c0906" />
        </linearGradient>
        <linearGradient id="s-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E2BC6D" />
          <stop offset="100%" stopColor="#C4993A" />
        </linearGradient>
        <filter id="s-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="12" stdDeviation="20" floodColor="#000" floodOpacity="0.5" />
        </filter>
      </defs>

      {/* Background glow */}
      <circle cx="160" cy="160" r="130" fill="url(#s-glow)" />

      {/* Box body */}
      <rect x="55" y="120" width="210" height="140" rx="4" fill="url(#s-body)" stroke="url(#s-gold)" strokeWidth="1.5" filter="url(#s-shadow)" />

      {/* Inner border */}
      <rect x="64" y="129" width="192" height="122" rx="2" fill="none" stroke="#C4993A" strokeOpacity="0.35" strokeWidth="0.8" />

      {/* Lid */}
      <rect x="50" y="105" width="220" height="26" rx="4" fill="#1a1208" stroke="url(#s-gold)" strokeWidth="1.5" />
      <rect x="58" y="112" width="204" height="12" rx="2" fill="#221810" />

      {/* Corner ornaments */}
      <g fill="#C4993A" opacity="0.7">
        <path d="M64 129 L78 129 L64 143 Z" />
        <path d="M256 129 L242 129 L256 143 Z" />
        <path d="M64 251 L78 251 L64 237 Z" />
        <path d="M256 251 L242 251 L256 237 Z" />
      </g>

      {/* Center medallion */}
      <circle cx="160" cy="190" r="28" fill="#0c0906" stroke="url(#s-gold)" strokeWidth="2" />
      <circle cx="160" cy="190" r="21" fill="none" stroke="#C4993A" strokeOpacity="0.5" strokeWidth="0.6" />
      <text x="160" y="197" textAnchor="middle" fontSize="22" fontWeight="900" fill="url(#s-gold)" fontFamily="serif">✦</text>

      {/* Ribbon vertical */}
      <rect x="152" y="105" width="16" height="156" fill="url(#s-gold)" opacity="0.2" />
      <rect x="155" y="105" width="10" height="156" fill="url(#s-gold)" opacity="0.3" />

      {/* Crown */}
      <g transform="translate(160 88) scale(1.4)">
        <path d="M-16 8 L-16 0 L-10 5 L-5 -5 L0 3 L5 -5 L10 5 L16 0 L16 8 Z" fill="url(#s-gold)" stroke="#E2BC6D" strokeWidth="0.4" />
        <rect x="-16" y="8" width="32" height="2.5" fill="#C4993A" />
        <circle cx="-10" cy="0" r="1.8" fill="#F0E6D0" opacity="0.9" />
        <circle cx="0" cy="-4" r="1.8" fill="#F0E6D0" opacity="0.9" />
        <circle cx="10" cy="0" r="1.8" fill="#F0E6D0" opacity="0.9" />
      </g>

      {/* Floor shadow */}
      <ellipse cx="160" cy="268" rx="80" ry="8" fill="#000" opacity="0.4" />
    </svg>
  );
}

/* ── Main Stage ──────────────────────────────────────────── */
export function Stage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const springConfig = { stiffness: 80, damping: 20, mass: 1 };
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [4, -4]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-5, 5]), springConfig);

  useEffect(() => {
    if (reducedMotion) return;
    const el = containerRef.current?.closest("section");
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left - rect.width / 2);
      mouseY.set(e.clientY - rect.top - rect.height / 2);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY, reducedMotion]);

  return (
    <div
      ref={containerRef}
      className="show-desktop-stage"
      style={{
        position: "relative",
        width: "clamp(240px, 38vw, 400px)",
        height: "clamp(240px, 38vw, 400px)",
        flexShrink: 0,
      }}
    >
      {/* Orbiting elements */}
      {!reducedMotion &&
        ORBITALS.map((orb) => (
          <motion.div
            key={orb.id}
            style={{
              position: "absolute",
              width: orb.size,
              height: orb.size,
              top: "50%",
              left: "50%",
              zIndex: 2,
            }}
            animate={{
              rotate: [orb.startAngle, orb.startAngle + 360],
              x: [
                Math.cos((orb.startAngle * Math.PI) / 180) * orb.orbitR - orb.size / 2,
                Math.cos(((orb.startAngle + 360) * Math.PI) / 180) * orb.orbitR - orb.size / 2,
              ],
              y: [
                Math.sin((orb.startAngle * Math.PI) / 180) * orb.orbitR - orb.size / 2,
                Math.sin(((orb.startAngle + 360) * Math.PI) / 180) * orb.orbitR - orb.size / 2,
              ],
            }}
            transition={{
              duration: orb.duration,
              delay: orb.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <motion.div
              style={{ width: "100%", height: "100%" }}
              animate={{ y: [0, -orb.floatY, 0] }}
              transition={{ duration: orb.duration * 0.4, repeat: Infinity, ease: "easeInOut", delay: orb.delay }}
            >
              {orb.svg}
            </motion.div>
          </motion.div>
        ))}

      {/* Main box */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 3,
          rotateX: reducedMotion ? 0 : rotateX,
          rotateY: reducedMotion ? 0 : rotateY,
          transformPerspective: 1200,
          transformStyle: "preserve-3d",
        }}
        initial={{ opacity: 0, scale: 0.8, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.3, ease: [0.32, 0.72, 0, 1] }}
      >
        <motion.div
          style={{ width: "100%", height: "100%" }}
          animate={reducedMotion ? {} : { y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ExclusiveBoxLarge />
        </motion.div>
      </motion.div>

      {/* Glow under box */}
      <motion.div
        style={{
          position: "absolute",
          bottom: "0%",
          left: "50%",
          translateX: "-50%",
          width: "70%",
          height: 40,
          background: "radial-gradient(ellipse, var(--gold) 0%, transparent 70%)",
          opacity: 0.18,
          filter: "blur(12px)",
          zIndex: 1,
        }}
        animate={reducedMotion ? {} : { opacity: [0.18, 0.28, 0.18], scaleX: [1, 1.15, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
