import { MovieCard } from "../components/MovieCard";
import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import { useMovieStore } from "../stores/movieStore";

export function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const { searchMovies } = useMovieStore();
  const results = searchMovies(query);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="relative bg-gradient-to-b from-white/10 to-transparent border-b border-white/10">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-4 rounded-full bg-white/10 backdrop-blur-sm">
              <Search className="size-8 text-white" />
            </div>
            <div>
              <h1 className="text-white mb-2 text-2xl sm:text-5xl font-semibold">
                Search Results
              </h1>
              <p className="text-white/60">
                {results.length > 0
                  ? `Found ${results.length} ${
                      results.length === 1 ? "result" : "results"
                    } for "${query}"`
                  : `No results found for "${query}"`}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Results Grid */}
      <div className="container mx-auto px-4 py-8">
        {results.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {results.map((item) => (
              <MovieCard key={item.id} {...item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="inline-block p-6 rounded-full bg-white/5 mb-4">
              <Search className="size-12 text-white/40" />
            </div>
            <h3 className="text-white mb-2">No results found</h3>
            <p className="text-white/60 max-w-md mx-auto">
              Try searching with different keywords or browse our categories to
              find what you're looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
