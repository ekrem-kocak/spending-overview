import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, HostBinding, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  loginForm: FormGroup;
  hide = true;

  constructor(public authService: AuthService) {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  get email() { return this.loginForm.get('email') }
  get password() { return this.loginForm.get('password') }

  signIn() {
    if (this.loginForm.valid) {
      if (!this.email?.value.includes('@')) {
        this.authService.getUsername(this.email?.value).subscribe(res => {
          let email = res.find(i => i.username == this.email?.value).email;
          this.authService.SignIn(email, this.password?.value);
        })
      } else {
        this.authService.SignIn(this.email?.value, this.password?.value);
      }
    }
  }
}
