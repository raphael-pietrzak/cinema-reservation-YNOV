import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({ email: '', password: '', username: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/auth/register', formData);
      setMessage('Inscription réussie !');
      navigate('/login');
    } catch (error) {
      setMessage("Erreur lors de l'inscription");
      console.error("Erreur lors de l'inscription:", error);
    }
  };

  return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-blue-500 dark:text-white mb-6">Créer un compte</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Nom d'utilisateur
              </label>
              <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={onChange}
                  className="w-full px-4 py-2 border rounded-lg bg-gray-100 dark:bg-gray-700
                         focus:ring-2 focus:ring-blue-500 focus:outline-none
                         text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="Nom d'utilisateur"
                  required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={onChange}
                  className="w-full px-4 py-2 border rounded-lg bg-gray-100 dark:bg-gray-700
                         focus:ring-2 focus:ring-blue-500 focus:outline-none
                         text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="Email"
                  required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Mot de passe
              </label>
              <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={onChange}
                  className="w-full px-4 py-2 border rounded-lg bg-gray-100 dark:bg-gray-700
                         focus:ring-2 focus:ring-blue-500 focus:outline-none
                         text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="Mot de passe"
                  required
              />
            </div>

            <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition"
            >
              S'inscrire
            </button>
          </form>

          {message && (
              <p className={`mt-4 text-center ${message.includes('réussie') ? 'text-green-500' : 'text-red-500'}`}>
                {message}
              </p>
          )}

          <div className="text-center mt-4">
            <Link to="/login" className="text-blue-600 dark:text-blue-300 hover:underline">
              Déjà un compte ? Se connecter
            </Link>
          </div>
        </div>
      </div>
  );
};

export default Register;
