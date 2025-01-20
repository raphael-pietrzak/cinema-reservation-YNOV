import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="bg-blue-500 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <Link to="/">🎥 CinéApp</Link>
        </h1>
        <div className="space-x-4">
          <Link to="/home" className="hover:underline">
            Accueil
          </Link>
          <Link to="/movies" className="hover:underline">
            Films
          </Link>
          <Link to="/about" className="hover:underline">
            À propos
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
