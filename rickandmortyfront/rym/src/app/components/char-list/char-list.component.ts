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

  ngOnInit(): void {

    console.log('ola');
    this.obtainPublicData();
    this.obtainCharacterData(1);
  }

  obtainPublicData() {
    /* Subscribe to the API server to fetch data */
    this.apiService.getAllCharacters().subscribe({
      next: (data: ICharacter[]) => {
        console.log(data);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  obtainCharacterData(id: number) {
    /* Subscribe to the API server with id to fetch character data */
    this.apiService.getCharacter(id).subscribe({
      next: (data: ICharacter[]) => {
        console.log(data);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }
}
