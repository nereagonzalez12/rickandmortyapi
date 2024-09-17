import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  private dataSource = new BehaviorSubject<string>('');

  currentData = this.dataSource.asObservable();

  constructor() { }
  // Update the data info
  updateData(data: string) {
    this.dataSource.next(data);
  }
}
