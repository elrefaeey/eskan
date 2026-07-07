"use client";
import { useRouter } from "next/navigation";
import AnimatedSection from "@/components/common/animations/AnimatedSection";
import { Building2, Store, GraduationCap } from "lucide-react";
import {
  ProjectHero,
  LocationSection,
  ProjectMap,
  SectionContent,
  ExternalMapLink,
  GRAY_MAP_LOCATION_DEFAULTS,
  MAP_LOCATION_DESCRIPTION_CLASS,
} from "@/components/shared";

const cards = (onViewUnits?: () => void) => [
  {
    icon: Building2,
    title: "أبراج المدينة",
    desc: "مجتمع متكامل (سكني وتجاري وخدمي) يضم 14 عمارة وأكثر من 200 وحدة. مساحات من 58 لـ 159 م² تناسب كل الاحتياجات. مقدم 25% وتقسيط حتى 6 سنوات بدون فوائد.",
    btn: "عرض المشروع",
    href: "/abrag-elmadina/residential",
    border: "border-primary",
    iconBg: "bg-primary",
    btnClass: "bg-primary hover:bg-primary/90",
    tag: "سكني",
    tagClass: "bg-primary/10 text-primary",
    cardBg: "bg-primary/5",
  },
  {
    icon: Store,
    title: "أرض المعارض",
    desc: "مشروع تجاري ضخم على مساحة 15 ألف م²، يُعد الأول من نوعه في المنصورة والدلتا، يجمع كل احتياجات البناء والتشطيب والديكور والأثاث في مكان واحد.",
    btn: "عرض المشروع",
    href: "/gallery-ground",
    border: "border-[#4A36A2]",
    iconBg: "bg-[#4A36A2]",
    btnClass: "bg-[#4A36A2] hover:bg-[#3b2a8a]",
    tag: "تجاري",
    tagClass: "bg-[#4A36A2]/15 text-[#4A36A2]",
    cardBg: "bg-[#4A36A2]/5",
  },
  {
    icon: GraduationCap,
    title: "معهد إعداد الخريجين (GPI)",
    desc: "مشروع تعليمي تدريبي بعائد شهري مستقر ونمو متوقع عاماً بعد عام. أكثر من مليون خريج جامعي خلال آخر خمس سنوات، أغلبهم يحتاج إلى تأهيل عملي حقيقي لدخول سوق العمل بكفاءة.",
    btn: "عرض المشروع",
    href: "/gpi",
    border: "border-[#1F4B57]",
    iconBg: "bg-[#1F4B57]",
    btnClass: "bg-[#1F4B57] hover:bg-[#183d47]",
    tag: "تدريبي استثماري",
    tagClass: "bg-[#1F4B57]/10 text-[#1F4B57]",
    cardBg: "bg-[#1F4B57]/5",
  },
];

export default function AbragElmadinaLanding({
  images,
  onViewUnits,
}: {
  images: string[];
  onViewUnits?: () => void;
}) {
  const router = useRouter();

  return (
    <div className="w-full page" dir="rtl">

      {/* ── Hero ── */}
      <ProjectHero
        visualType="slider"
        images={images}
        badge={{ text: "مشروع سكني تجاري إداري", color: "primary" }}
        title="أبراج المدينة"
        description="مجتمع عمراني متكامل على مساحة 15 ألف متر (سكني - تجاري - عيادات طبية - مجمع تعليمي - إداري) يتكون من عدد 14 عمارة مقسمة على 4 مراحل وعدد يزيد عن 200 وحدة سكنية تتميز بمساحات تناسب الأسرة المصرية تبدأ من 58 متر حتى 159 متر، يحقق المشروع المعادلة الصعبة التي تعطى مساحة وحدة سكنية صغيرة ومتوسطة بمقدم يبدأ من 25% وبالتقسيط على 6 سنوات وبدون فوايد."
        videoId="jWCRs6Oc_0g"
        className="mb-10"
      />

      {/* ── صورة فاصلة ── */}
      <div className="container mx-auto">

      {/* ── موقع المشروع ── */}
      <LocationSection {...GRAY_MAP_LOCATION_DEFAULTS}>
        <ProjectMap
          embedUrl="https://www.google.com/maps?q=أبراج+المدينة،+طريق+المنصورة+دمياط،+المنصورة،+الدقهلية،+مصر&output=embed&t=k"
          title="موقع أبراج المدينة"
        />
        <SectionContent
          description="يتمتع مشروع أبراج المدينة بموقع عبقري واستراتيجي، دقيقة واحدة فقط من شارع قناة السويس، و10 دقائق من جامعة المنصورة، و5 دقائق من شارع الجيش، مع قرب مباشر من جميع الخدمات والمرافق الحيوية. حيث يقع المشروع في الاتجاه المقابل لـ كوبري جديلة، مما يمنحه سهولة وصول استثنائية من مختلف أنحاء المنصورة كذلك الدلتا."
          descriptionClassName={MAP_LOCATION_DESCRIPTION_CLASS}
        >
          <ExternalMapLink href="https://maps.app.goo.gl/vwqecvwAo2n7ZtP77" />
        </SectionContent>
      </LocationSection>

      {/* ── 3 كروت ── */}
      <section className="mb-6">
        <AnimatedSection
          as="h2"
          y={15}
          duration={0.5}
          className="text-[#1a1a1a] text-2xl md:text-3xl font-extrabold mb-6 border-b-2 border-primary/30 pb-3"
        >
          أقسام المشروع
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 items-stretch gap-4 md:gap-6">
          {cards(onViewUnits).map((card, i) => (
            <div
              key={card.title}
              onClick={() => "href" in card && card.href ? router.push(card.href as string) : undefined}
              className="flex h-full cursor-pointer flex-col"
            >
            <AnimatedSection
              y={25}
              duration={0.5}
              delay={i * 0.1}
              className={`${card.cardBg} border-2 ${card.border} rounded-2xl p-6 flex h-full flex-col gap-5 shadow-md hover:shadow-lg transition-shadow duration-200`}
            >
              {/* أيقونة + tag */}
              <div className="flex items-center justify-between gap-1">
                <div className={`${card.iconBg} w-14 h-14 rounded-xl flex items-center justify-center shadow shrink-0`}>
                  <card.icon className="text-white w-7 h-7" />
                </div>
                <span className={`text-sm font-bold px-3 py-1 rounded-full whitespace-nowrap ${card.tagClass}`}>
                  {card.tag}
                </span>
              </div>

              {/* نص */}
              <div className="min-w-0 flex-1">
                <h3 className="font-extrabold text-xl text-[#1a1a1a] mb-2 leading-snug">{card.title}</h3>
                <p className="text-[#555] text-body-base leading-relaxed">{card.desc}</p>
              </div>

              {/* زر */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if ("href" in card && card.href) {
                    router.push(card.href as string);
                  }
                }}
                className={`${card.btnClass} text-white font-bold rounded-xl px-4 py-3 mt-auto transition-colors duration-200 w-full text-base`}
              >
                {card.btn}
              </button>
            </AnimatedSection>
            </div>
          ))}
        </div>
      </section>

      </div> {/* end container */}
    </div>
  );
}
