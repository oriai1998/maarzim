'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// ── Design tokens ─────────────────────────────────────────────────────────────
const BG     = '#09070A'
const GOLD   = '#C9A84C'
const GOLD_L = '#E8C77D'
const CREAM  = '#F5ECD7'
const SURF   = 'rgba(22,18,12,0.96)'
const BDR    = (o: number) => `rgba(201,168,76,${o})`
const DIM    = 'rgba(245,236,215,0.5)'

// ── Fade-up animation wrapper ─────────────────────────────────────────────────
function FadeUp({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  )
}

// ── Section pill label ────────────────────────────────────────────────────────
function SectionPill({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center mb-8">
      <span className="text-[12px] px-4 py-1.5 rounded-full"
        style={{ color: GOLD_L, border: `1px solid ${BDR(0.25)}`, background: BDR(0.06) }}>
        {children}
      </span>
    </div>
  )
}

// ── Product card ──────────────────────────────────────────────────────────────
interface ProductProps {
  name: string
  desc: string
  price: string
  tag?: string
  gradient: string
  emoji: string
  delay: number
}

function ProductCard({ name, desc, price, tag, gradient, emoji, delay }: ProductProps) {
  return (
    <FadeUp delay={delay}>
      <motion.div
        className="rounded-2xl overflow-hidden h-full"
        style={{ background: SURF, border: `1px solid ${BDR(0.16)}` }}
        whileHover={{ y: -6, boxShadow: `0 20px 60px rgba(0,0,0,0.5), 0 0 30px ${BDR(0.08)}` }}
        transition={{ type: 'spring', stiffness: 200, damping: 22 }}
      >
        <div className="relative h-52 flex items-center justify-center"
          style={{ background: gradient }}>
          {tag && (
            <div className="absolute top-3 right-3 text-[10px] font-bold px-3 py-1 rounded-full"
              style={{ background: GOLD, color: '#0A0806' }}>
              {tag}
            </div>
          )}
          <span className="text-[72px] select-none">{emoji}</span>
        </div>
        <div className="p-5">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-[17px] font-bold" style={{ color: CREAM }}>{name}</h3>
            <span className="text-[18px] font-extrabold" style={{ color: GOLD }}>{price}</span>
          </div>
          <p className="text-[13px] leading-snug mb-4" style={{ color: DIM }}>{desc}</p>
          <motion.button
            className="w-full py-2.5 rounded-xl text-[13px] font-semibold"
            style={{ background: BDR(0.1), border: `1px solid ${BDR(0.22)}`, color: GOLD_L }}
            whileHover={{ background: `rgba(201,168,76,0.18)` }}
            whileTap={{ scale: 0.97 }}
            onClick={() => window.open(`https://wa.me/972500000000?text=היי, אני מעוניין ב${name}`, '_blank')}
          >
            להזמנה בוואטסאפ
          </motion.button>
        </div>
      </motion.div>
    </FadeUp>
  )
}

// ── Feature card ──────────────────────────────────────────────────────────────
function FeatureCard({ emoji, title, desc, delay }: { emoji: string; title: string; desc: string; delay: number }) {
  return (
    <FadeUp delay={delay}>
      <div className="p-6 rounded-2xl h-full"
        style={{ background: SURF, border: `1px solid ${BDR(0.12)}` }}>
        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-[22px] mb-4"
          style={{ background: BDR(0.1), border: `1px solid ${BDR(0.2)}` }}>
          {emoji}
        </div>
        <h3 className="text-[16px] font-bold mb-2" style={{ color: CREAM }}>{title}</h3>
        <p className="text-[13px] leading-relaxed" style={{ color: DIM }}>{desc}</p>
      </div>
    </FadeUp>
  )
}

// ═════════════════════════════════════════════════════════════════════════════
// PAGE
// ═════════════════════════════════════════════════════════════════════════════

