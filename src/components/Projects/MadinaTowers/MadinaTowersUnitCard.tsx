import React from "react";
import Image from "next/image";
import { TiLockClosed } from "react-icons/ti";

import UnitInfoItem from "./UnitInfoItem";
import ReserveUnitForm from "../ReserveUnit";
import DisplayUnitImgs from "./DisplayImages";

// Types
interface Block {
  id: number;
  name: string;
}

interface Level {
  id: number;
  name: string;
}

export interface Unit {
  id: number;
  number: string;
  rooms?: number;
  duration: string;
  space: number;
  meter_price: number;
  type: "سكنى" | "تجارى";
  img?: string;
  levelimg?: string;
  block_id?: Block;
  level_id: Level;
  advance: number;
  receiving?: number;
  installment?: number;
  contract?: boolean | null;
  appear?: number;
}

interface MadinaTowersUnitCardProps {
  unit: Unit;
  data?: Unit[];
  ind?: number;
}

const MadinaTowersUnitCard = ({ unit, data }: MadinaTowersUnitCardProps) => {
  if (!unit || unit.appear === 0) return null;

  return (
    <div
      id={data?.length?.toString()}
      data-aos="fade-up"
      data-duration="500"
      key={unit.id}
      className="relative p-3 sm:p-4 rounded-xl mt-4 bg-[#EDEDED] shadow-md hover:shadow-xl transition-shadow duration-300"
    >
      <button className="bg-[#C6392E] rounded-xl top-[21px] -left-2 text-sm cursor-default absolute p-2 z-10 swing text-white flex flex-col gap-0 font-semibold shadow-lg">
        <Image
          src={"/assets/icons/star.png"}
          alt="star"
          width={14}
          height={14}
          className="mx-auto"
        />
        عرض لفترة محدودة
      </button>

      <div className="relative mt-6">
        <h3 className="unit-number lg:text-xl my-2 text-base text-primary font-extrabold">
          وحدة رقم: {unit.number} {unit.block_id?.name}
        </h3>

        {unit.img && unit.type !== "تجارى" && unit.levelimg && (
          <DisplayUnitImgs unitImgs={[unit.img, unit.levelimg]} />
        )}

        {unit.img && unit.type === "تجارى" && (
          <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-lg">
            <Image
              src={unit.img}
              alt="unit image صورة الوحدة"
              fill
              className="object-contain rounded-lg transition-transform duration-300 hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}
      </div>

      <div className="flex flex-nowrap gap-1 mt-5 justify-between bg-white/50 backdrop-blur-sm rounded-lg p-3">
        <div className="flex flex-col gap-4">
          <UnitInfoItem label="المساحة" value={`${unit.space} متر`} />
          <UnitInfoItem label="مدة التسليم" value={unit.duration} />
          <UnitInfoItem label="المقدم" value={`${unit.advance} ج.م`} />
          {unit.type !== "تجارى" && unit.receiving && (
            <UnitInfoItem label="دفعة الاستلام" value={unit.receiving} />
          )}
        </div>
        <div className="flex flex-col gap-4 w-fit mr-auto">
          <UnitInfoItem label="سعر المتر" value={`${unit.meter_price} ج.م`} />
          {unit.type !== "تجارى" && (
            <>
              <UnitInfoItem
                label="القسط"
                value={`${unit.installment || 0} ج.م`}
              />
              {unit.rooms && (
                <UnitInfoItem label="عدد الغرف" value={unit.rooms} />
              )}
            </>
          )}
          <UnitInfoItem label="الدور" value={unit.level_id.name} />
        </div>
      </div>

      {unit.contract ? (
        <div className="bg-linear-to-r from-red-500 to-red-600 text-center p-2 flex items-center justify-center gap-2 text-lg text-white rounded-lg w-full py-3 mt-4 mx-auto shadow-md font-semibold">
          <span>تم التعاقد</span>
          <TiLockClosed className="text-2xl" />
        </div>
      ) : (
        <ReserveUnitForm projectId={5} unitId={unit.id} />
      )}
    </div>
  );
};

export default MadinaTowersUnitCard;
