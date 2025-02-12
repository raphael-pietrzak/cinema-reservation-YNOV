import React, { useState, useEffect } from 'react';
import { ManageSessionCard, Session } from "../../features/movies-list/components/ManageSessionCard";
import { Movie } from "../../features/movies-list/types/movie";
import { API_URLS } from '../../config/api'; 

function ManageSession() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);

  // Récupération des films depuis l'API users (URL définie dans API_URLS.movies.getAll)
  useEffect(() => {
    fetch(API_URLS.movies.getAll)
      .then(response => response.json())
      .then((data: Movie[]) => {
        // On suppose que l'API renvoie un tableau d'objets comportant la propriété "name"
        setMovies(data);
      })
      .catch(error => console.error('Erreur lors de la récupération des films :', error));
  }, []);

  // Récupération des séances depuis l'API Django (URL définie dans API_URLS.sessions.getAll)
  useEffect(() => {
    fetch(API_URLS.sessions.getAll)
      .then(response => response.json())
      .then((data) => {
        // Mapping : transformation des clés snake_case renvoyées par Django vers le type Session
        const mappedSessions: Session[] = data.map((session: any) => ({
          id: session.id,
          film: session.film,
          date: session.date,
          start_time: session.start_time,
          end_time: session.end_time,
          totalSeats: session.total_seats,
          availableSeats: session.available_seats,
        }));
        setSessions(mappedSessions);
      })
      .catch(error => console.error('Erreur lors de la récupération des séances :', error));
  }, []);

  const handleSave = (updatedSession: Session) => {
    console.log('Séance sauvegardée :', updatedSession);
    // Pour la mise à jour, nous vérifions si l'objet possède déjà un id
    if (updatedSession.id) {
      // Mise à jour (PUT) vers l'URL API_URLS.sessions.update en passant l'id
      fetch(API_URLS.sessions.update(String(updatedSession.id)), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          film: updatedSession.film,
          room: "N/A", // Le champ room est requis par le modèle, donc on fournit une valeur par défaut
          date: updatedSession.date,
          start_time: updatedSession.start_time,
          end_time: updatedSession.end_time,
          total_seats: updatedSession.totalSeats,
          available_seats: updatedSession.availableSeats
        })
      })
        .then(response => {
          if (!response.ok) {
            throw new Error("Erreur lors de la mise à jour de la séance");
          }
          return response.json();
        })
        .then(data => console.log("Séance mise à jour :", data))
        .catch(error => console.error("Erreur :", error));
    } else {
      // Création (POST) vers API_URLS.sessions.create si la séance n'existe pas encore
      fetch(API_URLS.sessions.create, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          film: updatedSession.film,
          room: "N/A", // Valeur par défaut pour room
          date: updatedSession.date,
          start_time: updatedSession.start_time,
          end_time: updatedSession.end_time,
          total_seats: updatedSession.totalSeats,
          available_seats: updatedSession.availableSeats
        })
      })
        .then(response => {
          if (!response.ok) {
            throw new Error("Erreur lors de la création de la séance");
          }
          return response.json();
        })
        .then(data => console.log("Séance créée :", data))
        .catch(error => console.error("Erreur :", error));
    }
  };

  return (
    <div className="mx-auto min-h-screen py-8 px-4 max-w-6xl">
      <h1 className="text-3xl font-bold mb-4">Gestion des séances</h1>
      <div className="flex flex-wrap gap-2">
        {sessions.map((session, index) => (
          <ManageSessionCard key={index} session={session} movies={movies} onSave={handleSave} />
        ))}
      </div>
    </div>
  );
}

export default ManageSession;
