import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ICharacter } from '../models/character.model';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private locationData = new BehaviorSubject<string>('');
  private characterData = new BehaviorSubject<ICharacter | null>(null);

  currentLocationData = this.locationData.asObservable();
  currentCharacterData = this.characterData.asObservable();

  constructor() { }
  // Update the data info
  updateLocationData(data: string) {
    this.locationData.next(data);
  }

  updateCharacterData(data: ICharacter | null) {
    this.characterData.next(data);
  }
}
