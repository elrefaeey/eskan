import React from "react";
import Image from "next/image";
import { MdArrowDropDownCircle } from "react-icons/md";
import { TiLockClosed } from "react-icons/ti";
import ReserveUnitForm from "../ReserveUnit";
// import AbragElbadryForm from "../Forms/AbragElbadryForm";

interface Level {
  id: number;
  name: string;
}

export interface Unit {
  id: number;
  number: string;
  space: number | string;
  meter_price: number;
  revenue: number;
  img: string;
  level_id: Level;
  advance: number;
  duration: string;
  contract: boolean;
}

interface BadryTradUnitCardProps {
  unit: Unit;
  ind: number;
  isRevenu?: boolean;
}

const UnitInfoItem = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => (
  <p className="text-lg max-[375px]:text-base sm:text-2xl md:text-lg lg:text-base xl:text-lg 2xl:text-xl">
    <span className="font-semibold">{label}</span> : {value}
  </p>
);

const BadryTradUnitCard = ({
  unit,
  ind,
  isRevenu = true,
}: BadryTradUnitCardProps) => {
  return (
    <div
      key={unit.id}
      className="relative p-3 sm:p-4 rounded-xl bg-[#EDEDED] shadow-md hover:shadow-xl transition-shadow duration-300"
    >
      {/* Revenue Banner */}
      {isRevenu && (
        <h3 className="absolute top-0 left-1/2 -translate-x-1/2 text-xl xl:text-2xl flex justify-center w-full h-[100px] items-center z-10">
          <span className="bg-[linear-gradient(95.65deg,#6BAF6B_-.45%,#485C4C_95.86%)] text-white w-full m-4 sm:w-[285px] xl:w-[315px] h-[60px] flex items-center justify-center rounded-xl shadow-lg font-bold">
            العائد الايجارى : {unit.revenue} ج.م
          </span>
        </h3>
      )}

      {/* Unit Image */}
      <div
        className={`unit-image relative z-20 ${
          isRevenu ? "mt-20" : "mt-6"
        } overflow-hidden rounded-lg`}
      >
        {ind === 5 && (
          <div className="lg:hidden absolute -top-9 left-0 animate-bounce flex flex-col baseBtn p-1 px-3 rounded-2xl items-center shadow-md">
            <span>
              لرؤية المزيد من الوحدات
              <br />
              إضغط رؤية المزيد
            </span>
            <MdArrowDropDownCircle />
          </div>
        )}
        <Image
          src={unit.img}
          alt="unit image صورة الوحدة"
          width={500}
          height={400}
          className="rounded-lg w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Unit Info */}
      <div className="flex flex-nowrap gap-1 mt-5 justify-between bg-white/50 backdrop-blur-sm rounded-lg p-3">
        <div className="flex flex-col w-fit gap-2 text-[1.02em]">
          <UnitInfoItem label="رقم الوحدة" value={unit.number} />
          <UnitInfoItem label="سعر المتر" value={unit.meter_price} />
          <UnitInfoItem label="المساحة" value={unit.space} />
        </div>

        <div className="flex flex-col gap-2 w-fit mr-auto">
          <UnitInfoItem label="المقدم" value={`ج.م ${unit.advance}`} />
          <UnitInfoItem label="الدور" value={unit.level_id.name} />
          <UnitInfoItem label="مدة التسليم" value={unit.duration} />
        </div>
      </div>

      {/* Contract Status */}
      {unit.contract ? (
        <>
          <ReserveUnitForm projectId={ind} unitId={unit.id} />
        </>
      ) : (
        <div className="bg-linear-to-r from-red-500 to-red-600 text-center p-2 flex items-center justify-center gap-2 text-lg text-white rounded-lg w-full py-3 mt-4 mx-auto shadow-md font-semibold">
          <span>تم التعاقد</span>
          <TiLockClosed className="text-2xl" />
        </div>
      )}
    </div>
  );
};

export default React.memo(BadryTradUnitCard);
