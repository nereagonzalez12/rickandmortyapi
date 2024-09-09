import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ICharacter } from '../models/character.model';
import { CHARACTER_URL } from './global';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private _httpClient: HttpClient) { }

  /* GET */
  public getAllCharacters(): Observable<ICharacter[]> {
    return this._httpClient.get<ICharacter[]>(`${CHARACTER_URL}`).pipe(
      catchError((error: HttpErrorResponse) => {
        // handle errors
        console.log(error);
        return throwError(() => new Error());
      })
    );
  }

  public getCharacter(id: number): Observable<ICharacter[]> {
    return this._httpClient.get<ICharacter[]>(`${CHARACTER_URL}${id}/`).pipe(
      catchError((error: HttpErrorResponse) => {
        // handle errors
        console.log(error);
        return throwError(() => new Error());
      })
    );
  }
}
