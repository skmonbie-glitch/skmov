import { Search, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "./../assets/sklogo1.png";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-16 h-16">
              <img src={logo} alt="sk logo" className="w-16 h-16" />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-white/80 hover:text-white transition-colors"
            >
              Home
            </Link>
            <Link
              to="/movies"
              className="text-white/80 hover:text-white transition-colors"
            >
              Movies
            </Link>
            <Link
              to="/tv-shows"
              className="text-white/80 hover:text-white transition-colors"
            >
              TV Shows
            </Link>
            <Link
              to="/trending"
              className="text-white/80 hover:text-white transition-colors"
            >
              Trending
            </Link>
          </nav>

          {/* Search and Mobile Menu */}
          <div className="flex items-center gap-4">
            <form
              onSubmit={handleSearch}
              className="hidden md:flex items-center gap-2"
            >
              <Input
                type="search"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
              <Button
                type="submit"
                size="icon"
                variant="ghost"
                className="text-white"
              >
                <Search className="size-5" />
              </Button>
            </form>

            {/* Mobile Menu Button */}
            <Button
              size="icon"
              variant="ghost"
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="size-6" />
              ) : (
                <Menu className="size-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            <div className="flex flex-col gap-4">
              <form onSubmit={handleSearch} className="flex items-center gap-2">
                <Input
                  type="search"
                  placeholder="Search movies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
                <Button
                  type="submit"
                  size="icon"
                  variant="ghost"
                  className="text-white"
                >
                  <Search className="size-5" />
                </Button>
              </form>
              <nav className="flex flex-col gap-2">
                <Link
                  to="/"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-white/80 hover:text-white transition-colors py-2"
                >
                  Home
                </Link>
                <Link
                  to="/movies"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-white/80 hover:text-white transition-colors py-2"
                >
                  Movies
                </Link>
                <Link
                  to="/tv-shows"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-white/80 hover:text-white transition-colors py-2"
                >
                  TV Shows
                </Link>
                <Link
                  to="/trending"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-white/80 hover:text-white transition-colors py-2"
                >
                  Trending
                </Link>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
