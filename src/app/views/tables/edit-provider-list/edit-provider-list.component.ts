import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { TablesService } from 'app/views/tables/tables.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'app/shared/services/api.service.service';
import { DataService } from 'app/shared/services/dataservice.service';
import { CustomValidators } from 'ng2-validation';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { Userr } from 'app/shared/models/user.model';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
@Component({
  selector: 'app-edit-provider-list',
  templateUrl: './edit-provider-list.component.html',
  styleUrls: ['./edit-provider-list.component.scss']
})
export class EditProviderListComponent implements OnInit {


  formData = {};
  providerUpdateForm: FormGroup;

  user = new Userr;


  FormData: any;
  submitted: boolean;
  usersData: any = {};
  responseData: any;
  res: any[];
  providerResponse: any;
  message: string = 'Provider Updated Successfully !';
  // actionButtonLabel: string = 'Retry';
  action: boolean = true;
  setAutoHide: boolean = true;
  autoHide: number = 4000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  // addExtraClass: boolean = false;
  constructor(private service: TablesService,
    public dataRoute: ActivatedRoute,
    private dataservice: DataService,
    private apiservice: ApiService,
    private snack: MatSnackBar,
    private loader: AppLoaderService,
    private route: Router,
    private activatedRoute : ActivatedRoute) {

      this.activatedRoute.params.subscribe(params => {
        this.user.id = params['id'];
      });
    console.log('dataService', this.user.id)
  }
    
  ngOnInit() {
    this.getProviderById()
    // if (!this.user) {
    //   this.route.navigate(['tables/provider']);
    // }    

    this.providerUpdateForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('',),
      email: new FormControl('',),
      phoneNumber: new FormControl('',),
      // sex: new FormControl('',),
      addressLine1: new FormControl('',),
      addressLine2: new FormControl('',),
      address: new FormControl('',),
      city: new FormControl('',),
      facebook: new FormControl('',),
      website: new FormControl('',),
      instagram: new FormControl('',),
      twitter: new FormControl('',),
      taxNumber: new FormControl('',),
      country: new FormControl('',),
      zipCode: new FormControl('',),
      lat: new FormControl('',),
      long: new FormControl('',),
      stripeToken: new FormControl('',),
      stripeKey: new FormControl('',),
      ssn: new FormControl('',),
      deviceToken: new FormControl('',),
      location: new FormControl('',),
      source: new FormControl('',),
      state: new FormControl('',),
      tier: new FormControl('',),
      note: new FormControl('',),
      fullAddress: new FormControl('',),
    });
  }
  back() {
    this.route.navigate(['tables/provider']);
  }

  getProviderById() {
    this.apiservice.getUserById(this.user.id).subscribe((res: any) => {
      this.user = res;
      console.log("providerdata", this.user)
    })
  }


  updateProvider() {
    this.loader.open();
    this.apiservice.updateProvider(this.user).subscribe(res => {
      this.providerResponse = res;
      this.loader.close();
      console.log('response', this.providerResponse);
      if (this.providerResponse.isSuccess === true) {
        this.snack.open(this.message, 'OK', { duration: 4000 })
        this.route.navigate(['tables/providerReport']);
      } else {
        let msg = "Something Went Wrong";
        this.snack.open(msg, 'OK', { duration: 4000 });
      }
    });
  }
  ngOnChange() {
    console.log('userrrrr', this.user);
  }







  onSubmit() {

    this.submitted = true;

    console.log('user', this.user);
    return this.updateProvider();
  }

}
