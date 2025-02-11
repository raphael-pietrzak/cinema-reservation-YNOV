
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
// @ts-ignore
import axios, { AxiosResponse } from 'axios';
import {ManageMovieCard} from "../../features/movies-list/components/ManageMovieCard.tsx";
import { movies } from '../../features/movies-list/data/movies.ts';
import { Movie } from '../../features/movies-list/types/movie.ts';

axios.defaults.headers.common['token'] = "alo";
axios.defaults.headers.put['Content-Type'] = "application/json";

function ManageMovie() {
    const handleSave = (movie: Movie) => {
        axios.put(`http://localhost:1590/movie/${movie._id}/update`, movie)
            .then((res) => {
                if (res.status == 200)
                    toast.success('Film sauvegardé!');
                else
                    toast.error('Erreur!');
            });
    };

    const handleDelete = (movie: Movie) => {
        axios.delete(`http://localhost:1590/movie/${movie._id}/delete`)
            .then((res) => {
                if (res.status == 200) {
                    fetchMovies();
                    toast.success('Film supprimé!');
                }
                else
                    toast.error('Erreur!');
            });
    }

    const [moviesList, setMovies] = useState<Movie[]>(movies);

    const fetchMovies = async () => {
        try {
            const response: AxiosResponse = await axios.get('http://127.0.0.1:1590/movie');
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
            <h1 className="text-3xl font-bold mb-4">Gestion des films</h1>
            <button
                className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition"
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

