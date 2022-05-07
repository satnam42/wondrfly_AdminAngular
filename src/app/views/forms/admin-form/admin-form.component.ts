import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { TablesService } from 'app/views/tables/tables.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from 'app/shared/services/dataservice.service';
import { ApiService } from 'app/shared/services/api.service.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBarConfig } from '@angular/material';


@Component({
  selector: 'app-admin-form',
  templateUrl: './admin-form.component.html',
  styleUrls: ['./admin-form.component.scss']
})
export class AdminFormComponent implements OnInit {

  formData = {};
  childForm: FormGroup;
  user: any = {};
  FormData: any;
  submitted: boolean;
  usersData: any = {};
  responseData: any;
  res: any[];

  message: string = 'Admin Updated !';
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
    private snack: MatSnackBar,
    private apiservice: ApiService,
    private route: Router) {
    this.user = dataservice.getOption();
  }

  back() {
    this.route.navigate(['tables/admin']);
  }

  ngOnInit() {
    this.childForm = new FormGroup({
      fname: new FormControl('', [
      ]),
      lname: new FormControl('', [
      ]),
      age: new FormControl('', [
      ]),
      sex: new FormControl('', [
      ]),
      info: new FormControl('', [
      ]),
    });
  }

addAdmin(){
  let config = new MatSnackBarConfig();
  config.verticalPosition = this.verticalPosition;
  config.horizontalPosition = this.horizontalPosition;
  config.duration = this.setAutoHide ? this.autoHide : 0;
  // config.extraClasses = this.addExtraClass ? ['test'] : undefined;
  this.snack.open(this.message, 'OK', { duration: 4000 })
  
}

  onSubmit() {
    this.submitted = true;
    return this.addAdmin();
  }
}



