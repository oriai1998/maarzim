"use client";

import { motion } from "framer-motion";
import { IslandBtn } from "./IslandBtn";
import { SITE, whatsappLink, WHATSAPP_MESSAGES } from "@/lib/config";

const EASE = [0.32, 0.72, 0, 1] as const;

const STATS = [
  { value: SITE.customersCount, label: "לקוחות מרוצים" },
  { value: `${SITE.deliveryTime.split(" ")[0]}h`, label: "זמן הכנה" },
  { value: "מ-₪149", label: "לכל כיס" },
];

export function Hero() {
  return (
    <section
      style={{
        position: "relative",
        zIndex: 10,
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "80px 24px 60px",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
        style={{ marginBottom: 28 }}
      >
        <span className="eyebrow">מארזים מעוצבים לכל אירוע</span>
      </motion.div>

      <motion.h1
        style={{
          fontWeight: 900,
          lineHeight: 0.95,
          letterSpacing: "-0.045em",
          fontSize: "clamp(56px, 10vw, 118px)",
          marginBottom: 30,
          maxWidth: 820,
        }}
        initial="hidden"
        animate="visible"
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.09, delayChildren: 0.25 } } }}
      >
        {["מתנה", "שלא"].map((word) => (
          <motion.span
            key={word}
            style={{ display: "block", color: "var(--cream)" }}
            variants={{
              hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
              visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { type: "spring", stiffness: 60, damping: 16 } },
            }}
          >
            {word}
          </motion.span>
        ))}
        <motion.span
          className="text-gold-shimmer"
          style={{ display: "block" }}
          variants={{
            hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
            visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { type: "spring", stiffness: 60, damping: 16, delay: 0.04 } },
          }}
        >
          נשכחת.
        </motion.span>
      </motion.h1>

      <motion.p
        style={{
          fontSize: 17,
          lineHeight: 1.75,
          color: "var(--cream-dim)",
          maxWidth: 520,
          marginBottom: 40,
          fontWeight: 400,
        }}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.65, ease: EASE }}
      >
        מארזי מתנה מעוצבים בקפידה לכל אירוע — יום הולדת, חתונה, לידה וחגים.
        כל מארז עטוף באהבה עם כרטיס אישי בכתב יד ומשלוח חינם.
      </motion.p>

      <motion.div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 14, marginBottom: 56 }}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8, ease: EASE }}
      >
        <IslandBtn href="#products" ariaLabel="לצפייה במארזים">
          לצפייה במארזים
        </IslandBtn>
        <IslandBtn href={whatsappLink(WHATSAPP_MESSAGES.hero)} dark ariaLabel="שליחת הודעה בוואטסאפ">
          שליחת הודעה
        </IslandBtn>
      </motion.div>

      <motion.dl
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, auto)",
          alignItems: "center",
          gap: "clamp(24px, 6vw, 64px)",
          position: "relative",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.0 }}
      >
        {STATS.map(({ value, label }, i) => (
          <div key={label} style={{ textAlign: "center", position: "relative" }}>
            <dt
              style={{
                fontSize: "clamp(24px, 3.5vw, 32px)",
                fontWeight: 900,
                color: "var(--gold-light)",
                lineHeight: 1,
                marginBottom: 6,
                letterSpacing: "-0.02em",
              }}
            >
              {value}
            </dt>
            <dd style={{ fontSize: 11, color: "var(--cream-dim)", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.08em" }}>
              {label}
            </dd>
            {i < STATS.length - 1 && (
              <span
                aria-hidden="true"
                style={{
                  position: "absolute",
                  insetInlineStart: "calc(100% + clamp(12px, 3vw, 32px) * -1)",
                  top: "50%",
                  width: 1,
                  height: 32,
                  background: "var(--gold-20)",
                  transform: "translateY(-50%)",
                }}
              />
            )}
          </div>
        ))}
      </motion.dl>
    </section>
  );
}
