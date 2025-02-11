import {ManageUserCard} from "../../features/movies-list/components/ManageUserCard.tsx";

function ManageUser() {
    // const handleSave = (movie: Movie) => {
    //     console.log('Film sauvegardé :', movie);
    // };

    const mockUsers = [
        { username: "admin", email: "admin@admin.com", password: "admin", isAdmin: true },
        { username: "admin", email: "admin@admin.com", password: "admin", isAdmin: true },
        { username: "admin", email: "admin@admin.com", password: "admin", isAdmin: true },
        { username: "admin", email: "admin@admin.com", password: "admin", isAdmin: true },
        { username: "admin", email: "admin@admin.com", password: "admin", isAdmin: true },

    ]
    // const handleSave = (session: Session): void => {
    //     console.log('Séance sauvegardée :', session);
    // }

    return (
        <div className="mx-auto min-h-screen py-8 px-4 max-w-6xl">
            <h1 className="text-3xl font-bold mb-4">Gestion des comptes</h1>
            <div className="flex flex-wrap gap-2">
                {mockUsers.map(user => (
                    <ManageUserCard
                        user={user}
                        // onSave={handleSave}
                    />
                ))}
            </div>
        </div>
    );
}
export default ManageUser;

