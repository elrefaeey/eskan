"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import MadinaTowersUnits from "@/components/Projects/MadinaTowers/MadinaTowersUnits";

const StepUnitsClient = () => {
  const searchParams = useSearchParams();
  const step = searchParams.get("step");

  if (!step) return null;

  return <MadinaTowersUnits />;
};

export default StepUnitsClient;
