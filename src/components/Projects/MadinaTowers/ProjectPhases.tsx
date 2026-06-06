import React from "react";
import Image from "next/image";

const phasesData = [
  {
    title: "المرحلة الأولى",
    description: "تتكون المرحلة الاولي ... مقدم يبدا من 380 الف جنيه ...",
    highlight: "وتم انتهاء التعاقد في المرحلة الأولى",
    image: "/assets/projects/abrag-elmadina/step1.webp",
    step: "1",
    closed: true,
    textColor: "text-[#D33A2E]",
  },
  {
    title: "المرحلة الثانية",
    description: "تتكون المرحلة الثانية ... مقدم يبدا من 450 الف جنيه ...",
    highlight: "متاح الحجز الآن بالمرحلة الثانية",
    image: "/assets/projects/abrag-elmadina/step2.webp",
    step: "2",
    closed: false,
    textColor: "text-[#5FAC23]",
  },
  {
    title: "قريباً المرحلة الثالثة",
    description: "تتكون المرحلة الثالثة ... مقدم يبدأ من 450 ألف جنيه ...",
    highlight: "قريباً المرحلة الثالثة",
    image: "/assets/projects/abrag-elmadina/step3.webp",
    step: "3",
    closed: true,
    textColor: "text-white",
  },
];

const ProjectPhases = () => {
  return (
    <div className="sec-padding">
      <h2 className="h2 text-primary lg:mb-4 mb-1">مراحل المشروع</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 2xl:gap-16 py-2">
        {phasesData.map((phase, index) => (
          <div
            key={index}
            className="rounded-t-xl flex flex-col relative rounded-b-[26px] bg-[#E6E6E6]"
          >
            <div className="relative w-full h-56">
              <Image
                src={phase.image}
                alt={phase.title}
                fill
                className="object-cover rounded-t-xl"
              />
            </div>
            <div className="p-4 md:p-6 grow flex flex-col gap-2">
              <h2 className={`h2 font-semibold text-primary ${phase.textColor}`}>
                {phase.title}
              </h2>
              <p className="p my-0">{phase.description}</p>
              {!phase.closed && (
                <div className="mt-auto">
                  <span className="bg-[#5FAC23] text-white py-3 px-4 rounded-xl inline-block cursor-pointer">
                    التفاصيل
                  </span>
                </div>
              )}
              {phase.closed && (
                <div className="bg-red-500 text-center rounded-xl py-3 flex items-center justify-center gap-1 text-lg text-white w-full mt-2 mx-auto">
                  تم انتهاء التعاقد
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectPhases;
