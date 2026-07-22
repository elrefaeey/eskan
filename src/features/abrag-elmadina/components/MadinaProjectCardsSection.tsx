"use client";

import { motion } from "framer-motion";
import {
  projectCardsStaggerContainer,
  projectCardsTitleVariant,
  projectCardItemVariant,
  viewportOnce,
} from "@/lib/animations";
import { MADINA_PROJECT_CARDS, MADINA_SECTIONS } from "../constants";
import MadinaProjectCard from "./MadinaProjectCard";

export default function MadinaProjectCardsSection() {
  return (
    <motion.section
      className="sec-padding"
      variants={projectCardsStaggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      <motion.h2
        variants={projectCardsTitleVariant}
        className="text-[#1a1a1a] text-2xl md:text-3xl font-extrabold mb-6 border-b-2 border-primary/30 pb-3"
      >
        {MADINA_SECTIONS.departments}
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 items-stretch gap-4 md:gap-6">
        {MADINA_PROJECT_CARDS.map((card) => (
          <motion.div key={card.title} variants={projectCardItemVariant} className="flex h-full">
            <MadinaProjectCard card={card} />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
