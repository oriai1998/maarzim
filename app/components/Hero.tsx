"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { whatsappLink, WHATSAPP_MESSAGES } from "@/lib/config";
import { PRODUCTS } from "@/lib/products";

const EASE = [0.22, 1, 0.36, 1] as const;
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZאבגדהוזחטיכלמנסעפצקרשת0123456789";

/* ── Text Scramble Hook ─────────────────────────────── */
function useScramble(finalText: string, delaySeconds = 0) {
  const [display, setDisplay] = useState(() =>
    finalText
      .split("")
      .map((c) => (c === " " ? " " : CHARS[Math.floor(Math.random() * CHARS.length)]))
      .join("")
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      let frame = 0;
      const totalFrames = finalText.length * 3;
      const interval = setInterval(() => {
        frame++;
        setDisplay(
          finalText
            .split("")
            .map((char, i) => {
              if (char === " ") return " ";
              if (frame > i * 3) return char;
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join("")
        );
        if (frame >= totalFrames) {
          clearInterval(interval);
          setDisplay(finalText);
        }
      }, 38);
      return () => clearInterval(interval);
    }, delaySeconds * 1000);
    return () => clearTimeout(timeout);
  }, [finalText, delaySeconds]);

  return display;
}

/* ── Star Rating ────────────────────────────────────── */
function Stars() {
  return (
    <span style={{ display: "inline-flex", gap: 2 }}>
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="var(--gold)"
          aria-hidden="true"
        >
          <path d="M5 0.5l1.18 2.4 2.64.38-1.91 1.86.45 2.63L5 6.5l-2.36 1.27.45-2.63L1.18 3.28l2.64-.38z" />
        </svg>
      ))}
    </span>
  );
}

/* ── Floating Product Card ──────────────────────────── */
function HeroCard() {
  const featured = PRODUCTS.find((p) => p.tag) ?? PRODUCTS[1];

  return (
    <motion.div
      style={{
        background: "rgba(255,255,255,0.025)",
        border: "1px solid var(--border)",
        padding: "28px 24px",
        position: "relative",
        maxWidth: 300,
        width: "100%",
      }}
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.85, delay: 1.0, ease: EASE }}
      whileHover={{ y: -5, transition: { duration: 0.3, ease: EASE } }}
    >
      {/* Top gold hairline */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background:
            "linear-gradient(to right, var(--gold-dim), transparent)",
        }}
      />

      <div
        style={{
          fontSize: 9,
          fontWeight: 600,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--gold-dim)",
          marginBottom: 14,
        }}
      >
        ✦ הנמכר ביותר
      </div>

      <div
        style={{
          fontSize: 17,
          fontWeight: 700,
          color: "var(--text)",
          letterSpacing: "-0.02em",
          marginBottom: 6,
        }}
      >
        {featured.name}
      </div>

      <div
        style={{
          fontSize: 30,
          fontWeight: 800,
          color: "var(--gold)",
          letterSpacing: "-0.04em",
          marginBottom: 20,
          lineHeight: 1,
        }}
      >
        {featured.price}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          marginBottom: 22,
        }}
      >
        {featured.items.map((item) => (
          <div
            key={item}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontSize: 12,
              color: "var(--text-2)",
            }}
          >
            <span
              style={{
                width: 3,
                height: 3,
                borderRadius: "50%",
                background: "var(--gold-dim)",
                flexShrink: 0,
                display: "block",
              }}
            />
            {item}
          </div>
        ))}
      </div>

      <a
        href={whatsappLink(WHATSAPP_MESSAGES.product(featured.name))}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "block",
          textAlign: "center",
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          padding: "11px",
          border: "1px solid var(--border-gold)",
          color: "var(--gold)",
          textDecoration: "none",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.background = "var(--gold)";
          el.style.color = "#000";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.background = "transparent";
          el.style.color = "var(--gold)";
        }}
      >
        הזמנה בוואטסאפ
      </a>
    </motion.div>
  );
}

