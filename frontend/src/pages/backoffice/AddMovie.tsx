import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddMovie = () => {
    const [movie, setMovie] = useState({ title: "", year: "", duration: "", genre: "", image: "" ,Réalisateur:"" });
    const navigate = useNavigate();

    const handleChange = (field: string, value: string | number) => {
        setMovie((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Film ajouté :", movie);
        navigate("/backoffice/manage-movie");
        toast.success('Film ajouté avec succès !');
        toast.error('Erreur lors de l\'ajout du film');
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold text-center text-blue-500 dark:text-white mb-6">Ajouter un film</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Titre du film"
                        value={movie.title}
                        onChange={(e) => handleChange("title", e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg bg-gray-100 dark:bg-gray-700 text-black dark:text-white"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Réalisateur"
                        value={movie.image}
                        onChange={(e) => handleChange("réalisateur", e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg bg-gray-100 dark:bg-gray-700 text-black dark:text-white"
                    />
                    <input
                        type="text"
                        placeholder="Année"
                        value={movie.year}
                        onChange={(e) => handleChange("year", e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg bg-gray-100 dark:bg-gray-700 text-black dark:text-white"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Durée (min)"
                        value={movie.duration}
                        onChange={(e) => handleChange("duration", e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg bg-gray-100 dark:bg-gray-700 text-black dark:text-white"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Genre"
                        value={movie.genre}
                        onChange={(e) => handleChange("genre", e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg bg-gray-100 dark:bg-gray-700 text-black dark:text-white"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Image URL"
                        value={movie.image}
                        onChange={(e) => handleChange("image", e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg bg-gray-100 dark:bg-gray-700 text-black dark:text-white"
                    />

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition"
                    >
                        Ajouter le film
                    </button>
                </form>

            </div>
        </div>
    );
};

export default AddMovie;