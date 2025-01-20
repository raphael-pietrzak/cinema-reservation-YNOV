from rest_framework import serializers
from .models import CinemaSession

class CinemaSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = CinemaSession
        fields = '__all__'
