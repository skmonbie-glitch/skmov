// MovieSection.tsx - FIXED
import { ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { MovieCard } from "./MovieCard";
import { Link } from "react-router-dom";
import type { Movie } from "../utils/movieData";

interface MovieSectionProps {
  title: string;
  movies: Movie[];
}

export function MovieSection({ title, movies }: MovieSectionProps) {
  // console.log("Rendering MovieSection:", title, movies);

  return (
    <section className="py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white text-2xl font-semibold">{title}</h2>
          <Link to="/movies">
            <Button variant="ghost" className="text-white/80 ">
              See All
              <ChevronRight className="size-5 ml-1" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {movies.map((movie) => (
            <MovieCard key={movie.id} {...movie} />
          ))}
        </div>
      </div>
    </section>
  );
}