export default function MaarzimPage() {
  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: BG, color: CREAM }}>

      {/* Ambient gold glow */}
      <div className="fixed inset-0 pointer-events-none z-0" aria-hidden>
        <div style={{
          position: 'absolute', top: 0, left: '20%', width: '60%', height: '50%',
          background: `radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.07) 0%, transparent 65%)`,
        }} />
      </div>

      {/* ══════════════════════════════════════════════════════════════
          NAV
      ══════════════════════════════════════════════════════════════ */}
      <nav className="relative z-50 flex items-center justify-between px-6 md:px-12 py-5"
        style={{ borderBottom: `1px solid ${BDR(0.1)}` }}>

        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center text-[16px]"
            style={{ background: BDR(0.12), border: `1px solid ${BDR(0.28)}` }}>
            🎁
          </div>
          <span className="text-[18px] font-extrabold tracking-tight gold-shimmer">Maarzim</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {[['מארזים', '#products'], ['למה אנחנו', '#why'], ['צור קשר', '#contact']].map(([label, href]) => (
            <a key={label} href={href}
              className="text-[14px] no-underline transition-opacity hover:opacity-100"
              style={{ color: DIM }}>
              {label}
            </a>
          ))}
        </div>

        <motion.a
          href="https://wa.me/972500000000"
          target="_blank"
          className="flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-bold no-underline"
          style={{ background: GOLD, color: '#0A0806' }}
          whileHover={{ scale: 1.04, y: -1 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
        >
          הזמן עכשיו
        </motion.a>
      </nav>

      {/* ══════════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative z-10 flex flex-col items-center text-center px-6 pt-24 pb-20">

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 text-[12px] px-4 py-1.5 rounded-full"
            style={{ color: GOLD_L, border: `1px solid ${BDR(0.22)}`, background: BDR(0.06) }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: GOLD, boxShadow: `0 0 6px ${GOLD}` }} />
            משלוח חינם בכל הארץ
          </span>
        </motion.div>

        <motion.h1
          className="font-extrabold leading-[1.1] tracking-tight mb-6 max-w-[700px]"
          style={{ fontSize: 'clamp(42px, 7vw, 80px)' }}
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.25 } } }}
        >
          {['מארזים', 'שמדברים'].map((word) => (
            <motion.span
              key={word}
              className="inline-block ml-[0.28em]"
              style={{ color: CREAM }}
              variants={{
                hidden: { opacity: 0, y: 28, filter: 'blur(10px)' },
                visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { type: 'spring', stiffness: 70, damping: 18 } },
              }}
            >
              {word}
            </motion.span>
          ))}
          <br />
          <motion.span
            className="inline-block gold-shimmer"
            variants={{
              hidden: { opacity: 0, y: 28, filter: 'blur(10px)' },
              visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { type: 'spring', stiffness: 70, damping: 18, delay: 0.05 } },
            }}
          >
            בעד עצמם.
          </motion.span>
        </motion.h1>

        <motion.p
          className="text-[17px] leading-[1.7] mb-10 max-w-[480px]"
          style={{ color: DIM }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          מארזי מתנה מעוצבים בקפידה לכל אירוע — יום הולדת, חתונה, לידה, חגים ועוד.
          כל מארז עטוף באהבה ומוכן למשלוח תוך 48 שעות.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center gap-4 mb-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          <motion.a
            href="#products"
            className="px-9 py-4 rounded-full font-bold text-[16px] no-underline"
            style={{ background: GOLD, color: '#0A0806', boxShadow: `0 0 40px rgba(201,168,76,0.35)` }}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
          >
            לצפייה במארזים ↓
          </motion.a>
          <motion.a
            href="https://wa.me/972500000000"
            target="_blank"
            className="px-9 py-4 rounded-full font-semibold text-[15px] no-underline"
            style={{ background: BDR(0.08), border: `1px solid ${BDR(0.22)}`, color: GOLD_L }}
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
          >
            💬 דברו איתנו
          </motion.a>
        </motion.div>

        <motion.p
          className="text-[12px]"
          style={{ color: DIM }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.1 }}
        >
          ⭐⭐⭐⭐⭐ &nbsp;מעל 500 לקוחות מרוצים
        </motion.p>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          PRODUCTS
      ══════════════════════════════════════════════════════════════ */}
      <section id="products" className="relative z-10 max-w-[1100px] mx-auto px-6 pb-28">
        <FadeUp>
          <SectionPill>המארזים שלנו</SectionPill>
          <h2 className="text-center font-extrabold tracking-tight mb-4"
            style={{ fontSize: 'clamp(30px, 5vw, 52px)', color: CREAM }}>
            בחרו את המארז{' '}
            <span className="gold-shimmer">המושלם</span>
          </h2>
          <p className="text-center text-[15px] leading-relaxed mb-14 max-w-[480px] mx-auto" style={{ color: DIM }}>
            כל מארז מוכן תוך 48 שעות ומגיע עם כרטיס ברכה אישי כתוב בכתב יד.
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <ProductCard
            name="מארז קלאסיק"
            desc="שוקולדים, תה פרמיום ומפיות מעוצבות לכל אירוע."
            price="₪149"
            emoji="🎀"
            gradient="linear-gradient(135deg, rgba(40,30,15,0.95), rgba(60,45,20,0.8))"
            delay={0}
          />
          <ProductCard
            name="מארז פרמיום"
            desc="יין, שוקולד בלגי, ממתקים ונרות ריחניים מובחרים."
            price="₪249"
            tag="פופולרי"
            emoji="🍷"
            gradient="linear-gradient(135deg, rgba(50,20,20,0.95), rgba(80,35,30,0.8))"
            delay={0.1}
          />
          <ProductCard
            name="מארז לאקס"
            desc="ספא קיט, קרמים יוקרתיים, נרות ותה צמחים נבחר."
            price="₪349"
            emoji="✨"
            gradient="linear-gradient(135deg, rgba(20,30,45,0.95), rgba(35,50,70,0.8))"
            delay={0.2}
          />
          <ProductCard
            name="מארז אקסקלוסיב"
            desc="מארז מלכותי עם שמפניה, מוצרים נבחרים ועטיפה פרמיום."
            price="₪499"
            tag="חדש"
            emoji="👑"
            gradient="linear-gradient(135deg, rgba(30,25,10,0.95), rgba(55,45,15,0.8))"
            delay={0.3}
          />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          WHY
      ══════════════════════════════════════════════════════════════ */}
      <section id="why" className="relative z-10 max-w-[900px] mx-auto px-6 pb-28">
        <FadeUp>
          <SectionPill>למה Maarzim</SectionPill>
          <h2 className="text-center font-extrabold tracking-tight mb-14"
            style={{ fontSize: 'clamp(28px, 4vw, 48px)', color: CREAM }}>
            לא סתם מארז.{' '}
            <span className="gold-shimmer">חוויה.</span>
          </h2>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <FeatureCard
            emoji="🎨"
            title="עיצוב אישי לכל מארז"
            desc="כל מארז עטוף בנייר עיטוף פרמיום עם כרטיס ברכה אישי בכתב יד. כי הפרטים הקטנים עושים את ההבדל."
            delay={0}
          />
          <FeatureCard
            emoji="🚚"
            title="משלוח חינם לכל הארץ"
            desc="מוציאים את המארז תוך 48 שעות. משלוח מהיר לכל נקודה בישראל ללא עלות נוספת."
            delay={0.1}
          />
          <FeatureCard
            emoji="💛"
            title="500+ לקוחות מרוצים"
            desc="מחתונות ועד ימי הולדת, ממשרדים ועד מתנות אישיות — אנחנו כאן כבר 3 שנים ולא מפסיקים."
            delay={0.2}
          />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          CTA
      ══════════════════════════════════════════════════════════════ */}
      <section id="contact" className="relative z-10 px-6 pb-28">
        <FadeUp>
          <div className="max-w-[680px] mx-auto rounded-3xl p-10 text-center"
            style={{
              background: SURF,
              border: `1px solid ${BDR(0.22)}`,
              boxShadow: `0 0 80px rgba(201,168,76,0.06)`,
            }}>
            <div className="text-[48px] mb-5">🎁</div>
            <h2 className="font-extrabold tracking-tight mb-4"
              style={{ fontSize: 'clamp(26px, 4vw, 42px)', color: CREAM }}>
              מוכנים להזמין?
            </h2>
            <p className="text-[15px] leading-relaxed mb-8 max-w-[420px] mx-auto" style={{ color: DIM }}>
              שלחו לנו הודעה בוואטסאפ ונחזור אליכם תוך שעה. אפשר גם להתאים אישית כל מארז לפי הצורך.
            </p>
            <motion.a
              href="https://wa.me/972500000000?text=היי, אני מעוניין להזמין מארז"
              target="_blank"
              className="inline-flex items-center gap-3 px-10 py-4 rounded-full font-bold text-[16px] no-underline"
              style={{ background: GOLD, color: '#0A0806', boxShadow: `0 0 50px rgba(201,168,76,0.3)` }}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            >
              💬 הזמינו בוואטסאפ
            </motion.a>
            <p className="text-[12px] mt-5" style={{ color: DIM }}>
              זמינים ראשון–שישי, 09:00–20:00
            </p>
          </div>
        </FadeUp>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────── */}
      <footer className="relative z-10 py-8 text-center"
        style={{ borderTop: `1px solid ${BDR(0.1)}` }}>
        <p className="text-[13px]" style={{ color: DIM }}>
          © {new Date().getFullYear()} Maarzim — מארזים מעוצבים לכל אירוע
        </p>
      </footer>

    </div>
  )
}
