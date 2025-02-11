from rest_framework import serializers
from .models import CinemaSession, Reservation

class CinemaSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = CinemaSession
        fields = '__all__'

class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = '__all__'