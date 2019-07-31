import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/_service/product.service';
import { AlertifyService } from 'src/app/_service/alertify.service';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { CreateManufacturerComponent } from 'src/app/manufacturer/create-manufacturer/create-manufacturer.component';
import { MatDialog, MatCheckbox } from '@angular/material';
import { EditProductComponent } from '../edit-product/edit-product.component';
import { EditManufacturerComponent } from 'src/app/manufacturer/edit-manufacturer/edit-manufacturer.component';
import { ManufacturerService } from 'src/app/_service/manufacturer.service';
import { Whmis2015Service } from 'src/app/_service/whmis2015.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})

export class CreateProductComponent implements OnInit {

  constructor(private productService: ProductService,
    private alertify: AlertifyService,
    private router: Router,
    private dialog: MatDialog,
    private manufacturerService: ManufacturerService,
    private whmis2015Service: Whmis2015Service
) { }

  model: any ={};
  product: any = {};
  routes: any = [];
  physRoutes: any = [];
  routesArray: number;
  physicalRoutesArray: number;
  pictograms: any = [];
  pictogramArray: number;
  MSDSOriginArray: number;
  MSDSFormatArray: number;
  selected: number;
  selectedHealthRoutes: number;
  selectedMSDSOrigin: number;
  selectedMSDSFormat: number;
  selectedExemptionClass: number;
  selectedStatus: number;
  ExemptionClassFormatArray: number;
  StatusFormatArray: number;
  MSDSFormatModel: string;

  route;
  routeChecked = false;

  //MSDSOriginModel: string;
  //MSDSOrigins: string[] = ['Canada', 'USA', 'Europe', 'Other'];
  Canada: string;
  USA: string;
  Europe: string;
  Other: string;

  Discontinued: string;
  discontinued: any; 
MSDSOriginFormControl = new FormControl();
  MSDSOriginGroups: MSDSOriginGroup[] = [
    {
      name: 'MSDS Origin',
      origin: [
        {value: '0', viewValue: 'Not Available'},
        {value: '1', viewValue: 'Canada'},
        {value: '2', viewValue: 'USA'},
        {value: '3', viewValue: 'Europe'},
        {value: '4', viewValue: 'Other'}
      ]
    },
  ];

  MSDSFormatFormControl = new FormControl();
  MSDSFormatGroups: MSDSFormatGroup[] = [
    {
      name: 'MSDS Format',
      format: [
        {value: '1', viewValue: 'WHMIS'},
        {value: '2', viewValue: 'OSHA'},
        {value: '3', viewValue: 'ILO/ISO/EU/ANSI'},
        {value: '5', viewValue: 'Other'}
      ]
    },
  ];

  ExemptionClassFormControl = new FormControl();
  ExemptionClassGroups: ExemptionClassFormatGroup[] = [
    {
      name: 'Exemption Class',
      exemptionClass: [
        {value: '1', viewValue: 'Non-hazardous'},
        {value: '2', viewValue: 'Cosmetic, device, drug or food [Food and Drugs Act]'},
        {value: '4', viewValue: 'Pest control product [Pest Control Products Act]'},
        {value: '8', viewValue: 'Consumer product'}, 
        {value: '16', viewValue: 'Manufactured article'}, 
        {value: '64', viewValue: 'Explosive [Explosives Act]'} 
      ]
    },
  ];

  StatusFormControl = new FormControl();
  StatusGroups: StatusFormatGroup[] = [
    {
      name: 'Status',
      status: [
        {value: '1', viewValue: 'No MSDS Available'}, 
        {value: '2', viewValue: 'Unable to identity hazards'},
      ]
    },
  ];


