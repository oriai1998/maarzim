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

        {/* Section header — different pattern: giant quote mark + headline inline */}
        <Reveal>
          <div
            style={{
              paddingBottom: 48,
              borderBottom: "1px solid var(--gold-14)",
              marginBottom: 64,
            }}
          >
            {/* Oversized decorative quote — structural, not content */}
            <div
              aria-hidden="true"
              style={{
                fontSize: "clamp(80px, 14vw, 160px)",
                lineHeight: 0.8,
                color: "transparent",
                WebkitTextStroke: "1px rgba(197,174,121,0.20)",
                fontFamily: "Georgia, serif",
                fontWeight: 400,
                marginBottom: 16,
                userSelect: "none",
              }}
            >
              &ldquo;
            </div>

            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
              <h2
                style={{
                  fontSize: "clamp(34px, 5vw, 62px)",
                  fontWeight: 900,
                  letterSpacing: "-0.04em",
                  lineHeight: 0.94,
                  color: "var(--cream)",
                  margin: 0,
                }}
              >
                מה אומרים{" "}
                <span style={{ color: "var(--gold)" }}>עלינו.</span>
              </h2>

              <span
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "var(--cream-mute)",
                }}
              >
                500+ ביקורות
              </span>
            </div>
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
                {/* Opening quotation mark — refined size and opacity */}
                <div
                  style={{
                    fontSize: 56,
                    lineHeight: 1,
                    color: "var(--gold-30)",
                    fontWeight: 400,
                    marginBottom: 20,
                    fontFamily: "Georgia, 'Times New Roman', serif",
                    userSelect: "none",
                  }}
                  aria-hidden="true"
                >
                  &ldquo;
                </div>

                {/* Quote text */}
                <blockquote
                  style={{
                    fontSize: "clamp(15px, 1.6vw, 17px)",
                    lineHeight: 1.85,
                    color: "var(--cream-dim)",
                    margin: "0 0 36px",
                    fontStyle: "normal",
                    quotes: "none",
                  }}
                >
                  {t.quote}
                </blockquote>

                {/* Attribution — thin line separator */}
                <div
                  style={{
                    paddingTop: 20,
                    borderTop: "1px solid var(--gold-10)",
                  }}
                >
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: "var(--gold)",
                      marginBottom: 4,
                      letterSpacing: "0.01em",
                    }}
                  >
                    {t.name}
                  </div>
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 600,
                      letterSpacing: "0.16em",
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
