import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, HostBinding, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ThemeService } from './shared/services/theme-mode.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @HostBinding('class') className = '';

  constructor(private themeService: ThemeService, private overlay: OverlayContainer, public translate: TranslateService) {
    translate.addLangs(['en', 'tr']);
    translate.setDefaultLang('en');;
  }

  ngOnInit(): void {
    this.themeService.themeChange.subscribe(isDarkMode => {
      this.setTheme(isDarkMode);
    })
    const v = localStorage.getItem('darkMode');
    if (v != null) {
      this.setTheme(JSON.parse(v));
    }
  }

  setTheme(isDarkMode: boolean) {
    const lightClassName = 'lightMode';
    this.className = !isDarkMode ? lightClassName : '';
    if (!isDarkMode) {
      this.overlay.getContainerElement().classList.add(lightClassName);
    } else {
      this.overlay.getContainerElement().classList.remove(lightClassName);
    }
  }
}
