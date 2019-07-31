import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  NgForm
} from '@angular/forms';
import { FormControl } from '@angular/forms';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material';

import { AuthService } from '../_service/auth.service';
import { AlertifyService } from '../_service/alertify.service';
import { SendMailService } from '../_service/send-mail.service';
import { RequestConfirmComponent } from './request-confirm/request-confirm.component';
import { SdsRequestService } from '../_service/sdsRequest.service';

@Component({
  selector: "request",
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
  // request: RequestInterface = {
  //   manufacturer: '',
  //   productName: '',
  //   catalogNumber: '',
  //   fullName: '',
  //   emailAddress: '',
  //   phoneNumber: '',
  //   healthAuthority: '',
  //   facility: '',
  //   department: '',
  //   IsAccepted: null
  // };

  // model: any;

  model = {
    id: null,
    productName: '',
    manufacturer: '',
    casNumber: '',
    productName1: '',
    manufacturer1: '',
    casNumber1: '',
    productName2: '',
    manufacturer2: '',
    casNumber2: '',
    productName3: '',
    manufacturer3: '',
    casNumber3: '',
    productName4: '',
    manufacturer4: '',
    casNumber4: '',
    fullName: '',
    email: '',
    // emailSubject: '',
    // emailBody: '',
    comment: '',
    phoneNumber: '',
    healthAuthority: '',
    facility: '',
    department: ''
  };

  sdsRequestForm: FormGroup;
  manufacturer: string = '';
  productName: string = '';
  casNumber: string = '';
  fullName: string = '';
  email: string = '';
  emailSubject: string = '';
  emailBody: string = '';
  phoneNumber: string = '';
  healthAuthority: string = '';
  comment: string = '';
  facility: string = '';
  department: string = '';
  IsAccepted: number = 0;
  test: any;

  index: number;
  userTopLocation: any;
  userLocationName: any = {};
  userFromCalgary: any = {};
  userLocationId: any = {};
  userLevel1Loc: any = [];
  userLevel2Loc: any = [];
  userLevel3Loc: any = [];
  userLevel4Loc: any = [];
  userLevel5Loc: any = [];

  selectedHealthAuthority;
  selectedLevel1Authority;
  selectedLevel2Authority;
  selectedLevel3Authority;
  selectedLevel4Authority;
  selectedLevel5Authority;

  topAuthHasChildren: boolean;
  level1HasChildren: any;
  level2HasChildren: any;
  level3HasChildren: boolean;
  level4HasChildren: boolean;
  level5HasChildren: boolean;

  public form: {
    requests: Requests[];
  };

  selectedSearchParameter = 'Yes';

    requestSDS: RequestsInterface = {
      userId: null,
      id: null,
      fullName: '',
      email: '',
      comment: '',
      address: '',
      city: '',
      province: '',
      postalCode: '',
      phoneNumber: '',
      isHealthCareWorker: '',
      healthAuthority: '',
      facility: '',
      department: '',
      productName: '',
      productName1: '',
      productName2: '',
      productName3: '',
      productName4: '',
      casNumber: '',
      casNumber1: '',
      casNumber2: '',
      casNumber3: '',
      casNumber4: '',
      manufacturer: '',
      manufacturer1: '',
      manufacturer2: '',
      manufacturer3: '',
      manufacturer4: '',
    };
    
    userEmail = this.authService.decodedToken.email;
    userId = this.authService.decodedToken.nameid;
  constructor(
    private dialog: MatDialog,
    public fb: FormBuilder,
    public authService: AuthService,
    private alertify: AlertifyService,
    private sendMailService: SendMailService,
    private changeDet: ChangeDetectorRef,
    private sdsRequestService: SdsRequestService
  ) {
    // this.requestForm = fb.group({
    //   manufacturer: [null, Validators.required],
    //   productName: [null, Validators.required],
    //   casNumber: [null, Validators.required],
    //   fullName: [this.fullName, Validators.required],
    //   email: [this.email, Validators.required],

    //   // email: [userEmail],
    //   phoneNumber: [null, Validators.compose([Validators.required])],
    //   healthAuthority: [null, Validators.required],
    //   facility: [null, Validators.required],
    //   department: [null, Validators.required]
    //   // IsAccepted: [null]
    // });

    this.form = {
      requests: []
    };

    this.sdsRequestForm = fb.group({
      fullNameFormControl : new FormControl('', [
        Validators.required,
        Validators.maxLength(125)
      ]),
      emailFormControl : new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ]),
      phoneNumberFormControl : new FormControl('', [
        Validators.required,
        Validators.maxLength(10),
        Validators.pattern('[6-9]\\d{9}')
      ]),
      healthAuthorityFormControl : new FormControl('', [
        Validators.required,
        Validators.maxLength(100)
      ]),
      facilityFormControl : new FormControl('', [
        Validators.required,
        Validators.maxLength(100)
      ]),
      departmentFormControl : new FormControl('', [
        Validators.maxLength(100)
      ]),
      addressFormControl : new FormControl('', [
        Validators.maxLength(100)
      ]),
      cityFormControl : new FormControl('', [
        Validators.maxLength(20)
      ]),
      provinceFormControl : new FormControl('', [
        Validators.maxLength(20)
      ]),
      postalCodeFormControl : new FormControl('', [
        Validators.maxLength(6)
      ]),
      commentFormControl : new FormControl('', [
        Validators.maxLength(500)
      ]),
      productFormControl : new FormControl('', [
        Validators.required,
        Validators.maxLength(100)
      ]),
      manufacturerFormControl : new FormControl('', [
        Validators.required,
        Validators.maxLength(100)
      ]),
      casNoFormControl : new FormControl('', [
        Validators.required,
        Validators.maxLength(100)
      ]),
      userLocationFormControl: new FormControl('', []),
      siteLocationFormControl: new FormControl('', []),
      subDepartmentLocationFormControl: new FormControl('', []),
      floorLocationFormControl: new FormControl('', []),
    });
  }

  subjectFormControl = new FormControl('', [
    Validators.required,
  ]);

  onSelectCareWorkerConfirmation(event) {

    if (event.value === 'Yes') {
      this.selectedSearchParameter = event.value;
    }
    if (event.value === 'No') {
      this.selectedSearchParameter = event.value;
    }
    console.log(this.selectedSearchParameter);
  }

  resetForm() {
    this.selectedSearchParameter = 'Yes';
    this.sdsRequestForm.reset();
    this.subjectFormControl.reset(this.selectedSearchParameter);
    this.form.requests.splice(this.index, 5);
  }

  ngOnInit() {
    this.userHealthAuthority();
  }

  public processForm(form: any): void {
    // console.warn('Handling form submission!');
    //  console.group('Form Data');
      console.log(this.form.requests);
      console.log(this.form);

    // for (const request of this.form.requests) {
    //   // console.log("processForm: " + request.productName);
    //   this.model.productName = request.productName;
    //   this.model.manufacturer = request.manufacturer;
    //   this.model.casNumber = request.casNumber;
    //   this.model.id = request.id;
      // this.model.fullName = this.fullName;
      // this.model.email = this.email;
      // this.model.phoneNumber = this.phoneNumber;
      // this.model.healthAuthority = this.healthAuthority;
      // this.model.facility = this.facility;
      // this.model.department = this.department;
      // this.model.comment = this.comment;
      // request.email = this.model.email;
      // request.fullName = this.model.fullName;
      // request.phoneNumber = this.model.phoneNumber;
      // request.healthAuthority = this.model.healthAuthority;
      // request.facility = this.model.facility;
      // request.department = this.model.department;
      // request.comment = this.model.comment;
    }

    //   console.groupEnd();

    // //  console.group('Form Model');
    //   console.log(form);
    // console.groupEnd();
  // }
  isSelectedTopAuth: boolean;
  selectedHealthAuthorityLocation(event) {
    // console.log(event);
    if (event.value !== null) {
      this.isSelectedTopAuth = true;
      // console.log(this.isSelectedTopAuth);
      this.userLevel1Location();
    }
    // console.log(this.selectedHealthAuthority);
  }

  isSelectedLevel1: boolean;
  selectedLevel1Location(event) {
    if (event.value !== null) {
      this.isSelectedLevel1 = true;
      console.log(this.isSelectedLevel1);
      this.userLevel2Location();
    // console.log(event);
    // console.log(this.selectedLevel1Authority);
  }
}

