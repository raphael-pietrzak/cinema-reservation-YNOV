from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import viewsets, status
from .models import CinemaSession
from .serializers import CinemaSessionSerializer

class CinemaSessionViewSet(viewsets.ModelViewSet):
    queryset = CinemaSession.objects.all()
    serializer_class = CinemaSessionSerializer

    @action(detail=True, methods=['post'])
    def reserve(self, request, pk=None):
        """
        Endpoint pour réserver un certain nombre de places pour une séance.
        """
        seats_to_reserve = request.data.get("seats", None)
        if seats_to_reserve is None:
            return Response(
                {"error": "The 'seats' field is required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            seats_to_reserve = int(seats_to_reserve)
        except ValueError:
            return Response(
                {"error": "'seats' must be a valid integer."},
                status=status.HTTP_400_BAD_REQUEST
            )

        if seats_to_reserve <= 0:
            return Response(
                {"error": "'seats' must be greater than 0."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Vérifier que la séance existe
        try:
            session = CinemaSession.objects.get(pk=pk)
        except CinemaSession.DoesNotExist:
            return Response({"error": "Session not found"}, status=status.HTTP_404_NOT_FOUND)

        # Vérifier la disponibilité des places
        if seats_to_reserve > session.available_seats:
            return Response(
                {"error": "Not enough seats available", "available_seats": session.available_seats},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Réserver les places
        session.available_seats -= seats_to_reserve
        session.save()

        return Response({
            "message": "Reservation successful",
            "session": CinemaSessionSerializer(session).data
        })
