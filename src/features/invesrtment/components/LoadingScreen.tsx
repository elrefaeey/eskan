"use client";

import React from "react";
import Image from "next/image";
import { ThreeCircles } from "react-loader-spinner";

export function LoadingScreen() {
  return (
    <main className="bg-[#FAFBFC] page flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center justify-center gap-4">
        <ThreeCircles
          visible={true}
          height="100"
          width="100"
          color="#1f503b"
          ariaLabel="three-circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
        <p className="text-primary text-lg sm:text-xl md:text-2xl font-semibold animate-pulse">
          جاري تحليل بياناتك...
        </p>
      </div>
    </main>
  );
}
