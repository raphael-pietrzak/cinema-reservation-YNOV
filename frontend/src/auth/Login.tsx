import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import { API_URLS } from '../config/api'

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [message, setMessage] = useState('')
  const navigate = useNavigate()
  const { login } = useAuth()

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await axios.post(API_URLS.auth.login, formData)
      login(response.data.token, response.data.user.role) // Mise à jour pour inclure le rôle
      setMessage('Connexion réussie !')
      // Rediriger vers le dashboard si admin, sinon vers la page d'accueil
      navigate(response.data.user.role === 'admin' ? '/backoffice' : '/')
    } catch (error: any) {
      setMessage(error.response?.data?.error || 'Erreur lors de la connexion')
      console.error('Erreur lors de la connexion:', error)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen dark:text-gray-900 text-gray-100">
      <div className="w-full max-w-md p-8 bg-gray-900 dark:bg-white rounded shadow">
        <h1 className="text-2xl font-bold mb-6 text-center">Connexion</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-200 dark:text-gray-800">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={onChange}
              className="mt-1 block w-full border-gray-300 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-1 text-gray-900"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-200 dark:text-gray-800">
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={onChange}
              className="mt-1 block w-full border-gray-300 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500 px-1 text-gray-900"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
          >
            Se connecter
          </button>
        </form>
        {message && (
          <p
            className={`mt-4 text-center text-sm ${
              message.includes('réussie') ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {message}
          </p>
        )}
        <div className="text-center mt-4">
          <Link to="/register" className="text-blue-600 hover:text-blue-800">
            Pas de compte ? S'inscrire
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login