import { RouteObject } from 'react-router-dom';
import App from '../App';
import Login from '../auth/Login';
import Register from '../auth/Register';
import MoviesList from '../pages/MoviesList';
import Home from "../pages/Home.tsx";
import About from "../pages/About.tsx";
import Dashboard from "../pages/backoffice/Dashboard.tsx";
import ManageMovie from "../pages/backoffice/ManageMovie.tsx";
import ManageSession from "../pages/backoffice/ManageSession.tsx";
import ManageUser from "../pages/backoffice/ManageUser.tsx";
import SeatSelector from '../components/SeatSelector';
import MovieDetailsPage from '../pages/MovieDetailsPage';

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
                element: <SeatSelector />
            },
            {
                path: '/movie-detail',
                element: <MovieDetailsPage />
            },
        ]
    }
];
