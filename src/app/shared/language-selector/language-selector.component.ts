import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent implements OnInit {

  languages = [
    { value: 'en', label: 'English', img: '../../../assets/images/language-selector/en.png' },
    { value: 'tr', label: 'Turkish', img: '../../../assets/images/language-selector/tr.png' },
  ];

  public language: any = this.languages[0];

  constructor(private languageService: LanguageService, private translate: TranslateService) { }

  ngOnInit(): void { }

  selectLanguage(value: string) {
    this.languageService.switchLang(value);
    this.language = this.languages.find(lang => lang.value === value);
    
    this.translate.get('translateButtons.button.en').subscribe(res=>{
      this.languages[0].label = res;
    });

    this.translate.get('translateButtons.button.tr').subscribe(res=>{
      this.languages[1].label = res;
    });
  }

}
