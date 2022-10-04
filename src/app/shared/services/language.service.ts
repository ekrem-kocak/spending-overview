import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(public translate: TranslateService) { }

  switchLang(lang: string) {
    this.translate.use(lang);
  }
}
