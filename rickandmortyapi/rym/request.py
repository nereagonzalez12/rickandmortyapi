import requests

def fetch_character_data():
    url = 'https://rickandmortyapi.com/api/character'
    response = requests.get(url)

    if response.status_code == 200:
        return response.json()
    else:
        return f'Error: {response.status_code}'


def fetch_location_data():
    url = 'https://rickandmortyapi.com/api/location'
    response = requests.get(url)

    if response.status_code == 200:
        return response.json()
    else:
        return f'Error: {response.status_code}'
    
    
def fetch_episodes_data():
    url = 'https://rickandmortyapi.com/api/episode'
    response = requests.get(url)

    if response.status_code == 200:
        return response.json()
    else:
        return f'Error: {response.status_code}'

