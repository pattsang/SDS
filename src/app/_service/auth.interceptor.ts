import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { tap } from 'rxjs/operators';
import { HeaderComponent } from '../navigation/header/header.component';
import { MatDialog } from '@angular/material';
import { LoginComponent } from '../login/login.component';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private authService: AuthService,
    private dialog: MatDialog)
    {}

    loginPrompt() {
      const dialogRef = this.dialog.open(LoginComponent, {
        width: '500px'
      });
    }

  // intercept(req, next) {
  //    // console.log('Inteceptor req is: ' + req)
  //    var token = localStorage.getItem('token');

  //    var authRequest = req.clone({
  //        headers: req.headers.set('Authorization', `Bearer ${token}`)
  //    })
  //     return next.handle(authRequest);
  // }

  // intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

  //     var token = localStorage.getItem('token');

  //     request = request.clone({
  //       withCredentials: true,
  //       headers: request.headers.set('Authorization', `Bearer ${token}`)
  //     });
  //     return next.handle(request);
  //   }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    var token = localStorage.getItem('token');
    if (token) {
      req = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
      return next.handle(req).pipe(
        tap(
          succ => {},
          error => {
            if (error.status === 401) {
              localStorage.removeItem('token');
              this.loginPrompt();
              this.router.navigateByUrl('login');
            }
          }
        )
      );
    }
    req = req.clone({
      withCredentials: true
    });
    return next.handle(req);
  }
}