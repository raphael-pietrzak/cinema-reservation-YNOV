import React, { useState } from 'react';
import { Calendar, Clock, Star, Users, Film, ThumbsUp, Timer } from 'lucide-react';

// Mock data - in a real app this would come from an API
const movie = {
  title: "Dune: Part Two",
  rating: 8.7,
  duration: "166",
  genre: "Science Fiction",
  director: "Denis Villeneuve",
  image: "https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?auto=format&fit=crop&q=80&w=1200",
  description: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
  sessions: [
    { id: 1, time: "14:30", date: "2024-03-15", room: "IMAX 1", seatsAvailable: 45 },
    { id: 2, time: "17:45", date: "2024-03-15", room: "Room 3", seatsAvailable: 28 },
    { id: 3, time: "20:15", date: "2024-03-15", room: "IMAX 1", seatsAvailable: 52 },
  ]
};

function MovieDetailsPage() {
  const [selectedSession, setSelectedSession] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section with Movie Poster */}
      <div className="relative h-[60vh] w-full">
        <div className="absolute inset-0">
          <img 
            src={movie.image} 
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
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

      {/* Movie Details */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Movie Information */}
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

          {/* Showtimes */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4">Available Sessions</h2>
              <div className="space-y-4">
                {movie.sessions.map((session) => (
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
                        <span>{session.time}</span>
                      </div>
                    </div>
                    <div className="mt-2 flex justify-between items-center text-sm text-gray-600">
                      <span>{session.room}</span>
                      <span>{session.seatsAvailable} seats available</span>
                    </div>
                  </div>
                ))}
              </div>
              <button 
                className={`w-full mt-6 py-3 px-4 rounded-lg font-semibold transition-colors ${
                  selectedSession 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                disabled={!selectedSession}
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