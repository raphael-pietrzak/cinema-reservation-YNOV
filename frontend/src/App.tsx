import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import { AuthProvider } from './context/AuthContext'
import backgroundImage from '../public/background.png';

function App() {
  return (
    <AuthProvider>
        <div
            className="relative min-h-screen w-full bg-cover bg-center backdrop-saturate-50"
            style={{backgroundImage: `url(${backgroundImage})`}}
        >
            {/* Overlay avec un dégradé du noir transparent vers transparent */}
            <Navbar/>
            <Outlet/>

        </div>
    </AuthProvider>
  )
}

export default App
