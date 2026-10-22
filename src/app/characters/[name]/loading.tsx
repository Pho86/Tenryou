import Skeleton, { SkeletonCircle } from "@/app/components/Skeleton";

// Mirrors CharacterInfo: banner + stat block + section nav + tab content
export default function Loading() {
  return (
    <div className="flex w-full flex-col gap-8">
      {/* Banner / hero */}
      <Skeleton className="h-56 w-full rounded-2xl md:h-72 lg:h-80" />

      {/* Name + element + stars row */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-20 rounded" />
          <Skeleton className="h-10 w-48 rounded-lg md:h-12 md:w-64" />
          <Skeleton className="h-4 w-32 rounded" />
        </div>
        <div className="flex gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <SkeletonCircle key={i} className="h-6 w-6" />
          ))}
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-16 rounded-xl" />
        ))}
      </div>

      {/* Section nav tabs */}
      <div className="flex gap-2 overflow-x-auto">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-9 w-24 flex-shrink-0 rounded-full" />
        ))}
      </div>

      {/* Tab content placeholder */}
      <div className="flex flex-col gap-4">
        <Skeleton className="h-6 w-40 rounded" />
        <Skeleton className="h-32 w-full rounded-xl" />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Skeleton className="h-24 rounded-xl" />
          <Skeleton className="h-24 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
