import Skeleton from "../components/Skeleton";

// Mirrors: header + category sidebar/tabs + achievement list rows
export default function Loading() {
  return (
    <main className="relative flex w-full flex-col gap-10 px-4 py-8">
      {/* Page header */}
      <div className="flex flex-col gap-3 border-b border-bg-light/60 pb-4">
        <Skeleton className="h-4 w-20 rounded" />
        <Skeleton className="h-12 w-56 rounded-lg md:h-16 md:w-72" />
        <Skeleton className="h-5 w-full max-w-md rounded" />
      </div>

      {/* Search */}
      <Skeleton className="h-10 w-full max-w-xs rounded-xl" />

      {/* Category tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-9 w-32 flex-shrink-0 rounded-full" />
        ))}
      </div>

      {/* Achievement rows */}
      <div className="flex flex-col gap-2">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 rounded-xl border border-bg-light/20 px-4 py-3">
            <Skeleton className="h-10 w-10 flex-shrink-0 rounded-lg" />
            <div className="flex flex-1 flex-col gap-2">
              <Skeleton className="h-4 w-1/2 rounded" />
              <Skeleton className="h-3 w-3/4 rounded" />
            </div>
            <Skeleton className="h-6 w-16 flex-shrink-0 rounded-full" />
          </div>
        ))}
      </div>
    </main>
  );
}
