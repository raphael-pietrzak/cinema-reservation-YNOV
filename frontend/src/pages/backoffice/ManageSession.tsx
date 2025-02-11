import {ManageSessionCard} from "../../features/movies-list/components/ManageSessionCard.tsx";
import {Session} from "../../features/movies-list/types/session.ts";
import {Movie} from "../../features/movies-list/types/movie.ts";

function ManageSession() {
    const handleSave = (movie: Movie) => {
        console.log('Film sauvegardé :', movie);
    };

    const mockMovies: Movie[] = [
        { title: "Inception", year: "2010", duration: "148", rating: 5, genre: "Science-Fiction", image: "inception.jpg" },
        { title: "Interstellar", year: "2014", duration: "169", rating: 5, genre: "Science-Fiction", image: "interstellar.jpg" },
        { title: "The Dark Knight", year: "2008", duration: "152", rating: 5, genre: "Action", image: "dark_knight.jpg" },
        { title: "Titanic", year: "1997", duration: "195", rating: 5, genre: "Romance", image: "titanic.jpg" },
    ];

    const mockSessions: Session[] = [
        { movie: mockMovies[0], room: "Salle 1", time: "14:00", totalSeats: 100, reservedSeats: 25 },
        { movie: mockMovies[1], room: "Salle 3", time: "16:30", totalSeats: 80, reservedSeats: 50 },
        { movie: mockMovies[2], room: "Salle 2", time: "18:00", totalSeats: 120, reservedSeats: 100 },
        { movie: mockMovies[3], room: "Salle 5", time: "20:00", totalSeats: 90, reservedSeats: 60 },
    ];

    // const handleSave = (session: Session): void => {
    //     console.log('Séance sauvegardée :', session);
    // }

    return (
        <div className="mx-auto min-h-screen py-8 px-4 max-w-6xl">
            <h1 className="text-3xl font-bold mb-4">Gestion des séances</h1>
            <div className="flex flex-wrap gap-2">
                {mockSessions.map(session => (
                    <ManageSessionCard session={session} movies={mockMovies}
                                       // onSave={handleSave}
                    />
                ))}
            </div>
        </div>
    );
}
export default ManageSession;

