import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
// import "./projectSlider.css";
import Image from "next/image";

const ProjectImgsSlider = ({
  images = [],
  height = "h-[400px]",
  rounded = false,
}: {
  images: string[];
  height?: string;
  rounded?: boolean;
}) => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay, EffectFade]}
      slidesPerView={1}
      loop
      effect="fade"
      speed={800}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      navigation
      pagination={{
        clickable: true,
        bulletClass: "swiper-bullet",
        bulletActiveClass: "swiper-bullet-active",
      }}
      className={`project-slider relative m-0 w-full ${height}`}
    >
      {images.map((src, index) => (
        <SwiperSlide key={index} className="relative h-full w-full">
          <Image
            fill
            src={src}
            alt={`project-${index}`}
            loading="lazy"
            className={`object-cover ${rounded ? "rounded-xl" : ""}`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ProjectImgsSlider;
