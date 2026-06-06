// hooks/useCityCenterUnits.ts
import { useState } from "react";

interface Unit {
  id: number;
  number: string;
  space: number;
  meter_price: number;
  advance: number;
  installment: number;
  revenue: string;
  img: string;
  section?: string;
  appear?: number;
  contract?: any;
}

export default function useCityCenterUnits(section: string = "بازار") {
  const electronicsUnits: Unit[] = [
    {
      id: 149,
      number: "469",
      space: 8,
      meter_price: 102000,
      advance: 408000,
      installment: 13600,
      revenue: "14280",
      img: "https://back.mansoura-eco-build.com/storage/app/public/images/Bazar/VjqbzTusءسءء.jpg",
      section: "الكترونيات",
      appear: 1,
      contract: null,
    },
  ];

  const bazarUnits: Unit[] = [
    {
      id: 4,
      number: "504",
      space: 14,
      meter_price: 81000,
      advance: 400000,
      installment: 15300,
      revenue: "23625",
      img: "https://back.mansoura-eco-build.com/storage/app/public/images/Bazar/9ZgFKWYU504 copy.jpg",
      section: "بازار",
    },
    {
      id: 20,
      number: "520",
      space: 20,
      meter_price: 82000,
      advance: 820000,
      installment: 17083,
      revenue: "34166",
      img: "https://back.mansoura-eco-build.com/storage/app/public/images/Bazar/9ZgFKWYU504 copy.jpg",
      section: "بازار",
    },
    {
      id: 22,
      number: "522",
      space: 23,
      meter_price: 82000,
      advance: 943000,
      installment: 19645,
      revenue: "39291",
      img: "https://back.mansoura-eco-build.com/storage/app/public/images/Bazar/9ZgFKWYU504 copy.jpg",
      section: "بازار",
    },
  ];

  const allUnits = {
    الكترونيات: electronicsUnits,
    بازار: bazarUnits,
  };

  const [data] = useState({
    data: allUnits[section as keyof typeof allUnits] || [],
  });
  const [isLoading] = useState(false);

  const handlePaginate = () => {
    console.log("Pagination clicked - static mode");
  };

  return { data, isLoading, handlePaginate };
}
