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
      <nav className="bg-blue-500 text-white py-4 flex transition-all [data-theme='dark']:bg-gray-900 [data-theme='dark']:text-gray-200">
        <div className="container mx-auto flex justify-between items-center">
          <div className="space-x-4 flex-1 flex justify-between">
            <div className="flex-1 flex justify-start gap-8">
              <Link to="/home" className="text-lg font-semibold opacity-70 transition-opacity hover:opacity-100">
                Accueil
              </Link>
              <Link to="/movies" className="text-lg font-semibold opacity-70 transition-opacity hover:opacity-100">
                Films
              </Link>
              <Link to="/about" className="text-lg font-semibold opacity-70 transition-opacity hover:opacity-100">
                À propos
              </Link>
            </div>

            <div className="flex justify-start gap-4 items-center">
              {/* Toggle Dark Mode */}
              <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full bg-gray-200 text-gray-800 transition-colors [data-theme='dark']:bg-gray-700 [data-theme='dark']:text-gray-200"
              >
                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              <Link to="/login" className="text-lg font-semibold opacity-70 transition-opacity hover:opacity-100">
                Connexion
              </Link>
              <Link to="/register" className="text-lg font-semibold opacity-70 transition-opacity hover:opacity-100">
                Inscription
              </Link>
            </div>
          </div>
        </div>
      </nav>
  );
};

export default Navbar;
