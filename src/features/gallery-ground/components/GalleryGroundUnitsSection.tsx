"use client";

import AnimatedSection from "@/components/common/animations/AnimatedSection";
import { fadeUp } from "@/lib/animations";
import SelectInput from "@/components/SelectInput";
import GalleryGroundList from "@/features/gallery-ground/components/GalleryGroundList";
import {
  GALLERY_GROUND_LOCATIONS,
  GALLERY_GROUND_UNITS_SECTION_ID,
  GALLERY_GROUND_UNITS_TITLE,
} from "../constants";

interface GalleryGroundUnitsSectionProps {
  spaces: Array<{ value: string; label: string }>;
  meterPrices: Array<{ value: string; label: string }>;
}

export default function GalleryGroundUnitsSection({
  spaces,
  meterPrices,
}: GalleryGroundUnitsSectionProps) {
  return (
    <div id={GALLERY_GROUND_UNITS_SECTION_ID}>
      <AnimatedSection variant={fadeUp} className="sec-padding">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-r-4 border-primary pr-4">
          <h2 className="text-primary text-2xl md:text-3xl font-extrabold">
            {GALLERY_GROUND_UNITS_TITLE}
          </h2>
          <div className="flex gap-2 flex-wrap">
            <SelectInput
              options={[...GALLERY_GROUND_LOCATIONS]}
              name="location"
              placeholder="الموقع"
              className="w-auto"
            />
            <SelectInput
              options={meterPrices}
              name="meter_price"
              placeholder="سعر المتر"
              className="w-auto"
            />
            <SelectInput options={spaces} name="space" placeholder="المساحة" className="w-auto" />
          </div>
        </div>

        <GalleryGroundList />
      </AnimatedSection>
    </div>
  );
}
