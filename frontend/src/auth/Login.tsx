import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { API_URLS } from '../config/api';
import { Eye, EyeOff } from 'lucide-react';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(API_URLS.auth.login, formData)
      login(response.data.token, response.data.user.role) // Mise à jour pour inclure le rôle
      setMessage('Connexion réussie !')
      // Rediriger vers le dashboard si admin, sinon vers la page d'accueil
      navigate(response.data.user.role === 'admin' ? '/backoffice' : '/')
    } catch (error: any) {
      setMessage(error.response?.data?.error || 'Erreur lors de la connexion');
      console.error('Erreur lors de la connexion:', error);
    }
  };

  return (
      <div className="flex justify-center items-center min-h-screen text-gray-900 dark:text-gray-100">
        <div className="w-full max-w-md p-8 bg-gray-200 dark:bg-gray-800 rounded shadow-lg border border-gray-300 dark:border-gray-700">
          <h1 className="text-2xl font-bold mb-6 text-center text-primary">Connexion</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-800 dark:text-gray-200">
                Email
              </label>
              <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={onChange}
                  className="mt-1 block w-full border-gray-400 dark:border-gray-600 rounded shadow-sm focus:ring-primary focus:border-primary px-1 text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-700"
                  required
              />
            </div>
            <div className="mb-4 relative">
              <label htmlFor="password" className="block text-sm font-medium text-gray-800 dark:text-gray-200">
                Mot de passe
              </label>
              <div className="relative">
                <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={onChange}
                    className="mt-1 block w-full border-gray-400 dark:border-gray-600 rounded shadow-sm focus:ring-primary focus:border-primary px-1 pr-10 text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-700"
                    required
                />
                <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-2 flex items-center px-2 text-gray-600 dark:text-gray-300 focus:outline-none"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            <button
                type="submit"
                className="w-full text-gray-100 py-2 px-4 rounded hover:brightness-125 transition shadow-md bg-primary"
            >
              Se connecter
            </button>
          </form>
          {message && (
              <p
                  className={`mt-4 text-center text-sm font-semibold ${
                      message.includes('réussie') ? 'text-secondary dark:text-secondary-variant' : 'text-error dark:text-red-500'
                  }`}
              >
                {message}
              </p>
          )}
          <div className="text-center mt-4">
            <Link to="/register" className="text-secondary-variant dark:text-secondary hover:text-secondary-variant dark:hover:text-secondary">
              Pas de compte ? S'inscrire
            </Link>
          </div>
        </div>
      </div>
  );
};

export default Login;
