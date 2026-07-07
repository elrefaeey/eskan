"use client";

import { cn } from "@/lib/utils";
import HeroMedia from "./HeroMedia";
import HeroContent from "./HeroContent";
import HeroActions from "./HeroActions";
import HeroSkeleton from "./HeroSkeleton";
import type { ProjectHeroProps } from "./types";

// ─── Re-exports (public API) ──────────────────────────────────────────────────
export type {
  ProjectHeroProps,
  ProjectHeroSliderProps,
  ProjectHeroStaticProps,
  ProjectHeroGradientProps,
  HeroCtaButton,
  HeroBadgeColor,
  HeroVisualType,
} from "./types";

// ─── ProjectHero ──────────────────────────────────────────────────────────────

function renderHeroMedia(
  props: ProjectHeroProps,
  mediaClassName: string | undefined,
) {
  switch (props.visualType) {
    case "slider":
      return (
        <HeroMedia
          visualType="slider"
          images={props.images}
          mediaClassName={mediaClassName}
        />
      );
    case "static":
      return (
        <HeroMedia
          visualType="static"
          staticImage={props.staticImage}
          staticImageAlt={props.staticImageAlt}
          mediaClassName={mediaClassName}
        />
      );
    case "gradient":
      return (
        <HeroMedia
          visualType="gradient"
          gradientClassName={props.gradientClassName}
          gradientContent={props.gradientContent}
          mediaClassName={mediaClassName}
        />
      );
  }
}

export default function ProjectHero(props: ProjectHeroProps) {
  const {
    isLoading = false,
    badge,
    title,
    subtitle,
    location,
    description,
    highlightText,
    videoId,
    videoButtonText = "مشاهدة فيديو المشروع",
    ctaButtons = [],
    accentScheme = "primary",
    dir = "rtl",
    className,
    contentClassName,
    mediaClassName,
  } = props;

  if (isLoading) {
    return (
      <section className={cn("mb-10 bg-white", className)} dir={dir}>
        <div className="container mx-auto">
          <HeroSkeleton />
        </div>
      </section>
    );
  }

  return (
    <section className={cn("mb-10 bg-white", className)} dir={dir}>
      <div className="container mx-auto">
        <div className="rounded-2xl overflow-hidden bg-white grid grid-cols-1 md:grid-cols-2">

          {renderHeroMedia(props, mediaClassName)}

          <div
            className={cn(
              "flex flex-col justify-between gap-4 py-6 max-md:px-0 md:p-8 order-2",
              contentClassName,
            )}
          >
            <HeroContent
              badge={badge}
              title={title}
              subtitle={subtitle}
              location={location}
              description={description}
              highlightText={highlightText}
              accentScheme={accentScheme}
            />

            <HeroActions
              videoId={videoId}
              videoButtonText={videoButtonText}
              ctaButtons={ctaButtons}
            />
          </div>

        </div>
      </div>
    </section>
  );
}
