# Maarzim Full Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Complete visual redesign of maarzim.co.il — pure black, minimal, sharp, dark-luxury aesthetic (Vercel/Linear style) with 12 premium scroll interactions.

**Architecture:** Replace design tokens and rewrite every component in-place. No new pages or routes. All data (products, config, whatsapp) stays untouched. Add Lenis smooth scroll as a client wrapper in layout.

**Tech Stack:** Next.js 15, Framer Motion, Tailwind CSS v4, next/font (Heebo + Inter), TypeScript, RTL Hebrew

---

## File Map

| File | Action | Purpose |
|------|--------|---------|
| `app/globals.css` | Modify | Replace all design tokens — new black palette |
| `app/layout.tsx` | Modify | Add Inter font variable |
| `app/components/SmoothScroll.tsx` | Create | Lenis smooth scroll wrapper (client) |
| `app/components/Nav.tsx` | Modify | Minimal nav + scroll progress bar |
| `app/components/Hero.tsx` | Modify | 2-col layout + floating card + info strip + scramble |
| `app/components/Marquee.tsx` | Modify | Slow, subtle infinite marquee (already exists) |
| `app/components/Stats.tsx` | Modify | Count-up on scroll enter |
| `app/components/WhyUs.tsx` | Modify | Stagger from sides, bg index numbers |
| `app/components/Products.tsx` | Modify | Clean grid, outer border, hover glow |
| `app/components/Testimonials.tsx` | Modify | Auto-scroll horizontal marquee |
| `app/components/CTA.tsx` | Modify | Magnetic button + radial glow |
| `app/components/Footer.tsx` | Modify | Ultra-minimal |
| `app/components/Reveal.tsx` | Modify | Add blur variant for new reveal style |
| `app/page.tsx` | Modify | Add SmoothScroll wrapper |

---

## Task 1: Design Tokens + Fonts

**Files:**
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Replace globals.css design tokens**

Replace the entire `:root` block and theme block in `app/globals.css` with:

```css
@import "tailwindcss";

:root {
  --bg:          #000000;
  --bg-surface:  #0D0D0D;
  --bg-card:     #111111;

  --border:      rgba(255, 255, 255, 0.06);
  --border-gold: rgba(197, 174, 121, 0.15);
  --border-hover:rgba(197, 174, 121, 0.30);

  --text:        #FFFFFF;
  --text-2:      rgba(255, 255, 255, 0.50);
  --text-3:      rgba(255, 255, 255, 0.25);

  --gold:        #C5AE79;
  --gold-dim:    rgba(197, 174, 121, 0.35);
  --gold-faint:  rgba(197, 174, 121, 0.08);
  --gold-glow:   rgba(197, 174, 121, 0.05);

  --ease-out-quart: cubic-bezier(0.32, 0.72, 0, 1);
}

@theme inline {
  --color-bg:       var(--bg);
  --color-text:     var(--text);
  --font-sans:      var(--font-heebo), "Heebo", -apple-system, sans-serif;
  --font-label:     var(--font-inter), "Inter", -apple-system, sans-serif;
}

* { box-sizing: border-box; margin: 0; padding: 0; }

html { scroll-behavior: smooth; -webkit-text-size-adjust: 100%; }

body {
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-heebo), "Heebo", -apple-system, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
}

a { text-decoration: none; color: inherit; }
button { font: inherit; color: inherit; }

::selection { background: var(--gold); color: var(--bg); }

/* Scrollbar */
::-webkit-scrollbar { width: 2px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: rgba(197,174,121,0.2); }

/* Focus */
:focus-visible { outline: 1px solid var(--gold); outline-offset: 4px; }

/* Transitions */
a, button {
  transition-property: color, background, border-color, opacity, transform;
  transition-duration: 0.22s;
  transition-timing-function: var(--ease-out-quart);
}

/* Noise overlay */
.noise-overlay {
  position: fixed; inset: 0;
  pointer-events: none; z-index: 60;
  opacity: 0.025; mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 220px;
}

/* Marquee animation */
@keyframes marquee-rtl {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
.marquee-track {
  display: flex; width: max-content;
  animation: marquee-rtl 40s linear infinite;
}
.marquee-track:hover { animation-play-state: paused; }

/* Testimonials auto-scroll */
@keyframes testi-scroll {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
.testi-track {
  display: flex; width: max-content;
  animation: testi-scroll 30s linear infinite;
}
.testi-track:hover { animation-play-state: paused; }

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}

/* Mobile helpers */
@media (min-width: 768px) { .show-mobile { display: none !important; } }
@media (max-width: 767px) { .hidden-mobile { display: none !important; } }
```

- [ ] **Step 2: Add Inter font to layout.tsx**

In `app/layout.tsx`, add Inter import alongside Heebo:

```tsx
import { Heebo, Inter } from "next/font/google";

const heebo = Heebo({
  variable: "--font-heebo",
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});
```

Update the `<html>` tag className:
```tsx
className={`${heebo.variable} ${inter.variable} h-full antialiased`}
```

