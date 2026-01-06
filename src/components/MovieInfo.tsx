import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Play, Star, Calendar, Film as FilmIcon, X } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { useNavigate } from "react-router-dom";

import type { Movie } from "../utils/movieData";

interface MovieInfoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  movie: Movie;
}

export function MovieInfoModal({
  open,
  onOpenChange,
  movie,
}: MovieInfoModalProps) {
  const navigate = useNavigate();

  const handlePlay = () => {
    navigate(`/play/${movie.id}`);
    onOpenChange(false);
  };

  const genres = Array.isArray(movie.genre)
    ? movie.genre.map((g: any) => (typeof g === "string" ? g : g.name))
    : typeof movie.genre === "string"
    ? (movie.genre as string).split(",").map((g) => g.trim())
    : [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0 bg-black border border-white/20 overflow-hidden">
        <DialogTitle className="sr-only">{movie.title}</DialogTitle>

        {/* Hero Image */}
        <div className="relative aspect-video bg-black">
          <ImageWithFallback
            src={movie.image}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

          {/* Close Button */}
          <button
            onClick={() => onOpenChange(false)}
            aria-label="Close"
            className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors z-10"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Button
              size="lg"
              className="bg-white text-black hover:bg-white/90"
              onClick={handlePlay}
            >
              <Play className="h-6 w-6 mr-2" />
              Play Now
            </Button>
          </div>
        </div>

        {/* Movie Info */}
        <div className="p-6 md:p-8">
          <h2 className="text-white text-2xl font-semibold mb-3">
            {movie.title}
          </h2>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-3 mb-4 text-sm">
            <div className="flex items-center gap-1">
              <Star className="h-5 w-5 text-white" />
              <span className="text-white">{movie.rating}</span>
            </div>
            <span className="text-white/40">•</span>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4 text-white/60" />
              <span className="text-white/80">{movie.year}</span>
            </div>
            <span className="text-white/40">•</span>
            <div className="flex items-center gap-1">
              <div className="flex flex-wrap gap-2">
                {movie.genre.map((g) => (
                  <span
                    key={g}
                    className="px-3 py-1 bg-white/10 border border-white/20 capitalize rounded-full text-white/90 text-sm"
                  >
                    {g}
                  </span>
                ))}
              </div>
            </div>
            <span className="text-white/40">•</span>
            <div className="px-3 py-1 bg-white/10 border border-white/20 rounded">
              <span className="text-white/90">
                {movie.type === "movie" ? "Movie" : "TV Show"}
              </span>
            </div>
          </div>

          <div className="max-h-40 sm:max-h-60 overflow-y-auto pr-2">
            {/* Description */}
            <p className="text-white/70 leading-relaxed mb-6 line-clamp-5">
              {movie.description}
            </p>

            {/* Additional Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-white/5 border border-white/10 rounded-lg mb-6">
              <div>
                <h3 className="text-white/60 mb-1">Director</h3>

                <p className="text-white">{movie.director || "Unknown"}</p>
              </div>
              <div>
                <h3 className="text-white/60 mb-1">Cast</h3>
                <div className="flex gap-1 text-white">
                  {(() => {
                    const castString = movie?.casts?.join(" | ") || "";
                    const truncated =
                      castString.length > 20
                        ? castString.slice(0, 20) + "..."
                        : castString;
                    return truncated || "N/A";
                  })()}
                </div>
              </div>
              <div>
                <h3 className="text-white/60 mb-1">Duration</h3>
                <p className="text-white">{movie.duration || "N/A"}</p>
              </div>
            </div>
            {genres.length > 0 && (
              <div className="mb-6">
                <h3 className="text-white/60 mb-2 text-sm">Genres</h3>
                <div className="flex flex-wrap gap-2">
                  {genres.map((genre) => (
                    <span
                      key={genre}
                      className="px-3 py-1 bg-white/10 border border-white/20 capitalize rounded text-white/90 text-sm"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              className="flex-1 bg-white text-black hover:bg-white/90"
              onClick={handlePlay}
            >
              <Play className="h-5 w-5 mr-2" />
              Watch Now
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
