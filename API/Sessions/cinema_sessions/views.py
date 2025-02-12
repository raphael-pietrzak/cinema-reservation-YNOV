# views.py
import jwt
import requests
from django.db import transaction
from django.db.models import F
from django.shortcuts import get_object_or_404
from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import CinemaSession, Reservation
from .serializers import CinemaSessionSerializer, ReservationSerializer

class CinemaSessionViewSet(viewsets.ModelViewSet):
    queryset = CinemaSession.objects.all()
    serializer_class = CinemaSessionSerializer

class ReservationViewSet(viewsets.ModelViewSet):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer

    def create(self, request, *args, **kwargs):
        # Vérification du token et extraction du user_id
        auth_header = request.headers.get('Authorization')
        if not auth_header:
            return Response({"error": "Le token est requis."}, status=status.HTTP_401_UNAUTHORIZED)
        try:
            token = auth_header.split(" ")[1]
            response = requests.post(
                'http://localhost:3000/auth/verify-token',
                headers={'Authorization': f'Bearer {token}'}
            )
            if response.status_code != 200:
                return Response({"error": "Token invalide"}, status=status.HTTP_401_UNAUTHORIZED)
            user_data = response.json()
            user_id = user_data.get('userId')
            if not user_id:
                return Response({"error": "UserId non trouvé"}, status=status.HTTP_401_UNAUTHORIZED)
        except Exception as e:
            return Response({"error": "Token invalide", "detail": str(e)}, status=status.HTTP_401_UNAUTHORIZED)

        # Copier les données et insérer le user_id
        data = request.data.copy()
        data['user_id'] = user_id

        # Vérifier que le champ cinema_session est présent
        session_id = data.get('cinema_session')
        if not session_id:
            return Response({"error": "Le champ cinema_session est requis."}, status=status.HTTP_400_BAD_REQUEST)

        # Vérifier la présence du champ seat_codes et qu'il s'agit bien d'une liste non vide
        seat_codes = data.get('seat_codes')
        if not seat_codes or not isinstance(seat_codes, list):
            return Response({"error": "Le champ seat_codes doit être une liste non vide."}, status=status.HTTP_400_BAD_REQUEST)
        number_of_seats = len(seat_codes)

        with transaction.atomic():
            cinema_session = get_object_or_404(CinemaSession, id=session_id)
            # Vérifier que suffisamment de places sont disponibles
            if cinema_session.available_seats < number_of_seats:
                return Response({"error": "Plus de places disponibles pour cette séance."}, status=status.HTTP_400_BAD_REQUEST)
            # Décrémenter available_seats de la quantité réservée de façon atomique
            cinema_session.available_seats = F('available_seats') - number_of_seats
            cinema_session.save()
            cinema_session.refresh_from_db()

            serializer = self.get_serializer(data=data)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)

        return Response(serializer.data, status=status.HTTP_201_CREATED)
