import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'app/shared/services/dataservice.service';
import { ApiService } from 'app/shared/services/api.service.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { Userr } from 'app/shared/models/user.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBarConfig, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-plan-features',
  templateUrl: './plan-features.component.html',
  styleUrls: ['./plan-features.component.scss']
})
export class PlanFeaturesComponent implements OnInit {
  isLoading: boolean;
  featureForm: FormGroup;
  usersData: any = {};
  badgeList: any = [];
  featuresList: any = [];
  features: any = [];
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
  token: any;

  constructor(private apiservice: ApiService, private snack: MatSnackBar,
    private dataservice: DataService, private loader: AppLoaderService, private route: Router) {
    this.token = localStorage.getItem('token');
    var retrievedObject = localStorage.getItem('userData');
  }


  ngOnInit() {
    this.getFeatures();
    this.featureForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      status: new FormControl('active', Validators.required),
    });
  }

  featurePage() {
    this.route.navigateByUrl('dashboard/featureList')
  }

  getFeatures() {
    this.loader.open();
    this.apiservice.featureList().subscribe(res => {
      this.features = res;
      this.featuresList = this.features.data;
      this.loader.close();
      this.featuresList.reverse();
    });
  }


  // delete activity

  delete(data) {
    this.loader.open();
    this.apiservice.deleteFeature(data._id).subscribe(res => {
      this.userResponse = res;
      this.loader.close();
      if (this.userResponse.isSuccess === true) {
        this.snack.open(this.message, 'OK', { duration: 4000 })
        this.getFeatures();
      }
    })
  }


  onSubmit() {
    // this.loader.open();
    this.apiservice.addFeature(this.featureForm.value).subscribe((res) => {
      this.alertResponse = res;
      // this.loader.close();
      if (this.alertResponse.isSuccess === true) {
        // this.snack.open(this.messages, 'OK', { duration: 7000 });
        this.getFeatures();
      }
      else {
        // this.loader.close();
        let msg = 'Something Went Wrong!';
        // this.snack.open(msg, 'OK', { duration: 7000 });
      }
    });
  }
}
