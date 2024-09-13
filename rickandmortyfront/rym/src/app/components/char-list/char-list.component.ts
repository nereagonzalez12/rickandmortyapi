import { Component, inject } from '@angular/core';
import { ICharacter } from 'src/app/models/character.model';
import { ICharacterResponse } from 'src/app/models/characterResponse.model';
import { ApiService } from 'src/app/services/api.service';
import { CHARACTER_PAGE_URL } from 'src/app/services/global';

@Component({
  selector: 'app-char-list',
  templateUrl: './char-list.component.html',
  styleUrls: ['./char-list.component.css']
})
export class CharListComponent {
  characterList: ICharacter[] = [];
  nextCharacterPage: string | null = null;
  previousCharacterPage: string | null = null;
  actualPage: number = Number(sessionStorage.getItem('pageNumber')) | 1;
  private apiService = inject(ApiService);

  ngOnInit(): void {
    this.obtainCharactersPageData(CHARACTER_PAGE_URL + Number(sessionStorage.getItem('pageNumber')));
  }

  obtainCharactersPageData(page: string) {

    /* Subscribe to the API server to fetch data */
    this.apiService.getCharactersPage(page).subscribe({
      next: (data: ICharacterResponse) => {
        this.characterList = data.results;
        this.nextCharacterPage = data.info.next;
        this.previousCharacterPage = data.info.prev;

        if (this.nextCharacterPage != null) {
          let nextNumberPage = this.nextCharacterPage.split("=");
          this.actualPage = Number(nextNumberPage[1]) - 1;
        } else {
          this.actualPage = data.info.pages;
        }

        // Save actual page in Sesion Storage
        sessionStorage.setItem('pageNumber', JSON.stringify(this.actualPage));
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

  // Pagination functions 
  nextPage() {
    this.actualPage = Number(sessionStorage.getItem('pageNumber')) + 1;
    this.obtainCharactersPageData(CHARACTER_PAGE_URL + this.actualPage);
  }

  previousPage() {
    this.actualPage = Number(sessionStorage.getItem('pageNumber')) - 1;
    this.obtainCharactersPageData(CHARACTER_PAGE_URL + this.actualPage);
  }

}
