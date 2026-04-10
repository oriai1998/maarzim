export type ProductKey = "classic" | "premium" | "lux" | "exclusive";

export interface Product {
  key: ProductKey;
  name: string;
  tagline: string;
  desc: string;
  price: string;
  priceValue: number;
  items: string[];
  itemsCount: number;
  tag?: string;
}

export const PRODUCTS: Product[] = [
  {
    key: "classic",
    name: "מארז קלאסיק",
    tagline: "הקלאסיקה המנצחת",
    desc: "שוקולדים איכותיים, תה פרמיום, מפיות מעוצבות וכרטיס ברכה אישי. מושלם לכל אירוע.",
    price: "₪149",
    priceValue: 149,
    items: ["שוקולד בלגי", "תה פרמיום", "כרטיס אישי"],
    itemsCount: 5,
  },
  {
    key: "premium",
    name: "מארז פרמיום",
    tagline: "הבחירה הפופולרית",
    desc: "יין איכותי, שוקולד בלגי מובחר, ממתקים ייחודיים ונרות ריחניים בעיצוב ייחודי.",
    price: "₪249",
    priceValue: 249,
    items: ["יין אדום", "שוקולד בלגי", "נר ריחני"],
    itemsCount: 7,
    tag: "פופולרי",
  },
  {
    key: "lux",
    name: "מארז לאקס",
    tagline: "חוויית פינוק מלאה",
    desc: "ספא קיט מפנק, קרמים טבעיים יוקרתיים, נרות ארומתרפיה ותה צמחים נבחר.",
    price: "₪349",
    priceValue: 349,
    items: ["ספא קיט", "קרמים טבעיים", "תה צמחים"],
    itemsCount: 8,
  },
  {
    key: "exclusive",
    name: "מארז אקסקלוסיב",
    tagline: "חוויה מלכותית",
    desc: "מארז דגל: שמפניה מובחרת, מוצרים נבחרים מהעולם, עטיפת פרמיום וכרטיס מוזהב.",
    price: "₪499",
    priceValue: 499,
    items: ["שמפניה", "מוצרי דלי", "עטיפת זהב"],
    itemsCount: 10,
    tag: "חדש",
  },
];
