"use client";

import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function useCountUp(target: number, duration = 1.4, active = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = target / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setValue(target);
        clearInterval(timer);
      } else {
        setValue(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [target, duration, active]);
  return value;
}

const STATS = [
  {
    raw: 500,
    format: (n: number) => `${n}+`,
    label: "לקוחות מרוצים",
    index: "01",
  },
  {
    raw: 3,
    format: (n: number) => `${n}`,
    label: "שנות ניסיון",
    index: "02",
  },
  {
    raw: 48,
    format: (n: number) => `${n}h`,
    label: "זמן משלוח",
    index: "03",
  },
  {
    raw: 49,
    format: (n: number) => `${(n / 10).toFixed(1)}`,
    label: "דירוג ממוצע",
    index: "04",
  },
] as const;

function StatItem({
  raw,
  format,
  label,
  index,
}: (typeof STATS)[number]) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const count = useCountUp(raw, 1.4, inView);

  return (
    <div
      ref={ref}
      style={{
        padding: "clamp(40px, 6vw, 72px) clamp(16px, 3vw, 40px)",
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontSize: 9,
          fontWeight: 600,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "var(--text-3)",
          marginBottom: 10,
          fontFamily: "var(--font-inter), Inter, sans-serif",
        }}
      >
        STAT {index}
      </div>
      <div
        style={{
          fontSize: "clamp(36px, 5.5vw, 68px)",
          fontWeight: 800,
          letterSpacing: "-0.05em",
          lineHeight: 1,
          color: "var(--gold)",
          marginBottom: 10,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {format(count)}
      </div>
      <div
        style={{
          fontSize: 11,
          fontWeight: 400,
          letterSpacing: "0.06em",
          color: "var(--text-3)",
        }}
      >
        {label}
      </div>
    </div>
  );
}

export function Stats() {
  return (
    <section
      id="stats"
      style={{
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
        }}
      >
        {STATS.map((stat, i) => (
          <div
            key={stat.label}
            style={{
              borderLeft: i > 0 ? "1px solid var(--border)" : "none",
            }}
          >
            <StatItem {...stat} />
          </div>
        ))}
      </div>
    </section>
  );
}
