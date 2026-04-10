"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { BackgroundLayers } from "./hero/BackgroundLayers";
import { Stage } from "./hero/Stage";
import { whatsappLink, WHATSAPP_MESSAGES } from "@/lib/config";

const EASE = [0.32, 0.72, 0, 1] as const;

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
          transition: { staggerChildren: 0.028, delayChildren: delay },
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
            hidden: { opacity: 0, y: 48, skewY: 3 },
            visible: {
              opacity: 1,
              y: 0,
              skewY: 0,
              transition: {
                type: "spring",
                stiffness: 55,
                damping: 13,
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

/* ── Hero ────────────────────────────────────────────────── */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();

  // Parallax: stage moves up slower than scroll, headline slightly faster
  const stageY = useTransform(scrollY, [0, 700], [0, -100]);
  const headlineY = useTransform(scrollY, [0, 700], [0, -30]);
  const eyebrowOpacity = useTransform(scrollY, [0, 200], [1, 0]);

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
        paddingTop: 72, // nav height
      }}
    >
      <BackgroundLayers />

      {/* Stage with parallax */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          y: stageY,
        }}
      >
        <Stage />
      </motion.div>

      {/* Bottom content — headline + CTA */}
      <motion.div
        style={{
          position: "relative",
          zIndex: 5,
          padding:
            "0 clamp(24px, 5vw, 80px) clamp(52px, 9vh, 90px)",
          y: headlineY,
        }}
      >
        {/* Eyebrow */}
        <motion.span
          style={{
            display: "block",
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--gold)",
            marginBottom: 18,
            opacity: eyebrowOpacity,
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
        >
          מארזי מתנה יוקרתיים · משלוח חינם · 48 שעות
        </motion.span>

        {/* Massive headline — 3 lines */}
        <h1
          style={{
            fontWeight: 900,
            fontSize: "clamp(62px, 10.5vw, 148px)",
            lineHeight: 0.87,
            letterSpacing: "-0.05em",
            margin: "0 0 40px",
          }}
        >
          <LetterReveal word="מתנה" delay={0.45} />
          <LetterReveal word="שלא" delay={0.6} />
          <LetterReveal word="נשכחת." delay={0.75} gold />
        </h1>

        {/* CTA row */}
        <motion.div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "clamp(20px, 3vw, 40px)",
            flexWrap: "wrap",
          }}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2, ease: EASE }}
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
              transition: "opacity 0.2s",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.opacity = "0.82";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.opacity = "1";
            }}
          >
            גלו את המארזים
          </a>

          {/* Secondary CTA — text link with arrow */}
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
              transition: "color 0.2s, gap 0.25s",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.color = "var(--cream)";
              el.style.gap = "16px";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.color = "var(--cream-dim)";
              el.style.gap = "10px";
            }}
          >
            <span
              style={{ fontSize: 16, color: "var(--gold)", lineHeight: 1 }}
            >
              →
            </span>
            <span>שליחת הודעה</span>
          </a>

          {/* Social proof — pushed to end */}
          <span
            style={{
              marginRight: "auto",
              fontSize: 11,
              color: "var(--cream-mute)",
              letterSpacing: "0.04em",
            }}
          >
            ⭐⭐⭐⭐⭐&nbsp;&nbsp;500+ לקוחות מרוצים
          </span>
        </motion.div>
      </motion.div>

      {/* Animated vertical line scroll indicator */}
      <motion.div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 20,
          left: "50%",
          translateX: "-50%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          zIndex: 6,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <motion.div
          style={{
            width: 1,
            height: 44,
            background:
              "linear-gradient(to bottom, var(--gold), transparent)",
            transformOrigin: "top",
          }}
          animate={{ scaleY: [0.3, 1, 0.3], opacity: [0.3, 1, 0.3] }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </section>
  );
}
