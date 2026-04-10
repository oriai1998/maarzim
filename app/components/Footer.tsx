import { SITE } from "@/lib/config";

export function Footer() {
  return (
    <footer
      style={{
        position: "relative",
        zIndex: 10,
        textAlign: "center",
        padding: "32px 24px 40px",
        borderTop: "1px solid var(--gold-10)",
      }}
    >
      <p style={{ fontSize: 12, color: "var(--gold-40)" }}>
        <span dir="ltr">© {new Date().getFullYear()}</span> {SITE.name} · מארזים מעוצבים לכל אירוע
      </p>
    </footer>
  );
}
