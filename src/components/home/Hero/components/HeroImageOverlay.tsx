import { motion } from "framer-motion";
import { HERO_OVERLAY_OPACITY, heroOverlayTransition } from "../animations";

export default function HeroImageOverlay() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: HERO_OVERLAY_OPACITY }}
      transition={heroOverlayTransition}
      className="absolute inset-0 bg-[#364138] pointer-events-none mix-blend-multiply"
    />
  );
}