- [ ] **Step 3: Commit**
```bash
git add app/globals.css app/layout.tsx
git commit -m "feat: redesign — new dark luxury design tokens + Inter font"
```

---

## Task 2: Lenis Smooth Scroll

**Files:**
- Create: `app/components/SmoothScroll.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Install lenis**
```bash
cd c:/Users/User/maarzim && npm install lenis
```

- [ ] **Step 2: Create SmoothScroll.tsx**

Create `app/components/SmoothScroll.tsx`:

```tsx
"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return <>{children}</>;
}
```

- [ ] **Step 3: Wrap page in SmoothScroll**

In `app/page.tsx`, import and wrap content:

```tsx
import { SmoothScroll } from "./components/SmoothScroll";
// ... other imports

export default function MaarzimPage() {
  return (
    <SmoothScroll>
      <div style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--text)", overflowX: "hidden" }}>
        <div className="noise-overlay" aria-hidden="true" />
        <Cursor />
        <Nav />
        <Hero />
        <Marquee />
        <Stats />
        <WhyUs />
        <Products />
        <Testimonials />
        <CTA />
        <Footer />
      </div>
    </SmoothScroll>
  );
}
```

Note: import `Marquee` — it already exists at `app/components/Marquee.tsx`. Check its export name first.

- [ ] **Step 4: Commit**
```bash
git add app/components/SmoothScroll.tsx app/page.tsx
git commit -m "feat: redesign — Lenis smooth scroll"
```

---

## Task 3: Nav — Minimal + Scroll Progress Bar

**Files:**
- Modify: `app/components/Nav.tsx`

- [ ] **Step 1: Rewrite Nav.tsx**

Replace entire file content with:

```tsx
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
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

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
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 clamp(24px, 5vw, 64px)",
          height: 64,
          background: scrolled ? "rgba(0,0,0,0.85)" : "transparent",
          borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          transition: "background 0.4s, border-color 0.4s",
        }}
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        {/* Progress bar */}
        <motion.div
          style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            height: 1,
            background: "var(--gold)",
            transformOrigin: "left",
            scaleX,
            opacity: scrolled ? 0.6 : 0,
          }}
        />

        {/* Left links */}
        <nav aria-label="ניווט ראשי" className="hidden-mobile" style={{ display: "flex", gap: 32 }}>
          {LINKS_LEFT.map(({ label, href }) => (
            <a key={href} href={href} style={linkStyle}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-2)"; }}
            >{label}</a>
          ))}
        </nav>

        {/* Center logo */}
        <a href="/" aria-label={`${SITE.name} — דף הבית`}
          style={{
            position: "absolute", left: "50%", transform: "translateX(-50%)",
            fontSize: 15, fontWeight: 700, letterSpacing: "0.12em",
            textTransform: "uppercase", color: "var(--gold)",
            whiteSpace: "nowrap", textDecoration: "none",
          }}
        >{SITE.name}</a>

        {/* Right: links + CTA */}
        <div className="hidden-mobile" style={{ display: "flex", alignItems: "center", gap: 32 }}>
          {LINKS_RIGHT.map(({ label, href }) => (
            <a key={href} href={href} style={linkStyle}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-2)"; }}
            >{label}</a>
          ))}
          <a href={whatsappLink(WHATSAPP_MESSAGES.hero)} target="_blank" rel="noopener noreferrer"
            style={{
              fontSize: 11, fontWeight: 600, letterSpacing: "0.08em",
              padding: "8px 20px",
              border: "1px solid var(--border-gold)",
              color: "var(--gold)", textDecoration: "none",
              background: "var(--gold-faint)",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "var(--gold)"; el.style.color = "#000";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "var(--gold-faint)"; el.style.color = "var(--gold)";
            }}
          >הזמנה</a>
        </div>

        {/* Mobile hamburger */}
        <button type="button" onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? "סגור תפריט" : "פתח תפריט"} aria-expanded={menuOpen}
          className="show-mobile"
          style={{ background: "none", border: "none", cursor: "pointer", padding: 8, display: "flex", flexDirection: "column", gap: 5, marginRight: "auto" }}
        >
          {[0, 1, 2].map((i) => (
            <motion.span key={i}
              style={{ display: "block", width: 20, height: 1, background: "var(--text)", transformOrigin: "center" }}
              animate={menuOpen ? i === 1 ? { opacity: 0 } : { rotate: i === 0 ? 45 : -45, y: i === 0 ? 6 : -6 } : { rotate: 0, y: 0, opacity: 1 }}
              transition={{ duration: 0.22, ease: EASE }}
            />
          ))}
        </button>
      </motion.header>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div role="dialog" aria-modal="true" aria-label="תפריט ניווט"
            style={{ position: "fixed", inset: 0, zIndex: 45, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 40, background: "#000" }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {ALL_LINKS.map(({ label, href }, i) => (
              <motion.a key={href} href={href}
                style={{ fontSize: 32, fontWeight: 800, letterSpacing: "-0.02em", color: "var(--text)", textDecoration: "none" }}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.35, ease: EASE }}
                onClick={() => setMenuOpen(false)}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--gold)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text)"; }}
              >{label}</motion.a>
            ))}
            <motion.a href={whatsappLink(WHATSAPP_MESSAGES.hero)} target="_blank" rel="noopener noreferrer"
              style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", padding: "13px 36px", border: "1px solid var(--border-gold)", color: "var(--gold)", textDecoration: "none", marginTop: 8 }}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24, duration: 0.35, ease: EASE }}
            >הזמנה</motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
