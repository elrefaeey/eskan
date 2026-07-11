"use client";

import { GraduationCap } from "lucide-react";
import { GpiSharesSection } from "@/features/gpi/components/GpiSharesSection";
import GpiStatsSection from "@/features/gpi/components/GpiStatsSection";
import GpiWhySection from "@/features/gpi/components/GpiWhySection";
import GpiInvestmentFeaturesSection from "@/features/gpi/components/GpiInvestmentFeaturesSection";
import GpiForWhoSection from "@/features/gpi/components/GpiForWhoSection";
import { GPI_HERO, GPI_IMAGES, GPI_SHARES_SECTION_ID } from "@/features/gpi/constants";
import { ProjectHero } from "@/components/shared";

export default function GpiPage() {

  return (
    <main className="page" >
      <ProjectHero
        visualType="slider"
        images={[...GPI_IMAGES]}
        badge={{ text: GPI_HERO.badge, className: GPI_HERO.badgeClassName }}
        title={GPI_HERO.title}
        description={GPI_HERO.description}
        ctaButtons={[
          {
            text: GPI_HERO.ctaText,
            icon: <GraduationCap className="w-5 h-5" />,
            scrollToId: GPI_SHARES_SECTION_ID,
            variant: "primary",
          },
        ]}
        className="sec-padding mb-0"
      />

      <div className="container mx-auto">
        <GpiStatsSection />
        <GpiWhySection />
        <GpiInvestmentFeaturesSection />
        <GpiForWhoSection />
        <GpiSharesSection />
      </div>
    </main>
  );
}
