// ManageSessionCard.tsx
import { useState } from 'react';
import { Save } from 'lucide-react';
import { Movie } from '../types/movie';

export interface Session {
  id?: number;         // Identifiant de la séance (optionnel)
  film: string;        // Nom du film
  date: string;        // format YYYY-MM-DD
  start_time: string;  // format HH:MM ou HH:MM:SS
  end_time: string;    // format HH:MM ou HH:MM:SS
  totalSeats: number;
  availableSeats: number;
}

interface ManageSessionCardProps {
  session?: Session;
  movies: Movie[];
  onSave: (updatedSession: Session) => void;
}

export function ManageSessionCard({ session, movies, onSave }: ManageSessionCardProps) {
  const [editedSession, setEditedSession] = useState<Session>(
    session || {
      film: movies.length > 0 ? movies[0].name : '',
      date: '',
      start_time: '',
      end_time: '',
      totalSeats: 100,
      availableSeats: 100,
    }
  );

  const handleChange = (field: keyof Session, value: string | number) => {
    setEditedSession((prev) => ({ ...prev, [field]: value }));
  };

  return (
      <div className="bg-gray-100 text-gray-100 dark:bg-gray-900 rounded-xl shadow-lg p-6 w-96 custom-flex-third-container">
        <div className="flex flex-col gap-4">
          {/* Sélection du film */}
          <label className="block text-sm font-medium text-gray-800 dark:text-gray-200">Film</label>
        <select
          className="mt-1 block w-full border-gray-400 dark:border-gray-600 rounded shadow-sm focus:ring-primary focus:border-primary px-1 text-gray-900 dark:text-gray-100 bg-gray-200 dark:bg-gray-700"
          value={editedSession.film}
          onChange={(e) => handleChange('film', e.target.value)}
        >
          {movies.map((movie) => (
            <option key={movie.name} value={movie.name}>
              {movie.name}
            </option>
          ))}
        </select>

        {/* Date */}
        <label className="block text-sm font-medium text-gray-800 dark:text-gray-200">Date</label>
        <input
          className="mt-1 block w-full border-gray-400 dark:border-gray-600 rounded shadow-sm focus:ring-primary focus:border-primary px-1 text-gray-900 dark:text-gray-100 bg-gray-200 dark:bg-gray-700"
          type="date"
          value={editedSession.date}
          onChange={(e) => handleChange('date', e.target.value)}
        />

        {/* Heure de début */}
        <label className="block text-sm font-medium text-gray-800 dark:text-gray-200">Heure de début</label>
        <input
          className="mt-1 block w-full border-gray-400 dark:border-gray-600 rounded shadow-sm focus:ring-primary focus:border-primary px-1 text-gray-900 dark:text-gray-100 bg-gray-200 dark:bg-gray-700"
          type="time"
          value={editedSession.start_time}
          onChange={(e) => handleChange('start_time', e.target.value)}
        />

        {/* Heure de fin */}
        <label className="block text-sm font-medium text-gray-800 dark:text-gray-200">Heure de fin</label>
        <input
          className="mt-1 block w-full border-gray-400 dark:border-gray-600 rounded shadow-sm focus:ring-primary focus:border-primary px-1 text-gray-900 dark:text-gray-100 bg-gray-200 dark:bg-gray-700"
          type="time"
          value={editedSession.end_time}
          onChange={(e) => handleChange('end_time', e.target.value)}
        />

        {/* Nombre total de places */}
        <label className="block text-sm font-medium text-gray-800 dark:text-gray-200">Nombre total de places</label>
        <input
          className="mt-1 block w-full border-gray-400 dark:border-gray-600 rounded shadow-sm focus:ring-primary focus:border-primary px-1 text-gray-900 dark:text-gray-100 bg-gray-200 dark:bg-gray-700"
          type="number"
          value={editedSession.totalSeats}
          min={1}
          onChange={(e) => handleChange('totalSeats', Number(e.target.value))}
        />

        {/* Places disponibles */}
        <label className="block text-sm font-medium text-gray-800 dark:text-gray-200">Places disponibles</label>
        <input
          className="mt-1 block w-full border-gray-400 dark:border-gray-600 rounded shadow-sm focus:ring-primary focus:border-primary px-1 text-gray-900 dark:text-gray-100 bg-gray-200 dark:bg-gray-700"
          type="number"
          value={editedSession.availableSeats}
          min={0}
          max={editedSession.totalSeats}
          onChange={(e) => handleChange('availableSeats', Number(e.target.value))}
        />
      </div>

      <div className="flex justify-end mt-4">
        <button onClick={() => onSave(editedSession)} className="font-bold text-green-500 flex justify-around items-center rounded pl-2 pr-2 text-xl">
          <Save/>
        </button>
      </div>
    </div>
  );
}
