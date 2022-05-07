import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TablesService } from 'app/views/tables/tables.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'app/shared/services/dataservice.service';
import { ApiService } from 'app/shared/services/api.service.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBarConfig } from '@angular/material';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';

@Component({
  selector: 'app-parent-update-form',
  templateUrl: './parent-update-form.component.html',
  styleUrls: ['./parent-update-form.component.css']
})
export class ParentUpdateFormComponent implements OnInit {

  formData = {};
  parentupdateForm: FormGroup;
  user: any = {};
  FormData: any;
  submitted: boolean;
  usersData: any = {};
  responseData: any;
  res: any[];

  message: string = 'Parent Updated !';
  action: boolean = true;
  setAutoHide: boolean = true;
  autoHide: number = 4000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  parentResponse: any;

  constructor(private service: TablesService,
    public dataRoute: ActivatedRoute,
    private dataservice: DataService,
    private apiservice: ApiService,
    private snack: MatSnackBar,
    private route: Router,
    private loader: AppLoaderService) {
    this.user = dataservice.getOption();
    let config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.setAutoHide ? this.autoHide : 0;
    // config.extraClasses = this.addExtraClass ? ['test'] : undefined;
  }

  back() {
    this.route.navigate(['tables/paging']);
  }
  
  ngOnInit() {

    this.parentupdateForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('',),
      email: new FormControl('', Validators.required),
      phoneNumber: new FormControl('',),
      sex: new FormControl('', Validators.required),
      addressLine1: new FormControl('',),
      addressLine2: new FormControl('',),
      source: new FormControl('',),
      city: new FormControl('',),
      country: new FormControl('',),
      zipCode: new FormControl('',),
      lat: new FormControl('',),
      long: new FormControl('',),
      stripeToken: new FormControl('',),
      stripeKey: new FormControl('',),
      ssn: new FormControl('',),
      deviceToken: new FormControl('',),
      note: new FormControl('',),
    });
  }

  updateParent() {
    this.loader.open();
    console.log(this.user)
    this.apiservice.updateParent(this.user.id, this.user).subscribe(res => {
      this.parentResponse = res;
      console.log('after',this.user)
      if (this.parentResponse.isSuccess === true) {
        this.snack.open(this.message, 'OK', { duration: 4000 })
        this.route.navigate(['tables/paging']);
      } else {
        let msg = "Something Went Wrong";
        this.snack.open(msg, 'OK', { duration: 4000 });
      }
      this.loader.close();
    });
  }

  onSubmit() {
    this.submitted = true;
    return this.updateParent();
  }
}

