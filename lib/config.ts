export const SITE = {
  name: "Maarzim",
  url: "https://maarzim.netlify.app",
  phoneDisplay: "050-000-0000",
  phoneE164: "+972500000000",
  whatsappNumber: "972500000000",
  email: "hello@maarzim.co.il",
  hours: "ראשון–שישי · 09:00–20:00",
  responseTime: "תוך שעה",
  deliveryTime: "48 שעות",
  customersCount: "500+",
  yearsActive: 3,
} as const;

export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${SITE.whatsappNumber}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export const WHATSAPP_MESSAGES = {
  hero: "היי, ראיתי את האתר ואשמח לשמוע עוד על המארזים שלכם",
  general: "היי, אני מעוניין להזמין מארז מתנה",
  custom: "היי, אני רוצה להתאים מארז אישי",
  product: (name: string) => `היי, אני מעוניין במארז "${name}"`,
} as const;
