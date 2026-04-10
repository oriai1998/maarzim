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
    quote:
      "המארז פשוט היה מושלם. הגיע בזמן, עטוף בצורה מרהיבה, והיה ניכר שהושקעה בו מחשבה. אמא שלי הייתה המומה.",
  },
  {
    name: "יואב כהן",
    role: "מתנה לעובדים",
    quote:
      "הזמנתי 25 מארזים לצוות שלי לחג. השירות היה מדהים, ההתאמה האישית הרשימה את כולם. נחזור להזמין בוודאות.",
  },
  {
    name: "שירה לוי",
    role: "הזמנה לחתונה",
    quote:
      "קיבלתי את המארז כמתנה והרגשתי שזה באמת פרמיום. הפרטים הקטנים, הכרטיס האישי, האריזה — הכל ברמה אחרת.",
  },
];

export function Testimonials() {
  return (
    <section
      id="testimonials"
      style={{
        position: "relative",
        zIndex: 10,
        padding:
          "clamp(100px, 14vw, 160px) clamp(24px, 5vw, 80px)",
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
                alignSelf: "flex-start",
              }}
            >
              לקוחות
            </span>

            <h2
              style={{
                fontSize: "clamp(34px, 5vw, 62px)",
                fontWeight: 900,
                letterSpacing: "-0.04em",
                lineHeight: 0.94,
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

        {/* Testimonials grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill, minmax(min(100%, 300px), 1fr))",
            gap: "clamp(40px, 5vw, 72px)",
          }}
        >
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <div
                style={{
                  paddingTop: 28,
                  borderTop: "1px solid var(--gold-14)",
                }}
              >
                {/* Large opening quotation mark */}
                <div
                  style={{
                    fontSize: 72,
                    lineHeight: 1,
                    color: "var(--gold-20)",
                    fontWeight: 900,
                    marginBottom: 12,
                    fontFamily: "Georgia, serif",
                    userSelect: "none",
                  }}
                  aria-hidden="true"
                >
                  &ldquo;
                </div>

                {/* Quote text */}
                <blockquote
                  style={{
                    fontSize: "clamp(15px, 1.7vw, 18px)",
                    lineHeight: 1.78,
                    color: "var(--cream)",
                    margin: "0 0 32px",
                    fontStyle: "normal",
                    quotes: "none",
                  }}
                >
                  {t.quote}
                </blockquote>

                {/* Attribution */}
                <div>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: "var(--gold)",
                      marginBottom: 5,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {t.name}
                  </div>
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 600,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "var(--cream-mute)",
                    }}
                  >
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
