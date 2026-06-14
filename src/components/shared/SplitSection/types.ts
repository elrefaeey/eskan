import type { ReactNode } from "react";

/** موضع عمود الوسائط بالنسبة لعمود المحتوى */
export type MediaPosition = "start" | "end";

export type SplitSectionProps = {
  media: ReactNode;
  content: ReactNode;
  mediaPosition?: MediaPosition;
  gridClassName?: string;
  mediaSlotClassName?: string;
  contentSlotClassName?: string;
};
