import { Reveal } from "./Reveal";
import { Bezel } from "./Bezel";

const FEATURES = [
  {
    title: "עיצוב אישי לכל מארז",
    desc: "כל מארז עטוף ביד בנייר פרמיום, עם כרטיס ברכה אישי שאנחנו כותבים בכתב יד — בדיוק כמו שפעם עשו זאת.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="22" height="22" aria-hidden="true">
        <path
          d="M3 21L12 12L21 21M12 12L8 8L3 13M12 12L16 8L21 13"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="18" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
  },
  {
    title: "משלוח חינם תוך 48 שעות",
    desc: "לכל נקודה בישראל, ללא עלות נוספת. אנחנו דואגים שהמארז יגיע בזמן — גם כשהאירוע מחר.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="22" height="22" aria-hidden="true">
        <path
          d="M3 8h11v9H3zM14 11h4l3 3v3h-7"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="7" cy="18" r="2" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="17" cy="18" r="2" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
  },
  {
    title: "3 שנים, 500+ לקוחות",
    desc: "יותר מ-500 מארזים שנשלחו, מאות חיוכים, ולקוחות שחוזרים אלינו שוב ושוב. המלצות פה למטה.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="22" height="22" aria-hidden="true">
        <path
          d="M12 2l3 6.5 7 1-5 5 1.5 7L12 18l-6.5 3.5L7 14.5 2 9.5l7-1z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export function WhyUs() {
  return (
    <section
      id="why"
      style={{
        position: "relative",
        zIndex: 10,
        maxWidth: 1100,
        margin: "0 auto",
        padding: "0 24px 100px",
      }}
    >
      <Reveal>
        <div style={{ marginBottom: 56, textAlign: "center" }}>
          <span className="eyebrow">למה אנחנו</span>
          <h2
            style={{
              fontWeight: 900,
              letterSpacing: "-0.045em",
              lineHeight: 1.0,
              fontSize: "clamp(34px, 5vw, 60px)",
              color: "var(--cream)",
              marginTop: 20,
            }}
          >
            לא סתם מארז. <span className="text-gold-gradient">חוויה.</span>
          </h2>
        </div>
      </Reveal>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))", gap: 18 }}>
        {FEATURES.map(({ title, desc, icon }, i) => (
          <Reveal key={title} delay={i * 0.1}>
            <Bezel>
              <div style={{ padding: "30px 28px", height: "100%" }}>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 14,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "var(--gold-10)",
                    border: "1px solid var(--gold-20)",
                    color: "var(--gold-light)",
                    marginBottom: 20,
                  }}
                >
                  {icon}
                </div>
                <h3
                  style={{
                    fontSize: 18,
                    fontWeight: 800,
                    color: "var(--cream)",
                    marginBottom: 10,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {title}
                </h3>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--cream-dim)", margin: 0 }}>{desc}</p>
              </div>
            </Bezel>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
