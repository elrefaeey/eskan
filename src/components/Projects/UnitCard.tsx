"use client";

import React, { useState } from "react";
import Image from "next/image";
import { TiLockClosed } from "react-icons/ti";
import { AnimatedImageSwitcher } from "@/components/common/animations";
import ReserveUnitForm from "./ReserveUnit";

interface UnitImages {
  unit_img: string;
  floor_img?: string;
  levelimg?: string;
}

interface Block {
  id: number;
  name: string;
}

interface Level {
  id: number;
  name: string;
}

export interface BaseUnit {
  id: number;
  number: string;
  contract: string | boolean | null;
  duration: string;
  space: number | string;
  meter_price: number;
  advance: number;
  installment?: number;
  appear?: number;
  block_id?: Block | string | null;
  level_id?: Level | string | null;
  images?: UnitImages | string;
  img?: string;
  levelimg?: string;
  type?: string;
  rooms?: number;
  receiving?: number;
  location?: string;
  revenue?: number;
  offer?: boolean;
}

export interface UnitField {
  label: string;
  value: string | number;
  show?: boolean;
}

export interface UnitCardConfig {
  showSpecialOffer?: boolean;
  showRevenueBanner?: boolean;
  showUnitNumber?: boolean;
  imageButtonLabels?: {
    showUnit: string;
    showFloor: string;
  };
  leftFields?: (unit: BaseUnit) => UnitField[];
  rightFields?: (unit: BaseUnit) => UnitField[];
}

interface UnitCardProps {
  unit: BaseUnit;
  data?: BaseUnit[];
  projectId: number;
  config?: UnitCardConfig;
}

const DisplayUnitImgs = ({
  images,
  img,
  levelimg,
  buttonLabels,
}: {
  images?: UnitImages;
  img?: string;
  levelimg?: string;
  buttonLabels?: { showUnit: string; showFloor: string };
}) => {
  const [imgIndex, setImgIndex] = useState(0);

  const defaultLabels = {
    showUnit: "عرض صورة الوحدة",
    showFloor: "عرض موقع الوحدة في الدور",
  };

  const labels = buttonLabels || defaultLabels;

  const unitImg = images?.unit_img || img;
  const floorImg = images?.floor_img || levelimg;
  const imagesList = [unitImg, floorImg].filter(Boolean) as string[];

  const handleImg = () => {
    setImgIndex((prev) => (prev === 0 ? 1 : 0));
  };

  if (!unitImg) return null;

  return (
    <>
      <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-lg bg-gray-100">
        <AnimatedImageSwitcher imageKey={imgIndex} className="absolute inset-0">
          <Image
            src={imagesList[imgIndex] || unitImg}
            alt="unit image صورة الوحدة"
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={imgIndex === 0}
          />
        </AnimatedImageSwitcher>
      </div>
      {imagesList.length > 1 && (
        <div className="change-image-btn mt-2">
          <button
            onClick={handleImg}
            className="p-2 text-white text-xl w-full px-4 bg-[#7D7D7D] hover:bg-[#6A6A6A] transition-colors rounded-lg"
          >
            {imgIndex === 0 ? labels.showFloor : labels.showUnit}
          </button>
        </div>
      )}
    </>
  );
};

const UnitInfoItem = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => (
  <p className="text-body-base max-[375px]:text-body-base sm:text-2xl md:text-base ">
    <span className="font-semibold">{label}</span> : {value}
  </p>
);

