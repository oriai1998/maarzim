# Dulcedo-Inspired Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the maarzim gift-box site to match Dulcedo-level luxury editorial quality — 2-color palette (#0A0A0A + #C5AE79), cinematic hero with concentric circles, massive bold typography, full-screen sections, and smooth Framer Motion animations.

**Architecture:** Replace aurora-blob hero with Dulcedo-style concentric-circle background + small centered photo card + massive bottom headline. Update every section to editorial layout (large numbers, bold headings, minimal decoration). Add a new Stats section between Features and Products. Keep all existing data (products, testimonials, SITE config) unchanged.

**Tech Stack:** Next.js (App Router), Tailwind CSS, Framer Motion, TypeScript

---

## Design System

### Colors (2 colors only + text)
```
--bg:       #0A0A0A   ← pure black (updated from #080608)
--gold:     #C5AE79   ← warm gold (updated from #C4993A)
--cream:    #F0EAD6   ← off-white body text (keep)
```
All other gold variants recomputed from #C5AE79.

### Typography Scale
```
Display:  clamp(72px, 11vw, 160px)  weight 900  ls -0.05em  lh 0.88
H1:       clamp(52px, 8vw, 110px)   weight 900  ls -0.045em lh 0.90
H2:       clamp(38px, 5.5vw, 72px)  weight 900  ls -0.04em  lh 0.95
H3:       clamp(20px, 2.5vw, 28px)  weight 700  ls -0.02em
Body:     16–18px                   weight 400  lh 1.8
Small:    12–14px                   weight 500  ls 0.08em   uppercase
```

### Spacing System
```
Section padding:  clamp(100px, 14vw, 160px) vertical
Container:        max-width 1200px, padding 0 clamp(24px, 5vw, 80px)
Grid gap:         clamp(24px, 3vw, 48px)
```

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `app/globals.css` | Modify | Color tokens, typography classes, spacing helpers |
| `app/page.tsx` | Modify | Section order: Nav→Hero→Stats→Features→Products→Testimonials→CTA→Footer |
| `app/components/Nav.tsx` | Modify | Dulcedo flat nav (logo center, links left, CTA right) |
| `app/components/hero/BackgroundLayers.tsx` | Modify | Concentric animated circles (replace aurora blobs) |
| `app/components/hero/Stage.tsx` | Modify | Centered photo card with label flanks (replace orbiting SVGs) |
| `app/components/hero/StatsRibbon.tsx` | Delete | Replaced by Stats section |
| `app/components/Hero.tsx` | Modify | Cinematic layout: circles + photo + massive bottom headline |
| `app/components/Stats.tsx` | Create | Full-width 4-stat row with huge numbers |
| `app/components/WhyUs.tsx` | Modify | Editorial 3-col features (no bezel cards — clean borders only) |
| `app/components/Products.tsx` | Modify | Editorial grid, cleaner cards |
| `app/components/Testimonials.tsx` | Modify | Quote-forward minimal layout |
| `app/components/CTA.tsx` | Modify | Full-width editorial CTA |
| `app/components/Footer.tsx` | Modify | Minimal 2-col footer |
| `app/components/Marquee.tsx` | Modify | Simplify to text-only marquee, remove from page or keep minimal |

---

## Task 1: Update Color Tokens & Global Styles

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Update CSS custom properties**

Replace the `:root` block in `app/globals.css` with:

```css
:root {
  --bg: #0A0A0A;
  --bg-elev: #111111;
  --surface: rgba(17, 17, 17, 0.98);
  --surface-2: rgba(22, 22, 22, 0.92);

  --cream: #F0EAD6;
  --cream-dim: rgba(240, 234, 214, 0.60);
  --cream-mute: rgba(240, 234, 214, 0.36);

  --gold: #C5AE79;
  --gold-light: #DFC99A;
  --gold-deep: #8C7540;

  --gold-06: rgba(197, 174, 121, 0.06);
  --gold-10: rgba(197, 174, 121, 0.10);
  --gold-14: rgba(197, 174, 121, 0.14);
  --gold-20: rgba(197, 174, 121, 0.20);
  --gold-30: rgba(197, 174, 121, 0.30);
  --gold-40: rgba(197, 174, 121, 0.40);
  --gold-55: rgba(197, 174, 121, 0.55);

  --ease-out-quart: cubic-bezier(0.32, 0.72, 0, 1);
  --shadow-bezel: 0 8px 32px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(197, 174, 121, 0.08);
  --shadow-glow: 0 0 80px rgba(197, 174, 121, 0.06);
}
```

