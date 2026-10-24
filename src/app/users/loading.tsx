import Skeleton from "@/app/components/Skeleton";

// Mirrors the hero split layout on the users search page
export default function Loading() {
  return (
    <div className="flex min-h-[62dvh] flex-col justify-center py-10 sm:py-16 lg:min-h-[calc(100dvh-14rem)] lg:py-24">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(26rem,0.9fr)] lg:items-center lg:gap-16 xl:gap-24">
        {/* Left: headline + description */}
        <div className="flex max-w-2xl flex-col gap-5">
          <Skeleton className="h-12 w-3/4 rounded-xl sm:h-14 xl:h-16" />
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-5/6 rounded" />
          <Skeleton className="h-4 w-4/6 rounded" />
        </div>

        {/* Right: search form placeholder */}
        <div className="flex flex-col gap-4 rounded-2xl border border-bg-light/30 p-6">
          <Skeleton className="h-5 w-32 rounded" />
          <Skeleton className="h-11 w-full rounded-xl" />
          <Skeleton className="h-11 w-full rounded-xl" />
          <Skeleton className="h-11 w-32 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
