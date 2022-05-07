import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Session } from 'app/shared/models/batch.model';
import * as moment from 'moment';
import { DataService } from 'app/shared/services/dataservice.service';
import { ApiService } from 'app/shared/services/api.service.service';
import { Userr } from 'app/shared/models/user.model';
import { AppConfirmService } from 'app/shared/services/app-confirm/app-confirm.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { Router } from '@angular/router';

@Component({
  selector: 'duplicacy-data-popup',
  templateUrl: './duplicacy-data-popup.component.html'
})
export class DuplicacyDataPopupComponent implements OnInit {
  public itemForm: FormGroup;
  provider = new Userr;
  compareDuplicacy: any = [];
  userOne: any;
  userTwo: any;
  isLoading: boolean;
  message: string = 'Deleted Successfully!';
  mergeMessage: string = 'User Merge Successfully!';

  constructor(
    private loader: AppLoaderService,
    private route: Router,
    private snack: MatSnackBar,
    private confirmService: AppConfirmService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DuplicacyDataPopupComponent>,
    private fb: FormBuilder,
    private apiservice: ApiService
  ) {
    this.userOne = data[0];
    this.userTwo = data[1];

  }

  ngOnInit() {
  }

  duplicateData: any = {
    firstName: '',
    id: '',
    lastName: '',
    phoneNumber: '',
    category: '',
    description: '',
    addressLine1: '',
    about: '',
    categoryIds: [
      ''
    ],
    tagsId: [
      ''
    ],
    duplicateProvidreId: '',
    city: '',
    country: '',
    state: '',
    street: '',
    source: '',
    note: '',
    securityQuestion: '',
    answer: '',
    zipCode: '',
    lat: '',
    long: '',
    logo: ''
  }


  onSwap(userOne,userTwo){
    this.userTwo.email = userOne.email;
    this.userOne.email = userTwo.email;
  }

  mergeDuplicacyOne() {
    this.duplicateData.duplicateProvidreId = this.userTwo._id
    this.duplicateData.id = this.userOne._id
    this.duplicateData.firstName = this.userOne.firstName
    this.duplicateData.city = this.userOne.city
    this.duplicateData.role = this.userOne.role
    this.duplicateData.firstName = this.userOne.firstName
   
    this.apiservice.mergeDuplicacy(this.duplicateData).subscribe((res: any) => {
      res;
      if (res.isSuccess === true) {
        this.dialogRef.close();
        this.snack.open(this.mergeMessage, 'OK', { duration: 2000 })
      } else {
        let msg = "Something Went Wrong";
        res.open(msg, 'OK', { duration: 2000 })
      }
    });
  }

  mergeDuplicacyTwo() {
    this.duplicateData.duplicateProvidreId = this.userOne._id
    this.duplicateData.id = this.userTwo._id
    this.duplicateData.firstName = this.userTwo.firstName
    this.duplicateData.city = this.userTwo.city
    this.duplicateData.role = this.userTwo.role
    this.duplicateData.firstName = this.userTwo.firstName
    console.log('hello duplicateData is', this.duplicateData)
    this.apiservice.mergeDuplicacy(this.duplicateData).subscribe((res: any) => {
      res;
      if (res.isSuccess === true) {
        this.dialogRef.close();
        this.snack.open(this.mergeMessage, 'OK', { duration: 2000 })
      } else {
        let msg = "Something Went Wrong";
        res.open(msg, 'OK', { duration: 2000 })
      }
    });
  }

  // delete Second record

  DeleteSecondRecord() {
    this.confirmService.confirm({ message: `Delete This ${this.userTwo.role}?` }).subscribe(res => {
      console.log('response here', res)
      if (res) {
        this.loader.open();
        this.isLoading = true;
        this.apiservice.deleteUser(this.userTwo._id).subscribe((res: any) => {
          res;
        
          if (res.isSuccess === true) {
            this.loader.close();
            this.snack.open(this.message, 'OK', { duration: 4000 });
            this.dialogRef.close();

          } else {
            this.loader.close();
            let msg = "Something Went Wrong!";
            this.snack.open(msg, 'OK', { duration: 4000 });
          }
        })
      }
    })
  }
  
  // delete first record

  DeleteFirstRecord() {
    this.confirmService.confirm({ message: `Delete This ${this.userOne.role}?` }).subscribe(res => {
   
      if (res) {
        this.loader.open();
        this.isLoading = true;
        this.apiservice.deleteUser(this.userOne._id).subscribe((res: any) => {
          res;
          console.log('', res)
          if (res.isSuccess === true) {
            this.loader.close();
            this.snack.open(this.message, 'OK', { duration: 4000 });
            this.dialogRef.close();

          } else {
            this.loader.close();
            let msg = "Something Went Wrong!";
            this.snack.open(msg, 'OK', { duration: 4000 });
          }
        })
      }
    })
  }
}