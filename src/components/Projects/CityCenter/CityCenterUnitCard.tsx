import React from "react";
import { TiLockClosed } from "react-icons/ti";
import ReserveCityCenterUnitForm from "./ReserveCityCenterUnit";

// --------------------------------------------------
// Types
// --------------------------------------------------

interface Unit {
  revenue: string | number;
  number: string | number;
  img: string;
  space: string | number;
  advance: string | number;
  meter_price: string | number;
  installment: string | number;
  contract?: string | null;
}

interface CityCenterCardProps {
  unit: Unit;
  type?: string;
  section?: string;
  appear?: boolean;
}

interface UnitInfoItemProps {
  label: string;
  value: string | number;
}

// --------------------------------------------------
// Small Component for Unit Info
// --------------------------------------------------

const UnitInfoItem: React.FC<UnitInfoItemProps> = ({ label, value }) => (
  <p className="text-body-base sm:text-[1.02em] xl:text-lg">
    <span className="font-semibold">{label}</span> : {value}
  </p>
);

// --------------------------------------------------
// Main Card Component
// --------------------------------------------------

const CityCenterCard = ({
  unit,
  type = "",
  section = "",
  appear,
}: CityCenterCardProps) => {
  return (
    <div className="unit-card bg-[#EDEDED] rounded-lg p-3 relative">
      {/* Labels Above the Image */}
      <h3 className="absolute left-0 bold top-3 flex flex-col items-end gap-2 white lg:text-xl text-lg">
        {appear && type === "" && section !== "ملابس" && (
          <span
            className="bg-[#E1E1E1] text-[#5FAC23] rounded-r-md w-fit p-2 px-3 relative"
            style={{ boxShadow: "0px 4px 4px rgba(0,0,0,0.25)" }}
          >
            <span>العائد الايجاري: {unit.revenue} شهرياً</span>
            <span className="absolute -left-[2px] -top-[1px] rounded-bl-md h-full w-[7px] rotate-2 bg-[#E1E1E1] rounded-tl-lg rounded-tr-sm"></span>
          </span>
        )}

        <span
          className="bg-[#E1E1E1] text-[#5FAC23] rounded-r-md w-fit p-2 px-3 relative"
          style={{ boxShadow: "0px 4px 4px rgba(0,0,0,0.25)" }}
        >
          <span>رقم الوحدة: {unit.number}</span>
          <span className="absolute -left-[2px] -top-[1px] rounded-bl-md h-full w-[7px] rotate-2 bg-[#E1E1E1] rounded-tl-lg rounded-tr-sm"></span>
        </span>
      </h3>

      {/* IMAGE */}
      <div className="bazar-unit-image">
        <img
          src={unit.img}
          className="rounded-lg w-full"
          alt="bazar unit image صورة وحدة البازار"
          loading="lazy"
        />
      </div>

      {/* INFO GRID */}
      <div className="grid grid-cols-2 sm:gap-2 gap-1 mt-4 mb-3">
        <div className="flex flex-col gap-4">
          <UnitInfoItem label="المساحة" value={unit.space} />
          <UnitInfoItem label="المقدم" value={`${unit.advance} ج.م`} />
        </div>

        <div className="flex flex-col gap-4 w-fit mr-auto">
          <UnitInfoItem label="سعر المتر" value={`${unit.meter_price} ج.م`} />
          <UnitInfoItem label="القسط" value={`${unit.installment} ج.م`} />
        </div>
      </div>

      {/* CONTRACT OR FORM */}
      {unit.contract ? (
        <div className="bg-red-500 text-center text-lg text-white p-2 flex items-center justify-center gap-1 rounded-md mx-auto">
          <span>تم التعاقد</span>
          <TiLockClosed className="text-2xl" />
        </div>
      ) : (
        <ReserveCityCenterUnitForm
          unitNum={unit.number.toString()}
          section={section}
        />
      )}
    </div>
  );
};

export default CityCenterCard;
