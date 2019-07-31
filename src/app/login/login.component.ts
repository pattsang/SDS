import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_service/auth.service';
import { Router } from '@angular/router';
import { AlertifyService } from '../_service/alertify.service';
import { HttpHeaders } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: "login",
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  model: any = {};
  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertify: AlertifyService,
    private dialog: MatDialog,
    public fb: FormBuilder,
  ) {
    this.loginForm = fb.group({
      passwordFormControl : new FormControl('', [
        Validators.required,
        Validators.maxLength(125)
      ]),
      emailFormControl : new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])
    });
  }

  ngOnInit() {
    if (localStorage.getItem('token') != null) {
      this.router.navigateByUrl('/search');
    }
  }

  authorizedDatabaseUsersMessage() {
    var message = `We regret that this service is only available to authorized OHSAH SDS Database users, \n
    including all BC Health Authorities and their employees, and registered subscription clients. If you are an authorized database user, \n
    please provide a valid work email address.`;
  }

  login() {
    this.authService.login(this.model.email, this.model.password).subscribe(
      next => {
        this.router.navigate(['/search']);
        this.alertify.success('Logged in successfully');
        this.dialog.closeAll();
      },
      error => {
        this.alertify.error('Incorrect username or password');
      }
    );
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }

  loggedInWindowsUser() {
    const token = localStorage.getItem('token');
    return !!token;
  }
}
