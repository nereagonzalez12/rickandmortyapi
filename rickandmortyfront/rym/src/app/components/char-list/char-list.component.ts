import { Component, inject } from '@angular/core';
import { ICharacter } from 'src/app/models/character.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-char-list',
  templateUrl: './char-list.component.html',
  styleUrls: ['./char-list.component.css']
})
export class CharListComponent {
  private apiService = inject(ApiService);


  obtainPublicData() {
    this.apiService.getAllCharacters().subscribe({
      next: (data: ICharacter[]) => {
        console.log(data);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }
}
