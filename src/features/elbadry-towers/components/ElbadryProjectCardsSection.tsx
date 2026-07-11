"use client";

import { motion } from "framer-motion";
import { viewportOnce } from "@/lib/animations";
import {
  ELBADRY_CARDS_SECTION_TITLE,
  ELBADRY_PROJECT_CARDS,
} from "../constants";
import {
  elbadryCardsStaggerContainer,
  elbadryCardsTitleVariant,
  elbadryCardItemVariant,
} from "../constants/animations";
import ElbadryProjectCard from "./ElbadryProjectCard";

export default function ElbadryProjectCardsSection() {
  return (
    <motion.section
      className="sec-padding"
      variants={elbadryCardsStaggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      <motion.h2
        variants={elbadryCardsTitleVariant}
        className="text-[#1a1a1a] text-2xl md:text-3xl font-extrabold mb-6 border-b-2 border-primary/30 pb-3"
      >
        {ELBADRY_CARDS_SECTION_TITLE}
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {ELBADRY_PROJECT_CARDS.map((card) => (
          <motion.div key={card.title} variants={elbadryCardItemVariant}>
            <ElbadryProjectCard card={card} />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
