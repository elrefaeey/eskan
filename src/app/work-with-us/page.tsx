"use client";

import WorkWithUsForm from "@/features/work-with-us/components/WorkWithUsForm";
import { ProjectHero } from "@/components/shared";

function WorkWithUs() {
  return (
    <main dir="rtl" className="page">

      {/* ── Hero ── */}
      <ProjectHero
        visualType="static"
        staticImage="/assets/workwithus/work-with-us-new.webp"
        staticImageAlt="حق السعي"
        badge={{ text: "علاقاتك استثمارك", color: "primary" }}
        title="ما هو حق السعي؟"
        description={
          <>
            حق السعي هو برنامج تسويقي خاص بشركة اسكان المنصورة حيث يتمكن الأفراد
            الذين يتمتعون بمهارات التواصل ودائرة علاقات ومعارف واسعة من التسويق
            لمشروعاتنا مقابل تحقيق الربح وإفادة الطرفين،{" "}
            <span className="font-bold text-primary">لمعرفة كافة التفاصيل والانضمام الينا قم بتسجيل بياناتك</span>
          </>
        }
        className="mb-10 border-b border-gray-100"
        contentClassName="md:p-10"
      />

      <div className="sec-padding container px-4">
        <WorkWithUsForm />
      </div>
    </main>
  );
}

export default WorkWithUs;