  ngOnInit() {
    this.manufacturerDropDown();
    this.healthClassDropDown();
    this.physicalClassDropDown();
    this.healthRoutes();
    this.physicalRoutes();
    this.pictogramReferences();
    this.getHealthCategoryDropDown();
    this.getPhysicalCategoryDropDown();
    this.getHmisRatingshealthDropDown();
    this.getHmisRatingsChronicDropDown();
    this.getHmisRatingsFlammabilityDropDown();
    this.getHmisRatingsReactivityDropDown();

    this.getNfpaRatingsHealthDropDown();
    this.getNfpaRatingsInstabilityDropDown();
    this.getNfpaRatingsSpecificDropDown();
    this.getNfparatingsFlammabilityDropDown();

    this.getIArcDropDown();
    this.getAcgihDropDown();

    this.getTransportHazardDropDown()
  }

  onSelectStatus(selectedStatus) {
    var total = 0;
    for(var i in selectedStatus){
      // the + impliys converting the string to a number
      total = +total + +selectedStatus[i];
      this.StatusFormatArray = total;
    }
    console.log(this.StatusFormatArray);
    this.model.statusFlag = this.StatusFormatArray;
  }

  onSelectExemptionClass(selectedExemptionClass) {
    var total = 0;
    for(var i in selectedExemptionClass){
      // the + impliys converting the string to a number
      total = +total + +selectedExemptionClass[i];
      this.ExemptionClassFormatArray = total;
    }
    console.log(this.ExemptionClassFormatArray);
    this.model.exemptionClassFlag = this.ExemptionClassFormatArray;
  }

  onSelectMSDSFormat(selectedMSDSFormat) {
    var total = 0;
    for(var i in selectedMSDSFormat){
      // the + impliys converting the string to a number
      total = +total + +selectedMSDSFormat[i];
      this.MSDSFormatArray = total;
    }
    console.log(this.MSDSFormatArray);
    this.model.formatId = this.MSDSFormatArray;
  }

   onSelectMSDSOrigin(selectedMSDSOrigin) {
    var total = 0;
    for(var i in selectedMSDSOrigin){
      // the + impliys converting the string to a number
      total = +total + +selectedMSDSOrigin[i];
      this.MSDSOriginArray = total;
    }
    console.log("thismsdsoriginarry :" + this.MSDSOriginArray);
    this.model.originFlag = this.MSDSOriginArray;
  }

   openManufacturerCreationPage() {
    const dialogRef = this.dialog.open(CreateManufacturerComponent, {
      width: '500px'
    });

    dialogRef.disableClose = true;
  }

  openManufacturerEditPage(selected) {
    console.log('openManufacturerEditPage: ' + selected);
      const dialogRef = this.dialog.open(EditManufacturerComponent, {
        width: '500px',
        data: {
          selected: selected,
        }
      });
      dialogRef.disableClose = true;
  }


  manufacturerDropDown() {
    return this.manufacturerService.manufacturerInformation().subscribe(res => {
      this.manufacturers = res;
  });
  }

  healthHazardClassList = new FormControl('', [Validators.required]);
  healths;
  selectedHealthClass;
  healthClassList: number;
  physicalClassList: number;

  onSelectedHealthHazardClass(selectedHealthClass) {
      this.healthClassList = selectedHealthClass[0];
      this.model.healthClassId = this.healthClassList;
  }

  healthClassDropDown() {
    return this.whmis2015Service.getHealthClass().subscribe(res => {
      this.healths = res;
  });
  }

  physicalHazardClassList = new FormControl('', [Validators.required]);
  physicals;
  selectedPhysicalClass;

  onSelectedPhysicalHazardClass(selectedPhysicalClass) {
      this.physicalClassList = selectedPhysicalClass[0];
      this.model.physicalClassId = this.physicalClassList;
  }

  physicalClassDropDown() {
    return this.whmis2015Service.getPhysicalClass().subscribe(res => {
      this.physicals = res;
  });
  }


  healthRoutes() {
    return this.whmis2015Service.getHealthRoutes().subscribe(res => {
      this.routes = res;
    });
  }

  onSelectHealthRoutes(checkbox: MatCheckbox, model: {healthRouteId: number}){
      this.model.healthRouteId = model.healthRouteId;
      this.routesArray = model.healthRouteId;
  }

  pictogramReferences() {
    return this.whmis2015Service.getPictograms().subscribe(res => {
      this.pictograms = res;
    });
  }

