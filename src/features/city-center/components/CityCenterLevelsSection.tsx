"use client";

import { CITY_CENTER_LEVELS } from "../constants/levels";
import { CITY_CENTER_LEVELS_TITLE } from "../constants";
import { CityCenterLevelCard } from "./CityCenterLevelCard";

interface CityCenterLevelsSectionProps {
  img: string;
  loading?: boolean;
}

export function CityCenterLevelsSection({ img, loading = false }: CityCenterLevelsSectionProps) {
  return (
    <div className="sec-padding" dir="rtl">
      <h2 className="text-primary text-2xl md:text-3xl font-extrabold mb-6 border-r-4 border-primary pr-4">
        {CITY_CENTER_LEVELS_TITLE}
      </h2>
      <div className="grid gap-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {CITY_CENTER_LEVELS.map((level) => (
          <CityCenterLevelCard key={level.title} {...level} img={img} loading={loading} />
        ))}
      </div>
    </div>
  );
}
