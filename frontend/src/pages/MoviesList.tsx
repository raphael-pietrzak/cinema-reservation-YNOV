// src/pages/MoviesList.tsx
import React, { useState, useEffect } from 'react';
import { Film } from 'lucide-react';
import axios, { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import { MovieCard } from '../features/movies-list/components/MovieCard';
import { GenreFilter } from '../features/movies-list/components/GenreFilter';
import { Movie } from '../features/movies-list/types/movie';
import { API_URLS } from '../config/api';

function MoviesList() {
  const [moviesList, setMovies] = useState<Movie[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string>('All');
  const navigate = useNavigate();

  const fetchMovies = async () => {
    try {
      const response: AxiosResponse = await axios.get(API_URLS.movies.getAll);
      const data: Movie[] = response.data;
      const transformed = data.map(movie => ({
        ...movie,
        id: movie._id || movie.id,
      }));
      setMovies(transformed);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const genres = ['All', ...new Set(moviesList.map(movie => movie.genre))];
  const filteredMovies = selectedGenre === 'All'
    ? moviesList
    : moviesList.filter(movie => movie.genre === selectedGenre);

  const handleMovieClick = (movie: Movie) => {
    const id = movie._id || movie.id;
    navigate(`/movie-detail/${id}`);
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Film className="w-8 h-8" />
            Films Populaires
          </h1>
          <GenreFilter 
            genres={genres}
            selectedGenre={selectedGenre}
            onGenreSelect={setSelectedGenre}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMovies.map(movie => (
            <MovieCard 
              key={movie._id || movie.id}
              movie={movie}
              onClick={() => handleMovieClick(movie)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MoviesList;
