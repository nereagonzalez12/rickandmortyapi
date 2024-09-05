from django.core.management.base import BaseCommand, CommandError
# from polls.models import Question as Poll
import requests, json
from tqdm import tqdm

class Command(BaseCommand):

    help = 'Write JSON Data from Rick and Morty API'

    def handle(self, *args, **kwargs):
        # function to write json character file
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

            with open('json/characters.json', 'w') as f:
                f.write('[')
                for i, item in tqdm(enumerate(all_results), total=len(all_results), desc="Writing data"):
                    json.dump(item, f, indent=4)
                    if i < len(all_results) - 1:
                        f.write(',\n')  # Add a line break        
                f.write(']')

        # function to write json location file
        def fetch_location_data():
            url = 'https://rickandmortyapi.com/api/location'
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

            with open('json/locations.json', 'w') as f:
                f.write('[')
                for i, item in tqdm(enumerate(all_results), total=len(all_results), desc="Writing data"):
                    json.dump(item, f, indent=4)
                    if i < len(all_results) - 1:
                        f.write(',\n')  # Add a line break        
                f.write(']')
            
        # function to write json episode file
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

            with open('json/episodes.json', 'w') as f:
                f.write('[')
                for i, item in tqdm(enumerate(all_results), total=len(all_results), desc="Writing data"):
                    json.dump(item, f, indent=4)
                    if i < len(all_results) - 1:
                        f.write(',\n')  # Add a line break        
                f.write(']')

        # execute functions
        fetch_location_data()
        fetch_episode_data()
        fetch_character_data()