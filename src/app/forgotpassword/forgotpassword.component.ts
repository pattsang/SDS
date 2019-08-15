import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../_service/auth.service';
import { Router } from '@angular/router';
import { AlertifyService } from '../_service/alertify.service';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  model: any = {};
  @Output() cancelRegister = new EventEmitter();
  
  constructor(private authService: AuthService,
    private router: Router,
     private alertify: AlertifyService,
     private dialog: MatDialog) { }

  ngOnInit() {
  }

  forgotPassword(){
    return this.authService.forgotPassword(this.model).subscribe(
      data => {
        this.alertify.success('Check your email for the password link');
        this.dialog.closeAll();
      },
      error => {
        this.alertify.error('Something went wrong!');
      }
    );
  }

  cancel() {
    this.cancelRegister.emit(false);
    this.router.navigate(['/login']);
  }
}
