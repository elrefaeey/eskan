"use client";
import { useRef, useEffect } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useIsSmallScreen } from "@/hooks/useIsSmall";
import HeaderLocation from "@/components/Projects/HeaderLocation";
import ProjectImageVideo from "@/components/Projects/ProjectImageVideo";
import MadinaTowersUnits from "@/components/Projects/MadinaTowers/MadinaTowersUnits";
import SelectInput from "@/components/SelectInput";
import useMadinaProjectDetails from "@/features/abrag-elmadina/hooks/useMadinaProjectDetails";
import { Loader2 } from "lucide-react";

const MadinaTowers = () => {
  const isSmall = useIsSmallScreen();
  const searchParams = useSearchParams();
  const ref = useRef<HTMLDivElement>(null);

  const { projectDetails, isLoading } = useMadinaProjectDetails();


  useEffect(() => {
    const step = searchParams.get("step");
    if (step && ref.current) {
      const timeoutId = setTimeout(() => {
        ref.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 300);

      return () => clearTimeout(timeoutId);
    }
  }, [searchParams]);

  if (isLoading) {
    return (
      <div className="container page flex items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!projectDetails) {
    return null;
  }

  const PageHeader = () => {
    const headerImages = projectDetails.imgs.map((img) => img.img);

    return (
      <ProjectImageVideo
        className="lg:h-full"
        img={headerImages}
        link="jWCRs6Oc_0g&t"
      />
    );
  };

  const phasesData = [
    {
      title: "المرحلة الأولى",
      description: `تتكون المرحلة الاولي في مشروع ابراج المدينة من عدد 7 عمارات باجمالي 112 وحدة سكنية و36 محل تجاري و24 عيادة طبية مساحات الوحدات السكنية 100 متر 3 غرف وصالة قطعتين ومقدم يبدا من 380 الف جنيه وبالتقسيط حتي 4 سنوات`,
      highlight: "تم انتهاء التعاقد",
      image: "/assets/projects/abrag-elmadina/step1.webp",
      step: "أولي",
      closed: false,
      textColor: "text-[#D33A2E]",
    },
    {
      title: "المرحلة الثانية",
      description:
        "تتكون المرحلة الثانية من عمارتين بعدد 50 وحدة سكنية و25 محل تجاري وتبدا المساحات الوحدات السكنية من 115 متر حتي 130 متر وجميع المساحات 3 غرف وصالة قطعتين او ثلاث قطع.",
      image: "/assets/projects/abrag-elmadina/step2.webp",
      bgColor: "bg-white",
      closed: false,
      step: "ثانيه",
      textColor: "text-[#5FAC23]",
    },
    {
      title: " المرحلة الثالثة",
      description:
        "تتكون المرحلة الثالثة من 8 ابراج (سكنية - تجارية) بعدد 180 وحدة سكنية و66 محل تجاري بمساحات للوحدات السكنية تبدا من 84 متر حتي 150 متر وجميع المساحات تتكون من 3 غرف وصالة قطعتين او ثلاث قطع وانظمة سداد حتي 6 سنوات في المرحلة الثالثة فقط",
      image: "/assets/projects/abrag-elmadina/step3.webp",
      bgColor: "bg-gray-200",
      textColor: "text-white",
      closed: false,
      step: "ثالثه",
    },
    {
      title: " المرحلة الرابعة",
      description:
        "تتكون المرحلة الثالثة من 8 ابراج (سكنية - تجارية) بعدد 180 وحدة سكنية و66 محل تجاري بمساحات للوحدات السكنية تبدا من 84 متر حتي 150 متر وجميع المساحات تتكون من 3 غرف وصالة قطعتين او ثلاث قطع وانظمة سداد حتي 6 سنوات في المرحلة الثالثة فقط",
      image: "/assets/projects/abrag-elmadina/step3.webp",
      bgColor: "bg-gray-200",
      textColor: "text-white",
      closed: false,
      step: "رابعه",
    },
  ];

  const phaseOptions = [
    { value: "", label: "إعادة تعيين" },
    ...phasesData
      .filter((phase) => !phase.closed && phase.step)
      .map((phase) => ({
        value: phase.step,
        label: phase.title.trim(),
      })),
  ];

  return (
    <>
      <section className="page container px-4">
        {
          <div className="grid gap-8 md:gap-16 grid-cols-1 justify-center  lg:grid-cols-12  pt-2! md:pt-7!">
            <div className="  lg:col-span-5 h-full    w-full">
              <HeaderLocation
                title={projectDetails.name}
                location={projectDetails.location}
              />

              <div className="flex flex-col gap-2">
                {!isSmall && <PageHeader />}

                <p className="p text-justify">{projectDetails.description}</p>
              </div>
            </div>
            {isSmall && <PageHeader />}
          </div>
        }
        {
          <div className="grid gap-4 md:gap-16 grid-cols-1 lg:grid-cols-12 sec-padding">
            <div
              className="lg:col-span-5 w-full rounded-xl overflow-hidden relative
            lg:h-[400px]"
            >
              <Image
                src="/assets/projects/abrag-elmadina/aa.png"
                alt="رسم بياني توضيحي أبراج المدينة"
                width={600}
                height={600}
                className="object-cover rounded-xl"
              />
            </div>
            <div className="flex gap-2 md:gap-4 flex-col lg:col-span-7 w-full">
              <h2 className="text-primary h2">موقع المشروع:</h2>
              <p className="text-justify p">
                يتمتع مشروع أبراج المدينة بموقع عبقري واستراتيجي، دقيقة واحدة
                فقط من شارع قناة السويس، و10 دقائق من جامعة المنصورة، و5 دقائق
                من شارع الجيش، مع قرب مباشر من جميع الخدمات والمرافق الحيوية.
                حيث يقع المشروع في الاتجاه المقابل لـ كوبرى جديلة، مما يمنحه
                سهولة وصول استثنائية من مختلف أنحاء المدينة. ويضم المشروع وحدات
                إدارية ومركز طبي بالإضافة إلى 200 وحدة تجارية تخدم المشروع
                والمنطقة المحيطة، ليصبح مجتمعًا متكاملًا
              </p>
              <div className="mb-6 w-62.5 ">
                <SelectInput
                  name="step"
                  placeholder="اختر المرحلة"
                  className="justify-between"
                  labelClass="text-start!"
                  options={phaseOptions}
                />
              </div>
            </div>
          </div>
        }

        <div className="sec-padding">
          {/* <h2 className="h2 text-primary lg:mb-4 mb-1">مراحل المشروع </h2>
          <div
            className="grid grid-cols-1 xl:grid-cols-3
           md:grid-cols-2 gap-8 2xl:gap-16 py-2"
          >
            {phasesData.map((phase, index) => (
              <div
                key={index}
                className="rounded-t-xl  flex flex-col relative rounded-b-[26px] bg-[#E6E6E6]"
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
                  <h2 className="h2 font-semibold text-primary">
                    {phase.title}
                  </h2>
                  <p className="p my-0">{phase.description}</p>

                  {
                    <>
                      {" "}
                      {!phase.closed ? (
                        <button
                          onClick={() => {
                            if (phase.step) setStep(phase.step);
                          }}
                          className="bg-[#5FAC23] text-center cursor-pointer rounded-xl
                            py-3 flex items-center justify-center gap-1
                             text-lg text-white w-full  mt-auto   mx-auto"
                        >
                          التفاصيل
                        </button>
                      ) : (
                        <div
                          className={`bg-red-500 text-center rounded-xl
                             py-3 flex items-center justify-center gap-1
                               text-lg text-white w-full  mt-2  mx-auto`}
                        >
                          <span>تم انتهاء التعاقد</span>
                          <TiLockClosed className="white text-2xl" />
                        </div>
                      )}
                    </>
                  }

                  {phase.highlight && (
                    <>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 z-10">
                        <div className="relative w-full h-full">
                          <Image
                            src="/assets/projects/abrag-elmadina/elipse.webp"
                            alt="elipse"
                            width={300}
                            height={300}
                            className="w-full h-auto"
                          />
                        </div>
                        <p className="absolute text-center sm:text-3xl top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2 text-white -rotate-15 whitespace-nowrap text-2xl 2xl:text-3xl rounded-[2000px] font-bold">
                          {phase.highlight}
                        </p>
                      </div>
                      <div className="absolute top-0 left-0 w-full h-full bg-[#434F438A] backdrop-blur-sm rounded-b-[26px] rounded-t-xl"></div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div> */}

          <div ref={ref}>
            {searchParams.get("step") && <MadinaTowersUnits />}
          </div>
        </div>
      </section>
    </>
  );
};

export default MadinaTowers;
