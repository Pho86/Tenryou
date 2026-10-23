import Skeleton, { SkeletonCircle } from "@/app/components/Skeleton";

export default function Loading() {
  return (
    <div className="flex min-h-[70dvh] w-full flex-col gap-6 py-8">
      <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
        <div className="flex items-center gap-4">
          <SkeletonCircle className="h-20 w-20 sm:h-24 sm:w-24" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-8 w-48 sm:w-64" />
            <Skeleton className="h-4 w-36 sm:w-44" />
          </div>
        </div>
        <Skeleton className="h-10 w-full max-w-xs rounded-xl sm:w-64" />
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <Skeleton key={i} className="aspect-[4/5] w-full rounded-2xl" />
        ))}
      </div>
    </div>
  );
}
