import { SITE } from "@/lib/config";

export function Footer() {
  return (
    <footer
      style={{
        position: "relative",
        zIndex: 10,
        padding: "28px clamp(24px, 5vw, 80px)",
        borderTop: "1px solid var(--gold-14)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 16,
      }}
    >
      {/* Brand name */}
      <span
        style={{
          fontSize: 14,
          fontWeight: 900,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "var(--gold)",
        }}
      >
        {SITE.name}
      </span>

      {/* Copyright */}
      <p
        style={{
          fontSize: 11,
          color: "var(--cream-mute)",
          letterSpacing: "0.06em",
          margin: 0,
        }}
      >
        <span dir="ltr">© {new Date().getFullYear()}</span>
        {" "}· מארזים מעוצבים לכל אירוע
      </p>
    </footer>
  );
}
