"use client";

import { useRef, useState } from "react";
import { MdOutlineArrowLeft, MdLock, MdClose } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";

import done1 from "../assets/reserved1.svg";
import done2 from "../assets/reserved2.svg";
import ReserveWallet from "./ReserveWallet";
import { Unit } from "../types";

interface WalletUnitCardProps {
  unit: Unit;
}

const WalletUnitCard = ({ unit }: WalletUnitCardProps) => {
  const [imgUrl, setImgUrl] = useState("");
  const imgRef = useRef<HTMLDivElement>(null);

  const availableShares =
    unit.contracted_shares !== "null"
      ? unit.shares_num - +unit.contracted_shares
      : unit.shares_num;

  const contractedArray =
    unit.contracted_shares !== "null"
      ? new Array(unit.contracted_shares).fill(1)
      : [];
  const shareBoxes = new Array(availableShares).fill(1);

  const animFunc = (imgState: string, imgLink: string) => {
    if (imgState === "show") {
      imgRef.current?.classList.add("wallet-unit-img-anim");
      setImgUrl(imgLink);
    } else {
      imgRef.current?.classList.remove("wallet-unit-img-anim");
      setImgUrl("");
    }
  };

  return (
    <div
      className="wallet-unit-card w-full mx-auto overflow-hidden relative
     z-10 border-[1px] border-primary rounded-2xl p-3 flex flex-col"
    >
      {/* Modal for image */}
      {imgUrl && (
        <div
          ref={imgRef}
          className="absolute overflow-hidden bg-white z-50 inset-0 w-full h-full flex items-center justify-center rounded-2xl"
          onClick={() => animFunc("", "")}
        >
          <button
            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-full cursor-pointer transition-all duration-200 hover:scale-110 z-10 shadow-lg"
            onClick={() => animFunc("", "")}
            aria-label="إغلاق"
          >
            <MdClose className="text-xl sm:text-2xl" />
          </button>
          <Image
            src={imgUrl}
            alt="صورة الوحدة"
            fill
            className="object-contain p-4"
            priority
          />
        </div>
      )}

      {availableShares === 0 && (
        <div className="absolute z-10 inset-0 w-full h-full flex justify-center items-center bg-white/50 backdrop-blur-sm rounded-xl">
          <div className="flex justify-center items-center relative">
            <Image src={done2} alt="done1" className="z-10 " />
            <Image src={done1} alt="done2" className="z-10 center-div" />
          </div>
        </div>
      )}

      <div className="img-info flex flex-col gap-3 md:gap-4 px-2 sm:px-4">
        <div className="unit-info flex-1">
          <h3 className="flex items-center whitespace-nowrap text-lg sm:text-xl lg:text-2xl border-b border-black w-fit mb-2 sm:mb-3">
            {unit.num} <MdOutlineArrowLeft />
          </h3>
          <h4 className="flex items-center gap-1 text-base sm:text-lg md:text-xl text-stone-900 mt-1">
            <div className="w-[9px] h-[9px] rounded-full bg-green-600 shrink-0"></div>
            سعر الحصة: <strong>{unit.share_price} جنية</strong>
          </h4>
          <h4 className="flex items-center gap-1 text-sm sm:text-base md:text-lg text-stone-900 mt-1">
            <div className="w-[9px] h-[9px] rounded-full bg-green-600 shrink-0"></div>
            عدد الامتار فى الحصة: <strong>{unit?.share_meter_num}</strong>
            <span className="relative z-1 text-sm font-bold">
              م<sub className="absolute z-1 -left-1 top-2">2</sub>
            </span>
          </h4>
        </div>

        <button
          onClick={() => animFunc("show", unit.img)}
          className="unit-img relative w-full h-[180px] sm:h-[200px] md:h-[220px] shrink-0 overflow-hidden rounded-lg bg-gray-100"
        >
          <Image
            src={unit.img}
            alt="صورة الوحدة"
            fill
            className="object-contain p-2"
            sizes="100vw"
            priority
          />
        </button>
      </div>

      {/* Share Boxes */}
      <h4 className="text-stone-900 text-sm sm:text-base md:text-lg font-semibold mt-3 mb-1 px-2 sm:px-4">
        عدد الحصص:
      </h4>
      <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-2 px-2 sm:px-4">
        {contractedArray.map((_, ind) => (
          <div
            key={ind}
            className="w-[38px] sm:w-[41px] h-3.5 sm:h-4 bg-red-700 bg-opacity-80 rounded flex justify-center items-center"
          >
            <MdLock className="text-white text-xs" />
          </div>
        ))}
        {shareBoxes.map((_, ind) => (
          <div
            key={ind}
            className="w-[38px] sm:w-[41px] text-stone-900 text-xs sm:text-sm font-semibold flex justify-center items-center h-3.5 sm:h-4 bg-zinc-300 rounded"
          >
            {ind + 1}
          </div>
        ))}
      </div>

      {/* Buttons */}
      {availableShares !== 0 && (
        <div className="btns flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-3 mt-3 px-2 sm:px-4">
          <ReserveWallet
            txt="إحجز الان !"
            withShareNum={true}
            unitData={unit}
          />
          <Link
            href={`/eskan-wallet/${unit.id}/unit/${unit.id}`}
            className="border border-primary w-full sm:w-1/2 shrink-0 text-center font-semibold text-primary text-base sm:text-lg py-2 rounded-md hover:bg-primary hover:text-white transition-colors"
          >
            معرفة التفاصيل
          </Link>
        </div>
      )}
    </div>
  );
};

export default WalletUnitCard;
