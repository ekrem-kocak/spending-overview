import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLogin: boolean = true;
  loading: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  changeLogin(status: boolean) {
    if (status == this.isLogin) { return }
    this.loading = true;
    setTimeout(() => {
      this.isLogin = status;
      this.loading = false;
    }, 1500);
  }
}
