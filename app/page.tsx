'use client'

import React, { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

// ── Design tokens ─────────────────────────────────────────────────────────────
const BG     = '#080608'
const GOLD   = '#C4993A'
const GOLD_L = '#E2BC6D'
const CREAM  = '#F0E6D0'
const SURF   = 'rgba(16,12,8,0.98)'
const G      = (o: number) => `rgba(196,153,58,${o})`
const DIM    = 'rgba(240,230,208,0.42)'
const EASE   = [0.32, 0.72, 0, 1] as const

// ── Scroll-reveal wrapper ─────────────────────────────────────────────────────
function Reveal({ children, delay = 0, className }: {
  children: React.ReactNode; delay?: number; className?: string
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 32, filter: 'blur(6px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.75, delay, ease: EASE }}>
      {children}
    </motion.div>
  )
}

// ── Double-bezel card shell ───────────────────────────────────────────────────
function Bezel({ children, className, style }: {
  children: React.ReactNode; className?: string; style?: React.CSSProperties
}) {
  return (
    <div className={`p-[6px] rounded-[2rem] ${className ?? ''}`}
      style={{
        background: `rgba(255,255,255,0.03)`,
        border: `1px solid ${G(0.14)}`,
        ...style,
      }}>
      <div className="rounded-[calc(2rem-6px)] overflow-hidden h-full"
        style={{
          background: SURF,
          boxShadow: `inset 0 1px 1px rgba(255,255,255,0.07)`,
        }}>
        {children}
      </div>
    </div>
  )
}

// ── Island button ─────────────────────────────────────────────────────────────
function IslandBtn({ children, href, dark = false, onClick }: {
  children: React.ReactNode; href?: string; dark?: boolean; onClick?: () => void
}) {
  const inner = (
    <motion.div
      className="group inline-flex items-center gap-3 rounded-full cursor-pointer select-none"
      style={{
        padding: '14px 14px 14px 22px',
        background: dark ? G(0.12) : GOLD,
        border: dark ? `1px solid ${G(0.25)}` : 'none',
      }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 360, damping: 26 }}
      onClick={onClick}
    >
      <span className="text-[14px] font-bold" style={{ color: dark ? GOLD_L : '#0A0806' }}>
        {children}
      </span>
      <span className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
        style={{ background: dark ? G(0.15) : 'rgba(0,0,0,0.15)' }}>
        <motion.span
          className="text-[13px]"
          style={{ color: dark ? GOLD_L : '#0A0806' }}
          animate={{ x: 0, y: 0 }}
          whileHover={{ x: 1, y: -1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}>
          ↗
        </motion.span>
      </span>
    </motion.div>
  )
  if (href) return <a href={href} className="no-underline" target={href.startsWith('http') ? '_blank' : undefined}>{inner}</a>
  return inner
}

// ── Eyebrow tag ───────────────────────────────────────────────────────────────
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-semibold px-3 py-1.5 rounded-full"
      style={{ color: GOLD_L, border: `1px solid ${G(0.2)}`, background: G(0.06) }}>
      <span className="w-1 h-1 rounded-full" style={{ background: GOLD }} />
      {children}
    </span>
  )
}

// ── Product card (double-bezel) ───────────────────────────────────────────────
interface PCard { name: string; desc: string; price: string; tag?: string; emoji: string; accent: string; large?: boolean; delay?: number }

function ProductCard({ name, desc, price, tag, emoji, accent, large, delay = 0 }: PCard) {
  return (
    <Reveal delay={delay} className={large ? 'md:col-span-7' : 'md:col-span-5'}>
      <motion.div
        whileHover={{ y: -5, transition: { type: 'spring', stiffness: 260, damping: 22 } }}
        className="h-full"
      >
        <Bezel className="h-full">
          <div className="flex flex-col h-full">
            {/* Visual */}
            <div className="relative flex items-center justify-center"
              style={{
                height: large ? 240 : 190,
                background: `radial-gradient(ellipse at 40% 40%, ${accent}22 0%, transparent 65%), ${SURF}`,
              }}>
              {tag && (
                <div className="absolute top-4 left-4 text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                  style={{ background: GOLD, color: '#0A0806' }}>
                  {tag}
                </div>
              )}
              <motion.span
                className="text-[64px] select-none"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}>
                {emoji}
              </motion.span>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-1">
              <div className="flex items-start justify-between gap-3 mb-3">
                <h3 className="text-[18px] font-extrabold leading-tight" style={{ color: CREAM }}>{name}</h3>
                <span className="text-[20px] font-extrabold tabular-nums shrink-0" style={{ color: GOLD }}>{price}</span>
              </div>
              <p className="text-[13px] leading-relaxed flex-1" style={{ color: DIM }}>{desc}</p>
              <div className="mt-5">
                <IslandBtn href={`https://wa.me/972500000000?text=היי, אני מעוניין ב${name}`} dark>
                  הזמנה
                </IslandBtn>
              </div>
            </div>
          </div>
        </Bezel>
      </motion.div>
    </Reveal>
  )
}

