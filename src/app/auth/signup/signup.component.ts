import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/shared/services/alert.service';
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

  constructor(private authService: AuthService, private alertService: AlertService) {
    this.signupForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
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
    } else {
      this.alertService.error("Please fill in all fields correctly.");
    }
  }

  getErrorMessage(control: any): any {
    let req: string[] = [];
    let err = control.errors;

    if (err?.required)
      req.push('You must enter a value.');
    if (err?.minlength)
      req.push(`Must be a minimum of ${err.minlength.requiredLength} characters.`);
    if (err?.pattern)
      req.push('Not a valid.');

    return req;
  }

}
