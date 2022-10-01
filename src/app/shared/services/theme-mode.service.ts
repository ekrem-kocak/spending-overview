import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  isDarkMode: boolean = true;

  themeChange: Subject<boolean> = new Subject<boolean>();

  constructor() {
    this.themeChange.subscribe((value) => {
      this.isDarkMode = value
    });
  }

  toggleTheme(isDarkMode: boolean) {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    this.themeChange.next(isDarkMode);
  }
}
