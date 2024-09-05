from rest_framework import serializers
from rym.models import *


class LocationSerializer(serializers.Serializer):
    
    class Meta:
        model = Location
        fields = ["id", "name", "type", "dimension"]
    
class EpisodeSerializer(serializers.Serializer):
    
    class Meta:
        model = Episode
        fields = ["id", "name", "air_date", "episode"]
    
class CharacterSerializer(serializers.Serializer):
    episode = EpisodeSerializer(many=True)
    
    class Meta:
        model = Character
        fields = ["id", "name", "status", "species", "image", "location", "origin", "episode"]
