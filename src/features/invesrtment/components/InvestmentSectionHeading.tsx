import { cn } from "@/lib/utils";

type HeadingLevel = "page" | "section" | "subsection";

interface InvestmentSectionHeadingProps {
  title: string;
  subtitle?: string;
  level?: HeadingLevel;
  className?: string;
  titleClassName?: string;
  centered?: boolean;
}

const titleStyles: Record<HeadingLevel, string> = {
  page: "text-[1.625rem] sm:text-3xl md:text-[2rem] font-extrabold text-[#1F503B] leading-tight",
  section: "text-xl sm:h2 text-[#1F503B] font-extrabold sm:font-bold",
  subsection: "text-base sm:text-body-lg md:text-xl font-extrabold text-[#1F503B]",
};

export function InvestmentSectionHeading({
  title,
  subtitle,
  level = "section",
  className,
  titleClassName,
  centered = false,
}: InvestmentSectionHeadingProps) {
  const Tag = level === "page" ? "h1" : level === "subsection" ? "h3" : "h2";

  return (
    <div className={cn(centered && "text-center", className)}>
      <Tag className={cn(titleStyles[level], titleClassName)}>{title}</Tag>
      {subtitle && (
        <p
          className={cn(
            "text-sm sm:text-body-base md:text-lg text-[#888] mt-1.5 leading-relaxed",
            centered && "mx-auto max-w-md",
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
