import type { ReactNode } from "react";

export type InvestmentStatTone = "green" | "white";

interface InvestmentStatCellProps {
  label: string;
  value: string;
  icon: ReactNode;
  tone?: InvestmentStatTone;
}

const toneStyles: Record<
  InvestmentStatTone,
  { bg: string; border: string; icon: string; label: string; value: string }
> = {
  green: {
    bg: "bg-[#E8F5EC]",
    border: "border-[#498E56]/20",
    icon: "bg-[#498E56] text-white",
    label: "text-[#2D6A4F]",
    value: "text-[#1F503B]",
  },
  white: {
    bg: "bg-white",
    border: "border-primary/10",
    icon: "bg-[#498E56]/10 text-[#498E56]",
    label: "text-[#666]",
    value: "text-[#1F503B]",
  },
};

export function InvestmentStatCell({
  label,
  value,
  icon,
  tone = "green",
}: InvestmentStatCellProps) {
  const styles = toneStyles[tone];

  return (
    <div
      className={`px-3 py-3 text-center border ${styles.bg} ${styles.border}`}
    >
      <span
        className={`inline-flex items-center justify-center w-8 h-8 rounded-lg mb-1.5 ${styles.icon}`}
      >
        {icon}
      </span>
      <p className={`text-body-sm font-medium leading-tight ${styles.label}`}>
        {label}
      </p>
      <p
        className={`text-body-base font-extrabold mt-1 leading-tight ${styles.value}`}
      >
        {value}
      </p>
    </div>
  );
}
