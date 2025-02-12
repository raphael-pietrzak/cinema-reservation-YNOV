// src/pages/SeatSelectorPage.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import SeatSelector from '../components/SeatSelector';

function SeatSelectorPage() {
  const { sessionId } = useParams<{ sessionId: string }>();

  if (!sessionId) {
    return <div>Erreur : aucun identifiant de séance fourni.</div>;
  }

  return <SeatSelector sessionId={Number(sessionId)} />;
}

export default SeatSelectorPage;
