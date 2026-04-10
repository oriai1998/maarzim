import type { ProductKey } from "@/lib/products";

interface Props {
  variant: ProductKey;
  className?: string;
}

export function ProductIllustration({ variant, className }: Props) {
  switch (variant) {
    case "classic":
      return <ClassicBox className={className} />;
    case "premium":
      return <PremiumBox className={className} />;
    case "lux":
      return <LuxBox className={className} />;
    case "exclusive":
      return <ExclusiveBox className={className} />;
  }
}

const GOLD = "#C4993A";
const GOLD_LIGHT = "#E2BC6D";
const CREAM = "#F0E6D0";
const SHADOW = "#050404";

function ClassicBox({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="classic-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1a140c" />
          <stop offset="1" stopColor="#0c0906" />
        </linearGradient>
        <linearGradient id="classic-lid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#221a10" />
          <stop offset="1" stopColor="#120d08" />
        </linearGradient>
        <linearGradient id="classic-ribbon" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={GOLD_LIGHT} />
          <stop offset="1" stopColor={GOLD} />
        </linearGradient>
      </defs>
      {/* Shadow */}
      <ellipse cx="100" cy="175" rx="60" ry="6" fill={SHADOW} opacity="0.6" />
      {/* Box body */}
      <rect x="40" y="80" width="120" height="85" rx="3" fill="url(#classic-body)" stroke={GOLD} strokeOpacity="0.3" />
      {/* Box lid */}
      <rect x="36" y="70" width="128" height="22" rx="3" fill="url(#classic-lid)" stroke={GOLD} strokeOpacity="0.4" />
      {/* Vertical ribbon */}
      <rect x="92" y="70" width="16" height="95" fill="url(#classic-ribbon)" />
      <rect x="92" y="70" width="16" height="95" fill={GOLD} opacity="0.15" />
      {/* Bow */}
      <path
        d="M100 60 C 82 42, 70 52, 78 68 C 86 78, 94 72, 100 66 C 106 72, 114 78, 122 68 C 130 52, 118 42, 100 60 Z"
        fill="url(#classic-ribbon)"
        stroke={GOLD}
        strokeWidth="0.8"
      />
      <circle cx="100" cy="66" r="4" fill={GOLD} />
      {/* Highlight */}
      <rect x="40" y="80" width="120" height="2" fill={CREAM} opacity="0.15" />
    </svg>
  );
}

function PremiumBox({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="premium-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1a140c" />
          <stop offset="1" stopColor="#0a0705" />
        </linearGradient>
        <linearGradient id="premium-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={GOLD_LIGHT} />
          <stop offset="0.5" stopColor={GOLD} />
          <stop offset="1" stopColor="#8B6A20" />
        </linearGradient>
      </defs>
      <ellipse cx="100" cy="178" rx="65" ry="6" fill={SHADOW} opacity="0.6" />
      {/* Box with beveled edges */}
      <path
        d="M35 85 L100 70 L165 85 L165 170 L100 185 L35 170 Z"
        fill="url(#premium-body)"
        stroke={GOLD}
        strokeOpacity="0.4"
      />
      {/* Top face */}
      <path d="M35 85 L100 70 L165 85 L100 100 Z" fill="#1f1810" stroke={GOLD} strokeOpacity="0.5" />
      {/* Gold band horizontal */}
      <path d="M35 125 L100 140 L165 125" stroke="url(#premium-gold)" strokeWidth="3" fill="none" />
      {/* Gold seal/medallion */}
      <circle cx="100" cy="140" r="11" fill="url(#premium-gold)" stroke={CREAM} strokeOpacity="0.3" strokeWidth="0.5" />
      <circle cx="100" cy="140" r="7" fill="none" stroke="#0a0705" strokeWidth="0.8" opacity="0.5" />
      <text
        x="100"
        y="144"
        textAnchor="middle"
        fontSize="10"
        fontWeight="900"
        fill="#0a0705"
        fontFamily="serif"
      >
        M
      </text>
      {/* Corner ornament */}
      <path d="M40 88 L52 85 L47 92 Z" fill={GOLD} opacity="0.7" />
      <path d="M160 88 L148 85 L153 92 Z" fill={GOLD} opacity="0.7" />
      {/* Highlights */}
      <path d="M35 85 L100 100 L100 185" stroke={CREAM} strokeOpacity="0.05" strokeWidth="0.5" fill="none" />
    </svg>
  );
}

