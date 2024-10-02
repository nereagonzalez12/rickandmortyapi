import { Component, inject, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ICharacter } from 'src/app/models/character.model';
import { IEpisode } from 'src/app/models/episode.model';
import { BACK_URL, DEFAULT_LOCATION_IMG, FRONT_URL } from 'src/app/services/global';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-character-view',
  templateUrl: './character-view.component.html',
  styleUrls: ['./character-view.component.css']
})
export class CharacterViewComponent implements OnInit {
  // Character selected
  characterFilter: ICharacter | null = null;
  locationImage: string = ' ';

  // Service
  private sharedDataService = inject(SharedDataService);

  constructor(private translate: TranslateService) { };
  ngOnInit() {

    // Get new character data
    this.sharedDataService.currentCharacterData.subscribe(data => {
      if (data) {
        const character = {
          ...data,
          translatedStatus: this.translate.instant(`${data.status}`),
          translatedSpecies: this.translate.instant(`${data.species}`),
          episode: data.episode.map((ep: IEpisode) => ({
            ...ep,
            translatedName: this.translate.instant(`${ep.episode}`),
            air_date: this.translateDate(ep.air_date)
          })),

        };
        this.characterFilter = character;
      }
      if (this.characterFilter?.location.image === null) {
        this.characterFilter.location.image = DEFAULT_LOCATION_IMG;
      } else if (this.characterFilter?.location.image) {
        this.characterFilter.location.image = this.characterFilter.location.image.replace(BACK_URL, FRONT_URL);
      }
    });
  }

  closeCharacterView() {
    this.sharedDataService.updateCharacterData(null);
  }

  /* Translation */
  translateDate(date: string): string {
    // Obtain the current lang
    const currentLang = this.translate.currentLang || 'en';
    const dateObj = new Date(date);

    // Format date depends on selected lang
    const formattedDate = new Intl.DateTimeFormat(currentLang, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(dateObj);

    return formattedDate;
  }

}
