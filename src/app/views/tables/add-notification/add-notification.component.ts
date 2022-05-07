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
  selector: 'app-add-notification',
  templateUrl: './add-notification.component.html',
  styleUrls: ['./add-notification.component.scss']
})
export class AddNotificationComponent implements OnInit {
  formData = {};
  alertForm: FormGroup;
  alertFormEmail: FormGroup;
  user = new Userr;
  FormData: any;
  submitted: boolean;
  usersData: any = {};
  responseData: any;
  res: any[];
  message: string = 'Alert Added Successfully!';
  action: boolean = true;
  setAutoHide: boolean = true;
  // autoHide: number = 4000;
  // horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  // verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  alertResponse: any;

  constructor(
    private service: TablesService,
    public dataRoute: ActivatedRoute,
    private dataservice: DataService,
    private apiservice: ApiService,
    private snack: MatSnackBar,
    private route: Router,
    private loader: AppLoaderService) {
    let config = new MatSnackBarConfig();
    // config.verticalPosition = this.verticalPosition;
    // config.horizontalPosition = this.horizontalPosition;
    // config.duration = this.setAutoHide ? this.autoHide : 0;
  }


  ngOnInit() {

    this.alertForm = new FormGroup({
      // email: new FormControl('', Validators.required),
      fromDate: new FormControl('', Validators.required),
      toDate: new FormControl('', Validators.required),
      msg: new FormControl('', Validators.required),
      msgType: new FormControl('', Validators.required),
      alertFor: new FormControl('', Validators.required),
    });

    this.alertFormEmail = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      fromDate: new FormControl('', Validators.required),
      toDate: new FormControl('', Validators.required),
      msg: new FormControl('', Validators.required),
      msgType: new FormControl('', Validators.required),
    });

  }
  back() {
    this.route.navigateByUrl('dashboard/notifications')
  }
  onSubmit() {
    // this.loader.open();
    this.apiservice.addAlert(this.alertForm.value).subscribe((res) => {
      this.alertResponse = res;
      // this.loader.close();
      if (this.alertResponse.isSuccess === true) {
        this.snack.open(this.message, 'OK', { duration: 7000 });
        this.route.navigate(['dashboard/notifications']);
      }
      else {
        let msg = 'Something Went Wrong!';
        this.snack.open(msg, 'OK', { duration: 7000 });
      }
    });

  }

  onSubmits() {
    debugger;
    // this.loader.open();
    this.apiservice.addAlert(this.alertFormEmail.value).subscribe((res) => {
      this.alertResponse = res;
      // this.loader.close();
      if (this.alertResponse.isSuccess === true) {
        this.snack.open(this.message, 'OK', { duration: 7000 });
        this.route.navigate(['dashboard/notifications']);
      }
      else {
        let msg = 'Something Went Wrong!';
        this.snack.open(msg, 'OK', { duration: 7000 });
      }
    });

  }

}
