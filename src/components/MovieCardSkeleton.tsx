export function MovieCardSkeleton() {
  return (
    <div className="group relative overflow-hidden rounded-lg bg-white/5 border border-white/10 animate-pulse">
      {/* Poster Image Skeleton */}
      <div className="aspect-[2/3] overflow-hidden bg-white/10">
        <div className="w-full h-full bg-gradient-to-br from-white/5 via-white/10 to-white/5 animate-shimmer bg-[length:200%_100%]" />
      </div>

      {/* Info Below Skeleton */}
      <div className="p-3">
        {/* Rating */}
        <div className="flex items-center gap-2 mb-1">
          <div className="size-3 rounded-full bg-white/10" />
          <div className="h-4 w-8 bg-white/10 rounded" />
        </div>

        {/* Title */}
        <div className="h-5 bg-white/10 rounded mb-2 w-3/4" />

        {/* Year */}
        <div className="h-4 bg-white/10 rounded w-16" />
      </div>
    </div>
  );
}
