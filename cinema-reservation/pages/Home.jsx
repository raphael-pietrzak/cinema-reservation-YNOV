"use client";




import React, { useState, useEffect } from "react";
import MovieCard from "@/components/MovieCard";
import {getFakeMovies, getMovies} from "@/services/movieService";

const Home = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

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

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Films à l'affiche</h1>
            {loading ? (
                <p>Chargement des films...</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;
