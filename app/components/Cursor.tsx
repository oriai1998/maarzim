"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function Cursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const rafRef = useRef<number>(0);

  // Spring-lagged dot for smooth tracking
  const springConfig = { stiffness: 300, damping: 28, mass: 0.5 };
  const dotX = useSpring(cursorX, springConfig);
  const dotY = useSpring(cursorY, springConfig);

  // Slower spring for the outer ring
  const ringConfig = { stiffness: 120, damping: 20, mass: 0.8 };
  const ringX = useSpring(cursorX, ringConfig);
  const ringY = useSpring(cursorY, ringConfig);

  useEffect(() => {
    // Only on desktop — no touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const move = (e: MouseEvent) => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
        if (!visible) setVisible(true);
      });
    };

    const onEnter = (e: MouseEvent) => {
      const target = e.target as Element;
      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[data-cursor-hover]")
      ) {
        setHovering(true);
      }
    };

    const onLeave = () => setHovering(false);
    const onMouseOut = () => setVisible(false);
    const onMouseIn = () => setVisible(true);

    document.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseover", onEnter, { passive: true });
    document.addEventListener("mouseout", onLeave, { passive: true });
    document.addEventListener("mouseleave", onMouseOut);
    document.addEventListener("mouseenter", onMouseIn);

    return () => {
      cancelAnimationFrame(rafRef.current);
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseout", onLeave);
      document.removeEventListener("mouseleave", onMouseOut);
      document.removeEventListener("mouseenter", onMouseIn);
    };
  }, [cursorX, cursorY, visible]);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      {/* Hide default cursor */}
      <style>{`
        html { cursor: none !important; }
        a, button { cursor: none !important; }
      `}</style>

      {/* Outer ring — lags behind, expands on hover */}
      <motion.div
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: hovering ? 44 : 28,
          height: hovering ? 44 : 28,
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          borderRadius: "50%",
          border: hovering
            ? "1px solid rgba(197,174,121,0.6)"
            : "1px solid rgba(197,174,121,0.35)",
          pointerEvents: "none",
          zIndex: 9999,
          opacity: visible ? 1 : 0,
          transition: "width 0.35s cubic-bezier(0.22,1,0.36,1), height 0.35s cubic-bezier(0.22,1,0.36,1), border-color 0.25s, opacity 0.3s",
        }}
      />

      {/* Inner dot — snappy, always gold */}
      <motion.div
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: hovering ? 4 : 5,
          height: hovering ? 4 : 5,
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          borderRadius: "50%",
          background: "var(--gold)",
          pointerEvents: "none",
          zIndex: 9999,
          opacity: visible ? (hovering ? 0.7 : 1) : 0,
          transition: "width 0.2s, height 0.2s, opacity 0.3s",
        }}
      />
    </>
  );
}
