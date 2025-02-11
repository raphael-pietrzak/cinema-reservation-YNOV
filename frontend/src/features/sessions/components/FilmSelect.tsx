import React from "react";

interface Film {
  id: number;
  name: string;
}

interface FilmSelectProps {
  films: Film[];
  selectedFilmId: string;
  onChange: (filmId: string) => void;
}

export function FilmSelect({ films, selectedFilmId, onChange }: FilmSelectProps) {
  return (
    <div className="mb-4">
      <label htmlFor="filmId" className="block text-sm font-medium text-gray-700">
        Film :
      </label>
      <select
        id="filmId"
        name="filmId"
        value={selectedFilmId}
        onChange={(e) => onChange(e.target.value)}
        required
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      >
        <option value="">Sélectionnez un film</option>
        {films.map((film) => (
          <option key={film.id} value={film.id}>
            {film.name}
          </option>
        ))}
      </select>
    </div>
  );
}
