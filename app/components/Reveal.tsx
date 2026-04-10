"use client";

import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode, type CSSProperties } from "react";

const EASE = [0.32, 0.72, 0, 1] as const;

interface Props {
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: CSSProperties;
  y?: number;
  as?: "div" | "section" | "article";
}

export function Reveal({ children, delay = 0, className, style, y = 28 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
