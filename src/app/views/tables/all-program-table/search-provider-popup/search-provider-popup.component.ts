import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Session } from 'app/shared/models/batch.model';
import * as moment from 'moment';
import { DataService } from 'app/shared/services/dataservice.service';
import { Router } from '@angular/router';
import { Userr } from 'app/shared/models/user.model';
import { ApiService } from 'app/shared/services/api.service.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';

@Component({
  selector: 'search-provider-popup',
  templateUrl: './search-provider-popup.component.html'
})
export class SearchProviderPopupComponent implements OnInit {
  public itemForm: FormGroup;
  user = new Userr;
  users: any = [];
  keyword = 'firstName';
  searchByName = true;
  searchByMail = false;
  searchById = false;

  emailForSearch: string;
  idForSearch: string;

  action: boolean = true;
  setAutoHide: boolean = true;
  autoHide: number = 4000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<SearchProviderPopupComponent>,
    private fb: FormBuilder,
    private dataservice: DataService,
    private snack: MatSnackBar,
    private loader: AppLoaderService,
    private route: Router,
    private apiservice: ApiService,
  ) { }

  selectEvent(item) {
    this.user._id = item._id;
 
    if (this.data === 'wizard') {
      this.route.navigate(['forms/wizard', this.user._id]);
    }
    if (this.data === 'form') {
      this.route.navigate(['forms/program', this.user._id]);
    }
    this.dialogRef.close();

  }
  changeByName() {
    this.searchByName = true;
    this.searchByMail = false;
    this.searchById = false;
  }
  changeByMail() {
    this.searchByName = false;
    this.searchByMail = true;
    this.searchById = false;
  }
  changeById() {
    this.searchByName = false;
    this.searchByMail = false;
    this.searchById = true;
  }
  onChangeSearch(key: string) {
    this.apiservice.searchProviderByName(key).subscribe((res: any) => {
      // this.providerData = res;
      this.users = res;
     
    });
  }


  onFocused(e) {

    // do something when input is focused
  }
  searchByEmail() {
    var users: any = {};
    this.loader.open();
    this.apiservice.searchProviderByEmail(this.emailForSearch).subscribe((res: any) => {
      // this.providerData = res;
      users = res;
      this.loader.close();
     
      if (users.isSuccess === true) {
        this.user._id = users.data._id;
        if (this.data === 'wizard') {
          this.route.navigate(['forms/wizard', this.user._id]);
        }
        if (this.data === 'form') {
          this.route.navigate(['forms/program', this.user._id]);
        }
        this.dialogRef.close();
      }
      else {
        this.snack.open(users.error, 'OK', { duration: 4000 });
      }
    });
  }


  searchByid() {
    var users: any = {};
    this.loader.open();
    this.apiservice.searchProviderById(this.idForSearch).subscribe((res: any) => {
      // this.providerData = res;
      users = res;
      this.loader.close();
  
      if (users.isSuccess === true) {
        this.user._id = users.data.id;
        if (this.data === 'wizard') {
          this.route.navigate(['forms/wizard', this.user._id]);
        }
        if (this.data === 'form') {
          this.route.navigate(['forms/program', this.user._id]);
        }
        this.dialogRef.close();
      }
      else {
        this.snack.open(users.error, 'OK', { duration: 4000 });
      }
    });
  }


  ngOnInit() {
    // let data = this.dataservice.getOption();
    // if (data) {
    //   this.batches = data
    // }

    // console.log('batch', data)
  }


  submit() {
    this.dialogRef.close();
  }
}
