import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  scrollToTop() {
    // Obtain the container element
    const container = this.scrollContainer.nativeElement;
    // Restart the scroll bar position
    container.scrollIntoView({ behavior: "smooth" });
  }
}
