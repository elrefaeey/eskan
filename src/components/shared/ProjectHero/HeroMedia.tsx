"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import ProjectImgsSlider from "@/components/Projects/ProjectImagesSlider";

// ─── Props ────────────────────────────────────────────────────────────────────

export type HeroMediaSliderProps = {
  visualType: "slider";
  images: string[];
  mediaClassName?: string;
};

export type HeroMediaStaticProps = {
  visualType: "static";
  staticImage: string;
  staticImageAlt: string;
  mediaClassName?: string;
};

export type HeroMediaGradientProps = {
  visualType: "gradient";
  gradientClassName?: string;
  gradientContent?: React.ReactNode;
  mediaClassName?: string;
};

export type HeroMediaProps =
  | HeroMediaSliderProps
  | HeroMediaStaticProps
  | HeroMediaGradientProps;

const WRAPPER_CLASS =
  "relative h-80 max-h-80 md:h-auto md:min-h-[300px] md:max-h-none order-1 rounded-2xl overflow-hidden";

// ─── HeroMedia ────────────────────────────────────────────────────────────────

export default function HeroMedia(props: HeroMediaProps) {
  const { mediaClassName } = props;

  if (props.visualType === "slider") {
    return (
      <div className={cn(WRAPPER_CLASS, mediaClassName)}>
        <ProjectImgsSlider
          images={props.images}
          height="h-full md:!h-full"
          rounded={false}
        />
      </div>
    );
  }

  if (props.visualType === "static") {
    return (
      <div className={cn(WRAPPER_CLASS, mediaClassName)}>
        {props.staticImage && (
          <Image
            src={props.staticImage}
            alt={props.staticImageAlt}
            fill
            className="object-cover"
            priority
          />
        )}
      </div>
    );
  }

  return (
    <div className={cn(WRAPPER_CLASS, mediaClassName)}>
      <div
        className={cn(
          "w-full h-full flex items-center justify-center",
          props.gradientClassName ?? "bg-gradient-to-br from-[#1F4B57] to-[#0d3d22]",
        )}
      >
        {props.gradientContent}
      </div>
    </div>
  );
}
