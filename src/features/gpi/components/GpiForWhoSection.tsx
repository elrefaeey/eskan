"use client";

import { GraduationCap, CheckCircle2 } from "lucide-react";
import AnimatedSection from "@/components/common/animations/AnimatedSection";
import { fadeUp } from "@/lib/animations";
import {
  GPI_FOR_WHO_ITEMS,
  GPI_FOR_WHO_SUBTITLE,
  GPI_FOR_WHO_TITLE,
  GPI_MISSION,
  GPI_SHARES_SECTION_ID,
} from "../constants";

export default function GpiForWhoSection() {
  const scrollToShares = () => {
    document.getElementById(GPI_SHARES_SECTION_ID)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <AnimatedSection
      variant={fadeUp}
      className="sec-padding grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#f8f8f8] rounded-2xl p-4 md:p-8 border border-gray-100"
    >
      <div className="flex flex-col gap-4">
        <h2 className="text-primary text-2xl md:text-3xl font-extrabold">{GPI_FOR_WHO_TITLE}</h2>
        <p className="text-[#555] text-body-base md:text-lg">{GPI_FOR_WHO_SUBTITLE}</p>
        <ul className="flex flex-col gap-3">
          {GPI_FOR_WHO_ITEMS.map((item, i) => (
            <li key={i} className="flex items-center gap-2 text-[#333] text-body-base md:text-lg">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col justify-between gap-4 bg-primary rounded-2xl p-4 md:p-6 text-white">
        <div>
          <h3 className="text-2xl font-extrabold mb-3">{GPI_MISSION.title}</h3>
          <p className="text-white/90 text-body-base leading-[1.9]">{GPI_MISSION.description}</p>
        </div>
        <div className="border-t border-white/20 pt-4">
          <p className="text-white/80 text-sm font-semibold mb-3">{GPI_MISSION.ctaHint}</p>
          <button
            type="button"
            onClick={scrollToShares}
            className="inline-flex items-center gap-2 bg-white text-primary font-bold rounded-xl px-5 py-3 text-sm hover:bg-white/90 transition-colors"
          >
            <GraduationCap className="w-4 h-4" />
            احجز حصتك الاستثمارية الآن
          </button>
        </div>
      </div>
    </AnimatedSection>
  );
}
