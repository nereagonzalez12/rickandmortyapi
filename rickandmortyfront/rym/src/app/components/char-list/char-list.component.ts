import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ICharacter } from 'src/app/models/character.model';
import { ICharacterResponse } from 'src/app/models/characterResponse.model';
import { ApiService } from 'src/app/services/api.service';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-char-list',
  templateUrl: './char-list.component.html',
  styleUrls: ['./char-list.component.css']
})
export class CharListComponent implements OnInit {
  characterList: ICharacter[] = [];
  loadingCards: boolean = true;
  speciesSelected: string = 'Species';
  // Location filter
  locationFilter: string = '';
  private sharedDataService = inject(SharedDataService);
  // Pagination
  nextCharacterPage: string | null = null;
  previousCharacterPage: string | null = null;
  actualPage: number = Number(sessionStorage.getItem('pageNumber'));
  // Search inputs
  searchForm: FormGroup;
  searchQuery: string = '';
  // Service
  private apiService = inject(ApiService);
  // Scroll to up
  @Output() triggerScroll = new EventEmitter<void>();

  // Form constructor
  constructor(private formBuilder: FormBuilder) {
    this.searchForm = this.formBuilder.group({
      parameter: [''] // Inicialize with an empty parameter
    });
  }

  ngOnInit() {
    // Handler page 0
    if (this.actualPage < 1) {
      this.actualPage = 1;
    }

    // Clear session storage
    if (sessionStorage.getItem('nameParameter')) {
      this.removeStorage();
    }

    // Obtain the characters data in the correct page
    this.obtainCharactersPageData(Number(sessionStorage.getItem('pageNumber')) | this.actualPage);

    // Get new location data
    this.sharedDataService.currentData.subscribe(data => {
      this.locationFilter = data;
      if (this.locationFilter != '') {
        this.obtainCharactersPageDataWithLocation(this.actualPage, this.locationFilter);
      }
    });

  }

  /* Utils */
  removeStorage() {
    sessionStorage.removeItem('pageNumber');
    sessionStorage.removeItem('nameParameter');
    sessionStorage.removeItem('speciesParameter');
    sessionStorage.removeItem('locationParameter');
  }

  // Scroll to top button
  scrollToTop(): void {
    this.triggerScroll.emit();
  }

  /* Fetch data */
  obtainCharactersPageData(page: number, name?: string, species?: string) {
    // Handle empty parameters
    if (species === undefined) {
      species = '';
    }
    if (name === undefined) {
      name = '';
    }
    /* Subscribe to the API server to fetch data */
    if (name || species) {
      sessionStorage.removeItem('pageNumber');
      this.apiService.getCharactersPageFilters(page, name, species).subscribe({
        next: (data: ICharacterResponse) => {

          this.characterList = data.results;
          this.nextCharacterPage = data.next;
          this.previousCharacterPage = data.previous;
          this.actualPage = data.page_number;
          // Save actual parameters in Sesion Storage
          sessionStorage.setItem('nameParameter', String(name));
          sessionStorage.setItem('speciesParameter', String(species));
          this.loadingCards = false;
        },
        error: (error: any) => {
          console.log(error);
        }
      });
    } else {

      this.apiService.getCharactersPage(page).subscribe({
        next: (data: ICharacterResponse) => {
          this.characterList = data.results;
          this.nextCharacterPage = data.next;
          this.previousCharacterPage = data.previous;
          this.actualPage = data.page_number;
          // Save actual page in Sesion Storage
          sessionStorage.setItem('pageNumber', String(this.actualPage));
          this.loadingCards = false;
        },
        error: (error: any) => {
          console.log(error);
        }
      });
    }
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

  /* Pagination functions */
  nextPage() {
    let nameParameter = sessionStorage.getItem('nameParameter') || undefined;
    let speciesParameter = sessionStorage.getItem('speciesParameter') || undefined;
    let stringPageNumber = sessionStorage.getItem('pageNumber');
    let locationParameter = sessionStorage.getItem('locationParameter');

    if (locationParameter) {
      // Don't save page in sesion storage with filters
      this.obtainCharactersPageDataWithLocation(Number(this.actualPage) + 1, locationParameter);
    } else if (nameParameter || speciesParameter) {
      // Don't save page in sesion storage with filters
      this.obtainCharactersPageData(Number(this.actualPage) + 1, nameParameter, speciesParameter);
    } else {
      if (stringPageNumber != null) {
        this.actualPage = +stringPageNumber;
        this.obtainCharactersPageData(this.actualPage + 1);
      }
    }
  }

  previousPage() {
    let nameParameter = sessionStorage.getItem('nameParameter') || undefined;
    let speciesParameter = sessionStorage.getItem('speciesParameter') || undefined;
    let stringPageNumber = sessionStorage.getItem('pageNumber');
    let locationParameter = sessionStorage.getItem('locationParameter');

    if (locationParameter) {
      // Don't save page in sesion storage with filters
      this.obtainCharactersPageDataWithLocation(Number(this.actualPage) - 1, locationParameter);
    } else if (nameParameter || speciesParameter) {
      // Don't save page in sesion storage with filters
      this.obtainCharactersPageData(Number(this.actualPage) - 1, nameParameter, speciesParameter);
    } else {
      if (stringPageNumber != null) {
        this.actualPage = +stringPageNumber;
        this.obtainCharactersPageData(this.actualPage - 1);
      }
    }
  }

  /* Filters Section */

  // Seach input
  searchCharacterInput() {
    this.actualPage = 1;
    this.speciesSelected = 'Species';
    this.obtainCharactersPageData(this.actualPage, this.searchForm.get('parameter')?.value);
  }

  // Species filter
  speciesSelection(species: string) {
    this.actualPage = 1;
    this.speciesSelected = species;
    this.obtainCharactersPageData(this.actualPage, '', species);
  }

  // Location filter
  obtainCharactersPageDataWithLocation(page: number, location: string) {
    /* Subscribe to the API server to fetch data */
    sessionStorage.removeItem('pageNumber');
    this.apiService.getCharactersPageLocation(page, location).subscribe({
      next: (data: ICharacterResponse) => {
        this.characterList = data.results;
        this.nextCharacterPage = data.next;
        this.previousCharacterPage = data.previous;
        this.actualPage = data.page_number;
        sessionStorage.setItem('locationParameter', String(location));
        this.loadingCards = false;
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

}
