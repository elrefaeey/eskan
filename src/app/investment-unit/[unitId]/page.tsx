"use client";

import { useParams } from "next/navigation";
import InvestmentUnitDetails from "@/features/invesrtment/components/InvestmentUnitDetails";

export default function InvestmentUnitPage() {
  const params = useParams();
  const unitId = params?.unitId as string;

  return (
    <div className="page pb-4">
      <InvestmentUnitDetails unitId={unitId} />
    </div>
  );
}
