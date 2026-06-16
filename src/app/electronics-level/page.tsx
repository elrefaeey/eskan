"use client";

import { motion } from "framer-motion";
import AnimatedSection from "@/components/common/animations/AnimatedSection";
import { Loader2, Cpu, TrendingUp, Users, MoveDown } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { MdExpandMore } from "react-icons/md";

import { useElectronicsUnits } from "@/features/electronics/hooks/useElectronicsUnits";
import { useElectronicsSpaces } from "@/features/electronics/hooks/useElectronicsSpaces";
import { useElectronicsNumbers } from "@/features/electronics/hooks/useElectronicsNumbers";
import { useElectronicsImage } from "@/features/electronics/hooks/useElectronicsImage";
import { useElectronicsHeaderImage } from "@/features/electronics/hooks/useElectronicsHeaderImage";
import { useLenis } from "@/hooks/useLenis";

import SelectInput from "@/components/SelectInput";
import CityCenterCard from "@/components/Projects/CityCenter/CityCenterUnitCard";
import { ProjectHero, FeaturesHighlights } from "@/components/shared";
import type { HighlightItem } from "@/components/shared";

const highlights: HighlightItem[] = [
  { icon: Cpu, title: "متخصص في التكنولوجيا", desc: "موبايلات، لابتوب، كمبيوتر، ماكينات طباعة — كل شيء تكنولوجيا في مكان واحد" },
  { icon: TrendingUp, title: "أعلى عائد", desc: "عوائد إيجارية مميزة في أكبر مجمع إلكترونيات بالمنصورة" },
  { icon: Users, title: "جمهور ضخم", desc: "يستهدف أكثر من 10 مليون مواطن من أبناء الدقهلية والدلتا" },
];

const ElectronicsLevel = () => {
  const searchParams = useSearchParams();
  const filters = {
    space: searchParams.get("space") || "",
    revenue: searchParams.get("revenue") || "",
    number: searchParams.get("number") || "",
  };

  const { data: units, isLoading: isLoadingUnits, handlePaginate, hasMore } = useElectronicsUnits(filters);
  const { data: spaces } = useElectronicsSpaces();
  const { data: numbers } = useElectronicsNumbers();
  const { data: electronicsImage } = useElectronicsImage();
  const { data: headerImage, isLoading: isLoadingHeader } = useElectronicsHeaderImage();

  useLenis();

  return (
    <div className="page" dir="rtl">

      {/* ── Hero ── */}
      <ProjectHero
        isLoading={isLoadingHeader}
        visualType="static"
        staticImage={headerImage?.img || ""}
        staticImageAlt="دور الإلكترونيات"
        badge={{ text: "دور الإلكترونيات — سيتي سنتر", color: "primary" }}
        title="دور الإلكترونيات"
        subtitle="سيتي سنتر المنصورة"
        description="مول سيتي سنتر بيوفر أكبر مجمع للإلكترونيات متخصص في تجارة وصيانة وبيع جميع أنواع الموبايلات وأجهزة الكمبيوتر واللابتوب وماكينات الطباعة. دور الإلكترونيات هو الاختيار الأول والوحيد لكل المهتمين بكل شيء يخص التكنولوجيا."
        ctaButtons={[
          {
            text: "حدد مواصفات محلك",
            icon: <Cpu className="w-5 h-5" />,
            scrollToId: "units-section",
            variant: "primary",
          },
        ]}
        className="mb-10"
      />

      <div className="container mx-auto">

      {/* ── مميزات ── */}
      <FeaturesHighlights highlights={highlights} cols={3} className="mb-10" />

      {/* ── ليه تستثمر + صورة المخطط ── */}
      <AnimatedSection
        duration={0.5}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 bg-[#f8f8f8] rounded-2xl p-6 md:p-8 border border-gray-100 items-center"
      >
        <div className="flex flex-col gap-3">
          <h2 className="text-primary text-2xl md:text-3xl font-extrabold">
            ليه تستثمر في الإلكترونيات؟
          </h2>
          <p className="text-[#333] text-base md:text-lg leading-[2]">
            مول سيتي سنتر بيوفر أكبر مجمع للإلكترونيات متخصص في تجارة وصيانة وبيع جميع أنواع
            الموبايلات وأجهزة الكمبيوتر واللابتوب وماكينات الطباعة. دور الإلكترونيات هو الاختيار
            الأول والوحيد لكل المهتمين بكل شيء يخص التكنولوجيا.
          </p>
        </div>
        {electronicsImage?.img && (
          <div className="flex items-center justify-center">
            <img src={"/assets/projects/city-center/الالكترونيات.png"} alt="مخطط دور الإلكترونيات" className="w-full h-auto max-h-[280px] object-contain rounded-xl" />
          </div>
        )}
      </AnimatedSection>

      {/* ── الفلاتر + الوحدات ── */}
      <div id="units-section">
        <AnimatedSection duration={0.5} className="mb-10">
        <div className="bg-[#364138] rounded-2xl p-5 mb-6">
          <h3 className="text-white font-extrabold text-xl text-center mb-5 flex items-center justify-center gap-2">
            <MoveDown className="w-5 h-5" />
            حدد مواصفات محلك
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <SelectInput options={numbers || []} name="number" placeholder="رقم الوحدة" />
            <SelectInput options={spaces || []} name="space" placeholder="مساحة الوحدة" />
          </div>
        </div>

        {isLoadingUnits && units.length === 0 ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-12 h-12 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
            {units.map((unit) => (
              <CityCenterCard key={unit.id} unit={unit} section="الكترونيات" appear={true} />
            ))}
          </div>
        )}

        {hasMore && (
          <motion.button
            whileTap={{ scale: 0.92 }}
            whileHover={{ scale: 1.05 }}
            disabled={isLoadingUnits}
            onClick={handlePaginate}
            className="flex items-center mx-auto mt-6 gap-2 text-black font-bold text-lg disabled:opacity-50"
          >
            {isLoadingUnits ? <Loader2 className="w-5 h-5 animate-spin" /> : "رؤية المزيد"}
            {!isLoadingUnits && <MdExpandMore className="text-primary font-bold" size={28} />}
          </motion.button>
        )}
      </AnimatedSection>
      </div>

      </div>

    </div>
  );
};

export default ElectronicsLevel;
