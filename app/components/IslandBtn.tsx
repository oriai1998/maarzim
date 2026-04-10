"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  href?: string;
  dark?: boolean;
  ariaLabel?: string;
  onClick?: () => void;
  external?: boolean;
}

export function IslandBtn({ children, href, dark = false, ariaLabel, onClick, external }: Props) {
  const isExternal = external ?? (href?.startsWith("http") || href?.startsWith("https://wa.me"));

  const content = (
    <motion.span
      className="inline-flex items-center gap-3"
      style={{
        padding: "13px 13px 13px 22px",
        borderRadius: 9999,
        background: dark ? "var(--gold-10)" : "var(--gold)",
        border: dark ? "1px solid var(--gold-30)" : "1px solid transparent",
        cursor: "pointer",
        color: dark ? "var(--gold-light)" : "#0A0806",
        fontSize: 14,
        fontWeight: 700,
        lineHeight: 1,
        willChange: "transform",
      }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 360, damping: 26 }}
    >
      <span>{children}</span>
      <span
        aria-hidden="true"
        style={{
          width: 30,
          height: 30,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: dark ? "var(--gold-20)" : "rgba(0,0,0,0.15)",
          fontSize: 13,
          flexShrink: 0,
        }}
      >
        ↗
      </span>
    </motion.span>
  );

  if (href) {
    return (
      <a
        href={href}
        aria-label={ariaLabel}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
      >
        {content}
      </a>
    );
  }

  return (
    <button type="button" aria-label={ariaLabel} onClick={onClick} style={{ background: "none", border: "none", padding: 0 }}>
      {content}
    </button>
  );
}
