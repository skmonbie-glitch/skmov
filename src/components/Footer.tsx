import { Link } from "react-router-dom";
import logo from "./../assets/newlogo.png";

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Link
              to="/"
              className="flex items-center justify-center gap-2 mb-4"
            >
              <div className="w-auto sm:h-20 h-12">
                <img src={logo} alt="sk logo" className="w-auto sm:h-20 h-12" />
              </div>
            </Link>
            <p className="text-white/60">
              Your ultimate destination for movies and TV shows. Stream
              unlimited entertainment.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white mb-4">Browse</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/movies"
                  className="text-white/60 hover:text-white transition-colors"
                >
                  Movies
                </Link>
              </li>
              <li>
                <Link
                  to="/tv-shows"
                  className="text-white/60 hover:text-white transition-colors"
                >
                  TV Shows
                </Link>
              </li>
              <li>
                <Link
                  to="/trending"
                  className="text-white/60 hover:text-white transition-colors"
                >
                  Trending
                </Link>
              </li>
              {/* <li>
                <Link
                  to="/"
                  className="text-white/60 hover:text-white transition-colors"
                >
                  Categories
                </Link>
              </li> */}
            </ul>
          </div>

          {/* <div>
            <h3 className="text-white mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-white/60 hover:text-white transition-colors"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/60 hover:text-white transition-colors"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/60 hover:text-white transition-colors"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/60 hover:text-white transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div> */}

          {/* Social
          <div>
            <h3 className="text-white mb-4">Connect</h3>
            <div className="flex gap-3">
              <a
                href="#"
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <Facebook className="size-5" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <Twitter className="size-5" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <Instagram className="size-5" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <Youtube className="size-5" />
              </a>
            </div>
          </div> */}
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/10">
          <p className="text-white/60 text-center">
            © 2024 SkMobie. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
