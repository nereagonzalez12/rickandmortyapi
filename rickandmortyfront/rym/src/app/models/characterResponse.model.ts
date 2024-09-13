import { ICharacter } from "./character.model";
import { ICharacterInfo } from "./characterInfo.models";

export interface ICharacterResponse {
    info: ICharacterInfo;
    results: ICharacter[];
}
