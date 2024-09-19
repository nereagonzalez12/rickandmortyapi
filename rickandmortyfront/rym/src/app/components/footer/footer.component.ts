import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  showHidePlumbus: boolean = false;

  constructor(private router: Router) { };

  changePlumbus() {
    const plumbusContour = document.getElementById("plumbus-contour");
    if (plumbusContour) {
      const plumbus = document.getElementById("plumbus");

      plumbus?.style.setProperty("--pos-x", `${plumbusContour.offsetLeft}px`);
      plumbus?.style.setProperty("--pos-y", `${plumbusContour.offsetTop}px`);

      this.showHidePlumbus = true;
    }
  }

  restartplumbus() {
    this.showHidePlumbus = false;
  }

  plumbusPage() {
    this.router.navigate(['/plumbus']);
  }
}
