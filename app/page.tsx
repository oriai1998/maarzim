'use client'

import React, { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const BG     = '#080608'
const GOLD   = '#C4993A'
const GOLD_L = '#E2BC6D'
const CREAM  = '#F0E6D0'
const SURF   = 'rgba(16,12,8,0.98)'
const G      = (o: number) => `rgba(196,153,58,${o})`
const DIM    = 'rgba(240,230,208,0.45)'
const EASE   = [0.32, 0.72, 0, 1] as const

function Reveal({ children, delay = 0, className, style }: {
  children: React.ReactNode; delay?: number; className?: string; style?: React.CSSProperties
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} className={className} style={style}
      initial={{ opacity: 0, y: 28, filter: 'blur(6px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.7, delay, ease: EASE }}>
      {children}
    </motion.div>
  )
}

function Bezel({ children, className, style }: {
  children: React.ReactNode; className?: string; style?: React.CSSProperties
}) {
  return (
    <div className={className ?? ''}
      style={{
        padding: 6,
        borderRadius: '2rem',
        background: 'rgba(255,255,255,0.03)',
        border: `1px solid ${G(0.14)}`,
        ...style,
      }}>
      <div style={{
        borderRadius: 'calc(2rem - 6px)',
        overflow: 'hidden',
        height: '100%',
        background: SURF,
        boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.07)',
      }}>
        {children}
      </div>
    </div>
  )
}

function IslandBtn({ children, href, dark = false }: {
  children: React.ReactNode; href?: string; dark?: boolean
}) {
  const content = (
    <motion.div
      className="inline-flex items-center gap-3"
      style={{
        padding: '13px 13px 13px 22px',
        borderRadius: 9999,
        background: dark ? G(0.1) : GOLD,
        border: dark ? `1px solid ${G(0.25)}` : 'none',
        cursor: 'pointer',
      }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 360, damping: 26 }}
    >
      <span style={{
        fontSize: 14, fontWeight: 700,
        color: dark ? GOLD_L : '#0A0806',
      }}>
        {children}
      </span>
      <span style={{
        width: 30, height: 30, borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: dark ? G(0.15) : 'rgba(0,0,0,0.15)',
        fontSize: 13, color: dark ? GOLD_L : '#0A0806',
        flexShrink: 0,
      }}>↗</span>
    </motion.div>
  )
  if (href) return (
    <a href={href} style={{ textDecoration: 'none' }}
      target={href.startsWith('http') ? '_blank' : undefined}>
      {content}
    </a>
  )
  return content
}

const TICKER = ['⬡ עיצוב אישי', '⬡ משלוח חינם', '⬡ 500+ לקוחות', '⬡ 48 שעות', '⬡ כרטיס בכתב יד', '⬡ מארזים פרמיום']

