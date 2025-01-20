import React from 'react';
import { Star, Clock, Calendar } from 'lucide-react';
import { Movie } from '../types/movie';

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform hover:scale-105">
      <div className="h-48 overflow-hidden">
        <img 
          src={movie.image} 
          alt={movie.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-2">{movie.title}</h2>
        <div className="flex items-center gap-4 text-gray-600 mb-4">
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {movie.year}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {movie.duration}
          </span>
          <span className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500" />
            {movie.rating}
          </span>
        </div>
        <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
          {movie.genre}
        </span>
      </div>
    </div>
  );
}