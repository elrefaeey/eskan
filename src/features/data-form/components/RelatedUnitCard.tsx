"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { RelatedUnit } from "../types";

// ---------- Sub-components ----------

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-1 text-base sm:text-lg w-fit">
      <span className="text-[#1E1E1E] font-semibold">{label} :</span>
      <span className="text-[#555] text-left">{value}</span>
    </div>
  );
}

function DisplayUnitImages({ unit }: { unit: RelatedUnit }) {
  const [showBlock, setShowBlock] = useState(false);

  // Handle both data shapes:
  // 1. images object with unit_img/block_img (سكني)
  // 2. direct img/levelimg strings (طبي)
  const imagesObj =
    unit.images && typeof unit.images === "object" ? unit.images : null;
  const hasImagesObj = imagesObj?.unit_img;

  const primaryImg = hasImagesObj ? imagesObj.unit_img : unit.img;
  const secondaryImg = hasImagesObj ? imagesObj.block_img : unit.levelimg;

  const validPrimary = primaryImg && primaryImg !== "null";
  const validSecondary = secondaryImg && secondaryImg !== "null";

  if (!validPrimary) {
    return (
      <div className="w-full h-40 sm:h-52 rounded-md bg-[#d5d5d5] flex items-center justify-center text-[#999] text-sm">
        لا توجد صورة
      </div>
    );
  }

  const currentImg = showBlock && validSecondary ? secondaryImg! : primaryImg!;
  const btnText = showBlock ? "عرض صورة الوحدة" : "عرض موقع الوحدة";

  return (
    <>
      <div className="w-full rounded-md overflow-hidden bg-[#d5d5d5]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={currentImg}
          loading="lazy"
          className="w-full h-full object-cover"
          alt="صورة الوحدة"
        />
      </div>
      {validSecondary && (
        <button
          type="button"
          onClick={() => setShowBlock((prev) => !prev)}
          className="p-2 text-white text-sm sm:text-base w-full mt-2 bg-[#7D7D7D] rounded-lg"
        >
          {btnText}
        </button>
      )}
    </>
  );
}

// ---------- Main Card ----------

interface RelatedUnitCardProps {
  unit: RelatedUnit;
  isSelected: boolean;
  onSelect: (unitId: number) => void;
}

function RelatedUnitCard({ unit, isSelected, onSelect }: RelatedUnitCardProps) {
  if (!unit || unit.appear === 0) return null;

  const levelName =
    unit.level_id && typeof unit.level_id === "object" && unit.level_id.name
      ? unit.level_id.name
      : null;

  return (
    <div
      className={cn(
        "relative flex flex-col rounded-xl border-2 transition-all duration-200 bg-[#E7E7E7] overflow-hidden",
        isSelected
          ? "border-[#5FAC23] shadow-lg"
          : "border-[#E0E0E0] hover:shadow-md",
      )}
    >
      {/* Header */}
      <div className="p-3 pb-2 text-right">
        <h3 className="text-base sm:text-xl text-center text-[#1F503B] font-bold">
          مشروع {unit.project?.name}
        </h3>
        {unit.project?.location && (
          <div className="flex items-center gap-1 justify-center mt-1 text-[#414141] text-xs sm:text-sm">
            <svg
              className="w-4 h-4 text-[#1F503B] shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            <span>{unit.project.location}</span>
          </div>
        )}
      </div>

      {/* Image Section */}
      <div className="px-3">
        <DisplayUnitImages unit={unit} />
      </div>

      {/* Unit Info */}
      <div className="p-3 pt-3 flex flex-col gap-2 flex-1">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between w-full">
            {unit.meter_price != null && (
              <InfoRow
                label="سعر المتر"
                value={`${parseInt(String(unit.meter_price))} ج.م`}
              />
            )}
            {unit.space != null && (
              <InfoRow
                label="المساحة"
                value={`${parseInt(String(unit.space))} متر`}
              />
            )}
          </div>

          <div className="flex justify-between">
            {unit.installment != null && (
              <InfoRow
                label="القسط"
                value={`${parseInt(String(unit.installment))} ج.م`}
              />
            )}
            {unit.advance != null && (
              <InfoRow
                label="المقدم"
                value={`${parseInt(String(unit.advance))} ج.م`}
              />
            )}
          </div>

          <div className="flex justify-between">
            {unit.duration && unit.duration !== "null" && (
              <InfoRow label="مدة التسليم" value={unit.duration} />
            )}
            {levelName && <InfoRow label="الدور" value={levelName} />}
          </div>
        </div>
      </div>

      {/* Select / Contract Button */}
      <div className="p-3 pt-0">
        {unit.contract ? (
          <div className="bg-red-500 text-white text-center rounded-lg py-2 text-sm font-semibold">
            تم التعاقد
          </div>
        ) : (
          <button
            type="button"
            onClick={() => onSelect(unit.id)}
            className={cn(
              "w-full py-2.5 rounded-lg text-sm sm:text-base font-semibold transition-all duration-200",
              isSelected
                ? "bg-[#5FAC23] text-white"
                : "bg-[#6A6A6A] text-white border-2 border-[#6A6A6A] hover:text-white",
            )}
          >
            {isSelected ? "تم الاختيار" : "اختيار"}
          </button>
        )}
      </div>
    </div>
  );
}

export default RelatedUnitCard;