const UnitCard = ({ unit, data, projectId, config = {} }: UnitCardProps) => {
  if (!unit || unit.appear === 0) {
    return null;
  }

  const {
    showRevenueBanner = false,
    showUnitNumber = true,
    imageButtonLabels,
    leftFields,
    rightFields,
  } = config;

  const defaultLeftFields: UnitField[] = [
    { label: "المساحة", value: `${parseInt(unit.space.toString())} متر` },
    { label: "مدة التسليم", value: unit.duration },
    { label: "المقدم", value: `${unit.advance} ج.م` },
  ];

  const defaultRightFields: UnitField[] = [
    {
      label: "سعر المتر",
      value: `${parseInt(unit.meter_price.toString())} ج.م`,
    },
    {
      label: "القسط",
      value: `${parseInt((unit.installment || 0).toString())} ج.م`,
      show: !!unit.installment,
    },
    {
      label: "الدور",
      value:
        typeof unit.level_id === "object" && unit.level_id
          ? unit.level_id.name
          : "",
      show: !!unit.level_id && unit.level_id !== "null",
    },
  ];

  const leftFieldsData = leftFields ? leftFields(unit) : defaultLeftFields;
  const rightFieldsData = rightFields ? rightFields(unit) : defaultRightFields;

  return (
    <div
      id={data?.length?.toString()}
      data-aos="fade-up"
      data-duration="500"
      key={unit.id}
      className="relative p-3 pt-0 sm:p-4
      rounded-xl mt-0 bg-[#EDEDED] shadow-md hover:shadow-xl transition-shadow duration-300"
    >
      {unit?.offer ? (
        <button className="bg-[#C6392E] rounded-xl top-[21px] -left-2 text-sm cursor-default absolute p-2 z-10 swing text-white flex flex-col gap-0 font-semibold shadow-lg">
          <Image
            src="/assets/icons/star.png"
            alt="star"
            width={14}
            height={14}
            className="mx-auto"
          />
          عرض لفترة محدودة
        </button>
      ) : null}

      {showRevenueBanner && unit.revenue && (
        <h3 className="absolute top-0 left-1/2 -translate-x-1/2 text-xl xl:text-2xl flex justify-center w-full h-[100px] items-center z-10">
          <span className="bg-[linear-gradient(95.65deg,#6BAF6B_-.45%,#485C4C_95.86%)] text-white w-full m-4 sm:w-[285px] xl:w-[315px] h-[60px] flex items-center justify-center rounded-xl shadow-lg font-bold">
            العائد الايجارى : {unit.revenue} ج.م
          </span>
        </h3>
      )}

      <div className={`relative ${showRevenueBanner ? "mt-20" : "my-0"}`}>
        {showUnitNumber && (
          <h3 className="unit-number text-center lg:text-2xl my-3 text-base text-primary font-extrabold">
            وحدة رقم: {unit.number}{" "}
            {typeof unit.block_id === "object" && unit.block_id
              ? unit.block_id.name
              : ""}
          </h3>
        )}

        <DisplayUnitImgs
          images={typeof unit.images === "object" ? unit.images : undefined}
          img={unit.img}
          levelimg={unit.levelimg}
          buttonLabels={imageButtonLabels}
        />
      </div>

      <div className="flex flex-nowrap gap-1 mt-5 justify-between bg-white/50 backdrop-blur-sm rounded-lg p-2">
        <div className="flex flex-col gap-4">
          {leftFieldsData
            .filter((field) => field.show !== false)
            .map((field, index) => (
              <UnitInfoItem
                key={index}
                label={field.label}
                value={field.value}
              />
            ))}
        </div>

        <div className="flex flex-col gap-4 w-fit mr-auto">
          {rightFieldsData
            .filter((field) => field.show !== false)
            .map((field, index) => (
              <UnitInfoItem
                key={index}
                label={field.label}
                value={field.value}
              />
            ))}
        </div>
      </div>

      {unit.contract ? (
        <div className="bg-linear-to-r from-red-500 to-red-600 text-center p-2 flex items-center justify-center gap-2 text-lg text-white rounded-lg w-full py-3 mt-4 mx-auto shadow-md font-semibold">
          <span>تم التعاقد</span>
          <TiLockClosed className="text-2xl" />
        </div>
      ) : (
        <ReserveUnitForm projectId={projectId} unitId={unit.id} />
      )}
    </div>
  );
};

export default UnitCard;
