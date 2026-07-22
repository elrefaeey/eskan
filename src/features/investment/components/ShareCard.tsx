"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CalendarDays,
  ChevronLeft,
  Hash,
  Minus,
  Plus,
  Ruler,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { InvestmentUnit } from "@/services/investment";
import { getUnitReturnEgp } from "../utils/returnValue";
import ReserveInvestmentUnit from "./ReserveInvestmentUnit";

interface ShareCardProps {
  unit?: InvestmentUnit;
  /** محدّد كمية + تحديث المقدم/القسط داخل نفس شكل الكارد */
  interactiveQuantity?: boolean;
  /** عرض اسم المشروع مع رقم الوحدة */
  showProjectName?: boolean;
}

function formatMoney(value?: string | number | null) {
  if (value == null || value === "") return null;
  const parsed = typeof value === "number" ? value : parseFloat(value);
  if (Number.isNaN(parsed)) return null;
  return parsed.toLocaleString("en-US");
}

function MetaCell({
  icon,
  label,
  value,
  withSideBorder,
  valueNode,
}: {
  icon: ReactNode;
  label: string;
  value?: string;
  withSideBorder?: boolean;
  valueNode?: ReactNode;
}) {
  return (
    <div
      className={`min-w-0 px-3 py-3 flex items-center gap-2.5 ${
        withSideBorder ? "border-e border-gray-200" : ""
      }`}
    >
      <span className="flex items-center justify-center w-9 h-9 shrink-0 rounded-lg bg-white text-primary shadow-sm">
        {icon}
      </span>
      <div className="min-w-0 flex-1 text-start">
        <p className="text-primary/70 text-sm leading-snug mb-0.5">{label}</p>
        {valueNode ?? (
          <p className="font-extrabold text-primary text-base sm:text-lg tabular-nums leading-tight">
            {value}
          </p>
        )}
      </div>
    </div>
  );
}

type MetaStat = {
  icon: ReactNode;
  label: string;
  value?: string;
  valueNode?: ReactNode;
};

function MetaPair({
  left,
  right,
  isLast,
}: {
  left: MetaStat;
  right?: MetaStat;
  isLast?: boolean;
}) {
  if (!right) {
    return (
      <div className={isLast ? "" : "border-b border-gray-200"}>
        <MetaCell
          icon={left.icon}
          label={left.label}
          value={left.value}
          valueNode={left.valueNode}
        />
      </div>
    );
  }

  return (
    <div
      className={`grid grid-cols-2 ${
        isLast ? "" : "border-b border-gray-200"
      }`}
    >
      <MetaCell
        icon={left.icon}
        label={left.label}
        value={left.value}
        valueNode={left.valueNode}
        withSideBorder
      />
      <MetaCell
        icon={right.icon}
        label={right.label}
        value={right.value}
        valueNode={right.valueNode}
      />
    </div>
  );
}

