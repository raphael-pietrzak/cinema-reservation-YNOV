import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Sun, Moon, Menu } from "lucide-react";

const Navbar = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [role, setRole] = useState(localStorage.getItem("role") || "user"); // 🔹 Récupérer le rôle stocké

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
      <nav className="bg-blue-500 dark:bg-gray-900 shadow-md text-white py-4">
        <div className="container mx-auto flex justify-between items-center px-6">

          {/* Logo */}
          <Link to="/" className="text-2xl font-bold tracking-wide">
            🎬 MovieApp
          </Link>

          {/* Menu Responsive */}
          <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white focus:outline-none"
          >
            <Menu size={28} />
          </button>

          {/* Liens */}
          <div className={`md:flex md:items-center space-x-6 ${isMenuOpen ? "block" : "hidden"} w-full md:w-auto`}>
            <Link to="/movies" className="hover:text-gray-200 transition">Films</Link>
            <Link to="/about" className="hover:text-gray-200 transition">À propos</Link>
            <Link to="/" className="text-2xl font-bold tracking-wide hover:text-gray-300 transition">
            </Link>

            {/* 🔹 Vérifier si le rôle est admin avant d'afficher "Gestion administrative" */}
            {role === "admin" && (
                <Link to="/backoffice" className="text-yellow-400 font-semibold hover:text-yellow-300 transition">
                  Gestion administrative
                </Link>
            )}

            {/* Toggle Dark Mode */}
            <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-gray-300 dark:bg-gray-700"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <Link to="/login" className="bg-white text-blue-500 px-4 py-2 rounded shadow hover:bg-gray-100 transition">
              Connexion
            </Link>
            <Link to="/register" className="bg-yellow-400 text-black px-4 py-2 rounded shadow hover:bg-yellow-500 transition">
              Inscription
            </Link>
          </div>
        </div>
      </nav>
  );
};

export default Navbar;
