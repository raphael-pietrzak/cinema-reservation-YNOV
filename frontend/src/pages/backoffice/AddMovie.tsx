import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
//@ts-ignore
import axios, { AxiosResponse } from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

const AddMovie = () => {
    const [movie, setMovie] = useState({ name: "", year: "", duration: "", genre: "", image: "" , director: ""});
    const navigate = useNavigate();

    const handleChange = (field: string, value: string | number) => {
        setMovie((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        axios.post(`http://localhost:1590/movie/create`, movie)
            .then((res) => {
                console.log(res.status)
                if (res.status == 201)
                    toast.success('Film créé!');
                else
                    toast.error('Erreur!');
            });
        setTimeout(() => {
            navigate("/backoffice");
        }, 2000);
    };

    return (
        <div className="flex justify-center items-center min-h-screen ">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold text-center text-blue-500 dark:text-white mb-6">Ajouter un film</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Titre du film"
                        value={movie.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg bg-gray-100 dark:bg-gray-700 text-black dark:text-white"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Réalisateur"
                        value={movie.director}
                        onChange={(e) => handleChange("director", e.target.value)}
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
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-primary transition"
                        onSubmit={(e) => handleSubmit(e)}
                    >
                        Ajouter le film
                    </button>
                </form>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
};

export default AddMovie;