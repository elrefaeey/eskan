"use client";

import { useEffect } from "react";
import type { FallbackProps } from "react-error-boundary";

export function ProjectsError({ error, resetErrorBoundary }: FallbackProps) {
  useEffect(() => {
    console.error("Projects Error:", error);
  }, [error]);

  return (
    <div className="mt-4 w-full md:mt-8 rounded-xl bg-red-50 border border-red-200 p-8 text-center">
      <div className="flex flex-col items-center gap-4">
        <div className="text-red-600 text-lg font-semibold">
          حدث خطأ في تحميل المشاريع
        </div>

        <button
          onClick={resetErrorBoundary}
          className="px-6 py-2 bg-[#1F503B] hover:bg-[#164029] text-white rounded-lg transition-colors"
        >
          إعادة المحاولة
        </button>
      </div>
    </div>
  );
}
