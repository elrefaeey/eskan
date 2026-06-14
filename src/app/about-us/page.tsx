"use client";

import Image from "next/image";
import { ProjectHero, StatsGrid } from "@/components/shared";
import type { StatItem } from "@/components/shared";
import Heading from "@/components/ui/ReusableComponents/Heading";
import AnimatedSection from "@/components/common/animations/AnimatedSection";

const stats: StatItem[] = [
  { value: "200M+", label: "استثمارات عملائنا" },
  { value: "2,000+", label: "وحدة مباعة" },
  { value: "4+", label: "مشاريع قيد التنفيذ" },
];

function AboutUsPage() {
  return (
    <main dir="rtl" className="page">
      <ProjectHero
        visualType="static"
        staticImage="/assets/about-us/about-us.png"
        staticImageAlt="من نحن - إسكان المنصورة"
        badge={{ text: "إسكان المنصورة", color: "primary" }}
        title="من نحن"
        description="شركة مساهمة مصرية تعمل تحت مظلة هيئة الاستثمار في مجال التطوير العقاري وإدارة المشروعات والاستشارات العقارية الفنية والإدارية، وتتميز الشركة بخبرتها الواسعة التي تتجاوز 17 عامًا في هذا المجال مما جعلها تنفرد بسمعة وخبرة ممتازة في مجالها."
        className="mb-10 border-b border-gray-100"
        contentClassName="md:p-10"
      />

      <div className="container mx-auto px-4 sec-padding">
        <StatsGrid
          stats={stats}
          colorScheme="primary"
          className="grid-cols-1 sm:grid-cols-3 md:grid-cols-3 mb-10"
        />

        <AnimatedSection duration={0.6}>
          <div
            className="bg-gradient-to-br from-[#F5F5F5] to-[#E9E9E9] shadow-[0_8px_24px_rgba(0,0,0,0.1)] rounded-2xl
              p-4 lg:p-8 flex flex-col lg:flex-row items-center gap-6 lg:gap-12"
          >
            <div className="flex-1 w-full">
              <Heading
                title="فريق عملنا المتميز"
                desc={
                  <>
                    فريق عمل إسكان المنصورة يضم نخبة من الأقسام المحترفة التي تعمل
                    في تناغم لإنتاج منتج عقاري محترف ومتميز.
                    <br />
                    كما تعمل الشركة على مواكبة التطورات في مجال التكنولوجيا
                    وتقديم حلول برمجية ترفع من كفاءة العمل وتساعد العميل في
                    الحصول على تجربة متميزة.
                  </>
                }
              />
            </div>

            <AnimatedSection
              delay={0.15}
              duration={0.6}
              className="relative w-full lg:w-[400px] xl:w-[600px] h-[280px] lg:h-[300px] xl:h-[400px] rounded-2xl overflow-hidden shadow-lg shrink-0"
            >
              <Image
                src="/assets/about-us/images.png"
                alt="فريق عمل إسكان المنصورة"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 600px"
              />
            </AnimatedSection>
          </div>
        </AnimatedSection>
      </div>
    </main>
  );
}

export default AboutUsPage;
