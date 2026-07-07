"use client";

import { GraduationCap, CheckCircle2, TrendingUp, Users, BookOpen } from "lucide-react";
import { useLenis } from "@/hooks/useLenis";
import { ProjectHero, StatsGrid } from "@/components/shared";
import { AnimateInView } from "@/components/common/animations";
import { VocationalSharesSection } from "@/features/vocational-center/components/VocationalSharesSection";
import type { StatItem } from "@/components/shared";

const whyItqan = [
  "أعداد خريجين ضخمة سنوياً تحتاج تأهيل مهني حقيقي",
  "سوق تدريب غير مشبع في الدقهلية والدلتا",
  "عائد شهري مستقر للمستثمرين",
  "إمكانية التوسع في البرامج والفروع",
  "مشروع مرخّص وتحت الإنشاء — أمان وثقة في التنفيذ",
];

const investmentFeatures = [
  { icon: TrendingUp, title: "عائد شهري مستقر",  desc: "كل برنامج تدريبي مصدر دخل متكرر يتضاعف مع زيادة المتدربين" },
  { icon: Users,      title: "سوق ضخم",           desc: "أكثر من مليون خريج جامعي خلال آخر 5 سنوات في الدقهلية وكفر الشيخ والغربية" },
  { icon: BookOpen,   title: "احتياج حقيقي",      desc: "الفجوة بين التعليم الأكاديمي ومتطلبات الشركات تخلق طلباً متزايداً على التدريب" },
  { icon: GraduationCap, title: "أثر مجتمعي",    desc: "تحويل الخريجين من باحثين عن وظيفة إلى أشخاص مؤهلين للعمل والإنتاج" },
];

const stats: StatItem[] = [
  { label: "مسطحات بنائية",       value: "6156م" },
  { label: "متدرب سنوياً",         value: "4000"  },
  { label: "أدوار",                value: "4"     },
  { label: "قطاع تدريب غير مشبع", value: "فرصة"  },
];

const forWho = [
  "دخل شهري منتظم",
  "استثمار في قطاع واعد",
  "مشروع قابل للنمو والتوسع",
  "أثر اجتماعي حقيقي",
  "فرصة دخول مبكر في سوق مطلوب بقوة",
];

export default function VocationalCenterPage() {
  useLenis();

  const scrollToShares = () => {
    document
      .getElementById("investment-shares")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="page" dir="rtl">

      {/* ── Hero ── */}
      <ProjectHero
        visualType="gradient"
        gradientClassName="bg-gradient-to-br from-[#1F4B57] to-[#0d3d22]"
        gradientContent={
          <>
            <div className="absolute inset-0 flex items-center justify-center text-white/20 pointer-events-none">
              <GraduationCap className="w-40 h-40" />
            </div>
            <div className="relative flex flex-col items-center justify-center gap-3 p-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-6 text-center border border-white/20">
                <GraduationCap className="w-16 h-16 text-white mx-auto mb-3" />
                <p className="text-white font-extrabold text-xl">معهد إعداد الخريجين</p>
                <p className="text-white/70 text-body-sm mt-1">(GPI)</p>
              </div>
            </div>
          </>
        }
        badge={{ text: "مشروع تدريبي استثماري", className: "bg-[#1F4B57]/10 text-[#1F4B57]" }}
        title="معهد إعداد الخريجين (GPI)"
        description="مشروع تعليمي تدريبي بعائد شهري مستقر ونمو متوقع عاماً بعد عام. أكثر من مليون خريج جامعي خلال آخر خمس سنوات في محافظات الدقهلية وكفر الشيخ والغربية، أغلبهم يحتاج إلى تأهيل عملي حقيقي لدخول سوق العمل بكفاءة."
        ctaButtons={[{
          text: "احجز حصتك الاستثمارية الآن",
          icon: <GraduationCap className="w-5 h-5" />,
          onClick: scrollToShares,
          variant: "primary",
        }]}
        className="mb-10"
      />

      <div className="container mx-auto">

        {/* ── Stats ── */}
        <StatsGrid stats={stats} className="mb-10" />

        {/* ── لماذا معهد إعداد الخريجين ── */}
        <AnimateInView className="mb-10 bg-[#f8f8f8] rounded-2xl p-4 md:p-8 border border-gray-100">
          <h2 className="text-primary text-2xl md:text-3xl font-extrabold mb-2">لماذا معهد إعداد الخريجين؟</h2>
          <p className="text-[#555] text-body-base md:text-lg mb-6">لأن السوق لا يحتاج إلى شهادات فقط... بل يحتاج إلى مهارات حقيقية.</p>
          <ul className="flex flex-col gap-3">
            {whyItqan.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-[#333] text-body-base md:text-lg leading-relaxed">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </AnimateInView>

        {/* ── فرصة استثمارية ── */}
        <AnimateInView className="mb-10">
          <h2 className="text-primary text-2xl md:text-3xl font-extrabold mb-6 border-r-4 border-primary pr-4">
            فرصة استثمارية قوية
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {investmentFeatures.map((f, i) => (
              <AnimateInView
                key={f.title}
                delay={i * 0.1}
                duration={0.4}
                className="bg-white border-2 border-primary/20 rounded-2xl p-4 flex gap-4 shadow-sm hover:border-primary/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <f.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-primary mb-1">{f.title}</h3>
                  <p className="text-[#555] text-body-sm leading-relaxed">{f.desc}</p>
                </div>
              </AnimateInView>
            ))}
          </div>
        </AnimateInView>

        {/* ── لمن هذه الفرصة ── */}
        <AnimateInView className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#f8f8f8] rounded-2xl p-4 md:p-8 border border-gray-100">
          <div className="flex flex-col gap-4">
            <h2 className="text-primary text-2xl md:text-3xl font-extrabold">لمن هذه الفرصة؟</h2>
            <p className="text-[#555] text-body-base md:text-lg">هذه الفرصة مناسبة لكل مستثمر يبحث عن:</p>
            <ul className="flex flex-col gap-3">
              {forWho.map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-[#333] text-body-base md:text-lg">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col justify-between gap-4 bg-primary rounded-2xl p-4 md:p-6 text-white">
            <div>
              <h3 className="text-2xl font-extrabold mb-3">رسالتنا</h3>
              <p className="text-white/90 text-body-base leading-[1.9]">
                أن يصبح معهد إعداد الخريجين (GPI) بوابة الخريجين لاكتساب المهارات العملية،
                والتحول من مجرد باحث عن وظيفة إلى شخص مؤهل للعمل والإنتاج.
              </p>
            </div>
            <div className="border-t border-white/20 pt-4">
              <p className="text-white/80 text-sm font-semibold mb-3">استثمر اليوم في مشروع يصنع المستقبل</p>
              <button
                type="button"
                onClick={scrollToShares}
                className="inline-flex items-center gap-2 bg-white text-primary font-bold rounded-xl px-5 py-3 text-sm hover:bg-white/90 transition-colors"
              >
                <GraduationCap className="w-4 h-4" />
                احجز حصتك الاستثمارية الآن
              </button>
            </div>
          </div>
        </AnimateInView>

        <VocationalSharesSection />

      </div>

    </main>
  );
}
