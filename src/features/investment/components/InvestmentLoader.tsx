"use client";

import { cn } from "@/lib/utils";

function SkeletonBar({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-lg bg-gradient-to-l from-[#E8ECE9] via-[#F3FAF6] to-[#E8ECE9] animate-pulse",
        className,
      )}
    />
  );
}

export function InvestmentMessageSkeleton() {
  return (
    <div className="mb-6 sm:mb-8 flex items-start gap-3 sm:gap-4">
      <SkeletonBar className="shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-full" />
      <div className="flex-1 space-y-2.5 min-w-0">
        <SkeletonBar className="h-3.5 w-24" />
        <div className="rounded-2xl border border-[#498E56]/10 bg-white p-4 space-y-2.5 shadow-sm">
          <SkeletonBar className="h-3 w-full" />
          <SkeletonBar className="h-3 w-[92%]" />
          <SkeletonBar className="h-3 w-[78%]" />
          <SkeletonBar className="h-3 w-[85%]" />
        </div>
      </div>
    </div>
  );
}

export function InvestmentUnitsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="overflow-hidden rounded-2xl border border-[#498E56]/10 bg-white shadow-[0_8px_24px_rgba(31,80,59,0.06)]"
        >
          <SkeletonBar className="h-44 rounded-none" />
          <div className="space-y-3 p-4">
            <SkeletonBar className="h-5 w-2/3 mx-auto" />
            <div className="grid grid-cols-2 gap-2">
              <SkeletonBar className="h-14" />
              <SkeletonBar className="h-14" />
              <SkeletonBar className="h-14" />
              <SkeletonBar className="h-14" />
            </div>
            <SkeletonBar className="h-11 rounded-xl" />
          </div>
        </div>
      ))}
    </div>
  );
}
