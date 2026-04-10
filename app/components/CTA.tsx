"use client";

import { motion } from "framer-motion";
import { Reveal } from "./Reveal";
import { Bezel } from "./Bezel";
import { IslandBtn } from "./IslandBtn";
import { SITE, whatsappLink, WHATSAPP_MESSAGES } from "@/lib/config";

export function CTA() {
  return (
    <section id="contact" style={{ position: "relative", zIndex: 10, padding: "0 24px 100px" }}>
      <Reveal>
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <Bezel style={{ boxShadow: "var(--shadow-glow)" }}>
            <div style={{ padding: "clamp(48px, 8vw, 72px) clamp(28px, 5vw, 48px)" }}>
              <motion.div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 20,
                  background: "var(--gold-10)",
                  border: "1px solid var(--gold-20)",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 28,
                  color: "var(--gold-light)",
                }}
                animate={{ rotate: [0, 6, -6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M3 8l9 6 9-6M5 6h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>

              <h2
                style={{
                  fontWeight: 900,
                  letterSpacing: "-0.04em",
                  lineHeight: 1.05,
                  fontSize: "clamp(32px, 5vw, 54px)",
                  color: "var(--cream)",
                  marginBottom: 18,
                }}
              >
                שלחו הודעה,
                <br />
                <span className="text-gold-gradient">נחזור {SITE.responseTime}.</span>
              </h2>

              <p
                style={{
                  fontSize: 16,
                  lineHeight: 1.7,
                  color: "var(--cream-dim)",
                  maxWidth: 420,
                  margin: "0 auto 36px",
                }}
              >
                אפשר להתאים אישית כל מארז — צבעים, תוכן, הקדשה וכמות. נשמח לעזור לכם למצוא את המתנה המושלמת.
              </p>

              <div style={{ display: "inline-flex", flexWrap: "wrap", justifyContent: "center", gap: 12 }}>
                <IslandBtn
                  href={whatsappLink(WHATSAPP_MESSAGES.custom)}
                  ariaLabel="הזמנת מארז אישי בוואטסאפ"
                >
                  הזמנה בוואטסאפ
                </IslandBtn>
                <IslandBtn href={`tel:${SITE.phoneE164}`} dark ariaLabel={`התקשרו אלינו ${SITE.phoneDisplay}`}>
                  חייגו אלינו
                </IslandBtn>
              </div>

              <p style={{ fontSize: 12, color: "var(--gold-40)", marginTop: 26 }}>
                {SITE.hours} · משלוח חינם ברחבי הארץ
              </p>
            </div>
          </Bezel>
        </div>
      </Reveal>
    </section>
  );
}
