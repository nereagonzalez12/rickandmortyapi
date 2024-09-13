import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ICharacter } from '../models/character.model';
import { ICharacterResponse } from '../models/characterResponse.model';
import { IGenericResponse } from '../models/genericResponse.model';
import { ILocation } from '../models/location.model';
import { CHARACTER_URL, LOCATION_URL } from './global';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private _httpClient: HttpClient) { }

  /* GET ALL CHARACTERS */
  public getAllCharacters(): Observable<ICharacterResponse> {
    return this._httpClient.get<ICharacterResponse>(`${CHARACTER_URL}`).pipe(
      catchError((error: HttpErrorResponse) => {
        // handle errors
        console.log(error);
        return throwError(() => new Error());
      })
    );
  }

  /* GET ALL CHARACTERS WITH PAGE */
  public getCharactersPage(page: string): Observable<ICharacterResponse> {
    return this._httpClient.get<ICharacterResponse>(page).pipe(
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


}
