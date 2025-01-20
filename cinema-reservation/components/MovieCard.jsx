"use client";

import React, { useState } from "react";
import useAuth from "@/hooks/useAuth";

const MovieCard = ({ movie }) => {
    const {isAuthenticated} = useAuth();
    const [isFavorite, setIsFavorite] = useState(false); // État local pour savoir si le film est favori

    const toggleFavorite = () => {
        setIsFavorite((prev) => !prev); // Inverse l'état favori
    };

    return (
        <div className="border rounded-lg p-4 shadow-md">
            <h2 className="text-xl font-semibold mb-2">{movie.title}</h2>
            <p className="text-gray-700 mb-2">Genre : {movie.genre}</p>
            <p className="text-gray-700 mb-2">Durée : {movie.duration} minutes</p>
            <p className="text-gray-700 mb-4">Réalisateur : {movie.director}</p>

            {/* Bouton pour marquer comme favori */}
            <button
                onClick={toggleFavorite}
                className={`py-2 px-4 rounded ${
                    isFavorite ? "bg-red-500 text-white" : "bg-gray-200 text-black"
                }`}
                hidden={!isAuthenticated}
            >
                {isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
            </button>
        </div>
    );
};

export default MovieCard;
