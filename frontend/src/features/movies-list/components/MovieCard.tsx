// src/features/movies-list/components/MovieCard.tsx
import React from 'react';
import { Star, Clock, Calendar } from 'lucide-react';
import { Movie } from '../types/movie';

interface MovieCardProps {
  movie: Movie;
  onClick?: () => void;
}

export function MovieCard({ movie, onClick }: MovieCardProps) {
  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      className="bg-gray-900 text-gray-100 cursor-pointer
      dark:bg-white
      rounded-xl shadow-lg overflow-hidden transform transition-transform hover:scale-105"
        /*className="bg-gray-900 text-gray-100 dark:bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform hover:scale-105 cursor-pointer"*/
    >
      <div className="h-48 overflow-hidden">
        <img 
          src={movie.image || "public/placeholder.png"} 
          alt={movie.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-2">{movie.name}</h2>
        <div className="flex items-center gap-4 text-gray-600 mb-4">
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {movie.year}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {`${Math.trunc(movie.duration / 60)}h ${movie.duration % 60}min`}
          </span>
        </div>
        <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
          {movie.genre}
        </span>
      </div>
    </div>
  );
}