- [ ] **Step 2: Add editorial typography utility classes**

Append to `app/globals.css` after the existing `.eyebrow` block:

```css
/* Editorial section label */
.section-label {
  display: block;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 24px;
}

/* Thin divider line */
.divider {
  width: 100%;
  height: 1px;
  background: var(--gold-14);
}

/* Full-bleed section */
.section-full {
  position: relative;
  zIndex: 10;
  width: 100%;
  padding: clamp(100px, 14vw, 160px) clamp(24px, 5vw, 80px);
}

/* Centered container */
.container {
  max-width: 1200px;
  margin: 0 auto;
}
```

- [ ] **Step 3: Commit**

```bash
git add app/globals.css
git commit -m "feat: update color tokens to Dulcedo palette (#0A0A0A + #C5AE79)"
```

---

## Task 2: Redesign Nav — Dulcedo Flat Style

**Files:**
- Modify: `app/components/Nav.tsx`

The Dulcedo nav is flat (no pill/capsule), spanning the full width, with links on the left, logo centered, and a single CTA on the right. Minimal. No background blur by default — just a transparent bar that gains a subtle dark bg on scroll.

- [ ] **Step 1: Replace Nav.tsx entirely**

```tsx
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
    fontSize: 12,
    fontWeight: 500,
    letterSpacing: "0.06em",
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
          background: scrolled ? "rgba(10,10,10,0.95)" : "transparent",
          borderBottom: scrolled ? "1px solid var(--gold-14)" : "1px solid transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          transition: "background 0.4s, border-color 0.4s",
        }}
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        {/* Left links */}
        <nav aria-label="ניווט ראשי - שמאל" className="hidden-mobile" style={{ display: "flex", gap: 36 }}>
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
          aria-label={`${SITE.name} - דף הבית`}
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: 18,
            fontWeight: 900,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--gold)",
            textDecoration: "none",
          }}
        >
          {SITE.name}
        </a>

        {/* Right: links + CTA */}
        <div className="hidden-mobile" style={{ display: "flex", alignItems: "center", gap: 36 }}>
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
          <a
            href={whatsappLink(WHATSAPP_MESSAGES.hero)}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.10em",
              textTransform: "uppercase",
              padding: "10px 22px",
              border: "1px solid var(--gold-40)",
              color: "var(--gold)",
              borderRadius: 2,
              transition: "background 0.25s, color 0.25s",
              textDecoration: "none",
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
          style={{ background: "none", border: "none", cursor: "pointer", padding: 8, display: "flex", flexDirection: "column", gap: 5 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              style={{ display: "block", width: 22, height: 1, background: "var(--cream)" }}
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

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="תפריט ניווט"
            style={{
              position: "fixed", inset: 0, zIndex: 45,
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 40,
              background: "#0A0A0A",
            }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {[...LINKS_LEFT, ...LINKS_RIGHT].map(({ label, href }, i) => (
              <motion.a
                key={href} href={href}
                style={{ fontSize: 36, fontWeight: 900, color: "var(--cream)", textDecoration: "none" }}
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, ease: EASE, duration: 0.4 }}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </motion.a>
            ))}
            <motion.a
              href={whatsappLink(WHATSAPP_MESSAGES.hero)}
              style={{
                fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
                padding: "14px 36px", border: "1px solid var(--gold)", color: "var(--gold)",
                textDecoration: "none",
              }}
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
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
```

- [ ] **Step 2: Commit**

```bash
git add app/components/Nav.tsx
git commit -m "feat: Dulcedo-style flat nav with centered logo"
```

---

## Task 3: Hero Background — Concentric Animated Circles

**Files:**
- Modify: `app/components/hero/BackgroundLayers.tsx`

Replace the aurora blobs with two large concentric circles that slowly rotate — exactly the Dulcedo hero background.

- [ ] **Step 1: Replace BackgroundLayers.tsx**

