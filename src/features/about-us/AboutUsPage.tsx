"use client";

import { ProjectHero, StatsGrid } from "@/components/shared";
import type { StatItem } from "@/components/shared";
import TeamDepartmentsSection from "@/components/About/TeamDepartmentsSection";

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

      <div className="container mx-auto sec-padding">
        <StatsGrid
          stats={stats}
          colorScheme="primary"
          className="grid-cols-1 sm:grid-cols-3 md:grid-cols-3 mb-10"
        />

        <TeamDepartmentsSection />
      </div>
    </main>
  );
}

export default AboutUsPage;
