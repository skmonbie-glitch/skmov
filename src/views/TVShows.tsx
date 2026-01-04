import { MovieCard } from "../components/MovieCard";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { Filter } from "lucide-react";
import { useMovieStore } from "../stores/movieStore";

export function TVShows() {
  const { getMoviesByType } = useMovieStore();

  const allShows = getMoviesByType("tv");

  const [selectedGenre, setSelectedGenre] = useState<string>("All");
  const [sortBy, setSortBy] = useState<"rating" | "year">("rating");

  // 🔧 Normalize genre once
  const normalizeGenres = (genre: any): string[] => {
    if (Array.isArray(genre)) {
      return genre.map((g) => (typeof g === "string" ? g : g.name));
    }

    if (typeof genre === "string") {
      return genre.split(",").map((g) => g.trim());
    }

    return [];
  };

  // 🔧 Build genre filter buttons correctly
  const genres = [
    "All",
    ...Array.from(
      new Set(allShows.flatMap((show) => normalizeGenres(show.genre)))
    ),
  ];

  const filteredShows = allShows
    .filter((show) => {
      const showGenres = normalizeGenres(show.genre);

      const genreMatch =
        selectedGenre === "All" || showGenres.includes(selectedGenre);

      return genreMatch;
    })
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      return b.year.localeCompare(a.year);
    });

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="relative bg-gradient-to-b from-white/10 to-transparent border-b border-white/10">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <h1 className="text-white mb-4 text-2xl sm:text-5xl font-semibold">
            TV Shows
          </h1>
          <p className="text-white/60 max-w-2xl">
            Binge-watch the latest and greatest TV shows. From gripping dramas
            to hilarious comedies.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="sticky top-16 z-40 bg-black/95 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="size-5 text-white/60" />
              <span className="text-white/60">Filter by:</span>
              <div className="flex flex-wrap gap-2">
                {genres.map((genre) => (
                  <Button
                    key={genre}
                    size="sm"
                    variant={selectedGenre === genre ? "default" : "outline"}
                    onClick={() => setSelectedGenre(genre)}
                    className={
                      selectedGenre === genre
                        ? "bg-white text-black hover:bg-white/90"
                        : "border-white/20 text-white bg-white/10 capitalize"
                    }
                  >
                    {genre}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-white/60">Sort by:</span>
              <Button
                size="sm"
                variant={sortBy === "rating" ? "default" : "outline"}
                onClick={() => setSortBy("rating")}
                className={
                  sortBy === "rating"
                    ? "bg-white text-black hover:bg-white/90"
                    : "border-white/20 text-white bg-white/10"
                }
              >
                Rating
              </Button>
              <Button
                size="sm"
                variant={sortBy === "year" ? "default" : "outline"}
                onClick={() => setSortBy("year")}
                className={
                  sortBy === "year"
                    ? "bg-white text-black hover:bg-white/90"
                    : "border-white/20 text-white bg-white/10"
                }
              >
                Year
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* TV Shows Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-4">
          <p className="text-white/60">
            Showing {filteredShows.length}{" "}
            {filteredShows.length === 1 ? "show" : "shows"}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {filteredShows.map((show) => (
            <MovieCard key={show.id} {...show} />
          ))}
        </div>
      </div>
    </div>
  );
}
