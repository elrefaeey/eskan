"use client";

import { useParams } from "next/navigation";
import InvestmentUnitPage from "@/features/investment/components/InvestmentUnitPage";

export default function Page() {
  const params = useParams();
  const unitId = params?.unitId as string;

  return <InvestmentUnitPage unitId={unitId} />;
}