```

- [ ] **Step 2: Verify dev server** — `npm run dev`, check nav renders, scroll progress bar appears.

- [ ] **Step 3: Commit**
```bash
git add app/components/Nav.tsx
git commit -m "feat: redesign — minimal nav + scroll progress bar"
```

---

## Task 4: Hero — 2-Col + Floating Card + Info Strip + Text Scramble

**Files:**
- Modify: `app/components/Hero.tsx`

- [ ] **Step 1: Rewrite Hero.tsx**

Replace entire file content:

```tsx
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { whatsappLink, WHATSAPP_MESSAGES } from "@/lib/config";
import { PRODUCTS } from "@/lib/products";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ── Text Scramble Hook ─────────────────────── */
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZאבגדהוזחטיכלמנסעפצקרשת0123456789";

function useScramble(finalText: string, delay = 0) {
  const [display, setDisplay] = useState(() => finalText.split("").map(() => CHARS[Math.floor(Math.random() * CHARS.length)]).join(""));
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      let frame = 0;
      const totalFrames = finalText.length * 3;
      const interval = setInterval(() => {
        frame++;
        setDisplay(
          finalText.split("").map((char, i) => {
            if (char === " ") return " ";
            if (frame > i * 3) return char;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          }).join("")
        );
        if (frame >= totalFrames) {
          clearInterval(interval);
          setDisplay(finalText);
          setDone(true);
        }
      }, 40);
      return () => clearInterval(interval);
    }, delay * 1000);
    return () => clearTimeout(timeout);
  }, [finalText, delay]);

  return { display, done };
}

/* ── Star Rating ────────────────────────────── */
function Stars() {
  return (
    <span style={{ display: "inline-flex", gap: 2 }}>
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="10" height="10" viewBox="0 0 10 10" fill="var(--gold)" aria-hidden="true">
          <path d="M5 0.5l1.18 2.4 2.64.38-1.91 1.86.45 2.63L5 6.5l-2.36 1.27.45-2.63L1.18 3.28l2.64-.38z" />
        </svg>
      ))}
    </span>
  );
}

/* ── Floating Product Card ──────────────────── */
function HeroCard() {
  const featured = PRODUCTS.find((p) => p.tag) ?? PRODUCTS[1] ?? PRODUCTS[0];

  return (
    <motion.div
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid var(--border)",
        padding: "28px 24px",
        position: "relative",
        maxWidth: 320,
      }}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.9, ease: EASE }}
      whileHover={{ y: -4, transition: { duration: 0.3, ease: EASE } }}
    >
      {/* Top gold hairline */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(to right, var(--gold-dim), transparent)" }} />

      <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--gold-dim)", marginBottom: 12 }}>
        ✦ הנמכר ביותר
      </div>
      <div style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", letterSpacing: "-0.02em", marginBottom: 6 }}>
        {featured.name}
      </div>
      <div style={{ fontSize: 28, fontWeight: 800, color: "var(--gold)", letterSpacing: "-0.03em", marginBottom: 20 }}>
        {featured.price}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
        {featured.items.slice(0, 4).map((item) => (
          <div key={item} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 12, color: "var(--text-2)" }}>
            <span style={{ width: 3, height: 3, borderRadius: "50%", background: "var(--gold-dim)", flexShrink: 0, display: "block" }} />
            {item}
          </div>
        ))}
      </div>

      <a href={whatsappLink(WHATSAPP_MESSAGES.product(featured.name))} target="_blank" rel="noopener noreferrer"
        style={{
          display: "block", textAlign: "center", fontSize: 11, fontWeight: 600,
          letterSpacing: "0.08em", padding: "11px", border: "1px solid var(--border-gold)",
          color: "var(--gold)", textDecoration: "none",
        }}
        onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "var(--gold)"; el.style.color = "#000"; }}
        onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "transparent"; el.style.color = "var(--gold)"; }}
      >
        הזמנה בוואטסאפ
      </a>
    </motion.div>
  );
}

