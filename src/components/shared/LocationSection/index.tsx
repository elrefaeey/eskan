"use client";

import { Children } from "react";
import { cn } from "@/lib/utils";
import AnimatedSection from "@/components/common/animations/AnimatedSection";
import SplitSection from "../SplitSection";
import { containerVariantMap } from "./constants";
import type { LocationSectionProps } from "./types";

export {
  GRAY_MAP_LOCATION_DEFAULTS,
  MAP_LOCATION_DESCRIPTION_CLASS,
} from "./constants";
export type { LocationSectionProps, LocationContainerVariant } from "./types";

function warnInvalidChildren(count: number) {
  if (process.env.NODE_ENV !== "development") return;

  console.warn(
    `[LocationSection] Expected exactly 2 children (media, content), received ${count}.`,
  );
}

export default function LocationSection({
  children,
  mediaPosition = "start",
  className,
  containerVariant = "gray",
  gridClassName,
  contentSlotClassName,
  mediaSlotClassName,
}: LocationSectionProps) {
  const childArray = Children.toArray(children);

  if (childArray.length !== 2) {
    warnInvalidChildren(childArray.length);
  }

  const media = childArray[0] ?? null;
  const content = childArray[1] ?? null;
  const containerClass = containerVariantMap[containerVariant];

  return (
    <AnimatedSection
      as="section"
      duration={0.5}
      className={cn(containerClass, className)}
    >
      <SplitSection
        media={media}
        content={content}
        mediaPosition={mediaPosition}
        gridClassName={gridClassName}
        mediaSlotClassName={mediaSlotClassName}
        contentSlotClassName={contentSlotClassName}
      />
    </AnimatedSection>
  );
}
