import {ManageMovieCard} from "../../features/movies-list/components/ManageMovieCard.tsx";
import {MovieCard} from "../../features/movies-list/components/MovieCard.tsx";
import { movies } from '../../features/movies-list/data/movies.ts';
import { Movie } from '../../features/movies-list/types/movie.ts';

function ManageMovie() {
    const handleSave = (movie: Movie) => {
        console.log('Film sauvegardé :', movie);
    };

    const handleDelete = () => {
        console.log('Film supprimé');
    }

    return (
        <div className="mx-auto min-h-screen py-8 px-4 max-w-6xl">
            <h1 className="text-3xl font-bold mb-4">Gestion des films</h1>
            <div className="flex flex-wrap gap-2">
                {movies.map(movie => (
                    <ManageMovieCard movie={movie} onSave={handleSave} onDelete={handleDelete}/>
                ))}
            </div>
        </div>
    );
}
export default ManageMovie;

