"use client";

import { makeBuilding } from "./skyline-utils";

export interface BuildingConfig {
  bx: number;
  bw: number;
  bh: number;
  baseY: number;
  depth: number;       // قوة الـ Perspective — كلما زاد بدا المبنى أبعد
  vpX: number;         // نقطة التلاشي الأفقية
  floors: number;
  sideW: number;
  hasAntenna: boolean;
  frontOpacity?: number; // وضوح المبنى — المباني الخلفية بتكون أكثر شفافية
  glowOpacity?: number;  // سطوع الحافة المضيئة اليسرى
}

export default function Building3D({
  bx, bw, bh, baseY, depth, vpX, floors, sideW, hasAntenna,
  frontOpacity = 1,
  glowOpacity  = 0.6,
}: BuildingConfig) {
  const b = makeBuilding(bx, bw, bh, baseY, depth, vpX, floors, sideW, hasAntenna);

  return (
    <g>
      {/* الوجه الجانبي — أغمق لأنه في الظل */}
      <polygon points={b.side}  fill="none" stroke="#7ab898" strokeWidth="0.7"  opacity={frontOpacity * 0.5}  />
      {/* الوجه الأمامي */}
      <polygon points={b.front} fill="none" stroke="#c8e8d4" strokeWidth="1.0"  opacity={frontOpacity * 0.92} />
      {/* السطح العلوي */}
      <polygon points={b.top}   fill="none" stroke="#d8f0e0" strokeWidth="0.8"  opacity={frontOpacity * 0.75} />

      {b.floors.map((d, i) => (
        <path key={i} d={d} stroke="#9ecfb2" strokeWidth="0.5" opacity={frontOpacity * 0.55} />
      ))}

      {b.windows.map((w, i) => {
        const [wx, wy, ww, wh] = w.split(",").map(Number);
        return (
          <rect key={i} x={wx} y={wy} width={ww} height={wh}
            fill="none" stroke="#b8dfc5" strokeWidth="0.45" opacity={frontOpacity * 0.6} />
        );
      })}

      {/* الحافة اليسرى المضيئة — كأن الضوء بيسقط على المبنى من اليسار */}
      <path d={b.frontEdge} stroke="#e8f8ee" strokeWidth="1.6"
        opacity={glowOpacity * frontOpacity} strokeLinecap="round" />

      {b.antenna && (
        <path d={b.antenna} stroke="#c8e8d4" strokeWidth="0.7"
          opacity={frontOpacity * 0.75} strokeLinecap="round" />
      )}
    </g>
  );
}