```tsx
"use client";

import { motion } from "framer-motion";

export function BackgroundLayers() {
  return (
    <div
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}
    >
      {/* Concentric circle 1 — outer */}
      <motion.div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "min(90vw, 820px)",
          height: "min(90vw, 820px)",
          borderRadius: "50%",
          border: "1px solid var(--gold-14)",
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
      />

      {/* Concentric circle 2 — inner */}
      <motion.div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "min(60vw, 560px)",
          height: "min(60vw, 560px)",
          borderRadius: "50%",
          border: "1px solid var(--gold-10)",
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{ rotate: -360 }}
        transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
      />

      {/* Very faint center glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "min(50vw, 440px)",
          height: "min(50vw, 440px)",
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(197,174,121,0.05) 0%, transparent 70%)",
          translateX: "-50%",
          translateY: "-50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Bottom vignette */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "35%",
          background: "linear-gradient(to top, #0A0A0A 0%, transparent 100%)",
        }}
      />
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/components/hero/BackgroundLayers.tsx
git commit -m "feat: Dulcedo concentric circle hero background"
```

---

## Task 4: Hero Stage — Centered Photo Card

**Files:**
- Modify: `app/components/hero/Stage.tsx`

Replace the orbiting SVG gift box with a centered portrait-format photo card (like the Dulcedo model photo). Since we don't have a real photo, use a dark gold-tinted placeholder rectangle. Add "WE ARE" / "MAARZIM®" flanking text like Dulcedo.

- [ ] **Step 1: Replace Stage.tsx**

```tsx
"use client";

import { motion } from "framer-motion";
import { SITE } from "@/lib/config";

const EASE = [0.32, 0.72, 0, 1] as const;

export function Stage() {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        display: "flex",
        alignItems: "center",
        gap: "clamp(24px, 4vw, 64px)",
        zIndex: 3,
      }}
    >
      {/* Left flank label */}
      <motion.p
        className="hidden-mobile"
        style={{
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "var(--cream-mute)",
          writingMode: "vertical-rl",
          textOrientation: "mixed",
          transform: "rotate(180deg)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        אנחנו הם
      </motion.p>

      {/* Center photo card */}
      <motion.div
        style={{
          width: "clamp(130px, 18vw, 220px)",
          aspectRatio: "3 / 4",
          overflow: "hidden",
          position: "relative",
          border: "1px solid var(--gold-20)",
        }}
        initial={{ opacity: 0, scale: 0.88, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4, ease: EASE }}
      >
        {/* Placeholder — replace src with real image */}
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "linear-gradient(160deg, #1a1610 0%, #0d0c08 50%, #1a1208 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Gift box icon as placeholder */}
          <svg viewBox="0 0 80 80" fill="none" width="60" height="60" aria-hidden="true">
            <rect x="10" y="36" width="60" height="34" rx="1" stroke="var(--gold-40)" strokeWidth="1" />
            <rect x="10" y="28" width="60" height="10" rx="1" stroke="var(--gold-40)" strokeWidth="1" />
            <line x1="40" y1="28" x2="40" y2="70" stroke="var(--gold-30)" strokeWidth="1" />
            <path d="M40 28 C36 20 28 22 30 28" stroke="var(--gold-40)" strokeWidth="1" fill="none" />
            <path d="M40 28 C44 20 52 22 50 28" stroke="var(--gold-40)" strokeWidth="1" fill="none" />
          </svg>
        </div>

        {/* Overlay shimmer */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(110deg, transparent 30%, rgba(197,174,121,0.06) 50%, transparent 70%)",
            backgroundSize: "200% 100%",
          }}
          animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear", repeatDelay: 3 }}
        />
      </motion.div>

      {/* Right flank label */}
      <motion.p
        className="hidden-mobile"
        style={{
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "var(--cream-mute)",
          writingMode: "vertical-rl",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        {SITE.name}®
      </motion.p>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/components/hero/Stage.tsx
git commit -m "feat: Dulcedo-style centered photo card with flanking labels"
```

---

## Task 5: Cinematic Hero Section

**Files:**
- Modify: `app/components/Hero.tsx`

Dulcedo's hero: full-screen, circles in the middle, small photo floating in center, massive headline at the very bottom of the section. Minimal text. Single CTA.

- [ ] **Step 1: Replace Hero.tsx**

