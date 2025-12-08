import { MovieCard } from "./MovieCard";
import { MovieCardSkeleton } from "./MovieCardSkeleton";
import type { Movie } from "../utils/movieData";

interface MovieGridWithSkeletonProps {
  movies: Movie[];
  isLoading?: boolean;
  skeletonCount?: number;
}

export function MovieGridWithSkeleton({
  movies,
  isLoading,
  skeletonCount = 12,
}: MovieGridWithSkeletonProps) {
  return (
    <section className="py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white text-2xl font-semibold">Loading....</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {isLoading
            ? Array.from({ length: skeletonCount }).map((_, index) => (
                <MovieCardSkeleton key={index} />
              ))
            : movies.map((movie) => <MovieCard key={movie.id} {...movie} />)}
        </div>
      </div>
    </section>
  );
}
