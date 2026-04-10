import { Reveal } from "./Reveal";
import { Bezel } from "./Bezel";

interface Testimonial {
  name: string;
  role: string;
  initials: string;
  quote: string;
  rating: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "מיכל רוזנברג",
    role: "הזמנה ליום הולדת",
    initials: "מר",
    quote:
      "המארז פשוט היה מושלם. הגיע בזמן, עטוף בצורה מרהיבה, והיה ניכר שהושקעה בו מחשבה. אמא שלי הייתה המומה.",
    rating: 5,
  },
  {
    name: "יואב כהן",
    role: "מתנה לעובדים",
    initials: "יכ",
    quote:
      "הזמנתי 25 מארזים לצוות שלי לחג. השירות היה מדהים, ההתאמה האישית הרשימה את כולם. נחזור להזמין בוודאות.",
    rating: 5,
  },
  {
    name: "שירה לוי",
    role: "הזמנה לחתונה",
    initials: "של",
    quote:
      "קיבלתי את המארז כמתנה והרגשתי שזה באמת פרמיום. הפרטים הקטנים, הכרטיס האישי, האריזה — הכל ברמה אחרת.",
    rating: 5,
  },
];

function Stars({ rating }: { rating: number }) {
  return (
    <div aria-label={`דירוג ${rating} מתוך 5`} style={{ display: "flex", gap: 3 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
          <path
            d="M12 2l3 6.5 7 1-5 5 1.5 7L12 18l-6.5 3.5L7 14.5 2 9.5l7-1z"
            fill={i < rating ? "var(--gold)" : "var(--gold-20)"}
          />
        </svg>
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section
      id="testimonials"
      style={{
        position: "relative",
        zIndex: 10,
        maxWidth: 1200,
        margin: "0 auto",
        padding: "0 24px 100px",
      }}
    >
      <Reveal>
        <div style={{ marginBottom: 56, textAlign: "center" }}>
          <span className="eyebrow">הלקוחות שלנו</span>
          <h2
            style={{
              fontWeight: 900,
              letterSpacing: "-0.045em",
              lineHeight: 1.0,
              fontSize: "clamp(34px, 5vw, 60px)",
              color: "var(--cream)",
              marginTop: 20,
              marginBottom: 16,
            }}
          >
            מה אומרים <span className="text-gold-gradient">עלינו.</span>
          </h2>
          <p style={{ fontSize: 15, color: "var(--cream-dim)", maxWidth: 480, margin: "0 auto", lineHeight: 1.7 }}>
            המלצות אמיתיות מלקוחות שהזמינו מאיתנו מארז — או קיבלו אחד במתנה.
          </p>
        </div>
      </Reveal>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))",
          gap: 18,
        }}
      >
        {TESTIMONIALS.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.1}>
            <Bezel>
              <div style={{ padding: "30px 28px", display: "flex", flexDirection: "column", height: "100%" }}>
                <Stars rating={t.rating} />
                <blockquote
                  style={{
                    fontSize: 15,
                    lineHeight: 1.7,
                    color: "var(--cream)",
                    margin: "18px 0 24px",
                    fontStyle: "normal",
                    flex: 1,
                    quotes: "none",
                  }}
                >
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div style={{ display: "flex", alignItems: "center", gap: 14, paddingTop: 20, borderTop: "1px solid var(--gold-10)" }}>
                  <div
                    aria-hidden="true"
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, var(--gold), var(--gold-deep))",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 13,
                      fontWeight: 900,
                      color: "#0A0806",
                      border: "1px solid var(--gold-30)",
                      flexShrink: 0,
                    }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "var(--cream)" }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: "var(--cream-mute)" }}>{t.role}</div>
                  </div>
                </div>
              </div>
            </Bezel>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