/* ── Hero ───────────────────────────────────── */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const headlineY = useTransform(scrollY, [0, 600], [0, -40]);
  const cardY = useTransform(scrollY, [0, 600], [0, -20]);
  const bgOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  const line1 = useScramble("מתנה", 0.4);
  const line2 = useScramble("שלא", 0.7);
  const line3 = useScramble("נשכחת.", 1.0);

  return (
    <section ref={sectionRef} style={{ position: "relative", zIndex: 10, minHeight: "100dvh", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: 64 }}>
      
      {/* Background radial glow */}
      <motion.div aria-hidden="true" style={{ position: "absolute", top: "-20%", right: "-10%", width: "60vw", height: "60vw", maxWidth: 700, maxHeight: 700, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(197,174,121,0.05) 0%, transparent 65%)", pointerEvents: "none", opacity: bgOpacity }} />

      {/* Main content */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(24px,5vw,80px)", width: "100%" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "clamp(40px,6vw,80px)", alignItems: "center" }}>

          {/* Left: Headline + CTA */}
          <motion.div style={{ y: headlineY }}>
            {/* Eyebrow tag */}
            <motion.div
              style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(197,174,121,0.7)", border: "1px solid var(--border-gold)", padding: "5px 12px", marginBottom: 32, background: "var(--gold-faint)" }}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
            >
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--gold)" }} />
              מארזי מתנה יוקרתיים · ישראל
            </motion.div>

            {/* Headline */}
            <h1 style={{ fontWeight: 800, fontSize: "clamp(56px,9vw,110px)", lineHeight: 0.95, letterSpacing: "-0.045em", margin: "0 0 36px" }}>
              <span style={{ display: "block", color: "var(--text)" }}>{line1.display}</span>
              <span style={{ display: "block", color: "var(--text)" }}>{line2.display}</span>
              <span style={{ display: "block", color: "var(--gold)" }}>{line3.display}</span>
            </h1>

            {/* Sub */}
            <motion.p
              style={{ fontSize: "clamp(14px,1.6vw,17px)", lineHeight: 1.7, color: "var(--text-2)", maxWidth: 380, margin: "0 0 40px" }}
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 1.4, ease: EASE }}
            >
              אריזות יוקרה בהתאמה אישית, כרטיס ברכה בכתב יד, משלוח חינם תוך 48 שעות לכל רחבי ישראל.
            </motion.p>

            {/* CTA row */}
            <motion.div
              style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 1.6, ease: EASE }}
            >
              <a href="#products"
                style={{ display: "inline-block", fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", padding: "13px 32px", background: "var(--gold)", color: "#000", textDecoration: "none", flexShrink: 0 }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.85"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
              >גלו את המארזים</a>

              <a href={whatsappLink(WHATSAPP_MESSAGES.hero)} target="_blank" rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 12, fontWeight: 500, color: "var(--text-2)", textDecoration: "none" }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.color = "var(--text)"; const arrow = el.querySelector("[data-arrow]") as HTMLElement; if (arrow) arrow.style.transform = "translateX(4px)"; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.color = "var(--text-2)"; const arrow = el.querySelector("[data-arrow]") as HTMLElement; if (arrow) arrow.style.transform = "translateX(0)"; }}
              >
                <span data-arrow="true" style={{ color: "var(--gold)", transition: "transform 0.25s var(--ease-out-quart)", display: "inline-block" }}>←</span>
                שליחת הודעה
              </a>

              <span style={{ marginRight: "auto", display: "inline-flex", alignItems: "center", gap: 7, fontSize: 11, color: "var(--text-3)" }}>
                <Stars /> 500+ לקוחות מרוצים
              </span>
            </motion.div>
          </motion.div>

          {/* Right: Floating card */}
          <motion.div className="hidden-mobile" style={{ y: cardY }}>
            <HeroCard />
          </motion.div>
        </div>
      </div>

      {/* Info strip */}
      <motion.div
        style={{ borderTop: "1px solid var(--border)", marginTop: "clamp(48px,8vh,80px)", display: "grid", gridTemplateColumns: "repeat(3,1fr)" }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 1.8, ease: EASE }}
      >
        {[
          { label: "What", value: "מארזי יוקרה" },
          { label: "Delivery", value: "48 שעות" },
          { label: "Coverage", value: "כל ישראל" },
        ].map(({ label, value }, i) => (
          <div key={label} style={{ padding: "20px clamp(24px,5vw,80px)", borderLeft: i > 0 ? "1px solid var(--border)" : "none" }}>
            <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-3)", marginBottom: 4 }}>{label}</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text-2)", letterSpacing: "-0.01em" }}>{value}</div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Verify** — hero renders with 2-col layout, scramble effect on load, floating card, info strip at bottom.

- [ ] **Step 3: Commit**
```bash
git add app/components/Hero.tsx
git commit -m "feat: redesign — hero 2-col, text scramble, floating card, info strip"
```

---

## Task 5: Marquee Strip

**Files:**
- Modify: `app/components/Marquee.tsx`

- [ ] **Step 1: Check current Marquee.tsx** — read the file to see current implementation.

- [ ] **Step 2: Rewrite Marquee.tsx**

