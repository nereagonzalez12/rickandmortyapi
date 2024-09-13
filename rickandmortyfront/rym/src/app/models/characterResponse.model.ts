import { ICharacter } from "./character.model";

export interface ICharacterResponse {
    count: number;
    next: string;
    previous: string;
    pages: number;
    results: ICharacter[];
}
