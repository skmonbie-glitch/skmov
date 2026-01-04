import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Star,
  Calendar,
  Film as FilmIcon,
  // Play,
  // Plus,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { MovieCard } from "../components/MovieCard";
import { useEffect } from "react";
import { useMovieStore } from "../stores/movieStore";
// import { ImageWithFallback } from "@/figma/ImageWithFallback";

export function PlayVideo() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { movies, fetchMovies, loading } = useMovieStore();

  useEffect(() => {
    if (movies.length === 0) {
      fetchMovies();
    }
  }, []);

  const movie = movies.find((m) => m.id === String(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-white">Loading the movie...</p>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-white mb-4">Movie not found</h2>
          <Button
            onClick={() => navigate("/")}
            className="bg-white text-black hover:bg-white/90"
          >
            <ArrowLeft className="size-4 mr-2" />
            Go Home
          </Button>
        </div>
      </div>
    );
  }

  // Related movies (same genre, different movie)
  const relatedMovies = movies
    .filter((m) => m.genre === movie.genre && m.id !== movie.id)
    .slice(0, 6);

  return (
    <div className="min-h-screen">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-4">
        <Button
          onClick={() => navigate(-1)}
          variant="ghost"
          className="text-white "
        >
          <ArrowLeft className="size-5 mr-2" />
          Back
        </Button>
      </div>

      {/* Video Player ,autoplay */}
      <div className="relative bg-black">
        <div className="container mx-auto">
          <div className="aspect-video bg-black">
            <iframe
              src={movie.videoUrl}
              loading="lazy"
              allow="accelerometer; gyroscope; encrypted-media; picture-in-picture;"
              allowFullScreen
              className="w-full h-full rounded-md border-0"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Movie Info */}
      <div className="relative">
        <div className="absolute inset-0  pointer-events-none" />

        <div className="container mx-auto px-4 py-8">
          {/* Title and Meta */}
          <div className="mb-6">
            <h1 className="text-white mb-4 text-2xl font-semibold">
              {movie.title}
            </h1>

            <div className="">
              <div className="flex items-start gap-2">
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="w-20 h-30 object-cover rounded"
                />

                <div>
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Star className="size-5 text-white fill-white" />
                      <span className="text-white">{movie.rating}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="size-5 text-white/60" />
                      <span className="text-white/60">{movie.year}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-white/60 flex flex-wrap gap-2 ">
                        {movie.genre.map((g) => (
                          <span
                            key={g}
                            className="px-3 py-1 bg-white/10 border border-white/20 capitalize rounded-full text-white/90 text-sm"
                          >
                            {g}
                          </span>
                        ))}
                      </span>
                    </div>
                    <div className="px-3 py-1 bg-white/10 border text-sm border-white/20 rounded">
                      <span className="text-white/90">
                        {movie.type === "movie" ? "Movie" : "TV Show"}
                      </span>
                    </div>
                  </div>

                  <p className="text-white/80 max-w-3xl mb-6">
                    {movie.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}

            <div className="flex flex-wrap gap-3">
              {/* <Button className="bg-white text-black hover:bg-white/90">
                <Play className="size-5 mr-2 fill-current" />
                Watch Again
              </Button> */}
              {/* <Button
                variant="outline"
                className="border-white/20 hover:text-white hover:bg-white/10"
              >
                <Plus className="size-5 mr-2" />
                Add to List
              </Button> */}
              {/* <Button
                variant="outline"
                className="border-white/20 hover:text-white hover:bg-white/10"
              >
                <Share2 className="size-5 mr-2" />
                Share
              </Button> */}
            </div>
          </div>

          {/* Additional Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 p-6 bg-white/5 border border-white/10 rounded-lg">
            <div>
              <h3 className="text-white/60 mb-2">Director</h3>
              <p className="text-white">{movie.director || "N/A"}</p>
            </div>
            <div>
              <h3 className="text-white/60 mb-2">Cast</h3>
              <div className="flex gap-1 text-white">
                {(() => {
                  const castString = movie?.casts?.join(" | ") || "";
                  const truncated =
                    castString.length > 100
                      ? castString.slice(0, 100) + "..."
                      : castString;
                  return truncated || "N/A";
                })()}
              </div>
            </div>
            <div>
              <h3 className="text-white/60 mb-2">Duration</h3>
              <p className="text-white">{movie.duration || "N/A"}</p>
            </div>
          </div>

          {/* Related Movies */}
          {relatedMovies.length > 0 && (
            <div className="mt-12">
              <h2 className="text-white mb-6">More Like This</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {relatedMovies.map((relatedMovie) => (
                  <MovieCard key={relatedMovie.id} {...relatedMovie} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
