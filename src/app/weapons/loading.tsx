import Skeleton from "../components/Skeleton";

// Mirrors: header + filter bar + weapon list rows
export default function Loading() {
  return (
    <main className="flex w-full flex-col gap-10 py-8">
      {/* Page header */}
      <div className="flex flex-col gap-3 border-b border-bg-light/60 pb-4">
        <Skeleton className="h-4 w-24 rounded" />
        <Skeleton className="h-12 w-44 rounded-lg md:h-16 md:w-64" />
        <Skeleton className="h-5 w-full max-w-md rounded" />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <Skeleton className="h-10 w-full max-w-xs rounded-xl" />
        <Skeleton className="h-10 w-28 rounded-xl" />
        <Skeleton className="h-10 w-28 rounded-xl" />
      </div>

      {/* Weapon grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {Array.from({ length: 18 }).map((_, i) => (
          <Skeleton key={i} className="aspect-square w-full rounded-2xl" />
        ))}
      </div>
    </main>
  );
}
