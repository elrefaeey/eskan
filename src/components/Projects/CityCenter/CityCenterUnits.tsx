"use client";

import useCityCenterUnits from "@/hooks/projects/city-center/useCityCenterUnits";
import CityCenterCard from "@/components/Projects/CityCenter/CityCenterUnitCard";
import { MdExpandMore } from "react-icons/md";
import { motion } from "framer-motion";
import {
  fadeInLeft,
  fadeInRight,
  scaleIn,
  springButtonTransition,
} from "@/lib/animations";
import AnimatedSection from "@/components/common/animations/AnimatedSection";
import { IoCaretDownSharp } from "react-icons/io5";
import React from "react";
import SelectInput from "@/components/SelectInput";
import useCityCenterSpaces from "@/hooks/projects/city-center/useCityCenterSpaces";
import useCityCenterRevenues from "@/hooks/projects/city-center/useCityCenterRevenues";
import useCityCenterNumbers from "@/hooks/projects/city-center/useCityCenterNumbers";

interface SelectInputProps {
  labelClass?: string;
  className?: string;
}

const SelectWithArrow = ({
  children,
}: {
  children: React.ReactElement<SelectInputProps>;
}) => {
  return (
    <AnimatedSection duration={0.5} className="flex flex-col items-center gap-1 lg:gap-2">
      <div className="flex items-center flex-col">
        <div className="w-1 h-6 bg-[#364138]" />
        <IoCaretDownSharp size={22} className="text-[#364138] -mt-2" />
      </div>

      {React.cloneElement(children, {
        labelClass: "lg:!text-sm 2xl:text-xl",
        className:
          "sm:!text-base !text-xs !p-1 sm:p-2 lg:!text-sm 2xl:!text-xl",
      })}
    </AnimatedSection>
  );
};

const CityCenterUnitsClient = () => {
  const { data: units, isLoading, handlePaginate } = useCityCenterUnits();
  const { data: spaces } = useCityCenterSpaces();
  const { data: revenues } = useCityCenterRevenues();
  const { data: numbers } = useCityCenterNumbers();
  return (
    <>
      <div className="grid lg:grid-cols-2 gap-4 lg:gap-14 sec-padding items-center">
        <AnimatedSection variant={fadeInLeft} x={-25}>
          <h2 className="flex items-center gap-3 text-primary h2 text-xl md:text-2xl lg:text-3xl xl:text-[38px] font-bold mb-0 lg:mb-3">
            <img src={"/assets/icons/glass-icon.svg"} alt="search icon" />
            <span>ليه تستثمر في البازار ؟</span>
          </h2>

          <p className="text-primary text-justify text-body-base md:text-[20px] lg:text-2xl xl:text-[26px] leading-relaxed text-[#444] mt-2">
            سيتي سنتر خصص دور كامل للبازارات وهي مجموعة مساحات لعرض وبيع منتجات
            مختلفة ومتنوعة زي الملابس والاكسسوار والمعطرات ومنتجات عناية البشرة
            والأنشطة الموسمية مثل شنط المدارس ومعارض رمضان والعيد ودخلة رأس
            السنة. ويتم تأجير البازار يومياً وليس شهرياً بعوائد ايجارية هي
            الأعلى بالمول وبالمنصورة.
          </p>

          <div className="hidden lg:block mt-8">
            <AnimatedSection
              as="h3"
              variant={scaleIn}
              className="bg-[#364138] text-white font-bold text-xl lg:text-2xl text-center py-3 rounded-lg shadow-md"
            >
              حدد مواصفات محلك
            </AnimatedSection>

            <div className="unit-filters flex justify-between gap-10 p-6 pt-0 rounded-xl">
              <SelectWithArrow>
                <SelectInput
                  options={revenues}
                  name="revenue"
                  placeholder="العائد الإيجاري"
                />
              </SelectWithArrow>

              <SelectWithArrow>
                <SelectInput
                  options={numbers}
                  name="unitNum"
                  placeholder="رقم الوحدة"
                />
              </SelectWithArrow>

              <SelectWithArrow>
                <SelectInput
                  options={spaces}
                  name="space"
                  placeholder="مساحة الوحدة"
                />
              </SelectWithArrow>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection
          variant={fadeInRight}
          x={25}
          className="level-image w-full shadow-lg rounded-xl"
        >
          <img
            src={`https://back.mansoura-eco-build.com/storage/app/public/images/Eskan/ClcJbZw4WhatsApp%20Image%202025-03-19%20at%201.16.02%20PM%20(2).jpeg`}
            alt="electro image"
            className="w-full rounded-xl"
            loading="lazy"
          />
        </AnimatedSection>
      </div>

      <div className="sec-padding ">
        <div className=" lg:hidden">
          <h3 className="bg-[#364138] text-white font-bold text-xl text-center py-3 rounded-lg shadow-sm">
            حدد مواصفات محلك
          </h3>

          <div className="unit-filters grid grid-cols-3 gap-4 p-4 pt-0 rounded-xl">
            <SelectWithArrow>
              <SelectInput
                options={revenues}
                name="revenue"
                placeholder="العائد الإيجاري"
              />
            </SelectWithArrow>

            <SelectWithArrow>
              <SelectInput
                options={numbers}
                name="unitNum"
                placeholder="رقم الوحدة"
              />
            </SelectWithArrow>

            <SelectWithArrow>
              <SelectInput
                options={spaces}
                name="space"
                placeholder="مساحة الوحدة"
              />
            </SelectWithArrow>
          </div>
        </div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3 lg:gap-6">
          {units.data.map((unit) => (
            <CityCenterCard
              key={unit.id}
              unit={unit}
              section="بازار"
              appear={true}
            />
          ))}
        </div>{" "}
        <motion.button
          whileTap={{ scale: 0.92 }}
          whileHover={{ scale: 1.05 }}
          transition={springButtonTransition}
          disabled={isLoading}
          onClick={handlePaginate}
          className="flex items-center mx-auto mt-4 gap-2 text-black font-bold text-lg
          disabled:opacity-50 disabled:cursor-not-allowed text-center"
        >
          رؤية المزيد
          <MdExpandMore className="text-primary font-bold" size={28} />
        </motion.button>
      </div>
    </>
  );
};

export default CityCenterUnitsClient;
