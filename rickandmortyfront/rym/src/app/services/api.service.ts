import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ICharacter } from '../models/character.model';
import { ICharacterResponse } from '../models/characterResponse.model';
import { IGenericResponse } from '../models/genericResponse.model';
import { ILocation } from '../models/location.model';
import { CHARACTER_URL, CHARACTER_URL_FILTERS, LOCATION_PARAMETER, LOCATION_URL, LOCATION_URL_FILTERS, NAME_PARAMETER, PAGE_PARAMETER, SPECIES_PARAMETER } from './global';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private _httpClient: HttpClient) { }

  /* GET ALL CHARACTERS WITH PAGE */
  public getCharactersPage(page: number): Observable<ICharacterResponse> {
    return this._httpClient.get<ICharacterResponse>(`${CHARACTER_URL_FILTERS}${PAGE_PARAMETER}${page}`).pipe(
      catchError((error: HttpErrorResponse) => {
        // handle errors
        console.log(error);
        return throwError(() => new Error());
      })
    );
  }

  /* GET ONE CHARACTER */
  public getCharacter(id: number): Observable<ICharacter> {
    return this._httpClient.get<ICharacter>(`${CHARACTER_URL}${id}/`).pipe(
      catchError((error: HttpErrorResponse) => {
        // handle errors
        console.log(error);
        return throwError(() => new Error());
      })
    );
  }

  /* GET LOCATIONS COUNT */
  public getLocationCount(): Observable<IGenericResponse> {
    return this._httpClient.get<IGenericResponse>(`${LOCATION_URL}`).pipe(
      catchError((error: HttpErrorResponse) => {
        // handle errors
        console.log(error);
        return throwError(() => new Error());
      })
    );
  }

  /* GET ONE LOCATION */
  public getLocation(id: number): Observable<ILocation> {
    return this._httpClient.get<ILocation>(`${LOCATION_URL}${id}/`).pipe(
      catchError((error: HttpErrorResponse) => {
        // handle errors
        console.log(error);
        return throwError(() => new Error());
      })
    );
  }

  /* GET LOCATION BY NAME*/
  public getLocationByName(name: string): Observable<ILocation> {
    return this._httpClient.get<ILocation>(`${LOCATION_URL_FILTERS}${NAME_PARAMETER}${name}/`).pipe(
      catchError((error: HttpErrorResponse) => {
        // handle errors
        console.log(error);
        return throwError(() => new Error());
      })
    );
  }

  /* SEARCH FILTERS */
  public getCharactersPageFilters(page: number, name?: string, species?: string): Observable<ICharacterResponse> {
    return this._httpClient.get<ICharacterResponse>(`${CHARACTER_URL_FILTERS}${PAGE_PARAMETER}${page}&${NAME_PARAMETER}${name}&${SPECIES_PARAMETER}${species}`).pipe(
      catchError((error: HttpErrorResponse) => {
        // handle errors
        console.log(error);
        return throwError(() => new Error());
      })
    );
  }

  public getCharactersPageLocation(page: number, location: string): Observable<ICharacterResponse> {
    return this._httpClient.get<ICharacterResponse>(`${CHARACTER_URL_FILTERS}${PAGE_PARAMETER}${page}&${LOCATION_PARAMETER}${location}`).pipe(
      catchError((error: HttpErrorResponse) => {
        // handle errors
        console.log(error);
        return throwError(() => new Error());
      })
    );
  }


}
