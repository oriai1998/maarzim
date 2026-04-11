const ITEMS = [
  "✦ מארזי יוקרה",
  "משלוח חינם",
  "48 שעות",
  "500+ לקוחות מרוצים",
  "אריזה אישית",
  "כרטיס ברכה בכתב יד",
  "עטיפת פרמיום",
];

const SEP = "  ·  ";

export function Marquee() {
  const content = ITEMS.join(SEP);
  // Double for seamless loop
  const track = `${content}${SEP}${content}${SEP}`;

  return (
    <div
      aria-hidden="true"
      style={{
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        overflow: "hidden",
        background: "rgba(255,255,255,0.01)",
      }}
    >
      <div style={{ padding: "11px 0" }}>
        <div
          className="marquee-track"
          style={{
            fontSize: 10,
            fontWeight: 500,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--text-3)",
            whiteSpace: "nowrap",
          }}
        >
          {track}
        </div>
      </div>
    </div>
  );
}
