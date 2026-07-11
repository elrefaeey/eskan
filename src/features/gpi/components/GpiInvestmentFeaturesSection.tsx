"use client";

import { motion } from "framer-motion";
import {
  fadeUp,
  projectCardItemVariant,
  staggerContainer,
  viewportOnce,
} from "@/lib/animations";
import { GPI_INVESTMENT_FEATURES, GPI_INVESTMENT_SECTION_TITLE } from "../constants";

export default function GpiInvestmentFeaturesSection() {
  return (
    <section className="sec-padding">
      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="text-primary text-2xl md:text-3xl font-extrabold mb-6 border-r-4 border-primary pr-4"
      >
        {GPI_INVESTMENT_SECTION_TITLE}
      </motion.h2>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 gap-5"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        {GPI_INVESTMENT_FEATURES.map((feature) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.title}
              variants={projectCardItemVariant}
              className="bg-white border-2 border-primary/20 rounded-2xl p-4 flex gap-4 shadow-sm hover:border-primary/50 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-extrabold text-lg text-primary mb-1">{feature.title}</h3>
                <p className="text-[#555] text-body-sm leading-relaxed">{feature.desc}</p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
