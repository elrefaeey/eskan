"use client";

import { useRouter } from "next/navigation";
import AnimatedSection from "@/components/common/animations/AnimatedSection";
import { Building2, Store } from "lucide-react";
import ElbadryPriceChart from "@/components/Projects/ElbadryTowers/ElbadryPriceChart";
import { useLenis } from "@/hooks/useLenis";
import useProjectDetails from "@/features/elbadry-towers/hooks/useProjectDetails";
import { LoadingPage } from "@/components/ui/LoadingPage";
import { ProjectHero } from "@/components/shared";
import {
  LocationSection,
  ProjectMap,
  SectionContent,
  ExternalMapLink,
  GRAY_MAP_LOCATION_DEFAULTS,
  MAP_LOCATION_DESCRIPTION_CLASS,
} from "@/components/shared";

const cards = [
  {
    icon: Building2,
    title: "أبراج البدري السكني",
    desc: "وحدات سكنية متميزة بمواصفات عالية في موقع استراتيجي بالمنصورة، تناسب كل الاحتياجات.",
    btn: "عرض المشروع",
    href: "/abrag-elbadry/towers",
    border: "border-primary",
    iconBg: "bg-primary",
    btnClass: "bg-primary hover:bg-primary/90",
    tag: "سكني",
    tagClass: "bg-primary/10 text-primary",
    cardBg: "bg-primary/5",
  },
  {
    icon: Store,
    title: "مول البدري التجاري",
    desc: "أكبر مركز تجاري متعدد الأسواق بالمنصورة على مسطحات بنائية تتجاوز 21 ألف متر، المقصد الرئيسي لأكثر من 10 مليون من أبناء الدقهلية.",
    btn: "عرض المشروع",
    href: "/elbadry-trade",
    border: "border-[#4A36A2]",
    iconBg: "bg-[#4A36A2]",
    btnClass: "bg-[#4A36A2] hover:bg-[#3b2a8a]",
    tag: "تجاري",
    tagClass: "bg-[#4A36A2]/20 text-[#4A36A2]",
    cardBg: "bg-[#F2F2F5]",
  },
];

export default function AbragElBadry() {
  const router = useRouter();
  const { projectDetails, isLoading } = useProjectDetails(1);
  useLenis();

  if (isLoading) return <LoadingPage />;
  if (!projectDetails) return null;

  const headerImages = projectDetails.imgs.map((i) => i.img);

  return (
    <div className="w-full page" dir="rtl">

      {/* ── Hero ── */}
      <ProjectHero
        visualType="slider"
        images={headerImages}
        badge={{ text: "مشروع سكني تجاري", color: "primary" }}
        title="أبراج البدري"
        location={projectDetails.location}
        description={projectDetails.description}
        videoId="jWCRs6Oc_0g"
        className="mb-10"
      />

      <div className="container mx-auto px-4">

        {/* ── موقع المشروع ── */}
        <LocationSection {...GRAY_MAP_LOCATION_DEFAULTS}>
          <ProjectMap
            embedUrl="https://www.google.com/maps?q=أبراج+البدري،+المنصورة،+الدقهلية،+مصر&output=embed&t=k"
            title="موقع أبراج البدري"
          />
          <SectionContent
            description="يقع مشروع أبراج البدري في موقع استراتيجي متميز بالمنصورة، آخر شارع الأتوبيس الجديد من اتجاه البحر الصغير، مما يمنحه سهولة وصول استثنائية من مختلف أنحاء المنصورة والدقهلية."
            descriptionClassName={MAP_LOCATION_DESCRIPTION_CLASS}
          >
            <ExternalMapLink href="https://maps.app.goo.gl/vW6CVHK8YDKEyaKV9" />
          </SectionContent>
        </LocationSection>

        {/* ── الشارت ── */}
        <AnimatedSection duration={0.5} className="mb-12">
          <h2 className="text-[#1a1a1a] text-2xl md:text-3xl font-extrabold mb-6 border-r-4 border-primary pr-4">
            مخطط المشروع
          </h2>
          <ElbadryPriceChart />
        </AnimatedSection>

        {/* ── الكروت ── */}
        <section className="mb-12">
          <AnimatedSection
            as="h2"
            y={15}
            duration={0.5}
            className="text-[#1a1a1a] text-2xl md:text-3xl font-extrabold mb-6 border-b-2 border-primary/30 pb-3"
          >
            اختر ما يناسبك
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {cards.map((card, i) => (
              <div key={card.title} onClick={() => router.push(card.href)} className="cursor-pointer">
              <AnimatedSection
                y={25}
                duration={0.5}
                delay={i * 0.1}
                className={`${card.cardBg} border-2 ${card.border} rounded-2xl p-6 flex flex-col gap-5 shadow-md hover:shadow-lg transition-shadow duration-200`}
              >
                <div className="flex items-center justify-between">
                  <div className={`${card.iconBg} w-14 h-14 rounded-xl flex items-center justify-center shadow`}>
                    <card.icon className="text-white w-7 h-7" />
                  </div>
                  <span className={`text-sm font-bold px-3 py-1 rounded-full ${card.tagClass}`}>
                    {card.tag}
                  </span>
                </div>
                <div>
                  <h3 className="font-extrabold text-xl text-[#1a1a1a] mb-2">{card.title}</h3>
                  <p className="text-[#555] text-base leading-relaxed">{card.desc}</p>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); router.push(card.href); }}
                  className={`${card.btnClass} text-white font-bold rounded-xl px-4 py-3 mt-auto transition-colors duration-200 w-full text-base`}
                >
                  {card.btn}
                </button>
              </AnimatedSection>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
