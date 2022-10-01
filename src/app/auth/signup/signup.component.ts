import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UserForRegister } from '../models/userForRegister.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  signupForm: FormGroup;
  hide = true;

  constructor(private authService: AuthService) {
    this.signupForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl('', [Validators.required, Validators.minLength(5)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  get username() { return this.signupForm.get('username') }
  get password() { return this.signupForm.get('password') }
  get email() { return this.signupForm.get('email') }

  signUp() {
    const user: UserForRegister = {
      username: this.username?.value,
      password: this.password?.value,
      email: this.email?.value,
    }

    if (this.signupForm.valid) {
      this.authService.SignUp(user.username, user.email, user.password);
    }
  }

  getErrorMessage(control: any): any {
    let req: string[] = [];
    let err = control.errors;

    if (err?.required)
      req.push('You must enter a value.');
    if (err?.minlength)
      req.push(`Must be a minimum of ${err.minlength.requiredLength} characters.`);
    if (err?.email)
      req.push('Not a valid email.');

    return req;
  }

}
