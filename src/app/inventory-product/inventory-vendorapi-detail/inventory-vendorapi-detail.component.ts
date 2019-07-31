import { Component, OnInit, Inject } from '@angular/core';
import { ProductService } from 'src/app/_service/product.service';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/_service/alertify.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-inventory-vendorapi-detail',
  templateUrl: './inventory-vendorapi-detail.component.html',
  styleUrls: ['./inventory-vendorapi-detail.component.css']
})
export class InventoryVendorapiDetailComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public passedData: any,
    private productService: ProductService,
    private router: Router,
    private alertify: AlertifyService,
    private dialog: MatDialog
  ) {}

  productDetail: any;
  productDetailInfo: any = {};
  msdsId = this.passedData.row.msds_id;
  test = this.passedData.row;

  ngOnInit() {
    console.log(this.msdsId);
    console.log(this.test);
    this.getVendorAPIProductDetail();
  }

  getVendorAPIProductDetail() {
    return this.productService.getVendorAPIInventoryProductDetail(this.msdsId).subscribe(
        res => {
        this.productDetail = res;
        for(const test of this.productDetail) {
          console.log('VendorAPIDetail: ' + test.product_name);
          console.log('VendorAPIDetail: ' + test);
        }
        console.log(this.productDetail);
      // this.productDetailInfo = this.productDetail.health_authority;
      //  this.MyDataSource = new MatTableDataSource(this.productDetail);
      //  this.MyDataSource.data = res;
      },
      error => {
        this.alertify.error('Unable to retrieve product detail');
      });
  }

}
