"use client";
import React from "react";
import moneyicon from "@/features/eskan-wallet/assets/money.gif";
import { useParams } from "next/navigation";
import useProjectDetails from "@/features/eskan-wallet/hooks/useProjectDetails";
import ProjectHeader from "@/features/eskan-wallet/components/ProjectHeader";
import WalletUnitCard from "@/features/eskan-wallet/components/WalletUnit";
import Image from "next/image";

const ProjectWalletDetails = () => {
  const params = useParams<{ id: string }>();
  const id = params?.id;

  const { data, isLoading } = useProjectDetails(id);

  const units = data?.units ?? [];

  const normalize = (value: any) => {
    if (value === null || value === "null") return 0;
    return Number(value);
  };

  const reservedUnits = units.filter(
    (unit) => normalize(unit.contracted_shares) === Number(unit.shares_num)
  );

  const unReservedUnits = units.filter(
    (unit) => normalize(unit.contracted_shares) !== Number(unit.shares_num)
  );

  const newUnitsArray = [...unReservedUnits, ...reservedUnits];

  return (
    <div className="page">
      {isLoading ? (
        // Skeleton Loader
        <div className="container animate-pulse">
          <div className="h-10 bg-gray-300 rounded w-1/3 mb-4" />
          <div className="grid gap-6 mb-5 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-[250px] bg-gray-200 rounded-xl"
              ></div>
            ))}
          </div>
        </div>
      ) : (
        <>
          {data && <ProjectHeader data={data} />}
          <div className="container">
            <h3 className="mt-4 mb-3 flex items-center gap-2 lg:text-2xl text-[20px] font-bold">
              <Image className="w-[25px]" src={moneyicon} alt="money icon" />{" "}
              <span>حصص عقارية بعائد إيجاري </span>{" "}
            </h3>
            <div className="grid gap-6 mb-5 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
              {newUnitsArray.map((el) => (
                <WalletUnitCard key={el.id} unit={el} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProjectWalletDetails;
