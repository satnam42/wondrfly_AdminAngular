import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'app/shared/services/dataservice.service';
import { ApiService } from 'app/shared/services/api.service.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { Userr } from 'app/shared/models/user.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBarConfig, MatSnackBar, MatDialog, MatDialogRef } from '@angular/material';
import { DataPopupComponent} from 'app/views/tables/data-popup/data-popup.component'
@Component({
  selector: 'app-badges',
  templateUrl: './badges.component.html',
  styleUrls: ['./badges.component.scss']
})
export class BadgesComponent implements OnInit {
  isLoading: boolean;
  badgeForm: FormGroup;
  usersData: any = {};
  badgeList: any = [];
  badgesList: any = [];
  badges: any = [];
  userResponse: any;
  searchText = '';
  message: string = 'Badge Deleted Successfully!';
  messages: string = 'Badge Added Successfully!';
  data: any;
  alertResponse: any;
  selectedAlertFor: any = '';
  selectedMessageFor: any = '';
  isEmail = false;
  fileData: File = null;
  badgeImageUrl = '';
    
    constructor(private apiservice: ApiService,private dialog: MatDialog,private snack: MatSnackBar, private dataservice: DataService, private loader: AppLoaderService, private route: Router)
   { }


  ngOnInit() {
    this.getBadges();
    this.badgeForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      icon: new FormControl('', Validators.required),
    });

  }
  getPicUrl(event) {
    let formData = new FormData();
    this.fileData = event.target.files[0];
    formData.append('image', this.fileData);
    this.apiservice.getPicUrl(formData).subscribe((res: any) => {
      this.badgeImageUrl = res.data;
    });
  }
  getBadges() {
    this.loader.open();
    this.apiservice.badgeList().subscribe(res => {
      this.badges = res;
      this.badgesList = this.badges.data;
    
      this.loader.close();
      this.badgesList.reverse();
    });
  }


  // delete activity

  delete(data) {
    this.loader.open();
    this.apiservice.deleteBadge(data.id).subscribe(res => {
      this.userResponse = res;
      this.loader.close();
      if (this.userResponse.isSuccess === true) {
        this.snack.open(this.message, 'OK', { duration: 4000 })
        this.getBadges();
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
          this.getBadges();
        }
        else {
          this.loader.close();
          let msg = 'Something Went Wrong!';
          this.snack.open(msg, 'OK', { duration: 7000 });
        }
      });
      this.badgeForm.reset()
    }
    else {
      this.loader.close();
      this.snack.open('please upload  image', 'OK', { duration: 5000 });
    }
  }

    // view data 
    openPopUp(data) {
      let dialogRef: MatDialogRef<any> = this.dialog.open(DataPopupComponent, {
        width: '60%',
        disableClose: true,
        data: data
      })
      dialogRef.afterClosed()
        .subscribe(res => {
          if (!res) {
            return;
          }
        });
    } 
}