```tsx
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { BackgroundLayers } from "./hero/BackgroundLayers";
import { Stage } from "./hero/Stage";
import { whatsappLink, WHATSAPP_MESSAGES } from "@/lib/config";

const EASE = [0.32, 0.72, 0, 1] as const;

const HEADLINE_WORDS = ["מתנה", "שלא", "נשכחת."];

function LetterReveal({ word, delay, gold }: { word: string; delay: number; gold?: boolean }) {
  return (
    <motion.span
      style={{ display: "block" }}
      initial="hidden"
      animate="visible"
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.03, delayChildren: delay } } }}
    >
      {Array.from(word).map((char, i) => (
        <motion.span
          key={i}
          style={{
            display: "inline-block",
            color: gold ? "var(--gold)" : "var(--cream)",
          }}
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 60, damping: 14 } },
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const stageY = useTransform(scrollY, [0, 600], [0, -80]);
  const headlineY = useTransform(scrollY, [0, 600], [0, -40]);

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
      }}
    >
      <BackgroundLayers />

      {/* Center stage with parallax */}
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
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
          padding: "0 clamp(24px, 5vw, 80px) clamp(48px, 8vh, 80px)",
          y: headlineY,
        }}
      >
        {/* Eyebrow */}
        <motion.span
          style={{
            display: "block",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--gold)",
            marginBottom: 20,
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
        >
          מארזי מתנה יוקרתיים · משלוח חינם · 48 שעות
        </motion.span>

        {/* Massive headline */}
        <h1
          style={{
            fontWeight: 900,
            fontSize: "clamp(64px, 11vw, 150px)",
            lineHeight: 0.88,
            letterSpacing: "-0.05em",
            margin: 0,
            marginBottom: 36,
          }}
        >
          {HEADLINE_WORDS.map((word, i) => (
            <LetterReveal
              key={word}
              word={word}
              delay={0.5 + i * 0.15}
              gold={i === 2}
            />
          ))}
        </h1>

        {/* CTA row */}
        <motion.div
          style={{ display: "flex", alignItems: "center", gap: 32, flexWrap: "wrap" }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1, ease: EASE }}
        >
          <a
            href="#products"
            style={{
              display: "inline-block",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              padding: "14px 36px",
              background: "var(--gold)",
              color: "#0A0A0A",
              textDecoration: "none",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.85"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
          >
            גלו את המארזים
          </a>

          <a
            href={whatsappLink(WHATSAPP_MESSAGES.hero)}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.10em",
              textTransform: "uppercase",
              color: "var(--cream-dim)",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: 10,
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--cream)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--cream-dim)"; }}
          >
            <span>→</span>
            <span>שליחת הודעה</span>
          </a>

          {/* Social proof */}
          <span style={{ fontSize: 12, color: "var(--cream-mute)", marginRight: "auto" }}>
            ⭐⭐⭐⭐⭐ · 500+ לקוחות מרוצים
          </span>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        style={{
          position: "absolute",
          bottom: 28,
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
        transition={{ delay: 1.8, duration: 0.6 }}
      >
        <motion.div
          style={{ width: 1, height: 48, background: "linear-gradient(to bottom, var(--gold), transparent)" }}
          animate={{ scaleY: [0.4, 1, 0.4], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/components/Hero.tsx
git commit -m "feat: cinematic Dulcedo-style hero with parallax and massive headline"
```

---

## Task 6: New Stats Section

**Files:**
- Create: `app/components/Stats.tsx`

A full-width dark section with 4 large numbers — editorial, no cards, just big type and thin dividers.

- [ ] **Step 1: Create Stats.tsx**

```tsx
import { Reveal } from "./Reveal";

const STATS = [
  { number: "500+", label: "לקוחות מרוצים" },
  { number: "3", label: "שנות ניסיון" },
  { number: "48h", label: "זמן משלוח" },
  { number: "4.9", label: "דירוג ממוצע" },
] as const;

export function Stats() {
  return (
    <section
      id="stats"
      style={{
        position: "relative",
        zIndex: 10,
        borderTop: "1px solid var(--gold-14)",
        borderBottom: "1px solid var(--gold-14)",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 clamp(24px, 5vw, 80px)",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 0,
        }}
      >
        {STATS.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 0.08}>
            <div
              style={{
                padding: "clamp(48px, 7vw, 80px) clamp(16px, 3vw, 40px)",
                borderRight: i < STATS.length - 1 ? "1px solid var(--gold-14)" : "none",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: "clamp(44px, 6vw, 80px)",
                  fontWeight: 900,
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                  color: "var(--gold)",
                  marginBottom: 12,
                }}
              >
                {stat.number}
              </div>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--cream-mute)",
                }}
              >
                {stat.label}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/components/Stats.tsx
git commit -m "feat: editorial stats section with large numbers"
```

