import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import type { Movie } from "../utils/movieData";

interface AdminEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  movie: Movie | null;
  onSave: (movie: Movie) => void;
  onDelete: (id: string) => void;
}

export function AdminEditModal({
  isOpen,
  onClose,
  movie,
  onSave,
  onDelete,
}: AdminEditModalProps) {
  const [formData, setFormData] = useState<Partial<Movie>>({
    title: "",
    year: "",
    rating: 0,
    image: "",
    genre: [],
    type: "movie",
    description: "",
    trending: false,
    featured: false,
    videoUrl: "",
    director: "",
    casts: [],
    duration: "",
    country: "",
  });

  useEffect(() => {
    if (movie) {
      setFormData(movie);
    } else {
      setFormData({
        title: "",
        year: "",
        rating: 0,
        image: "",
        genre: [],
        type: "movie",
        description: "",
        trending: false,
        featured: false,
        videoUrl: "",
        director: "",
        casts: [],
        duration: "",
        country: "",
      });
    }
  }, [movie]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title && formData.year && formData.image) {
      onSave(formData as Movie);
      onClose();
    }
  };

  const handleDelete = () => {
    if (
      movie &&
      movie.id &&
      window.confirm("Are you sure you want to delete this movie?")
    ) {
      onDelete(movie.id);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-black border-white/20 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{movie ? "Edit Movie" : "Add New Movie"}</DialogTitle>
          <DialogDescription className="text-white/60">
            {movie
              ? "Update movie details and URLs"
              : "Add a new movie to the database"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="bg-black border-white/20 text-white"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="year">Year</Label>
              <Input
                id="year"
                value={formData.year}
                onChange={(e) =>
                  setFormData({ ...formData, year: e.target.value })
                }
                className="bg-black border-white/20 text-white"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rating">Rating</Label>
              <Input
                id="rating"
                type="number"
                step="0.1"
                min="0"
                max="10"
                value={formData.rating}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    rating: parseFloat(e.target.value),
                  })
                }
                className="bg-black border-white/20 text-white"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              value={formData.image}
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.value })
              }
              className="bg-black border-white/20 text-white"
              placeholder="https://example.com/image.jpg"
              required
            />
          </div>

          <div>
            {formData.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={formData.image}
                alt="Movie Poster"
                className="w-full h-auto max-h-60 object-contain rounded-md border border-white/20 mb-2"
              />
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="videoUrl">Video URL (Optional)</Label>
            <Input
              id="videoUrl"
              value={formData.videoUrl || ""}
              onChange={(e) =>
                setFormData({ ...formData, videoUrl: e.target.value })
              }
              className="bg-black border-white/20 text-white"
              placeholder="https://example.com/video.mp4"
            />
          </div>

          <div>
            {formData.videoUrl && (
              <iframe
                src={formData.videoUrl}
                loading="lazy"
                allow="accelerometer; gyroscope;  encrypted-media; picture-in-picture;"
                allowFullScreen
                className="w-full h-full rounded-md border border-white/20"
              ></iframe>
            )}
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value: "movie" | "tv") =>
                  setFormData({ ...formData, type: value })
                }
              >
                <SelectTrigger className="bg-black border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-black border-white/20 text-white">
                  <SelectItem value="movie">Movie</SelectItem>
                  <SelectItem value="tv">TV Show</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                required
                value={formData.country || ""}
                onChange={(e) =>
                  setFormData({ ...formData, country: e.target.value })
                }
                className="bg-black border-white/20 text-white"
                placeholder="Country of origin"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="genre">Genres (comma-separated)</Label>
            <Input
              id="genre"
              value={formData.genre?.join(", ") || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  genre: e.target.value
                    .split(",")
                    .map((g) => g.trim())
                    .filter(Boolean),
                })
              }
              className="bg-black border-white/20 text-white"
              placeholder="Action, Drama, Comedy"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="bg-black border-white/20 text-white min-h-[100px]"
              required
            />
          </div>

          <div className="flex  gap-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="trending"
                checked={formData.trending || false}
                onChange={(e) =>
                  setFormData({ ...formData, trending: e.target.checked })
                }
                className="w-4 h-4"
              />
              <Label htmlFor="trending" className="cursor-pointer">
                Mark as Trending
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured || false}
                onChange={(e) =>
                  setFormData({ ...formData, featured: e.target.checked })
                }
                className="w-4 h-4"
              />
              <Label htmlFor="featured" className="cursor-pointer">
                Mark as Featured
              </Label>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="director">Director</Label>
              <Input
                id="director"
                value={formData.director || ""}
                onChange={(e) =>
                  setFormData({ ...formData, director: e.target.value })
                }
                className="bg-black border-white/20 text-white"
                placeholder="Director name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                value={formData.duration || ""}
                onChange={(e) =>
                  setFormData({ ...formData, duration: e.target.value })
                }
                className="bg-black border-white/20 text-white"
                placeholder="e.g., 2h 30m"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cast">Cast (comma-separated names)</Label>
            <Input
              id="cast"
              value={formData.casts?.join(", ") || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  casts: e.target.value.split(",").map((name) => name.trim()),
                })
              }
              className="bg-black border-white/20 text-white"
              placeholder="Actor 1, Actor 2, Actor 3"
            />
          </div>

          <DialogFooter className="flex justify-between">
            <div className="flex gap-2">
              {movie && (
                <Button
                  type="button"
                  variant="destructive"
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              )}
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="border-white/20 text-white bg-white/10"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-white text-black hover:bg-white/90"
              >
                {movie ? "Update" : "Add"} Movie
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
