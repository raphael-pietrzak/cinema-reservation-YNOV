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

        <div className="container mx-auto flex items-center px-6">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold tracking-wide">
            🎬 MovieApp
          </Link>

          {/* Thème */}
          <button onClick={toggleTheme} className="focus:outline-none">
            {theme === "light" ? <Moon size={24} /> : <Sun size={24} />}
          </button>
        </div>

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
            <Link to="/" className="text-2xl font-bold tracking-wide hover:text-gray-300 transition">
            </Link>

            {/* 🔹 Vérifier si le rôle est admin avant d'afficher "Gestion administrative" */}
            {role === "admin" && (
                <Link to="/backoffice" className="text-yellow-400 font-semibold hover:text-yellow-300 transition">
                  Gestion administrative
                </Link>
            )}


            <Link to="/login" className="hover:text-gray-200 transition">Connexion</Link>

            <Link to="/login" className="bg-white text-blue-500 px-4 py-2 rounded shadow hover:bg-gray-100 transition">
              Connexion
            </Link>

          </div>
        </div>
      </nav>
  );
};

export default Navbar;
