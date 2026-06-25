"use client";

import ShareCard from "@/features/invesrtment/components/ShareCard";
import { InvestmentSectionHeading } from "@/features/invesrtment/components/InvestmentSectionHeading";
import { AnimateInView } from "@/components/common/animations";
import { Loader2 } from "lucide-react";
import { useVocationalShares } from "../hooks/useVocationalShares";

export function VocationalSharesSection() {
  const { data: units, isLoading, isError } = useVocationalShares();

  if (isLoading) {
    return (
      <section id="investment-shares" className="mb-10 flex justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </section>
    );
  }

  if (isError || !units?.length) return null;

  return (
    <section id="investment-shares" className="mb-10 scroll-mt-24">
      <AnimateInView>
        <InvestmentSectionHeading
          title="الوحدات المتاحة"
          subtitle="اختار الحصة اللي تناسبك واحجز مباشرة"
          level="section"
          centered
          className="mb-6 sm:mb-8"
          titleClassName="text-2xl sm:text-3xl"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {units.map((unit) => (
            <ShareCard key={unit.id} unit={unit} />
          ))}
        </div>
      </AnimateInView>
    </section>
  );
}
