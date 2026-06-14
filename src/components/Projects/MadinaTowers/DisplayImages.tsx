"use client";

import React, { useState } from "react";
import Image from "next/image";
import { AnimatedImageSwitcher } from "@/components/common/animations";

interface DisplayUnitImgsProps {
  unitImgs: string[];
}

const DisplayUnitImgs = ({ unitImgs }: DisplayUnitImgsProps) => {
  const [imgIndex, setImgIndex] = useState<{ imgNm: number; btnTxt: string }>({
    imgNm: 0,
    btnTxt: "عرض صورة الوحدة في الدور",
  });

  const handleImg = () => {
    if (imgIndex.imgNm === 1) {
      setImgIndex({ imgNm: 0, btnTxt: "عرض صورة الوحدة في الدور" });
    } else {
      setImgIndex({ imgNm: 1, btnTxt: "عرض صورة الوحدة" });
    }
  };

  return (
    <>
      <div className="relative w-full h-[400px] overflow-hidden rounded-lg bg-gray-100">
        <AnimatedImageSwitcher imageKey={imgIndex.imgNm} className="absolute inset-0">
          <Image
            src={unitImgs[imgIndex.imgNm]}
            alt="unit image صورة الوحدة"
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={imgIndex.imgNm === 0}
          />
        </AnimatedImageSwitcher>
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

export default DisplayUnitImgs;
