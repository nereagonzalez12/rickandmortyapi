import { Component, inject } from '@angular/core';
import { IGenericResponse } from 'src/app/models/genericResponse.model';
import { ILocation } from 'src/app/models/location.model';
import { ApiService } from 'src/app/services/api.service';
import { DEFAULT_LOCATION_IMG } from 'src/app/services/global';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {
  // Location carousel
  locationList: ILocation[] = [];
  location?: ILocation;
  // Service
  private apiService = inject(ApiService);
  private sharedDataService = inject(SharedDataService);

  ngOnInit(): void {
    this.obtainLocationsCount();
  }

  obtainLocationsCount() {
    /* Subscribe to the API server to fetch response data */
    this.apiService.getLocationCount().subscribe({
      next: (data: IGenericResponse) => {
        this.obtainRandomLocations(data.count);
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
            if (data.image === null) {
              // default location image
              data.image = DEFAULT_LOCATION_IMG;
            }

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

  // Location filter
  locationFilter(location: ILocation) {
    this.sharedDataService.updateData(location.name);
  }


}



