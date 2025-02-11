"use client";

import React, { useState, useEffect } from "react";

const MovieForm = ({ movie = null, onSubmit }) => {
    const [title, setTitle] = useState("");
    const [genre, setGenre] = useState("");
    const [duration, setDuration] = useState("");
    const [director, setDirector] = useState("");

    // Met à jour les champs du formulaire lorsque le film change
    useEffect(() => {
        if (movie) {
            setTitle(movie.title || "");
            setGenre(movie.genre || "");
            setDuration(movie.duration || "");
            setDirector(movie.director || "");
        } else {
            setTitle("");
            setGenre("");
            setDuration("");
            setDirector("");
        }
    }, [movie]);

    // Fonction pour gérer la soumission du formulaire
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            title,
            genre,
            duration,
            director,
        });
        setTitle("");
        setGenre("");
        setDuration("");
        setDirector("");
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-gray-400 mb-1">Titre</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 rounded bg-gray-700 text-white"
                    required
                />
            </div>
            <div>
                <label className="block text-gray-400 mb-1">Genre</label>
                <input
                    type="text"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    className="w-full p-2 rounded bg-gray-700 text-white"
                    required
                />
            </div>
            <div>
                <label className="block text-gray-400 mb-1">Durée (en minutes)</label>
                <input
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full p-2 rounded bg-gray-700 text-white"
                    required
                />
            </div>
            <div>
                <label className="block text-gray-400 mb-1">Réalisateur</label>
                <input
                    type="text"
                    value={director}
                    onChange={(e) => setDirector(e.target.value)}
                    className="w-full p-2 rounded bg-gray-700 text-white"
                    required
                />
            </div>
            <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded w-full"
            >
                {movie ? "Modifier" : "Ajouter"}
            </button>
        </form>
    );
};

export default MovieForm;
