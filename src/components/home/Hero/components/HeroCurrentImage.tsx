import Image from "next/image";
import { motion } from "framer-motion";
import { HERO_IMAGE_SIZES } from "@/features/home/constants/hero";
import {
  heroCurrentImageAnimate,
  heroCurrentImageInitial,
  heroCurrentImageTransition,
} from "../animations";

interface HeroCurrentImageProps {
  src: string;
  index: number;
}

export default function HeroCurrentImage({ src, index }: HeroCurrentImageProps) {
  return (
    <motion.div
      key={`current-${index}`}
      className="relative w-full h-full"
      initial={heroCurrentImageInitial}
      animate={heroCurrentImageAnimate}
      transition={heroCurrentImageTransition}
    >
      <Image
        src={src}
        alt={`Hero Image ${index + 1}`}
        fill
        className="object-cover"
        priority
        quality={40}
        sizes={HERO_IMAGE_SIZES}
      />
    </motion.div>
  );
}
