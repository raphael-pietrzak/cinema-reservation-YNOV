import React from 'react';
import { MovieCard } from '../features/movies-list/components/MovieCard';

const featuredMovie = {
    title: "Oppenheimer",
    image: "https://all.web.img.acsta.net/r_2500_x/pictures/23/05/26/16/52/2793170.jpg",
    year: "2023",
    duration: "3h",
    rating: "8.5",
    genre: "Biographie, Drame, Histoire"
};

const movies = [
    {
        title: "Dune: Part Two",
        image: "https://image.tmdb.org/t/p/original/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
        year: "2024",
        duration: "2h 46m",
        rating: "9.0",
        genre: "Science-fiction"
    },
    {
        title: "The Batman",
        image: "https://image.tmdb.org/t/p/original/74xTEgt7R36Fpooo50r9T25onhq.jpg",
        year: "2022",
        duration: "2h 56m",
        rating: "7.9",
        genre: "Action, Crime, Drame"
    }
];

const Home = () => {
    return (
        <div className="mx-auto min-h-screen py-8 px-4 max-w-6xl">
            {/* Film à l'affiche */}
            <div className="relative w-full h-[500px] rounded-lg overflow-hidden shadow-lg">
                <img
                    src={featuredMovie.image}
                    alt={featuredMovie.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                    <h1 className="text-3xl font-bold">{featuredMovie.title}</h1>
                    <p className="mt-2 text-lg">À l'affiche - {featuredMovie.year}</p>
                </div>
            </div>

            {/* Liste de films */}
            <h2 className="text-2xl font-bold mt-8 mb-4">Films populaires</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {movies.map((movie, index) => (
                    <MovieCard key={index} movie={movie} />
                ))}
            </div>
        </div>
    );
};

export default Home;
