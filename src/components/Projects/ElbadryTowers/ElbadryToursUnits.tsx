"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/common/animations/AnimatedSection";
import { fadeUp, viewportOnce } from "@/lib/animations";
import {
  elbadryBlocksStaggerContainer,
  elbadryBlockItemVariant,
} from "@/features/elbadry-towers/constants/animations";
import {
  ELBADRY_BLOCKS,
  ELBADRY_BLOCKS_INTRO,
  ELBADRY_MAP_FALLBACK_IMAGE,
  ELBADRY_TOWERS_SECTIONS,
  ELBADRY_UNITS_SECTION_ID,
} from "@/features/elbadry-towers/constants";
import ElbadryTowersUnitsSection from "@/features/elbadry-towers/components/ElbadryTowersUnitsSection";
import useProjectMapImage from "@/features/elbadry-towers/hooks/useProjectMapImage";
import { BrandSpinner } from "@/components/common/BrandSpinner";

const ElbadryToursUnits = () => {
  const { mapImage, isLoading } = useProjectMapImage();

  return (
    <>
      <AnimatedSection variant={fadeUp} className="sec-padding [direction:rtl]">
        <h2 className="text-primary text-2xl md:text-3xl font-extrabold mb-6 border-r-4 border-primary pr-4">
          {ELBADRY_TOWERS_SECTIONS.unitsLocation}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative w-full h-72 md:h-[480px] rounded-2xl overflow-hidden shadow-md">
            {isLoading ? (
              <div className="flex items-center justify-center h-full bg-gray-50">
                <BrandSpinner size="md" />
              </div>
            ) : (
              <Image
                src={mapImage?.img || ELBADRY_MAP_FALLBACK_IMAGE}
                alt="موقع أبراج البدري"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            )}
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-[#333] text-lg md:text-xl font-bold leading-relaxed">
              {ELBADRY_BLOCKS_INTRO}
            </p>
            <motion.div
              className="flex flex-col gap-3"
              variants={elbadryBlocksStaggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              {ELBADRY_BLOCKS.map((block) => (
                <motion.div
                  key={block.id}
                  variants={elbadryBlockItemVariant}
                  className="flex items-start gap-4 bg-white border border-gray-100 rounded-2xl p-4 shadow-sm"
                >
                  <div className={`${block.color} w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow`}>
                    <span className="text-white font-extrabold text-base">{block.id}</span>
                  </div>
                  <div>
                    <p className="font-bold text-primary text-sm mb-0.5">بلوك {block.id}</p>
                    <p className="text-[#555] text-body-sm leading-relaxed">{block.text}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      <div id={ELBADRY_UNITS_SECTION_ID}>
        <ElbadryTowersUnitsSection />
      </div>
    </>
  );
};

export default ElbadryToursUnits;
