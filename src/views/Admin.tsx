import { useState, useEffect } from "react";
import { Edit, Trash2, Plus, LogOut, User2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { AdminEditModal } from "../components/AdminEditModal";
import type { Movie } from "../utils/movieData";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { toast } from "sonner";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";

export function Admin() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const moviesCollection = collection(db, "movies");
      const moviesSnapshot = await getDocs(moviesCollection);

      const moviesList = moviesSnapshot.docs.map((d) => ({
        id: d.id,
        ...(d.data() as Omit<Movie, "id">),
      }));

      setMovies(moviesList);
    } catch (error) {
      console.error("Error fetching movies:", error);
      toast.error("Failed to fetch movies");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleEdit = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setSelectedMovie(null);
    setIsModalOpen(true);
  };

  const handleSave = async (movie: Movie) => {
    try {
      if (selectedMovie) {
        // Update existing movie
        const movieRef = doc(db, "movies", selectedMovie.id!);
        await updateDoc(movieRef, { ...movie });
        toast.success("Movie updated successfully!");
      } else {
        // Add new movie
        await addDoc(collection(db, "movies"), movie);
        toast.success("Movie added successfully!");
      }
      fetchMovies();
    } catch (error) {
      console.error("Error saving movie:", error);
      toast.error("Failed to save movie");
    }
  };

  const handleDelete = async (id: string) => {
    if (id && window.confirm("Are you sure you want to delete this movie?")) {
      try {
        const movieRef = doc(db, "movies", id);
        await deleteDoc(movieRef);
        toast.success("Movie deleted successfully!");
        fetchMovies();
      } catch (error) {
        console.error("Error deleting movie:", error);
        toast.error("Failed to delete movie");
      }
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Signed out successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Failed to sign out");
    }
  };

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

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
    ...Array.from(
      new Set(filteredMovies.flatMap((show) => normalizeGenres(show.genre)))
    ),
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="sm:text-3xl pb-2 text-xl font-semibold">Admin</h1>
        <div className="flex justify-between flex-wrap gap-y-2 items-center mb-8">
          <div className="flex justify-between gap-2 items-center">
            <p className="text-white/60 sm:text-sm text-xs border-white/20 border p-2 rounded-lg ">
              <span className="text-white flex gap-1">
                <User2 size={16} /> {user?.email}
              </span>
            </p>
            <Button
              onClick={handleSignOut}
              variant="outline"
              className="border-white/20 text-white bg-white/10"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
          <Button
            onClick={handleAddNew}
            className="bg-white text-black hover:bg-white/90"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Movie
          </Button>
        </div>
        <div className="mb-4">
          <p className="text-sm font-semibold mb-2">Search Movie Title</p>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300/50 w-full p-2 rounded-lg "
            placeholder="Search..."
          />
        </div>

        <div className="bg-white/5 rounded-lg overflow-hidden">
          <div className="overflow-auto min-h-[500px]">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="px-4 py-3 text-left">Image</th>
                  <th className="px-4 py-3 text-left">Title</th>
                  <th className="px-4 py-3 text-left">Type</th>
                  <th className="px-4 py-3 text-left">Country</th>
                  <th className="px-4 py-3 text-left">Genre</th>
                  <th className="px-4 py-3 text-left">Year</th>
                  <th className="px-4 py-3 text-left">Rating</th>
                  <th className="px-4 py-3 text-left">Image URL</th>
                  <th className="px-4 py-3 text-left">Video URL</th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMovies.map((movie) => (
                  <tr
                    key={movie.id}
                    className="border-b border-white/10 hover:bg-white/5 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <img
                        src={movie.image}
                        alt={movie.title}
                        className="w-16 h-24 object-cover rounded"
                      />
                    </td>
                    <td className="px-4 py-3 max-w-xs truncate">
                      {movie.title}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          movie.type === "movie"
                            ? "bg-blue-500/20 text-blue-400"
                            : "bg-purple-500/20 text-purple-400"
                        }`}
                      >
                        {movie.type === "movie" ? "Movie" : "TV Show"}
                      </span>
                    </td>
                    <td className="px-4 py-3">{movie.country || "N/A"}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-2">
                        {movie.genre.map((genres) => (
                          <div className="border-white/20 text-xs px-1 rounded-full  text-white bg-white/10 capitalize">
                            {genres}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3">{movie.year}</td>
                    <td className="px-4 py-3">⭐ {movie.rating}</td>
                    <td className="px-4 py-3">
                      <a
                        href={movie.image}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline max-w-20 block truncate"
                      >
                        {movie.image}
                      </a>
                    </td>
                    <td className="px-4 py-3">
                      {movie.videoUrl ? (
                        <a
                          href={movie.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:underline max-w-20 block truncate"
                        >
                          {movie.videoUrl}
                        </a>
                      ) : (
                        <span className="text-white/60 text-sm">
                          No video URL
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEdit(movie)}
                          className="bg-green-500/20 text-green-400"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() =>
                            movie.id ? handleDelete(movie.id) : undefined
                          }
                          className="bg-red-500/20 text-red-400"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <Toaster />

        {movies.length === 0 && (
          <div className="text-center py-12 text-white/60">
            <p className="mb-4">No movies found</p>
            <Button onClick={handleAddNew} className="bg-white text-black">
              Add Your First Movie
            </Button>
          </div>
        )}
      </div>

      <AdminEditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        movie={selectedMovie}
        onSave={handleSave}
        onDelete={(id: string) => {
          handleDelete(id);
        }}
      />
    </div>
  );
}