---

## Task 7: Redesign Features (WhyUs) — Editorial 3-col

**Files:**
- Modify: `app/components/WhyUs.tsx`

Remove bezel cards. Use a 3-col grid with a large index number, bold title, and description. Thin top border as the only divider.

- [ ] **Step 1: Replace WhyUs.tsx**

```tsx
import { Reveal } from "./Reveal";

const FEATURES = [
  {
    index: "01",
    title: "עיצוב אישי לכל מארז",
    desc: "כל מארז עטוף ביד בנייר פרמיום, עם כרטיס ברכה אישי שאנחנו כותבים בכתב יד — בדיוק כמו שפעם עשו זאת.",
  },
  {
    index: "02",
    title: "משלוח חינם תוך 48 שעות",
    desc: "לכל נקודה בישראל, ללא עלות נוספת. אנחנו דואגים שהמארז יגיע בזמן — גם כשהאירוע מחר.",
  },
  {
    index: "03",
    title: "3 שנות ניסיון, 500+ לקוחות",
    desc: "יותר מ-500 מארזים שנשלחו. לקוחות שחוזרים אלינו שוב ושוב. ביקורות פה למטה.",
  },
] as const;

export function WhyUs() {
  return (
    <section
      id="why"
      style={{
        position: "relative",
        zIndex: 10,
        padding: "clamp(100px, 14vw, 160px) clamp(24px, 5vw, 80px)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Section header */}
        <Reveal>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 24,
              paddingBottom: 48,
              borderBottom: "1px solid var(--gold-14)",
              marginBottom: 64,
            }}
          >
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--gold)",
              }}
            >
              למה מארזים
            </span>
            <h2
              style={{
                fontSize: "clamp(36px, 5vw, 64px)",
                fontWeight: 900,
                letterSpacing: "-0.04em",
                lineHeight: 0.95,
                color: "var(--cream)",
                margin: 0,
                maxWidth: 520,
                textAlign: "right",
              }}
            >
              לא סתם מארז.
              <br />
              <span style={{ color: "var(--gold)" }}>חוויה.</span>
            </h2>
          </div>
        </Reveal>

        {/* Features grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))",
            gap: "clamp(32px, 4vw, 64px)",
          }}
        >
          {FEATURES.map(({ index, title, desc }, i) => (
            <Reveal key={index} delay={i * 0.1}>
              <div style={{ paddingTop: 28, borderTop: "1px solid var(--gold-14)" }}>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.2em",
                    color: "var(--gold-40)",
                    marginBottom: 20,
                  }}
                >
                  {index}
                </div>
                <h3
                  style={{
                    fontSize: "clamp(20px, 2.2vw, 26px)",
                    fontWeight: 800,
                    color: "var(--cream)",
                    letterSpacing: "-0.02em",
                    lineHeight: 1.2,
                    marginBottom: 16,
                  }}
                >
                  {title}
                </h3>
                <p style={{ fontSize: 15, lineHeight: 1.8, color: "var(--cream-dim)", margin: 0 }}>{desc}</p>
              </div>
            </Reveal>
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
git commit -m "feat: editorial 3-col features section without cards"
```

---

## Task 8: Redesign Products — Editorial Grid

**Files:**
- Modify: `app/components/Products.tsx`

Keep same data structure. Remove the Bezel wrapper. Use cleaner, flatter cards — thin border, no rounded corners on outer, let the product illustration breathe.

- [ ] **Step 1: Replace Products.tsx**

