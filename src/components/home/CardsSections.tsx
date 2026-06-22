"use client";

import React from "react";
import { ArrowLeft, TrendingUp, Users } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/common/animations/AnimatedSection";
import { cn } from "@/lib/utils";

const cards = [
  {
    title: "الإستثمار العقاري",
    description:
      "الأسلوب الأضمن لتحقيق أعلى عائد استثماري هو الاستثمار العقاري من خلال شراء وحدات تجارية وطبية في المشروعات العقارية المرخصة مع تحقيق عوائد مزدوجة من البيع والإيجار، حيث يمكن للمستثمر الاستفادة من زيادة قيمة الوحدة على المدى الطويل والحصول على دخل ثابت من تأجيرها أو عائد من إعادة البيع.",
    link: "/investment",
    icon: TrendingUp,
    variant: "primary" as const,
    highlights: ["عوائد مزدوجة", "بيع وإيجار", "مشاريع مرخصة"],
  },
  {
    title: "علاقاتك استثمارك",
    description:
      "عميلنا العزيز إذا كنت من هؤلاء الذين يتميزون بشبكة علاقات واسعة ودائرة معارف كبيرة ولديك قدرة على التواصل مع الآخرين، فيمكنك تحويل هذه الميزة إلى أرباح مالية رائعة من خلال برنامج حق السعي. لمعرفة التفاصيل تواصل معنا.",
    link: "/work-with-us",
    icon: Users,
    variant: "light" as const,
    highlights: ["شبكة علاقات", "برنامج حق السعي", "أرباح مالية"],
  },
];

const variantStyles = {
  primary: {
    card: "text-white border-white/10 shadow-[0_16px_48px_rgba(15,46,34,0.35)]",
    icon: "bg-white/15 text-white ring-1 ring-white/20",
    highlight: "bg-white/10 text-white/95 border-white/20",
    cta: "text-white border-white/35 bg-white/10 hover:bg-white/20 hover:border-white/55",
    title: "text-white",
    body: "text-white/88",
  },
  light: {
    card: "text-primary border-primary/10 shadow-[0_12px_40px_rgba(31,80,59,0.1)]",
    icon: "bg-primary/10 text-primary ring-1 ring-primary/15",
    highlight: "bg-white/90 text-[#1a4634] border-primary/35 font-bold",
    cta: "text-primary border-primary/25 bg-white/80 hover:bg-white hover:border-primary/40",
    title: "text-primary",
    body: "text-[#1f503b]/90",
  },
};

function GrowthPatternBackground({ tone }: { tone: "dark" | "light" }) {
  const isDark = tone === "dark";

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div
        className={cn(
          "absolute inset-0",
          isDark ? "bg-[#1a4634]" : "bg-linear-to-br from-[#f7fbf9] via-white to-[#edf5f0]",
        )}
      />
      {isDark ? (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_100%_0%,#2a6b4e_0%,transparent_55%),radial-gradient(ellipse_60%_50%_at_0%_100%,#0f2e22_0%,transparent_50%)]" />
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_100%_0%,#e2f0e9_0%,transparent_50%)]" />
      )}

      <svg
        className={cn(
          "absolute bottom-0 left-0 h-[58%] w-full",
          isDark ? "opacity-[0.14]" : "opacity-[0.22] text-primary",
        )}
        viewBox="0 0 480 220"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M0 220V175H72V140H144V108H216V72H288V48H360V20H480V0V220H0Z"
          fill={isDark ? "white" : "currentColor"}
          fillOpacity={isDark ? 1 : 0.12}
        />
        <path
          d="M0 220V190H48V165H96V142H144V118H192V95H240V72H288V52H336V32H384V16H432V4H480"
          stroke={isDark ? "white" : "currentColor"}
          strokeWidth="1.5"
          strokeOpacity={isDark ? 0.35 : 0.35}
        />
      </svg>

      <div
        className={cn("absolute inset-0", isDark ? "opacity-[0.07]" : "opacity-[0.12]")}
        style={{
          backgroundImage: isDark
            ? "radial-gradient(circle, #fff 1px, transparent 1px)"
            : "radial-gradient(circle, #1f503b 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      <div
        className={cn(
          "absolute -top-10 -right-10 size-44 rounded-full border",
          isDark ? "border-white/10" : "border-primary/15",
        )}
      />
      <div
        className={cn(
          "absolute top-6 right-6 size-24 rounded-full border",
          isDark ? "border-white/15" : "border-primary/20",
        )}
      />
      <div
        className={cn(
          "absolute -bottom-14 -left-14 size-56 rounded-full blur-3xl",
          isDark ? "bg-[#3d8f68]/20" : "bg-primary/10",
        )}
      />
    </div>
  );
}

function NetworkPatternBackground({ tone }: { tone: "dark" | "light" }) {
  const isDark = tone === "dark";

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div
        className={cn(
          "absolute inset-0",
          isDark
            ? "bg-[#1a4634]"
            : "bg-linear-to-br from-[#f7fbf9] via-white to-[#edf5f0]",
        )}
      />
      {isDark && (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_0%_0%,#2d6b4f_0%,transparent_50%),radial-gradient(ellipse_50%_45%_at_100%_100%,#0f2e22_0%,transparent_45%)]" />
      )}

      <svg
        className={cn(
          "absolute inset-0 h-full w-full",
          isDark ? "text-white/25" : "text-primary/20",
        )}
        viewBox="0 0 400 280"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <line x1="72" y1="58" x2="168" y2="98" stroke="currentColor" strokeWidth="1" />
        <line x1="168" y1="98" x2="290" y2="72" stroke="currentColor" strokeWidth="1" />
        <line x1="168" y1="98" x2="210" y2="178" stroke="currentColor" strokeWidth="1" />
        <line x1="210" y1="178" x2="118" y2="210" stroke="currentColor" strokeWidth="1" />
        <line x1="210" y1="178" x2="320" y2="198" stroke="currentColor" strokeWidth="1" />
        <line x1="290" y1="72" x2="320" y2="198" stroke="currentColor" strokeWidth="1" />
        <circle cx="72" cy="58" r="7" fill="currentColor" fillOpacity="0.35" />
        <circle cx="168" cy="98" r="9" fill="currentColor" fillOpacity="0.45" />
        <circle cx="290" cy="72" r="6" fill="currentColor" fillOpacity="0.3" />
        <circle cx="210" cy="178" r="8" fill="currentColor" fillOpacity="0.4" />
        <circle cx="118" cy="210" r="5" fill="currentColor" fillOpacity="0.25" />
        <circle cx="320" cy="198" r="6" fill="currentColor" fillOpacity="0.3" />
      </svg>

      <div
        className={cn(
          "absolute top-0 left-0 h-full w-2/5",
          isDark
            ? "bg-linear-to-r from-white/[0.04] to-transparent"
            : "bg-linear-to-r from-primary/[0.04] to-transparent",
        )}
      />
      <div
        className={cn(
          "absolute -bottom-16 -right-10 size-52 rounded-full blur-3xl",
          isDark ? "bg-[#3d8f68]/15" : "bg-primary/[0.06]",
        )}
      />
      <div
        className={cn(
          "absolute top-8 left-8 size-20 rotate-12 rounded-2xl border",
          isDark ? "border-white/12" : "border-primary/10",
        )}
      />
    </div>
  );
}

