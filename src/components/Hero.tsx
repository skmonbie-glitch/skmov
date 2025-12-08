import { useEffect, useState } from "react";
import { Play, Info } from "lucide-react";
import { Button } from "./ui/button";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { useMovieStore } from "../stores/movieStore";
import { useNavigate } from "react-router-dom";
import { MovieInfoModal } from "./MovieInfo";
import { HeroSkeleton } from "./HeroSkeleton";

export function Hero() {
  const movies = useMovieStore((s) => s.movies);
  const loading = useMovieStore((s) => s.loading);

  const featuredMovies = movies.filter((m) => m.featured);
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInfoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (featuredMovies.length === 0) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % featuredMovies.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [featuredMovies.length]);

  if (loading) return <HeroSkeleton />;

  if (featuredMovies.length === 0) return null;

  const movie = featuredMovies[index];

  const handlePlay = ({ id }: { id: string }) => {
    navigate(`/play/${id}`);
  };

  return (
    <>
      <div className="relative h-[70vh] md:h-[85vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src={movie.image}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent" />
        </div>

        <div className="relative container mx-auto px-4 h-full flex items-end md:items-center">
          <div className="max-w-2xl pb-12 md:pb-0">
            <div className="inline-block px-3 py-1 bg-white/10 border border-white/20 rounded mb-4 backdrop-blur-sm">
              <span className="text-white/90">Featured</span>
            </div>

            <h1 className="text-white mb-4 text-2xl sm:text-5xl font-semibold">
              {movie.title}
            </h1>

            <p className="text-white/80 mb-6 md:mb-8">{movie.description}</p>

            <div className="flex items-center gap-3 mb-6">
              <span className="text-white/60">{movie.year}</span>
              <span className="text-white/40">•</span>
              <span className="text-white/60">⭐ {movie.rating}</span>
              <span className="text-white/40">•</span>
              <span className="text-white/60">{movie.genre}</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={() => handlePlay({ id: movie.id! })}
                className="bg-white text-black hover:bg-white/90"
              >
                <Play className="size-5 mr-2 fill-current" /> Play Now
              </Button>

              <Button
                variant="outline"
                onClick={handleInfoClick}
                className="border-white/20 hover:bg-white/10 hover:text-white"
              >
                <Info className="size-5 mr-2" /> More Info
              </Button>
            </div>
          </div>
        </div>
      </div>
      <MovieInfoModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        movie={movie}
      />
    </>
  );
}