```tsx
const ITEMS = [
  "✦ מארזי יוקרה",
  "משלוח חינם",
  "48 שעות",
  "500+ לקוחות מרוצים",
  "אריזה אישית",
  "כרטיס ברכה בכתב יד",
];

const SEPARATOR = " · ";

export function Marquee() {
  const content = [...ITEMS, ...ITEMS].join(SEPARATOR);

  return (
    <div style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", overflow: "hidden", background: "rgba(255,255,255,0.01)" }}>
      <div style={{ padding: "11px 0" }}>
        <div className="marquee-track" style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-3)", whiteSpace: "nowrap" }}>
          {content}{SEPARATOR}{content}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Commit**
```bash
git add app/components/Marquee.tsx
git commit -m "feat: redesign — subtle infinite marquee strip"
```

---

## Task 6: Stats — Count-Up Animation

**Files:**
- Modify: `app/components/Stats.tsx`

- [ ] **Step 1: Rewrite Stats.tsx**

```tsx
"use client";

import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function useCountUp(target: number, duration = 1.5, inView = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setValue(target); clearInterval(timer); }
      else setValue(Math.floor(start));
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [target, duration, inView]);
  return value;
}

const STATS = [
  { raw: 500, display: (n: number) => `${n}+`, label: "לקוחות מרוצים", index: "01" },
  { raw: 3,   display: (n: number) => `${n}`,  label: "שנות ניסיון",   index: "02" },
  { raw: 48,  display: (n: number) => `${n}h`, label: "זמן משלוח",     index: "03" },
  { raw: 49,  display: (n: number) => `${(n / 10).toFixed(1)}`, label: "דירוג ממוצע", index: "04" },
] as const;

function StatItem({ raw, display, label, index }: typeof STATS[number]) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const count = useCountUp(raw, 1.4, inView);

  return (
    <div ref={ref} style={{ padding: "clamp(40px,6vw,72px) clamp(16px,3vw,40px)", textAlign: "center" }}>
      <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-3)", marginBottom: 10 }}>
        STAT {index}
      </div>
      <div style={{ fontSize: "clamp(36px,5vw,64px)", fontWeight: 800, letterSpacing: "-0.05em", lineHeight: 1, color: "var(--gold)", marginBottom: 10, fontVariantNumeric: "tabular-nums" }}>
        {display(count)}
      </div>
      <div style={{ fontSize: 11, fontWeight: 400, letterSpacing: "0.06em", color: "var(--text-3)" }}>
        {label}
      </div>
    </div>
  );
}

