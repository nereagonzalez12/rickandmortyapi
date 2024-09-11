import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ILocation } from 'src/app/models/location.model';
import { IResponse } from 'src/app/models/response.model';
import { ApiService } from 'src/app/services/api.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  private apiService = inject(ApiService);
  locationList: ILocation[] = [];
  location?: ILocation;

  constructor(private _httpClient: HttpClient) { }

  ngOnInit(): void {
    this.obtain1Location();
    this.obtainLocationsCount();
  }

  obtainLocationsCount() {
    /* Subscribe to the API server to fetch response data */
    this.apiService.getLocationCount().subscribe({
      next: (data: IResponse) => {
        this.obtainRandomLocations(data.count);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  obtain1Location() {
    /* Subscribe to the API server to fetch response data */
    this.apiService.get1Location().subscribe({
      next: (data: ILocation) => {
        this.location = data;
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  obtainRandomLocations(count: number) {
    // Obtain 10 random locations for the slider
    const PLACES_COUNT = 10;

    const fetchLocation = () => {
      if (this.locationList.length < PLACES_COUNT) {
        const RANDOM_NUMBER = Math.ceil(Math.random() * (count - 1) + 1);
        this.apiService.getLocation(RANDOM_NUMBER).subscribe({
          next: (data: ILocation) => {
            // Prevent duplicates elements in array
            if (!this.locationList.some((element) => element.id === data.id)) {
              this.locationList.push(data);
            }
            fetchLocation();
          },
          error: (error: any) => {
            console.log(error);
            fetchLocation();
          }
        });
      } else {
        // console.log('Fetched all locations');
      }
    };
    // First call
    fetchLocation();
  }




}