  onSelectedPictograms(checkbox: MatCheckbox, model: {pictogramId: number}) {
    this.model.pictogramId = model.pictogramId;
    this.pictogramArray = model.pictogramId;
  }

  physicalRoutes() {
    return this.whmis2015Service.getPhysicalRoutes().subscribe(res => {
      this.physRoutes = res;
    });
  }

  onSelectPhysicalRoutes(checkbox: MatCheckbox, model: {physicalRouteId: number}){
      this.model.physicalRouteId = model.physicalRouteId;
      this.physicalRoutesArray = model.physicalRouteId;
  }

  searchTerm: FormControl = new FormControl();
  myList: number;

  manufacturerList = new FormControl('', [Validators.required]);
  manufacturers;
  manufacturerArray;
  // selected;

  onSelectManufacturers(selected) {
      this.myList = selected[0];
      this.model.manufacturerId = this.myList;
  }

  physicalCategoriesList = new FormControl('', [Validators.required]);
  physicalCategories;
  physicalCategList: number;
  selectedPhysicalCategories;

  getPhysicalCategoryDropDown() {
    return this.whmis2015Service.getPhysicalCategories().subscribe(res => {
      this.physicalCategories = res;
  });
  }

  onSelectedPhysicalCategories(selectedPhysicalCategories) {
    this.physicalCategList = selectedPhysicalCategories[0];
    this.model.physicalHazardCategoryId = this.physicalCategList;
}

healthCategoriesList = new FormControl('', [Validators.required]);
healthCategories;
healthCategList: number;
selectedHealthCategories;

getHealthCategoryDropDown() {
  return this.whmis2015Service.getHealthCategories().subscribe(res => {
    this.healthCategories = res;
});
}

onSelectedHealthCategories(selectedHealthCategories) {
  this.healthCategList = selectedHealthCategories[0];
  this.model.healthHazardCategoryId = this.healthCategList;
}

transportHazardClassList = new FormControl('', [Validators.required]);
transportHazard;
TransportHazardList: number;
selectedTransportHazard;

getTransportHazardDropDown() {
  return this.whmis2015Service.getTransportHazardClasses().subscribe(res => {
    this.transportHazard = res;
});
}

onSelectedTransportHazardClasses(selectedTransportHazard) {
  this.TransportHazardList = selectedTransportHazard[0];
  this.model.transportHazardId = this.TransportHazardList;
}

iarcList = new FormControl('', [Validators.required]);
iarc;
iarcListResult: number;
selectedIarc;

getIArcDropDown() {
  return this.whmis2015Service.getAllIArcValues().subscribe(res => {
    this.iarc = res;
});
}

onSelectedIArc(selectedIarc) {
  this.iarcListResult = selectedIarc[0];
  this.model.iarcid = this.iarcListResult;
}

acgihList = new FormControl('', [Validators.required]);
acgih;
acgihListResult: number;
selectedacgih;

getAcgihDropDown() {
  return this.whmis2015Service.getAllAcgihValues().subscribe(res => {
    this.acgih = res;
});
}

onSelectedAcgih(selectedacgih) {
  this.acgihListResult = selectedacgih[0];
  this.model.acgihid = this.acgihListResult;
}

nfpaRatingsHealthList = new FormControl('', [Validators.required]);
nfpaRatingsHealth;
nfpaRatingsHealthListResult: number;
selectednfpaRatingsHealth;

getNfpaRatingsHealthDropDown() {
  return this.whmis2015Service.getAllNFPARatingsHealthValues().subscribe(res => {
    this.nfpaRatingsHealth = res;
});
}

onSelectedNfpaRatingsHealth(selectednfpaRatingsHealth) {
  this.nfpaRatingsHealthListResult = selectednfpaRatingsHealth[0];
  this.model.nfparatingsHealthId = this.nfpaRatingsHealthListResult;
}

nfparatingsFlammabilityList = new FormControl('', [Validators.required]);
nfparatingsFlammability;
nfparatingsFlammabilityListResult: number;
selectednfparatingsFlammability;

getNfparatingsFlammabilityDropDown() {
  return this.whmis2015Service.getAllNfpaRatingsFlammabilityValues().subscribe(res => {
    this.nfparatingsFlammability = res;
});
}

onSelectedNfparatingsFlammability(selectednfparatingsFlammability) {
  this.nfparatingsFlammabilityListResult = selectednfparatingsFlammability[0];
  this.model.nfparatingsFlammabilityId = this.nfparatingsFlammabilityListResult;
}

nfpaRatingsInstabilityList = new FormControl('', [Validators.required]);
nfpaRatingsInstability;
nfpaRatingsInstabilityListResult: number;
selectednfpaRatingsInstability;

getNfpaRatingsInstabilityDropDown() {
  return this.whmis2015Service.getAllNfpaRatingsInstability().subscribe(res => {
    this.nfpaRatingsInstability = res;
});
}

onSelectedNfpaRatingsInstability(selectednfpaRatingsInstability) {
  this.nfpaRatingsInstabilityListResult = selectednfpaRatingsInstability[0];
  this.model.nfparatingsInstabilityId = this.nfpaRatingsInstabilityListResult;
}

nfpaRatingsSpecificList = new FormControl('', [Validators.required]);
nfpaRatingsSpecific;
nfpaRatingsSpecificListResult: number;
selectednfpaRatingsSpecific;

getNfpaRatingsSpecificDropDown() {
  return this.whmis2015Service.getAllNfpaRatingsSpecific().subscribe(res => {
    this.nfpaRatingsSpecific = res;
});
}

onSelectedNfpaRatingsSpecific(selectednfpaRatingsSpecific) {
  this.nfpaRatingsSpecificListResult = selectednfpaRatingsSpecific[0];
  this.model.nfparatingsSpecificId = this.nfpaRatingsSpecificListResult;
}

hmisRatingshealthList = new FormControl('', [Validators.required]);
hmisRatingshealth;
hmisRatingshealthListResult: number;
selectedhmisRatingshealth;

getHmisRatingshealthDropDown() {
  return this.whmis2015Service.getAllHmisRatingsHealth().subscribe(res => {
    this.hmisRatingshealth = res;
});
}

onSelectedHmisRatingshealth(selectedhmisRatingshealth) {
  this.hmisRatingshealthListResult = selectedhmisRatingshealth[0];
  this.model.hmisratingsHealthId = this.hmisRatingshealthListResult;
}

hmisRatingsChronicList = new FormControl('', [Validators.required]);
hmisRatingsChronic;
hmisRatingsChronicListResult: number;
selectedhmisRatingsChronic;

getHmisRatingsChronicDropDown() {
  return this.whmis2015Service.getAllHmisRatingsChronic().subscribe(res => {
    this.hmisRatingsChronic = res;
});
}

onSelectedHmisRatingsChronic(selectedhmisRatingsChronic) {
  this.hmisRatingsChronicListResult = selectedhmisRatingsChronic[0];
  this.model.hmisratingsChronicId = this.hmisRatingsChronicListResult;
}

hmisRatingsFlammabilityList = new FormControl('', [Validators.required]);
hmisRatingsFlammability;
hmisRatingsFlammabilityListResult: number;
selectedhmisRatingsFlammability;

getHmisRatingsFlammabilityDropDown() {
  return this.whmis2015Service.getAllHmisRatingsFlammability().subscribe(res => {
    this.hmisRatingsFlammability = res;
});
}

onSelectedHmisRatingsFlammability(selectedhmisRatingsFlammability) {
  this.hmisRatingsFlammabilityListResult = selectedhmisRatingsFlammability[0];
  this.model.hmisratingsFlammabilityId = this.hmisRatingsFlammabilityListResult;
}

hmisRatingsReactivityList = new FormControl('', [Validators.required]);
hmisRatingsReactivity;
hmisRatingsReactivityListResult: number;
selectedhmisRatingsReactivity;

getHmisRatingsReactivityDropDown() {
  return this.whmis2015Service.getAllHmisRatingsReactivity().subscribe(res => {
    this.hmisRatingsReactivity = res;
});
}

onSelectedHmisRatingsReactivity(selectedhmisRatingsReactivity) {
  this.hmisRatingsReactivityListResult = selectedhmisRatingsReactivity[0];
  this.model.hmisratingsReactivityId = this.hmisRatingsReactivityListResult;
}

