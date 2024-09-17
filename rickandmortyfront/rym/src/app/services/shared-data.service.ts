import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ILocation } from '../models/location.model';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  emptyLocation: ILocation = {
    id: 0,
    name: '',
    type: '',
    dimension: '',
    image: ''
  };
  private dataSource = new BehaviorSubject<ILocation>(this.emptyLocation);

  currentData = this.dataSource.asObservable();

  constructor() { }
  // Update the data info
  updateData(data: ILocation) {
    this.dataSource.next(data);
  }
}
