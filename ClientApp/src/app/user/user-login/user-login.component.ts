
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './../../services/auth.service';
import { AlertifyService } from './../../services/alertify.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {

  constructor(private authService: AuthService,
              private alertify: AlertifyService,
              private router: Router) { }

  ngOnInit() {
  }

  onLogin(loginForm: NgForm) {
    const token = this.authService.authUser(loginForm.value);
    if(token) {
      localStorage.setItem('token', token.name);
      this.alertify.success('Login Successful');
      this.router.navigate(['/']);
    } else {
      this.alertify.error('Login Failed');
    }
  }

}
