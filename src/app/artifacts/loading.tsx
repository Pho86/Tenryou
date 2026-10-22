import Skeleton from "../components/Skeleton";

// Mirrors: header + artifact set cards (each set shows 5 piece icons + info)
export default function Loading() {
  return (
    <main className="flex w-full flex-col gap-10 px-4 py-8">
      {/* Page header */}
      <div className="flex flex-col gap-3 border-b border-bg-light/60 pb-4">
        <Skeleton className="h-4 w-24 rounded" />
        <Skeleton className="h-12 w-44 rounded-lg md:h-16 md:w-64" />
        <Skeleton className="h-5 w-full max-w-lg rounded" />
      </div>

      {/* Search */}
      <Skeleton className="h-10 w-full max-w-xs rounded-xl" />

      {/* Artifact set grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-3 rounded-2xl border border-bg-light/30 p-4">
            {/* Set icons row */}
            <div className="flex gap-2">
              {Array.from({ length: 5 }).map((_, j) => (
                <Skeleton key={j} className="h-10 w-10 rounded-lg" />
              ))}
            </div>
            <Skeleton className="h-5 w-3/4 rounded" />
            <Skeleton className="h-4 w-full rounded" />
            <Skeleton className="h-4 w-5/6 rounded" />
          </div>
        ))}
      </div>
    </main>
  );
}
