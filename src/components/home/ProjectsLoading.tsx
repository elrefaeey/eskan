import { Skeleton } from "@/components/ui/skeleton";

export function ProjectsLoading() {
  return (
    <div className="mt-4 w-full md:mt-8 space-y-8">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="rounded-xl bg-[#E8E8E8] p-4">
          <div className="grid md:grid-cols-2 gap-2 lg:gap-8">
            <div className="flex flex-col gap-3">
              <Skeleton className="h-8 w-48 bg-gray-300" />
              <Skeleton className="h-5 w-64 bg-gray-300" />
              <Skeleton className="h-32 w-full bg-gray-300" />
              <Skeleton className="h-12 w-32 bg-gray-300" />
            </div>
            <Skeleton className="h-64 md:h-[450px] w-full bg-gray-300 rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
}
