"use client";

import { cn } from "@/lib/utils";

export type ProjectMapProps = {
  embedUrl: string;
  title?: string;
  iframeClassName?: string;
};

export default function ProjectMap({
  embedUrl,
  title = "موقع المشروع",
  iframeClassName,
}: ProjectMapProps) {
  return (
    <iframe
      src={embedUrl}
      width="100%"
      height="100%"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      className={cn("w-full h-full rounded-xl", iframeClassName)}
      title={title}
    />
  );
}
