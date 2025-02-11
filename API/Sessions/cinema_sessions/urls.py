# urls.py de l'application (cinema_sessions)
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CinemaSessionViewSet, ReservationViewSet

router = DefaultRouter()
router.register(r'cinema_sessions', CinemaSessionViewSet)
router.register(r'reservations', ReservationViewSet)

urlpatterns = [
    path('', include(router.urls)),
]