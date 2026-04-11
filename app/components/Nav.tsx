"use client";

import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { SITE, whatsappLink, WHATSAPP_MESSAGES } from "@/lib/config";

const EASE = [0.32, 0.72, 0, 1] as const;

const LINKS_LEFT = [
  { label: "מארזים", href: "#products" },
  { label: "המלצות", href: "#testimonials" },
] as const;

const LINKS_RIGHT = [
  { label: "למה אנחנו", href: "#why" },
] as const;

const ALL_LINKS = [...LINKS_LEFT, ...LINKS_RIGHT] as const;

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const linkStyle: React.CSSProperties = {
    fontSize: 12,
    fontWeight: 500,
    letterSpacing: "0.04em",
    color: "var(--text-2)",
    textDecoration: "none",
  };

  return (
    <>
      <motion.header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 clamp(24px, 5vw, 64px)",
          height: 64,
          background: scrolled ? "rgba(0,0,0,0.88)" : "transparent",
          borderBottom: scrolled
            ? "1px solid var(--border)"
            : "1px solid transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          transition: "background 0.4s, border-color 0.4s",
        }}
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        {/* Scroll progress bar */}
        <motion.div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 1,
            background: "var(--gold)",
            transformOrigin: "left",
            scaleX,
            opacity: 0.55,
          }}
        />

        {/* Left nav links */}
        <nav
          aria-label="ניווט ראשי"
          className="hidden-mobile"
          style={{ display: "flex", gap: 32 }}
        >
          {LINKS_LEFT.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              style={linkStyle}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "var(--text)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "var(--text-2)";
              }}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Center logo */}
        <a
          href="/"
          aria-label={`${SITE.name} — דף הבית`}
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: 15,
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--gold)",
            whiteSpace: "nowrap",
            textDecoration: "none",
          }}
        >
          {SITE.name}
        </a>

        {/* Right: links + CTA */}
        <div
          className="hidden-mobile"
          style={{ display: "flex", alignItems: "center", gap: 32 }}
        >
          {LINKS_RIGHT.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              style={linkStyle}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "var(--text)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "var(--text-2)";
              }}
            >
              {label}
            </a>
          ))}
          <a
            href={whatsappLink(WHATSAPP_MESSAGES.hero)}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.08em",
              padding: "8px 20px",
              border: "1px solid var(--border-gold)",
              color: "var(--gold)",
              textDecoration: "none",
              background: "var(--gold-faint)",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "var(--gold)";
              el.style.color = "#000";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "var(--gold-faint)";
              el.style.color = "var(--gold)";
            }}
          >
            הזמנה
          </a>
        </div>

        {/* Mobile hamburger */}
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
            padding: 8,
            display: "flex",
            flexDirection: "column",
            gap: 5,
            marginRight: "auto",
          }}
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              style={{
                display: "block",
                width: i === 2 ? 14 : 20,
                height: 1,
                background: "var(--text)",
                transformOrigin: "center",
              }}
              animate={
                menuOpen
                  ? i === 1
                    ? { opacity: 0 }
                    : { rotate: i === 0 ? 45 : -45, y: i === 0 ? 6 : -6, width: 20 }
                  : { rotate: 0, y: 0, opacity: 1 }
              }
              transition={{ duration: 0.22, ease: EASE }}
            />
          ))}
        </button>
      </motion.header>

      {/* Mobile fullscreen menu */}
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
              gap: 36,
              background: "#000",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {ALL_LINKS.map(({ label, href }, i) => (
              <motion.a
                key={href}
                href={href}
                style={{
                  fontSize: 32,
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  color: "var(--text)",
                  textDecoration: "none",
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.35, ease: EASE }}
                onClick={() => setMenuOpen(false)}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "var(--gold)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "var(--text)";
                }}
              >
                {label}
              </motion.a>
            ))}
            <motion.a
              href={whatsappLink(WHATSAPP_MESSAGES.hero)}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "13px 36px",
                border: "1px solid var(--border-gold)",
                color: "var(--gold)",
                textDecoration: "none",
                marginTop: 8,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24, duration: 0.35, ease: EASE }}
            >
              הזמנה
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
