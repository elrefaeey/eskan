import type { HeroBadgeColor } from "./types";

// ─── Badge color map ──────────────────────────────────────────────────────────
// قيم Tailwind الجاهزة لكل لون badge مدعوم

export const badgeColorMap: Record<HeroBadgeColor, string> = {
  primary: "bg-primary/10 text-primary",
  purple:  "bg-[#4A36A2]/10 text-[#4A36A2]",
  teal:    "bg-[#1F4B57]/10 text-[#1F4B57]",
  red:     "bg-[#d23a2e]/10 text-[#d23a2e]",
  custom:  "", // يُتجاوز بـ badge.className
};
