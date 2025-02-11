import { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import {ManageMovieCard} from "../../features/movies-list/components/ManageMovieCard.tsx";
import { movies } from '../../features/movies-list/data/movies.ts';
import { Movie } from '../../features/movies-list/types/movie.ts';

axios.defaults.headers.common['token'] = "alo";
axios.defaults.headers.put['Content-Type'] = "application/json";

function ManageMovie() {
    const handleSave = (movie: Movie) => {
        console.log('Film sauvegardé :', movie);
    };

    return (
        <div className="mx-auto min-h-screen py-8 px-4 max-w-6xl">
            <h1 className="text-3xl font-bold mb-4">Gestion des films</h1>
            <div className="flex flex-wrap gap-2">
                {movies.map(movie => (
                    <ManageMovieCard movie={movie} onSave={handleSave} />
                ))}
            </div>
        </div>
    );
}
export default ManageMovie;

