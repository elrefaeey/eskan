"use client";

import Image from "next/image";
import SelectInput from "@/components/SelectInput";
import GalleryGroundList from "@/features/gallery-ground/components/GalleryGroundList";
import { useIsSmallScreen } from "@/hooks/useIsSmall";
import HeaderLocation from "@/components/Projects/HeaderLocation";
import ProjectImageVideo from "@/components/Projects/ProjectImageVideo";
import ProjectImgsSlider from "@/components/Projects/ProjectImagesSlider";
import useGalleryGroundFilters from "@/features/gallery-ground/hooks/useGalleryGroundFilters";
import useProjectDetails from "@/features/gallery-ground/hooks/useProjectDetails";
import useConstructionPhases from "@/features/gallery-ground/hooks/useConstructionPhases";
import { Loader2 } from "lucide-react";

// Static data
export const galleryGroundLocations = [
  { value: "ابراج المدينة 1", label: "ابراج المدينة 1" },
  { value: "ابراج المدينة 2", label: "ابراج المدينة 2" },
];

function GalleyGroundPage() {
  const isSmall = useIsSmallScreen();
  const { spaces, meterPrices } = useGalleryGroundFilters();
  const { projectDetails, isLoading } = useProjectDetails();
  const { constructionPhases, isLoading: phasesLoading } =
    useConstructionPhases();

  const HeaderInfo = () => {
    const images = projectDetails?.imgs?.map((img) => img.img) || [];
    return <ProjectImageVideo img={images} className="lg:h-full" />;
  };

  const projectFeatures = [
    "أول مجمع تجاري متخصص في الدلتا في بيع وتجارة مواد البناء، التشطيب، الديكور، الأثاث، والفرش المنزلي",
    "مجمع تجاري مرخّص بالكامل وتحت الإنشاء، مما يمنح ليك أمان وثقة في التنفيذ.",
    "موقع استراتيجي سهل الوصول، دقيقة واحدة فقط من شارع قناة السويس، 10 دقائق من جامعة المنصورة، 5 دقائق من شارع الجيش، مع قرب مباشر من جميع الخدمات والمرافق الحيوية.",
    "اعلي عائد استثماري يتخطى 40% خلال سنة و100% خلال فترة التسليم",
  ];

  if (isLoading || phasesLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-xl text-gray-600">جاري تحميل البيانات...</p>
        </div>
      </div>
    );
  }

  if (!projectDetails || !constructionPhases) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-gray-600">لا توجد بيانات متاحة</p>
      </div>
    );
  }

  return (
    <main className="page container px-4">
      {" "}
      <div className="sec-padding">
        <div className="grid gap-8 md:gap-16 grid-cols-1  lg:grid-cols-12 h-full  my-4 ">
          <div
            className="  lg:col-span-5  w-full h-full"
            data-aos="fade-up"
            data-duration="500"
          >
            <HeaderLocation
              title={projectDetails.name}
              location={projectDetails.location}
            />

            {!isSmall && <HeaderInfo />}
            <p className="text-justify mt-0 p ">{projectDetails.description}</p>
          </div>
          {isSmall && <HeaderInfo />}
        </div>
        <div className=" grid grid-cols-1 lg:grid-cols-12 gap-2 lg:gap-16 sec-padding">
          <div className="rounded-xl w-full flex flex-col gap-4 col-span-1 lg:col-span-5 h-full">
            <div className="relative w-full h-[300px] lg:h-full">
              <ProjectImgsSlider
                rounded={true}
                height="h-full"
                images={
                  Array.isArray(constructionPhases)
                    ? constructionPhases.map((phase) => phase.img)
                    : constructionPhases?.img
                      ? [constructionPhases.img]
                      : []
                }
              />
            </div>
          </div>
          <div className="lg:col-span-7 col-span-1 flex flex-col gap-2 lg:gap-3 leading-[1]">
            <h2 className="text-primary h2">
              ما يميز الاستثمار في أرض المعارض
            </h2>
            <ul className="text-[#444444] xl:text-3xl list-disc list-inside space-y-2 max-[700px]:text-[17px]">
              {projectFeatures.map((feature, index) => (
                <li key={index} className="leading-relaxed">
                  {feature}
                </li>
              ))}
            </ul>
            <p className="p">
              انت بتتملك في مشروع بيستهدف 20 مليون مواطن من اهالي الدلتا
            </p>
          </div>
        </div>
        <div className="sec-padding">
          <h3 className="h2 text-primary my-2 lg:my-5">احجز الأن</h3>

          <div className="flex gap-2 my-2 lg:my-5 flex-wrap">
            <SelectInput
              options={[{ value: "", label: "إعادة تعيين" }, ...galleryGroundLocations]}
              name="location"
              placeholder="الموقع"
              className="w-auto"
            />
            <SelectInput
              options={[{ value: "", label: "إعادة تعيين" }, ...meterPrices]}
              name="meter_price"
              placeholder="سعر المتر"
              className="w-auto"
            />
            <SelectInput
              options={[{ value: "", label: "إعادة تعيين" }, ...spaces]}
              name="space"
              placeholder="المساحة"
              className="w-auto"
            />
          </div>

          <GalleryGroundList />
        </div>
      </div>
    </main>
  );
}

export default GalleyGroundPage;
