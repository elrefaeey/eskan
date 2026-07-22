"use client";

import AnimatedSection from "@/components/common/animations/AnimatedSection";
import {
  OWNERS_ASSOCIATION_VIEWPORT_AMOUNT,
  ownersAssociationContainerVariant,
} from "./animations";
import OwnersAssociationContent from "./components/OwnersAssociationContent";
import OwnersAssociationImage from "./components/OwnersAssociationImage";

export default function OwnersAssociation() {
  return (
    <section className="sec-padding container">
      <AnimatedSection
        variant={ownersAssociationContainerVariant}
        amount={OWNERS_ASSOCIATION_VIEWPORT_AMOUNT}
        className="bg-gradient-to-br from-[#F5F5F5] to-[#E9E9E9] shadow-[0_8px_24px_rgba(0,0,0,0.1)] rounded-2xl
         p-4 lg:p-8 flex flex-col lg:flex-row items-center gap-6 lg:gap-12"
      >
        <OwnersAssociationContent />
        <OwnersAssociationImage />
      </AnimatedSection>
    </section>
  );
}
