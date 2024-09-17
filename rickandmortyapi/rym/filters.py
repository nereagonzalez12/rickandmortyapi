import django_filters
from django_filters import ModelChoiceFilter
from .models import Character, Location

class CharacterFilter(django_filters.FilterSet):
    name = django_filters.CharFilter(lookup_expr='icontains')
    location = ModelChoiceFilter(queryset=Location.objects.all())
    
    class Meta:
        model = Character
        fields = ['name', 'species', 'location']
        