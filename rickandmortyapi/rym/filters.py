import django_filters
from django_filters import ModelChoiceFilter
from .models import Character, Location

class CharacterFilter(django_filters.FilterSet):
    name = django_filters.CharFilter(lookup_expr='icontains')
    location_name = django_filters.CharFilter(field_name='location__name', lookup_expr='iexact')
    
    class Meta:
        model = Character
        fields = ['name', 'species']
        