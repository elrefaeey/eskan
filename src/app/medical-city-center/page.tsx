"use client";
import Image from "next/image";
import { useIsSmallScreen } from "@/hooks/useIsSmall";
import HeaderLocation from "@/components/Projects/HeaderLocation";
import ProjectImageVideo from "@/components/Projects/ProjectImageVideo";
import MedicalCityUnits from "@/components/Projects/MedicalCity/MedicalCityUnits";
import { useLenis } from "@/hooks/useLenis";
import useMedicalProjectDetails from "@/features/medical-city-center/hooks/useMedicalProjectDetails";
import { Loader2 } from "lucide-react";

const MedicalCityCenter = () => {
  const isSmall = useIsSmallScreen();
  const { projectDetails, isLoading } = useMedicalProjectDetails();

  useLenis();

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
    console.log(projectDetails);
    const headerImages = projectDetails.imgs.map((img) => img.img);

    return <ProjectImageVideo className="lg:h-full" img={headerImages} />;
  };

  const features = [
    "غرف مبيت للمرضي والمرافقين ",
    "خدمة الاسعاف علي مدار ٢٤ ساعة",
    "الزيارات المنزلية للحالات علي مدار ٢٤ ساعة",
    "التمريض المنزلي",
    "تطبيق شامل وكامل لكل عيادة وخاصية الحجز الالكتروني للاطباء",
  ];

  return (
    <>
      <section className="page container px-4">
        <div className="grid gap-8 md:gap-16 grid-cols-1 justify-center lg:grid-cols-12 pt-2! md:pt-7!">
          <div className="lg:col-span-6 h-full w-full">
            <HeaderLocation
              title={projectDetails.name}
              location={projectDetails.location}
            />

            <div className="flex flex-col gap-2">
              {!isSmall && <PageHeader />}

              <p className="p text-justify">{projectDetails.description}</p>
            </div>
          </div>
          {isSmall && <div className="lg:col-span-6">{<PageHeader />}</div>}
        </div>

        {/* Second Section - مميزات المشروع (Static) */}
        <div className="grid gap-4 md:gap-16 grid-cols-1 lg:grid-cols-12 sec-padding">
          <div className="lg:col-span-6 w-full rounded-xl overflow-hidden relative lg:h-100">
            <Image
              src="/assets/projects/abrag-elmadina/location.webp"
              alt="مميزات المشروع"
              width={600}
              height={600}
              className="object-cover rounded-xl w-full h-full"
            />

          </div>
          <div className="flex gap-2 md:gap-4 flex-col lg:col-span-6 w-full">
            <h2 className="text-primary h2">مميزات المشروع</h2>
            <p className="text-justify p">يوفر المركز عدد من الخدمات منها:</p>
            <ul className="">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-primary text-2xl">•</span>
                  
                  <span className="p">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <MedicalCityUnits />
      </section>
    </>
  );
};

export default MedicalCityCenter;