```tsx
"use client";

import { motion } from "framer-motion";
import { Reveal } from "./Reveal";
import { ProductIllustration } from "./ProductIllustration";
import { PRODUCTS, type Product } from "@/lib/products";
import { whatsappLink, WHATSAPP_MESSAGES } from "@/lib/config";

export function Products() {
  return (
    <section
      id="products"
      style={{
        position: "relative",
        zIndex: 10,
        padding: "clamp(100px, 14vw, 160px) clamp(24px, 5vw, 80px)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <Reveal>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 24,
              paddingBottom: 48,
              borderBottom: "1px solid var(--gold-14)",
              marginBottom: 64,
            }}
          >
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--gold)",
              }}
            >
              המארזים שלנו
            </span>
            <h2
              style={{
                fontSize: "clamp(36px, 5vw, 64px)",
                fontWeight: 900,
                letterSpacing: "-0.04em",
                lineHeight: 0.95,
                color: "var(--cream)",
                margin: 0,
                maxWidth: 520,
                textAlign: "right",
              }}
            >
              בחרו את המארז{" "}
              <span style={{ color: "var(--gold)" }}>המושלם.</span>
            </h2>
          </div>
        </Reveal>

        {/* Product grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 260px), 1fr))",
            gap: "clamp(16px, 2vw, 24px)",
          }}
        >
          {PRODUCTS.map((p, i) => (
            <ProductCard key={p.key} product={p} delay={i * 0.09} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product, delay }: { product: Product; delay: number }) {
  return (
    <Reveal delay={delay}>
      <motion.div
        style={{
          border: "1px solid var(--gold-14)",
          background: "var(--surface)",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          cursor: "default",
          transition: "border-color 0.3s",
        }}
        whileHover={{ y: -6, borderColor: "var(--gold-30)" } as object}
        transition={{ type: "spring", stiffness: 200, damping: 22 }}
      >
        {/* Illustration area */}
        <div
          style={{
            height: 200,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            background: "radial-gradient(ellipse at 50% 40%, rgba(197,174,121,0.08) 0%, transparent 70%)",
            borderBottom: "1px solid var(--gold-10)",
          }}
        >
          {product.tag && (
            <div
              style={{
                position: "absolute",
                top: 14,
                insetInlineEnd: 14,
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                padding: "4px 10px",
                background: "var(--gold)",
                color: "#0A0A0A",
              }}
            >
              {product.tag}
            </div>
          )}
          <motion.div
            style={{ width: 150, height: 150 }}
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ProductIllustration variant={product.key} className="w-full h-full" />
          </motion.div>
        </div>

        {/* Content */}
        <div style={{ padding: "24px", display: "flex", flexDirection: "column", flex: 1 }}>
          <div
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--gold)",
              marginBottom: 8,
            }}
          >
            {product.tagline}
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12 }}>
            <h3 style={{ fontSize: 18, fontWeight: 900, color: "var(--cream)", letterSpacing: "-0.02em", margin: 0 }}>
              {product.name}
            </h3>
            <span style={{ fontSize: 20, fontWeight: 900, color: "var(--gold)", letterSpacing: "-0.02em" }}>
              {product.price}
            </span>
          </div>

          <p style={{ fontSize: 13, lineHeight: 1.75, color: "var(--cream-dim)", margin: "0 0 16px", flex: 1 }}>
            {product.desc}
          </p>

          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 20px", display: "flex", flexDirection: "column", gap: 5 }}>
            {product.items.map((item) => (
              <li key={item} style={{ fontSize: 12, color: "var(--cream-mute)", display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ color: "var(--gold-55)", fontSize: 10 }}>—</span>
                {item}
              </li>
            ))}
          </ul>

          <a
            href={whatsappLink(WHATSAPP_MESSAGES.product(product.name))}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "block",
              textAlign: "center",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              padding: "12px",
              border: "1px solid var(--gold-30)",
              color: "var(--gold)",
              textDecoration: "none",
              transition: "background 0.2s, color 0.2s",
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
            הזמנה בוואטסאפ
          </a>
        </div>
      </motion.div>
    </Reveal>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/components/Products.tsx
git commit -m "feat: editorial flat product cards redesign"
```

---

## Task 9: Redesign Testimonials — Quote-Forward

**Files:**
- Modify: `app/components/Testimonials.tsx`

Remove bezel cards. Large quotation mark, big quote text, minimal attribution. Horizontal scrolling on mobile.

- [ ] **Step 1: Replace Testimonials.tsx**

