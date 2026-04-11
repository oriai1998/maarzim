"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

const FEATURES = [
  {
    index: "01",
    title: "עיצוב אישי לכל מארז",
    desc: "כל מארז עטוף ביד בנייר פרמיום, עם כרטיס ברכה אישי שאנחנו כותבים בכתב יד — בדיוק כמו שפעם עשו זאת.",
  },
  {
    index: "02",
    title: "משלוח חינם תוך 48 שעות",
    desc: "לכל נקודה בישראל, ללא עלות נוספת. אנחנו דואגים שהמארז יגיע בזמן — גם כשהאירוע מחר.",
  },
  {
    index: "03",
    title: "3 שנות ניסיון, 500+ לקוחות",
    desc: "יותר מ-500 מארזים שנשלחו. לקוחות שחוזרים אלינו שוב ושוב. ביקורות אמיתיות — פה למטה.",
  },
] as const;

function FeatureCard({
  index,
  title,
  desc,
  i,
}: {
  index: string;
  title: string;
  desc: string;
  i: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      style={{ position: "relative", paddingTop: 28, overflow: "hidden" }}
      initial={{ opacity: 0, x: i % 2 === 0 ? 32 : -32 }}
      animate={inView ? { opacity: 1, x: 0 } : undefined}
      transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
    >
      {/* Faint background index number */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: -10,
          insetInlineEnd: 0,
          fontSize: "clamp(60px, 9vw, 96px)",
          fontWeight: 800,
          color: "transparent",
          WebkitTextStroke: "1px rgba(255,255,255,0.04)",
          lineHeight: 1,
          userSelect: "none",
          pointerEvents: "none",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {index}
      </div>

      {/* Top border */}
      <div
        style={{ borderTop: "1px solid var(--border)", marginBottom: 24 }}
      />

      {/* Index label */}
      <div
        style={{
          fontSize: 9,
          fontWeight: 600,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--text-3)",
          marginBottom: 12,
          fontFamily: "var(--font-inter), Inter, sans-serif",
        }}
      >
        WHY {index}
      </div>

      <h3
        style={{
          fontSize: "clamp(18px, 2vw, 22px)",
          fontWeight: 700,
          color: "var(--text)",
          letterSpacing: "-0.02em",
          lineHeight: 1.2,
          marginBottom: 14,
          position: "relative",
        }}
      >
        {title}
      </h3>

      <p
        style={{
          fontSize: 14,
          lineHeight: 1.85,
          color: "var(--text-2)",
          margin: 0,
          position: "relative",
        }}
      >
        {desc}
      </p>
    </motion.div>
  );
}

export function WhyUs() {
  return (
    <section
      id="why"
      style={{
        padding: "clamp(80px, 12vw, 140px) clamp(24px, 5vw, 80px)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 24,
            paddingBottom: 48,
            borderBottom: "1px solid var(--border)",
            marginBottom: 64,
          }}
        >
          <span
            style={{
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--text-3)",
              alignSelf: "flex-start",
            }}
          >
            למה מארזים
          </span>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 52px)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 0.95,
              color: "var(--text)",
              margin: 0,
              maxWidth: 440,
              textAlign: "right",
            }}
          >
            לא סתם מארז.{" "}
            <span style={{ color: "var(--gold)" }}>חוויה.</span>
          </h2>
        </div>

        {/* Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill, minmax(min(100%, 280px), 1fr))",
            gap: "clamp(32px, 5vw, 64px)",
          }}
        >
          {FEATURES.map((f, i) => (
            <FeatureCard key={f.index} {...f} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
