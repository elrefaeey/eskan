import AnimatedSection from "@/components/common/animations/AnimatedSection";
import { ActionButton } from "@/components/ui/ReusableComponents/ActionButton";
import { ownersAssociationTextVariant } from "../animations";
import { OWNERS_ASSOCIATION_CONTENT } from "../constants";

export default function OwnersAssociationContent() {
  const handleOpenAuction = () =>
    window.open(OWNERS_ASSOCIATION_CONTENT.ctaHref, "_blank");

  return (
    <AnimatedSection variant={ownersAssociationTextVariant} className="flex-1 space-y-2">
      <h3 className="text-3xl lg:text-5xl font-extrabold text-primary tracking-tight">
        {OWNERS_ASSOCIATION_CONTENT.title}{" "}
      </h3>

      <p className="text-text text-[21px] text-justify lg:text-3xl leading-relaxed text-[#3F3F3F]">
        {OWNERS_ASSOCIATION_CONTENT.description}
      </p>

      <ActionButton
        className="px-10 transition-transform mt-2 md:mt-4"
        variant="primary"
        onClick={handleOpenAuction}
      >
        {OWNERS_ASSOCIATION_CONTENT.ctaLabel}{" "}
      </ActionButton>
    </AnimatedSection>
  );
}