isSelectedLevel2: boolean;
selectedLevel2Location(event) {
  if (event.value !== null) {
    this.isSelectedLevel2 = true;
    console.log(this.isSelectedLevel2);
    this.userLevel3Location();
  // console.log(event);
  // console.log(this.selectedLevel2Authority);
}
}

isSelectedLevel3: boolean;
selectedLevel3Location(event) {
  if (event.value !== null) {
    this.isSelectedLevel3 = true;
    // console.log(this.isSelectedLevel3);
    this.userLevel4Location();
  // console.log(event);
  // console.log(this.selectedLevel3Authority);
}
}

isSelectedLevel4: boolean;
selectedLevel4Location(event) {
  if (event.value !== null) {
    this.isSelectedLevel4 = true;
    // console.log(this.isSelectedLevel4);
    this.userLevel5Location();
  // console.log(event);
  // console.log(this.selectedLevel4Authority);
}
}

isSelectedLevel5: boolean;
selectedLevel5Location(event) {
  if (event.value !== null) {
    this.isSelectedLevel5 = true;
    // console.log(this.isSelectedLevel5);
    this.userLevel5Location();
  // console.log(event);
  // console.log(this.selectedLevel5Authority);
}
}

  userHealthAuthority() {
    return this.sdsRequestService.calgaryTopHealthAuthority(this.userId).subscribe(res =>
      {
        this.userTopLocation = res;
        for (const userLocation of this.userTopLocation) {
         this.userLocationName = userLocation.locationName;
         this.userFromCalgary = userLocation.fromCalgary;
         this.userLocationId = userLocation.authorityUnitId;
         this.sdsRequestForm.get('userLocationFormControl').setValue(this.userLocationName);
        }
      });
  }

  userLevel1Location() {
    return this.sdsRequestService.calgaryLevel1Location(this.selectedHealthAuthority).subscribe(res =>
      {
        this.userLevel1Loc = res;
        console.log(this.userLevel1Loc);
        for (const level1LocName of this.userLevel1Loc) {
          this.level1HasChildren = level1LocName.hasChildren;
          console.log('Level1: ' + this.level1HasChildren);
          this.sdsRequestForm.get('siteLocationFormControl').setValue(level1LocName.locationName);
        }
      });
  }

  userLevel2Location() {
    return this.sdsRequestService.calgaryLevel2Location(this.selectedLevel1Authority).subscribe(res =>
      {
        this.userLevel2Loc = res;
        console.log(this.userLevel2Loc);
        for (const level2LocName of this.userLevel2Loc) {
          this.level2HasChildren = level2LocName.hasChildren;
          console.log('Level2: ' + this.level2HasChildren);
          this.sdsRequestForm.get('facilityFormControl').setValue(level2LocName.locationName);
        }
      });
  }

  userLevel3Location() {
    return this.sdsRequestService.calgaryLevel3Location(this.selectedLevel2Authority).subscribe(res =>
      {
        this.userLevel3Loc = res;
        console.log(this.userLevel3Loc);
        for (const level3LocName of this.userLevel3Loc) {
          this.level3HasChildren = level3LocName.hasChildren;
          console.log('Level3: ' + this.level3HasChildren);
          this.sdsRequestForm.get('departmentFormControl').setValue(level3LocName.locationName);
        }
      });
  }

  userLevel4Location() {
    return this.sdsRequestService.calgaryLevel4Location(this.selectedLevel3Authority).subscribe(res =>
      {
        this.userLevel4Loc = res;
        console.log(this.userLevel4Loc);
        for (const level4LocName of this.userLevel4Loc) {
          this.level4HasChildren = level4LocName.hasChildren;
          console.log('Level4: ' + this.level4HasChildren);
          this.sdsRequestForm.get('subDepartmentLocationFormControl').setValue(level4LocName.locationName);
        }
      });
  }

  userLevel5Location() {
    return this.sdsRequestService.calgaryLevel5Location(this.selectedLevel4Authority).subscribe(res =>
      {
        this.userLevel5Loc = res;
        console.log(this.userLevel5Loc);
        for (const level5LocName of this.userLevel5Loc) {
          this.level5HasChildren = level5LocName.hasChildren;
          console.log('Level5: ' + this.level5HasChildren);
          this.sdsRequestForm.get('floorLocationFormControl').setValue(level5LocName.locationName);
        }
      });
  }
  sdsRequest() {
    this.requestSDS.userId = this.userId;
    this.requestSDS.fullName = this.sdsRequestForm.get('fullNameFormControl').value;
    this.requestSDS.email = this.sdsRequestForm.get('emailFormControl').value;
    this.requestSDS.isHealthCareWorker = this.selectedSearchParameter;
    this.requestSDS.phoneNumber = this.sdsRequestForm.get('phoneNumberFormControl').value;
    this.requestSDS.healthAuthority = this.sdsRequestForm.get('healthAuthorityFormControl').value;
    this.requestSDS.facility = this.sdsRequestForm.get('facilityFormControl').value;
    this.requestSDS.department = this.sdsRequestForm.get('departmentFormControl').value;
    this.requestSDS.address = this.sdsRequestForm.get('addressFormControl').value;
    this.requestSDS.city = this.sdsRequestForm.get('cityFormControl').value;
    this.requestSDS.province = this.sdsRequestForm.get('provinceFormControl').value;
    this.requestSDS.postalCode = this.sdsRequestForm.get('postalCodeFormControl').value;
    this.requestSDS.comment = this.sdsRequestForm.get('commentFormControl').value;

    // this.model.email = this.email;
    // this.model.emailSubject = this.emailSubject;
    // this.model.emailBody = this.emailBody;
    // this.model.phoneNumber = this.phoneNumber;
    // this.model.healthAuthority = this.healthAuthority;
    // this.model.facility = this.facility;
    // this.model.department = this.department;
    // this.model.comment = this.comment;

    for (const request of this.form.requests) {

      this.requestSDS.productName = request.productName;
      this.requestSDS.manufacturer = request.manufacturer;
      this.requestSDS.casNumber = request.casNumber;
      if (
        this.requestSDS.productName1 === '' &&
        this.requestSDS.productName1 !== this.requestSDS.productName
      ) {
        this.requestSDS.productName1 = request.productName;
        this.requestSDS.manufacturer1 = request.manufacturer;
        this.requestSDS.casNumber1 = request.casNumber;
      } else if (
        this.requestSDS.productName2 === '' &&
        this.requestSDS.productName2 !== this.requestSDS.productName1
      ) {
        this.requestSDS.productName2 = request.productName;
        this.requestSDS.manufacturer2 = request.manufacturer;
        this.requestSDS.casNumber2 = request.casNumber;
      } else if (
        this.requestSDS.productName3 === '' &&
        this.requestSDS.productName3 !== this.requestSDS.productName2
      ) {
        this.requestSDS.productName3 = request.productName;
        this.requestSDS.manufacturer3 = request.manufacturer;
        this.requestSDS.casNumber3 = request.casNumber;
      } else if (
        this.requestSDS.productName4 === '' &&
        this.requestSDS.productName4 !== this.requestSDS.productName3
      ) {
        this.requestSDS.productName4 = request.productName;
        this.requestSDS.manufacturer4 = request.manufacturer;
        this.requestSDS.casNumber4 = request.casNumber;
      }
    }

    return this.sendMailService.sdsRequest(this.requestSDS).subscribe(
      res => {
        console.log(this.requestSDS);
        console.log(res);
        this.alertify.success('Product request sent successfully');
      },
      error => {
        this.alertify.error('Something went wrong, please try again');
      }
    );
  }

  public addProductRequest(): void {
    this.changeDet.detectChanges();
    this.form.requests.push({
      id: Date.now(),
      productName: '',
      manufacturer: '',
      casNumber: '',
      // fullName: '',
      // email: '',
      // // emailSubject: '',
      // // emailBody: '',
      // comment: '',
      // phoneNumber: '',
      // healthAuthority: '',
      // facility: '',
      // department: ''
    });
  }

  clicked = 0;

  submitButton() {
    this.clicked++;
    this.addProductRequest();
  }

  disableButton() {
    if (this.form.requests.length === 5 && this.clicked > 4) {
      return true;
    } else {
      return false;
    }
  }

  public removeProductRequest(index: number): void {
    this.form.requests.splice(index, 1);
  }

  openDiaglogRequest(form) {
    const dialogRef = this.dialog.open(RequestConfirmComponent, {
      data: {
        form: form
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  // onFormSubmit(form: NgForm) {
  //   this.request.supplierManufacturer = form['supplierManufacturer'];
  //   this.request.productName = form['productName'];
  //   this.request.catalogNumber = form['catalogNumber'];
  //   this.request.fullName = form['fullName'];
  //   this.request.emailAddress = form['emailAddress'];
  //   this.request.phoneNumber = form['phoneNumber'];
  //   this.request.healthAuthority = form['healthAuthority'];
  //   this.request.department = form['department'];

  //   // this.sendMailService.sendRequest(this.request).subscribe(next => {
  //   //   this.alertify.success('Request successfully sent');
  //   // },
  //   //   error => {
  //   //     this.alertify.error('Something went wrong!');
  //   //     console.log('issue with registering');
  //   //   }
  //   // )
  //   this.openDiaglogRequest(form);
  // }
}

// export class RequestInterface {
//   supplierManufacturer: string;
//   productName: string;
//   catalogNumber: string;
//   fullName: string;
//   emailAddress: string;
//   phoneNumber: string;
//   healthAuthority: string;
//   facility: string;
//   department: string;
//   IsAccepted: number;
// }

interface Requests {
  id: number;
  productName: string;
  manufacturer: string;
  casNumber: string;
  // fullName: string;
  // email: string;
  // // emailSubject: string;
  // // emailBody: string;
  // comment: string;
  // phoneNumber: string;
  // healthAuthority: string;
  // facility: string;
  // department: string;
}


export class RequestsInterface {
  userId: null;
  id: null;
  fullName: string;
  email: string;
  comment: string;
  phoneNumber: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  healthAuthority: string;
  isHealthCareWorker: string;
  facility: string;
  department: string;
  productName: string;
  productName1: string;
  productName2: string;
  productName3: string;
  productName4: string;
  casNumber: string;
  casNumber1: string;
  casNumber2: string;
  casNumber3: string;
  casNumber4: string;
  manufacturer: string;
  manufacturer1: string;
  manufacturer2: string;
  manufacturer3: string;
  manufacturer4: string;
}