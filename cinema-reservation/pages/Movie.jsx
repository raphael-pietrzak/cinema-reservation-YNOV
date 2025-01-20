import React, {useEffect, useState} from "react";
import MovieCardAdvanced from "@/components/MovieCardAdvanced";
import {getFakeMovies, getMovies} from "@/services/movieService";

const MoviePage = () => {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        fetchFakeMovies()
    }, []);

    const fetchMovies = async () => {
        try {
            const response = await getMovies();
            setMovies(response.data);
        } catch (error) {
            console.error("Error fetching movies:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchFakeMovies = async () => {
        try {
            const response = await getFakeMovies();
            setMovies(response.data);
        } catch (error) {
            console.error("Error fetching movies:", error);
        } finally {
            setLoading(false);
        }
    }

    // Fonction pour ajouter ou modifier un film
    const handleMovieSubmit = (movieData) => {
        if (selectedMovie) {
            // Modification du film
            setMovies((prevMovies) =>
                prevMovies.map((movie) =>
                    movie.id === selectedMovie.id ? { ...movie, ...movieData } : movie
                )
            );
        } else {
            // Ajout d'un nouveau film
            setMovies((prevMovies) => [
                ...prevMovies,
                { ...movieData, id: Date.now() },
            ]);
        }
        setSelectedMovie(null); // Réinitialiser le film sélectionné
    };

    // Fonction pour supprimer un film
    const handleMovieDelete = (movieId) => {
        setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== movieId));
    };

    return (
        <div className="mt-6 flex flex-col lg:flex-row gap-6">
            {/* Formulaire de gestion des films */}
            <div className="flex-1">
                <h2 className="text-xl font-semibold mb-4">Gestion des Films</h2>
                <MovieCardAdvanced
                    movie={selectedMovie}
                    onSubmit={handleMovieSubmit}
                    onDelete={handleMovieDelete}
                />
            </div>

            {/* Liste des films */}
            <div className="flex-1">
                <h2 className="text-xl font-semibold mb-4">Liste des Films</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                    {movies.map((movie) => (
                        <div key={movie.id} className="border rounded-lg p-4 shadow-md">
                            <h2 className="text-xl font-semibold mb-2">{movie.title}</h2>
                            <p className="text-gray-700 mb-2">Genre: {movie.genre}</p>
                            <p className="text-gray-700 mb-2">Durée: {movie.duration} minutes</p>
                            <p className="text-gray-700 mb-4">Réalisateur: {movie.director}</p>
                            <button
                                onClick={() => setSelectedMovie(movie)}
                                className="bg-blue-500 text-white py-1 px-3 rounded"
                            >
                                Modifier
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
};

export default MoviePage;
