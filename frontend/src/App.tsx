import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
// import axios 
import axios from 'axios'



function App() {
  axios.get('localhost:1590/movie/').then(response => console.log(response.data))
  axios.get('http://192.168.223.142:8006/api/cinema_sessions/').then(response => console.log(response.data))
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-gray-100">
      <Navbar />
      <Outlet />
    </div>
  )
}

export default App
