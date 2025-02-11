# views.py
import jwt
import requests
from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import CinemaSession, Reservation
from .serializers import CinemaSessionSerializer, ReservationSerializer

class CinemaSessionViewSet(viewsets.ModelViewSet):
    queryset = CinemaSession.objects.all()
    serializer_class = CinemaSessionSerializer

    # Votre action "reserve" existante, si nécessaire

class ReservationViewSet(viewsets.ModelViewSet):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer

    def create(self, request, *args, **kwargs):
        breakpoint()
        auth_header = request.headers.get('Authorization')
        if not auth_header:
            return Response({"error": "Le token est requis."}, status=status.HTTP_401_UNAUTHORIZED)
        try:
            token = auth_header.split(" ")[1]
            print("Token reçu :", token)  # Debug

            # Utilisation de POST et de la bonne URL (/auth/verify-token)
            response = requests.post(
                'http://localhost:3000/auth/verify-token',
                headers={'Authorization': f'Bearer {token}'}
            )
            print("Réponse de verify-token :", response.status_code, response.text)  # Debug
            
            if response.status_code != 200:
                return Response({"error": "Token invalide"}, status=status.HTTP_401_UNAUTHORIZED)
                
            user_data = response.json()
            user_id = user_data.get('userId')
            
            if not user_id:
                return Response({"error": "UserId non trouvé"}, status=status.HTTP_401_UNAUTHORIZED)

        except Exception as e:
            print("Exception lors de la vérification du token :", e)
            return Response({"error": "Token invalide", "detail": str(e)}, status=status.HTTP_401_UNAUTHORIZED)

        # Copie des données et insertion de l'user_id
        data = request.data.copy()
        data['user_id'] = user_id

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
