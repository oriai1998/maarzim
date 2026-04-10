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
    desc: "יותר מ-500 מארזים שנשלחו. לקוחות שחוזרים אלינו שוב ושוב. ביקורות אמיתיות — פה למטה.",
  },
] as const;

export function WhyUs() {
  return (
    <section
      id="why"
      style={{
        position: "relative",
        zIndex: 10,
        padding:
          "clamp(100px, 14vw, 160px) clamp(24px, 5vw, 80px)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        {/* Section header — label left, headline right */}
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
                alignSelf: "flex-start",
              }}
            >
              למה מארזים
            </span>

            <h2
              style={{
                fontSize: "clamp(34px, 5vw, 62px)",
                fontWeight: 900,
                letterSpacing: "-0.04em",
                lineHeight: 0.94,
                color: "var(--cream)",
                margin: 0,
                maxWidth: 500,
                textAlign: "right",
              }}
            >
              לא סתם מארז.
              <br />
              <span style={{ color: "var(--gold)" }}>חוויה.</span>
            </h2>
          </div>
        </Reveal>

        {/* Features — 3 columns, thin top border only */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill, minmax(min(100%, 280px), 1fr))",
            gap: "clamp(32px, 5vw, 64px)",
          }}
        >
          {FEATURES.map(({ index, title, desc }, i) => (
            <Reveal key={index} delay={i * 0.1}>
              <div
                style={{
                  paddingTop: 28,
                  borderTop: "1px solid var(--gold-14)",
                }}
              >
                {/* Index number */}
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.2em",
                    color: "var(--gold-40)",
                    marginBottom: 22,
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {index}
                </div>

                <h3
                  style={{
                    fontSize: "clamp(19px, 2.2vw, 24px)",
                    fontWeight: 800,
                    color: "var(--cream)",
                    letterSpacing: "-0.02em",
                    lineHeight: 1.2,
                    marginBottom: 16,
                  }}
                >
                  {title}
                </h3>

                <p
                  style={{
                    fontSize: 15,
                    lineHeight: 1.8,
                    color: "var(--cream-dim)",
                    margin: 0,
                  }}
                >
                  {desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
