import Skeleton from "../components/Skeleton";

// Mirrors: header + filter bar + character card grid
export default function Loading() {
  return (
    <main className="flex w-full flex-col gap-10 px-4 py-8">
      {/* Page header */}
      <div className="flex flex-col gap-3 border-b border-bg-light/60 pb-4">
        <Skeleton className="h-4 w-24 rounded" />
        <Skeleton className="h-12 w-56 rounded-lg md:h-16 md:w-80" />
        <Skeleton className="h-5 w-full max-w-lg rounded" />
      </div>

      {/* Filter / search bar */}
      <div className="flex flex-wrap gap-3">
        <Skeleton className="h-10 w-full max-w-xs rounded-xl" />
        <Skeleton className="h-10 w-28 rounded-xl" />
        <Skeleton className="h-10 w-28 rounded-xl" />
      </div>

      {/* Character card grid */}
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8">
        {Array.from({ length: 24 }).map((_, i) => (
          <Skeleton key={i} className="aspect-[3/4] w-full rounded-2xl" />
        ))}
      </div>
    </main>
  );
}
