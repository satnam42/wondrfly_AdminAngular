import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TablesService } from 'app/views/tables/tables.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'app/shared/services/dataservice.service';
import { ApiService } from 'app/shared/services/api.service.service';
import { CustomValidators } from 'ng2-validation';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBarConfig } from '@angular/material';
import { Userr } from 'app/shared/models/user.model';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';

@Component({
  selector: 'app-parent-form',
  templateUrl: './parent-form.component.html',
  styleUrls: ['./parent-form.component.css']
})
export class ParentFormComponent implements OnInit {

  formData = {};
  parentForm: FormGroup;

  user = new Userr;


  FormData: any;
  submitted: boolean;
  usersData: any = {};
  responseData: any;
  res: any[];

  message: string = 'Parent Added Successfully!';
  action: boolean = true;
  setAutoHide: boolean = true;
  autoHide: number = 4000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  parentResponse: any;

  constructor(
    private service: TablesService,
    public dataRoute: ActivatedRoute,
    private dataservice: DataService,
    private apiservice: ApiService,
    private snack: MatSnackBar,
    private route: Router,
    private loader: AppLoaderService) {
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

    // console.log('kkkkkkkkkkk', JSON.parse(this.dataRoute.snapshot.params['objectProducts']))
    // let user = JSON.parse(this.dataRoute.snapshot.params['objectProducts'])
    // tslint:disable-next-line:prefer-const
    // let password = new FormControl('', Validators.required);
    // tslint:disable-next-line:prefer-const
    // let confirmPassword = new FormControl('', CustomValidators.equalTo(password));

    this.parentForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('',),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl('',),
      sex: new FormControl('', Validators.required),
      addressLine1: new FormControl('',),
      addressLine2: new FormControl('',),
      city: new FormControl('',),
      country: new FormControl('',),
      zipCode: new FormControl('',),
      lat: new FormControl('',),
      long: new FormControl('',),
      stripeToken: new FormControl('',),
      stripeKey: new FormControl('',),
      ssn: new FormControl('',),
      deviceToken: new FormControl('',),
      source: new FormControl('',),
      note: new FormControl('',),
    });
  }

  addParent() {
    this.loader.open();
    this.user.password = "123456";
    this.user.role = "parent";
    this.apiservice.addUser(this.user).subscribe((res) => {
      this.parentResponse = res;
      this.loader.close();
      if (this.parentResponse.isSuccess === true) {
        this.snack.open(this.message, 'OK', { duration: 7000 });
        this.route.navigate(['tables/paging']);
      } else {
        if (this.parentResponse.isSuccess === false && this.parentResponse.error === 'Email already resgister') {
          let msg = 'Email already registered!';
          this.snack.open(msg, 'OK', { duration: 7000 });
        }
        else {
          let msg = 'Something Went Wrong!';
          this.snack.open(msg, 'OK', { duration: 7000 });
        }
      }
    });

  }

  onSubmit() {

    this.submitted = true;
    return this.addParent();
  }
}

