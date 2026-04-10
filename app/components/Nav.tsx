"use client";

import { motion, AnimatePresence } from "framer-motion";
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const linkStyle: React.CSSProperties = {
    fontSize: 11,
    fontWeight: 500,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "var(--cream-dim)",
    transition: "color 0.2s",
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
          height: 72,
          background: scrolled ? "rgba(10,10,10,0.96)" : "transparent",
          borderBottom: scrolled ? "1px solid var(--gold-14)" : "1px solid transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          transition: "background 0.4s, border-color 0.4s, backdrop-filter 0.4s",
        }}
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        {/* Left links */}
        <nav
          aria-label="ניווט ראשי"
          className="hidden-mobile"
          style={{ display: "flex", gap: 40 }}
        >
          {LINKS_LEFT.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              style={linkStyle}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--cream)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--cream-dim)"; }}
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
            fontSize: 16,
            fontWeight: 900,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--gold)",
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}
        >
          {SITE.name}
        </a>

        {/* Right: nav links + CTA */}
        <div className="hidden-mobile" style={{ display: "flex", alignItems: "center", gap: 40 }}>
          {LINKS_RIGHT.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              style={linkStyle}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--cream)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--cream-dim)"; }}
            >
              {label}
            </a>
          ))}

          {/* CTA — outlined gold button */}
          <a
            href={whatsappLink(WHATSAPP_MESSAGES.hero)}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              padding: "9px 22px",
              border: "1px solid var(--gold-40)",
              color: "var(--gold)",
              textDecoration: "none",
              transition: "background 0.25s, color 0.25s",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "var(--gold)";
              el.style.color = "#0A0A0A";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "transparent";
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
                width: 22,
                height: 1,
                background: "var(--cream)",
                transformOrigin: "center",
              }}
              animate={
                menuOpen
                  ? i === 1
                    ? { opacity: 0 }
                    : { rotate: i === 0 ? 45 : -45, y: i === 0 ? 6 : -6 }
                  : { rotate: 0, y: 0, opacity: 1 }
              }
              transition={{ duration: 0.25, ease: EASE }}
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
              gap: 40,
              background: "#0A0A0A",
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
                  fontWeight: 900,
                  letterSpacing: "-0.02em",
                  color: "var(--cream)",
                  textDecoration: "none",
                }}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, ease: EASE, duration: 0.4 }}
                onClick={() => setMenuOpen(false)}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--gold)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--cream)"; }}
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
                fontWeight: 700,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                padding: "14px 40px",
                border: "1px solid var(--gold)",
                color: "var(--gold)",
                textDecoration: "none",
                marginTop: 8,
              }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, ease: EASE, duration: 0.4 }}
            >
              הזמנה
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
