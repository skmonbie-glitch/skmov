export type Movie = {
  id: string;
  type: "movie" | "tv";
  featured: boolean;
  trending: boolean;
  rating: number;
  year: string;
  title: string;
  genre: string[];
  description: string;
  image: string;
  videoUrl: string;
  director: string;
  duration: string;
  casts: Array<string>;
  country?: string;
};

export const getMoviesByType = (movies: Movie[], type: "movie" | "tv") => {
  return movies.filter((movie) => movie.type === type);
};

export const getTrendingMovies = (movies: Movie[]) => {
  return movies.filter((movie) => movie.trending);
};

export const getTopRated = (movies: Movie[]) => {
  return movies
    .filter((movie) => movie.rating >= 9.0)
    .sort((a, b) => b.rating - a.rating);
};

export const getNewReleases = (movies: Movie[]) => {
  return movies.filter((movie) => movie.year === "2024");
};

export const searchMovies = (movies: Movie[], query: string) => {
  const lowerQuery = query.toLowerCase();
  return movies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(lowerQuery) ||
      movie.genre.some((g) => g.toLowerCase().includes(lowerQuery)) ||
      movie.description.toLowerCase().includes(lowerQuery)
  );
};
