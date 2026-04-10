"use client";

import { motion } from "framer-motion";
import { Reveal } from "./Reveal";

const STATS = [
  { number: "500+", label: "לקוחות מרוצים" },
  { number: "3", label: "שנות ניסיון" },
  { number: "48h", label: "זמן משלוח" },
  { number: "4.9", label: "דירוג ממוצע" },
] as const;

export function Stats() {
  return (
    <section
      id="stats"
      style={{
        position: "relative",
        zIndex: 10,
        borderTop: "1px solid var(--gold-14)",
        borderBottom: "1px solid var(--gold-14)",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 clamp(24px, 5vw, 80px)",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
        }}
      >
        {STATS.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 0.07}>
            <motion.div
              style={{
                padding: "clamp(48px, 7vw, 88px) clamp(16px, 3vw, 40px)",
                borderRight:
                  i < STATS.length - 1 ? "1px solid var(--gold-14)" : "none",
                textAlign: "center",
                cursor: "default",
              }}
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
            >
              {/* Big number */}
              <div
                style={{
                  fontSize: "clamp(38px, 5.5vw, 76px)",
                  fontWeight: 900,
                  letterSpacing: "-0.045em",
                  lineHeight: 1,
                  color: "var(--gold)",
                  marginBottom: 14,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {stat.number}
              </div>

              {/* Label */}
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--cream-mute)",
                  lineHeight: 1.4,
                }}
              >
                {stat.label}
              </div>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
