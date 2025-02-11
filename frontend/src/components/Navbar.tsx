import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Sun, Moon } from "lucide-react";

const Navbar = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle(
        "dark",
        localStorage.theme === "dark" ||
        (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches),
    );
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    // <nav className="bg-blue-500 text-white py-4">

      <nav className="bg-blue-500 text-white py-4 flex transition-all [data-theme='dark']:bg-gray-900 [data-theme='dark']:text-gray-200">
        <div className="container mx-auto flex justify-between items-center">
          <div className="space-x-4 flex-1 flex justify-between">


              <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full bg-gray-200 text-gray-800 transition-colors [data-theme='dark']:bg-gray-700 [data-theme='dark']:text-gray-200"
              >
                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <Link to="/movies" className="hover:underline">
                Films
              </Link>
              <Link to="/login" className="hover:underline">
                Connexion
              </Link>
              <Link to="/movie-detail" className="hover:underline">
                Movie Details
              </Link>
              <Link to="/seat-selector" className="hover:underline">
                Réserver un siège
              </Link>

            </div>
        </div>
      </nav>
  );
};

export default Navbar;