// ── Marquee ticker ────────────────────────────────────────────────────────────
const TICKER_ITEMS = ['⬡ עיצוב אישי', '⬡ משלוח חינם', '⬡ 500+ לקוחות מרוצים', '⬡ מוכן תוך 48 שעות', '⬡ כרטיס בכתב יד', '⬡ מארזים פרמיום']

function Marquee() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS]
  return (
    <div className="relative overflow-hidden py-4"
      style={{ borderTop: `1px solid ${G(0.1)}`, borderBottom: `1px solid ${G(0.1)}` }}>
      <motion.div
        className="flex gap-10 whitespace-nowrap"
        animate={{ x: ['0%', '-33.33%'] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}>
        {items.map((item, i) => (
          <span key={i} className="text-[11px] uppercase tracking-[0.18em] font-medium shrink-0"
            style={{ color: G(0.55) }}>
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

// ═════════════════════════════════════════════════════════════════════════════
// PAGE
// ═════════════════════════════════════════════════════════════════════════════

export default function MaarzimPage() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: BG, color: CREAM }}>

      {/* ── Noise overlay ────────────────────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none z-[60]" aria-hidden
        style={{
          opacity: 0.025,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: '180px 180px',
        }} />

      {/* ── Ambient glow ─────────────────────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none z-0" aria-hidden>
        <div style={{
          position: 'absolute', top: '-10%', left: '25%', width: '50%', height: '60%',
          background: `radial-gradient(ellipse at 50% 20%, ${G(0.06)} 0%, transparent 60%)`,
        }} />
      </div>

      {/* ══════════════════════════════════════════════════════════════
          NAV — floating glass pill
      ══════════════════════════════════════════════════════════════ */}
      <div className="relative z-50 flex justify-center pt-6 px-6">
        <nav className="flex items-center justify-between gap-8 rounded-full px-5 py-3"
          style={{
            background: 'rgba(12,9,6,0.85)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: `1px solid ${G(0.15)}`,
            width: '100%', maxWidth: 820,
            boxShadow: `0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 ${G(0.1)}`,
          }}>

          {/* Logo */}
          <a href="/" className="flex items-center gap-2 no-underline shrink-0">
            <div className="w-7 h-7 rounded-xl flex items-center justify-center text-[13px]"
              style={{ background: G(0.15), border: `1px solid ${G(0.25)}` }}>
              🎁
            </div>
            <span className="text-[15px] font-extrabold tracking-tight" style={{
              background: `linear-gradient(90deg, ${GOLD}, ${GOLD_L})`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              Maarzim
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-7">
            {[['מארזים', '#products'], ['למה אנחנו', '#why'], ['יצירת קשר', '#contact']].map(([l, h]) => (
              <a key={l} href={h} className="text-[13px] no-underline transition-opacity hover:opacity-90"
                style={{ color: DIM }}>{l}</a>
            ))}
          </div>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-3">
            <a href="https://wa.me/972500000000" target="_blank"
              className="hidden sm:inline-flex items-center gap-2 rounded-full px-4 py-2 text-[12px] font-bold no-underline"
              style={{ background: GOLD, color: '#0A0806' }}>
              הזמן עכשיו
            </a>

            {/* Hamburger */}
            <button className="relative w-8 h-8 flex flex-col items-center justify-center gap-[5px] md:hidden"
              onClick={() => setMenuOpen(o => !o)} aria-label="menu">
              <motion.span className="block w-5 h-[1.5px] rounded-full origin-center"
                style={{ background: CREAM }}
                animate={menuOpen ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3, ease: EASE }} />
              <motion.span className="block w-5 h-[1.5px] rounded-full"
                style={{ background: CREAM }}
                animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.2 }} />
              <motion.span className="block w-5 h-[1.5px] rounded-full origin-center"
                style={{ background: CREAM }}
                animate={menuOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3, ease: EASE }} />
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8"
            style={{ background: 'rgba(8,6,8,0.96)', backdropFilter: 'blur(24px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}>
            {[['מארזים', '#products'], ['למה אנחנו', '#why'], ['יצירת קשר', '#contact']].map(([l, h], i) => (
              <motion.a key={l} href={h}
                className="text-[28px] font-extrabold no-underline"
                style={{ color: CREAM }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * (i + 1), ease: EASE, duration: 0.5 }}
                onClick={() => setMenuOpen(false)}>
                {l}
              </motion.a>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, ease: EASE, duration: 0.5 }}>
              <IslandBtn href="https://wa.me/972500000000">הזמן עכשיו</IslandBtn>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════════════════════════
          HERO — editorial split
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative z-10 min-h-[100dvh] flex items-center px-6 md:px-16 pt-8 pb-20">
        <div className="w-full max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_420px] gap-16 items-center">

          {/* Left — typography block */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
              className="mb-8">
              <Eyebrow>מארזים מעוצבים לכל אירוע</Eyebrow>
            </motion.div>

            <motion.h1
              className="font-extrabold leading-[0.95] tracking-[-0.04em] mb-8"
              style={{ fontSize: 'clamp(52px, 8vw, 96px)' }}
              initial="hidden"
              animate="visible"
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } } }}>
              {[
                { text: 'מתנה', color: CREAM },
                { text: 'שלא', color: CREAM },
                { text: 'נשכחת.', gold: true },
              ].map(({ text, color, gold }, i) => (
                <motion.span key={i}
                  className="block"
                  style={gold ? {
                    background: `linear-gradient(90deg, ${GOLD}, ${GOLD_L}, ${GOLD})`,
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                  } : { color }}
                  variants={{
                    hidden: { opacity: 0, y: 40, filter: 'blur(14px)' },
                    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { type: 'spring', stiffness: 65, damping: 17 } },
                  }}>
                  {text}
                </motion.span>
              ))}
            </motion.h1>

            <motion.p
              className="text-[16px] leading-[1.75] mb-10 max-w-[440px]"
              style={{ color: DIM }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65, ease: EASE }}>
              מארזי מתנה מעוצבים בקפידה — יום הולדת, חתונה, לידה, חגים. כל מארז עטוף באהבה עם כרטיס אישי בכתב יד.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4 mb-12"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8, ease: EASE }}>
              <IslandBtn href="#products">לצפייה במארזים</IslandBtn>
              <IslandBtn href="https://wa.me/972500000000" dark>💬 וואטסאפ</IslandBtn>
            </motion.div>

            {/* Stats strip */}
            <motion.div
              className="flex items-center gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.0 }}>
              {[['500+', 'לקוחות מרוצים'], ['48h', 'זמן הכנה'], ['₪149', 'החל מ']].map(([n, l]) => (
                <div key={l}>
                  <p className="text-[22px] font-extrabold tabular-nums leading-none" style={{ color: GOLD_L }}>{n}</p>
                  <p className="text-[11px] mt-1" style={{ color: DIM }}>{l}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — floating featured card */}
          <motion.div
            initial={{ opacity: 0, x: 40, rotate: 2 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
            className="hidden md:block">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
              <Bezel>
                <div>
                  {/* Visual */}
                  <div className="relative flex items-center justify-center"
                    style={{
                      height: 260,
                      background: `radial-gradient(ellipse at 40% 35%, ${G(0.18)} 0%, transparent 60%), ${SURF}`,
                    }}>
                    <div className="absolute top-4 left-4 text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                      style={{ background: GOLD, color: '#0A0806' }}>
                      הכי נמכר
                    </div>
                    <span className="text-[80px] select-none">🍷</span>
                  </div>

                  {/* Info */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-[20px] font-extrabold" style={{ color: CREAM }}>מארז פרמיום</h3>
                      <span className="text-[22px] font-extrabold" style={{ color: GOLD }}>₪249</span>
                    </div>
                    <p className="text-[13px] leading-relaxed mb-5" style={{ color: DIM }}>
                      יין, שוקולד בלגי, ממתקים ייחודיים ונרות ריחניים. הבחירה הפופולרית ביותר.
                    </p>
                    <IslandBtn href="https://wa.me/972500000000?text=היי, אני מעוניין במארז פרמיום" dark>
                      הזמנה מיידית
                    </IslandBtn>
                  </div>
                </div>
              </Bezel>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Marquee ticker ───────────────────────────────────────── */}
      <Marquee />

      {/* ══════════════════════════════════════════════════════════════
          PRODUCTS — asymmetric bento
      ══════════════════════════════════════════════════════════════ */}
      <section id="products" className="relative z-10 max-w-[1200px] mx-auto px-6 py-32">
        <Reveal className="mb-16">
          <Eyebrow>המארזים שלנו</Eyebrow>
          <h2 className="font-extrabold tracking-[-0.04em] leading-[1.0] mt-5"
            style={{ fontSize: 'clamp(36px, 5vw, 64px)', color: CREAM }}>
            בחרו את המארז<br />
            <span style={{
              background: `linear-gradient(90deg, ${GOLD}, ${GOLD_L})`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              המושלם.
            </span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Row 1 */}
          <ProductCard large name="מארז קלאסיק" desc="מבחר שוקולדים, תה פרמיום ומפיות מעוצבות. המארז המושלם לכל אירוע ולכל גיל." price="₪149" emoji="🎀" accent={GOLD} delay={0} />
          <ProductCard name="מארז לאקס" desc="ספא קיט מלא, קרמים יוקרתיים ונרות ריחניים נבחרים." price="₪349" emoji="✨" accent="#818CF8" delay={0.1} />

          {/* Row 2 */}
          <ProductCard name="מארז אקסקלוסיב" desc="מארז מלכותי עם שמפניה, מוצרים נבחרים ועטיפה פרמיום." price="₪499" tag="חדש" emoji="👑" accent="#E8C77D" delay={0.2} />
          <ProductCard large name="מארז פרמיום" desc="יין, שוקולד בלגי, ממתקים ייחודיים ונרות ריחניים. הבחירה הפופולרית ביותר בין לקוחותינו." price="₪249" tag="פופולרי" emoji="🍷" accent={GOLD} delay={0.3} />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          WHY — feature grid
      ══════════════════════════════════════════════════════════════ */}
      <section id="why" className="relative z-10 max-w-[1200px] mx-auto px-6 pb-32">
        <Reveal className="mb-16">
          <Eyebrow>למה Maarzim</Eyebrow>
          <h2 className="font-extrabold tracking-[-0.04em] leading-[1.0] mt-5"
            style={{ fontSize: 'clamp(36px, 5vw, 64px)', color: CREAM }}>
            לא סתם מארז.<br />
            <span style={{
              background: `linear-gradient(90deg, ${GOLD}, ${GOLD_L})`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              חוויה שלמה.
            </span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { emoji: '🎨', title: 'עיצוב אישי', desc: 'כל מארז עטוף בנייר פרמיום עם כרטיס ברכה אישי בכתב יד. כי הפרטים הקטנים עושים את ההבדל.' },
            { emoji: '🚚', title: 'משלוח חינם', desc: 'מוציאים תוך 48 שעות. משלוח מהיר לכל נקודה בישראל — ללא עלות נוספת.' },
            { emoji: '⭐', title: '500+ לקוחות', desc: 'מחתונות ועד ימי הולדת, ממשרדים ועד מתנות אישיות — 3 שנים ולא מפסיקים לגדול.' },
          ].map(({ emoji, title, desc }, i) => (
            <Reveal key={title} delay={i * 0.1}>
              <Bezel className="h-full">
                <div className="p-7">
                  <div className="w-11 h-11 rounded-2xl flex items-center justify-center text-[20px] mb-5"
                    style={{ background: G(0.1), border: `1px solid ${G(0.18)}` }}>
                    {emoji}
                  </div>
                  <h3 className="text-[17px] font-extrabold mb-3" style={{ color: CREAM }}>{title}</h3>
                  <p className="text-[13px] leading-relaxed" style={{ color: DIM }}>{desc}</p>
                </div>
              </Bezel>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          CTA
      ══════════════════════════════════════════════════════════════ */}
      <section id="contact" className="relative z-10 px-6 pb-32">
        <Reveal>
          <div className="max-w-[760px] mx-auto text-center">
            <Bezel style={{ boxShadow: `0 0 80px ${G(0.08)}` }}>
              <div className="px-10 py-16">
                <motion.div
                  className="text-[56px] mb-6 inline-block"
                  animate={{ rotate: [0, 8, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
                  🎁
                </motion.div>
                <Eyebrow>מוכנים להזמין?</Eyebrow>
                <h2 className="font-extrabold tracking-[-0.04em] leading-[1.05] mt-5 mb-5"
                  style={{ fontSize: 'clamp(28px, 4vw, 52px)', color: CREAM }}>
                  שלחו הודעה<br />
                  <span style={{
                    background: `linear-gradient(90deg, ${GOLD}, ${GOLD_L})`,
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                  }}>
                    ונחזור תוך שעה.
                  </span>
                </h2>
                <p className="text-[15px] leading-relaxed mb-10 max-w-[420px] mx-auto" style={{ color: DIM }}>
                  אפשר גם להתאים אישית כל מארז לפי הצורך — צבע, תוכן, הקדשה, כמות.
                </p>
                <IslandBtn href="https://wa.me/972500000000?text=היי, אני מעוניין להזמין מארז">
                  💬 הזמינו בוואטסאפ
                </IslandBtn>
                <p className="text-[11px] mt-6" style={{ color: G(0.4) }}>
                  ראשון–שישי · 09:00–20:00 · משלוח חינם
                </p>
              </div>
            </Bezel>
          </div>
        </Reveal>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────── */}
      <footer className="relative z-10 py-8 text-center" style={{ borderTop: `1px solid ${G(0.08)}` }}>
        <p className="text-[12px]" style={{ color: G(0.35) }}>
          © {new Date().getFullYear()} Maarzim · מארזים מעוצבים לכל אירוע
        </p>
      </footer>

    </div>
  )
}
