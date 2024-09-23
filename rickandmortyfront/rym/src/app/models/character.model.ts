import { IEpisode } from "./episode.model";
import { ILocation } from "./location.model";

export interface ICharacter {
    id: number;
    name: string;
    species: string;
    translatedSpecies: string;
    status: string;
    translatedStatus: string;
    origin: ILocation;
    location: ILocation;
    episode: IEpisode[];
    type: string;
    gender: string;
    image: string;
}
