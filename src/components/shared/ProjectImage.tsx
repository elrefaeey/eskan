"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

export type ProjectImageProps = {
  src: string;
  alt?: string;
  className?: string;
};

export default function ProjectImage({
  src,
  alt = "موقع المشروع",
  className,
}: ProjectImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={cn("object-cover object-top", className)}
    />
  );
}
