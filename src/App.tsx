import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./views/Home";
import { Movies } from "./views/Movies";
import { TVShows } from "./views/TVShows";
import { Trending } from "./views/Trending";
import { SearchResults } from "./views/SearchResults";
import { PlayVideo } from "./views/Play";
import { Admin } from "./views/Admin";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Login } from "./auth/Login";
import { AuthProvider } from "./contexts/AuthContext";

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-black">
          <Header />
          <main className="pt-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/tv-shows" element={<TVShows />} />
              <Route path="/trending" element={<Trending />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/play/:id" element={<PlayVideo />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <Admin />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}
