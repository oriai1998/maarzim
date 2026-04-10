"use client";

import { motion } from "framer-motion";

const TICKER = [
  "עיצוב אישי",
  "משלוח חינם",
  "500+ לקוחות",
  "48 שעות להכנה",
  "כרטיס בכתב יד",
  "מארזים פרמיום",
  "עטיפה יוקרתית",
];

export function Marquee() {
  const items = [...TICKER, ...TICKER, ...TICKER];
  return (
    <div
      style={{
        overflow: "hidden",
        padding: "16px 0",
        borderTop: "1px solid var(--gold-10)",
        borderBottom: "1px solid var(--gold-10)",
        direction: "ltr",
        background: "linear-gradient(180deg, transparent, var(--gold-06), transparent)",
      }}
      aria-hidden="true"
    >
      <motion.div
        style={{ display: "flex", gap: 56, whiteSpace: "nowrap" }}
        animate={{ x: ["0%", "-33.33%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      >
        {items.map((item, i) => (
          <span
            key={i}
            style={{
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.22em",
              fontWeight: 600,
              color: "var(--gold-55)",
              flexShrink: 0,
              display: "inline-flex",
              alignItems: "center",
              gap: 14,
            }}
          >
            <span style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--gold)", display: "inline-block" }} />
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
