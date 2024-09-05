from django.shortcuts import render
from rest_framework import viewsets
from rym.models import *
from rym.serializers import *

class LocationViewSet(viewsets.ReadOnlyModelViewSet):
    """
    This viewset automatically provides `list` and `retrieve` actions.
    """
    queryset = Location.objects.all()
    serializer_class = LocationSerializer
    
class EpisodeViewSet(viewsets.ReadOnlyModelViewSet):
    """
    This viewset automatically provides `list` and `retrieve` actions.
    """
    queryset = Episode.objects.all()
    serializer_class = EpisodeSerializer
    
class CharacterViewSet(viewsets.ReadOnlyModelViewSet):
    """
    This viewset automatically provides `list` and `retrieve` actions.
    """
    queryset = Character.objects.all()
    serializer_class = CharacterSerializer