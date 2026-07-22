import Image from "next/image";
import { motion } from "framer-motion";
import { HERO_IMAGE_SIZES } from "@/features/home/constants/hero";
import {
  createHeroNextImageAnimate,
  createHeroNextImageInitial,
  heroNextImageTransition,
} from "../animations";
import HeroMobileIntro from "./HeroMobileIntro";

interface HeroNextImageProps {
  src: string;
  index: number;
  isMobileIntro: boolean;
}

export default function HeroNextImage({ src, index, isMobileIntro }: HeroNextImageProps) {
  return (
    <motion.div
      key={`next-${index}`}
      initial={createHeroNextImageInitial(isMobileIntro)}
      animate={createHeroNextImageAnimate(isMobileIntro)}
      transition={heroNextImageTransition}
      className="relative w-full h-full"
    >
      {isMobileIntro ? (
        <HeroMobileIntro />
      ) : (
        <Image
          src={src}
          alt={`Hero Image ${index + 1}`}
          fill
          className="object-cover"
          quality={40}
          sizes={HERO_IMAGE_SIZES}
        />
      )}
    </motion.div>
  );
}
