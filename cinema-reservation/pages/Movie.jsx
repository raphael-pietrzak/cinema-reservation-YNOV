import React, { useEffect, useState } from "react";
import { getFakeMovies } from "@/services/movieService";

const MoviePage = () => {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        fetchFakeMovies();
    }, []);

    const fetchFakeMovies = async () => {
        try {
            const response = await getFakeMovies();
            setMovies(response.data);
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    };

    return (
        <div className="bg-black text-white min-h-screen py-10">
            {/* Titre principal */}
            <h1 className="text-4xl font-bold text-center mb-10">Bienvenu au Cinema Reservation </h1>

            {/* Liste des films */}
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {movies.map((movie) => (
                    <div
                        key={movie.id}
                        className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                    >
                        {/* Image du film */}
                        <img
                            src={movie.posterUrl || "https://via.placeholder.com/300x400"}
                            alt={movie.title}
                            className="w-full h-64 object-cover"
                        />

                        {/* Contenu de la carte */}
                        <div className="p-6">
                            <h2 className="text-2xl font-bold mb-2">{movie.title}</h2>
                            <p className="text-gray-400 mb-1">{movie.genre} • {movie.year}</p>
                            <p className="text-gray-400 mb-4">Director: {movie.director}</p>
                            <div className="flex items-center text-gray-400 gap-2">
                                <span>⏱️ {movie.duration} min</span>
                            </div>

                            {/* Bouton pour voir les séances */}
                            <button
                                className="mt-4 w-full bg-white text-black py-2 rounded font-semibold hover:bg-gray-200"
                                onClick={() => console.log(`View showings for ${movie.title}`)}
                            >
                                View Showings
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MoviePage;
