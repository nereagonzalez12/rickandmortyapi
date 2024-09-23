import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-plumbus',
  templateUrl: './plumbus.component.html',
  styleUrls: ['./plumbus.component.css']
})
export class PlumbusComponent {

  navHidden: boolean = true;

  constructor(public translate: TranslateService) {
    translate.addLangs(['en', 'es']);
    translate.setDefaultLang('en');

    const browserLang = translate.getBrowserLang();
    if (browserLang) {
      translate.use(browserLang.match(/en|es/) ? browserLang : 'en');
    }
  }

  showNav() {
    this.navHidden = !this.navHidden;
  }

}
