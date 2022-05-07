import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TablesService } from 'app/views/tables/tables.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from 'app/shared/services/dataservice.service';
import { ApiService } from 'app/shared/services/api.service.service';
import { MatDialog, MatSnackBarVerticalPosition, MatSnackBarConfig, MatSnackBar, MatAutocompleteSelectedEvent, MatDialogRef } from '@angular/material';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Forum } from 'app/shared/models/forum.model';
import { not } from '@angular/compiler/src/output/output_ast';
import { User } from 'app/views/app-chats/chat.service';
import { AppConfirmService } from '../../../shared/services/app-confirm/app-confirm.service';
import { DuplicacyDataPopupComponent } from './duplicacy-data-popup/duplicacy-data-popup.component';

@Component({
  selector: 'app-duplicacy',
  templateUrl: './duplicacy.component.html',
  styleUrls: ['./duplicacy.component.scss']
})

export class DuplicacyComponent implements OnInit {
  duplicacyForm: FormGroup;
  FormData: any;
  submitted: boolean;
  ForumResponse: any = [];
  duplicacy: any = [];
  userData: any;
  userId: any;
  userIds: any;
  adminId: any;
  userResponse: any;
  selectedData: any;
  selectedUser: any = new User;
  selectId: any;
  idd: any;
  hey: any;
  finalData: any = [];
  duplicateProvidresIds: any = [];
  duplicateProvidresIdss: any = [];
  passData: any = new User;
  selectTwoValue: any = [];
  selectTempData: any = [];

  selectTwos: any = [];
  compareDuplicacy: any = [];
  dem: any = [];
  message: string = 'Users Found Successfully!';
  su: string = 'Updation Successfully!';

  constructor(private router: Router,
    private apiService: ApiService,
    private loader: AppLoaderService,
    private snack: MatSnackBar,
    private confirmService: AppConfirmService,
    private dialog: MatDialog,
    private route: Router) { }

  ngOnInit() {

    this.duplicacyForm = new FormGroup({
      email: new FormControl(''),
      name: new FormControl(''),
      phoneNumber: new FormControl(''),
    });
  }

  onSubmits() {
    this.loader.open();
    this.apiService.Duplicacy(this.duplicacyForm.value).subscribe(res => {
      this.ForumResponse = res;
      this.duplicacy = this.ForumResponse.data
      this.loader.close();

      if (this.ForumResponse.isSuccess === true) {
        // this.snack.open(this.message, 'OK', { duration: 2000 })
      } else {
        let msg = "Something Went Wrong";
        this.snack.open(msg, 'OK', { duration: 2000 })
      }
    });
  }

  // FOR SAVE RECORD

  // saveRecord(data) {
  //   this.duplicateProvidresIds = [];
  //   this.selectedUser = data
  //   console.log('selectedData is', this.selectedUser)
  //   this.selectedData = data._id;
  //   this.finalData = this.duplicacy
  //   console.log('finddddal array here', this.finalData);
  //   this.duplicateProvidresIdss = this.finalData
  //   this.finalData = this.finalData.filter(({ _id }) => _id !== this.selectedData);
  //   for (var i = 0; i < this.finalData.length; i++) {
  //     if (this.finalData[i]._id !== this.selectedData) {
  //       this.duplicateProvidresIds.push(this.finalData[i]._id);
  //     }
  //   }
  //   this.selectedUser.duplicateProvidresIds = this.duplicateProvidresIds;
  //   this.selectedUser.id = this.selectedUser._id
  //   const savingData: any = {
  //     email: this.selectedUser.email,
  //     firstName: this.selectedUser.firstName,
  //     role: this.selectedUser.role,
  //     id: this.selectedUser.id,
  //     duplicateProvidresIds: this.selectedUser.duplicateProvidresIds
  //   }
  //   this.confirmService.confirm({
  //     message: ` Are You Sure To Save This Values ` }).subscribe(res => {
  //       if (res) {
  //         this.apiService.mergeDuplicacy(savingData).subscribe(res => {
  //           this.userResponse = res;
  //           this.loader.close();
  //           this.router.navigateByUrl('', { skipLocationChange: true }).then(() => {
  //             this.router.navigate(['dashboard/duplicacy']);
  //           })
  //           console.log("response", this.userResponse)
  //           if (this.userResponse.isSuccess === true) {
  //             this.snack.open(this.su, 'OK', { duration: 6000 })
  //           }
  //           // else{
  //           //   this
  //           // }
  //         })
  //       }
  //     })
  // }
  selectTwo(event, data) {
    this.selectedUser = data
    console.log("check", event.checked)
    if (event.checked) {
      this.selectTwoValue.push(this.selectedUser)
      this.selectTempData.push(this.selectedUser)
      console.log("selectTwoValue data", this.selectTwoValue)
      for (var i = 0; i < this.selectTempData.length; i++) {
        if (this.selectTempData.length >= 2) {
          this.selectTempData = [];
          this.openPopUp();
        }
      }
    }
    else if (!event.checked) {
      this.selectTwoValue.splice(this.selectedUser)
      console.log('unchecked value here', this.selectTwoValue)
    }
  }

  openPopUp() {
  
    let dialogRef: MatDialogRef<any> = this.dialog.open(DuplicacyDataPopupComponent, {
      width: '60%',
      disableClose: true,
      data: this.selectTwoValue,
    })
    dialogRef.afterClosed()
      .subscribe(res => {
        this.selectTwoValue = [];
      
        this.onSubmits();
        if (!res) {
          return dialogRef.close()
        }


      });
  }




  resets() {
    this.duplicacy = [];
  }

}

