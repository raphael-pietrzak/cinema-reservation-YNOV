from django.db import models

class CinemaSession(models.Model):
    film = models.CharField(max_length=100)  # Nom du film
    room = models.CharField(max_length=10)  # Numéro de salle
    date = models.DateField()  # Date de la séance
    start_time = models.TimeField()  # Heure de début
    end_time = models.TimeField(default="23:59:59")  # Heure de fin par défaut
    total_seats = models.PositiveIntegerField(default=100)  # Places totales par défaut
    available_seats = models.PositiveIntegerField(default=100)  # Places disponibles par défaut

    def __str__(self):
        return f"{self.film} - Room {self.room} - {self.date} {self.start_time} to {self.end_time}"
