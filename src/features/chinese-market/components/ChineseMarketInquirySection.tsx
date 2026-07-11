"use client";

import AnimatedSection from "@/components/common/animations/AnimatedSection";
import { fadeUp } from "@/lib/animations";
import { MALL_INQUIRY_SECTION_ID } from "@/features/mall/constants";
import { CHINESE_MARKET_INQUIRY } from "../constants";

export default function ChineseMarketInquirySection() {
  return (
    <div id={MALL_INQUIRY_SECTION_ID}>
      <AnimatedSection
        variant={fadeUp}
        className="sec-padding bg-white rounded-2xl p-8 md:p-12 border border-gray-100 text-center"
      >
        <h2 className="text-primary text-2xl md:text-3xl font-extrabold mb-4">
          {CHINESE_MARKET_INQUIRY.title}
        </h2>
        <p className="text-[#555] text-body-base md:text-lg leading-relaxed max-w-2xl mx-auto">
          {CHINESE_MARKET_INQUIRY.description}
        </p>
      </AnimatedSection>
    </div>
  );
}
