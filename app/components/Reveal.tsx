"use client";

import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode, type CSSProperties } from "react";

// Refined easing — ease-out-quart, not spring (cleaner for scroll reveals)
const EASE = [0.22, 1, 0.36, 1] as const;

interface Props {
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: CSSProperties;
  y?: number;
}

export function Reveal({ children, delay = 0, className, style, y = 24 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  // Larger margin = triggers earlier, feels more natural
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      // No blur — blur makes reveals look cheap. Pure opacity + y is cleaner.
      transition={{ duration: 0.65, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
