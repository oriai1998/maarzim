import { SITE } from "@/lib/config";

export function Footer() {
  return (
    <footer
      style={{
        padding: "24px clamp(24px, 5vw, 80px)",
        borderTop: "1px solid var(--border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 16,
      }}
    >
      <span
        style={{
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--gold)",
        }}
      >
        {SITE.name}
      </span>
      <p
        style={{
          fontSize: 11,
          color: "var(--text-3)",
          margin: 0,
          letterSpacing: "0.04em",
        }}
      >
        <span dir="ltr">© {new Date().getFullYear()}</span>
        {" "}· מארזים מעוצבים לכל אירוע
      </p>
    </footer>
  );
}