export function Stats() {
  return (
    <section id="stats" style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)" }}>
        {STATS.map((stat, i) => (
          <div key={stat.label} style={{ borderLeft: i > 0 ? "1px solid var(--border)" : "none" }}>
            <StatItem {...stat} />
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**
```bash
git add app/components/Stats.tsx
git commit -m "feat: redesign — stats count-up animation on scroll"
```

---

## Task 7: WhyUs — Stagger From Sides + BG Numbers

**Files:**
- Modify: `app/components/WhyUs.tsx`

- [ ] **Step 1: Rewrite WhyUs.tsx**

```tsx
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

const FEATURES = [
  { index: "01", title: "עיצוב אישי לכל מארז", desc: "כל מארז עטוף ביד בנייר פרמיום, עם כרטיס ברכה אישי שאנחנו כותבים בכתב יד — בדיוק כמו שפעם עשו זאת." },
  { index: "02", title: "משלוח חינם תוך 48 שעות", desc: "לכל נקודה בישראל, ללא עלות נוספת. אנחנו דואגים שהמארז יגיע בזמן — גם כשהאירוע מחר." },
  { index: "03", title: "3 שנות ניסיון, 500+ לקוחות", desc: "יותר מ-500 מארזים שנשלחו. לקוחות שחוזרים אלינו שוב ושוב. ביקורות אמיתיות — פה למטה." },
] as const;

function FeatureCard({ index, title, desc, i }: { index: string; title: string; desc: string; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const fromRight = i % 2 === 0;

  return (
    <motion.div
      ref={ref}
      style={{ position: "relative", paddingTop: 28, overflow: "hidden" }}
      initial={{ opacity: 0, x: fromRight ? 40 : -40 }}
      animate={inView ? { opacity: 1, x: 0 } : undefined}
      transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
    >
      {/* Background index number */}
      <div aria-hidden="true" style={{ position: "absolute", top: -8, insetInlineEnd: 0, fontSize: "clamp(64px,9vw,100px)", fontWeight: 800, color: "transparent", WebkitTextStroke: "1px rgba(255,255,255,0.04)", lineHeight: 1, userSelect: "none", pointerEvents: "none" }}>
        {index}
      </div>
      <div style={{ borderTop: "1px solid var(--border)", marginBottom: 24 }} />
      <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--text-3)", marginBottom: 12 }}>
        WHY {index}
      </div>
      <h3 style={{ fontSize: "clamp(18px,2vw,22px)", fontWeight: 700, color: "var(--text)", letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: 14, position: "relative" }}>
        {title}
      </h3>
      <p style={{ fontSize: 14, lineHeight: 1.8, color: "var(--text-2)", margin: 0, position: "relative" }}>
        {desc}
      </p>
    </motion.div>
  );
}

export function WhyUs() {
  return (
    <section id="why" style={{ padding: "clamp(80px,12vw,140px) clamp(24px,5vw,80px)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 24, paddingBottom: 48, borderBottom: "1px solid var(--border)", marginBottom: 64 }}>
          <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-3)" }}>
            למה מארזים
          </span>
          <h2 style={{ fontSize: "clamp(28px,4vw,52px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 0.95, color: "var(--text)", margin: 0, maxWidth: 440, textAlign: "right" }}>
            לא סתם מארז.{" "}
            <span style={{ color: "var(--gold)" }}>חוויה.</span>
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))", gap: "clamp(32px,5vw,64px)" }}>
          {FEATURES.map((f, i) => (
            <FeatureCard key={f.index} {...f} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**
```bash
git add app/components/WhyUs.tsx
git commit -m "feat: redesign — WhyUs stagger from sides + faint bg numbers"
```

---

## Task 8: Products — Clean Grid + Hover Glow

**Files:**
- Modify: `app/components/Products.tsx`

- [ ] **Step 1: Rewrite Products.tsx**

Replace the entire file. Keep all imports and product data the same, replace only the JSX styling:

```tsx
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ProductIllustration } from "./ProductIllustration";
import { PRODUCTS, type Product } from "@/lib/products";
import { whatsappLink, WHATSAPP_MESSAGES } from "@/lib/config";

const EASE = [0.22, 1, 0.36, 1] as const;

function ProductCard({ product, index, delay }: { product: Product; index: number; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.6, delay, ease: EASE }}
      whileHover={{ y: -4 }}
      style={{
        border: "1px solid var(--border)",
        background: "var(--bg-surface)",
        display: "flex", flexDirection: "column", height: "100%",
        transition: "border-color 0.25s var(--ease-out-quart)",
        cursor: "default",
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border-gold)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}
    >
      {/* Illustration */}
      <div style={{ height: 188, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", background: "radial-gradient(ellipse at 50% 40%, rgba(197,174,121,0.06) 0%, transparent 70%)", borderBottom: "1px solid var(--border)" }}>
        {product.tag && (
          <div style={{ position: "absolute", top: 12, insetInlineEnd: 12, fontSize: 8, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", padding: "4px 9px", background: "var(--gold)", color: "#000" }}>
            {product.tag}
          </div>
        )}
        <div style={{ position: "absolute", top: 12, insetInlineStart: 12, fontSize: 9, fontWeight: 500, color: "var(--text-3)" }}>
          0{index + 1}
        </div>
        <motion.div
          style={{ width: 136, height: 136 }}
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: index * 1.2 }}
        >
          <ProductIllustration variant={product.key} className="w-full h-full" />
        </motion.div>
      </div>

      {/* Content */}
      <div style={{ padding: "20px 20px 20px", display: "flex", flexDirection: "column", flex: 1 }}>
        <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--gold-dim)", marginBottom: 8 }}>
          {product.tagline}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8, marginBottom: 10 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--text)", letterSpacing: "-0.02em", margin: 0 }}>{product.name}</h3>
          <span style={{ fontSize: 17, fontWeight: 800, color: "var(--gold)", flexShrink: 0 }}>{product.price}</span>
        </div>
        <p style={{ fontSize: 13, lineHeight: 1.75, color: "var(--text-2)", margin: "0 0 14px", flex: 1 }}>{product.desc}</p>
        <ul style={{ listStyle: "none", padding: 0, margin: "0 0 18px", display: "flex", flexDirection: "column", gap: 5 }}>
          {product.items.map((item) => (
            <li key={item} style={{ fontSize: 12, color: "var(--text-3)", display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 3, height: 3, borderRadius: "50%", background: "var(--gold-dim)", flexShrink: 0, display: "block" }} />
              {item}
            </li>
          ))}
        </ul>
        <a href={whatsappLink(WHATSAPP_MESSAGES.product(product.name))} target="_blank" rel="noopener noreferrer"
          style={{ display: "block", textAlign: "center", fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", padding: "11px", border: "1px solid var(--border-gold)", color: "var(--gold)", textDecoration: "none" }}
          onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "var(--gold)"; el.style.color = "#000"; }}
          onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "transparent"; el.style.color = "var(--gold)"; }}
        >הזמנה בוואטסאפ</a>
      </div>
    </motion.div>
  );
}