 createProductInformation() {
  return this.productService.createProduct(this.model).subscribe(next => {

    this.model.hmisratingsReactivityId = this.hmisRatingsReactivityListResult;
    this.model.hmisratingsChronicId = this.hmisRatingsChronicListResult;
    this.model.hmisratingsHealthId = this.hmisRatingshealthListResult;
    this.model.hmisratingsFlammabilityId = this.hmisRatingsFlammabilityListResult;

    this.model.nfparatingsSpecificId = this.nfpaRatingsSpecificListResult;
    this.model.nfparatingsHealthId = this.nfpaRatingsHealthListResult;
    this.model.nfparatingsInstabilityId = this.nfpaRatingsInstabilityListResult;
    this.model.nfparatingsFlammabilityId = this.nfparatingsFlammabilityListResult;

    this.model.acgihid = this.acgihListResult;
    this.model.iarcid = this.iarcListResult;
    this.model.transportHazardId = this.TransportHazardList;

    this.model.healthHazardCategoryId = this.healthHazardClassList;
    this.model.physicalHazardCategoryId = this.physicalHazardClassList;
    this.model.physicalRouteId = this.physicalRoutesArray;
    this.model.physicalClassId = this.physicalClassList;
    this.model.healthRouteId = this.routesArray;
    this.model.healthClassId = this.healthClassList;
    this.model.manufacturerId = this.myList;
    this.model.originFlag = this.MSDSOriginArray;
    this.model.formatId = this.MSDSFormatArray;
    this.model.exemptionClassFlag = this.ExemptionClassFormatArray;
    this.model.statusFlag = this.StatusFormatArray;

    this.alertify.success("New product has been created successfully");
  }, error => {
    this.alertify.error("Something went wrong, please try again");
  }
  );
  }

  
}

