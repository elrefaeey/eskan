"use client";

import { useHeroCarousel, useHeroTileOffsets } from "@/features/home/hooks";
import HeroContent from "./components/HeroContent";
import HeroImagePanel from "./components/HeroImagePanel";

export default function Hero() {
  const {
    heroImages,
    currentImageIndex,
    nextImageIndex,
    animationKey,
    isLoading,
    isMobileIntro,
  } = useHeroCarousel();

  const tileOffsets = useHeroTileOffsets();

  return (
    <section className="relative flex flex-col gap-6 lg:flex-row lg:min-h-[calc(100vh-98px)] overflow-hidden">
      <HeroContent />
      <HeroImagePanel
        heroImages={heroImages}
        currentImageIndex={currentImageIndex}
        nextImageIndex={nextImageIndex}
        animationKey={animationKey}
        isLoading={isLoading}
        isMobileIntro={isMobileIntro}
        tileOffsets={tileOffsets}
      />
    </section>
  );
}
