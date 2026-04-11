"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { SITE, whatsappLink, WHATSAPP_MESSAGES } from "@/lib/config";

const EASE = [0.22, 1, 0.36, 1] as const;

function MagneticButton({
  href,
  children,
  primary = false,
}: {
  href: string;
  children: React.ReactNode;
  primary?: boolean;
}) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLAnchorElement>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLAnchorElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setPos({
      x: (e.clientX - cx) * 0.22,
      y: (e.clientY - cy) * 0.22,
    });
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "inline-block",
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: "0.08em",
        padding: primary ? "14px 36px" : "13px 36px",
        background: primary ? "var(--gold)" : "transparent",
        color: primary ? "#000" : "var(--text-2)",
        border: primary ? "none" : "1px solid var(--border)",
        textDecoration: "none",
        flexShrink: 0,
        x: pos.x,
        y: pos.y,
      }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        setPos({ x: 0, y: 0 });
      }}
      onMouseEnter={(e) => {
        if (primary) {
          (e.currentTarget as HTMLElement).style.opacity = "0.85";
        } else {
          (e.currentTarget as HTMLElement).style.color = "var(--text)";
          (e.currentTarget as HTMLElement).style.borderColor =
            "rgba(255,255,255,0.14)";
        }
      }}
      onMouseOut={(e) => {
        if (primary) {
          (e.currentTarget as HTMLElement).style.opacity = "1";
        } else {
          (e.currentTarget as HTMLElement).style.color = "var(--text-2)";
          (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
        }
      }}
    >
      {children}
    </motion.a>
  );
}

export function CTA() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="contact"
      style={{
        padding: "clamp(80px, 12vw, 140px) clamp(24px, 5vw, 80px)",
        position: "relative",
        overflow: "hidden",
        borderTop: "1px solid var(--border)",
      }}
    >
      {/* Radial bottom glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "-25%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "60vw",
          height: "60vw",
          maxWidth: 600,
          maxHeight: 600,
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse, rgba(197,174,121,0.05) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      <div ref={ref} style={{ maxWidth: 1200, margin: "0 auto" }}>
        <motion.span
          style={{
            display: "block",
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--text-3)",
            marginBottom: 28,
          }}
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6, ease: EASE }}
        >
          יצירת קשר
        </motion.span>

        <motion.h2
          style={{
            fontSize: "clamp(40px, 7vw, 96px)",
            fontWeight: 800,
            letterSpacing: "-0.05em",
            lineHeight: 0.9,
            color: "var(--text)",
            margin: "0 0 64px",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
        >
          שלחו הודעה,
          <br />
          <span style={{ color: "var(--gold)" }}>
            נחזור {SITE.responseTime}.
          </span>
        </motion.h2>

        <motion.div
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
            paddingTop: 40,
            borderTop: "1px solid var(--border)",
          }}
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6, delay: 0.16, ease: EASE }}
        >
          <MagneticButton
            href={whatsappLink(WHATSAPP_MESSAGES.custom)}
            primary
          >
            הזמנה בוואטסאפ
          </MagneticButton>

          <MagneticButton href={`tel:${SITE.phoneE164}`}>
            חייגו אלינו
          </MagneticButton>

          <span
            style={{
              marginRight: "auto",
              fontSize: 11,
              color: "var(--text-3)",
              letterSpacing: "0.04em",
            }}
          >
            {SITE.hours} · משלוח חינם ברחבי הארץ
          </span>
        </motion.div>
      </div>
    </section>
  );
}
