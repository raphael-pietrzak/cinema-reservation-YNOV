# tests.py
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from .models import CinemaSession, Reservation  # importer Reservation
import jwt

class ReservationTokenTestCase(APITestCase):
    def setUp(self):
        # Création d'une session de cinéma pour le test
        self.session = CinemaSession.objects.create(
            film="Test Film",
            room="1",
            date="2025-02-15",
            start_time="18:00:00",
            total_seats=100,
            available_seats=100
        )
        # Utilisez ici le token obtenu via l'API users (ou générez-le si nécessaire)
        self.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsImlhdCI6MTczOTI3MTMzNiwiZXhwIjoxNzM5MzU3NzM2fQ.ATxzlG-Ke56xxeukrRD3Eg1P7tfune2-_z8Hpz2PqhE"
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.token)

    def test_create_reservation_with_valid_token(self):
        url = reverse('reservation-list')  # Assurez-vous que le basename pour ReservationViewSet est 'reservation'
        data = {"cinema_session": self.session.id, "seat_code": "C1"}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        # Vérifier que le user_id dans la réponse correspond à celui du token (ici 4)
        self.assertEqual(response.data.get('user_id'), 4)

        # Vérifier qu'une réservation a été créée dans la base de données
        reservations = Reservation.objects.filter(cinema_session=self.session)
        self.assertEqual(reservations.count(), 1)

        # Vous pouvez aussi vérifier les attributs de la réservation créée
        reservation = reservations.first()
        self.assertEqual(reservation.seat_code, "C1")
        self.assertEqual(reservation.user_id, 4)
