import Image from "next/image";
import Link from "next/link";
import { MdOutlineArrowLeft, MdLock } from "react-icons/md";
import { InvestmentUnit } from "@/services/investment";
import ReserveInvestmentUnit from "./ReserveInvestmentUnit";

interface ShareCardProps {
  unit?: InvestmentUnit;
}

const ShareCard = ({ unit }: ShareCardProps) => {
  // Fallback to default values if no unit provided
  const unitNumber = unit?.number || "";
  const sharePrice = unit?.share_price
    ? parseFloat(unit.share_price).toLocaleString("en-US")
    : "";
  const shareMeter = unit?.share_meter_num || "";
  const totalShares = unit?.shares_num || 0;
  const contractedShares = unit?.contracted_shares || 0;
  const availableShares = totalShares - contractedShares;
  const unitImage = unit?.img || "/assets/investment/floor.png";
  const returnValue = unit?.return_value
    ? parseFloat(unit.return_value).toLocaleString("en-US")
    : null;

  return (
    <div className="wallet-unit-card w-full mx-auto overflow-hidden relative z-10 border-[1px] border-primary rounded-2xl p-3 flex flex-col">
      <div className="img-info flex flex-col gap-3 md:gap-4 px-2 sm:px-4">
        <div className="unit-info flex-1">
          <h3 className="flex items-center whitespace-nowrap text-lg sm:text-xl  border-b border-black w-fit mb-2 sm:mb-3">
            {unitNumber} <MdOutlineArrowLeft />
          </h3>
          <h4 className="flex items-center gap-1 text-lg sm:text-xl  text-stone-900 mt-1">
            <div className="w-[9px] h-[9px] rounded-full bg-green-600 shrink-0"></div>
            سعر الحصة: <strong>{sharePrice} جنيه</strong>
          </h4>
          <h4 className="flex items-center gap-1 text-lg sm:text-xl text-stone-900 mt-1">
            <div className="w-[9px] h-[9px] rounded-full bg-green-600 shrink-0"></div>
            مساحة الحصة: <strong>{shareMeter}</strong>
            <span className="relative z-1 text-sm font-bold">
              م<sub className="absolute z-1 -left-1 top-2">2</sub>
            </span>
          </h4>
          {returnValue && (
            <h4 className="flex items-center gap-1 text-lg sm:text-xl  text-stone-900 mt-1">
              <div className="w-[9px] h-[9px] rounded-full bg-green-600 shrink-0"></div>
              عائد اعادة البيع: <strong>{returnValue} جنيه</strong>
            </h4>
          )}
        </div>

        <div className="unit-img relative w-full h-[180px] sm:h-[200px] md:h-[220px] shrink-0 overflow-hidden rounded-lg bg-gray-100">
          <Image
            src={unitImage}
            alt={unitNumber}
            fill
            className="object-contain p-2"
            sizes="100vw"
            priority
          />
        </div>
      </div>

      {/* Share Boxes */}
      <h4 className="text-stone-900 text-lg sm:text-xl font-semibold mt-3 mb-1 px-2 sm:px-4">
        عدد الحصص المتاحة:
      </h4>
      <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-2 px-2 sm:px-4">
        {Array.from({ length: contractedShares }).map((_, ind) => (
          <div
            key={`contracted-${ind}`}
            className="w-[42px] sm:w-[45px] h-4 sm:h-5 bg-red-700 bg-opacity-80 rounded flex justify-center items-center"
          >
            <MdLock className="text-white text-xs" />
          </div>
        ))}
        {Array.from({ length: availableShares }).map((_, ind) => (
          <div
            key={`available-${ind}`}
            className="w-[42px] sm:w-[45px] h-4 sm:h-5 text-stone-900 text-lg sm: font-semibold flex justify-center items-center h-3.5 sm:h-4 bg-zinc-300 rounded"
          >
            {ind + 1}
          </div>
        ))}
      </div>

      {/* Buttons */}
      {availableShares > 0 && unit && (
        <div className="btns flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-3 mt-3 px-2 sm:px-4">
          <ReserveInvestmentUnit
            txt="إحجز الان !"
            withShareNum={true}
            unitData={unit}
          />
          <Link
            href={`/investment-unit/${unit.id}`}
            className="border border-primary w-full sm:w-1/2 shrink-0 text-center font-semibold text-primary text-base sm:text-lg py-2 rounded-md hover:bg-primary hover:text-white transition-colors"
          >
            معرفة التفاصيل
          </Link>
        </div>
      )}
    </div>
  );
};

export default ShareCard;
