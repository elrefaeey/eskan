"use client";

import { motion } from "framer-motion";
import AnimatedSection from "@/components/common/animations/AnimatedSection";
import { Loader2, Shirt, TrendingUp, Users, MoveDown } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { MdExpandMore } from "react-icons/md";

import { useClothesUnits } from "@/features/clothes/hooks/useClothesUnits";
import { useClothesSpaces } from "@/features/clothes/hooks/useClothesSpaces";
import { useClothesNumbers } from "@/features/clothes/hooks/useClothesNumbers";
import { useClothesHeaderImage } from "@/features/clothes/hooks/useClothesHeaderImage";
import { useLenis } from "@/hooks/useLenis";

import SelectInput from "@/components/SelectInput";
import CityCenterCard from "@/components/Projects/CityCenter/CityCenterUnitCard";
import { ProjectHero, FeaturesHighlights } from "@/components/shared";
import type { HighlightItem } from "@/components/shared";

const highlights: HighlightItem[] = [
  { icon: Shirt, title: "متخصص في الملابس", desc: "دور كامل مخصص لتجارة الملابس بكل أنواعها وأحجامها" },
  { icon: TrendingUp, title: "عائد مميز", desc: "عوائد إيجارية مستقرة في موقع يخدم الدلتا بالكامل" },
  { icon: Users, title: "جمهور واسع", desc: "يستهدف أكثر من 10 مليون مواطن من أبناء الدقهلية والدلتا" },
];

const ClothesLevel = () => {
  const searchParams = useSearchParams();
  const filters = {
    space: searchParams.get("space") || "",
    revenue: searchParams.get("revenue") || "",
    number: searchParams.get("number") || "",
  };

  const { data: units, isLoading: isLoadingUnits, handlePaginate, hasMore } = useClothesUnits(filters);
  const { data: spaces } = useClothesSpaces();
  const { data: numbers } = useClothesNumbers();
  const { data: headerImage, isLoading: isLoadingHeader } = useClothesHeaderImage();

  useLenis();

  return (
    <div className="page" dir="rtl">

      {/* ── Hero ── */}
      <ProjectHero
        isLoading={isLoadingHeader}
        visualType="static"
        staticImage={headerImage?.img || ""}
        staticImageAlt="دور الملابس"
        badge={{ text: "دور الملابس — سيتي سنتر", color: "primary" }}
        title="دور الملابس"
        subtitle="سيتي سنتر المنصورة"
        description="دور كامل مخصص لتجارة الملابس بكل أنواعها وأحجامها في موقع استراتيجي يخدم الدلتا بالكامل. مساحات مناسبة بمقدم ميسر وتقسيط حتى 3 سنوات."
        ctaButtons={[
          {
            text: "حدد مواصفات محلك",
            icon: <Shirt className="w-5 h-5" />,
            scrollToId: "units-section",
            variant: "primary",
          },
        ]}
        className="mb-10"
      />

      <div className="container mx-auto">

      {/* ── مميزات ── */}
      <FeaturesHighlights highlights={highlights} cols={3} className="mb-10" />

      {/* ── الفلاتر + الوحدات ── */}
      <div id="units-section">
        <AnimatedSection duration={0.5} className="mb-10">
        <div className="bg-[#364138] rounded-2xl p-4 mb-6">
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
              <CityCenterCard key={unit.id} unit={unit} section="ملابس" appear={true} />
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

export default ClothesLevel;
