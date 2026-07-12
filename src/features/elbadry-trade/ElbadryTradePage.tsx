"use client";
import ElbadryActivities from "@/components/Projects/ElbadryTrade/ElbadryActivities";
import HeaderLocation from "@/components/Projects/HeaderLocation";
import ProjectImgsSlider from "@/components/Projects/ProjectImagesSlider";
import ProjectImageVideo from "@/components/Projects/ProjectImageVideo";
import { useIsSmallScreen } from "@/hooks/useIsSmall";
import { useElbadryTradeProjectDetails } from "@/features/elbadry-trade/hooks/useElbadryTradeProjectDetails";
import { useElbadryTradeConstructionImages } from "@/features/elbadry-trade/hooks/useElbadryTradeConstructionImages";
import { useVideoLinks } from "@/features/elbadry-trade/hooks/useVideoLinks";
import { Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

function ElbadryTradePage() {
  const isSmall = useIsSmallScreen();

  const { data: projectDetails, isLoading: isLoadingProject } =
    useElbadryTradeProjectDetails();
  const { data: constructionImages, isLoading: isLoadingImages } =
    useElbadryTradeConstructionImages();
  const { data: videoLinks } = useVideoLinks();

  const isLoading = isLoadingProject || isLoadingImages;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!projectDetails) return null;

  const headerImages = projectDetails.imgs.map((img) => img.img);

  const videoLink =
    videoLinks?.find((link) => link.name === "gomla mall")?.link ||
    "jWCRs6Oc_0g";
  const imagesSlider = constructionImages?.map((img) => img.img) || [];

  const HeaderMedia = () => (
    <ProjectImageVideo
      img={headerImages.length > 0 ? headerImages : projectDetails.img}
      link={videoLink}
      className="lg:h-full"
    />
  );

  return (
    <div>
      <div className="container page">
        <div className="grid gap-16 grid-cols-1 sec-padding lg:grid-cols-12  my-4">
          <div
            className="lg:col-span-5 w-full"
            data-aos="fade-left"
            data-duration="500"
          >
            <HeaderLocation
              title={projectDetails.name}
              location={projectDetails.location}
            />

            {!isSmall && <HeaderMedia />}

            <p className="text-justify mt-0 p">{projectDetails.description}</p>
          </div>

          {isSmall && <HeaderMedia />}
        </div>

        <div className="sec-padding">
          <div className="grid grid-cols-1 lg:grid-cols-12 w-full gap-8 lg:gap-16">
            <div className="flex flex-col lg:col-span-6 h-full">
              <h2 className="text-primary mb-2 lg:mb-4 w-full h2">
                المراحل التنفيذية للمشروع:
              </h2>
              <div className="grow w-full">
                {isLoadingImages ? (
                  <Skeleton className="w-full h-[300px] lg:h-[400px] rounded-xl" />
                ) : (
                  <ProjectImgsSlider
                    rounded={true}
                    height="h-[300px] lg:h-[400px]"
                    images={imagesSlider}
                  />
                )}
              </div>
            </div>

            <div className="lg:col-span-6 flex flex-col h-full">
              <h2 className="text-primary mb-2 lg:mb-4 w-full lg:col-span-12 h2">
                جولة 3D للمشروع
              </h2>
              <iframe
                className="w-full rounded-lg grow"
                height="400"
                loading="lazy"
                src="https://momento360.com/e/u/36a8763404934b80a8f94f1ea11c3e65?utm_campaign=embed&utm_source=other&heading=0&pitch=0&field-of-view=75&size=medium&display-plan=true"
                title="3d model badry mall"
              ></iframe>
            </div>
          </div>
        </div>

        <section className="sec-padding ">
          <h2 className="text-primary mb-2 lg:mb-4 h2">الانشطة التجارية:</h2>

          <div className="flex lg:flex-row sm:gap-8 gap-5 flex-col">
            <ElbadryActivities />
          </div>
        </section>
      </div>
    </div>
  );
}

export default ElbadryTradePage;
