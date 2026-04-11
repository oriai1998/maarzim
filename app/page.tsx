import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Marquee } from "./components/Marquee";
import { Stats } from "./components/Stats";
import { WhyUs } from "./components/WhyUs";
import { Products } from "./components/Products";
import { Testimonials } from "./components/Testimonials";
import { CTA } from "./components/CTA";
import { Footer } from "./components/Footer";
import { Cursor } from "./components/Cursor";
import { SmoothScroll } from "./components/SmoothScroll";

export default function MaarzimPage() {
  return (
    <SmoothScroll>
      <div
        style={{
          minHeight: "100vh",
          background: "var(--bg)",
          color: "var(--text)",
          overflowX: "hidden",
        }}
      >
        <div className="noise-overlay" aria-hidden="true" />
        <Cursor />
        <Nav />
        <Hero />
        <Marquee />
        <Stats />
        <WhyUs />
        <Products />
        <Testimonials />
        <CTA />
        <Footer />
      </div>
    </SmoothScroll>
  );
}
