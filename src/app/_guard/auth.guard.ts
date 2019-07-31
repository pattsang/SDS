import {Injectable} from '@angular/core';
import {CanActivate, Router, ActivatedRouteSnapshot} from '@angular/router';
import {AuthService} from '../_service/auth.service';
import { AlertifyService } from '../_service/alertify.service';
import { HeaderComponent } from '../navigation/header/header.component';
import { MatDialog } from '@angular/material';
import { LoginComponent } from '../login/login.component';


@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate {

    constructor(
        private authService: AuthService,
        private router: Router,
        private alertify: AlertifyService,
        private dialog: MatDialog) {}


        loginPrompt() {
            const dialogRef = this.dialog.open(LoginComponent, {
              width: '500px'
            });
          }

        canActivate(next: ActivatedRouteSnapshot): boolean {
            // const roles = next.firstChild.data['role'] as Array<string>;
            // if (roles) {
            //     const match = this.authService.roleFromToken(roles);
            //     if (match) {
            //         return true;
            //     } else {
            //         this.router.navigate(['/search']);
            //         this.alertify.error('Please Log in');
            //     }
            // }
            if (this.authService.loggedIn()) {
                return true;
            }

            this.alertify.warning('Sorry your session has already expired. Please sign in again.');
            this.loginPrompt();
            this.router.navigate(['/search']);
            return false;
        }
}