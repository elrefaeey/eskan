"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import ProjectImgsSlider from "@/components/Projects/ProjectImagesSlider";
import { Skeleton } from "@/components/ui/skeleton";
import { useSouqIstanbulInnerDesignImages } from "@/features/souq-istanbul/hooks/useSouqIstanbulInnerDesignImages";
import { useSouqIstanbulArchitecturalDesignImage } from "@/features/souq-istanbul/hooks/useSouqIstanbulArchitecturalDesignImage";
import { TAFSEL_LIST } from "@/features/souq-istanbul/constants";
import SouqIstanbulTailoringForm from "./SouqIstanbulTailoringForm";
import {
  fadeUpVariant,
  formItemVariant,
  inViewOnce,
  slideInLeftVariant,
  slideInRightVariant,
  staggerContainerVariant,
} from "@/lib/animations";

const SouqIstanbulTailoringSection = () => {
  const {
    data: innerDesignImages,
    isLoading: innerDesignLoading,
    isError: innerDesignError,
  } = useSouqIstanbulInnerDesignImages();

  const {
    data: architecturalDesign,
    isLoading: architecturalLoading,
    isError: architecturalError,
  } = useSouqIstanbulArchitecturalDesignImage();

  const sliderImages =
    innerDesignImages?.slice(2).map((image) => image.img) ?? [];

  return (
    <section className="sec-padding">
      <motion.div
        className="mb-8 lg:mb-12"
        variants={fadeUpVariant}
        initial="hidden"
        whileInView="visible"
        viewport={inViewOnce}
      >
        <h2 className="text-primary h2">منطقة الخياطة والتفصيل</h2>
        <p className="p mt-3 max-w-3xl">
          مساحة تجارية مخصصة داخل سوق اسطنبول لخدمة تجار الأزياء والخياطة
          بموقع استراتيجي ومساحات مرنة.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
        <motion.div
          className="lg:col-span-7 order-1 lg:order-1 w-full"
          variants={slideInLeftVariant}
          initial="hidden"
          whileInView="visible"
          viewport={inViewOnce}
        >
          {innerDesignLoading || innerDesignError ? (
            <Skeleton className="w-full h-[260px] lg:h-[460px] rounded-2xl" />
          ) : (
            <motion.div
              className="overflow-hidden rounded-2xl shadow-md ring-1 ring-gray-100"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectImgsSlider
                images={sliderImages}
                rounded
                height="h-[260px] lg:h-[460px]"
              />
            </motion.div>
          )}
        </motion.div>

        <motion.div
          className="lg:col-span-5 order-2 lg:order-2 flex flex-col gap-4"
          variants={staggerContainerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={inViewOnce}
        >
          <motion.span
            variants={formItemVariant}
            className="inline-flex w-fit items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm md:text-base font-semibold text-primary"
          >
            01 — التصميم الداخلي
          </motion.span>

          <motion.p variants={formItemVariant} className="p !text-justify">
            في قلب هذا المول التجاري الكبير، خصصنا منطقة مميزة تحتوي على:
          </motion.p>

          <motion.ul
            variants={staggerContainerVariant}
            className="flex flex-col gap-3 md:gap-4"
          >
            {TAFSEL_LIST.map((item) => (
              <motion.li
                key={item}
                variants={formItemVariant}
                className="flex items-start gap-3 text-[#444444] text-base md:text-xl lg:text-2xl leading-relaxed"
              >
                <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                <span>{item}</span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mt-12 lg:mt-20 items-stretch">
        <motion.div
          className="lg:col-span-6 flex flex-col gap-4"
          variants={slideInLeftVariant}
          initial="hidden"
          whileInView="visible"
          viewport={inViewOnce}
        >
          <span className="inline-flex w-fit items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm md:text-base font-semibold text-primary">
            02 — التصميم المعماري
          </span>

          <motion.div
            className="flex-1 flex items-center justify-center rounded-2xl bg-[#F7F7F7] p-4 md:p-6 ring-1 ring-gray-100 min-h-[280px]"
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
          >
            {architecturalLoading || architecturalError ? (
              <Skeleton className="w-full max-w-[400px] h-[240px] rounded-xl" />
            ) : (
              architecturalDesign?.img && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={inViewOnce}
                  transition={{ duration: 0.5, delay: 0.15 }}
                >
                  <Image
                    src={architecturalDesign.img}
                    alt="التصميم المعماري للدور"
                    width={400}
                    height={400}
                    className="w-full max-w-[400px] h-auto object-contain"
                  />
                </motion.div>
              )
            )}
          </motion.div>
        </motion.div>

        <motion.div
          className="lg:col-span-6 flex flex-col gap-4"
          variants={slideInRightVariant}
          initial="hidden"
          whileInView="visible"
          viewport={inViewOnce}
        >
          <span className="inline-flex w-fit items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm md:text-base font-semibold text-primary">
            03 — الحجز والاستفسار
          </span>


          <p className="p !text-justify">
            للحجز أو الاستفسار عن منطقة الخياطة والتفصيل، املأ النموذج وسيتواصل
            معك فريقنا في أقرب وقت.
          </p>

          <SouqIstanbulTailoringForm />
        </motion.div>
      </div>
    </section>
  );
};

export default SouqIstanbulTailoringSection;