const ShareCard = ({
  unit,
  interactiveQuantity = false,
  showProjectName = false,
}: ShareCardProps) => {
  const [shareNum, setShareNum] = useState(1);

  if (!unit) return null;

  const unitNumber = unit.number || "";
  const sharePrice = formatMoney(unit.share_price) ?? "—";
  const shareMeter = unit.share_meter_num
    ? parseFloat(unit.share_meter_num).toString()
    : "—";
  const totalShares = unit.shares_num || 0;
  const availableShares = Math.max(
    0,
    totalShares - (unit.contracted_shares || 0),
  );
  const unitImage =
    unit.path || unit.img || "/assets/investment/floor.png";
  const returnValue = formatMoney(String(getUnitReturnEgp(unit)));
  const advanceNum = Number(unit.share_advance) || 0;
  const installmentNum = Number(unit.share_installment) || 0;
  const isInstallmentPlan = unit.return_type.includes("التقسيط");
  const isRentalReturn =
    unit.return_type === "عائد ايجاري" ||
    unit.return_type.includes("إيجاري") ||
    unit.return_type.includes("ايجاري");
  const returnLabel = isRentalReturn
    ? "العائد الإيجاري سنوياً"
    : "عائد إعادة البيع";
  const isAvailable = availableShares > 0;

  const title =
    showProjectName && unit.project_name
      ? `${unit.project_name} — ${unitNumber}`
      : unitNumber || "وحدة";

  const qty = interactiveQuantity ? shareNum : 1;
  const displayAdvance = advanceNum * qty;
  const displayInstallment = installmentNum * qty;

  const handleShareChange = (delta: number) => {
    setShareNum((prev) => {
      const next = prev + delta;
      if (next < 1 || next > availableShares) return prev;
      return next;
    });
  };

  const stats: MetaStat[] = [];
  if (isInstallmentPlan && unit.installment_duration != null) {
    stats.push({
      icon: <CalendarDays className="w-4 h-4" />,
      label: "مدة التقسيط",
      value: `${unit.installment_duration} شهر`,
    });
  }
  stats.push({
    icon: <Ruler className="w-4 h-4" />,
    label: "مساحة الحصة",
    value: `${shareMeter} م²`,
  });
  if (isInstallmentPlan && advanceNum > 0) {
    stats.push({
      icon: <Wallet className="w-4 h-4" />,
      label: interactiveQuantity && qty > 1 ? "إجمالي المقدم" : "المقدم",
      value: `${formatMoney(displayAdvance)} ج`,
    });
  }
  if (isInstallmentPlan && installmentNum > 0) {
    stats.push({
      icon: <Wallet className="w-4 h-4" />,
      label: interactiveQuantity && qty > 1 ? "إجمالي القسط" : "القسط",
      value: `${formatMoney(displayInstallment)} ج`,
    });
  }
  if (returnValue) {
    stats.push({
      icon: <TrendingUp className="w-4 h-4" />,
      label: returnLabel,
      value: `${returnValue} ج`,
    });
  }

  if (interactiveQuantity && isAvailable) {
    stats.push({
      icon: <Hash className="w-4 h-4" />,
      label: "عدد الحصص",
      valueNode: (
        <div className="flex items-center gap-1.5 mt-0.5">
          <button
            type="button"
            onClick={() => handleShareChange(-1)}
            disabled={shareNum <= 1}
            className="flex h-7 w-7 items-center justify-center rounded-md border border-primary/25 bg-white text-primary disabled:opacity-35 hover:bg-primary/5 transition-colors"
            aria-label="تقليل"
          >
            <Minus className="w-3 h-3" />
          </button>
          <span className="min-w-[1.5rem] text-center font-extrabold text-primary text-base sm:text-lg tabular-nums">
            {shareNum}
          </span>
          <button
            type="button"
            onClick={() => handleShareChange(1)}
            disabled={shareNum >= availableShares}
            className="flex h-7 w-7 items-center justify-center rounded-md border border-primary/25 bg-white text-primary disabled:opacity-35 hover:bg-primary/5 transition-colors"
            aria-label="زيادة"
          >
            <Plus className="w-3 h-3" />
          </button>
        </div>
      ),
    });
  } else {
    stats.push({
      icon: <Hash className="w-4 h-4" />,
      label: "عدد الحصص المتاح",
      value: `${availableShares}`,
    });
  }

  const pairs: MetaStat[][] = [];
  for (let i = 0; i < stats.length; i += 2) {
    pairs.push(stats.slice(i, i + 2));
  }

  return (
    <article className="group w-full flex flex-col overflow-hidden rounded-2xl border border-primary/15 bg-white shadow-[0_14px_32px_-22px_rgba(31,80,59,0.4)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_rgba(31,80,59,0.45)]">
      <div className="px-3.5 pt-3.5 pb-3 border-b border-primary/15">
        <h3 className="font-extrabold text-primary text-lg sm:text-xl leading-snug line-clamp-2 text-center">
          {title}
        </h3>
      </div>

      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={unitImage}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      <div className="flex flex-col gap-4 px-3.5 pb-3.5 pt-3.5 flex-1">
        <div className="flex items-end justify-between gap-3 pb-3 border-b border-primary/20">
          <p className="text-primary/70 text-base sm:text-lg font-semibold shrink-0 pb-0.5">
            سعر الحصة
          </p>
          <p className="text-primary text-2xl sm:text-3xl font-black tabular-nums leading-none">
            {sharePrice}
            <span className="text-sm font-semibold text-primary/55 ms-1">
              جنيه
            </span>
          </p>
        </div>

        <div className="rounded-xl bg-[#F3F4F6] border border-gray-200 overflow-hidden">
          {pairs.map((pair, idx) => (
            <MetaPair
              key={idx}
              left={pair[0]}
              right={pair[1]}
              isLast={idx === pairs.length - 1}
            />
          ))}
        </div>

        <div className="mt-auto">
          {isAvailable ? (
            <div className="flex flex-col gap-1.5">
              <div className="[&_button]:!rounded-xl [&_button]:!py-2.5 [&_button]:!text-sm [&_button]:!font-bold [&_button]:!bg-primary [&_button]:!text-white [&_button]:hover:!bg-primary/90">
                <ReserveInvestmentUnit
                  txt="احجز الآن"
                  withShareNum={!interactiveQuantity}
                  externalShareNum={
                    interactiveQuantity ? shareNum : undefined
                  }
                  unitData={unit}
                />
              </div>
              <Link
                href={`/investment-unit/${unit.id}`}
                className="flex items-center justify-center gap-1 font-semibold text-primary text-sm py-2 rounded-xl border border-primary/25 bg-[#F3F4F6] hover:bg-gray-100 transition-colors"
              >
                معرفة التفاصيل
                <ChevronLeft className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : (
            <Link
              href={`/investment-unit/${unit.id}`}
              className="block text-center text-sm font-semibold text-primary py-2 rounded-xl border border-primary/25 bg-[#F3F4F6] hover:bg-gray-100 transition-colors"
            >
              شوف تفاصيل الوحدة
            </Link>
          )}
        </div>
      </div>
    </article>
  );
};

export default ShareCard;
