"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Lock,
  Minus,
  Plus,
  Ruler,
  TrendingUp,
  Wallet,
  X,
  ZoomIn,
} from "lucide-react";
import { useInvestmentUnitDetails } from "../hooks/useInvestmentUnitDetails";
import ReserveInvestmentUnit from "./ReserveInvestmentUnit";
import { InvestmentStatCell } from "./InvestmentStatCell";
import { LoadingPage } from "@/components/ui/LoadingPage";

interface InvestmentUnitDetailsProps {
  unitId: string;
}

const formatNumber = (value: number) =>
  value.toLocaleString("en-US", { maximumFractionDigits: 0 });

const InvestmentUnitDetails = ({ unitId }: InvestmentUnitDetailsProps) => {
  const { data, isLoading } = useInvestmentUnitDetails(unitId);
  const [shareNum, setShareNum] = useState(1);
  const [imageZoomed, setImageZoomed] = useState(false);

  if (isLoading || !data) {
    return <LoadingPage />;
  }

  const availableShares = data.shares_num - data.contracted_shares;
  const contractedShares = data.contracted_shares;
  const unitSharePrice = Number(data.share_price);
  const unitReturn = Number(data.return_value);
  const unitMeter = Number(data.share_meter_num);

  const totalPrice = unitSharePrice * shareNum;
  const totalReturn = unitReturn * shareNum;
  const totalMeter = unitMeter * shareNum;

  const returnLabel =
    data.return_type === "عائد ايجاري" ? "العائد الإيجاري" : "عائد إعادة البيع";

  const unitImage = data.img || "/assets/investment/floor.png";

  const handleShareChange = (delta: number) => {
    setShareNum((prev) => {
      const next = prev + delta;
      if (next < 1 || next > availableShares) return prev;
      return next;
    });
  };

  return (
    <main className="page bg-[#FAFBFC] !min-h-0 pb-2">
      <div className="container max-w-5xl mx-auto px-3 py-2 lg:py-3">
        <Link
          href="/investment"
          className="inline-flex items-center gap-1.5 mb-2 text-primary text-xs font-semibold hover:underline"
        >
          <ArrowRight className="w-3.5 h-3.5" />
          رجوع للاستثمار
        </Link>

        <div className="rounded-xl border border-primary/15 bg-white shadow-sm overflow-hidden">
          {/* Header — سطر واحد */}
          <div className="flex items-center justify-between gap-2 px-3 py-2 border-b border-primary/10 bg-[#FAFBFC]">
            <h1 className="text-sm sm:text-base font-bold text-[#1F503B] truncate">
              {data.number}
            </h1>
            <span
              className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                availableShares > 0
                  ? "bg-[#E8F5EC] text-[#2D6A4F]"
                  : "bg-red-50 text-red-700"
              }`}
            >
              {availableShares > 0 ? `${availableShares} حصة` : "مكتمل"}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 lg:items-stretch">
            {/* تفاصيل — يمين */}
            <div className="order-2 lg:order-1 p-3 sm:p-4 flex flex-col gap-3 lg:justify-center lg:min-h-[280px]">
              {/* حصص */}
              <div>
                <p className="text-xs font-semibold text-[#1F503B] mb-1.5">
                  الحصص المتاحة
                </p>
                <div className="flex flex-wrap items-center gap-1.5">
                  {Array.from({ length: contractedShares }).map((_, i) => (
                    <div
                      key={`c-${i}`}
                      className="flex h-6 w-7 items-center justify-center rounded-md bg-red-600 shadow-sm"
                      title="محجوز"
                    >
                      <Lock className="w-3 h-3 text-white" />
                    </div>
                  ))}
                  {Array.from({ length: availableShares }).map((_, i) => (
                    <div
                      key={`a-${i}`}
                      className="flex h-6 w-7 items-center justify-center rounded-md border-2 border-primary/35 bg-white text-primary text-xs font-bold"
                    >
                      {i + 1}
                    </div>
                  ))}
                </div>
              </div>

              {/* جدول الأسعار */}
              <div className="rounded-xl overflow-hidden border border-primary/10 shadow-sm">
                <div className="grid grid-cols-2 gap-px bg-primary/10">
                  <InvestmentStatCell
                    tone="green"
                    icon={<Wallet className="w-4 h-4" />}
                    label="سعر الحصة"
                    value={`${formatNumber(unitSharePrice)} جنيه`}
                  />
                  <InvestmentStatCell
                    tone="green"
                    icon={<TrendingUp className="w-4 h-4" />}
                    label={returnLabel}
                    value={`${formatNumber(unitReturn)} جنيه`}
                  />
                </div>
                <InvestmentStatCell
                  tone="white"
                  icon={<Ruler className="w-4 h-4" />}
                  label="مساحة الحصة"
                  value={`${formatNumber(unitMeter)} م²`}
                />
              </div>

              {availableShares > 0 ? (
                <div className="rounded-xl border border-primary/15 bg-[#FAFBFC] p-3 space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-semibold text-[#1F503B] shrink-0">
                      عدد الحصص
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleShareChange(-1)}
                        disabled={shareNum <= 1}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-primary/25 bg-white text-primary disabled:opacity-40 hover:bg-white/80"
                        aria-label="تقليل"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="min-w-[1.5rem] text-center text-base font-bold text-[#1F503B]">
                        {shareNum}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleShareChange(1)}
                        disabled={shareNum >= availableShares}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-primary/25 bg-white text-primary disabled:opacity-40 hover:bg-white/80"
                        aria-label="زيادة"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-primary/10 pt-2.5">
                    <span className="text-xs text-[#666]">الإجمالي</span>
                    <div className="text-left">
                      <p className="text-lg sm:text-xl font-extrabold text-[#1F503B] leading-none">
                        {formatNumber(totalPrice)}{" "}
                        <span className="text-xs font-semibold text-[#666]">جنيه</span>
                      </p>
                      {shareNum > 1 && (
                        <p className="text-[10px] text-[#999] mt-0.5">
                          عائد: {formatNumber(totalReturn)} ج · {formatNumber(totalMeter)} م²
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="[&_button]:!py-2.5 [&_button]:!text-sm [&_button]:!rounded-xl [&_button]:!shadow-md">
                    <ReserveInvestmentUnit
                      txt="احجز الحصة الاستثمارية"
                      unitData={data}
                      withShareNum={false}
                      externalShareNum={shareNum}
                    />
                  </div>
                </div>
              ) : (
                <div className="rounded-xl bg-gray-50 border border-gray-200 py-3 text-center">
                  <p className="text-sm font-semibold text-[#666]">
                    لا توجد حصص متاحة للحجز
                  </p>
                </div>
              )}
            </div>

            {/* مخطط — أول سلايد: عرض كامل */}
            <div className="order-1 lg:order-2 flex flex-col border-b lg:border-b-0 lg:border-r border-primary/10 bg-white lg:bg-[#FAFBFC] -mx-px lg:mx-0">
              <div className="flex items-center justify-between px-3 py-2 shrink-0 bg-[#FAFBFC]">
                <span className="text-[11px] font-semibold text-[#1F503B]">
                  مخطط الوحدة
                </span>
                <button
                  type="button"
                  onClick={() => setImageZoomed(true)}
                  className="inline-flex items-center gap-0.5 text-[10px] text-primary hover:underline"
                >
                  <ZoomIn className="w-3 h-3" />
                  تكبير
                </button>
              </div>
              <button
                type="button"
                onClick={() => setImageZoomed(true)}
                className="block w-full bg-white cursor-zoom-in p-1 sm:p-2 lg:p-3 lg:flex lg:flex-1 lg:items-center lg:min-h-[280px]"
              >
                <Image
                  src={unitImage}
                  alt={data.number}
                  width={1600}
                  height={1000}
                  unoptimized
                  className="w-full h-auto object-contain"
                  sizes="100vw"
                  priority
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {imageZoomed && (
        <div
          className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4"
          onClick={() => setImageZoomed(false)}
          role="dialog"
          aria-modal="true"
          aria-label="مخطط الوحدة مكبر"
        >
          <button
            type="button"
            onClick={() => setImageZoomed(false)}
            className="absolute top-4 left-4 hidden sm:flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="إغلاق"
          >
            <X className="w-4 h-4" />
          </button>
          <Image
            src={unitImage}
            alt={data.number}
            width={1600}
            height={1000}
            unoptimized
            className="max-h-[85vh] w-auto max-w-full object-contain"
            sizes="100vw"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </main>
  );
};

export default InvestmentUnitDetails;
