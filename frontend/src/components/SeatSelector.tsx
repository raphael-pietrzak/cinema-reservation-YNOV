import React, { useState } from 'react';
import { Armchair as Chair, Euro } from 'lucide-react';
import { API_URLS } from '../config/api';

export type Seat = {
  id: string;
  row: string;
  number: number;
  isOccupied: boolean;
  isSelected: boolean;
};

type SeatSelectorProps = {
  sessionId: number; // L'identifiant de la séance pour laquelle la réservation est effectuée
};

function SeatSelector({ sessionId }: SeatSelectorProps) {
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
  const seatsPerRow = 12;
  const prixParSiege = 9.50;

  const [seats, setSeats] = useState<Seat[]>(() => {
    const initialSeats: Seat[] = [];
    rows.forEach(row => {
      for (let i = 1; i <= seatsPerRow; i++) {
        initialSeats.push({
          id: `${row}${i}`,
          row,
          number: i,
          isOccupied: Math.random() < 0.2, // 20% des sièges occupés aléatoirement
          isSelected: false
        });
      }
    });
    return initialSeats;
  });

  const handleSeatClick = (seatId: string) => {
    setSeats(prevSeats =>
      prevSeats.map(seat =>
        seat.id === seatId && !seat.isOccupied
          ? { ...seat, isSelected: !seat.isSelected }
          : seat
      )
    );
  };

  const selectedSeats = seats.filter(seat => seat.isSelected);
  const totalPrice = selectedSeats.length * prixParSiege;

  const handleReserve = () => {
    // Récupérer le token stocké (à adapter selon votre mécanisme d'authentification)
    const token = localStorage.getItem('token');
    if (!token) {
      alert("Vous devez être connecté pour réserver.");
      return;
    }
  
    // Pour chaque siège sélectionné, envoyer une requête POST pour créer une réservation
    selectedSeats.forEach(seat => {
      fetch(API_URLS.sessions.reserve, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          cinema_session: sessionId, // Ajout du champ requis : l'ID de la séance
          seat_code: seat.id         // Le code du siège (ex: "A1")
        })
      })
        .then(response => {
          if (!response.ok) {
            throw new Error("Erreur lors de la réservation pour le siège " + seat.id);
          }
          return response.json();
        })
        .then(data => {
          console.log("Réservation réussie pour le siège", seat.id, data);
          // Optionnel : mettre à jour l'état pour marquer le siège comme occupé et désélectionné
          setSeats(prevSeats =>
            prevSeats.map(s =>
              s.id === seat.id ? { ...s, isOccupied: true, isSelected: false } : s
            )
          );
        })
        .catch(error => console.error("Erreur :", error));
    });
  };
  

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Réservation Cinéma</h1>
        
        {/* Écran */}
        <div className="w-full h-4 bg-gray-300 rounded-t-lg mb-12 relative">
          <p className="absolute -bottom-8 w-full text-center text-gray-400">ÉCRAN</p>
        </div>

        {/* Sièges */}
        <div className="space-y-4 mb-12">
          {rows.map(row => (
            <div key={row} className="flex justify-center gap-2">
              <div className="w-6 text-gray-400 flex items-center">{row}</div>
              {seats
                .filter(seat => seat.row === row)
                .map(seat => (
                  <button
                    key={seat.id}
                    onClick={() => handleSeatClick(seat.id)}
                    disabled={seat.isOccupied}
                    className={`
                      w-8 h-8 rounded-t-lg flex items-center justify-center transition-colors
                      ${seat.isOccupied ? 'bg-gray-600 cursor-not-allowed' : ''}
                      ${seat.isSelected ? 'bg-green-500 hover:bg-green-600' : ''}
                      ${!seat.isOccupied && !seat.isSelected ? 'bg-blue-500 hover:bg-blue-600' : ''}
                    `}
                  >
                    <Chair size={16} />
                  </button>
                ))}
            </div>
          ))}
        </div>

        {/* Légende */}
        <div className="flex justify-center gap-8 mb-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-500 rounded-t-lg flex items-center justify-center">
              <Chair size={14} />
            </div>
            <span>Disponible</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-green-500 rounded-t-lg flex items-center justify-center">
              <Chair size={14} />
            </div>
            <span>Sélectionné</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gray-600 rounded-t-lg flex items-center justify-center">
              <Chair size={14} />
            </div>
            <span>Occupé</span>
          </div>
        </div>

        {/* Résumé */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Résumé de la réservation</h2>
          <div className="space-y-2 mb-4">
            {selectedSeats.length > 0 ? (
              selectedSeats.map(seat => (
                <div key={seat.id} className="flex justify-between">
                  <span>Siège {seat.row}{seat.number}</span>
                  <span>{prixParSiege.toFixed(2)} €</span>
                </div>
              ))
            ) : (
              <p className="text-gray-400">Aucun siège sélectionné</p>
            )}
          </div>
          <div className="border-t border-gray-700 pt-4 flex justify-between items-center">
            <div>
              <p className="text-lg font-semibold">Total</p>
              <p className="text-sm text-gray-400">{selectedSeats.length} siège(s)</p>
            </div>
            <div className="flex items-center gap-2 text-xl font-bold">
              <Euro size={20} />
              {totalPrice.toFixed(2)}
            </div>
          </div>
          <button
            disabled={selectedSeats.length === 0}
            onClick={handleReserve}
            className={`
              w-full mt-6 py-3 rounded-lg font-semibold transition-colors
              ${selectedSeats.length > 0 
                ? 'bg-green-500 hover:bg-green-600' 
                : 'bg-gray-700 cursor-not-allowed'}
            `}
          >
            Réserver
          </button>
        </div>
      </div>
    </div>
  );
}

export default SeatSelector;