function CardsSections() {
  return (
    <section className="container sec-padding" dir="rtl">
      <AnimatedSection y={30} duration={0.6} className="text-center mb-8 md:mb-10">
        <span className="inline-block bg-primary/10 text-primary font-bold text-sm px-4 py-1.5 rounded-full mb-3">
          استثمر معنا
        </span>
        <h2 className="text-primary text-3xl md:text-4xl font-extrabold">
          فرص نمو حقيقية
        </h2>
      </AnimatedSection>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
        {cards.map((card, index) => {
          const styles = variantStyles[card.variant];
          const Icon = card.icon;

          return (
            <AnimatedSection
              key={card.link}
              y={40}
              duration={0.7}
              delay={index * 0.12}
              className="h-full"
            >
              <motion.article
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className={cn(
                  "group relative flex h-full flex-col overflow-hidden rounded-2xl border p-6 md:p-7 lg:p-8",
                  styles.card,
                )}
              >
                {card.variant === "primary" ? (
                  <NetworkPatternBackground tone="dark" />
                ) : (
                  <GrowthPatternBackground tone="light" />
                )}

                <div className="relative z-10 flex h-full flex-col gap-4">
                  <div className="flex items-start gap-4">
                    <div
                      className={cn(
                        "flex size-12 shrink-0 items-center justify-center rounded-xl backdrop-blur-sm",
                        styles.icon,
                      )}
                    >
                      <Icon className="size-6" />
                    </div>
                    <h3 className={cn("text-2xl md:text-3xl font-extrabold leading-snug pt-1", styles.title)}>
                      {card.title}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {card.highlights.map((tag) => (
                      <span
                        key={tag}
                        className={cn(
                          "rounded-full border px-3 py-1 text-sm font-semibold backdrop-blur-sm",
                          styles.highlight,
                        )}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p className={cn("text-body-lg md:text-xl leading-relaxed flex-1", styles.body)}>
                    {card.description}
                  </p>

                  <Link
                    href={card.link}
                    className={cn(
                      "inline-flex w-fit items-center gap-2 rounded-full border px-5 py-2.5",
                      "text-base md:text-lg font-bold transition-all duration-300 backdrop-blur-sm",
                      styles.cta,
                    )}
                  >
                    معرفة المزيد
                    <ArrowLeft className="size-5 transition-transform duration-300 group-hover:-translate-x-1" />
                  </Link>
                </div>
              </motion.article>
            </AnimatedSection>
          );
        })}
      </div>
    </section>
  );
}

export default CardsSections;
