// Home.tsx - Optimized version
import { Hero } from "../components/Hero";
import { MovieSection } from "../components/MovieSection";
import { CategoryCard } from "../components/CategoryCard";
import {
  Flame,
  Clock,
  Star,
  Zap,
  Heart,
  Laugh,
  Ghost,
  Rocket,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { useEffect } from "react";
import { useMovieStore } from "../stores/movieStore";
import { MovieGridWithSkeleton } from "@/components/MovieGridWithSkeleton";

export function Home() {
  const {
    movies,
    loading,
    error,
    fetchMovies,
    getTrendingMovies,
    getNewReleases,
    getTopRated,
  } = useMovieStore();

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500 text-xl">Error: {error}</div>
      </div>
    );
  }

  const trendingMovies = getTrendingMovies();
  const newReleases = getNewReleases();
  const topRated = getTopRated();

  const trendingCount = useMovieStore((state) => state.getTrendingCount());
  const topRatedCount = useMovieStore((state) => state.getTopRatedCount());
  const newReleasesCount = useMovieStore((state) =>
    state.getNewReleasesCount()
  );
  const comedyCount = useMovieStore((state) => state.getCountByGenre("Comedy"));
  const romanceCount = useMovieStore((state) =>
    state.getCountByGenre("Romance")
  );
  const horrorCount = useMovieStore((state) => state.getCountByGenre("Horror"));
  const sci = useMovieStore((state) => state.getCountByGenre("Sci-Fi"));
  const actionCount = useMovieStore((state) => state.getCountByGenre("Action"));

  return (
    <>
      <Hero />
      {/* Categories Section */}
      <section className="py-8 md:py-12 border-t border-white/10">
        <div className="container mx-auto px-4">
          <h2 className="text-white mb-6 text-2xl font-semibold">
            Browse by Category
          </h2>
          <div className="flex gap-2 mb-6">
            <Link to="/movies">
              <Button
                size="sm"
                variant="outline"
                className="border-white/20 bg-white "
              >
                All
              </Button>
            </Link>
            <Link to="/movies?country=korea">
              <Button
                size="sm"
                variant="outline"
                className="border-white/20 bg-gray-100/10 text-white"
              >
                🇰🇷 Korean
              </Button>
            </Link>

            <Link to="/movies?country=china">
              <Button
                size="sm"
                variant="outline"
                className="border-white/20 bg-gray-100/10 text-white"
              >
                🇨🇳 Chinese
              </Button>
            </Link>

            <Link to="/movies?country=japan">
              <Button
                size="sm"
                variant="outline"
                className="border-white/20 bg-gray-100/10 text-white"
              >
                🇯🇵 Japanese
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <Link to="/movies">
              <CategoryCard
                title="Action"
                icon={Zap}
                count={actionCount.toString()}
              />
            </Link>
            <Link to="/trending">
              <CategoryCard
                title="Trending"
                icon={Flame}
                count={trendingCount.toString()}
              />
            </Link>
            <Link to="/movies">
              <CategoryCard
                title="Top Rated"
                icon={Star}
                count={topRatedCount.toString()}
              />
            </Link>
            <Link to="/movies">
              <CategoryCard
                title="Recently Added"
                icon={Clock}
                count={newReleasesCount.toString()}
              />
            </Link>
            <Link to="/movies">
              <CategoryCard
                title="Romance"
                icon={Heart}
                count={romanceCount.toString()}
              />
            </Link>
            <Link to="/movies">
              <CategoryCard
                title="Comedy"
                icon={Laugh}
                count={comedyCount.toString()}
              />
            </Link>
            <Link to="/movies">
              <CategoryCard
                title="Horror"
                icon={Ghost}
                count={horrorCount.toString()}
              />
            </Link>
            <Link to="/movies">
              <CategoryCard
                title="Sci-Fi"
                icon={Rocket}
                count={sci.toString()}
              />
            </Link>
          </div>
        </div>
      </section>
      {loading && <MovieGridWithSkeleton movies={movies} isLoading={loading} />}
      {/* Movie Sections */}
      {trendingMovies.length > 0 && (
        <MovieSection title="Trending Now" movies={trendingMovies} />
      )}
      {newReleases.length > 0 && (
        <MovieSection title="New Releases" movies={newReleases} />
      )}
      {topRated.length > 0 && (
        <MovieSection title="Top Rated" movies={topRated} />
      )}
    </>
  );
}
