# Maarzim — Full Redesign Spec
**Date:** 2026-04-11  
**Direction:** Dark luxury minimal — Vercel/Linear aesthetic, pure black, sharp, professional. Nothing loud.

---

## Design System

```
--bg:          #000000
--bg-surface:  #0D0D0D
--bg-card:     #111111
--border:      rgba(255,255,255,0.06)
--border-gold: rgba(197,174,121,0.15)
--text:        #FFFFFF
--text-2:      rgba(255,255,255,0.5)
--text-3:      rgba(255,255,255,0.25)
--gold:        #C5AE79
--gold-dim:    rgba(197,174,121,0.35)
```

**Typography:**
- Hebrew body/headlines: Heebo (existing)
- Labels/numbers: Inter (add via next/font)
- Headlines: weight 700–800, tracking -0.04em
- Labels: weight 500–600, tracking 0.12–0.18em, uppercase

**Spacing:** generous — sections breathe. Padding clamp(80px,12vw,140px) vertical.

---

## Sections

### 1. Nav
- Ultra-thin, transparent. On scroll: `background: rgba(0,0,0,0.8)` + `backdrop-filter: blur(20px)` + `border-bottom: 1px solid var(--border)`
- Left: nav links. Center: MAARZIM logo. Right: "הזמנה" button
- Scroll progress bar: 1px gold line at bottom, fills as user scrolls
- Mobile: hamburger → fullscreen overlay

### 2. Hero
- Layout: 2-col grid. Left: headline + sub + CTA. Right: floating product card
- Headline: `font-size: clamp(52px, 8vw, 96px)`, weight 800, tight tracking
- Background: pure black + subtle radial gold glow top-right (opacity 0.05)
- Floating card right: glassmorphism — `background: rgba(255,255,255,0.03)`, `border: 1px solid var(--border)`, top gold hairline, shows best-seller product
- Info strip at bottom: 3 cols (What / Delivery / Coverage) separated by `1px var(--border)` lines
- **Interactions:** text scramble on load, card hover tilt (3D transform), parallax on scroll

### 3. Marquee Strip
- Single line, very slow (40s), subtle — `opacity: 0.35`
- Content: `✦ מארזי יוקרה · משלוח חינם · 48 שעות · 500+ לקוחות מרוצים`
- `border-top` and `border-bottom`: `1px solid var(--border)`

### 4. Stats
- 4-col grid, borderless except thin dividers between cols
- Numbers: large, gold, weight 800. Labels: small, text-3
- **Interaction:** count-up animation when entering viewport (useInView)

### 5. Why Us
- 2×2 grid. Each cell: thin border, lots of padding
- Large faded index number (01/02/03/04) as background decoration
- **Interaction:** each card slides in from alternating sides on scroll

### 6. Products
- 3-col grid. Outer border wraps entire grid. Dividers between cards.
- Card: illustration area (radial glow bg) + product info below
- Highlighted card (best-seller): `background: rgba(197,174,121,0.03)`
- **Interaction:** card lifts `y: -4px` on hover, border brightens

### 7. Testimonials
- Auto-scrolling horizontal marquee (CSS animation, pauses on hover)
- Each card: minimal — stars, quote text, name/city. No box shadows.
- **Interaction:** blur fade-in (filter: blur → 0, opacity 0 → 1) on scroll enter

### 8. CTA
- Full-width. Centered. Pure black.
- Massive headline, 1-line subtitle, 2 buttons (primary gold + ghost)
- Background: radial glow from bottom center
- **Interaction:** magnetic button (cursor attracts the button), parallax headline

### 9. Footer
- 2-col: brand left, links right. Very minimal.
- Thin gold top border. Small text.

---

## Interactions Summary
- Lenis smooth scroll (install `lenis` or `@studio-freight/lenis`)
- Scroll progress bar in Nav
- Text scramble in Hero headline
- Parallax on Hero (existing, keep)
- Count-up in Stats (useInView from framer-motion)
- Stagger slide-in from sides in WhyUs
- Testimonials auto-scroll marquee
- Magnetic button in CTA
- Blur+fade reveal on all sections (replace current Reveal)

---

## Implementation Notes
- Keep all existing data (products, config, whatsapp links) — only visual layer changes
- Replace globals.css design tokens entirely
- Update each component one by one
- Lenis: wrap in a client component, add to layout
- Mobile: all grids collapse to 1-col, marquees keep scrolling, floating card stacks below headline
