import { Reveal } from "./Reveal";
import { SITE, whatsappLink, WHATSAPP_MESSAGES } from "@/lib/config";

export function CTA() {
  return (
    <section
      id="contact"
      style={{
        position: "relative",
        zIndex: 10,
        padding:
          "clamp(100px, 14vw, 160px) clamp(24px, 5vw, 80px)",
        background: "var(--bg-elev)",
        borderTop: "1px solid var(--gold-14)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        {/* Section label */}
        <Reveal>
          <span
            style={{
              display: "block",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--gold)",
              marginBottom: 36,
            }}
          >
            יצירת קשר
          </span>
        </Reveal>

        {/* Massive headline */}
        <Reveal delay={0.08}>
          <h2
            style={{
              fontSize: "clamp(44px, 8vw, 120px)",
              fontWeight: 900,
              letterSpacing: "-0.05em",
              lineHeight: 0.87,
              color: "var(--cream)",
              margin: "0 0 72px",
            }}
          >
            שלחו הודעה,
            <br />
            <span style={{ color: "var(--gold)" }}>
              נחזור {SITE.responseTime}.
            </span>
          </h2>
        </Reveal>

        {/* CTA row — sits on a thin divider */}
        <Reveal delay={0.16}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 20,
              paddingTop: 48,
              borderTop: "1px solid var(--gold-14)",
            }}
          >
            {/* Primary — filled gold */}
            <a
              href={whatsappLink(WHATSAPP_MESSAGES.custom)}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                padding: "15px 40px",
                background: "var(--gold)",
                color: "#0A0A0A",
                textDecoration: "none",
                transition: "opacity 0.2s",
                flexShrink: 0,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.opacity = "0.82";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.opacity = "1";
              }}
            >
              הזמנה בוואטסאפ
            </a>

            {/* Secondary — outlined */}
            <a
              href={`tel:${SITE.phoneE164}`}
              style={{
                display: "inline-block",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                padding: "14px 40px",
                border: "1px solid var(--gold-30)",
                color: "var(--gold)",
                textDecoration: "none",
                transition: "background 0.22s, color 0.22s",
                flexShrink: 0,
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "var(--gold)";
                el.style.color = "#0A0A0A";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "transparent";
                el.style.color = "var(--gold)";
              }}
            >
              חייגו אלינו
            </a>

            {/* Meta info — pushed to end */}
            <span
              style={{
                marginRight: "auto",
                fontSize: 11,
                color: "var(--cream-mute)",
                letterSpacing: "0.04em",
              }}
            >
              {SITE.hours} · משלוח חינם ברחבי הארץ
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
