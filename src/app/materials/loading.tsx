import Skeleton from "../components/Skeleton";

// Mirrors: header + material icon grid with labels
export default function Loading() {
  return (
    <main className="flex w-full flex-col gap-10 px-4 py-8">
      {/* Page header */}
      <div className="flex flex-col gap-3 border-b border-bg-light/60 pb-4">
        <Skeleton className="h-4 w-24 rounded" />
        <Skeleton className="h-12 w-48 rounded-lg md:h-16 md:w-72" />
        <Skeleton className="h-5 w-full max-w-lg rounded" />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <Skeleton className="h-10 w-full max-w-xs rounded-xl" />
        <Skeleton className="h-10 w-28 rounded-xl" />
      </div>

      {/* Material icon grid */}
      <div className="grid grid-cols-4 gap-3 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12">
        {Array.from({ length: 36 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <Skeleton className="aspect-square w-full rounded-xl" />
            <Skeleton className="h-3 w-full rounded" />
          </div>
        ))}
      </div>
    </main>
  );
}
