"use client";

import AnimatedSection from "@/components/common/animations/AnimatedSection";
import { CARDS_SECTION_ITEMS } from "./constants";
import { CARDS_SECTION_HEADER_VARIANT } from "./animations";
import CardsSectionCard from "./CardsSectionCard";

export default function CardsSections() {
  return (
    <section className="container sec-padding">
      <AnimatedSection variant={CARDS_SECTION_HEADER_VARIANT} className="text-center mb-8 md:mb-10">
        <span className="inline-block bg-primary/10 text-primary font-bold text-sm px-4 py-1.5 rounded-full mb-3">
          استثمر معنا
        </span>
        <h2 className="text-primary text-3xl md:text-4xl font-extrabold">
          فرص نمو حقيقية
        </h2>
      </AnimatedSection>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
        {CARDS_SECTION_ITEMS.map((card, index) => (
          <CardsSectionCard key={card.link} card={card} index={index} />
        ))}
      </div>
    </section>
  );
}
