"use client";

import AnimatedSection from "@/components/common/animations/AnimatedSection";

interface HeadingProps {
  title: string;
  desc: string | React.ReactNode;
}

const Heading = ({ title, desc }: HeadingProps) => {
  return (
    <div className="space-y-1">
      <AnimatedSection duration={0.6} className="inline-block relative">
        <h2
          className="text-3xl lg:text-5xl font-extrabold
                                             text-primary tracking-tight "
        >
          {title}
        </h2>
      </AnimatedSection>

      <AnimatedSection
        as="p"
        delay={0.3}
        duration={0.6}
        className="text-text/90 text-[21px] text-justify md:text-[32px] leading-relaxed font-normal"
      >
        {desc}
      </AnimatedSection>
    </div>
  );
};

export default Heading;
