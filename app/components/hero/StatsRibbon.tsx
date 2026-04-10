"use client";

import { motion } from "framer-motion";
import { SITE } from "@/lib/config";

const STATS = [
  { value: SITE.customersCount, label: "לקוחות מרוצים" },
  { value: "48h", label: "זמן הכנה" },
  { value: "מ-₪149", label: "לכל כיס" },
];

const EASE = [0.32, 0.72, 0, 1] as const;

export function StatsRibbon() {
  return (
    <motion.div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
        width: "100%",
        maxWidth: 620,
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.1, ease: EASE }}
    >
      {/* Label */}
      <p
        style={{
          fontSize: 10,
          textTransform: "uppercase",
          letterSpacing: "0.22em",
          color: "var(--gold-55)",
          fontWeight: 600,
        }}
      >
        המספרים מדברים בעדם
      </p>

      {/* Glass ribbon */}
      <div
        style={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1fr 1px 1fr 1px 1fr",
          alignItems: "center",
          padding: "18px 28px",
          borderRadius: 9999,
          background: "rgba(16,12,8,0.65)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid var(--gold-20)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 var(--gold-10)",
        }}
      >
        {STATS.map(({ value, label }, i) => (
          i < 3 ? (
            <>
              <StatItem key={label} value={value} label={label} />
              {i < 2 && (
                <div
                  key={`div-${i}`}
                  style={{ width: 1, height: 36, background: "var(--gold-20)" }}
                />
              )}
            </>
          ) : null
        ))}
      </div>
    </motion.div>
  );
}

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <motion.div
      style={{ textAlign: "center", padding: "0 8px", cursor: "default" }}
      whileHover={{ scale: 1.06 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
    >
      <motion.p
        style={{
          fontSize: "clamp(20px, 3vw, 28px)",
          fontWeight: 900,
          color: "var(--gold-light)",
          lineHeight: 1,
          marginBottom: 5,
          letterSpacing: "-0.02em",
        }}
        whileHover={{ color: "var(--cream)" }}
        transition={{ duration: 0.15 }}
      >
        {value}
      </motion.p>
      <p
        style={{
          fontSize: 10,
          color: "var(--cream-mute)",
          fontWeight: 500,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
        }}
      >
        {label}
      </p>
    </motion.div>
  );
}