function Marquee() {
  const items = [...TICKER, ...TICKER, ...TICKER]
  return (
    <div style={{
      overflow: 'hidden', padding: '14px 0',
      borderTop: `1px solid ${G(0.1)}`,
      borderBottom: `1px solid ${G(0.1)}`,
      direction: 'ltr',
    }}>
      <motion.div
        style={{ display: 'flex', gap: 48, whiteSpace: 'nowrap' }}
        animate={{ x: ['0%', '-33.33%'] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}>
        {items.map((item, i) => (
          <span key={i} style={{
            fontSize: 11, textTransform: 'uppercase',
            letterSpacing: '0.18em', fontWeight: 500,
            color: G(0.55), flexShrink: 0,
          }}>
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

interface PCard {
  name: string; desc: string; price: string
  tag?: string; emoji: string; accent: string; delay?: number
}

function ProductCard({ name, desc, price, tag, emoji, accent, delay = 0 }: PCard) {
  return (
    <Reveal delay={delay}>
      <motion.div
        style={{ height: '100%' }}
        whileHover={{ y: -6 }}
        transition={{ type: 'spring', stiffness: 220, damping: 22 }}>
        <Bezel style={{ height: '100%' }}>
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{
              height: 200, display: 'flex', alignItems: 'center',
              justifyContent: 'center', position: 'relative',
              background: `radial-gradient(ellipse at 50% 40%, ${accent}20 0%, transparent 65%), ${SURF}`,
            }}>
              {tag && (
                <div style={{
                  position: 'absolute', top: 14, right: 14,
                  fontSize: 9, fontWeight: 700, textTransform: 'uppercase',
                  letterSpacing: '0.12em', padding: '4px 10px',
                  borderRadius: 99, background: GOLD, color: '#0A0806',
                }}>
                  {tag}
                </div>
              )}
              <motion.span
                style={{ fontSize: 60, userSelect: 'none', display: 'block' }}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}>
                {emoji}
              </motion.span>
            </div>

            <div style={{ padding: '20px 22px 22px', display: 'flex', flexDirection: 'column', flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10, gap: 8 }}>
                <h3 style={{ fontSize: 17, fontWeight: 800, color: CREAM, margin: 0 }}>{name}</h3>
                <span style={{ fontSize: 19, fontWeight: 800, color: GOLD, flexShrink: 0 }}>{price}</span>
              </div>
              <p style={{ fontSize: 13, lineHeight: 1.65, color: DIM, flex: 1, margin: '0 0 18px' }}>{desc}</p>
              <IslandBtn href={`https://wa.me/972500000000?text=היי, אני מעוניין ב${name}`} dark>
                הזמנה
              </IslandBtn>
            </div>
          </div>
        </Bezel>
      </motion.div>
    </Reveal>
  )
}

export default function MaarzimPage() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div style={{ minHeight: '100vh', background: BG, color: CREAM, overflowX: 'hidden', direction: 'rtl' }}>

      {/* Noise overlay */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 60,
        opacity: 0.025,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: '180px',
      }} />

      {/* Ambient glow */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{
          position: 'absolute', top: '-10%', left: '20%', width: '60%', height: '55%',
          background: `radial-gradient(ellipse at 50% 20%, ${G(0.07)} 0%, transparent 60%)`,
        }} />
      </div>

      {/* ── NAV ──────────────────────────────────────────────────── */}
      <div style={{ position: 'relative', zIndex: 50, display: 'flex', justifyContent: 'center', padding: '24px 24px 0' }}>
        <nav style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: 24, padding: '12px 16px 12px 20px', borderRadius: 9999,
          width: '100%', maxWidth: 820,
          background: 'rgba(12,9,6,0.88)',
          backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
          border: `1px solid ${G(0.15)}`,
          boxShadow: `0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 ${G(0.1)}`,
        }}>
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
            <div style={{
              width: 28, height: 28, borderRadius: 10, display: 'flex',
              alignItems: 'center', justifyContent: 'center', fontSize: 13,
              background: G(0.15), border: `1px solid ${G(0.25)}`,
            }}>🎁</div>
            <span style={{
              fontSize: 15, fontWeight: 800, letterSpacing: '-0.02em',
              background: `linear-gradient(90deg, ${GOLD}, ${GOLD_L})`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>Maarzim</span>
          </a>

          <div style={{ display: 'flex', alignItems: 'center', gap: 28 }} className="hidden-mobile">
            {[['מארזים', '#products'], ['למה אנחנו', '#why'], ['יצירת קשר', '#contact']].map(([l, h]) => (
              <a key={l} href={h} style={{ fontSize: 13, color: DIM, textDecoration: 'none' }}>{l}</a>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <a href="https://wa.me/972500000000" target="_blank" style={{
              padding: '8px 18px', borderRadius: 9999, fontSize: 12, fontWeight: 700,
              background: GOLD, color: '#0A0806', textDecoration: 'none',
            }}>הזמן עכשיו</a>

            <button
              onClick={() => setMenuOpen(o => !o)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', width: 32, height: 32, padding: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 5 }}
              className="show-mobile">
              <motion.span style={{ display: 'block', width: 18, height: 1.5, background: CREAM, borderRadius: 9, transformOrigin: 'center' }}
                animate={menuOpen ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.28, ease: EASE }} />
              <motion.span style={{ display: 'block', width: 18, height: 1.5, background: CREAM, borderRadius: 9 }}
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.2 }} />
              <motion.span style={{ display: 'block', width: 18, height: 1.5, background: CREAM, borderRadius: 9, transformOrigin: 'center' }}
                animate={menuOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.28, ease: EASE }} />
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            style={{
              position: 'fixed', inset: 0, zIndex: 40,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 32,
              background: 'rgba(8,6,8,0.97)', backdropFilter: 'blur(24px)',
            }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}>
            {[['מארזים', '#products'], ['למה אנחנו', '#why'], ['יצירת קשר', '#contact']].map(([l, h], i) => (
              <motion.a key={l} href={h}
                style={{ fontSize: 30, fontWeight: 800, color: CREAM, textDecoration: 'none' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, ease: EASE, duration: 0.4 }}
                onClick={() => setMenuOpen(false)}>
                {l}
              </motion.a>
            ))}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18, ease: EASE, duration: 0.4 }}>
              <IslandBtn href="https://wa.me/972500000000">הזמן עכשיו</IslandBtn>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section style={{
        position: 'relative', zIndex: 10,
        minHeight: '100dvh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '80px 24px 60px',
      }}>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
          style={{ marginBottom: 28 }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 600,
            padding: '6px 14px', borderRadius: 9999,
            color: GOLD_L, border: `1px solid ${G(0.2)}`, background: G(0.06),
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: GOLD, display: 'inline-block' }} />
            מארזים מעוצבים לכל אירוע
          </span>
        </motion.div>

        <motion.h1
          style={{
            fontWeight: 900, lineHeight: 0.95, letterSpacing: '-0.045em',
            fontSize: 'clamp(56px, 10vw, 110px)',
            marginBottom: 28, maxWidth: 800,
          }}
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.09, delayChildren: 0.25 } } }}>
          {['מתנה', 'שלא'].map((word) => (
            <motion.span key={word}
              style={{ display: 'block', color: CREAM }}
              variants={{
                hidden: { opacity: 0, y: 40, filter: 'blur(14px)' },
                visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { type: 'spring', stiffness: 60, damping: 16 } },
              }}>
              {word}
            </motion.span>
          ))}
          <motion.span
            style={{
              display: 'block',
              background: `linear-gradient(90deg, ${GOLD}, ${GOLD_L}, ${GOLD})`,
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              animation: 'gold-shimmer 4s linear infinite',
            }}
            variants={{
              hidden: { opacity: 0, y: 40, filter: 'blur(14px)' },
              visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { type: 'spring', stiffness: 60, damping: 16, delay: 0.04 } },
            }}>
            נשכחת.
          </motion.span>
        </motion.h1>

        <motion.p
          style={{ fontSize: 16, lineHeight: 1.75, color: DIM, maxWidth: 460, marginBottom: 36 }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65, ease: EASE }}>
          מארזי מתנה מעוצבים בקפידה לכל אירוע — יום הולדת, חתונה, לידה, חגים ועוד. כל מארז עטוף באהבה עם כרטיס אישי בכתב יד.
        </motion.p>

        <motion.div
          style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 14, marginBottom: 44 }}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8, ease: EASE }}>
          <IslandBtn href="#products">לצפייה במארזים</IslandBtn>
          <IslandBtn href="https://wa.me/972500000000" dark>💬 וואטסאפ</IslandBtn>
        </motion.div>

        <motion.div
          style={{ display: 'flex', justifyContent: 'center', gap: 40 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.0 }}>
          {[['500+', 'לקוחות מרוצים'], ['48h', 'זמן הכנה'], ['₪149', 'החל מ']].map(([n, l]) => (
            <div key={l} style={{ textAlign: 'center' }}>
              <p style={{ fontSize: 22, fontWeight: 800, color: GOLD_L, lineHeight: 1, marginBottom: 4 }}>{n}</p>
              <p style={{ fontSize: 11, color: DIM }}>{l}</p>
            </div>
          ))}
        </motion.div>
      </section>

      <Marquee />

      {/* ── PRODUCTS ─────────────────────────────────────────────── */}
      <section id="products" style={{ position: 'relative', zIndex: 10, maxWidth: 1160, margin: '0 auto', padding: '100px 24px' }}>
        <Reveal style={{ marginBottom: 56 } as React.CSSProperties}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 600,
            padding: '6px 14px', borderRadius: 9999,
            color: GOLD_L, border: `1px solid ${G(0.2)}`, background: G(0.06),
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: GOLD, display: 'inline-block' }} />
            המארזים שלנו
          </span>
          <h2 style={{
            fontWeight: 900, letterSpacing: '-0.045em', lineHeight: 1.0,
            fontSize: 'clamp(36px, 5vw, 62px)', color: CREAM, marginTop: 18, marginBottom: 0,
          }}>
            בחרו את המארז{' '}
            <span style={{
              background: `linear-gradient(90deg, ${GOLD}, ${GOLD_L})`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>המושלם.</span>
          </h2>
        </Reveal>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: 16,
        }}>
          <ProductCard name="מארז קלאסיק" desc="שוקולדים, תה פרמיום ומפיות מעוצבות לכל אירוע ולכל גיל." price="₪149" emoji="🎀" accent={GOLD} delay={0} />
          <ProductCard name="מארז פרמיום" desc="יין, שוקולד בלגי, ממתקים ייחודיים ונרות ריחניים." price="₪249" tag="פופולרי" emoji="🍷" accent={GOLD} delay={0.1} />
          <ProductCard name="מארז לאקס" desc="ספא קיט, קרמים יוקרתיים, נרות ותה צמחים נבחר." price="₪349" emoji="✨" accent="#818CF8" delay={0.2} />
          <ProductCard name="מארז אקסקלוסיב" desc="מארז מלכותי עם שמפניה, מוצרים נבחרים ועטיפה פרמיום." price="₪499" tag="חדש" emoji="👑" accent={GOLD_L} delay={0.3} />
        </div>
      </section>

      {/* ── WHY ──────────────────────────────────────────────────── */}
      <section id="why" style={{ position: 'relative', zIndex: 10, maxWidth: 1000, margin: '0 auto', padding: '0 24px 100px' }}>
        <Reveal style={{ marginBottom: 56 } as React.CSSProperties}>
          <h2 style={{
            fontWeight: 900, letterSpacing: '-0.045em', lineHeight: 1.0, textAlign: 'center',
            fontSize: 'clamp(32px, 5vw, 58px)', color: CREAM,
          }}>
            לא סתם מארז.{' '}
            <span style={{
              background: `linear-gradient(90deg, ${GOLD}, ${GOLD_L})`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>חוויה.</span>
          </h2>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
          {[
            { emoji: '🎨', title: 'עיצוב אישי', desc: 'כל מארז עטוף בנייר פרמיום עם כרטיס ברכה אישי בכתב יד.' },
            { emoji: '🚚', title: 'משלוח חינם', desc: 'תוך 48 שעות לכל נקודה בישראל — ללא עלות נוספת.' },
            { emoji: '⭐', title: '500+ מרוצים', desc: '3 שנים של מארזים, חיוכים ולקוחות שחוזרים שוב ושוב.' },
          ].map(({ emoji, title, desc }, i) => (
            <Reveal key={title} delay={i * 0.1}>
              <Bezel>
                <div style={{ padding: '28px 26px' }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 14, fontSize: 20,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: G(0.1), border: `1px solid ${G(0.18)}`,
                    marginBottom: 18,
                  }}>{emoji}</div>
                  <h3 style={{ fontSize: 17, fontWeight: 800, color: CREAM, marginBottom: 10 }}>{title}</h3>
                  <p style={{ fontSize: 13, lineHeight: 1.65, color: DIM, margin: 0 }}>{desc}</p>
                </div>
              </Bezel>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section id="contact" style={{ position: 'relative', zIndex: 10, padding: '0 24px 100px' }}>
        <Reveal>
          <div style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center' }}>
            <Bezel style={{ boxShadow: `0 0 80px ${G(0.07)}` }}>
              <div style={{ padding: '60px 40px' }}>
                <motion.div
                  style={{ fontSize: 52, marginBottom: 24, display: 'inline-block' }}
                  animate={{ rotate: [0, 8, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
                  🎁
                </motion.div>
                <h2 style={{
                  fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.05,
                  fontSize: 'clamp(28px, 4vw, 48px)', color: CREAM, marginBottom: 16,
                }}>
                  שלחו הודעה,<br />
                  <span style={{
                    background: `linear-gradient(90deg, ${GOLD}, ${GOLD_L})`,
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                  }}>נחזור תוך שעה.</span>
                </h2>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: DIM, maxWidth: 400, margin: '0 auto 32px' }}>
                  אפשר להתאים אישית כל מארז — צבע, תוכן, הקדשה, כמות.
                </p>
                <IslandBtn href="https://wa.me/972500000000?text=היי, אני מעוניין להזמין מארז">
                  💬 הזמינו בוואטסאפ
                </IslandBtn>
                <p style={{ fontSize: 11, color: G(0.4), marginTop: 20 }}>
                  ראשון–שישי · 09:00–20:00 · משלוח חינם
                </p>
              </div>
            </Bezel>
          </div>
        </Reveal>
      </section>

      <footer style={{
        position: 'relative', zIndex: 10, textAlign: 'center', padding: '28px 24px',
        borderTop: `1px solid ${G(0.08)}`,
      }}>
        <p style={{ fontSize: 12, color: G(0.35) }}>
          © {new Date().getFullYear()} Maarzim · מארזים מעוצבים לכל אירוע
        </p>
      </footer>

      <style>{`
        @media (min-width: 768px) { .show-mobile { display: none !important; } }
        @media (max-width: 767px) { .hidden-mobile { display: none !important; } }
        @keyframes gold-shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
      `}</style>
    </div>
  )
}
