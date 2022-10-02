import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/shared/services/alert.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgotForm: FormGroup;

  constructor(private authService: AuthService, private alertServie: AlertService) {
    this.forgotForm = new FormGroup({
      email: new FormControl('', [Validators.required])
    })
  }

  get email() { return this.forgotForm.get("email") };

  ngOnInit(): void { }

  resetPassword() {
    if (this.forgotForm.valid) {
      const email = this.email?.value;
      if (!email.includes('@')) {
        this.authService.getUsernameWithEmail(email).subscribe(email => {
          this.authService.ForgotPassword(email, true);
        })
      } else {
        const regex = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$");
        if (!regex.test(email))
          this.alertServie.error('Email is invalid');
        else
          this.authService.ForgotPassword(email, false);
      }
    }
  }

}