export function Products() {
  return (
    <section id="products" style={{ padding: "clamp(80px,12vw,140px) clamp(24px,5vw,80px)", background: "var(--bg-surface)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 24, paddingBottom: 48, borderBottom: "1px solid var(--border)", marginBottom: 56 }}>
          <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-3)" }}>
            המארזים שלנו
          </span>
          <h2 style={{ fontSize: "clamp(28px,4vw,52px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 0.95, color: "var(--text)", margin: 0, textAlign: "right" }}>
            בחרו את המארז <span style={{ color: "var(--gold)" }}>המושלם.</span>
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 250px), 1fr))", gap: "clamp(12px,1.5vw,20px)" }}>
          {PRODUCTS.map((p, i) => (
            <ProductCard key={p.key} product={p} index={i} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**
```bash
git add app/components/Products.tsx
git commit -m "feat: redesign — products clean grid + hover glow border"
```

---

## Task 9: Testimonials — Auto-Scroll Marquee

**Files:**
- Modify: `app/components/Testimonials.tsx`

- [ ] **Step 1: Rewrite Testimonials.tsx**

```tsx
const TESTIMONIALS = [
  { name: "מיכל רוזנברג", role: "יום הולדת", quote: "המארז פשוט היה מושלם. הגיע בזמן, עטוף בצורה מרהיבה, והיה ניכר שהושקעה בו מחשבה. אמא שלי הייתה המומה." },
  { name: "יואב כהן", role: "מתנה לעובדים", quote: "הזמנתי 25 מארזים לצוות שלי לחג. השירות היה מדהים, ההתאמה האישית הרשימה את כולם." },
  { name: "שירה לוי", role: "חתונה", quote: "קיבלתי את המארז כמתנה והרגשתי שזה באמת פרמיום. הפרטים הקטנים, הכרטיס האישי, האריזה — הכל ברמה אחרת." },
  { name: "רון אברהם", role: "לידה", quote: "שירות מקצועי ומהיר. המארז הגיע שלוש שעות אחרי ההזמנה. ממליץ בחום לכולם." },
  { name: "נועה שמיר", role: "יום הולדת", quote: "הכי יפה שיכולתי לבקש. כרטיס הברכה בכתב יד גרם לי לבכות. תודה רבה." },
] as const;

function TestiCard({ name, role, quote }: typeof TESTIMONIALS[number]) {
  return (
    <div style={{ flexShrink: 0, width: "clamp(260px,30vw,340px)", padding: "24px 28px", border: "1px solid var(--border)", background: "var(--bg-surface)", marginLeft: 16 }}>
      <div style={{ display: "flex", gap: 2, marginBottom: 14 }}>
        {[...Array(5)].map((_, i) => (
          <svg key={i} width="10" height="10" viewBox="0 0 10 10" fill="var(--gold)" aria-hidden="true">
            <path d="M5 0.5l1.18 2.4 2.64.38-1.91 1.86.45 2.63L5 6.5l-2.36 1.27.45-2.63L1.18 3.28l2.64-.38z" />
          </svg>
        ))}
      </div>
      <p style={{ fontSize: 13, lineHeight: 1.75, color: "var(--text-2)", margin: "0 0 20px", fontStyle: "normal" }}>{quote}</p>
      <div>
        <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text)", marginBottom: 2 }}>{name}</div>
        <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-3)" }}>{role}</div>
      </div>
    </div>
  );
}

export function Testimonials() {
  const doubled = [...TESTIMONIALS, ...TESTIMONIALS];
  return (
    <section id="testimonials" style={{ padding: "clamp(80px,12vw,140px) 0", overflow: "hidden" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(24px,5vw,80px)", marginBottom: 48 }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 24, paddingBottom: 48, borderBottom: "1px solid var(--border)" }}>
          <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-3)" }}>לקוחות מרוצים</span>
          <h2 style={{ fontSize: "clamp(28px,4vw,52px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 0.95, color: "var(--text)", margin: 0, textAlign: "right" }}>
            מה אומרים <span style={{ color: "var(--gold)" }}>עלינו.</span>
          </h2>
        </div>
      </div>
      <div style={{ overflow: "hidden", paddingRight: "clamp(24px,5vw,80px)" }}>
        <div className="testi-track">
          {doubled.map((t, i) => <TestiCard key={`${t.name}-${i}`} {...t} />)}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**
```bash
git add app/components/Testimonials.tsx
git commit -m "feat: redesign — testimonials auto-scroll marquee"
```

---

## Task 10: CTA — Magnetic Button + Radial Glow

**Files:**
- Modify: `app/components/CTA.tsx`

- [ ] **Step 1: Rewrite CTA.tsx**

```tsx
"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { SITE, whatsappLink, WHATSAPP_MESSAGES } from "@/lib/config";

const EASE = [0.22, 1, 0.36, 1] as const;

function MagneticButton({ href, children, primary = false }: { href: string; children: React.ReactNode; primary?: boolean }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLAnchorElement>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLAnchorElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setPos({ x: (e.clientX - cx) * 0.25, y: (e.clientY - cy) * 0.25 });
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "inline-block",
        fontSize: 12, fontWeight: 700, letterSpacing: "0.08em",
        padding: primary ? "14px 36px" : "13px 36px",
        background: primary ? "var(--gold)" : "transparent",
        color: primary ? "#000" : "var(--text-2)",
        border: primary ? "none" : "1px solid var(--border)",
        textDecoration: "none",
        x: pos.x, y: pos.y,
        flexShrink: 0,
      }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      onMouseEnter={(e) => {
        if (!primary) {
          (e.currentTarget as HTMLElement).style.color = "var(--text)";
          (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.15)";
        }
      }}
      onMouseOut={(e) => {
        if (!primary) {
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
    <section id="contact" style={{ padding: "clamp(80px,12vw,140px) clamp(24px,5vw,80px)", position: "relative", overflow: "hidden", borderTop: "1px solid var(--border)" }}>
      {/* Radial glow */}
      <div aria-hidden="true" style={{ position: "absolute", bottom: "-20%", left: "50%", transform: "translateX(-50%)", width: "60vw", height: "60vw", maxWidth: 600, maxHeight: 600, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(197,174,121,0.05) 0%, transparent 65%)", pointerEvents: "none" }} />

      <div ref={ref} style={{ maxWidth: 1200, margin: "0 auto" }}>
        <motion.span
          style={{ display: "block", fontSize: 10, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-3)", marginBottom: 28 }}
          initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6, ease: EASE }}
        >
          יצירת קשר
        </motion.span>

        <motion.h2
          style={{ fontSize: "clamp(40px,7vw,100px)", fontWeight: 800, letterSpacing: "-0.05em", lineHeight: 0.9, color: "var(--text)", margin: "0 0 64px" }}
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
        >
          שלחו הודעה,<br />
          <span style={{ color: "var(--gold)" }}>נחזור {SITE.responseTime}.</span>
        </motion.h2>

        <motion.div
          style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 16, paddingTop: 40, borderTop: "1px solid var(--border)" }}
          initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6, delay: 0.16, ease: EASE }}
        >
          <MagneticButton href={whatsappLink(WHATSAPP_MESSAGES.custom)} primary>הזמנה בוואטסאפ</MagneticButton>
          <MagneticButton href={`tel:${SITE.phoneE164}`}>חייגו אלינו</MagneticButton>
          <span style={{ marginRight: "auto", fontSize: 11, color: "var(--text-3)" }}>
            {SITE.hours} · משלוח חינם ברחבי הארץ
          </span>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**
```bash
git add app/components/CTA.tsx
git commit -m "feat: redesign — CTA magnetic buttons + radial glow"
```

---

## Task 11: Footer — Ultra Minimal

**Files:**
- Modify: `app/components/Footer.tsx`

- [ ] **Step 1: Rewrite Footer.tsx**

```tsx
import { SITE } from "@/lib/config";

export function Footer() {
  return (
    <footer style={{ padding: "24px clamp(24px,5vw,80px)", borderTop: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
      <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gold)" }}>
        {SITE.name}
      </span>
      <p style={{ fontSize: 11, color: "var(--text-3)", margin: 0 }}>
        <span dir="ltr">© {new Date().getFullYear()}</span> · מארזים מעוצבים לכל אירוע
      </p>
    </footer>
  );
}
```

- [ ] **Step 2: Commit**
```bash
git add app/components/Footer.tsx
git commit -m "feat: redesign — minimal footer"
```

---

## Task 12: Cursor + Mobile Polish

**Files:**
- Modify: `app/components/Cursor.tsx`

- [ ] **Step 1: Read current Cursor.tsx** — check existing implementation.

- [ ] **Step 2: Update cursor colors to match new palette**

In `Cursor.tsx`, replace any references to `--cream`, `--gold-30`, etc. with the new tokens:
- `--cream` → `var(--text)`
- `--gold-30` → `var(--gold-dim)`
- `--bg: #0A0A0A` → `var(--bg)`
- Any `rgba(240,234,214,...)` → `rgba(255,255,255,...)`

- [ ] **Step 3: Mobile — verify stats grid collapses**

In `app/globals.css`, add at end of file:

```css
@media (max-width: 640px) {
  #stats > div {
    grid-template-columns: repeat(2, 1fr) !important;
  }
}
```

- [ ] **Step 4: Final commit**
```bash
git add app/components/Cursor.tsx app/globals.css
git commit -m "feat: redesign — cursor + mobile stat grid fix"
```

---

## Self-Review

**Spec coverage:**
- ✅ Design tokens: Task 1
- ✅ Inter font: Task 1
- ✅ Lenis smooth scroll: Task 2
- ✅ Nav + progress bar: Task 3
- ✅ Hero 2-col + floating card + info strip: Task 4
- ✅ Text scramble: Task 4 (useScramble hook in Hero)
- ✅ Marquee strip: Task 5
- ✅ Stats count-up: Task 6
- ✅ WhyUs stagger from sides + bg numbers: Task 7
- ✅ Products hover glow: Task 8
- ✅ Testimonials auto-scroll: Task 9
- ✅ CTA magnetic button + radial glow: Task 10
- ✅ Footer minimal: Task 11
- ✅ Mobile: Task 12 + mobile classes in each component

**Placeholder scan:** None found.

**Type consistency:** `Product` type imported from `@/lib/products` in Task 8 — consistent with existing codebase. `WHATSAPP_MESSAGES.product(name)` function signature matches `lib/config.ts`.
