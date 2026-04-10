"use client";

import { motion } from "framer-motion";
import { Reveal } from "./Reveal";
import { Bezel } from "./Bezel";
import { IslandBtn } from "./IslandBtn";
import { ProductIllustration } from "./ProductIllustration";
import { PRODUCTS, type Product } from "@/lib/products";
import { whatsappLink, WHATSAPP_MESSAGES } from "@/lib/config";

export function Products() {
  return (
    <section
      id="products"
      style={{
        position: "relative",
        zIndex: 10,
        maxWidth: 1200,
        margin: "0 auto",
        padding: "clamp(80px, 12vw, 120px) 24px 80px",
      }}
    >
      <Reveal>
        <div style={{ marginBottom: 64, textAlign: "center" }}>
          <span className="eyebrow">המארזים שלנו</span>
          <h2
            style={{
              fontWeight: 900,
              letterSpacing: "-0.045em",
              lineHeight: 1.0,
              fontSize: "clamp(38px, 5.5vw, 68px)",
              color: "var(--cream)",
              marginTop: 20,
              marginBottom: 18,
            }}
          >
            בחרו את המארז <span className="text-gold-gradient">המושלם.</span>
          </h2>
          <p style={{ fontSize: 16, color: "var(--cream-dim)", maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>
            ארבעה מארזים, כל אחד מעוצב לרגע אחר. בחרו את זה שמתאים — או צרו איתנו קשר להתאמה אישית.
          </p>
        </div>
      </Reveal>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 270px), 1fr))",
          gap: 18,
        }}
      >
        {PRODUCTS.map((p, i) => (
          <ProductCard key={p.key} product={p} delay={i * 0.1} />
        ))}
      </div>
    </section>
  );
}

function ProductCard({ product, delay }: { product: Product; delay: number }) {
  return (
    <Reveal delay={delay}>
      <motion.div
        style={{ height: "100%" }}
        whileHover={{ y: -8 }}
        transition={{ type: "spring", stiffness: 220, damping: 22 }}
      >
        <Bezel style={{ height: "100%" }}>
          <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
            {/* Image area */}
            <div
              style={{
                height: 220,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                background:
                  "radial-gradient(ellipse at 50% 35%, rgba(196,153,58,0.12) 0%, transparent 65%), var(--surface)",
                borderBottom: "1px solid var(--gold-10)",
              }}
            >
              {product.tag && (
                <div
                  style={{
                    position: "absolute",
                    top: 14,
                    insetInlineEnd: 14,
                    fontSize: 9,
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.14em",
                    padding: "5px 11px",
                    borderRadius: 99,
                    background: "var(--gold)",
                    color: "#0A0806",
                    boxShadow: "0 2px 8px rgba(196,153,58,0.4)",
                  }}
                >
                  {product.tag}
                </div>
              )}
              <div
                style={{
                  position: "absolute",
                  top: 14,
                  insetInlineStart: 14,
                  fontSize: 9,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  padding: "4px 10px",
                  borderRadius: 99,
                  background: "var(--gold-10)",
                  color: "var(--gold-light)",
                  border: "1px solid var(--gold-20)",
                }}
              >
                {product.itemsCount} פריטים
              </div>
              <motion.div
                style={{ width: 170, height: 170, display: "flex", alignItems: "center", justifyContent: "center" }}
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ProductIllustration variant={product.key} className="w-full h-full" />
              </motion.div>
            </div>

            {/* Content */}
            <div style={{ padding: "24px 24px 24px", display: "flex", flexDirection: "column", flex: 1 }}>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.14em",
                  color: "var(--gold-light)",
                  marginBottom: 6,
                }}
              >
                {product.tagline}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8, marginBottom: 12 }}>
                <h3 style={{ fontSize: 19, fontWeight: 900, color: "var(--cream)", margin: 0, letterSpacing: "-0.02em" }}>
                  {product.name}
                </h3>
                <span style={{ fontSize: 20, fontWeight: 900, color: "var(--gold)", flexShrink: 0, letterSpacing: "-0.02em" }}>
                  {product.price}
                </span>
              </div>

              <p style={{ fontSize: 13, lineHeight: 1.7, color: "var(--cream-dim)", margin: "0 0 16px" }}>
                {product.desc}
              </p>

              {/* Items list */}
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: "0 0 22px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                  flex: 1,
                }}
              >
                {product.items.map((item) => (
                  <li
                    key={item}
                    style={{
                      fontSize: 12,
                      color: "var(--cream-dim)",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <span
                      aria-hidden="true"
                      style={{
                        width: 14,
                        height: 14,
                        borderRadius: "50%",
                        background: "var(--gold-10)",
                        border: "1px solid var(--gold-30)",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 8,
                        color: "var(--gold-light)",
                        flexShrink: 0,
                      }}
                    >
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <IslandBtn
                href={whatsappLink(WHATSAPP_MESSAGES.product(product.name))}
                dark
                ariaLabel={`הזמנת ${product.name}`}
              >
                הזמנה בוואטסאפ
              </IslandBtn>
            </div>
          </div>
        </Bezel>
      </motion.div>
    </Reveal>
  );
}
