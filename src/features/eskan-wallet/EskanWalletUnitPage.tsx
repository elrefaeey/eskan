"use client";

import { useParams } from "next/navigation";
import UnitWalletDetails from "@/features/eskan-wallet/components/UnitWalletDetails";

export default function EskanWalletUnitPage() {
  const params = useParams();
  const unitId = params?.unitId as string;

  return <div className="page  pb-4"><UnitWalletDetails unitId={unitId} /></div>;
}
