"use client";

import React, { useState, useEffect } from "react";
import useAuth from "@/hooks/useAuth";

const MovieCardAdvanced = ({ movie, onSubmit, onDelete }) => {
    const { isAuthenticated } = useAuth();
    const [movieData, setMovieData] = useState({
        title: "",
        genre: "",
        duration: "",
        director: "",
    });
    const [isEditing, setIsEditing] = useState(false); // Gestion du mode édition

    // Initialisation de l'état pour l'édition si un film est passé en prop
    useEffect(() => {
        if (movie) {
            setMovieData(movie);
            setIsEditing(true); // Mode édition
        }
    }, [movie]);

    // Gère les changements des champs du formulaire
    const handleChange = (e) => {
        const { name, value } = e.target;
        setMovieData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Fonction pour soumettre le formulaire
    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSubmit) {
            onSubmit(movieData); // Appel de la fonction onSubmit pour ajouter ou modifier le film
        }
        setMovieData({
            title: "",
            genre: "",
            duration: "",
            director: "",
        }); // Réinitialisation après soumission
        setIsEditing(false); // Retour au mode affichage
    };

    // Fonction pour supprimer un film
    const handleDelete = () => {
        if (onDelete && window.confirm("Êtes-vous sûr de vouloir supprimer ce film ?")) {
            onDelete(movie.id); // Suppression du film
        }
    };

    if (!isAuthenticated) {
        return <p>Veuillez vous connecter pour gérer les films.</p>;
    }

    return (
        <div className="border rounded-lg p-6 shadow-md max-w-md mx-auto">
            <h2 className="text-2xl font-semibold mb-4">{isEditing ? "Modifier le Film" : "Ajouter un Nouveau Film"}</h2>

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium">
                        Titre
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={movieData.title}
                        onChange={handleChange}
                        className="w-full p-2 border rounded mt-1"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="genre" className="block text-sm font-medium">
                        Genre
                    </label>
                    <input
                        type="text"
                        id="genre"
                        name="genre"
                        value={movieData.genre}
                        onChange={handleChange}
                        className="w-full p-2 border rounded mt-1"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="duration" className="block text-sm font-medium">
                        Durée (en minutes)
                    </label>
                    <input
                        type="number"
                        id="duration"
                        name="duration"
                        value={movieData.duration}
                        onChange={handleChange}
                        className="w-full p-2 border rounded mt-1"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="director" className="block text-sm font-medium">
                        Réalisateur
                    </label>
                    <input
                        type="text"
                        id="director"
                        name="director"
                        value={movieData.director}
                        onChange={handleChange}
                        className="w-full p-2 border rounded mt-1"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded mt-4"
                >
                    {isEditing ? "Modifier le Film" : "Ajouter le Film"}
                </button>
            </form>

            {isEditing && (
                <button
                    onClick={handleDelete}
                    className="w-full bg-red-500 text-white py-2 rounded mt-4"
                >
                    Supprimer le Film
                </button>
            )}
        </div>
    );
};

export default MovieCardAdvanced;
