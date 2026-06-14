"use client";

import AnimatedSection from "@/components/common/animations/AnimatedSection";
import Image from "next/image";

const BazarHeader = () => {
  return (
    <div className="sec-padding">
      <AnimatedSection
        as="h2"
        y={-15}
        duration={0.5}
        className="text-primary h2 text-xl md:text-2xl lg:text-3xl xl:text-[38px] font-bold"
      >
        دور البازار {" > "} سيتي سنتر
      </AnimatedSection>

      <div className="level-image rounded-xl mt-3 shadow-lg overflow-hidden relative">
        <Image
          src="https://back.mansoura-eco-build.com/storage/app/public/images/Eskan/km1aV1odUntitled-2.jpg"
          alt="bazar image"
          width={1200}
          height={300}
          className="rounded-xl w-full h-[300px] lg:h-[500px] object-cover"
          priority
        />
      </div>
    </div>
  );
};

export default BazarHeader;
