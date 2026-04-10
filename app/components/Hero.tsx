"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { IslandBtn } from "./IslandBtn";
import { BackgroundLayers } from "./hero/BackgroundLayers";
import { Stage } from "./hero/Stage";
import { StatsRibbon } from "./hero/StatsRibbon";
import { whatsappLink, WHATSAPP_MESSAGES } from "@/lib/config";
import { useRef } from "react";

const EASE = [0.32, 0.72, 0, 1] as const;

/* ── Letter-by-letter reveal ─────────────────────────────── */
const WORDS = ["מתנה", "שלא"];

function LetterReveal({ word, startDelay, className }: { word: string; startDelay: number; className?: string }) {
  const letters = Array.from(word);
  return (
    <motion.span
      style={{ display: "block" }}
      className={className}
      initial="hidden"
      animate="visible"
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.035, delayChildren: startDelay } } }}
    >
      {letters.map((char, i) => (
        <motion.span
          key={i}
          style={{ display: "inline-block" }}
          variants={{
            hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
            visible: {
              opacity: 1, y: 0, filter: "blur(0px)",
              transition: { type: "spring", stiffness: 70, damping: 16 },
            },
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}

/* ── Live pill ───────────────────────────────────────────── */
function LivePill() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: "0.04em",
        padding: "7px 16px",
        borderRadius: 9999,
        border: "1px solid var(--gold-20)",
        background: "rgba(12,9,6,0.7)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        color: "var(--cream-dim)",
        marginBottom: 28,
      }}
    >
      {/* Pulsing green dot */}
      <span style={{ position: "relative", width: 8, height: 8, flexShrink: 0 }}>
        <motion.span
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background: "#4ade80",
            opacity: 0.4,
          }}
          animate={{ scale: [1, 2.2, 1], opacity: [0.4, 0, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
        />
        <span
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background: "#4ade80",
          }}
        />
      </span>
      זמין להזמנה · משלוח תוך 48 שעות
    </motion.div>
  );
}

/* ── Scroll indicator ────────────────────────────────────── */
function ScrollIndicator() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 120], [1, 0]);

  return (
    <motion.button
      type="button"
      aria-label="גלול לצפייה במארזים"
      style={{
        position: "absolute",
        bottom: 28,
        left: "50%",
        translateX: "-50%",
        background: "none",
        border: "none",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6,
        opacity,
        zIndex: 10,
      }}
      onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.8, duration: 0.6 }}
    >
      <span style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: "0.18em", color: "var(--gold-55)", fontWeight: 600 }}>
        גלול לצפייה
      </span>
      <motion.div
        style={{
          width: 24,
          height: 38,
          borderRadius: 12,
          border: "1px solid var(--gold-30)",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          paddingTop: 6,
        }}
      >
        <motion.div
          style={{
            width: 3,
            height: 8,
            borderRadius: 9999,
            background: "var(--gold)",
          }}
          animate={{ y: [0, 10, 0], opacity: [1, 0.2, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </motion.button>
  );
}

/* ── Ring glow around primary CTA ───────────────────────── */
function GlowRing() {
  return (
    <motion.div
      style={{
        position: "absolute",
        inset: -6,
        borderRadius: 9999,
        border: "1px solid var(--gold)",
        pointerEvents: "none",
      }}
      animate={{ opacity: [0.35, 0.65, 0.35], scale: [1, 1.04, 1] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

/* ── Hero ────────────────────────────────────────────────── */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        zIndex: 10,
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(80px, 10vh, 100px) 24px clamp(80px, 10vh, 100px)",
        gap: "clamp(40px, 5vw, 60px)",
        overflow: "hidden",
      }}
    >
      <BackgroundLayers />

      {/* Inner layout: text left / stage right on desktop, stacked on mobile */}
      <div
        style={{
          position: "relative",
          zIndex: 5,
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          gap: "clamp(32px, 5vw, 72px)",
          width: "100%",
          maxWidth: 1160,
        }}
      >
        {/* ── Text column ── */}
        <div
          style={{
            flex: "1 1 320px",
            maxWidth: 560,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            textAlign: "right",
          }}
        >
          <LivePill />

          {/* H1 */}
          <h1
            style={{
              fontWeight: 900,
              lineHeight: 0.92,
              letterSpacing: "-0.045em",
              fontSize: "clamp(60px, 9vw, 116px)",
              marginBottom: 24,
              color: "var(--cream)",
            }}
          >
            {WORDS.map((word, i) => (
              <LetterReveal key={word} word={word} startDelay={0.25 + i * 0.18} />
            ))}
            <LetterReveal word="נשכחת." startDelay={0.6} className="text-gold-shimmer" />
          </h1>

          {/* Gold underline */}
          <motion.div
            style={{
              height: 1,
              background: "linear-gradient(90deg, transparent, var(--gold), var(--gold-light))",
              marginBottom: 24,
              alignSelf: "flex-end",
            }}
            initial={{ scaleX: 0, width: 80, originX: 1 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.9, ease: EASE }}
          />

          <motion.p
            style={{
              fontSize: "clamp(15px, 1.6vw, 17px)",
              lineHeight: 1.8,
              color: "var(--cream-dim)",
              maxWidth: 480,
              marginBottom: 36,
              fontWeight: 400,
            }}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.95, ease: EASE }}
          >
            מארזי מתנה מעוצבים בקפידה לכל אירוע — יום הולדת, חתונה, לידה וחגים.
            כל מארז עטוף באהבה עם כרטיס אישי בכתב יד ומשלוח חינם.
          </motion.p>

          {/* CTAs */}
          <motion.div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 14,
              marginBottom: 18,
            }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.05, ease: EASE }}
          >
            <div style={{ position: "relative" }}>
              <GlowRing />
              <IslandBtn href="#products" ariaLabel="לצפייה במארזים">
                לצפייה במארזים
              </IslandBtn>
            </div>
            <IslandBtn href={whatsappLink(WHATSAPP_MESSAGES.hero)} dark ariaLabel="שליחת הודעה בוואטסאפ">
              שליחת הודעה
            </IslandBtn>
          </motion.div>

          {/* Social proof row */}
          <motion.p
            style={{
              fontSize: 12,
              color: "var(--cream-mute)",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.25, duration: 0.5 }}
          >
            <span aria-label="5 כוכבים">⭐⭐⭐⭐⭐</span>
            <span>500+ לקוחות מרוצים · 4.9/5 בביקורות</span>
          </motion.p>
        </div>

        {/* ── Visual stage ── */}
        <Stage />
      </div>

      {/* Stats ribbon */}
      <div style={{ position: "relative", zIndex: 5, width: "100%", display: "flex", justifyContent: "center" }}>
        <StatsRibbon />
      </div>

      {/* Scroll indicator */}
      <ScrollIndicator />
    </section>
  );
}
