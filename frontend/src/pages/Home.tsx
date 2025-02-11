// src/pages/Home.tsx
import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import { MovieCard } from '../features/movies-list/components/MovieCard';
import { Movie } from '../features/movies-list/types/movie';
import { API_URLS } from '../config/api';

const Home = () => {
  const [moviesList, setMovies] = useState<Movie[]>([]);
  const [featuredMovie, setFeatured] = useState<Movie | null>(null);
  const navigate = useNavigate();

  const fetchMovies = async () => {
    try {
      const response: AxiosResponse = await axios.get(API_URLS.movies.getAll);
      const data: Movie[] = response.data;
      // Transformation pour utiliser _id comme id si présent
      const transformed = data.map(movie => ({
        ...movie,
        id: movie._id || movie.id,
      }));
      setMovies(transformed);
      setFeatured(transformed[0]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleFeaturedClick = () => {
    if (featuredMovie && (featuredMovie._id || featuredMovie.id)) {
      const id = featuredMovie._id || featuredMovie.id;
      navigate(`/movie-detail/${id}`);
    }
  };

  return (
    <div className="mx-auto min-h-screen py-8 px-4 max-w-6xl">
      {/* Film à l'affiche */}
      {featuredMovie && (
        <div 
          className="relative w-full h-[500px] rounded-lg overflow-hidden shadow-lg cursor-pointer"
          onClick={handleFeaturedClick}
        >
          <img
            src={featuredMovie.image}
            alt={featuredMovie.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
            <h1 className="text-3xl font-bold">{featuredMovie.name}</h1>
            <p className="mt-2 text-lg">À l'affiche - {featuredMovie.year}</p>
          </div>
        </div>
      )}

      {/* Liste de films */}
      <h2 className="text-2xl font-bold mt-8 mb-4">Films populaires</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {moviesList.map((movie, index) => (
          <MovieCard 
            key={movie._id || movie.id || index}
            movie={movie}
            onClick={() => {
              const id = movie._id || movie.id;
              navigate(`/movie-detail/${id}`);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
