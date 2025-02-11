from django.contrib import admin
from .models import CinemaSession

@admin.register(CinemaSession)
class CinemaSessionAdmin(admin.ModelAdmin):
    list_display = ('film', 'room', 'start_time', 'end_time', 'available_seats')
