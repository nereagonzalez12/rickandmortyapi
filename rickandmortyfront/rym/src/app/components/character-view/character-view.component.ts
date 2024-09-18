import { Component, inject, OnInit } from '@angular/core';
import { ICharacter } from 'src/app/models/character.model';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-character-view',
  templateUrl: './character-view.component.html',
  styleUrls: ['./character-view.component.css']
})
export class CharacterViewComponent implements OnInit {
  // Character selected
  characterFilter: ICharacter | null = null;
  locationImage: string = '';


  // Service
  private sharedDataService = inject(SharedDataService);

  ngOnInit() {
    // Get new character data
    this.sharedDataService.currentCharacterData.subscribe(data => {
      this.characterFilter = data;
    });

  }
}
