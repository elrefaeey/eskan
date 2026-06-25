import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Lock, Ruler, TrendingUp, Wallet } from "lucide-react";
import { InvestmentUnit } from "@/services/investment";
import ReserveInvestmentUnit from "./ReserveInvestmentUnit";

interface ShareCardProps {
  unit?: InvestmentUnit;
}

function StatItem({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-2.5 rounded-xl bg-[#F3FAF6] border border-primary/10 px-3 py-2.5">
      <span className="flex items-center justify-center w-8 h-8 shrink-0 rounded-lg bg-primary/10 text-primary">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[#666] text-body-sm leading-tight">{label}</p>
        <p className="font-extrabold text-[#1F503B] text-body-lg sm:text-xl leading-tight mt-0.5 tabular-nums">
          {value}
        </p>
      </div>
    </div>
  );
}

const ShareCard = ({ unit }: ShareCardProps) => {
  if (!unit) return null;

  const unitNumber = unit.number || "";
  const sharePrice = unit.share_price
    ? parseFloat(unit.share_price).toLocaleString("en-US")
    : "—";
  const shareMeter = unit.share_meter_num || "—";
  const totalShares = unit.shares_num || 0;
  const contractedShares = unit.contracted_shares || 0;
  const availableShares = totalShares - contractedShares;
  const unitImage = unit.img || "/assets/investment/floor.png";
  const returnValue = unit.return_value
    ? parseFloat(unit.return_value).toLocaleString("en-US")
    : null;
  const returnLabel =
    unit.return_type === "عائد ايجاري"
      ? "العائد الإيجاري"
      : "عائد إعادة البيع";
  const isAvailable = availableShares > 0;

  return (
    <article className="group w-full flex flex-col overflow-hidden rounded-2xl border border-primary/20 bg-white shadow-sm transition-all duration-300 hover:border-primary/35 hover:shadow-md">
      <div className="flex items-center justify-between gap-2 px-4 pt-3.5 pb-2.5 border-b border-primary/10">
        <h3 className="font-bold text-[#1F503B] text-body-base sm:text-body-lg">
          {unitNumber}
        </h3>
        <span
          className={`shrink-0 rounded-full px-2.5 py-0.5 text-body-sm font-semibold ${
            isAvailable
              ? "bg-[#E8F5EC] text-[#2D6A4F]"
              : "bg-red-50 text-red-700"
          }`}
        >
          {isAvailable ? `${availableShares} حصة` : "مكتمل"}
        </span>
      </div>

      <div className="flex flex-col gap-3 p-3.5 sm:p-4 flex-1">
        <div className="grid grid-cols-2 gap-2">
          <StatItem
            icon={<Wallet className="w-4 h-4" />}
            label="سعر الحصة"
            value={`${sharePrice} ج`}
          />
          <StatItem
            icon={<Ruler className="w-4 h-4" />}
            label="المساحة"
            value={`${shareMeter} م²`}
          />
          {returnValue && (
            <div className="col-span-2">
              <StatItem
                icon={<TrendingUp className="w-4 h-4" />}
                label={returnLabel}
                value={`${returnValue} ج`}
              />
            </div>
          )}
        </div>

        <div className="relative w-full h-[150px] sm:h-[165px] overflow-hidden rounded-xl bg-[#FAFBFC] border border-gray-100">
          <Image
            src={unitImage}
            alt={unitNumber}
            fill
            className="object-contain p-2"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>

        <div className="flex flex-wrap gap-1">
          {Array.from({ length: contractedShares }).map((_, ind) => (
            <div
              key={`c-${ind}`}
              className="flex h-6 w-7 items-center justify-center rounded bg-red-600/90"
            >
              <Lock className="w-3 h-3 text-white" />
            </div>
          ))}
          {Array.from({ length: availableShares }).map((_, ind) => (
            <div
              key={`a-${ind}`}
              className="flex h-6 w-7 items-center justify-center rounded border border-primary/30 text-primary text-[11px] font-bold"
            >
              {ind + 1}
            </div>
          ))}
        </div>
      </div>

      <div className="px-3.5 sm:px-4 pb-3.5 sm:pb-4 mt-auto">
        {isAvailable ? (
          <div className="flex flex-col gap-2">
            <ReserveInvestmentUnit
              txt="احجز الآن"
              withShareNum={true}
              unitData={unit}
            />
            <Link
              href={`/investment-unit/${unit.id}`}
              className="flex items-center justify-center gap-1 font-semibold text-primary text-sm py-2 rounded-xl border border-primary/30 hover:bg-[#F3FAF6] transition-colors"
            >
              معرفة التفاصيل
              <ChevronLeft className="w-3.5 h-3.5" />
            </Link>
          </div>
        ) : (
          <Link
            href={`/investment-unit/${unit.id}`}
            className="block text-center text-sm font-semibold text-primary py-2 rounded-xl border border-primary/20 hover:bg-[#F3FAF6]"
          >
            شوف تفاصيل الوحدة
          </Link>
        )}
      </div>
    </article>
  );
};

export default ShareCard;
