from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CinemaSessionViewSet

router = DefaultRouter()
router.register(r'cinema_sessions', CinemaSessionViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
