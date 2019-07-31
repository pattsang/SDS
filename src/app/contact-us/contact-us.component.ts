import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,FormsModule,NgForm, FormControl, FormGroupDirective } from '@angular/forms';
import { AuthService } from '../_service/auth.service';
import { AlertifyService } from '../_service/alertify.service';
import { SendMailService } from '../_service/send-mail.service';
import { Router } from '@angular/router';
import { ContactUsService } from '../_service/contactUs.service';
import { ErrorStateMatcher } from '@angular/material';

@Component({
  selector: 'contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})

export class ContactUsComponent implements OnInit {
  contactUs: ContactUsInterface = {
    fullName: '',
    emailAddress: '',
    healthAuthority: '',
    facility: '',
    phoneNumber: '',
    subject: '',
    message: ''
  };

  model: any = {};
  selectedSearchParameter = 'General Question';
  contactUsForm: FormGroup;
  name: string = '';
  emailAddress: string = '';
  healthAuthority: string = '';
  facility: string = '';
  phoneNumber: string = '';
  subject: string = '';
  message: string = '';
  
  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    private router: Router,
    private alertify: AlertifyService,
    private contactUsService: ContactUsService
  ) 
  { 
    this.contactUsForm = fb.group({
      fullNameFormControl : new FormControl('', [
        Validators.required,
        Validators.maxLength(125)
      ]),
      healthAuthorityFormControl : new FormControl('', [
        Validators.required
      ]),
     facilityFormControl : new FormControl('', [
        Validators.required
      ]),
      phoneNumberFormControl : new FormControl('', [
        Validators.required,
        Validators.maxLength(10),
        Validators.pattern('[6-9]\\d{9}')
      ]),
      messageFormControl : new FormControl('', [
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

  subjectFormControl = new FormControl('', [
    Validators.required,
  ]);

  onSelectSubject(event) {

    if (event.value === 'General Question') {
      this.selectedSearchParameter = event.value;
    }
    if (event.value === 'Product Information') {
      this.selectedSearchParameter = event.value;
    }
    if (event.value === 'Account Information') {
      this.selectedSearchParameter = event.value;
    }
    if (event.value === 'Other') {
      this.selectedSearchParameter = event.value;
    }
    // console.log(this.selectedSearchParameter);
  }

  resetForm() {
    this.selectedSearchParameter = 'General Question';
    this.contactUsForm.reset();
    this.subjectFormControl.reset(this.selectedSearchParameter);
  }

  ngOnInit() {
  }

  contactUsFunction() {
    this.contactUs.fullName = this.contactUsForm.get('fullNameFormControl').value;
    this.contactUs.emailAddress = this.contactUsForm.get('emailFormControl').value;
    this.contactUs.healthAuthority = this.contactUsForm.get('healthAuthorityFormControl').value;
    this.contactUs.facility = this.contactUsForm.get('facilityFormControl').value;
    this.contactUs.phoneNumber = this.contactUsForm.get('phoneNumberFormControl').value;
    this.contactUs.subject = this.selectedSearchParameter;
    this.contactUs.message = this.contactUsForm.get('messageFormControl').value;

    return this.contactUsService.contactUsForm(this.contactUs).subscribe(res => {
      // console.log(this.contactUs);
      this.alertify.success('Thank you for contacting us! Your email has been successfully submitted and we will get in touch with you shortly');
      this.resetForm();
    });
  }

}

export class ContactUsInterface {
  fullName: string;
  emailAddress: string;
  healthAuthority: string;
  facility: string;
  phoneNumber: string;
  subject: string;
  message: string;
}