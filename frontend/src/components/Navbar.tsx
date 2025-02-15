import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Sun, Moon, Menu, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [role, setRole] = useState(localStorage.getItem("role") || "user");
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

            {isAuthenticated ? (
              <div className="relative" ref={dropdownRef}>
                <div 
                  className="w-10 h-10 rounded-full bg-white text-blue-500 flex items-center justify-center cursor-pointer hover:bg-gray-100 transition"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <User size={24} />
                </div>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 text-gray-700">
                    <button
                      onClick={() => {
                        logout();
                        setIsDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition"
                    >
                      Déconnexion
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="bg-white text-blue-500 px-4 py-2 rounded shadow hover:bg-gray-100 transition">
                Connexion
              </Link>
            )}
          </div>
        </div>
      </nav>
  );
};

export default Navbar;
