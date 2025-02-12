import React from 'react';

interface GenreFilterProps {
  genres: string[];
  selectedGenre: string;
  onGenreSelect: (genre: string) => void;
}

export function GenreFilter({ genres, selectedGenre, onGenreSelect }: GenreFilterProps) {
  return (
    <div className="flex gap-2">
      {genres.map(genre => (
        <button
          key={genre}
          onClick={() => onGenreSelect(genre)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
            ${selectedGenre === genre 
              ? 'bg-primary text-white' 
              : 'bg-white text-gray-700 hover:bg-gray-50'}`}
        >
          {genre}
        </button>
      ))}
    </div>
  );
}