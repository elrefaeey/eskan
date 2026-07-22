import type { ComponentType } from "react";
import type { CardBackground, CardBackgroundTone } from "../constants/variantStyles";
import GrowthPatternBackground from "./GrowthPatternBackground";
import NetworkPatternBackground from "./NetworkPatternBackground";

interface CardBackgroundProps {
  tone: CardBackgroundTone;
}

export const CARD_BACKGROUNDS: Record<
  CardBackground,
  ComponentType<CardBackgroundProps>
> = {
  growth: GrowthPatternBackground,
  network: NetworkPatternBackground,
};
