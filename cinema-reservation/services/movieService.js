// src/services/movieService.js
import axios from "axios";

const API_URL = "http://localhost:5000/api"; // Remplacez par l'URL de votre backend

export const getMovies = () => axios.get(`${API_URL}/movies`);
export const addMovie = (movie) => axios.post(`${API_URL}/movies`, movie);
export const updateMovie = (id, movie) => axios.put(`${API_URL}/movies/${id}`, movie);
export const deleteMovie = (id) => axios.delete(`${API_URL}/movies/${id}`);

export const getFakeMovies = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ data: fakeMovies });
        }, 1000);
    });
};

const fakeMovies = [
    {
        id: 1,
        title: "Avengers: Endgame",
        genre: "Action",
        duration: 181,
        director: "Anthony Russo, Joe Russo",
    },
    {
        id: 2,
        title: "The Dark Knight",
        genre: "Action",
        duration: 152,
        director: "Christopher Nolan",
    },
    {
        id: 3,
        title: "Inception",
        genre: "Science-fiction",
        duration: 148,
        director: "Christopher Nolan",
    },
    {
        id: 4,
        title: "Forrest Gump",
        genre: "Drama",
        duration: 142,
        director: "Robert Zemeckis",
    },
];