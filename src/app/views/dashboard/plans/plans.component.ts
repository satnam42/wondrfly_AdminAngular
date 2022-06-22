import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'app/shared/services/dataservice.service';
import { ApiService } from 'app/shared/services/api.service.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { Userr } from 'app/shared/models/user.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBarConfig, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss']
})
export class PlansComponent implements OnInit {
  isLoading: boolean;
  badgeForm: FormGroup;
  usersData: any = {};
  badgeList: any = [];
  plansList: any = [];
  plans: any = [];
  userResponse: any;
  searchText = '';
  message: string = 'Plan Deleted Successfully!';
  messages: string = 'Plan Added Successfully!';
  data: any;
  alertResponse: any;
  selectedAlertFor: any = '';
  selectedMessageFor: any = '';
  isEmail = false;
  fileData: File = null;
  badgeImageUrl = '';

  constructor(private apiservice: ApiService, private snack: MatSnackBar, private dataservice: DataService, private loader: AppLoaderService, private route: Router) { }


  ngOnInit() {
    this.getPlans();
    this.badgeForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      icon: new FormControl('', Validators.required),
    });
  }

  featurePage() {
    this.route.navigateByUrl('dashboard/featureList')
  }

  getPlans() {
    this.loader.open();
    this.apiservice.badgeList().subscribe(res => {
      this.plans = res;
      this.plansList = this.plans.data;
      this.loader.close();
      this.plansList.reverse();
    });
  }


  // delete activity

  delete(data) {
    this.loader.open();
    this.apiservice.deleteBadge(data._id).subscribe(res => {
      this.userResponse = res;
      this.loader.close();
      if (this.userResponse.isSuccess === true) {
        this.snack.open(this.message, 'OK', { duration: 4000 })
        this.getPlans();
      }
    })
  }


  onSubmit() {
    this.loader.open();
    // this.badgeForm.value.badgeForm = this.selectedAlertFor;
    this.badgeForm.value.icon = this.badgeImageUrl;
    if (this.badgeForm.value.icon) {
      this.apiservice.addBadge(this.badgeForm.value).subscribe((res) => {
        this.alertResponse = res;
        this.loader.close();
        if (this.alertResponse.isSuccess === true) {
          this.snack.open(this.messages, 'OK', { duration: 7000 });
          this.getPlans();
        }
        else {
          this.loader.close();
          let msg = 'Something Went Wrong!';
          this.snack.open(msg, 'OK', { duration: 7000 });
        }
      });
    }
    else {
      this.loader.close();
      this.snack.open('please upload  image', 'OK', { duration: 5000 });
    }

  }

}
