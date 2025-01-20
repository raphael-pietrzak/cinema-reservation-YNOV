import { RouteObject } from 'react-router-dom';
import App from '../App';
import Login from '../auth/Login';
import Register from '../auth/Register';

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/home',
                element: <div className="text-gray-800 dark:text-white">
                    <h1 className="text-3xl font-bold mb-4">Accueil</h1>
                    <p className="text-lg">Bienvenue sur notre application de cinéma</p>
                </div>
            },
            {
                path: '/movies',
                element: <div className="text-gray-800 dark:text-white">
                    <h1 className="text-3xl font-bold mb-4">Films</h1>
                    <p className="text-lg">Découvrez notre sélection de films</p>
                </div>
            },
            {
                path: '/about',
                element: <div className="text-gray-800 dark:text-white">
                    <h1 className="text-3xl font-bold mb-4">À propos</h1>
                    <p className="text-lg">En savoir plus sur notre application</p>
                </div>
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            }

        ]
    }
];
