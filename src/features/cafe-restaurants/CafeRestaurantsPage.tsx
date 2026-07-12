"use client";
import { useIsSmallScreen } from "@/hooks/useIsSmall";
import ProjectImageVideo from "@/components/Projects/ProjectImageVideo";
import HeaderLocation from "@/components/Projects/HeaderLocation";
import ProjectImgsSlider from "@/components/Projects/ProjectImagesSlider";
import Image from "next/image";
import CafeRestaurantUnits from "@/components/Projects/CafeRestaurants/CafeRestaurantUnits";
import { useMallConstructionImages } from "@/features/mall/hooks/useMallConstructionImages";
import { LoadingPage } from "@/components/ui/LoadingPage";

const PageHeader = () => (
  <ProjectImageVideo
    img={["/assets/elbadry-trade/cafe1.jpg", "/assets/elbadry-trade/cafe1.jpg"]}
    link="jWCRs6Oc_0g&t"
    className="lg:h-full"
  />
);

const CafeRestaurantsPage = () => {
  const isSmall = useIsSmallScreen();
  const {
    data: constructionImagesData,
    isLoading: isLoadingConstructionImages,
  } = useMallConstructionImages();

  if (isLoadingConstructionImages) {
    return <LoadingPage />;
  }
  const constructionImages =
    constructionImagesData?.data?.map((image) => image.img) || [];
  return (
    <div className="page container">
      <div className="grid grid-cols-1  lg:grid-cols-12 w-full gap-8 lg:gap-16">
        <div
          className="lg:col-span-5 w-full"
          data-aos="fade-left"
          data-duration="500"
        >
          <HeaderLocation
            title="مطاعم وكافيهات"
            location="اخر شارع الاتوبيس الجديد من اتجاة البحر الصغير"
          />
          {!isSmall && <PageHeader />}
          <p className="text-justify mt-2 p">
            يعتبر مشروع المطاعم والكافيهات طفرة واضافة كبيرة للمشاريع التجارية
            بالمنصورة، والذي تنشئه حاليا مجموعة البدري للتجارة والمقاولات
            بالتعاون مع اسكان المنصورة المطور العقاري للمشروع ضمن اكبر مركز
            تجاري متعدد الاسواق بالمنصورة وعلي مسطحات بنائية تتجاوز ٢١ الف متر،
            ليكون المقصد الرئيسي لأكتر من ١٠ مليون من ابناء الدقهلية للترفيه
            والتسوق
          </p>
        </div>
        {isSmall && <PageHeader />}
      </div>

      <div className="sec-padding">
        <h2 className="text-primary mb-2 lg:mb-4 w-full lg:col-span-12 h2">
          المراحل التنفيذية للمشروع:
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-12 w-full gap-8 lg:gap-16">
          <div className="lg:col-span-6 w-full">
            <ProjectImgsSlider
              rounded={true}
              images={constructionImages}
              height="lg:h-full"
            />
          </div>
          <div className="lg:col-span-6 rounded-md overflow-hidden relative w-full h-auto aspect-auto lg:h-[500px]">
            <Image
              src="/assets/elbadry-trade/IstanbulGraph.jpg"
              width={800}
              height={600}
              className="object-contain w-full h-auto lg:object-cover "
              alt="صورة رسم بياني"
            />
          </div>
        </div>
      </div>

      <div className="py-4 pb-8">
        <CafeRestaurantUnits />
      </div>
    </div>
  );
};

export default CafeRestaurantsPage;
