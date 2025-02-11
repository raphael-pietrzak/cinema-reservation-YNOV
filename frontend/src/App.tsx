import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import axios from 'axios'
import { AuthProvider } from './context/AuthContext'
import { API_URLS } from './config/api'

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-gray-100">
        <Navbar />
        <Outlet />
      </div>
    </AuthProvider>
  )
}

export default App
