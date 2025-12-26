import { MovieCard } from "../components/MovieCard";
import { Flame } from "lucide-react";
import { useMovieStore } from "../stores/movieStore";

export function Trending() {
  const { getTrendingMovies } = useMovieStore();
  const trendingContent = getTrendingMovies();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="relative bg-gradient-to-b from-white/10 to-transparent border-b border-white/10">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-4 rounded-full bg-white/10 backdrop-blur-sm">
              <Flame className="size-8 text-white" />
            </div>
            <h1 className="text-white text-2xl sm:text-5xl font-semibold">
              Trending Now
            </h1>
          </div>
          <p className="text-white/60 max-w-2xl">
            The hottest movies and TV shows everyone's talking about. Updated
            daily based on popularity and viewer ratings.
          </p>
        </div>
      </div>

      {/* Trending Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <p className="text-white/60 ">
            {trendingContent.length} trending{" "}
            {trendingContent.length === 1 ? "title" : "titles"}
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {trendingContent.map((item, index) => (
            <div key={item.id} className="relative">
              {/* Trending Rank Badge */}
              <div className="absolute -top-2 -left-2 z-10 size-10 rounded-full bg-white font-semibold text-gray-800 flex items-center justify-center shadow-xl">
                <span>{index + 1}</span>
              </div>
              <MovieCard {...item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
