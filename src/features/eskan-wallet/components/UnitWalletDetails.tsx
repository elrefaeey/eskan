"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/common/animations/AnimatedSection";
import { fadeInLeft, fadeInRight } from "@/lib/animations";
import { useUnitDetails } from "../hooks/useUnitDetails";
import ReserveWallet from "./ReserveWallet";
import { LoadingPage } from "@/components/ui/LoadingPage";

interface UnitWalletDetailsProps {
  unitId: string;
}

const UnitWalletDetails = ({ unitId }: UnitWalletDetailsProps) => {
  const { data, isLoading } = useUnitDetails(unitId);

  const [shareNum, setShareNum] = useState(1);
  const [sharePrice, setSharePrice] = useState(0);
  const [returnPrice, setReturnPrice] = useState(0);
  const [meterNum, setMeterNum] = useState(0);

  useEffect(() => {
    if (data) {
      setSharePrice(Number(data.share_price));
      setReturnPrice(Number(data.return));
      setMeterNum(Number(data.share_meter_num));
    }
  }, [data]);

  if (isLoading || !data) {
    return <LoadingPage />;
  }

  const availableShares =
    data.contracted_shares !== "null"
      ? data.shares_num - Number(data.contracted_shares)
      : data.shares_num;

  const contractedNum =
    data.contracted_shares === "null" ? 0 : Number(data.contracted_shares);
  const contractedArray = new Array(contractedNum).fill(1);
  const shareBoxes = new Array(availableShares).fill(1);

  const handleAddSub = (
    val1: number,
    sign: "+" | "-",
    val2: number,
    fixNum: number,
    type: "price" | "meter" | "return"
  ) => {
    let result: number;
    if (sign === "+") {
      result = Number(val1) + Number(val2);
    } else {
      result = Number(val2) - Number(val1);
    }

    switch (type) {
      case "price":
        setSharePrice(result);
        break;
      case "meter":
        setMeterNum(Number(result.toFixed(fixNum)));
        break;
      case "return":
        setReturnPrice(result);
        break;
    }
  };

  const handleShareNum = (typ: "plus" | "minus") => {
    if (typ === "plus" && shareNum < availableShares) {
      setShareNum((p) => p + 1);
      handleAddSub(Number(data.share_price), "+", sharePrice, 3, "price");
      handleAddSub(Number(data.share_meter_num), "+", meterNum, 2, "meter");
      handleAddSub(Number(data.return), "+", returnPrice, 3, "return");
    }

    if (typ === "minus" && shareNum > 1) {
      setShareNum((p) => p - 1);
      handleAddSub(Number(data.share_price), "-", sharePrice, 3, "price");
      handleAddSub(Number(data.share_meter_num), "-", meterNum, 2, "meter");
      handleAddSub(Number(data.return), "-", returnPrice, 3, "return");
    }
  };

  return (
    <AnimatedSection duration={0.5} className="container page py-4 sm:py-6">
      <div className="p-4 rounded-lg bg-gradient-to-b from-[#FBFBFB] to-[#F6F6F6] shadow-md">
        <h3 className="flex justify-center items-center text-lg sm:text-xl lg:text-2xl w-fit mx-auto border-b border-gray-700 mb-6">
          {data.num}
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 place-items-center">
          <motion.div
            className="max-w-full"
            variants={fadeInLeft}
            initial="hidden"
            animate="visible"
          >
            {/* Shares Boxes */}
            <div className="flex flex-wrap justify-center gap-1 mb-3">
              {contractedArray.map((_, ind) => (
                <motion.div
                  key={`contracted-${ind}`}
                  className="w-[18px] h-[15px] bg-gray-400 border border-white sm:w-[25px] sm:h-[20px]"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: ind * 0.05 }}
                />
              ))}

              {shareBoxes.map((_, ind) => (
                <motion.div
                  key={`available-${ind}`}
                  className="w-[18px] h-[15px] border border-gray-400 mt-[1px] sm:w-[25px] sm:h-[18px]"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: ind * 0.03 }}
                />
              ))}
            </div>

            <h4 className="text-sm sm:text-base lg:text-xl text-center mb-4">
              الحصص المتاحة: {availableShares}
            </h4>

            <div className="border-2 border-gray-300 rounded-lg overflow-hidden">
              <div className="grid grid-cols-2 text-center divide-x-2 divide-gray-300">
                <div className="p-4 sm:p-5 border-r border-gray-300">
                  <span className="block text-base sm:text-lg">سعر الحصة</span>
                  <strong className="mt-2 block text-xl sm:text-2xl">
                    {sharePrice} جنية
                  </strong>
                </div>
                <div className="p-4 sm:p-5">
                  <span className="block text-base sm:text-lg">العائد الإيجاري</span>
                  <strong className="mt-2 block text-xl sm:text-2xl">
                    {returnPrice} جنية
                  </strong>
                </div>
              </div>

              <div className="border-t border-gray-300 text-center p-4 sm:p-5">
                عدد الامتار فى الحصة :
                <strong className="px-1">{meterNum}</strong>
                <span className="relative text-sm font-bold">
                  م
                  <sub className="absolute -left-1 top-2">2</sub>
                </span>
              </div>
            </div>

            <div className="mt-5 flex flex-col lg:flex-row items-center justify-center gap-4">
              <h3 className="text-lg sm:text-xl lg:text-3xl font-semibold">
                إختر عدد الحصص :
              </h3>

              <div className="flex items-center gap-3">
                <button
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-tr-md rounded-br-md bg-gray-300 flex items-center justify-center"
                  onClick={() => handleShareNum("plus")}
                >
                  <span className="text-2xl sm:text-3xl mb-1">+</span>
                </button>

                <span className="text-xl sm:text-2xl lg:text-3xl">{shareNum}</span>

                <button
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-tl-md rounded-bl-md bg-gray-200 flex items-center justify-center"
                  onClick={() => handleShareNum("minus")}
                >
                  <span className="text-2xl sm:text-3xl mb-1">-</span>
                </button>
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <ReserveWallet
                txt="إضافة الي محفظتي العقارية"
                unitData={data}
                withShareNum={false}
                externalShareNum={shareNum}
              />
            </div>
          </motion.div>

          <motion.div
            className="w-full max-w-xs sm:max-w-md mx-auto"
            variants={fadeInRight}
            initial="hidden"
            animate="visible"
          >
            <div className="unit-img w-full mx-auto mt-4">
              <Image
                src={data.img}
                alt="صورة الوحدة"
                width={500}
                height={400}
                className="object-contain w-full h-auto rounded-lg"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default UnitWalletDetails;
