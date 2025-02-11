    "use client";

import React, { useState, useEffect } from "react";
import MovieForm from "@/components/MovieForm";

const MoviesPage = () => {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        // Simule des données pour les films
        const fakeMovies = [
            { id: 1, title: "Inception", genre: "Science-fiction", duration: 148, director: "Christopher Nolan" },
            { id: 2, title: "The Dark Knight", genre: "Action", duration: 152, director: "Christopher Nolan" },
        ];
        setMovies(fakeMovies);
    }, []);

    const handleMovieSubmit = (movieData) => {
        if (selectedMovie) {
            setMovies((prev) =>
                prev.map((movie) => (movie.id === selectedMovie.id ? { ...movie, ...movieData } : movie))
            );
        } else {
            setMovies((prev) => [...prev, { ...movieData, id: Date.now() }]);
        }
        setSelectedMovie(null);
    };

    const handleMovieDelete = (movieId) => {
        setMovies((prev) => prev.filter((movie) => movie.id !== movieId));
    };

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-3xl font-bold text-white">Gestion des Films</h1>
            <MovieForm movie={selectedMovie} onSubmit={handleMovieSubmit} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {movies.map((movie) => (
                    <div key={movie.id} className="bg-gray-800 p-4 rounded shadow">
                        <h2 className="text-xl font-bold text-white">{movie.title}</h2>
                        <p className="text-gray-400">Genre: {movie.genre}</p>
                        <p className="text-gray-400">Durée: {movie.duration} min</p>
                        <p className="text-gray-400">Réalisateur: {movie.director}</p>
                        <div className="mt-4 flex gap-2">
                            <button
                                onClick={() => setSelectedMovie(movie)}
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                Modifier
                            </button>
                            <button
                                onClick={() => handleMovieDelete(movie.id)}
                                className="bg-red-500 text-white px-4 py-2 rounded"
                            >
                                Supprimer
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MoviesPage;
