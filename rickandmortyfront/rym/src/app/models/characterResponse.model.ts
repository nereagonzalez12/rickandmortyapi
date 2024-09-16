import { ICharacter } from "./character.model";

export interface ICharacterResponse {
    items_count: number;
    total_pages: number;
    page_number: number;
    next: string;
    previous: string;
    results: ICharacter[];
}
