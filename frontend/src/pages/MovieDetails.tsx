 import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Movie } from '../features/movies-list/types/movie';
import { API_URLS } from '../config/api';

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`${API_URLS.movies.getAll}/${id}`);
        setMovie(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovie();
  }, [id]);

  if (!movie) return <div>Chargement...</div>;

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{movie.name}</h1>
        <div className="bg-gray-900 rounded-xl overflow-hidden">
          <img 
            src={movie.image || "/placeholder.png"} 
            alt={movie.name}
            className="w-full h-64 object-cover"
          />
          <div className="p-6">
            <p className="text-gray-300 mb-4">{movie.actors}</p>
            <div className="flex gap-4">
              <span>{movie.year}</span>
              <span>{movie.genre}</span>
              <span>{`${Math.trunc(movie.duration / 60)}h ${movie.duration % 60}min`}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
