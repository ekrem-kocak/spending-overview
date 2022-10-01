import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, EventEmitter, HostBinding, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ThemeService } from '../shared/services/theme-mode.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  toggleControl: FormControl;

  constructor(private themeService: ThemeService) {
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode) {
      this.toggleControl = new FormControl(JSON.parse(darkMode));
    } else {
      this.toggleControl = new FormControl(true);
    }
  }

  ngOnInit(): void {
    this.toggleControl.valueChanges.subscribe((isDarkMode) => {
      if (isDarkMode != null) {
        this.themeService.toggleTheme(isDarkMode);
      }
    });
  }

}
