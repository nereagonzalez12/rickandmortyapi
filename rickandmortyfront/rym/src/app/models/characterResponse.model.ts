import { ICharacter } from "./character.model";

export interface ICharacterResponse {
    count: number;
    next: string;
    prev: string;
    results: ICharacter[];
}
