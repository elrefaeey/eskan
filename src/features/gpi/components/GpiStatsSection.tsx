"use client";

import { StatsGrid } from "@/components/shared";
import { GPI_STATS } from "../constants";

export default function GpiStatsSection() {
  return (
    <div className="sec-padding">
      <StatsGrid stats={GPI_STATS} className="mb-0" />
    </div>
  );
}
