import { IEpisode } from "./episode.model";
import { ILocation } from "./location.model";

export interface ICharacter {
    id: number;
    name: string;
    species: string;
    status: string;
    origin: ILocation;
    location: ILocation;
    episode: IEpisode[];
    type: string;
    gender: string;
    image: string;
}
