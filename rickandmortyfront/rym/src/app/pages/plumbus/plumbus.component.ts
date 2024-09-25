import { Component, OnInit } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-plumbus',
  templateUrl: './plumbus.component.html',
  styleUrls: ['./plumbus.component.css']
})
export class PlumbusComponent implements OnInit {
  selectedLang: string | null = '';
  navHidden: boolean = true;

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

  }

  showNav() {
    this.navHidden = !this.navHidden;
  }

}
