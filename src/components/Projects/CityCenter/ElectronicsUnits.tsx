import { motion, useAnimation } from "framer-motion";

import useCityCenterUnits from "@/hooks/projects/city-center/useCityCenterUnits";
import useCityCenterSpaces from "@/hooks/projects/city-center/useCityCenterSpaces";
import useCityCenterRevenues from "@/hooks/projects/city-center/useCityCenterRevenues";
import useCityCenterNumbers from "@/hooks/projects/city-center/useCityCenterNumbers";
import SelectInput from "@/components/SelectInput";
import CityCenterCard from "@/components/Projects/CityCenter/CityCenterUnitCard";
import { IoCaretDownSharp } from "react-icons/io5";
import React from "react";
import { MdExpandMore } from "react-icons/md";
// -----------------------------
// Select + Arrow Wrapper
// -----------------------------
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center gap-1 lg:gap-2"
    >
      <div className="flex items-center flex-col">
        <div className="w-1 h-6 bg-[#364138]" />
        <IoCaretDownSharp size={22} className="text-[#364138] -mt-2" />
      </div>

      {React.cloneElement(children, {
        labelClass: "lg:!text-sm 2xl:text-xl",
        className:
          "sm:!text-base !text-xs !p-1 sm:p-2 lg:!text-sm 2xl:!text-xl",
      })}
    </motion.div>
  );
};

function ElectronicsUnits() {
  const {
    data: units,
    isLoading,
    handlePaginate,
  } = useCityCenterUnits("الكترونيات");
  const { data: spaces } = useCityCenterSpaces();
  const { data: revenues } = useCityCenterRevenues();
  const { data: numbers } = useCityCenterNumbers();
  return (
    <>
      {/* WHY SECTION */}
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

          <p className="text-primary text-justify text-base md:text-[20px] lg:text-2xl xl:text-[26px] leading-relaxed text-[#444] mt-2">
            مول سيتي سنتر بيوفر أكبر مجمع للإلكترونيات متخصص في تجارة وصيانة
            وبيع جميع أنواع الموبايلات وأجهزة الكمبيوتر واللابتوب وماكينات
            الطباعة دور الالكترونيات هو الاختيار الأول والوحيد لكل المهتمين لكل
            شيء يخص التكنولوجيا.
          </p>

          {/* FILTERS – DESKTOP */}
          <div className="hidden lg:block mt-8">
            <motion.h3
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-[#364138] text-white font-bold text-xl lg:text-2xl text-center py-3 rounded-lg shadow-md"
            >
              حدد مواصفات محلك
            </motion.h3>

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
        </motion.div>

        {/* SECOND IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: 25 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="level-image w-full shadow-lg rounded-xl"
        >
          <img
            src={
              "https://back.mansoura-eco-build.com/storage/app/public/images/Eskan/zh66RlerWhatsApp%20Image%202025-03-19%20at%201.45.28%20PM.jpeg"
            }
            alt="electro image"
            className="w-full rounded-xl"
            loading="lazy"
          />
        </motion.div>
      </div>

      {/* SHOW MORE BUTTON */}
      <div className="sec-padding ">
        {/* FILTERS – MOBILE */}
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
              section="الكترونيات"
              appear={true}
            />
          ))}
        </div>{" "}
        <motion.button
          whileTap={{ scale: 0.92 }}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 120 }}
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
}

export default ElectronicsUnits;
