import { Component, inject } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { IGenericResponse } from 'src/app/models/genericResponse.model';
import { ILocation } from 'src/app/models/location.model';
import { ApiService } from 'src/app/services/api.service';
import { BACK_URL, DEFAULT_LOCATION_IMG, FRONT_URL } from 'src/app/services/global';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {
  selectedLang: string | null = '';
  // Location carousel
  locationList: ILocation[] = [];
  location?: ILocation;
  // Service
  private apiService = inject(ApiService);
  private sharedDataService = inject(SharedDataService);

  constructor(public translate: TranslateService) {
    translate.addLangs(['en', 'es']);
    this.selectedLang = sessionStorage.getItem('lang');

    if (this.selectedLang) {
      translate.setDefaultLang(this.selectedLang);
      translate.use(this.selectedLang);
    } else {
      const browserLang = translate.getBrowserLang();
      if (browserLang) {
        const langToUse = browserLang.match(/en|es/) ? browserLang : 'en';
        translate.setDefaultLang(langToUse);
        translate.use(langToUse);
      }
    }
  }

  ngOnInit(): void {

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      if (event) {
        sessionStorage.setItem('lang', event.lang);
      }
    });

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
        const RANDOM_NUMBER = Math.floor(Math.random() * (count - 1 + 1)) + 1;
        this.apiService.getLocation(RANDOM_NUMBER).subscribe({
          next: (data: ILocation) => {
            if (data.image === null) {
              // default location image
              data.image = DEFAULT_LOCATION_IMG;
            } else {
              data.image = data.image.replace(BACK_URL, FRONT_URL);
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
    console.log(location);
    this.sharedDataService.updateLocationData(location.name);
  }

  // Idiom selector
  switchLang(lang: string) {
    this.translate.use(lang);
  }

}



