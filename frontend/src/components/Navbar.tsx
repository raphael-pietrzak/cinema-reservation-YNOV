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
        <nav className="bg-neutral-300 dark:bg-gray-900 shadow-md text-gray-100 dark:text-gray-100 py-4">
        <div className="container mx-auto flex justify-between items-center px-6">
          <div className="flex items-center space-x-4">
            {/* Logo */}
            <Link to="/" className="text-2xl font-bold tracking-wide text-secondary dark:text-secondary-variant">
              🎬 MovieApp
            </Link>

            {/* Thème */}
            <button onClick={toggleTheme} className="focus:outline-none text-secondary-variant">
              {theme === "light" ? <Moon size={24} /> : <Sun size={24} />}
            </button>
          </div>

          {/* Menu Responsive */}
          <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-100 dark:text-gray-200 focus:outline-none"
          >
            <Menu size={28} />
          </button>

          {/* Liens */}
          <div className={`md:flex md:items-center space-x-6 ${isMenuOpen ? "block" : "hidden"} w-full md:w-auto`}>
            <Link to="/movies" className=" text-gray-900 hover:text-secondary dark:text-gray-100 transition  ">Films</Link>

            {/* 🔹 Vérifier si le rôle est admin avant d'afficher "Gestion administrative" */}
            {role === "admin" && (
                <Link to="/backoffice" className="text-secondary font-semibold hover:text-secondary-variant  transition">
                  Gestion administrative
                </Link>
            )}

            <Link to="/login" className="bg-secondary dark:bg-secondary-variant text-gray-100 dark:text-gray-100 px-4 py-2 rounded shadow hover:brightness-110 transition">
              Connexion
            </Link>
          </div>
        </div>
      </nav>
  );
};

export default Navbar;
