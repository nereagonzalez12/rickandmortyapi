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
  nameForm: FormGroup;
  // Service
  private apiService = inject(ApiService);

  constructor(private formBuilder: FormBuilder) {
    this.nameForm = this.formBuilder.group({
      parameter: [''] // Inicialize with an empty parameter
    });
  }

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


  /* SEARCH FILTERS */
  searchPostsInput() {
    // Llamar al servicio para realizar la búsqueda
    this.apiService.searchPosts(this.searchForm.get('parameter')?.value).subscribe({
      next: (data: any) => {
        if (this.childComponent) {
          this.childComponent.reloadDataWithSearchTerm(this.searchForm.get('parameter')?.value);
        } else {
          console.error('Error al encontrar el componente dream-list');
        }
      },
      error: (error) => {
        console.error('Error al buscar posts:', error.message);
      }
    });
  }
}
