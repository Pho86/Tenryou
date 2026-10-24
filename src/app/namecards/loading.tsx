import Skeleton from "../components/Skeleton";

// Mirrors: header + wide namecard grid (landscape aspect ratio)
export default function Loading() {
  return (
    <main className="flex w-full flex-col gap-10 py-8">
      {/* Page header */}
      <div className="flex flex-col gap-3 border-b border-bg-light/60 pb-4">
        <Skeleton className="h-4 w-28 rounded" />
        <Skeleton className="h-12 w-44 rounded-lg md:h-16 md:w-64" />
        <Skeleton className="h-5 w-full max-w-sm rounded" />
      </div>

      {/* Search */}
      <Skeleton className="h-10 w-full max-w-xs rounded-xl" />

      {/* Namecard grid — landscape cards */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 16 }).map((_, i) => (
          <Skeleton key={i} className="aspect-[2/1] w-full rounded-2xl" />
        ))}
      </div>
    </main>
  );
}
