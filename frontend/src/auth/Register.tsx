import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { API_URLS } from '../config/api'


const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    role: 'user' // Ajout du rôle par défaut
  })
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await axios.post(API_URLS.auth.register, formData)
      setMessage('Inscription réussie !')
      setTimeout(() => {
        navigate('/login')
      }, 1500)
    } catch (error: any) {
      setMessage(error.response?.data?.error || 'Erreur lors de l\'inscription')
      console.error('Erreur lors de l\'inscription:', error)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen dark:text-gray-900 text-gray-100">
      <div className="w-full max-w-md p-8 bg-gray-900 dark:bg-white dark:text-gray- rounded shadow">
        <h1 className="text-2xl font-bold mb-6 text-center">Créer un compte</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-200 dark:text-gray-800">
              Nom d'utilisateur
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={onChange}
              className="mt-1 block w-full border-gray-300 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900 px-2"
              required
            />
          </div>
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
              className="mt-1 block w-full border-gray-300 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900 px-2"
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
              className="mt-1 block w-full border-gray-300 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900 px-2"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
          >
            S'inscrire
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
          <Link to="/login" className="text-blue-600 hover:text-blue-800">
            Déjà un compte ? Se connecter
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Register