import { useState, useEffect } from 'react';
import { Star, Clock, Calendar, Trash, Save } from 'lucide-react';
import { Movie } from '../types/movie';

interface ManageMovieCardProps {
    movie: Movie;
    onSave: (updatedMovie: Movie) => void;
    onDelete: (toDeleteMovie: Movie) => void;
}

export function ManageMovieCard({ movie, onSave, onDelete }: ManageMovieCardProps) {
    const [editedMovie, setEditedMovie] = useState<Movie>(movie);

    const handleChange = (field: keyof Movie, value: string | number) => {
        setEditedMovie((prev) => ({ ...prev, [field]: value }));
    };


    useEffect(() => {
        setEditedMovie(movie);
    }, [movie])

    return (
        <div className="bg-gray-100 text-gray-100 dark:bg-gray-900 rounded-xl shadow-lg p-6 w-96 custom-flex-third-container">
            <div className="h-48 overflow-hidden flex justify-center items-center bg-gray-700 rounded">
                {editedMovie.image ? (
                    <img src={editedMovie.image} alt={editedMovie.name} className="w-full h-full object-cover" />
                ) : (
                    <span className="text-gray-400">No Image</span>
                )}
            </div>

            <div className="flex flex-col gap-4 mt-4">
                <input
                    className="mt-1 block w-full border-gray-400 dark:border-gray-600 rounded shadow-sm focus:ring-primary focus:border-primary px-1 text-gray-900 dark:text-gray-100 bg-gray-200 dark:bg-gray-700"
                    type="text"
                    placeholder="Titre du film"
                    value={editedMovie.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                />

                <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <input
                        className="mt-1 block w-full border-gray-400 dark:border-gray-600 rounded shadow-sm focus:ring-primary focus:border-primary px-1 text-gray-900 dark:text-gray-100 bg-gray-200 dark:bg-gray-700"
                        type="text"
                        placeholder="Année"
                        value={editedMovie.year}
                        onChange={(e) => handleChange('year', e.target.value)}
                    />
                </div>

                <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <input
                        className="mt-1 block w-full border-gray-400 dark:border-gray-600 rounded shadow-sm focus:ring-primary focus:border-primary px-1 text-gray-900 dark:text-gray-100 bg-gray-200 dark:bg-gray-700"
                        type="text"
                        placeholder="Durée (min)"
                        value={editedMovie.duration}
                        onChange={(e) => handleChange('duration', e.target.value)}
                    />
                </div>

                <input
                    className="mt-1 block w-full border-gray-400 dark:border-gray-600 rounded shadow-sm focus:ring-primary focus:border-primary px-1 text-gray-900 dark:text-gray-100 bg-gray-200 dark:bg-gray-700"
                    type="text"
                    placeholder="Genre"
                    value={editedMovie.genre}
                    onChange={(e) => handleChange('genre', e.target.value)}
                />
            </div>

            <div className="flex justify-between mt-4">
                <button
                    className="font-bold text-green-500 flex justify-around items-center rounded pl-2 pr-2 text-xl"
                    onClick={() => onSave(editedMovie)}>
                    <Save />
                </button>
                {onDelete && (
                    <button
                        className="font-bold text-red-500 flex justify-around items-center rounded pl-2 pr-2 text-xl"
                        onClick={() => onDelete(editedMovie)}>
                        <Trash className=""/>
                    </button>
                )}
            </div>
        </div>
    );
}
