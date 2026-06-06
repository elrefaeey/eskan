"use client";

// ─── HeroSkeleton ─────────────────────────────────────────────────────────────
// Loading skeleton يُعرض عندما isLoading === true.
// لا يستلم props — الـ styling ثابت ومطابق لشكل Hero المكتمل.

export default function HeroSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden bg-white grid grid-cols-1 md:grid-cols-2">

      {/* Skeleton للجانب المرئي */}
      <div className="relative h-80 max-h-80 md:h-auto md:min-h-[300px] md:max-h-none rounded-2xl overflow-hidden">
        <div className="w-full h-full bg-primary/10 animate-pulse" />
      </div>

      {/* Skeleton لجانب المحتوى */}
      <div className="flex flex-col justify-between gap-4 p-6 md:p-8">
        <div className="space-y-3">
          <div className="h-6 bg-primary/10 rounded-full w-48 animate-pulse" />
          <div className="h-10 bg-primary/10 rounded w-64 animate-pulse" />
          <div className="h-4 bg-primary/10 rounded w-40 animate-pulse" />
          <div className="h-1 bg-primary/10 rounded w-10 animate-pulse" />
          <div className="h-20 bg-primary/10 rounded animate-pulse" />
        </div>
        <div className="h-12 bg-primary/10 rounded-xl w-full md:w-48 animate-pulse" />
      </div>

    </div>
  );
}
