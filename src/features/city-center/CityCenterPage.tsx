"use client";

import { useEffect, useRef } from "react";
import HeaderLocation from "@/components/Projects/HeaderLocation";
import ProjectImageVideo from "@/components/Projects/ProjectImageVideo";
import ProjectImgsSlider from "@/components/Projects/ProjectImagesSlider";
import { useIsSmallScreen } from "@/hooks/useIsSmall";
import Levels from "@/components/Projects/CityCenter/Levels";
import { useCityCenterProjectDetails } from "@/features/city-center/hooks/useCityCenterProjectDetails";
import { useCityCenterConstructionImages } from "@/features/city-center/hooks/useCityCenterConstructionImages";
import { Loader2 } from "lucide-react";

const CityCenterPage = () => {
  const isSmall = useIsSmallScreen();
  const shouldMount = useRef(true);

  const { data: projectDetails, isLoading: isLoadingProject } =
    useCityCenterProjectDetails();
  const { data: constructionImages, isLoading: isLoadingImages } =
    useCityCenterConstructionImages();

  useEffect(() => {
    if (shouldMount.current == true) {
      shouldMount.current = false;
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, []);

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
  const imagesSlider = constructionImages?.map((img) => img.img) || [];

  const HeaderMedia = () => (
    <ProjectImageVideo
      img={headerImages.length > 0 ? headerImages : projectDetails.img}
      link={projectDetails.video}
      className="lg:h-full"
    />
  );

  return (
    <main className="page container ">
      <section>
        <div className="sec-padding">
          {
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
                {!isSmall && <HeaderMedia />}
                <div className=" mt-0 p ">
                  <p>
                    مول متخصص يضم الإلكترونيات والملابس، دور بازارات، فود كورت،
                    وهايبر بيت الجملة لكي يجذب آلاف الزوار يوميًا.
                  </p>
                  <p>وحدات صغيرة ومتوسطة في موقع يخدم الدلتا بالكامل.</p>
                  <p>
                    <strong>امتلك الآن… مشروع متكامل مش مجرد محل</strong>
                  </p>{" "}
                </div>
              </div>
              {isSmall && <HeaderMedia />}
            </div>
          }
        </div>

        {
          <div className=" grid lg:grid-cols-12 gap-4 lg:gap-16 ">
            <img
              src={"/assets/projects/city-center/CityCenterGraph.png"}
              alt="رسم بياني توضيحي مول سيتي سنتر"
              className="rounded-xl w-full lg:grow  lg:col-span-7"
            />
            <div className="  lg:col-span-5  flex flex-col  gap-1 lg:gap-3  w-full">
              <h2 className="text-primary h2">الاستثمار في سيتي سنتر:</h2>
              <p className="p">
                في الوقت الراهن الاستثمار في محلات التجارية في مول سيتي سنتر هو
                الأفضل لأنه يحقق عائد استثماري سريع طبقا للجدول الموضح في سيتي
                سنتر المنصورة وفرنا فرص استثمار ممتازة حيث توفر اسكان المنصورة
                فرصة الاستثمار بغرض إعادة البيع او العائد الايجاري بعقود ملزمة
                من شركة الادارة ويبدأ العائد الايجاري .. مما يعني توفُر كل شهر
                دخل ثابت يُأمن لك حياتك وحياة أسرتك.
              </p>
            </div>
          </div>
        }

        {
          <div className=" grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-16 sec-padding">
            <div className="  lg:col-span-5 col-span-1  flex flex-col gap-1 lg:gap-3  ">
              <h2 className="text-primary h2"> ما يميز المشروع</h2>
              <ol
                start={1}
                className={`text-[#444444] md:text-2xl text-[18px] list-decimal max-[700px]:text-[17px] list-inside flex flex-col gap-3`}
              >
                <li className="li">مول مرخص وفي مرحلة متقدمة في الإنشاءات.</li>
                <li className="li">
                  أول مول متخصص في المنصورة وأكبر تنوع للمحلات التجارية في
                  الدلتا مما يُلبي كل احتياجات الأسرة المصرية.
                </li>
                <li className="li">
                  مول يحتوي علي منظومة خدمات متكاملة تكييف مركزي، سلالم
                  كهربائية، نظام أمني متكامل، بدروم، وجراج واسع للسيارات.
                </li>
                <li className="li">
                  مساحات ترفيهية مصممة لإسعاد الأطفال وإضفاء جو من المتعة على
                  زيارات العائلات.{" "}
                </li>
              </ol>
            </div>
            <div className=" rounded-xl w-full  flex flex-col gap-2 lg:gap-3 col-span-1  lg:col-span-7 h-full">
              <h2 className="text-primary  h2">المراحل التنفيذية للمشروع:</h2>
              <div className="flex flex-wrap grow">
                <ProjectImgsSlider
                  rounded={true}
                  images={imagesSlider}
                  height="h-[300px] lg:h-full"
                />
              </div>
            </div>
          </div>
        }

        <div className="grid lg:grid-cols-12 md:gap-16 gap-4 sec-padding">
          <div
            className="lg:col-span-7 col-span-1  flex flex-col gap-1 lg:gap-3"
            data-aos="fade-left"
            data-duration="500"
          >
            <h2 className={`text-primary h2`}>أسلوب تعاقد يضمن لك أموالك</h2>
            <ol
              start={1}
              className={`text-[#444444] md:text-2xl text-[18px] list-decimal list-inside flex flex-col gap-2`}
            >
              <p className="p">
                سيتي سنتر المنصورة هو أحد المشروعات التي يتم تنفيذها بنظام اتحاد
                الملاك وهو أقوى وأضمن نظام تعاقد يحقق الأمان للمتعاقدين في أربع
                خطوات كالآتي:
              </p>
              <li className="li">
                فور التوقيع على العقد يتم نقل حصة من أرض المشروع تمثل قيمة مبلغ
                مقدم التعاقد.
              </li>
              <li className="li">
                أسلوب السداد من خلال حسابات بنك الإسكان والتعمير حساب
                شركات.{" "}
              </li>
              <li className="li">نظام سداد مرتبط بتقدم الأعمال في المشروع.</li>
            </ol>
          </div>
          <div
            data-aos="fade-left"
            data-duration="500"
            className=" rounded-xl w-full  flex flex-col gap-1 lg:gap-3 col-span-1  lg:col-span-5 h-full"
          >
            <h2 className={`text-primary h2`}>نظام ادارة قوي</h2>

            <p className="p">
              <span className="">
                <b>الشركة المالكة</b> : شركة توب براون - حامد الطنطاوي (المالك
                لمول الطنطاوي للادوات المنزلية ومطاعم قصر الأسماك )
              </span>
              <br />
              <b>المطور العقاري وادارة المشروعات : </b> اسكان المنصورة العقارية
              بخبرة تتجاوز ١٧ سنة في ادارة المشروعات العقارية الكبرى
              <br />
              <b>الاستشاري الهندسي : </b> مهندس ربيع السعدني
            </p>
          </div>
        </div>

        <Levels img={headerImages[0]} loading={isLoading} />
      </section>
    </main>
  );
};

export default CityCenterPage;
