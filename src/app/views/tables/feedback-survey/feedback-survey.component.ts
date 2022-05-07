import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { ApiService } from 'app/shared/services/api.service.service';
import { AppConfirmService } from 'app/shared/services/app-confirm/app-confirm.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { DataService } from 'app/shared/services/dataservice.service';
import { DataPopupComponent } from '../data-popup/data-popup.component';

@Component({
  selector: 'app-feedback-survey',
  templateUrl: './feedback-survey.component.html',
  styleUrls: ['./feedback-survey.component.scss']
})
export class FeedbackSurveyComponent implements OnInit {
  feedback: any =[];
  feedbackList: any;
  searchText = '';

  constructor(private apiservice: ApiService,
    private dialog: MatDialog,
    private snack: MatSnackBar, 
    private dataservice: DataService, 
    private loader: AppLoaderService, 
    private route: Router,
    private confirmService: AppConfirmService) { }



    feedbackSurveyList() {
    this.loader.open();
    this.apiservice.feedbackSurveyList().subscribe((res:any) => {
      this.loader.close();
      console.log('feedback ress', res)
      this.feedback = res;
    });
    this.loader.close();
  }

  feedbackSurveyDelete(data,indx) {
    this.confirmService.confirm({ message: `Delete ${data.feedback}?` }).subscribe(res => {
      if (res) {
        this.loader.open();
        this.apiservice.feedbackSurveyDelete(data.id).subscribe((res:any) => {
          this.loader.close();
          if (res.isSuccess === true) {
            this.loader.close();
            this.snack.open('Deleted', 'OK', { duration: 4000 });
            this.feedback.splice(indx,1)
          
          } else {
            this.loader.close();
            let msg = "Something Went Wrong!";
            this.snack.open(msg, 'OK', { duration: 4000 });
          }
        })
      }
    })
  }
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

  ngOnInit() {
    this.feedbackSurveyList()
  }

}
