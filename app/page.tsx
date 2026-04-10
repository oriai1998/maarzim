import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Marquee } from "./components/Marquee";
import { Products } from "./components/Products";
import { WhyUs } from "./components/WhyUs";
import { Testimonials } from "./components/Testimonials";
import { CTA } from "./components/CTA";
import { Footer } from "./components/Footer";

export default function MaarzimPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--cream)", overflowX: "hidden" }}>
      {/* Noise overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Ambient glow */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }} aria-hidden="true">
        <div
          style={{
            position: "absolute",
            top: "-10%",
            left: "20%",
            width: "60%",
            height: "55%",
            background:
              "radial-gradient(ellipse at 50% 20%, var(--gold-06) 0%, transparent 60%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            right: "5%",
            width: "40%",
            height: "40%",
            background:
              "radial-gradient(ellipse at 50% 50%, var(--gold-06) 0%, transparent 60%)",
          }}
        />
      </div>

      <Nav />
      <Hero />
      <Marquee />
      <Products />
      <Testimonials />
      <WhyUs />
      <CTA />
      <Footer />
    </div>
  );
}
