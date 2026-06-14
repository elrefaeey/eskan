import type { ReactNode } from "react";
import type { MediaPosition } from "../SplitSection/types";
import type { containerVariantMap } from "./constants";

export type LocationContainerVariant = keyof typeof containerVariantMap;

export type LocationSectionProps = {
  children: ReactNode;
  mediaPosition?: MediaPosition;
  className?: string;
  containerVariant?: LocationContainerVariant;
  gridClassName?: string;
  contentSlotClassName?: string;
  mediaSlotClassName?: string;
};
