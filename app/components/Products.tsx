"use client";

import { motion } from "framer-motion";
import { Reveal } from "./Reveal";
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
        padding:
          "clamp(100px, 14vw, 160px) clamp(24px, 5vw, 80px)",
        background: "var(--bg-elev)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        {/* Section header */}
        <Reveal>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 24,
              paddingBottom: 48,
              borderBottom: "1px solid var(--gold-14)",
              marginBottom: 64,
            }}
          >
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--gold)",
                alignSelf: "flex-start",
              }}
            >
              המארזים שלנו
            </span>

            <h2
              style={{
                fontSize: "clamp(34px, 5vw, 62px)",
                fontWeight: 900,
                letterSpacing: "-0.04em",
                lineHeight: 0.94,
                color: "var(--cream)",
                margin: 0,
                maxWidth: 500,
                textAlign: "right",
              }}
            >
              בחרו את המארז{" "}
              <span style={{ color: "var(--gold)" }}>המושלם.</span>
            </h2>
          </div>
        </Reveal>

        {/* Product grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill, minmax(min(100%, 255px), 1fr))",
            gap: "clamp(16px, 2vw, 24px)",
          }}
        >
          {PRODUCTS.map((p, i) => (
            <ProductCard key={p.key} product={p} delay={i * 0.09} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({
  product,
  delay,
}: {
  product: Product;
  delay: number;
}) {
  return (
    <Reveal delay={delay}>
      <motion.div
        style={{
          border: "1px solid var(--gold-14)",
          background: "var(--surface)",
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 200, damping: 22 }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor =
            "var(--gold-30)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor =
            "var(--gold-14)";
        }}
      >
        {/* Illustration area */}
        <div
          style={{
            height: 200,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            background:
              "radial-gradient(ellipse at 50% 40%, rgba(197,174,121,0.07) 0%, transparent 70%)",
            borderBottom: "1px solid var(--gold-10)",
          }}
        >
          {/* Tag badge */}
          {product.tag && (
            <div
              style={{
                position: "absolute",
                top: 14,
                insetInlineEnd: 14,
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                padding: "4px 10px",
                background: "var(--gold)",
                color: "#0A0A0A",
              }}
            >
              {product.tag}
            </div>
          )}

          {/* Items count */}
          <div
            style={{
              position: "absolute",
              top: 14,
              insetInlineStart: 14,
              fontSize: 9,
              fontWeight: 600,
              letterSpacing: "0.1em",
              color: "var(--gold-55)",
            }}
          >
            {product.itemsCount} פריטים
          </div>

          {/* Floating illustration */}
          <motion.div
            style={{ width: 148, height: 148 }}
            animate={{ y: [0, -6, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <ProductIllustration
              variant={product.key}
              className="w-full h-full"
            />
          </motion.div>
        </div>

        {/* Content */}
        <div
          style={{
            padding: "22px 22px 22px",
            display: "flex",
            flexDirection: "column",
            flex: 1,
          }}
        >
          {/* Tagline */}
          <div
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--gold)",
              marginBottom: 8,
            }}
          >
            {product.tagline}
          </div>

          {/* Name + price */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              gap: 8,
              marginBottom: 12,
            }}
          >
            <h3
              style={{
                fontSize: 17,
                fontWeight: 900,
                color: "var(--cream)",
                letterSpacing: "-0.02em",
                margin: 0,
              }}
            >
              {product.name}
            </h3>
            <span
              style={{
                fontSize: 18,
                fontWeight: 900,
                color: "var(--gold)",
                letterSpacing: "-0.02em",
                flexShrink: 0,
              }}
            >
              {product.price}
            </span>
          </div>

          {/* Description */}
          <p
            style={{
              fontSize: 13,
              lineHeight: 1.75,
              color: "var(--cream-dim)",
              margin: "0 0 16px",
              flex: 1,
            }}
          >
            {product.desc}
          </p>

          {/* Items list */}
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: "0 0 20px",
              display: "flex",
              flexDirection: "column",
              gap: 6,
            }}
          >
            {product.items.map((item) => (
              <li
                key={item}
                style={{
                  fontSize: 12,
                  color: "var(--cream-mute)",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <span style={{ color: "var(--gold-55)", fontSize: 10, flexShrink: 0 }}>
                  —
                </span>
                {item}
              </li>
            ))}
          </ul>

          {/* CTA */}
          <a
            href={whatsappLink(WHATSAPP_MESSAGES.product(product.name))}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "block",
              textAlign: "center",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              padding: "12px",
              border: "1px solid var(--gold-30)",
              color: "var(--gold)",
              textDecoration: "none",
              transition: "background 0.22s, color 0.22s",
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
            הזמנה בוואטסאפ
          </a>
        </div>
      </motion.div>
    </Reveal>
  );
}
