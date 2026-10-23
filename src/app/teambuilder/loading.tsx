import Skeleton from "../components/Skeleton";

// Mirrors: header + 4-slot team row + character picker grid
export default function Loading() {
  return (
    <main className="flex w-full flex-col gap-8 px-4 py-8">
      {/* Page header */}
      <div className="flex flex-col gap-3 border-b border-bg-light/60 pb-4">
        <Skeleton className="h-4 w-16 rounded" />
        <Skeleton className="h-12 w-56 rounded-lg md:h-16 md:w-72" />
        <Skeleton className="h-5 w-full max-w-xl rounded" />
      </div>

      {/* Team slots */}
      <div className="flex flex-col gap-4">
        <Skeleton className="h-5 w-24 rounded" />
        <div className="grid grid-cols-4 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="aspect-[3/4] w-full rounded-2xl" />
          ))}
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3">
        <Skeleton className="h-10 w-36 rounded-xl" />
        <Skeleton className="h-10 w-28 rounded-xl" />
      </div>

      {/* Character picker */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-9 w-full max-w-xs rounded-xl" />
          <Skeleton className="h-9 w-24 rounded-xl" />
          <Skeleton className="h-9 w-24 rounded-xl" />
        </div>
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10">
          {Array.from({ length: 20 }).map((_, i) => (
            <Skeleton key={i} className="aspect-square w-full rounded-xl" />
          ))}
        </div>
      </div>
    </main>
  );
}
