import { create } from "zustand";
import type { Movie } from "../utils/movieData";
import { fetchAllMovies } from "../utils/movieService";

interface MovieStore {
  movies: Movie[];
  loading: boolean;
  error: string | null;

  // Actions
  fetchMovies: () => Promise<void>;
  // Selectors (computed values)
  getMoviesByType: (type: "movie" | "tv") => Movie[];
  getTrendingMovies: () => Movie[];
  getTopRated: () => Movie[];
  getNewReleases: () => Movie[];
  // NEW — Search Functionality
  searchMovies: (query: string) => Movie[];
  // NEW — Category Counts
  getCountByGenre: (genre: string) => number;
  getTrendingCount: () => number;
  getTopRatedCount: () => number;
  getNewReleasesCount: () => number;
  // NEW — Featured Movies
  getFeaturedMovies: () => Movie[];
}

export const useMovieStore = create<MovieStore>((set, get) => ({
  movies: [],
  loading: false,
  error: null,

  // Actions
  fetchMovies: async () => {
    set({ loading: true, error: null });
    try {
      const movies = await fetchAllMovies();
      set({ movies, loading: false });
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Failed to fetch movies",
        loading: false,
      });
    }
  },

  // Selectors
  getMoviesByType: (type) => {
    return get().movies.filter((movie) => movie.type === type);
  },

  getTrendingMovies: () => {
    return get().movies.filter((movie) => movie.trending);
  },

  getTopRated: () => {
    return get()
      .movies.filter((movie) => movie.rating >= 9.0)
      .sort((a, b) => b.rating - a.rating);
  },

  getNewReleases: () => {
    return get().movies.filter((movie) => movie.year === "2024");
  },

  // NEW — Search Functionality
  searchMovies: (query) => {
    const lowerQuery = query.toLowerCase();
    return get().movies.filter(
      (movie) =>
        movie.title.toLowerCase().includes(lowerQuery) ||
        movie.genre.some((g) => g.toLowerCase().includes(lowerQuery)) ||
        movie.description.toLowerCase().includes(lowerQuery)
    );
  },
  // NEW — Category Counts
  getCountByGenre: (genre) => {
    return get().movies.filter((movie) =>
      movie.genre.some((g) => g.toLowerCase().includes(genre.toLowerCase()))
    ).length;
  },

  getTrendingCount: () => {
    return get().movies.filter((movie) => movie.trending).length;
  },

  getTopRatedCount: () => {
    return get().movies.filter((movie) => movie.rating >= 9.0).length;
  },

  getNewReleasesCount: () => {
    return get().movies.filter((movie) => movie.year === "2024").length;
  },

  // NEW — Featured Movies
  getFeaturedMovies: () => {
    return get().movies.filter((movie) => movie.featured === true);
  },
}));
