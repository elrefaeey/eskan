"use client";

import { ELBADRY_TRADE_ACTIVITIES } from "@/features/elbadry-trade/constants";
import ElbadryActivityCard from "@/features/elbadry-trade/components/ElbadryActivityCard";

export default function ElbadryActivities() {
  return (
    <>
      {ELBADRY_TRADE_ACTIVITIES.map((activity) => (
        <ElbadryActivityCard key={activity.link} activity={activity} />
      ))}
    </>
  );
}
