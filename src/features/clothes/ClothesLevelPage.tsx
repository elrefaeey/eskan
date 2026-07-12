"use client";

import { MdExpandMore } from "react-icons/md";
import { IoCaretDownSharp } from "react-icons/io5";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";

import { useClothesUnits } from "@/features/clothes/hooks/useClothesUnits";
import { useClothesSpaces } from "@/features/clothes/hooks/useClothesSpaces";
import { useClothesNumbers } from "@/features/clothes/hooks/useClothesNumbers";
// import { useClothesImage } from "@/features/clothes/hooks/useClothesImage";
import { useClothesHeaderImage } from "@/features/clothes/hooks/useClothesHeaderImage";

import SelectInput from "@/components/SelectInput";
import CityCenterCard from "@/components/Projects/CityCenter/CityCenterUnitCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useClothesRevenues } from "@/features/clothes/hooks/useClothesRevenues";

// -----------------------------
// Select + Arrow Wrapper
// -----------------------------

const SelectWithArrow = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center gap-1 lg:gap-2"
    >
      <div className="flex items-center flex-col">
        <div className="w-0.5 sm:w-1 h-4 sm:h-6 bg-[#364138]" />
        <IoCaretDownSharp
          size={18}
          className="text-[#364138] -mt-1.5 sm:-mt-2 sm:size-[22px]"
        />
      </div>

      {children}
    </motion.div>
  );
};

// -----------------------------
// MAIN PAGE
// -----------------------------
const ClothesLevel = () => {
  const searchParams = useSearchParams();
  const filters = {
    space: searchParams.get("space") || "",
    revenue: searchParams.get("revenue") || "",
    number: searchParams.get("number") || "",
  };

  const {
    data: units,
    isLoading: isLoadingUnits,
    handlePaginate,
    hasMore,
  } = useClothesUnits(filters);
  const { data: spaces } = useClothesSpaces();
  const { data: revenues } = useClothesRevenues();
  const { data: numbers } = useClothesNumbers();
  const { data: headerImage, isLoading: isLoadingHeader } =
    useClothesHeaderImage();
  return (
    <div className="container page">
      {/* TITLE */}
      <div className="sec-padding">
        <motion.h2
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-primary h2 text-xl md:text-2xl lg:text-3xl xl:text-[38px] font-bold"
        >
          دور الملابس {" > "} سيتي سنتر
        </motion.h2>

        <motion.div className="level-image rounded-xl mt-3 lg:mt-6 shadow-lg overflow-hidden relative">
          {isLoadingHeader || !headerImage?.img ? (
            <Skeleton className="rounded-xl w-full h-[500px] lg:h-[700px]" />
          ) : (
            <Image
              src={headerImage.img}
              alt="clothes header image"
              width={1200}
              height={600}
              className="rounded-xl w-full lg:h-[700px] object-cover"
              priority
            />
          )}
        </motion.div>
      </div>

      <div className="sec-padding">
        <div className=" w-full relative">
          <h3 className="bg-[#364138] text-white font-bold text-xl text-center py-3 rounded-lg shadow-sm">
            حدد مواصفات محلك
          </h3>

          <div className="unit-filters mb-4 pt-0 rounded-xl w-full">
            <div className="grid grid-cols-2 gap-1.5 sm:gap-4">
              <SelectWithArrow>
                <SelectInput
                  options={[{ value: "", label: "إعادة تعيين" }, ...(spaces || [])]}
                  name="space"
                  placeholder="مساحة الوحدة"
                />
              </SelectWithArrow>
              <SelectWithArrow>
                <SelectInput
                  options={[{ value: "", label: "إعادة تعيين" }, ...(numbers || [])]}
                  name="number"
                  placeholder="رقم الوحدة"
                />
              </SelectWithArrow>
            </div>

          </div>
        </div>
        {isLoadingUnits && units.length === 0 ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-12 h-12 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3 lg:gap-6">
            {units.map((unit) => (
              <CityCenterCard
                key={unit.id}
                unit={unit}
                section="ملابس"
                appear={true}
              />
            ))}
          </div>
        )}
        {hasMore && (
          <motion.button
            whileTap={{ scale: 0.92 }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 120 }}
            disabled={isLoadingUnits}
            onClick={handlePaginate}
            className="flex items-center mx-auto mt-4 gap-2 text-black font-bold text-lg
            disabled:opacity-50 disabled:cursor-not-allowed text-center"
          >
            {isLoadingUnits ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              "رؤية المزيد"
            )}
            {!isLoadingUnits && (
              <MdExpandMore className="text-primary font-bold" size={28} />
            )}
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default ClothesLevel;
