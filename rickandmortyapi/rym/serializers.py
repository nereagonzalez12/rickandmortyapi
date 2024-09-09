from rest_framework import serializers
from rym.models import *

# LOCATION SERIALIZER
class LocationSerializer(serializers.Serializer):
    id = serializers.PrimaryKeyRelatedField(read_only=True)
    name = serializers.CharField()
    type = serializers.CharField()
    dimension = serializers.CharField()
    image = serializers.CharField()
    
    class Meta:
        model = Location
        fields = ["id", "name", "type", "dimension", "image"]
    
# EPISODE SERIALIZER
class EpisodeSerializer(serializers.Serializer):
    id = serializers.PrimaryKeyRelatedField(read_only=True)
    name = serializers.CharField()
    air_date = serializers.CharField()
    episode = serializers.CharField()
    
    class Meta:
        model = Episode
        fields = ["id", "name", "air_date", "episode"]
    
# CHARACTER SERIALIZER
class CharacterSerializer(serializers.Serializer):
    id = serializers.PrimaryKeyRelatedField(read_only=True)
    name = serializers.CharField()
    status = serializers.CharField()
    species = serializers.CharField()
    type = serializers.CharField()
    gender = serializers.CharField()
    image = serializers.CharField()
    location = LocationSerializer()
    origin = LocationSerializer()
    episode = EpisodeSerializer(many=True)
    
    class Meta:
        model = Character
        fields = ["id", "name", "status", "species", "type", "gender", "image", "location", "origin", "episode"]
