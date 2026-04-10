import type { Metadata, Viewport } from "next";
import { Heebo } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/config";

const heebo = Heebo({
  variable: "--font-heebo",
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#080608",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — מארזי מתנה מעוצבים לכל אירוע`,
    template: `%s · ${SITE.name}`,
  },
  description:
    "מארזי מתנה מעוצבים בקפידה — יום הולדת, חתונה, לידה וחגים. עטיפה אישית, כרטיס בכתב יד, משלוח חינם תוך 48 שעות.",
  keywords: [
    "מארזי מתנה",
    "מארזים מעוצבים",
    "מתנות לעסקים",
    "מתנה ליום הולדת",
    "מתנה לחתונה",
    "מתנה ללידה",
    "מארז פרמיום",
    SITE.name,
  ],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  openGraph: {
    type: "website",
    locale: "he_IL",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — מארזי מתנה מעוצבים`,
    description:
      "מארזי מתנה מעוצבים בקפידה לכל אירוע. עטיפה אישית, כרטיס בכתב יד, משלוח חינם.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — מארזי מתנה מעוצבים`,
    description: "מארזי מתנה מעוצבים בקפידה לכל אירוע.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: { canonical: SITE.url },
  formatDetection: { telephone: true, address: true, email: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: SITE.name,
  description: "מארזי מתנה מעוצבים לכל אירוע",
  url: SITE.url,
  telephone: SITE.phoneE164,
  priceRange: "₪149-₪499",
  address: {
    "@type": "PostalAddress",
    addressCountry: "IL",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "20:00",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="he" dir="rtl" className={`${heebo.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-bg text-cream font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
