import { cn } from "@/app/utils/helper";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-lg bg-bg-lighter/60",
        className
      )}
      aria-hidden="true"
    />
  );
}

export function SkeletonCircle({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-full bg-bg-lighter/60",
        className
      )}
      aria-hidden="true"
    />
  );
}

export default Skeleton;