/* ── Hero ───────────────────────────────────────────── */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const headlineY = useTransform(scrollY, [0, 600], [0, -40]);
  const cardY = useTransform(scrollY, [0, 600], [0, -20]);
  const glowOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  const line1 = useScramble("מתנה", 0.4);
  const line2 = useScramble("שלא", 0.7);
  const line3 = useScramble("נשכחת.", 1.0);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        zIndex: 10,
        minHeight: "100dvh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingTop: 64,
      }}
    >
      {/* Radial background glow */}
      <motion.div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-25%",
          right: "-8%",
          width: "55vw",
          height: "55vw",
          maxWidth: 680,
          maxHeight: 680,
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse, rgba(197,174,121,0.055) 0%, transparent 65%)",
          pointerEvents: "none",
          opacity: glowOpacity,
        }}
      />

      {/* Main grid */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 clamp(24px, 5vw, 80px)",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: "clamp(36px, 6vw, 80px)",
            alignItems: "center",
          }}
        >
          {/* LEFT: headline + CTA */}
          <motion.div style={{ y: headlineY }}>
            {/* Eyebrow */}
            <motion.div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(197,174,121,0.7)",
                border: "1px solid var(--border-gold)",
                padding: "5px 13px",
                marginBottom: 32,
                background: "var(--gold-faint)",
              }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
            >
              <span
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: "var(--gold)",
                  display: "block",
                }}
              />
              מארזי מתנה יוקרתיים · ישראל
            </motion.div>

            {/* Headline with scramble */}
            <h1
              style={{
                fontWeight: 800,
                fontSize: "clamp(56px, 9vw, 108px)",
                lineHeight: 0.92,
                letterSpacing: "-0.048em",
                margin: "0 0 32px",
              }}
            >
              <span style={{ display: "block", color: "var(--text)" }}>
                {line1}
              </span>
              <span style={{ display: "block", color: "var(--text)" }}>
                {line2}
              </span>
              <span style={{ display: "block", color: "var(--gold)" }}>
                {line3}
              </span>
            </h1>

            {/* Sub */}
            <motion.p
              style={{
                fontSize: "clamp(14px, 1.5vw, 16px)",
                lineHeight: 1.75,
                color: "var(--text-2)",
                maxWidth: 380,
                margin: "0 0 40px",
              }}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 1.45, ease: EASE }}
            >
              אריזות יוקרה בהתאמה אישית, כרטיס ברכה בכתב יד, משלוח חינם תוך
              48 שעות לכל רחבי ישראל.
            </motion.p>

            {/* CTA row */}
            <motion.div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "clamp(16px, 2.5vw, 28px)",
                flexWrap: "wrap",
              }}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 1.65, ease: EASE }}
            >
              <a
                href="#products"
                style={{
                  display: "inline-block",
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  padding: "13px 32px",
                  background: "var(--gold)",
                  color: "#000",
                  textDecoration: "none",
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.opacity = "0.85";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.opacity = "1";
                }}
              >
                גלו את המארזים
              </a>

              <a
                href={whatsappLink(WHATSAPP_MESSAGES.hero)}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: 12,
                  fontWeight: 500,
                  color: "var(--text-2)",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.color = "var(--text)";
                  const arrow = el.querySelector(
                    "[data-arrow]"
                  ) as HTMLElement;
                  if (arrow) arrow.style.transform = "translateX(4px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.color = "var(--text-2)";
                  const arrow = el.querySelector(
                    "[data-arrow]"
                  ) as HTMLElement;
                  if (arrow) arrow.style.transform = "translateX(0)";
                }}
              >
                <span
                  data-arrow="true"
                  style={{
                    color: "var(--gold)",
                    transition: "transform 0.25s var(--ease-out-quart)",
                    display: "inline-block",
                    fontSize: 15,
                  }}
                >
                  ←
                </span>
                שליחת הודעה
              </a>

              <span
                style={{
                  marginRight: "auto",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 7,
                  fontSize: 11,
                  color: "var(--text-3)",
                }}
              >
                <Stars /> 500+ לקוחות מרוצים
              </span>
            </motion.div>
          </motion.div>

          {/* RIGHT: Floating card */}
          <motion.div className="hidden-mobile" style={{ y: cardY }}>
            <HeroCard />
          </motion.div>
        </div>
      </div>

      {/* Info strip — bottom */}
      <motion.div
        style={{
          borderTop: "1px solid var(--border)",
          marginTop: "clamp(48px, 8vh, 80px)",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.85, ease: EASE }}
      >
        {[
          { label: "What", value: "מארזי יוקרה" },
          { label: "Delivery", value: "48 שעות" },
          { label: "Coverage", value: "כל ישראל" },
        ].map(({ label, value }, i) => (
          <div
            key={label}
            style={{
              padding: "20px clamp(24px, 5vw, 80px)",
              borderLeft: i > 0 ? "1px solid var(--border)" : "none",
            }}
          >
            <div
              style={{
                fontSize: 9,
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--text-3)",
                marginBottom: 5,
              }}
            >
              {label}
            </div>
            <div
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "var(--text-2)",
                letterSpacing: "-0.01em",
              }}
            >
              {value}
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
