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
    <div className="bg-gray-900 text-gray-100 dark:bg-white rounded-xl shadow-lg p-6 w-96 text-gray-900 custom-flex-third-container">
      <div className="flex flex-col gap-4">
        {/* Sélection du film */}
        <label className="text-gray-700 text-lg">Film</label>
        <select
          className="bg-gray-200 pl-2 pr-2 rounded"
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
        <label className="text-gray-700 text-lg">Date</label>
        <input
          className="bg-gray-200 pl-2 pr-2 rounded"
          type="date"
          value={editedSession.date}
          onChange={(e) => handleChange('date', e.target.value)}
        />

        {/* Heure de début */}
        <label className="text-gray-700 text-lg">Heure de début</label>
        <input
          className="bg-gray-200 pl-2 pr-2 rounded"
          type="time"
          value={editedSession.start_time}
          onChange={(e) => handleChange('start_time', e.target.value)}
        />

        {/* Heure de fin */}
        <label className="text-gray-700 text-lg">Heure de fin</label>
        <input
          className="bg-gray-200 pl-2 pr-2 rounded"
          type="time"
          value={editedSession.end_time}
          onChange={(e) => handleChange('end_time', e.target.value)}
        />

        {/* Nombre total de places */}
        <label className="text-gray-700 text-lg">Nombre total de places</label>
        <input
          className="bg-gray-200 pl-2 pr-2 rounded"
          type="number"
          value={editedSession.totalSeats}
          min={1}
          onChange={(e) => handleChange('totalSeats', Number(e.target.value))}
        />

        {/* Places disponibles */}
        <label className="text-gray-700 text-lg">Places disponibles</label>
        <input
          className="bg-gray-200 pl-2 pr-2 rounded"
          type="number"
          value={editedSession.availableSeats}
          min={0}
          max={editedSession.totalSeats}
          onChange={(e) => handleChange('availableSeats', Number(e.target.value))}
        />
      </div>

      <div className="flex justify-end mt-4">
        <button onClick={() => onSave(editedSession)} className="bg-blue-500 text-white px-4 py-2 rounded">
          <Save className="w-4 h-4 mr-2 inline" /> Sauvegarder
        </button>
      </div>
    </div>
  );
}
