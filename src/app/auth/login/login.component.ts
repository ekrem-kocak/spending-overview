import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLogin: boolean = true;
  loading: boolean = false;

  authForm: FormGroup;

  constructor(public authService: AuthService) {
    this.authForm = new FormGroup({
      'username': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required),
      'repassword': new FormControl(''),
      'email': new FormControl('')
    })
  }

  ngOnInit(): void {
  }

  changeLogin(status: boolean) {
    if (status == this.isLogin) { return }

    if (status) {
      this.authForm = new FormGroup({
        'username': new FormControl('', Validators.required),
        'password': new FormControl('', Validators.required),
        'repassword': new FormControl(''),
        'email': new FormControl('')
      })
    } else {
      this.authForm = new FormGroup({
        'username': new FormControl('', Validators.required),
        'password': new FormControl('', Validators.required),
        'repassword': new FormControl('', Validators.required),
        'email': new FormControl('', Validators.required)
      })
    }
    this.isLogin = status;
  }

  auth() {
    if (this.authForm.valid) {
      if (this.isLogin) {
        this.authService.SignIn(this.authForm.get('username')?.value, this.authForm.get('password')?.value)
      } else {
        if(this.authForm.get('password')?.value === this.authForm.get('repassword')?.value){
          this.authService.SignUp(this.authForm.get('email')?.value, this.authForm.get('password')?.value).then()
        }else{
          // passwords did not match
        }
      }
    }

  }
}
