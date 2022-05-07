import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'app/shared/services/dataservice.service';
import { ApiService } from 'app/shared/services/api.service.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { Userr } from 'app/shared/models/user.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBarConfig, MatSnackBar, MatDialogRef, MatDialog } from '@angular/material';
import { DataPopupComponent } from '../data-popup/data-popup.component';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  isLoading: boolean;
  alertForm: FormGroup;
  usersData: any = {};
  AlertsList: any = [];
  alertList: any = [];
  alerts: any = [];
  userResponse: any;
  searchText = '';
  message: string = 'Alert Deleted Successfully!';
  messages: string = 'Alert Added Successfully!';
  data: any;
  alertResponse: any;
  selectedAlertFor: any = '';
  selectedMessageFor: any = '';
  isEmail = false;
  isAlertFor = false;
  isMsgFor = false;
  constructor(private apiservice: ApiService, private dialog: MatDialog, private snack: MatSnackBar, private dataservice: DataService, private loader: AppLoaderService, private route: Router) { }

  ngOnInit() {
    this.getAlerts();
    this.alertForm = new FormGroup({
      email: new FormControl('',),
      fromDate: new FormControl('', Validators.required),
      toDate: new FormControl('', Validators.required),
      msg: new FormControl('', Validators.required),
      msgType: new FormControl('', Validators.required),
      alertFor: new FormControl('',),
    });
  }

  getAlerts() {
    this.loader.open();
    this.apiservice.alertList().subscribe(res => {
      this.alerts = res;
      this.AlertsList = this.alerts.data;
      this.AlertsList.reverse();
      this.loader.close();
    });
  }

  // view data 
  openPopUp(data) {
    let dialogRef: MatDialogRef<any> = this.dialog.open(DataPopupComponent, {
      width: '60%',
      disableClose: true,
      data: data,
      // this.name: this.data.firstName
    })
    dialogRef.afterClosed()
      .subscribe(res => {
        if (!res) {
          return;
        }
      });
  }

  addedalert() {
    this.route.navigateByUrl('dashboard/addNotifications')
  }
  addAlertFor(alertFor) {
    this.isAlertFor = true;
    this.selectedAlertFor = alertFor;
    if (alertFor.isTrusted) {
      this.isEmail = true;
      this.selectedAlertFor = '';
    }
    else {
      this.isEmail = false;
      this.alertForm.value.email = '';
    }
  }
  addMsgType(msgType: string) {
    this.isMsgFor = true;
    this.selectedMessageFor = msgType;
  }

  // delete activity

  delete(data) {
    this.loader.open();
    this.apiservice.deleteAlert(data._id).subscribe(res => {
      this.userResponse = res;
      this.loader.close();
      if (this.userResponse.isSuccess === true) {
        this.snack.open(this.message, 'OK', { duration: 4000 })
        this.getAlerts();
      }
    })
  }


  onSubmit() {
    // this.loader.open();
    this.alertForm.value.alertFor = this.selectedAlertFor;
    this.alertForm.value.msgType = this.selectedMessageFor;
    this.apiservice.addAlert(this.alertForm.value).subscribe((res) => {
      this.alertResponse = res;
      // this.loader.close();
      if (this.alertResponse.isSuccess === true) {
        this.snack.open(this.messages, 'OK', { duration: 7000 });
        this.getAlerts();
        // this.route.navigate(['dashboard/notifications']);
      }
      else {
        let msg = 'Something Went Wrong!';
        this.snack.open(msg, 'OK', { duration: 7000 });
      }
    });

  }

}


