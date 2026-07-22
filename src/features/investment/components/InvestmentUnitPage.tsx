"use client";

import InvestmentUnitDetails from "@/features/investment/components/InvestmentUnitDetails";

interface InvestmentUnitPageProps {
  unitId: string;
}

function InvestmentUnitPage({ unitId }: InvestmentUnitPageProps) {
  return (
    <div className="page  pb-8 sm:pb-10">
      <InvestmentUnitDetails unitId={unitId} />
    </div>
  );
}

export default InvestmentUnitPage;
