import Image from "next/image";
import AnimatedSection from "@/components/common/animations/AnimatedSection";
import { ownersAssociationImageVariant } from "../animations";
import { OWNERS_ASSOCIATION_BADGE, OWNERS_ASSOCIATION_IMAGE } from "../constants";

export default function OwnersAssociationImage() {
  return (
    <AnimatedSection
      variant={ownersAssociationImageVariant}
      className="relative w-full lg:w-[400px] xl:w-[600px] h-[280px] lg:h-[300px] xl:h-[400px] rounded-2xl overflow-hidden shadow-lg"
    >
      <Image
        src={OWNERS_ASSOCIATION_IMAGE.src}
        alt={OWNERS_ASSOCIATION_IMAGE.alt}
        fill
        className="object-cover"
        quality={45}
        sizes={OWNERS_ASSOCIATION_IMAGE.sizes}
      />
      <div className="w-12 h-12 absolute bottom-2 right-2">
        <Image
          src={OWNERS_ASSOCIATION_BADGE.src}
          alt={OWNERS_ASSOCIATION_BADGE.alt}
          width={OWNERS_ASSOCIATION_BADGE.size}
          height={OWNERS_ASSOCIATION_BADGE.size}
          className="object-cover w-12 aspect-square"
          quality={40}
          sizes="48px"
        />
      </div>

      <div className="absolute inset-0 bg-black/10 hover:bg-black/0 transition-all duration-500" />
    </AnimatedSection>
  );
}