export interface StatusFormat {
  value: string;
  viewValue: string;
}

export interface StatusFormatGroup {
  disabled?: boolean;
  name: string;
  status: StatusFormat[];
}

export interface ExemptionClassFormat {
  value: string;
  viewValue: string;
}

export interface ExemptionClassFormatGroup {
  disabled?: boolean;
  name: string;
  exemptionClass: ExemptionClassFormat[];
}

export interface MSDSFormat {
  value: string;
  viewValue: string;
}

export interface MSDSFormatGroup {
  disabled?: boolean;
  name: string;
  format: MSDSFormat[];
}

export interface MSDSOrigin {
  value: string;
  viewValue: string;
}

export interface MSDSOriginGroup {
  disabled?: boolean;
  name: string;
  origin: MSDSOrigin[];
}

export interface HealthHazard {
  value: string;
  viewValue: string;
}

export interface HealthHazardGroup {
  disabled?: boolean;
  name: string;
  hazard: HealthHazard[];
}

export interface PhysicalHazard {
  value: string;
  viewValue: string;
}

export interface PhysicalHazardGroup {
  disabled?: boolean;
  name: string;
  hazard: PhysicalHazard[];
}

export interface WhmisHazardCategory {
  value: string;
  viewValue: string;
}

export interface WhmisHazardCategoryGroup {
  disabled?: boolean;
  name: string;
  hazard: WhmisHazardCategory[];
}

export interface ACGIHCategory {
  value: string;
  viewValue: string;
}

export interface ACGIHGroup {
  disabled?: boolean;
  name: string;
  hazard: ACGIHCategory[];
}

export interface TransportHazardClassCategory {
  value: string;
  viewValue: string;
}

export interface TransportHazardClassGroup {
  disabled?: boolean;
  name: string;
  hazard: TransportHazardClassCategory[];
}

