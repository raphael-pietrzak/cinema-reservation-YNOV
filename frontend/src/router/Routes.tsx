import { RouteObject } from 'react-router-dom';
import App from '../App';
import Login from '../auth/Login';
import Register from '../auth/Register';
import MoviesList from '../pages/MoviesList';
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
                path: '/home',
                element: <Home />
            },
            {
                path: '/movies',
                element: <MoviesList />
            },
            {
                path: '/about',
                element: <About />
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
