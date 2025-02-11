import React, { useState, useEffect } from "react";
import axios from "axios";
import { FilmSelect } from "./components/FilmSelect";
import { defaultFormData } from "./data/formDefaults";
import { SessionFormData } from "./types/session";

interface Film {
  id: number;
  name: string;
}

const CreateSessionPage: React.FC = () => {
  const [films, setFilms] = useState<Film[]>([]); // Liste des films
  const [formData, setFormData] = useState<SessionFormData>(defaultFormData); // Données du formulaire

  // Récupération des films via l'API
  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const response = await axios.get("http://192.168.160.243:1590/movie"); // URL de l'API des films
        setFilms(response.data as Film[]);
      } catch (error) {
        console.error("Erreur lors de la récupération des films :", error);
      }
    };

    fetchFilms();
  }, []);

  // Gérer les changements dans les champs du formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Gérer les changements pour la sélection des films
  const handleFilmSelect = (filmId: string) => {
    setFormData({ ...formData, filmId });
  };

  // Soumettre le formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/cinema_sessions/", formData); // URL de l'API des sessions
      alert("Session créée avec succès !");
      setFormData(defaultFormData); // Réinitialiser le formulaire
    } catch (error) {
      console.error("Erreur lors de la création de la session :", error);
      alert("Une erreur est survenue.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Créer une séance</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Composant pour sélectionner un film */}
        <FilmSelect films={films} selectedFilmId={formData.filmId} onChange={handleFilmSelect} />

        {/* Salle */}
        <div>
          <label htmlFor="room" className="block text-sm font-medium text-gray-700">
            Salle :
          </label>
          <input
            type="text"
            id="room"
            name="room"
            value={formData.room}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        {/* Date */}
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Date :
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        {/* Heure de début */}
        <div>
          <label htmlFor="start_time" className="block text-sm font-medium text-gray-700">
            Heure de début :
          </label>
          <input
            type="time"
            id="start_time"
            name="start_time"
            value={formData.start_time}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        {/* Heure de fin */}
        <div>
          <label htmlFor="end_time" className="block text-sm font-medium text-gray-700">
            Heure de fin :
          </label>
          <input
            type="time"
            id="end_time"
            name="end_time"
            value={formData.end_time}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        {/* Nombre total de places */}
        <div>
          <label htmlFor="total_seats" className="block text-sm font-medium text-gray-700">
            Nombre de places :
          </label>
          <input
            type="number"
            id="total_seats"
            name="total_seats"
            value={formData.total_seats}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-700"
        >
          Créer la séance
        </button>
      </form>
    </div>
  );
};

export default CreateSessionPage;
