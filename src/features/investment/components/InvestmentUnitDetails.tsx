"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  CalendarDays,
  Minus,
  Plus,
  Ruler,
  TrendingUp,
  Wallet,
  X,
  ZoomIn,
} from "lucide-react";
import { useInvestmentUnitDetails } from "../hooks/useInvestmentUnitDetails";
import { getUnitReturnEgp } from "../utils/returnValue";
import ReserveInvestmentUnit from "./ReserveInvestmentUnit";
import { LoadingPage } from "@/components/ui/LoadingPage";

interface InvestmentUnitDetailsProps {
  unitId: string;
}

const formatNumber = (value: number) =>
  value.toLocaleString("en-US", { maximumFractionDigits: 0 });

const InvestmentUnitDetails = ({ unitId }: InvestmentUnitDetailsProps) => {
  const router = useRouter();
  const { data, isLoading } = useInvestmentUnitDetails(unitId);
  const [shareNum, setShareNum] = useState(1);
  const [imageZoomed, setImageZoomed] = useState(false);

  if (isLoading || !data) {
    return <LoadingPage />;
  }

  const availableShares = Math.max(
    0,
    data.shares_num - data.contracted_shares,
  );
  const unitSharePrice = Number(data.share_price);
  const unitReturn = getUnitReturnEgp(data);
  const unitMeter = Number(data.share_meter_num);

  const totalPrice = unitSharePrice * shareNum;
  const totalReturn = unitReturn * shareNum;
  const totalMeter = unitMeter * shareNum;

  const isRentalReturn =
    data.return_type === "عائد ايجاري" ||
    data.return_type.includes("إيجاري") ||
    data.return_type.includes("ايجاري");
  const returnLabel = isRentalReturn
    ? "العائد الإيجاري سنوياً"
    : "عائد إعادة البيع";

  const unitImage =
    data.path || data.img || "/assets/investment/floor.png";
  const isInstallmentPlan = data.return_type.includes("التقسيط");

  const handleShareChange = (delta: number) => {
    setShareNum((prev) => {
      const next = prev + delta;
      if (next < 1 || next > availableShares) return prev;
      return next;
    });
  };

  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(31,80,59,0.08),_transparent_55%)]"
      />

      <div className="container relative max-w-6xl mx-auto px-4 sm:px-6 pt-4 sm:pt-6 pb-8 sm:pb-12">
        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 mb-5 rounded-full border border-primary/20 bg-white px-3.5 py-1.5 text-primary text-sm font-semibold shadow-sm hover:bg-primary/5 hover:border-primary/30 transition-colors"
        >
          رجوع
          <ArrowRight className="w-4 h-4" />
        </button>

        {/* كتلة واحدة ملتصقة */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] overflow-hidden rounded-[1.75rem] border border-primary/15 bg-white shadow-[0_20px_50px_-28px_rgba(31,80,59,0.35)] items-stretch">
          {/* الصورة تملأ ارتفاع العمود بالكامل */}
          <div className="relative w-full h-full min-h-[260px] self-stretch">
            <Image
              src={unitImage}
              alt={data.number}
              fill
              unoptimized
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 55vw"
              priority
            />

            <div className="absolute top-3 end-3 z-[1]">
              <button
                type="button"
                onClick={() => setImageZoomed(true)}
                className="inline-flex items-center gap-1.5 rounded-full bg-black/45 text-white text-xs font-semibold px-3 py-1.5 backdrop-blur-md hover:bg-black/60 transition-colors"
              >
                <ZoomIn className="w-3.5 h-3.5" />
                تكبير
              </button>
            </div>

            <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 bg-gradient-to-t from-black/55 to-transparent pt-12">
              <p className="text-white/85 text-sm sm:text-base font-medium mb-1">
                مخطط الوحدة
              </p>
              <h1 className="text-white text-2xl sm:text-3xl font-black leading-snug drop-shadow-sm">
                {data.number}
              </h1>
            </div>
          </div>

          {/* لوحة الحجز */}
          <div className="bg-white text-primary p-4 sm:p-5 flex flex-col border-t lg:border-t-0 lg:border-s border-primary/10">
            <p className="text-primary/70 text-base sm:text-lg font-semibold">
              سعر الحصة
            </p>
            <p className="mt-1 text-4xl sm:text-5xl font-black tabular-nums leading-none tracking-tight text-primary">
              {formatNumber(unitSharePrice)}
              <span className="text-lg font-semibold text-primary/55 ms-1.5">
                جنيه
              </span>
            </p>

            <div className="mt-3 rounded-xl bg-[#F3F4F6] border border-gray-200 overflow-hidden divide-y divide-gray-200">
              <div className="px-3.5 py-3.5 flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2.5 text-primary/75 text-base sm:text-lg font-medium">
                  <span className="flex items-center justify-center w-10 h-10 shrink-0 rounded-lg bg-white text-primary shadow-sm">
                    <TrendingUp className="w-5 h-5" />
                  </span>
                  {returnLabel}
                </span>
                <span className="font-extrabold text-lg sm:text-xl tabular-nums text-primary">
                  {formatNumber(unitReturn)}{" "}
                  <span className="text-sm font-semibold text-primary/50">
                    جنيه
                  </span>
                </span>
              </div>
              <div className="px-3.5 py-3.5 flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2.5 text-primary/75 text-base sm:text-lg font-medium">
                  <span className="flex items-center justify-center w-10 h-10 shrink-0 rounded-lg bg-white text-primary shadow-sm">
                    <Ruler className="w-5 h-5" />
                  </span>
                  مساحة الحصة
                </span>
                <span className="font-extrabold text-lg sm:text-xl tabular-nums text-primary">
                  {formatNumber(unitMeter)}{" "}
                  <span className="text-sm font-semibold text-primary/50">م²</span>
                </span>
              </div>
              {isInstallmentPlan && data.share_advance && (
                <div className="px-3.5 py-3.5 flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-2.5 text-primary/75 text-base sm:text-lg font-medium">
                    <span className="flex items-center justify-center w-10 h-10 shrink-0 rounded-lg bg-white text-primary shadow-sm">
                      <Wallet className="w-5 h-5" />
                    </span>
                    المقدم
                  </span>
                  <span className="font-extrabold text-lg sm:text-xl tabular-nums text-primary">
                    {formatNumber(Number(data.share_advance))}{" "}
                    <span className="text-sm font-semibold text-primary/50">
                      جنيه
                    </span>
                  </span>
                </div>
              )}
              {isInstallmentPlan && data.share_installment && (
                <div className="px-3.5 py-3.5 flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-2.5 text-primary/75 text-base sm:text-lg font-medium">
                    <span className="flex items-center justify-center w-10 h-10 shrink-0 rounded-lg bg-white text-primary shadow-sm">
                      <Wallet className="w-5 h-5" />
                    </span>
                    القسط
                  </span>
                  <span className="font-extrabold text-lg sm:text-xl tabular-nums text-primary">
                    {formatNumber(Number(data.share_installment))}{" "}
                    <span className="text-sm font-semibold text-primary/50">
                      جنيه
                    </span>
                  </span>
                </div>
              )}
              {isInstallmentPlan && data.installment_duration != null && (
                <div className="px-3.5 py-3.5 flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-2.5 text-primary/75 text-base sm:text-lg font-medium">
                    <span className="flex items-center justify-center w-10 h-10 shrink-0 rounded-lg bg-white text-primary shadow-sm">
                      <CalendarDays className="w-5 h-5" />
                    </span>
                    فترة السداد
                  </span>
                  <span className="font-extrabold text-lg sm:text-xl tabular-nums text-primary">
                    {data.installment_duration}{" "}
                    <span className="text-sm font-semibold text-primary/50">
                      شهر
                    </span>
                  </span>
                </div>
              )}
            </div>

            {availableShares > 0 ? (
              <div className="mt-auto pt-4 space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-semibold text-primary/80">
                    عدد الحصص
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleShareChange(-1)}
                      disabled={shareNum <= 1}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-primary/25 bg-white text-primary disabled:opacity-35 hover:bg-primary/5 transition-colors"
                      aria-label="تقليل"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="min-w-[1.75rem] text-center text-lg font-black tabular-nums text-primary">
                      {shareNum}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleShareChange(1)}
                      disabled={shareNum >= availableShares}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-primary/25 bg-white text-primary disabled:opacity-35 hover:bg-primary/5 transition-colors"
                      aria-label="زيادة"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="rounded-xl bg-white border border-primary/10 px-3.5 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 text-start">
                      <p className="text-xs font-semibold text-primary/60">
                        الإجمالي
                      </p>
                      <p className="text-xl sm:text-2xl font-black tabular-nums leading-none mt-1 text-primary">
                        {formatNumber(totalPrice)}
                        <span className="text-xs font-semibold text-primary/50 ms-1">
                          جنيه
                        </span>
                      </p>
                    </div>

                    {shareNum > 1 && (
                      <div className="shrink-0 min-w-[6.5rem] text-sm leading-tight space-y-1.5 ps-3 border-s border-primary/15">
                        <div>
                          <p className="text-xs text-primary/55">عائد سنوي</p>
                          <p className="font-bold text-primary tabular-nums">
                            {formatNumber(totalReturn)} ج
                          </p>
                        </div>
                        <div className="h-px bg-primary/15" />
                        <div>
                          <p className="text-xs text-primary/55">المساحة</p>
                          <p className="font-bold text-primary tabular-nums">
                            {formatNumber(totalMeter)} م²
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="[&_button]:!py-3 [&_button]:!text-sm [&_button]:!rounded-xl [&_button]:!font-bold [&_button]:!bg-primary [&_button]:!text-white [&_button]:hover:!bg-primary/90 [&_button]:!shadow-none">
                  <ReserveInvestmentUnit
                    txt="احجز الحصة الاستثمارية"
                    unitData={data}
                    withShareNum={false}
                    externalShareNum={shareNum}
                  />
                </div>
              </div>
            ) : (
              <div className="mt-auto pt-4 rounded-xl border border-primary/15 bg-white/60 py-4 text-center">
                <p className="text-sm font-semibold text-primary/60">
                  لا توجد حصص متاحة للحجز
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {imageZoomed && (
        <div
          className="fixed inset-0 z-[100] bg-black/85 flex items-center justify-center p-3 sm:p-6"
          onClick={() => setImageZoomed(false)}
          role="dialog"
          aria-modal="true"
          aria-label="مخطط الوحدة مكبر"
        >
          <button
            type="button"
            onClick={() => setImageZoomed(false)}
            className="absolute top-3 left-3 sm:top-4 sm:left-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25 transition-colors"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
          <Image
            src={unitImage}
            alt={data.number}
            width={1600}
            height={1000}
            unoptimized
            className="max-h-[80vh] w-auto max-w-full object-contain rounded-lg"
            sizes="100vw"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
};

export default InvestmentUnitDetails;
