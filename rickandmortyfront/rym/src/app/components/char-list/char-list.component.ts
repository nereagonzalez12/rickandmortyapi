import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  // Pagination
  nextCharacterPage: string | null = null;
  previousCharacterPage: string | null = null;
  actualPage: number = Number(sessionStorage.getItem('pageNumber')) | 1;
  // Search inputs
  searchForm: FormGroup;
  searchQuery: string = '';
  // Service
  private apiService = inject(ApiService);

  constructor(private formBuilder: FormBuilder) {
    this.searchForm = this.formBuilder.group({
      parameter: [''] // Inicialize with an empty parameter
    });
  }

  ngOnInit(): void {
    this.obtainCharactersPageData(CHARACTER_PAGE_URL + Number(sessionStorage.getItem('pageNumber')), this.searchQuery);
  }

  obtainCharactersPageData(page: string, parameter: string) {
    /* Subscribe to the API server to fetch data */
    this.apiService.getCharactersPage(page, parameter).subscribe({
      next: (data: ICharacterResponse) => {
        this.characterList = data.results;
        this.nextCharacterPage = data.next;
        this.previousCharacterPage = data.prev;

        if (this.nextCharacterPage != null) {
          let nextNumberPage = this.nextCharacterPage.split("=");
          this.actualPage = Number(nextNumberPage[1]) - 1;
        } else {
          this.actualPage = 42;
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
    this.obtainCharactersPageData(CHARACTER_PAGE_URL + this.actualPage, this.searchQuery);
  }

  previousPage() {
    this.actualPage = Number(sessionStorage.getItem('pageNumber')) - 1;
    this.obtainCharactersPageData(CHARACTER_PAGE_URL + this.actualPage, this.searchQuery);
  }

  // Seach input
  searchCharacterInput() {
    this.actualPage = Number(sessionStorage.getItem('pageNumber')) | 1;
    this.obtainCharactersPageData(CHARACTER_PAGE_URL + this.actualPage, this.searchForm.get('parameter')?.value);
  }

}
