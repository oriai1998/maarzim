"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { BackgroundLayers } from "./hero/BackgroundLayers";
import { Stage } from "./hero/Stage";
import { whatsappLink, WHATSAPP_MESSAGES } from "@/lib/config";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ── Letter-by-letter entrance ───────────────────────────── */
function LetterReveal({
  word,
  delay,
  gold,
}: {
  word: string;
  delay: number;
  gold?: boolean;
}) {
  return (
    <motion.span
      style={{ display: "block" }}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.03, delayChildren: delay },
        },
      }}
    >
      {Array.from(word).map((char, i) => (
        <motion.span
          key={i}
          style={{
            display: "inline-block",
            color: gold ? "var(--gold)" : "var(--cream)",
          }}
          variants={{
            hidden: { opacity: 0, y: 52 },
            visible: {
              opacity: 1,
              y: 0,
              // No skewY — looks unnatural with Hebrew letterforms
              transition: {
                duration: 0.7,
                ease: EASE,
              },
            },
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}

/* ── Star rating — SVG, not emoji ───────────────────────── */
function StarRating({ count = 5 }: { count?: number }) {
  return (
    <span style={{ display: "inline-flex", gap: 3, alignItems: "center" }}>
      {Array.from({ length: count }).map((_, i) => (
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

/* ── Hero ────────────────────────────────────────────────── */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();

  // Parallax transforms
  const stageY = useTransform(scrollY, [0, 700], [0, -90]);
  const headlineY = useTransform(scrollY, [0, 700], [0, -28]);
  // Fade eyebrow out on scroll — use a separate wrapper to avoid animate conflict
  const eyebrowWrapperOpacity = useTransform(scrollY, [0, 180], [1, 0]);

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
        justifyContent: "flex-end",
        paddingTop: 72,
      }}
    >
      <BackgroundLayers />

      {/* Stage with parallax */}
      <motion.div
        style={{ position: "absolute", inset: 0, y: stageY }}
        aria-hidden="true"
      >
        <Stage />
      </motion.div>

      {/* Bottom content — headline + CTA */}
      <motion.div
        style={{
          position: "relative",
          zIndex: 5,
          padding: "0 clamp(24px, 5vw, 80px) clamp(52px, 9vh, 88px)",
          y: headlineY,
        }}
      >
        {/* Eyebrow — separate MotionValue wrapper so animate doesn't conflict */}
        <motion.div
          style={{ opacity: eyebrowWrapperOpacity }}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.18, ease: EASE }}
        >
          <span
            style={{
              display: "block",
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "var(--gold)",
              marginBottom: 22,
            }}
          >
            מארזי מתנה יוקרתיים · משלוח חינם · 48 שעות
          </span>
        </motion.div>

        {/* Massive headline */}
        <h1
          style={{
            fontWeight: 900,
            fontSize: "clamp(60px, 10.5vw, 148px)",
            lineHeight: 0.88,
            letterSpacing: "-0.05em",
            margin: "0 0 36px",
          }}
        >
          <LetterReveal word="מתנה" delay={0.42} />
          <LetterReveal word="שלא" delay={0.58} />
          <LetterReveal word="נשכחת." delay={0.74} gold />
        </h1>

        {/* Thin separator */}
        <motion.div
          style={{
            width: 40,
            height: 1,
            background: "var(--gold-40)",
            marginBottom: 28,
          }}
          initial={{ scaleX: 0, originX: 1 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 1.1, ease: EASE }}
        />

        {/* CTA row */}
        <motion.div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "clamp(18px, 3vw, 36px)",
            flexWrap: "wrap",
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 1.18, ease: EASE }}
        >
          {/* Primary CTA */}
          <a
            href="#products"
            style={{
              display: "inline-block",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              padding: "14px 36px",
              background: "var(--gold)",
              color: "#0A0A0A",
              textDecoration: "none",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.opacity = "0.80";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.opacity = "1";
            }}
          >
            גלו את המארזים
          </a>

          {/* Secondary CTA — text link with animated arrow */}
          <a
            href={whatsappLink(WHATSAPP_MESSAGES.hero)}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.10em",
              textTransform: "uppercase",
              color: "var(--cream-dim)",
              textDecoration: "none",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.color = "var(--cream)";
              const arrow = el.querySelector("[data-arrow]") as HTMLElement;
              if (arrow) arrow.style.transform = "translateX(-4px)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.color = "var(--cream-dim)";
              const arrow = el.querySelector("[data-arrow]") as HTMLElement;
              if (arrow) arrow.style.transform = "translateX(0)";
            }}
          >
            <span
              data-arrow="true"
              style={{
                fontSize: 15,
                color: "var(--gold)",
                lineHeight: 1,
                transition: "transform 0.28s cubic-bezier(0.22,1,0.36,1)",
                display: "inline-block",
              }}
            >
              →
            </span>
            <span>שליחת הודעה</span>
          </a>

          {/* Social proof — SVG stars, clean */}
          <span
            style={{
              marginRight: "auto",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontSize: 11,
              color: "var(--cream-mute)",
            }}
          >
            <StarRating />
            <span>500+ לקוחות מרוצים</span>
          </span>
        </motion.div>
      </motion.div>

      {/* Scroll indicator — refined vertical line */}
      <motion.div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 24,
          left: "50%",
          x: "-50%",
          zIndex: 6,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
      >
        <span
          style={{
            fontSize: 9,
            fontWeight: 600,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--gold-40)",
          }}
        >
          גלול
        </span>
        <motion.div
          style={{
            width: 1,
            height: 36,
            background:
              "linear-gradient(to bottom, var(--gold-55), transparent)",
            transformOrigin: "top",
          }}
          animate={{ scaleY: [0.2, 1, 0.2], opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
