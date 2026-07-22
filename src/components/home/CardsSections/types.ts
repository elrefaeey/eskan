import type { LucideIcon } from "lucide-react";
import type { CardVariant, CardBackground, CardBackgroundTone } from "./constants/variantStyles";

export interface CardsSectionItem {
  title: string;
  description: string;
  link: string;
  icon: LucideIcon;
  variant: CardVariant;
  background: CardBackground;
  backgroundTone: CardBackgroundTone;
  highlights: string[];
}
