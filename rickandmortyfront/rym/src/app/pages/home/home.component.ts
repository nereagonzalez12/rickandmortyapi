import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;
  characterSelected: boolean = false;
  // Service
  private sharedDataService = inject(SharedDataService);

  ngOnInit() {
    // Get new character data
    this.sharedDataService.currentCharacterData.subscribe(data => {
      if (data != null) {
        this.characterSelected = true;
      } else {
        this.characterSelected = false;
      }
    });

  }

  scrollToTop() {
    // Obtain the container element
    const container = this.scrollContainer.nativeElement;
    // Restart the scroll bar position
    container.scrollIntoView({ behavior: "smooth" });
  }
}
