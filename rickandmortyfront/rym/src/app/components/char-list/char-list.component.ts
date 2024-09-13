import { Component, inject } from '@angular/core';
import { ICharacter } from 'src/app/models/character.model';
import { ICharacterResponse } from 'src/app/models/characterResponse.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-char-list',
  templateUrl: './char-list.component.html',
  styleUrls: ['./char-list.component.css']
})
export class CharListComponent {
  characterList: ICharacter[] = [];
  nextCharacterPage: string | null = null;
  previpusCharacterPage: string | null = null;
  actualPage: number = 1;
  private apiService = inject(ApiService);

  ngOnInit(): void {
    this.obtainCharactersData();
  }

  obtainCharactersData() {
    /* Subscribe to the API server to fetch data */
    this.apiService.getAllCharacters().subscribe({
      next: (data: ICharacterResponse) => {
        this.characterList = data.results;
        this.nextCharacterPage = data.next;
        this.previpusCharacterPage = data.previous;
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  obtainCharactersPageData(page: string) {
    /* Subscribe to the API server to fetch data */
    this.apiService.getCharactersPage(page).subscribe({
      next: (data: ICharacterResponse) => {
        this.characterList = data.results;
        this.nextCharacterPage = data.next;
        // if there isn't next page, add the actual page +1 to get the final page 
        if (data.next === null) {
          this.actualPage++;
        } else {
          let nextNumberPage = this.nextCharacterPage.split("=");
          this.actualPage = Number(nextNumberPage[1]) - 1;
        }

        this.previpusCharacterPage = data.previous;
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  obtainCharacterData(id: number) {
    /* Subscribe to the API server with id to fetch character data */
    this.apiService.getCharacter(id).subscribe({
      next: (data: ICharacter) => {
        console.log(data);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  // Page movement
  nextPage() {
    if (this.nextCharacterPage != null) {
      this.obtainCharactersPageData(this.nextCharacterPage);
    }
  }

  previousPage() {
    if (this.previpusCharacterPage != null) {
      this.obtainCharactersPageData(this.previpusCharacterPage);
    }
  }
}
