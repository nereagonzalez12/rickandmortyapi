import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  // Pagination
  nextCharacterPage: string | null = null;
  previousCharacterPage: string | null = null;
  actualPage: number = Number(sessionStorage.getItem('pageNumber'));
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
    if (this.actualPage < 1) {
      this.actualPage = 1;
    }
    this.obtainCharactersPageData(Number(sessionStorage.getItem('pageNumber')) | this.actualPage);
  }

  obtainCharactersPageData(page: number) {
    /* Subscribe to the API server to fetch data */
    console.log(page);
    this.apiService.getCharactersPage(page).subscribe({
      next: (data: ICharacterResponse) => {
        this.characterList = data.results;
        this.nextCharacterPage = data.next;
        this.previousCharacterPage = data.previous;
        this.actualPage = data.page_number;
        console.log(data);
        // Save actual page in Sesion Storage
        sessionStorage.setItem('pageNumber', String(this.actualPage));
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
    let stringPageNumber = sessionStorage.getItem('pageNumber');
    if (stringPageNumber != null) {
      this.actualPage = +stringPageNumber;
      this.obtainCharactersPageData(this.actualPage + 1);
    }
  }

  previousPage() {
    let stringPageNumber = sessionStorage.getItem('pageNumber');
    if (stringPageNumber != null) {
      this.actualPage = +stringPageNumber;
      this.obtainCharactersPageData(this.actualPage - 1);
    }
  }

  // Seach input
  searchCharacterInput() {
    this.actualPage = Number(sessionStorage.getItem('pageNumber')) | 1;
  }

}
