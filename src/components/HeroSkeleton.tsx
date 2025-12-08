export function HeroSkeleton() {
  return (
    <div className="relative h-[70vh] md:h-[85vh] w-full overflow-hidden bg-white/5 animate-pulse">
      {/* Background Image Skeleton */}
      <div className="absolute inset-0">
        <div className="w-full h-full bg-gradient-to-br from-white/10 via-white/5 to-white/10 animate-shimmer bg-[length:200%_100%]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent" />
      </div>

      {/* Content Skeleton */}
      <div className="relative container mx-auto px-4 h-full flex items-end md:items-center">
        <div className="max-w-2xl pb-12 md:pb-0 w-full">
          {/* Featured Badge Skeleton */}
          <div className="inline-block px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded mb-4">
            <div className="h-5 w-20 bg-white/10 rounded" />
          </div>

          {/* Title Skeleton */}
          <div className="mb-4 space-y-3">
            <div className="h-10 md:h-12 bg-white/10 rounded w-4/5" />
            <div className="h-10 md:h-12 bg-white/10 rounded w-3/5" />
          </div>

          {/* Description Skeleton */}
          <div className="mb-6 md:mb-8 space-y-2">
            <div className="h-5 bg-white/10 rounded w-full" />
            <div className="h-5 bg-white/10 rounded w-11/12" />
            <div className="h-5 bg-white/10 rounded w-4/5" />
          </div>

          {/* Meta Info Skeleton */}
          <div className="flex items-center gap-3 mb-6">
            <div className="h-5 w-12 bg-white/10 rounded" />
            <span className="text-white/40">•</span>
            <div className="h-5 w-16 bg-white/10 rounded" />
            <span className="text-white/40">•</span>
            <div className="h-5 w-32 bg-white/10 rounded" />
          </div>

          {/* Buttons Skeleton */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="h-10 w-full sm:w-32 bg-white/10 rounded" />
            <div className="h-10 w-full sm:w-32 bg-white/10 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
