// يولّد مسارات SVG لمبنى واحد ثلاثي الأبعاد.
// كل مبنى يتكون من 3 وجوه (أمامي، جانبي، علوي) + خطوط طوابق + نوافذ + هوائي اختياري.

interface BuildingParts {
  front: string;
  side: string;
  top: string;
  frontEdge: string; // الحافة اليسرى المضيئة — تحاكي مصدر ضوء من اليسار
  floors: string[];
  windows: string[];
  antenna: string;
}

// تزيح النقطة أفقياً نحو نقطة التلاشي (vpX) بناءً على ارتفاعها.
// كلما ارتفعت النقطة، زادت الإزاحة — وده اللي بيعطي إحساس العمق والبُعد.
// depth (0..1) بيتحكم في قوة التأثير.
function perspective(x: number, y: number, baseY: number, depth: number, vpX: number): number {
  const t = (y - baseY) / (0 - baseY); // 0 عند الأرض، 1 عند القمة
  return x + (vpX - x) * t * depth * 0.18;
}

export function makeBuilding(
  bx: number,       // x لأسفل يسار المبنى
  bw: number,       // عرض المبنى
  bh: number,       // ارتفاع المبنى
  baseY: number,    // خط الأرض (y الأدنى)
  depth: number,    // قوة الـ Perspective — كلما زاد بدا المبنى أبعد
  vpX: number,      // نقطة التلاشي — الخطوط بتتجمع نحوها
  floors: number,   // عدد الطوابق — بيتحكم في كثافة الخطوط والنوافذ
  sideW: number,    // عرض الوجه الجانبي — بيعطي إحساس السُمك
  hasAntenna: boolean,
): BuildingParts {
  const topY = baseY - bh;
  const bxR  = bx + bw;

  const flx  = perspective(bx,          topY, baseY, depth, vpX);
  const frx  = perspective(bxR,         topY, baseY, depth, vpX);
  const srx  = perspective(bxR + sideW, topY, baseY, depth, vpX);
  const srbx = bxR + sideW * (1 - depth * 0.3);

  const floorH = bh / floors;

  // خطوط الطوابق — بنتجاهل أعلى 15% لأن الخطوط بتتزاحم جداً هناك
  const floorLines: string[] = [];
  for (let i = 1; i < floors; i++) {
    if (i / floors > 0.85) continue;
    const fy = baseY - i * floorH;
    floorLines.push(
      `M${perspective(bx, fy, baseY, depth, vpX)},${fy} L${perspective(bxR, fy, baseY, depth, vpX)},${fy}`,
    );
  }

  // النوافذ — شبكة مستطيلات منتظمة، بس على أسفل 72% من المبنى بس
  const wCols = Math.max(2, Math.floor(bw / 10));
  const wW    = Math.min(5, (bw / wCols) * 0.45);
  const wH    = floorH * 0.45;
  const wColW = bw / wCols;
  const wins: string[] = [];
  for (let row = 1; row < floors - 1; row++) {
    if (row / floors > 0.72) continue;
    const wy = baseY - row * floorH - floorH * 0.75;
    for (let col = 0; col < wCols; col++) {
      const wx = perspective(bx + col * wColW + wColW * 0.25, wy, baseY, depth, vpX);
      wins.push(`${wx},${wy},${wW},${wH}`);
    }
  }

  let antenna = "";
  if (hasAntenna) {
    const ax = perspective(bx + bw / 2, topY, baseY, depth, vpX);
    antenna = `M${ax},${topY} L${ax},${topY - 14} M${ax - 5},${topY - 10} L${ax + 5},${topY - 10}`;
  }

  return {
    front:     `${flx},${topY} ${frx},${topY} ${bxR},${baseY} ${bx},${baseY}`,
    side:      `${frx},${topY} ${srx},${topY} ${srbx},${baseY} ${bxR},${baseY}`,
    top:       `${flx},${topY} ${frx},${topY} ${srx},${topY} ${perspective(bx, topY - 4, baseY, depth, vpX)},${topY - 4}`,
    frontEdge: `M${flx},${topY} L${bx},${baseY}`,
    floors:    floorLines,
    windows:   wins,
    antenna,
  };
}