```tsx
import { Reveal } from "./Reveal";

interface Testimonial {
  name: string;
  role: string;
  quote: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "מיכל רוזנברג",
    role: "הזמנה ליום הולדת",
    quote: "המארז פשוט היה מושלם. הגיע בזמן, עטוף בצורה מרהיבה, והיה ניכר שהושקעה בו מחשבה. אמא שלי הייתה המומה.",
  },
  {
    name: "יואב כהן",
    role: "מתנה לעובדים",
    quote: "הזמנתי 25 מארזים לצוות שלי לחג. השירות היה מדהים, ההתאמה האישית הרשימה את כולם. נחזור להזמין בוודאות.",
  },
  {
    name: "שירה לוי",
    role: "הזמנה לחתונה",
    quote: "קיבלתי את המארז כמתנה והרגשתי שזה באמת פרמיום. הפרטים הקטנים, הכרטיס האישי, האריזה — הכל ברמה אחרת.",
  },
];

export function Testimonials() {
  return (
    <section
      id="testimonials"
      style={{
        position: "relative",
        zIndex: 10,
        padding: "clamp(100px, 14vw, 160px) clamp(24px, 5vw, 80px)",
        background: "var(--bg-elev)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <Reveal>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 24,
              paddingBottom: 48,
              borderBottom: "1px solid var(--gold-14)",
              marginBottom: 64,
            }}
          >
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--gold)",
              }}
            >
              לקוחות
            </span>
            <h2
              style={{
                fontSize: "clamp(36px, 5vw, 64px)",
                fontWeight: 900,
                letterSpacing: "-0.04em",
                lineHeight: 0.95,
                color: "var(--cream)",
                margin: 0,
                textAlign: "right",
              }}
            >
              מה אומרים{" "}
              <span style={{ color: "var(--gold)" }}>עלינו.</span>
            </h2>
          </div>
        </Reveal>

        {/* Testimonials */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))",
            gap: "clamp(32px, 4vw, 64px)",
          }}
        >
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <div style={{ paddingTop: 28, borderTop: "1px solid var(--gold-14)" }}>
                {/* Large quotation mark */}
                <div
                  style={{
                    fontSize: 64,
                    lineHeight: 1,
                    color: "var(--gold-20)",
                    fontWeight: 900,
                    marginBottom: 16,
                    fontFamily: "serif",
                  }}
                >
                  "
                </div>
                <blockquote
                  style={{
                    fontSize: "clamp(16px, 1.8vw, 19px)",
                    lineHeight: 1.75,
                    color: "var(--cream)",
                    margin: "0 0 28px",
                    fontStyle: "normal",
                  }}
                >
                  {t.quote}
                </blockquote>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "var(--gold)", marginBottom: 4 }}>{t.name}</div>
                  <div style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--cream-mute)" }}>
                    {t.role}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/components/Testimonials.tsx
git commit -m "feat: quote-forward testimonials without card containers"
```

---

## Task 10: Redesign CTA — Full-Width Editorial

**Files:**
- Modify: `app/components/CTA.tsx`

Remove the centered bezel box. Full-width section, massive headline, two side-by-side CTAs.

- [ ] **Step 1: Replace CTA.tsx**

```tsx
import { Reveal } from "./Reveal";
import { SITE, whatsappLink, WHATSAPP_MESSAGES } from "@/lib/config";

export function CTA() {
  return (
    <section
      id="contact"
      style={{
        position: "relative",
        zIndex: 10,
        padding: "clamp(100px, 14vw, 160px) clamp(24px, 5vw, 80px)",
        borderTop: "1px solid var(--gold-14)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Reveal>
          <span
            style={{
              display: "block",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--gold)",
              marginBottom: 32,
            }}
          >
            יצירת קשר
          </span>
        </Reveal>

        <Reveal delay={0.1}>
          <h2
            style={{
              fontSize: "clamp(48px, 8vw, 120px)",
              fontWeight: 900,
              letterSpacing: "-0.05em",
              lineHeight: 0.88,
              color: "var(--cream)",
              margin: "0 0 64px",
            }}
          >
            שלחו הודעה,
            <br />
            <span style={{ color: "var(--gold)" }}>נחזור {SITE.responseTime}.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 20,
              paddingTop: 48,
              borderTop: "1px solid var(--gold-14)",
            }}
          >
            <a
              href={whatsappLink(WHATSAPP_MESSAGES.custom)}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                padding: "16px 40px",
                background: "var(--gold)",
                color: "#0A0A0A",
                textDecoration: "none",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.85"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
            >
              הזמנה בוואטסאפ
            </a>

            <a
              href={`tel:${SITE.phoneE164}`}
              style={{
                display: "inline-block",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                padding: "16px 40px",
                border: "1px solid var(--gold-30)",
                color: "var(--gold)",
                textDecoration: "none",
                transition: "background 0.2s, color 0.2s",
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
              חייגו אלינו
            </a>

            <span style={{ marginRight: "auto", fontSize: 12, color: "var(--cream-mute)" }}>
              {SITE.hours} · משלוח חינם ברחבי הארץ
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/components/CTA.tsx
git commit -m "feat: full-width editorial CTA section"
```

