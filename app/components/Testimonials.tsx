const TESTIMONIALS = [
  {
    name: "מיכל רוזנברג",
    role: "יום הולדת",
    quote:
      "המארז פשוט היה מושלם. הגיע בזמן, עטוף בצורה מרהיבה, והיה ניכר שהושקעה בו מחשבה. אמא שלי הייתה המומה.",
  },
  {
    name: "יואב כהן",
    role: "מתנה לעובדים",
    quote:
      "הזמנתי 25 מארזים לצוות שלי לחג. השירות היה מדהים, ההתאמה האישית הרשימה את כולם. נחזור להזמין.",
  },
  {
    name: "שירה לוי",
    role: "חתונה",
    quote:
      "קיבלתי את המארז כמתנה והרגשתי שזה באמת פרמיום. הפרטים הקטנים, הכרטיס האישי, האריזה — הכל ברמה אחרת.",
  },
  {
    name: "רון אברהם",
    role: "לידה",
    quote:
      "שירות מקצועי ומהיר. המארז הגיע שלוש שעות אחרי ההזמנה. ממליץ בחום לכולם.",
  },
  {
    name: "נועה שמיר",
    role: "יום הולדת",
    quote:
      "הכי יפה שיכולתי לבקש. כרטיס הברכה בכתב יד גרם לי לבכות. תודה רבה.",
  },
] as const;

function Stars() {
  return (
    <span style={{ display: "inline-flex", gap: 2 }}>
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="var(--gold)"
          aria-hidden="true"
        >
          <path d="M5 0.5l1.18 2.4 2.64.38-1.91 1.86.45 2.63L5 6.5l-2.36 1.27.45-2.63L1.18 3.28l2.64-.38z" />
        </svg>
      ))}
    </span>
  );
}

function TestiCard({
  name,
  role,
  quote,
}: (typeof TESTIMONIALS)[number]) {
  return (
    <div
      style={{
        flexShrink: 0,
        width: "clamp(260px, 28vw, 320px)",
        padding: "24px 26px",
        border: "1px solid var(--border)",
        background: "var(--bg-surface)",
        marginLeft: 14,
      }}
    >
      <div style={{ marginBottom: 14 }}>
        <Stars />
      </div>
      <p
        style={{
          fontSize: 13,
          lineHeight: 1.8,
          color: "var(--text-2)",
          margin: "0 0 20px",
        }}
      >
        {quote}
      </p>
      <div>
        <div
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: "var(--text)",
            marginBottom: 3,
          }}
        >
          {name}
        </div>
        <div
          style={{
            fontSize: 10,
            fontWeight: 500,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--text-3)",
          }}
        >
          {role}
        </div>
      </div>
    </div>
  );
}

export function Testimonials() {
  const doubled = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section
      id="testimonials"
      style={{
        padding: "clamp(80px, 12vw, 140px) 0",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 clamp(24px, 5vw, 80px)",
          marginBottom: 48,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 24,
            paddingBottom: 48,
            borderBottom: "1px solid var(--border)",
          }}
        >
          <span
            style={{
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--text-3)",
            }}
          >
            לקוחות מרוצים
          </span>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 52px)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 0.95,
              color: "var(--text)",
              margin: 0,
              textAlign: "right",
            }}
          >
            מה אומרים{" "}
            <span style={{ color: "var(--gold)" }}>עלינו.</span>
          </h2>
        </div>
      </div>

      {/* Auto-scrolling track */}
      <div
        style={{
          overflow: "hidden",
          paddingRight: "clamp(24px, 5vw, 80px)",
        }}
      >
        <div className="testi-track">
          {doubled.map((t, i) => (
            <TestiCard key={`${t.name}-${i}`} {...t} />
          ))}
        </div>
      </div>
    </section>
  );
}
