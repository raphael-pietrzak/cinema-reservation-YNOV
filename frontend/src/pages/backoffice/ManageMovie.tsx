
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
// @ts-ignore
import axios, { AxiosResponse } from 'axios';
import {ManageMovieCard} from "../../features/movies-list/components/ManageMovieCard.tsx";
import { movies } from '../../features/movies-list/data/movies.ts';
import { Movie } from '../../features/movies-list/types/movie.ts';
import { API_URLS } from '../../config/api';
import { useAuth } from '../../context/AuthContext.tsx';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

axios.defaults.headers.put['Content-Type'] = "application/json";

function ManageMovie() {
    const { token } = useAuth();
    const headers = {
        Authorization: `Bearer ${token}`
    };

    const handleSave = (movie: Movie) => {
        axios.put(API_URLS.movies.update(movie._id), movie, { headers })
            .then((res) => {
                if (res.status == 200)
                    toast.success('Film sauvegardé avec succès!');
                else
                    toast.error('Une erreur est survenue lors de la sauvegarde!');
            })
            .catch((error) => {
                toast.error('Une erreur est survenue: ' + error.message);
            });
    };

    const handleDelete = (movie: Movie) => {
        axios.delete(API_URLS.movies.delete(movie._id), { headers })
            .then((res) => {
                if (res.status == 200) {
                    fetchMovies();
                    toast.success('Film supprimé avec succès!');
                }
                else
                    toast.error('Une erreur est survenue lors de la suppression!');
            })
            .catch((error) => {
                toast.error('Une erreur est survenue: ' + error.message);
            });
    }

    const [moviesList, setMovies] = useState<Movie[]>(movies);

    const fetchMovies = async () => {
        try {
            const response: AxiosResponse = await axios.get(API_URLS.movies.getAll, { headers });
            const data: Movie[] = response.data;
            setMovies(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    const navigate = useNavigate();

    return (
        <div className="mx-auto min-h-screen py-8 px-4 max-w-6xl">
            <ToastContainer position="top-right" autoClose={3000} />
            <h1 className="text-3xl font-bold mb-4">Gestion des films</h1>
            <button
                className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-primary transition mb-2"
                onClick={() => navigate("/backoffice/add-movie")}
            >
                Ajouter un film
            </button>
            <div className="flex flex-wrap gap-2">
                {moviesList.map(movie => (
                    <ManageMovieCard movie={movie} onSave={handleSave} onDelete={handleDelete}/>
                ))}
            </div>
        </div>
    );
}

export default ManageMovie;

