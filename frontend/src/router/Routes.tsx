import { RouteObject } from 'react-router-dom';
import App from '../App';
import Login from '../auth/Login';
import Register from '../auth/Register';
import MoviesList from '../pages/MoviesList';
import SeatSelector from '../components/SeatSelector';
import MovieDetailsPage from '../pages/MovieDetailsPage';
import Dashboard from "../pages/backoffice/Dashboard.tsx";
import ManageMovie from "../pages/backoffice/ManageMovie.tsx";
import ManageSession from "../pages/backoffice/ManageSession.tsx";
import ManageUser from "../pages/backoffice/ManageUser.tsx";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <Dashboard />
            },
            {
                path: '/home',
                element: <Dashboard />
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
                path: '/backoffice/manage-movie',
                element: <ManageMovie/>,
            },
            {
                path: '/backoffice/manage-session',
                element: <ManageSession/>,
            },
            {
                path: '/backoffice/manage-user',
                element: <ManageUser/>,
            },
            {
                path: '/seat-selector',
                element: <SeatSelector />
            },
            {
                path: '/movie-detail',
                element: <MovieDetailsPage />
            },
            {

                path: '/backoffice',
                element: <Dashboard />,
            },
            {
                path: '/backoffice/manage-movie',
                element: <ManageMovie/>,
            },
            {
                path: '/backoffice/manage-session',
                element: <ManageSession/>,
            },
            {
                path: '/backoffice/manage-user',
                element: <ManageUser/>,
            }

        ]
    }
];
