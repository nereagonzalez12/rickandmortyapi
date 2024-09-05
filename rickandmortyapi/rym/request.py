import requests, json
from tqdm import tqdm

from models import Location


"""Script to Write JSON Data from Rick and Morty API
"""

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
        
        # location model
    for i, item in enumerate(all_results):
        print (item['id'],'-',item['name'])
        if i == 0:
            break
        location = Location(
            id=item['id'],
            name=item['0name'],
            type=item[2],
            dimension=item[3],
        )
        location.save()
                
    # with open('json/locations.json', 'w') as f:
    #     f.write('[')
    #     for i, item in tqdm(enumerate(all_results), total=len(all_results), desc="Writing data"):
    #         json.dump(item, f, indent=4)
    #         if i < len(all_results) - 1:
    #             f.write(',\n')  # Add a line break        
    #     f.write(']')
    
    
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

fetch_location_data()