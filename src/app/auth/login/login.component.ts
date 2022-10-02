import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, HostBinding, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AlertService } from 'src/app/shared/services/alert.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  loginForm: FormGroup;
  hide = true;

  constructor(public authService: AuthService, private alertService: AlertService) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      password: new FormControl('', Validators.required)
    })
  }

  get email() { return this.loginForm.get('email') }
  get password() { return this.loginForm.get('password') }

  signIn() {
    if (this.loginForm.valid) {
      if (!this.email?.value.includes('@')) {
        this.authService.getUsernameWithEmail(this.email?.value).subscribe(email => {
          this.authService.SignIn(email, this.password?.value, true);
        })
      } else {
        this.authService.SignIn(this.email?.value, this.password?.value, false);
      }
    }
  }
}
