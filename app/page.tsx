import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Stats } from "./components/Stats";
import { WhyUs } from "./components/WhyUs";
import { Products } from "./components/Products";
import { Testimonials } from "./components/Testimonials";
import { CTA } from "./components/CTA";
import { Footer } from "./components/Footer";

export default function MaarzimPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg)",
        color: "var(--cream)",
        overflowX: "hidden",
      }}
    >
      {/* Noise texture overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      <Nav />
      <Hero />
      <Stats />
      <WhyUs />
      <Products />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}
