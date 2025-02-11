import React, { useState } from 'react';
import { Film } from 'lucide-react';
import { MovieCard } from '../features/movies-list/components/MovieCard';
import { GenreFilter } from '../features/movies-list/components/GenreFilter';
import { movies } from '../features/movies-list/data/movies';
import { Movie } from '../features/movies-list/types/movie';

function MoviesList() {
  const [moviesList] = useState<Movie[]>(movies);
  const [selectedGenre, setSelectedGenre] = useState<string>('All');

  const genres = ['All', ...new Set(moviesList.map(movie => movie.genre))];
  const filteredMovies = selectedGenre === 'All' 
    ? moviesList 
    : moviesList.filter(movie => movie.genre === selectedGenre);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
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
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MoviesList;