---

## Task 11: Redesign Footer — Minimal

**Files:**
- Modify: `app/components/Footer.tsx`

- [ ] **Step 1: Replace Footer.tsx**

```tsx
import { SITE } from "@/lib/config";

export function Footer() {
  return (
    <footer
      style={{
        position: "relative",
        zIndex: 10,
        padding: "32px clamp(24px, 5vw, 80px)",
        borderTop: "1px solid var(--gold-14)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 16,
      }}
    >
      <span
        style={{
          fontSize: 16,
          fontWeight: 900,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--gold)",
        }}
      >
        {SITE.name}
      </span>
      <p style={{ fontSize: 11, color: "var(--cream-mute)", letterSpacing: "0.06em" }}>
        <span dir="ltr">© {new Date().getFullYear()}</span> · מארזים מעוצבים לכל אירוע
      </p>
    </footer>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/components/Footer.tsx
git commit -m "feat: minimal two-col footer"
```

---

## Task 12: Update Page Assembly & Remove Marquee

**Files:**
- Modify: `app/page.tsx`

Update section order: Hero → Stats → WhyUs → Products → Testimonials → CTA → Footer. Remove `<Marquee />` (it breaks the editorial rhythm). Remove the ambient glow overlays (replaced by hero's own layers).

- [ ] **Step 1: Replace page.tsx**

```tsx
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Stats } from "./components/Stats";
import { WhyUs } from "./components/WhyUs";
import { Products } from "./components/Products";
import { Testimonials } from "./components/Testimonials";
import { CTA } from "./components/CTA";
import { Footer } from "./components/Footer";

export default function MaarzimPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--cream)", overflowX: "hidden" }}>
      <div className="noise-overlay" aria-hidden="true" />
      <Nav />
      <Hero />
      <Stats />
      <WhyUs />
      <Products />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/page.tsx
git commit -m "feat: assemble redesigned page, remove marquee"
```

---

## Task 13: Mobile Responsiveness Check

**Files:**
- Modify: `app/globals.css`

Add a responsive grid rule for Stats section so it goes 2x2 on mobile.

- [ ] **Step 1: Add to globals.css**

Append to `app/globals.css`:

```css
/* Stats grid — 2 cols on mobile */
@media (max-width: 640px) {
  #stats > div > div:nth-child(even) {
    border-right: none;
  }
  #stats > div {
    grid-template-columns: repeat(2, 1fr) !important;
  }
  #stats > div > div:nth-child(1),
  #stats > div > div:nth-child(2) {
    border-bottom: 1px solid var(--gold-14);
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add app/globals.css
git commit -m "fix: stats grid 2x2 on mobile"
```

---

## Self-Review

### Spec Coverage Check
| Requirement | Task |
|-------------|------|
| Dulcedo-inspired luxury design | Tasks 1–5 |
| 2-color palette (#0A0A0A + #C5AE79) | Task 1 |
| Cinematic hero with circles | Tasks 3, 4, 5 |
| Bold massive typography | Task 5, all sections |
| Flat Dulcedo-style nav | Task 2 |
| Stats section | Task 6 |
| Features grid (editorial, no cards) | Task 7 |
| Products editorial | Task 8 |
| Testimonials quote-forward | Task 9 |
| CTA full-width | Task 10 |
| Minimal footer | Task 11 |
| Framer Motion fade-in, stagger, upward | Reveal.tsx (unchanged, already correct) |
| Parallax scroll | Task 5 (Hero) |
| Hover effects on CTAs | Tasks 2, 8, 10 |
| Mobile responsive | Task 13 |

### Placeholder Scan
No TBDs, TODOs, or vague steps. All code is complete.

### Type Consistency
- `Product` type imported from `@/lib/products` — unchanged
- `SITE`, `whatsappLink`, `WHATSAPP_MESSAGES` from `@/lib/config` — unchanged
- `Reveal` component from `./Reveal` — unchanged, works as-is
