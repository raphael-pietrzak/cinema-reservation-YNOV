import { useState, useEffect } from 'react';
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
                    alert('Film sauvegardé!');
                else
                    alert('Erreur!');
            });
    };

    const handleDelete = (movie: Movie) => {
        axios.delete(`http://localhost:1590/movie/${movie._id}/delete`)
            .then((res) => {
                if (res.status == 200) {
                    fetchMovies();
                    alert('Film supprimé!');
                }
                else
                    alert('Erreur!');
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

    return (
        <div className="mx-auto min-h-screen py-8 px-4 max-w-6xl">
            <h1 className="text-3xl font-bold mb-4">Gestion des films</h1>
            <div className="flex flex-wrap gap-2">
                {moviesList.map(movie => (
                    <ManageMovieCard movie={movie} onSave={handleSave} onDelete={handleDelete}/>
                ))}
            </div>
        </div>
    );
}
export default ManageMovie;

