from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rym import views

# Create a router and register our ViewSets with it.
router = DefaultRouter()
router.register(r'location', views.LocationViewSet, basename='location')
router.register(r'episode', views.EpisodeViewSet, basename='episode')
router.register(r'character', views.CharacterViewSet, basename='character')

# The API URLs are now determined automatically by the router.
urlpatterns = [
    path('', include(router.urls)),
]