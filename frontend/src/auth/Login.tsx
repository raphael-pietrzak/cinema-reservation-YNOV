import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/auth/login', formData);
      localStorage.setItem('token', response.data.token);

      // 🔹 Vérifier si le backend envoie un rôle, sinon mettre "admin" temporairement
      const role = response.data.role || "admin";

      localStorage.setItem('role', role);
      setMessage('Connexion réussie !');
      navigate('/');
      window.location.reload(); // 🔹 Recharge la page pour mettre à jour la navbar
    } catch (error) {
      setMessage('Erreur lors de la connexion');
      console.error('Erreur lors de la connexion:', error);
    }
  };

  return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-blue-500 dark:text-white mb-6">Connexion</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
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
                  className="w-full px-4 py-2 border rounded-lg bg-gray-100 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-900 dark:text-white"
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
                  className="w-full px-4 py-2 border rounded-lg bg-gray-100 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-900 dark:text-white"
                  required
              />
            </div>

            <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition"
            >
              Se connecter
            </button>
          </form>

          {message && (
              <p className={`mt-4 text-center ${message.includes('réussie') ? 'text-green-500' : 'text-red-500'}`}>
                {message}
              </p>
          )}

          <div className="text-center mt-4">
            <Link to="/register" className="text-blue-600 dark:text-blue-300 hover:underline">
              Pas de compte ? S'inscrire
            </Link>
          </div>
        </div>
      </div>
  );
};

export default Login;
