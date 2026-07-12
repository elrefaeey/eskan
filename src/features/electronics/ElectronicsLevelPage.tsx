"use client";

import { MdExpandMore } from "react-icons/md";
import { IoCaretDownSharp } from "react-icons/io5";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";

import { useElectronicsUnits } from "@/features/electronics/hooks/useElectronicsUnits";
import { useElectronicsSpaces } from "@/features/electronics/hooks/useElectronicsSpaces";
import { useElectronicsNumbers } from "@/features/electronics/hooks/useElectronicsNumbers";
import { useElectronicsImage } from "@/features/electronics/hooks/useElectronicsImage";
import { useElectronicsHeaderImage } from "@/features/electronics/hooks/useElectronicsHeaderImage";

import SelectInput from "@/components/SelectInput";
import CityCenterCard from "@/components/Projects/CityCenter/CityCenterUnitCard";
import { Skeleton } from "@/components/ui/skeleton";

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
          className="text-[#364138] -mt-1.5 sm:-mt-2 sm:size-5.5"
        />
      </div>

      {children}
    </motion.div>
  );
};

// -----------------------------
// MAIN PAGE
// -----------------------------
const ElectronicsLevel = () => {
  const searchParams = useSearchParams();
  const filters = {
    space: searchParams.get("space") || "",
    number: searchParams.get("number") || "",
  };

  const {
    data: units,
    isLoading: isLoadingUnits,
    handlePaginate,
    hasMore,
  } = useElectronicsUnits(filters);
  const { data: spaces } = useElectronicsSpaces();
  const { data: numbers } = useElectronicsNumbers({
    space: filters.space,
  });
  const { data: electronicsImage, isLoading: isLoadingImage } =
    useElectronicsImage();
  const { data: headerImage, isLoading: isLoadingHeader } =
    useElectronicsHeaderImage();

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
          دور الالكترونيات {" > "} سيتي سنتر
        </motion.h2>

        <motion.div className="level-image rounded-xl mt-3 lg:mt-6  shadow-lg overflow-hidden relative">
          {isLoadingHeader ? (
            <Skeleton className="rounded-xl w-full h-125 lg:h-175" />
          ) : (
            <Image
              src={headerImage?.img || ""}
              alt="electronics header image"
              width={1200}
              height={600}
              className="rounded-xl w-full  lg:h-175 object-cover"
              priority
            />
          )}
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-2 gap-4 lg:gap-14 sec-padding items-center">
        <motion.div
          initial={{ opacity: 0, x: -25 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="flex items-center gap-3 text-primary h2 text-xl md:text-2xl lg:text-3xl xl:text-[38px] font-bold mb-0 lg:mb-3">
            <img src={"/assets/icons/glass-icon.svg"} alt="search icon" />
            <span>لية تشتري في الالكترونيات؟</span>
          </h2>

          <p className="text-justify text-base md:text-[20px] lg:text-2xl xl:text-[26px] leading-relaxed text-[#444] mt-2">
            مول سيتي سنتر بيوفر أكبر مجمع للإلكترونيات متخصص في تجارة وصيانة
            وبيع جميع أنواع الموبايلات وأجهزة الكمبيوتر واللابتوب وماكينات
            الطباعة دور الالكترونيات هو الاختيار الأول والوحيد لكل المهتمين لكل
            شيء يخص التكنولوجيا.
          </p>

          <div className="hidden lg:block mt-8 relative">
            <motion.h3
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-[#364138] text-white font-bold text-xl lg:text-2xl text-center py-3 rounded-lg shadow-md"
            >
              حدد مواصفات محلك
            </motion.h3>

            <div className="unit-filters p-2 pt-0 rounded-xl">
              <div className="grid grid-cols-2 gap-4 lg:gap-10">
                <SelectWithArrow>
                  <SelectInput
                    options={[{ value: "", label: "إعادة تعيين" }, ...(spaces || [])]}
                    name="space"
                    placeholder="مساحة الوحدة"
                    labelClass="lg:text-sm! 2xl:text-xl"
                    className="sm:text-base! text-xs! p-1! sm:p-2 lg:text-sm! 2xl:text-xl!"
                  />
                </SelectWithArrow>

                <SelectWithArrow>
                  <SelectInput
                    options={[{ value: "", label: "إعادة تعيين" }, ...(numbers || [])]}
                    name="number"
                    placeholder="رقم الوحدة"
                    labelClass="lg:text-sm! 2xl:text-xl"
                    className="sm:text-base! text-xs! p-1! lg:text-sm! 2xl:text-xl!"
                  />
                </SelectWithArrow>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 25 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="level-image w-full shadow-lg rounded-xl"
        >
          {isLoadingImage ? (
            <Skeleton className="w-full rounded-xl h-75 lg:h-125" />
          ) : (
            <img
              src={electronicsImage?.img || ""}
              alt="electro image"
              className="w-full rounded-xl"
              loading="lazy"
            />
          )}
        </motion.div>
      </div>

      <div className="sec-padding ">
        <div className="lg:hidden w-full">
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
                section="الكترونيات"
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

export default ElectronicsLevel;
