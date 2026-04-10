"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { SITE, whatsappLink, WHATSAPP_MESSAGES } from "@/lib/config";
import { IslandBtn } from "./IslandBtn";

const EASE = [0.32, 0.72, 0, 1] as const;

const LINKS = [
  { label: "מארזים", href: "#products" },
  { label: "המלצות", href: "#testimonials" },
  { label: "למה אנחנו", href: "#why" },
  { label: "יצירת קשר", href: "#contact" },
] as const;

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          display: "flex",
          justifyContent: "center",
          padding: scrolled ? "14px 16px 0" : "24px 24px 0",
          transition: "padding 0.3s var(--ease-out-quart)",
        }}
      >
        <nav
          aria-label="ניווט ראשי"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 24,
            padding: "12px 16px 12px 20px",
            borderRadius: 9999,
            width: "100%",
            maxWidth: 860,
            background: scrolled ? "rgba(8,6,6,0.92)" : "rgba(12,9,6,0.82)",
            backdropFilter: "blur(24px) saturate(140%)",
            WebkitBackdropFilter: "blur(24px) saturate(140%)",
            border: "1px solid var(--gold-14)",
            boxShadow: scrolled ? "var(--shadow-bezel)" : "none",
            transition: "all 0.3s var(--ease-out-quart)",
          }}
        >
          <a href="/" aria-label={`${SITE.name} - דף הבית`} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              aria-hidden="true"
              style={{
                width: 30,
                height: 30,
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "var(--gold-14)",
                border: "1px solid var(--gold-30)",
                position: "relative",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="3" y="10" width="18" height="11" rx="1" fill="var(--gold)" />
                <rect x="3" y="10" width="18" height="3" fill="var(--gold-light)" />
                <rect x="11" y="10" width="2" height="11" fill="#0a0806" opacity="0.4" />
                <path d="M12 10 C 9 7, 7 9, 9 11 M12 10 C 15 7, 17 9, 15 11" stroke="var(--gold-light)" strokeWidth="1" fill="none" />
              </svg>
            </div>
            <span
              className="text-gold-gradient"
              style={{
                fontSize: 18,
                fontWeight: 900,
                letterSpacing: "-0.02em",
              }}
            >
              {SITE.name}
            </span>
          </a>

          <div className="hidden-mobile" style={{ display: "flex", alignItems: "center", gap: 28 }}>
            {LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                style={{
                  fontSize: 13,
                  color: "var(--cream-dim)",
                  fontWeight: 500,
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--cream)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--cream-dim)")}
              >
                {label}
              </a>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <a
              href={whatsappLink(WHATSAPP_MESSAGES.hero)}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden-mobile"
              style={{
                padding: "9px 18px",
                borderRadius: 9999,
                fontSize: 12,
                fontWeight: 700,
                background: "var(--gold)",
                color: "#0A0806",
                display: "inline-block",
              }}
            >
              הזמנה מהירה
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? "סגור תפריט" : "פתח תפריט"}
              aria-expanded={menuOpen}
              className="show-mobile"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                width: 36,
                height: 36,
                padding: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 5,
              }}
            >
              <motion.span
                style={{ display: "block", width: 18, height: 1.5, background: "var(--cream)", borderRadius: 9, transformOrigin: "center" }}
                animate={menuOpen ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.28, ease: EASE }}
              />
              <motion.span
                style={{ display: "block", width: 18, height: 1.5, background: "var(--cream)", borderRadius: 9 }}
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                style={{ display: "block", width: 18, height: 1.5, background: "var(--cream)", borderRadius: 9, transformOrigin: "center" }}
                animate={menuOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.28, ease: EASE }}
              />
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="תפריט ניווט"
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 45,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 32,
              background: "rgba(8,6,8,0.97)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {LINKS.map(({ label, href }, i) => (
              <motion.a
                key={href}
                href={href}
                style={{ fontSize: 32, fontWeight: 900, color: "var(--cream)" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, ease: EASE, duration: 0.4 }}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </motion.a>
            ))}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24, ease: EASE, duration: 0.4 }}>
              <IslandBtn href={whatsappLink(WHATSAPP_MESSAGES.hero)} ariaLabel="הזמנה בוואטסאפ">
                הזמן עכשיו
              </IslandBtn>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
