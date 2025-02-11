import { Movie } from '../types/movie';

export const movies: Movie[] = [
  {
    id: 1,
    title: "Inception",
    year: 2010,
    rating: 4.8,
    duration: "2h 28min",
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=800",
    genre: "Sci-Fi"
  },
  {
    id: 2,
    title: "The Shawshank Redemption",
    year: 1994,
    rating: 4.9,
    duration: "2h 22min",
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=800",
    genre: "Drama"
  },
  {
    id: 3,
    title: "Pulp Fiction",
    year: 1994,
    rating: 4.7,
    duration: "2h 34min",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=800",
    genre: "Crime"
  }
];