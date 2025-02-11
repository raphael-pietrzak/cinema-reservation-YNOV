import { useState } from 'react';
import { Clock, Save } from 'lucide-react';
import { Movie } from '../types/movie';

interface Session {
    movie: Movie;
    room: string;
    time: string;
    totalSeats: number;
    reservedSeats: number;
}

interface ManageSessionCardProps {
    session?: Session;
    movies: Movie[];
    onSave: (updatedSession: Session) => void;
}

const rooms = ["Salle 1", "Salle 2", "Salle 3", "Salle 4", "Salle 5"];

export function ManageSessionCard({ session, movies, onSave }: ManageSessionCardProps) {
    const [editedSession, setEditedSession] = useState<Session>(
        session || { movie: movies[0], room: rooms[0], time: '', totalSeats: 100, reservedSeats: 0 }
    );

    const handleChange = (field: keyof Session, value: string | number | Movie) => {
        setEditedSession((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <div className="bg-gray-900 text-gray-100 dark:bg-white rounded-xl shadow-lg p-6 w-96 text-gray-900 custom-flex-third-container">
            <div className="flex flex-col gap-4">
                <label className="text-gray-700 text-lg">Film</label>
                <select className="bg-gray-200 pl-2 pr-2 rounded" value={editedSession.movie.title} onChange={(e) => handleChange('movie', movies.find(m => m.title === e.target.value) || movies[0])}>
                    {movies.map((movie) => (
                        <option key={movie.title} value={movie.title}>
                            {movie.title}
                        </option>
                    ))}
                </select>

                <label className="text-gray-700 text-lg">Salle</label>
                <select className="bg-gray-200 pl-2 pr-2 rounded" value={editedSession.room} onChange={(e) => handleChange('room', e.target.value)}>
                    {rooms.map((room) => (
                        <option key={room} value={room}>
                            {room}
                        </option>
                    ))}
                </select>

                <label className="text-gray-700 text-lg">Horaire</label>
                <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <input className="bg-gray-200 pl-2 pr-2 rounded" type="time" value={editedSession.time} onChange={(e) => handleChange('time', e.target.value)} />
                </div>

                <label className="text-gray-700 text-lg">Nombre total de places</label>
                <input className="bg-gray-200 pl-2 pr-2 rounded" type="number" value={editedSession.totalSeats} min={1} onChange={(e) => handleChange('totalSeats', Number(e.target.value))} />

                <label className="text-gray-700 text-lg">Places réservées</label>
                <input className="bg-gray-200 pl-2 pr-2 rounded disabled:bg-gray-600 disabled:text-gray-100" type="number" disabled value={editedSession.reservedSeats} min={0} max={editedSession.totalSeats} onChange={(e) => handleChange('reservedSeats', Number(e.target.value))} />
            </div>

            <div className="flex justify-end mt-4">
                <button onClick={() => onSave(editedSession)} className="bg-blue-500 text-white px-4 py-2 rounded">
                    <Save className="w-4 h-4 mr-2 inline" /> Sauvegarder
                </button>
            </div>
        </div>
    );
}
