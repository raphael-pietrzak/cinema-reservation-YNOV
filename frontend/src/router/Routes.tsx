import { RouteObject } from 'react-router-dom';
import App from '../App';
import Login from '../auth/Login';
import Register from '../auth/Register';
import MoviesList from '../pages/MoviesList';
import Home from "../pages/Home";
import About from "../pages/About";
import Dashboard from "../pages/backoffice/Dashboard";
// import ManageMovie from "../pages/backoffice/ManageMovie";
// import ManageSession from "../pages/backoffice/ManageSession";
// import ManageUser from "../pages/backoffice/ManageUser";
import SeatSelectorPage from '../pages/SeatSelectorPage';
import MovieDetailsPage from '../pages/MovieDetailsPage';
import AddMovie from "../pages/backoffice/AddMovie.tsx";
import MovieDetails from '../pages/MovieDetails';
import SeatSelector from "../components/SeatSelector.tsx";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/movies',
                element: <MoviesList />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            },
            {
                path: '/backoffice',
                element: <Dashboard />,
            },
            {
                path: '/seat-selector',
                element: <SeatSelector sessionId={1} />
            },
            {
                path: '/movie-detail',
                element: <MovieDetailsPage />
            },
            {
                path: "/backoffice/add-movie",
                element: <AddMovie/>
            },
            // Route pour les détails d'un film, avec filmId en paramètre
            { path: '/movie-detail/:filmId', element: <MovieDetailsPage /> },
            // Route pour la sélection de sièges, avec sessionId en paramètre
            { path: '/seat-selector/:sessionId', element: <SeatSelectorPage /> },
            { path: '/about', element: <About /> },
            {
                path: '/movie/:id',
                element: <MovieDetails />
            },
        ]
    }
];
