"use client";

import React, { useState } from "react";
import Image from "next/image";
import { TiLockClosed } from "react-icons/ti";
import { motion, AnimatePresence } from "framer-motion";
import ReserveUnitForm from "../ReserveUnit";

interface Unit {
  id: number;
  duration: string;
  number: string;
  contract: boolean | null;
  space: number;
  meter_price: number;
  advance: number;
  appear: number;
  img: string;
  installment: number;
  levelimg: string;
  location: string;
  project: string;
  receiving: number;
  revenue: number;
  type: string;
}

interface GalleryGroundUnitCardProps {
  unit: Unit;
  data?: Unit[];
}

const DisplayUnitImgs = ({ unitImgs }: { unitImgs: string[] }) => {
  const [imgIndex, setImgIndex] = useState({
    imgNm: 0,
    btnTxt: "عرض موقع الوحدة",
  });

  const handleImg = () => {
    if (imgIndex.imgNm === 1) {
      setImgIndex({ imgNm: 0, btnTxt: "عرض موقع الوحدة" });
    } else {
      setImgIndex({ imgNm: 1, btnTxt: "عرض صورة الوحدة" });
    }
  };

  return (
    <>
      <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-lg bg-gray-100">
        <AnimatePresence mode="wait">
          <motion.div
            key={imgIndex.imgNm}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={unitImgs[imgIndex.imgNm]}
              alt="unit image صورة الوحدة"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={imgIndex.imgNm === 0}
            />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="change-image-btn mt-2">
        <button
          onClick={handleImg}
          className="p-2 text-white text-xl w-full px-4 bg-[#7D7D7D] hover:bg-[#6A6A6A] transition-colors rounded-lg"
        >
          {imgIndex.btnTxt}
        </button>
      </div>
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
  <p className="text-lg max-[375px]:text-base sm:text-2xl md:text-lg lg:text-base xl:text-lg 2xl:text-xl">
    <span className="font-semibold">{label}</span> : {value}
  </p>
);

const GalleryGroundUnitCard = ({ data, unit }: GalleryGroundUnitCardProps) => {
  if (!unit || unit.appear === 0) {
    return null;
  }

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
          src="/assets/icons/star.png"
          alt="star"
          width={14}
          height={14}
          className="mx-auto"
        />
        عرض لفترة محدودة
      </button>

      <div className="relative mt-6">
        <h3 className="unit-number lg:text-xl my-2 text-base text-primary font-extrabold">
          وحدة رقم: {unit.number}
        </h3>

        {unit.img && <DisplayUnitImgs unitImgs={[unit.img, unit.levelimg]} />}
      </div>

      <div className="flex flex-nowrap gap-1 mt-5 justify-between bg-white/50 backdrop-blur-sm rounded-lg p-3">
        <div className="flex flex-col gap-4">
          <UnitInfoItem
            label="المساحة"
            value={`${parseInt(unit.space.toString())} متر`}
          />
          <UnitInfoItem label="مدة التسليم" value={unit.duration} />
          <UnitInfoItem label="المقدم" value={`${unit.advance} ج.م`} />
        </div>

        <div className="flex flex-col gap-4 w-fit mr-auto">
          <UnitInfoItem label="القسط" value={`${unit.installment} ج.م`} />
          <UnitInfoItem
            label="سعر المتر"
            value={`${parseInt(unit.meter_price.toString())} ج.م`}
          />
          <UnitInfoItem label="الموقع" value={unit.location} />
        </div>
      </div>

      {unit.contract ? (
        <div className="bg-linear-to-r from-red-500 to-red-600 text-center p-2 flex items-center justify-center gap-2 text-lg text-white rounded-lg w-full py-3 mt-4 mx-auto shadow-md font-semibold">
          <span>تم التعاقد</span>
          <TiLockClosed className="text-2xl" />
        </div>
      ) : (
        <ReserveUnitForm projectId={7} unitId={unit.id} />
      )}
    </div>
  );
};

export default GalleryGroundUnitCard;
