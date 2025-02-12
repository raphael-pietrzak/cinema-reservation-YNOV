const mongoose = require('./mongoose.js');
const Movie = require('./schema/movie.js');

const movies = [
    {
        name: "Sonic the Hedgehog 2",
        genre: "Aventure",
        year: 2022,
        director: "Jeff Fowler",
        duration: 122,
        image: "https://fr.web.img5.acsta.net/pictures/22/03/14/15/39/4137538.jpg",
        actors: ["PJames Marsden", "Jim Carrey", "Ben Schwartz"]
    },
    {
        name: "Sonic the Hedgehog 3",
        genre: "Aventure",
        year: 2024,
        director: "Jeff Fowler",
        duration: 110,
        actors: ["Keanu Reeves", "Jim Carrey", "Ben Schwartz"],
        age: 7,
        image: "https://m.media-amazon.com/images/M/MV5BMjZjNjE5NDEtOWJjYS00Mjk2LWI1ZDYtOWI1ZWI3MzRjM2UzXkEyXkFqcGc@._V1_.jpg"
    },
    // ... autres films ...
    {
        name: "The Matrix",
        genre: "Action",
        year: 1998,
        director: "Lilly Wachowski",
        duration: 136,
        image: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/dXNAPwY7VrqMAo51EKhhCJfaGb5.jpg",
        age: 10,
        actors: []
    }
];

async function seedDB() {
    try {
        // Supprime toutes les données existantes
        await Movie.deleteMany({});
        
        // Insère les nouvelles données
        await Movie.insertMany(movies);
        
        console.log('Base de données initialisée avec succès !');
    } catch (err) {
        console.error('Erreur lors de l\'initialisation de la base de données:', err);
    } finally {
        // Ferme la connexion
        mongoose.connection.close();
    }
}

seedDB();
