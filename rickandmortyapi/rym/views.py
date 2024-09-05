from django.shortcuts import render
from rest_framework import viewsets
from rym.models import *
from rym.serializers import *
import json
from rym import request as scriptRequest

# models viewsets 

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
    
    
# import json data to mdoels

def import_data():
        locationData = scriptRequest.fetch_location_data()
        episodeData = scriptRequest.fetch_episode_data()
        characterData = scriptRequest.fetch_character_data()
        # location model
        for item in locationData['results']:
            print (item['id'],'-',item['name'])

                # location = Location(
                #     id=item[0],
                #     name=item[1],
                #     type=item[2],
                #     dimension=item[3],
                # )
                # location.save()
                
import_data()