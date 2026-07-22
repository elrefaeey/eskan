import { useEffect, useMemo, useState } from "react";
import {
  DEFAULT_HERO_IMAGES,
  HERO_MOBILE_BREAKPOINT,
  HERO_SLIDESHOW_INTERVAL_MS,
} from "../constants/hero";
import useHeroImages from "./useHeroImages";

export default function useHeroCarousel() {
  const { heroImages: apiHeroImages, isLoading } = useHeroImages();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);

  const heroImages = useMemo(() => {
    if (apiHeroImages?.length) {
      return apiHeroImages.map((image) => image.img);
    }
    return [...DEFAULT_HERO_IMAGES];
  }, [apiHeroImages]);

  const isMobileIntro = currentImageIndex === -1;
  const nextImageIndex = isMobileIntro
    ? 0
    : (currentImageIndex + 1) % heroImages.length;

  useEffect(() => {
    const checkMobile = () => {
      if (window.innerWidth < HERO_MOBILE_BREAKPOINT) {
        setCurrentImageIndex(-1);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimationKey((prev) => prev + 1);
      setCurrentImageIndex((prev) => {
        if (prev === -1) return 0;
        return (prev + 1) % heroImages.length;
      });
    }, HERO_SLIDESHOW_INTERVAL_MS);

    return () => clearTimeout(timeout);
  }, [currentImageIndex, heroImages.length]);

  return {
    heroImages,
    currentImageIndex,
    nextImageIndex,
    animationKey,
    isLoading,
    isMobileIntro,
  };
}
