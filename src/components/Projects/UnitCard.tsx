"use client";

import React, { useState } from "react";
import Image from "next/image";
import { TiLockClosed } from "react-icons/ti";
import { AnimatedImageSwitcher } from "@/components/common/animations";
import ReserveUnitForm from "./ReserveUnit";

interface UnitImages {
  unit_img: string;
  floor_img?: string;
  block_img?: string;
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

  const isValidImg = (src?: string) => !!src && src !== "null";

  const unitImg = [images?.unit_img, img].find(isValidImg);
  const floorImg = [images?.block_img, images?.floor_img, levelimg].find(
    isValidImg,
  );
  const imagesList = [unitImg, floorImg].filter(Boolean) as string[];

  const handleImg = () => {
    setImgIndex((prev) => (prev === 0 ? 1 : 0));
  };

  if (!unitImg) return null;

  return (
    <div className="space-y-2.5">
      <div className="relative w-full overflow-hidden rounded-xl bg-[#F3F4F6] border border-primary/10">
        <AnimatedImageSwitcher imageKey={imgIndex} className="relative w-full">
          <Image
            src={imagesList[imgIndex] || unitImg}
            alt="صورة الوحدة"
            width={900}
            height={700}
            className="w-full h-auto object-contain block"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={imgIndex === 0}
          />
        </AnimatedImageSwitcher>
      </div>
      {imagesList.length > 1 && (
        <button
          type="button"
          onClick={handleImg}
          className="w-full rounded-xl bg-[#7D7D7D] px-4 py-2.5 text-sm sm:text-base font-bold text-white shadow-sm transition-colors hover:bg-[#6A6A6A]"
        >
          {imgIndex === 0 ? labels.showFloor : labels.showUnit}
        </button>
      )}
    </div>
  );
};

const UnitInfoItem = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => (
  <div className="min-w-0 rounded-lg bg-[#F8FAF9] border border-primary/8 px-2.5 py-2 text-start">
    <p className="text-[11px] sm:text-xs text-[#555] font-semibold leading-tight mb-0.5">
      {label}
    </p>
    <p className="text-sm sm:text-base font-extrabold text-[#414141] tabular-nums leading-snug break-words">
      {value}
    </p>
  </div>
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

  const visibleFields = [
    ...leftFieldsData.filter((field) => field.show !== false),
    ...rightFieldsData.filter((field) => field.show !== false),
  ];

  const blockName =
    typeof unit.block_id === "object" && unit.block_id
      ? unit.block_id.name
      : "";

  return (
    <article
      id={data?.length?.toString()}
      data-aos="fade-up"
      data-duration="500"
      key={unit.id}
      className="group relative flex flex-col overflow-visible rounded-2xl border border-primary/12 bg-white shadow-[0_12px_28px_-18px_rgba(31,80,59,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-16px_rgba(31,80,59,0.4)]"
    >
      {showRevenueBanner && unit.revenue ? (
        <div className="bg-gradient-to-l from-[#498E56] to-[#1F503B] px-3 py-2.5 text-center rounded-t-2xl">
          <p className="text-white text-sm sm:text-base font-bold">
            العائد الإيجاري:{" "}
            <span className="tabular-nums">{unit.revenue}</span> ج.م
          </p>
        </div>
      ) : null}

      <div className="flex flex-col gap-3 p-3 sm:p-4 flex-1 overflow-visible">
        {showUnitNumber && (
          <header className="border-b border-primary/10 pb-2.5">
            <h3 className="text-center text-base sm:text-lg lg:text-xl font-extrabold text-primary leading-snug px-1">
              وحدة رقم: {unit.number}
              {blockName ? ` ${blockName}` : ""}
            </h3>
          </header>
        )}

        <div className="relative overflow-visible">
          {unit?.offer ? (
            <div
              className="swing pointer-events-none absolute -top-2 -left-3 z-20 flex w-[7.25rem] origin-top flex-col items-center rounded-sm bg-[#C6392E] px-2 py-2.5 text-center text-[11px] font-bold leading-snug text-white shadow-[3px_5px_12px_rgba(0,0,0,0.28)]"
              aria-label="عرض لفترة محدودة"
            >
              <span className="mb-1 h-1.5 w-1.5 rounded-full bg-white/80 shadow-sm" />
              عرض لفترة محدودة
            </div>
          ) : null}

          <DisplayUnitImgs
            images={typeof unit.images === "object" ? unit.images : undefined}
            img={unit.img}
            levelimg={unit.levelimg}
            buttonLabels={imageButtonLabels}
          />
        </div>

        <div className="grid grid-cols-2 gap-2 mt-auto">
          {visibleFields.map((field, index) => (
            <UnitInfoItem
              key={`${field.label}-${index}`}
              label={field.label}
              value={field.value}
            />
          ))}
        </div>

        <div className="pt-1 [&_button]:!rounded-xl [&_button]:!font-bold">
          {unit.contract ? (
            <div className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-red-500 to-red-600 py-3 text-base font-semibold text-white shadow-sm">
              <span>تم التعاقد</span>
              <TiLockClosed className="text-xl" />
            </div>
          ) : (
            <ReserveUnitForm projectId={projectId} unitId={unit.id} />
          )}
        </div>
      </div>
    </article>
  );
};

export default UnitCard;
