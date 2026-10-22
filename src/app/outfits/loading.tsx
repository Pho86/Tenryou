import Skeleton from "../components/Skeleton";

// Mirrors: header + outfit cards with character icon + name
export default function Loading() {
  return (
    <main className="flex w-full flex-col gap-10 py-8">
      {/* Page header */}
      <div className="flex flex-col gap-3 border-b border-bg-light/60 pb-4">
        <Skeleton className="h-4 w-28 rounded" />
        <Skeleton className="h-12 w-36 rounded-lg md:h-16 md:w-52" />
        <Skeleton className="h-5 w-full max-w-lg rounded" />
      </div>

      {/* Outfit cards grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {Array.from({ length: 15 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-2 rounded-2xl border border-bg-light/30 p-3">
            <Skeleton className="aspect-[3/4] w-full rounded-xl" />
            <Skeleton className="h-4 w-3/4 rounded" />
            <Skeleton className="h-3 w-1/2 rounded" />
          </div>
        ))}
      </div>
    </main>
  );
}
