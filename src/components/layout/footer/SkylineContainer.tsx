import Skyline from "./Skyline";

const BASE_Y = 220; // خط الأرض داخل الـ SVG viewBox
const VP_X   = 360; // نقطة التلاشي — خطوط الـ Perspective بتتجمع نحو اليمين

// المباني مقسمة لـ 3 طبقات لإعطاء إحساس العمق.
// القاعدة: depth أعلى + frontOpacity أقل = المبنى يبدو أبعد.
const BUILDINGS = {
  bg: [
    { bx: -12, bw: 28, bh: 185, depth: 0.9,  floors: 12, sideW: 8,  hasAntenna: true,  frontOpacity: 0.75, glowOpacity: 0.35 },
    { bx:  20, bw: 24, bh: 145, depth: 0.85, floors: 10, sideW: 7,  hasAntenna: false, frontOpacity: 0.65, glowOpacity: 0.28 },
  ],
  mid: [
    { bx:  48, bw: 40, bh: 168, depth: 0.7,  floors: 11, sideW: 12, hasAntenna: false, frontOpacity: 0.88, glowOpacity: 0.55 },
    { bx:  92, bw: 26, bh: 105, depth: 0.65, floors: 7,  sideW: 8,  hasAntenna: false, frontOpacity: 0.78, glowOpacity: 0.45 },
  ],
  fg: [
    { bx: 120, bw: 48, bh: 205, depth: 0.5,  floors: 14, sideW: 14, hasAntenna: true,  frontOpacity: 1,    glowOpacity: 0.85 },
    { bx: 172, bw: 24, bh: 152, depth: 0.45, floors: 10, sideW: 8,  hasAntenna: false, frontOpacity: 0.92, glowOpacity: 0.68 },
    { bx: 200, bw: 34, bh: 92,  depth: 0.4,  floors: 6,  sideW: 10, hasAntenna: false, frontOpacity: 0.82, glowOpacity: 0.55 },
  ],
} as const;

export default function SkylineContainer() {
  return (
    <div className="hidden md:block">
      <Skyline baseY={BASE_Y} vpX={VP_X} buildings={BUILDINGS} className="left-0" />
      {/* النسخة اليمنى معكوسة بـ CSS فقط — مفيش كود أو داتا إضافية */}
      <Skyline baseY={BASE_Y} vpX={VP_X} buildings={BUILDINGS} className="right-0 -scale-x-100" />
    </div>
  );
}
