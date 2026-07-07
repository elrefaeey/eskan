"use client";

import { cn } from "@/lib/utils";
import {
  CONTENT_SLOT_CLASS,
  GRID_BASE_CLASS,
  MEDIA_SLOT_CLASS,
} from "./constants";
import type { MediaPosition, SplitSectionProps } from "./types";

function resolveSlotOrder(mediaPosition: MediaPosition) {
  const mediaOrder =
    mediaPosition === "start" ? "order-1" : "order-1 md:order-2";
  const contentOrder =
    mediaPosition === "start" ? "order-2" : "order-2 md:order-1";
  return { mediaOrder, contentOrder };
}

export default function SplitSection({
  media,
  content,
  mediaPosition = "start",
  gridClassName,
  mediaSlotClassName,
  contentSlotClassName,
}: SplitSectionProps) {
  const { mediaOrder, contentOrder } = resolveSlotOrder(mediaPosition);

  return (
    <div className={cn(GRID_BASE_CLASS, gridClassName)}>
      <div
        className={cn(MEDIA_SLOT_CLASS, mediaOrder, mediaSlotClassName)}
      >
        {media}
      </div>

      <div
        className={cn(
          CONTENT_SLOT_CLASS,
          contentOrder,
          contentSlotClassName,
        )}
      >
        {content}
      </div>
    </div>
  );
}
