import { useState } from 'react';
import { Star, Clock, Calendar, Trash, Save } from 'lucide-react';
import { Movie } from '../types/movie';

interface ManageMovieCardProps {
    movie?: Movie;
    onSave: (updatedMovie: Movie) => void;
    onDelete?: () => void;
}

export function ManageMovieCard({ movie, onSave, onDelete }: ManageMovieCardProps) {
    const [editedMovie, setEditedMovie] = useState<Movie>(
        movie || { title: '', year: '', duration: '', rating: 1, genre: '', image: '' }
    );

    const handleChange = (field: keyof Movie, value: string | number) => {
        setEditedMovie((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <div className="bg-gray-900 text-gray-100 dark:bg-white rounded-xl shadow-lg p-6 w-96 custom-flex-third-container">
            <div className="h-48 overflow-hidden flex justify-center items-center bg-gray-700">
                {editedMovie.image ? (
                    <img src={editedMovie.image} alt={editedMovie.title} className="w-full h-full object-cover" />
                ) : (
                    <span className="text-gray-400">No Image</span>
                )}
            </div>

            <div className="flex flex-col gap-4 mt-4">
                <input
                    className="text-gray-900"
                    type="text"
                    placeholder="Titre du film"
                    value={editedMovie.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                />

                <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <input
                        className="text-gray-900"
                        type="text"
                        placeholder="Année"
                        value={editedMovie.year}
                        onChange={(e) => handleChange('year', e.target.value)}
                    />
                </div>

                <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <input
                        className="text-gray-900"
                        type="text"
                        placeholder="Durée (min)"
                        value={editedMovie.duration}
                        onChange={(e) => handleChange('duration', e.target.value)}
                    />
                </div>

                <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <input
                        className="text-gray-900"
                        type="number"
                        placeholder="Note (1-5)"
                        value={editedMovie.rating}
                        min={1}
                        max={5}
                        onChange={(e) => handleChange('rating', Number(e.target.value))}
                    />
                </div>

                <input
                    className="text-gray-900"
                    type="text"
                    placeholder="Genre"
                    value={editedMovie.genre}
                    onChange={(e) => handleChange('genre', e.target.value)}
                />
            </div>

            <div className="flex justify-between mt-4">
                {onDelete && (
                    <button className="text-gray-100 bg-green-600 font-bold  flex justify-around items-center rounded pl-2 pr-2" variant="destructive" onClick={onDelete}>
                        <Trash className="w-4 h-4 mr-2" /> Supprimer
                    </button>
                )}
                <button className="text-gray-100 bg-green-600 font-bold  flex justify-around items-center rounded pl-2 pr-2" onClick={() => onSave(editedMovie)}>
                    <Save className="w-4 h-4 mr-2" /> Sauvegarder
                </button>
            </div>
        </div>
    );
}