function LuxBox({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="lux-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1f1810" />
          <stop offset="1" stopColor="#0c0906" />
        </linearGradient>
        <radialGradient id="lux-glow" cx="0.5" cy="0.4" r="0.6">
          <stop offset="0" stopColor={GOLD_LIGHT} stopOpacity="0.3" />
          <stop offset="1" stopColor={GOLD} stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="100" cy="178" rx="62" ry="6" fill={SHADOW} opacity="0.6" />
      {/* Ambient glow behind */}
      <circle cx="100" cy="100" r="70" fill="url(#lux-glow)" />
      {/* Round hat-style box */}
      <ellipse cx="100" cy="80" rx="58" ry="12" fill="#1f1810" stroke={GOLD} strokeOpacity="0.5" />
      <path
        d="M42 80 L42 160 Q 42 172 100 172 Q 158 172 158 160 L158 80"
        fill="url(#lux-body)"
        stroke={GOLD}
        strokeOpacity="0.35"
      />
      <ellipse cx="100" cy="160" rx="58" ry="12" fill="none" stroke={GOLD} strokeOpacity="0.2" />
      {/* Lid top */}
      <ellipse cx="100" cy="78" rx="54" ry="9" fill="#0c0906" />
      <ellipse cx="100" cy="78" rx="54" ry="9" fill="none" stroke={GOLD} strokeOpacity="0.4" />
      {/* Decorative laurel/monogram */}
      <g transform="translate(100 120)">
        <circle r="18" fill="none" stroke={GOLD} strokeOpacity="0.6" strokeWidth="0.8" />
        <circle r="14" fill="none" stroke={GOLD} strokeOpacity="0.3" strokeWidth="0.4" />
        <path d="M-12 0 Q -6 -8 0 -10 Q 6 -8 12 0" stroke={GOLD_LIGHT} strokeWidth="1" fill="none" />
        <path d="M-12 0 Q -6 8 0 10 Q 6 8 12 0" stroke={GOLD_LIGHT} strokeWidth="1" fill="none" />
        <text textAnchor="middle" y="4" fontSize="12" fontWeight="900" fill={GOLD_LIGHT} fontFamily="serif">
          LUX
        </text>
      </g>
      {/* Sparkles */}
      <g fill={CREAM} opacity="0.8">
        <circle cx="55" cy="50" r="1.2" />
        <circle cx="150" cy="45" r="1.5" />
        <circle cx="165" cy="100" r="1" />
        <circle cx="40" cy="110" r="1" />
      </g>
    </svg>
  );
}

function ExclusiveBox({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="ex-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#251c10" />
          <stop offset="1" stopColor="#0c0906" />
        </linearGradient>
        <linearGradient id="ex-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={GOLD_LIGHT} />
          <stop offset="1" stopColor={GOLD} />
        </linearGradient>
        <radialGradient id="ex-glow" cx="0.5" cy="0.3" r="0.7">
          <stop offset="0" stopColor={GOLD} stopOpacity="0.25" />
          <stop offset="1" stopColor={GOLD} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="80" fill="url(#ex-glow)" />
      <ellipse cx="100" cy="178" rx="68" ry="6" fill={SHADOW} opacity="0.6" />
      {/* Crown on top */}
      <g transform="translate(100 55)">
        <path
          d="M-22 10 L-22 0 L-14 6 L-7 -6 L0 4 L7 -6 L14 6 L22 0 L22 10 Z"
          fill="url(#ex-gold)"
          stroke={GOLD}
          strokeWidth="0.5"
        />
        <rect x="-22" y="10" width="44" height="3" fill={GOLD} />
        <circle cx="-14" cy="0" r="1.5" fill={CREAM} />
        <circle cx="0" cy="-4" r="1.5" fill={CREAM} />
        <circle cx="14" cy="0" r="1.5" fill={CREAM} />
      </g>
      {/* Box */}
      <rect x="32" y="78" width="136" height="92" rx="2" fill="url(#ex-body)" stroke="url(#ex-gold)" strokeWidth="1.2" />
      {/* Inner gold border */}
      <rect x="38" y="84" width="124" height="80" rx="1" fill="none" stroke={GOLD} strokeOpacity="0.4" strokeWidth="0.6" />
      {/* Ornamental corners */}
      <g fill={GOLD}>
        <path d="M38 84 L48 84 L38 94 Z" opacity="0.7" />
        <path d="M162 84 L152 84 L162 94 Z" opacity="0.7" />
        <path d="M38 164 L48 164 L38 154 Z" opacity="0.7" />
        <path d="M162 164 L152 164 L162 154 Z" opacity="0.7" />
      </g>
      {/* Center seal */}
      <circle cx="100" cy="124" r="18" fill="#0c0906" stroke="url(#ex-gold)" strokeWidth="1.5" />
      <circle cx="100" cy="124" r="14" fill="none" stroke={GOLD} strokeWidth="0.4" opacity="0.6" />
      <text x="100" y="130" textAnchor="middle" fontSize="14" fontWeight="900" fill="url(#ex-gold)" fontFamily="serif">
        ✦
      </text>
      {/* Sparkles */}
      <g fill={CREAM}>
        <circle cx="50" cy="50" r="1" opacity="0.8" />
        <circle cx="155" cy="55" r="1.3" opacity="0.9" />
        <circle cx="30" cy="100" r="0.9" opacity="0.7" />
        <circle cx="170" cy="110" r="1" opacity="0.8" />
      </g>
    </svg>
  );
}
