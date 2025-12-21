import { Play, Info, Star } from "lucide-react";
import { Button } from "./ui/button";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { useNavigate } from "react-router-dom";
import { MovieInfoModal } from "./MovieInfo";
import { useState } from "react";

import type { Movie } from "../utils/movieData";

interface MovieCardProps extends Movie {}

export function MovieCard({
  id,
  title,
  image,
  rating,
  year,
  genre,
  type,
  description,
  videoUrl,
  featured,
  trending,
  director,
  duration,
  casts,
}: MovieCardProps) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePlay = () => {
    navigate(`/play/${id}`);
  };

  const handleInfoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  return (
    <>
      <div
        onClick={handlePlay}
        className="group relative overflow-hidden rounded-lg bg-white/5 border border-white/10 hover:border-white/30 transition-all duration-300"
      >
        {/* Poster Image */}
        <div className="aspect-[2/3] overflow-hidden">
          <ImageWithFallback
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>

        {/* Overlay on Hover */}
        <div
          className="absolute z-10 inset-0 bg-gradient-to-t from-black via-black/80 pointer-events-none group-hover:pointer-events-auto
 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <Star className="size-4 text-white fill-white" />
            <span className="text-white">{rating}</span>
            <span className="text-white/60 ml-auto">{year}</span>
          </div>

          <h3 className="text-white mb-1">{title}</h3>
          <p className="text-white/60 mb-3">{genre}</p>

          <div className="flex gap-2">
            <Button
              size="sm"
              className="flex-1 bg-white text-black hover:bg-white/90"
              onClick={handlePlay}
            >
              <Play className="size-4 mr-1 fill-current" />
              Play
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-white/20 text-white bg-white/10"
              onClick={handleInfoClick}
            >
              <Info className="size-4" />
            </Button>
          </div>
        </div>

        {/* Info Below (visible by default on mobile) */}
        <div className="p-3 group-hover:opacity-0 md:opacity-100 transition-opacity">
          <div className="flex items-center gap-2 mb-1">
            <Star className="size-3 text-white fill-white" />
            <span className="text-white/90">{rating}</span>
          </div>
          <h3 className="text-white truncate">{title}</h3>
          <p className="text-white/60">{year}</p>

          {/* <div className="w-full flex gap-2 sm:hidden">
            <Button
              size="sm"
              className="flex-1 bg-white text-black hover:bg-white/90"
              onClick={handlePlay}
            >
              <Play className="size-4 mr-1 fill-current" />
              Play
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-white/20 text-white bg-white/10"
              onClick={handleInfoClick}
            >
              <Info className="size-4" />
            </Button>
          </div> */}
        </div>
      </div>
      <MovieInfoModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        movie={{
          id,
          title,
          image,
          rating,
          year,
          genre,
          type,
          description,
          featured,
          videoUrl,
          trending,
          director,
          duration,
          casts,
        }}
      />
    </>
  );
}
