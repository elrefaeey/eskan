"use client";

import Building3D, { type BuildingConfig } from "./Building3D";

type SkylineBuilding = Omit<BuildingConfig, "baseY" | "vpX">;

interface SkylineProps {
  baseY: number;
  vpX: number;
  buildings: {
    bg:  readonly SkylineBuilding[]; // طبقة الخلفية  — ضبابية وشفافة = تبدو بعيدة
    mid: readonly SkylineBuilding[]; // طبقة الوسط
    fg:  readonly SkylineBuilding[]; // طبقة الأمامية — واضحة وحادة = تبدو قريبة
  };
  className?: string;
}

export default function Skyline({ baseY, vpX, buildings, className = "" }: SkylineProps) {
  return (
    <svg
      className={`absolute top-0 h-full pointer-events-none select-none ${className}`}
      style={{ width: "clamp(220px, 32vw, 420px)" }}
      viewBox="0 0 360 220"
      preserveAspectRatio="xMinYMax meet" // نثبّت المشهد عند أسفل اليسار حتى المباني تلتصق بالأرض دايماً
      aria-hidden="true"
    >
      <defs>
        {/* توهج خفيف للمباني الأمامية */}
        <filter id="sky-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.8" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>

        {/* ضبابية أقوى للمباني الخلفية — تحاكي ضبابية المسافة */}
        <filter id="sky-depth">
          <feGaussianBlur stdDeviation="1.0" />
        </filter>

        {/* تلاشي أفقي من اليسار للمركز — يدمج الـ Skyline مع خلفية الفوتر بدون قطع حاد */}
        <linearGradient id="sky-fade" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="white" stopOpacity="1"    />
          <stop offset="68%"  stopColor="white" stopOpacity="0.55" />
          <stop offset="100%" stopColor="white" stopOpacity="0"    />
        </linearGradient>
        <mask id="sky-mask">
          <rect x="0" y="0" width="360" height="220" fill="url(#sky-fade)" />
        </mask>
      </defs>

      {/* opacity="0.30" عشان المشهد يكون خفيف ومش يطغى على محتوى الفوتر */}
      <g mask="url(#sky-mask)" opacity="0.30">
        <g filter="url(#sky-depth)" opacity="0.6">
          {buildings.bg.map((b, i)  => <Building3D key={i} {...b} baseY={baseY} vpX={vpX} />)}
        </g>
        <g opacity="0.85">
          {buildings.mid.map((b, i) => <Building3D key={i} {...b} baseY={baseY} vpX={vpX} />)}
        </g>
        <g filter="url(#sky-glow)">
          {buildings.fg.map((b, i)  => <Building3D key={i} {...b} baseY={baseY} vpX={vpX} />)}
        </g>
        <line x1="0" y1={baseY} x2="360" y2={baseY} stroke="#9ecfb2" strokeWidth="0.8" opacity="0.5" />
      </g>
    </svg>
  );
}
