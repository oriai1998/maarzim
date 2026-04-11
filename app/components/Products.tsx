"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ProductIllustration } from "./ProductIllustration";
import { PRODUCTS, type Product } from "@/lib/products";
import { whatsappLink, WHATSAPP_MESSAGES } from "@/lib/config";

const EASE = [0.22, 1, 0.36, 1] as const;

function ProductCard({
  product,
  index,
  delay,
  floatDelay,
}: {
  product: Product;
  index: number;
  delay: number;
  floatDelay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.6, delay, ease: EASE }}
      whileHover={{ y: -4 }}
      style={{
        border: "1px solid var(--border)",
        background: "var(--bg-surface)",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        transition: "border-color 0.25s var(--ease-out-quart)",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor =
          "var(--border-gold)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
      }}
    >
      {/* Illustration area */}
      <div
        style={{
          height: 188,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(197,174,121,0.06) 0%, transparent 70%)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        {product.tag && (
          <div
            style={{
              position: "absolute",
              top: 12,
              insetInlineEnd: 12,
              fontSize: 8,
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              padding: "4px 9px",
              background: "var(--gold)",
              color: "#000",
            }}
          >
            {product.tag}
          </div>
        )}
        <div
          style={{
            position: "absolute",
            top: 12,
            insetInlineStart: 12,
            fontSize: 9,
            fontWeight: 500,
            color: "var(--text-3)",
            fontFamily: "var(--font-inter), Inter, sans-serif",
          }}
        >
          0{index + 1}
        </div>
        <motion.div
          style={{ width: 136, height: 136 }}
          animate={{ y: [0, -5, 0] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: floatDelay,
          }}
        >
          <ProductIllustration variant={product.key} className="w-full h-full" />
        </motion.div>
      </div>

      {/* Content */}
      <div
        style={{
          padding: "20px 20px",
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <div
          style={{
            fontSize: 9,
            fontWeight: 600,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--gold-dim)",
            marginBottom: 8,
          }}
        >
          {product.tagline}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            gap: 8,
            marginBottom: 10,
          }}
        >
          <h3
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: "var(--text)",
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            {product.name}
          </h3>
          <span
            style={{
              fontSize: 17,
              fontWeight: 800,
              color: "var(--gold)",
              flexShrink: 0,
            }}
          >
            {product.price}
          </span>
        </div>

        <p
          style={{
            fontSize: 13,
            lineHeight: 1.75,
            color: "var(--text-2)",
            margin: "0 0 14px",
            flex: 1,
          }}
        >
          {product.desc}
        </p>

        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: "0 0 18px",
            display: "flex",
            flexDirection: "column",
            gap: 5,
          }}
        >
          {product.items.map((item) => (
            <li
              key={item}
              style={{
                fontSize: 12,
                color: "var(--text-3)",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span
                style={{
                  width: 3,
                  height: 3,
                  borderRadius: "50%",
                  background: "var(--gold-dim)",
                  flexShrink: 0,
                  display: "block",
                }}
              />
              {item}
            </li>
          ))}
        </ul>

        <a
          href={whatsappLink(WHATSAPP_MESSAGES.product(product.name))}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "block",
            textAlign: "center",
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            padding: "11px",
            border: "1px solid var(--border-gold)",
            color: "var(--gold)",
            textDecoration: "none",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = "var(--gold)";
            el.style.color = "#000";
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
  );
}

export function Products() {
  return (
    <section
      id="products"
      style={{
        padding: "clamp(80px, 12vw, 140px) clamp(24px, 5vw, 80px)",
        background: "var(--bg-surface)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 24,
            paddingBottom: 48,
            borderBottom: "1px solid var(--border)",
            marginBottom: 56,
          }}
        >
          <span
            style={{
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--text-3)",
              alignSelf: "flex-start",
            }}
          >
            המארזים שלנו
          </span>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 52px)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 0.95,
              color: "var(--text)",
              margin: 0,
              textAlign: "right",
            }}
          >
            בחרו את המארז{" "}
            <span style={{ color: "var(--gold)" }}>המושלם.</span>
          </h2>
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill, minmax(min(100%, 250px), 1fr))",
            gap: "clamp(12px, 1.5vw, 20px)",
          }}
        >
          {PRODUCTS.map((p, i) => (
            <ProductCard
              key={p.key}
              product={p}
              index={i}
              delay={i * 0.08}
              floatDelay={i * 1.2}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
