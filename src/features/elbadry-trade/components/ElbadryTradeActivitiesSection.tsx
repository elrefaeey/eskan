"use client";

import AnimatedSection from "@/components/common/animations/AnimatedSection";
import { fadeUp } from "@/lib/animations";
import { MALL_SECTIONS } from "@/features/mall/constants";
import { ELBADRY_TRADE_ACTIVITIES } from "../constants";
import ElbadryActivityCard from "./ElbadryActivityCard";

export default function ElbadryTradeActivitiesSection() {
  return (
    <AnimatedSection as="section" variant={fadeUp} className="sec-padding">
      <h2 className="text-primary text-2xl md:text-3xl font-extrabold mb-6 border-r-4 border-primary pr-4">
        {MALL_SECTIONS.activities}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {ELBADRY_TRADE_ACTIVITIES.map((activity) => (
          <ElbadryActivityCard key={activity.link} activity={activity} />
        ))}
      </div>
    </AnimatedSection>
  );
}
