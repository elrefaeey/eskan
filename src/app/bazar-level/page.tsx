"use client";

import React from "react";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/common/animations/AnimatedSection";
import { Loader2, Store, TrendingUp, Calendar, MoveDown } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { MdExpandMore } from "react-icons/md";

import { useBazarUnits } from "@/features/bazar/hooks/useBazarUnits";
import { useBazarSpaces } from "@/features/bazar/hooks/useBazarSpaces";
import { useBazarRevenues } from "@/features/bazar/hooks/useBazarRevenues";
import { useBazarNumbers } from "@/features/bazar/hooks/useBazarNumbers";
import { useBazarImage } from "@/features/bazar/hooks/useBazarImage";
import { useLenis } from "@/hooks/useLenis";

import SelectInput from "@/components/SelectInput";
import CityCenterCard from "@/components/Projects/CityCenter/CityCenterUnitCard";
import { ProjectHero, FeaturesHighlights } from "@/components/shared";
import type { HighlightItem } from "@/components/shared";

const highlights: HighlightItem[] = [
  { icon: Store, title: "تأجير يومي", desc: "يتم تأجير البازار يومياً وليس شهرياً بأعلى عوائد إيجارية في المول" },
  { icon: TrendingUp, title: "أعلى عائد", desc: "عوائد إيجارية هي الأعلى بالمول وبالمنصورة" },
  { icon: Calendar, title: "أنشطة موسمية", desc: "شنط المدارس، معارض رمضان والعيد، دخلة رأس السنة" },
];

const BazarLevel = () => {
  const searchParams = useSearchParams();
  const filters = {
    space: searchParams.get("space") || "",
    revenue: searchParams.get("revenue") || "",
    number: searchParams.get("number") || "",
  };

  const { data: units, isLoading: isLoadingUnits, handlePaginate, hasMore } = useBazarUnits(filters);
  const { data: spaces } = useBazarSpaces();
  const { data: revenues } = useBazarRevenues();
  const { data: numbers } = useBazarNumbers();
  const { data: bazarImage } = useBazarImage();

  useLenis();

  return (
    <div className="page" dir="rtl">

      {/* ── Hero ── */}
      <ProjectHero
        visualType="static"
        staticImage="https://back.mansoura-eco-build.com/storage/app/public/images/Eskan/km1aV1odUntitled-2.jpg"
        staticImageAlt="دور البازار"
        badge={{ text: "دور البازار — سيتي سنتر", color: "primary" }}
        title="دور البازار"
        subtitle="سيتي سنتر المنصورة"
        description="سيتي سنتر خصص دور كامل للبازارات — مجموعة مساحات لعرض وبيع منتجات مختلفة ومتنوعة زي الملابس والاكسسوار والمعطرات ومنتجات عناية البشرة والأنشطة الموسمية. يتم تأجير البازار يومياً بعوائد إيجارية هي الأعلى بالمول وبالمنصورة."
        ctaButtons={[
          {
            text: "حدد مواصفات محلك",
            icon: <Store className="w-5 h-5" />,
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
          <h2 className="text-primary text-2xl md:text-3xl font-extrabold flex items-center gap-2">
            <img src="/assets/icons/glass-icon.svg" alt="search" className="w-7 h-7" />
            ليه تستثمر في البازار؟
          </h2>
          <p className="text-[#333] text-base md:text-lg leading-[2]">
            سيتي سنتر خصص دور كامل للبازارات وهي مجموعة مساحات لعرض وبيع منتجات مختلفة ومتنوعة
            زي الملابس والاكسسوار والمعطرات ومنتجات عناية البشرة والأنشطة الموسمية مثل شنط المدارس
            ومعارض رمضان والعيد ودخلة رأس السنة. ويتم تأجير البازار يومياً وليس شهرياً بعوائد
            إيجارية هي الأعلى بالمول وبالمنصورة.
          </p>
        </div>
        {bazarImage?.img && (
          <div className="flex items-center justify-center">
            <img src={"/assets/projects/city-center/دور البازارات.png"} alt="مخطط دور البازار" className="w-full h-auto max-h-[280px] object-contain rounded-xl" />
          </div>
        )}
      </AnimatedSection>

      {/* ── الفلاتر + الوحدات ── */}
      <div id="units-section">
        <AnimatedSection duration={0.5} className="mb-10">
        {/* header الفلاتر */}
        <div className="bg-[#364138] rounded-2xl p-5 mb-6">
          <h3 className="text-white font-extrabold text-xl text-center mb-5 flex items-center justify-center gap-2">
            <MoveDown className="w-5 h-5" />
            حدد مواصفات محلك
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <SelectInput
              options={revenues || []}
              name="revenue"
              placeholder="العائد الإيجاري"
            />
            <SelectInput
              options={numbers || []}
              name="number"
              placeholder="رقم الوحدة"
            />
            <SelectInput
              options={spaces || []}
              name="space"
              placeholder="مساحة الوحدة"
            />
          </div>
        </div>

        {/* الوحدات */}
        {isLoadingUnits && units.length === 0 ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-12 h-12 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
            {units.map((unit) => (
              <CityCenterCard key={unit.id} unit={unit} section="بازار" appear={true} />
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

export default BazarLevel;
