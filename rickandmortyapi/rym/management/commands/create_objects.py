from django.core.management.base import BaseCommand, CommandError
from django.core.exceptions import ObjectDoesNotExist
from psycopg import IntegrityError
import requests
from rym.models import Character, Episode, Location

class Command(BaseCommand):

    help = 'Fetching JSON Data from Rick and Morty API and create Objects'

    def handle(self, *args, **kwargs):        
        ### Function to create location objects
        def fetch_location_data():
            url = 'https://rickandmortyapi.com/api/location'
            all_results = []
            
            while url:
                response = requests.get(url)

                if response.status_code == 200:
                    data = response.json()  
                    # while there are next pages, continue fetching until no more pages are available
                    all_results.extend(data['results'])
                    url = data['info']['next']
                else:
                    print(f'Error: {response.status_code}')
                    break

            # create or update all location objects
            for item in all_results:
                # "location, created" make character a object, not a tuple  
                location, created = Location.objects.update_or_create(
                    id=item['id'],
                    name=item['name'],
                    type=item['type'],
                    dimension=item['dimension'],
                )
                
                location.save()
                
            
        ### Function to create episode objects
        def fetch_episode_data():
            url = 'https://rickandmortyapi.com/api/episode'
            all_results = []
            
            while url:
                response = requests.get(url)

                if response.status_code == 200:
                    data = response.json()  
                    all_results.extend(data['results'])
                    url = data['info']['next']
                else:
                    print(f'Error: {response.status_code}')
                    break

            # create or update all episode objects
            for item in all_results:
                episode, created = Episode.objects.update_or_create(
                    id=item['id'],
                    name=item['name'],
                    air_date=item['air_date'],
                    episode=item['episode'],
                )
                
                episode.save()

        ### Function to create character objects
        def fetch_character_data():
            url = 'https://rickandmortyapi.com/api/character'
            all_results = []
            
            while url:
                response = requests.get(url)

                if response.status_code == 200:
                    data = response.json()  
                    all_results.extend(data['results'])
                    url = data['info']['next']
                else:
                    print(f'Error: {response.status_code}')
                    break

            for item in all_results: 
                character_id = item['id']
                character_data = {
                    'name': item['name'],
                    'status': item['status'],
                    'species': item['species'],
                    'type': item.get('type', ''),  # use .get() to handle missing keys
                    'gender': item['gender'],
                    'image': item['image'],
                }
                
                # update or create the character
                character, created = Character.objects.update_or_create(
                    id=character_id,
                    defaults=character_data
                )
                
                # if the location isn't blank, assing the location with url id
                if item['location']['url']:
                    try:
                        locationId = int(item['location']['url'].split("/")[-1])
                        character.location = Location.objects.get(id=locationId)
                    except ObjectDoesNotExist:
                        print(f'Location with id {locationId} does not exist.')
                        
                # if the origin isn't blank, assing the origin with url id
                if item['origin']['url']:
                    try:
                        originId = int(item['origin']['url'].split("/")[-1])
                        character.origin = Location.objects.get(id=originId)
                    except ObjectDoesNotExist:
                        print(f'Origin with id {originId} does not exist.')
                        
                # assing a set of episode ids  
                episode_ids = [int(episode.split("/")[-1]) for episode in item['episode']]
                episodes = Episode.objects.filter(id__in=episode_ids)
                character.episode.set(episodes)

                # save the object                                    
                try:
                    character.save()
                except IntegrityError as e:
                    print(f'Error saving character with id {character_id}: {e}')
                
        # execute functions
        fetch_location_data()
        fetch_episode_data()
        fetch_character_data()
        