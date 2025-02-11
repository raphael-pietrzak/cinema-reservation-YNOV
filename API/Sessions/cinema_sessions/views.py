# views.py
import jwt
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
        # Récupérer l'en-tête Authorization et extraire le token
        auth_header = request.headers.get('Authorization')
        if not auth_header:
            return Response({"error": "Le token est requis."}, status=status.HTTP_401_UNAUTHORIZED)
        try:
            token = auth_header.split(" ")[1]
            # Décodage du token avec la clé secrète et l'algorithme utilisé (ici HS256)
            decoded_token = jwt.decode(token, 'votre_secret_jwt', algorithms=['HS256'])
            user_id = decoded_token.get('userId')
            if not user_id:
                raise Exception("userId manquant dans le token")
        except Exception as e:
            return Response({"error": "Token invalide", "detail": str(e)}, status=status.HTTP_401_UNAUTHORIZED)

        # Copie des données de la requête et insertion de l'user_id obtenu
        data = request.data.copy()
        data['user_id'] = user_id

        # Optionnel : vous pouvez vérifier ici la validité du code de place (format, unicité par session, etc.)

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
