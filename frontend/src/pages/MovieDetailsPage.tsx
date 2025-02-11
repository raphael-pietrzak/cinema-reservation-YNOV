// src/pages/MovieDetailsPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, Star, Film, Timer, Users, ThumbsUp } from 'lucide-react';
import axios, { AxiosResponse } from 'axios';
import { API_URLS } from '../config/api';

interface Session {
  id: number;
  film: string;
  room: string;
  date: string;
  start_time: string;
  end_time: string;
  total_seats: number;
  available_seats: number;
}

interface Movie {
  id: number;
  name: string;
  image: string;
  year: string;
  rating: number;
  duration: string;
  genre: string;
  director: string;
  description: string;
  sessions: Session[];
}

function MovieDetailsPage() {
  const { filmId } = useParams<{ filmId: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [selectedSession, setSelectedSession] = useState<number | null>(null);

  // Récupération du film depuis l'API movies
  useEffect(() => {
    if (filmId) {
      axios.get(API_URLS.movies.getOne(filmId))
        .then((response: AxiosResponse<Movie>) => {
          const movieData = response.data;
          // Si l'API movies ne renvoie pas la propriété sessions, on l'initialise à []
          movieData.sessions = movieData.sessions || [];
          setMovie(movieData);
        })
        .catch(error => {
          console.error("Erreur lors de la récupération du film :", error);
        });
    }
  }, [filmId]);

  // Récupération des séances depuis l'API Django et filtrage par le nom du film
  useEffect(() => {
    if (movie) {
      axios.get(API_URLS.sessions.getAll)
        .then((response: AxiosResponse<Session[]>) => {
          const allSessions = response.data;
          // On filtre les séances dont le champ "film" correspond exactement au nom du film
          const filmSessions = allSessions.filter((session: Session) => session.film === movie.name);
          setMovie(prevMovie => prevMovie ? { ...prevMovie, sessions: filmSessions } : prevMovie);
        })
        .catch(error => {
          console.error("Erreur lors de la récupération des séances :", error);
        });
    }
  }, [movie]);

  const handleBookTickets = () => {
    if (selectedSession) {
      navigate(`/seat-selector/${selectedSession}`);
    }
  };

  if (!movie) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Section Hero avec l'affiche du film */}
      <div className="relative h-[60vh] w-full">
        <img 
          src={movie.image} 
          alt={movie.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <h1 className="text-4xl font-bold mb-2">{movie.name}</h1>
          <div className="flex items-center gap-4 text-gray-200">
            <span className="flex items-center gap-1">
              <Star className="w-5 h-5 text-yellow-400" />
              {movie.rating}/10
            </span>
            <span className="flex items-center gap-1">
              <Timer className="w-5 h-5" />
              {movie.duration} min
            </span>
            <span className="flex items-center gap-1">
              <Film className="w-5 h-5" />
              {movie.genre}
            </span>
          </div>
        </div>
      </div>

      {/* Détails du film */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4">Synopsis</h2>
              <p className="text-gray-600 leading-relaxed">{movie.description}</p>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-600">Director: {movie.director}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ThumbsUp className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-600">Recommended for all ages</span>
                </div>
              </div>
            </div>
          </div>

          {/* Liste des séances disponibles */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4">Available Sessions</h2>
              <div className="space-y-4">
                {(movie.sessions || []).map((session: Session) => (
                  <div 
                    key={session.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedSession === session.id 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                    onClick={() => setSelectedSession(session.id)}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-gray-500" />
                        <span>{session.date}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-gray-500" />
                        <span>{session.start_time}</span>
                      </div>
                    </div>
                    <div className="mt-2 flex justify-between items-center text-sm text-gray-600">
                      <span>{session.room}</span>
                      <span>{session.available_seats} seats available</span>
                    </div>
                  </div>
                ))}
              </div>
              <button 
                className={`w-full mt-6 py-3 px-4 rounded-lg font-semibold transition-colors ${
                  selectedSession 
                    ? 'bg-primary text-white hover:bg-blue-700' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                disabled={!selectedSession}
                onClick={handleBookTickets}
              >
                Book Tickets
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetailsPage;
