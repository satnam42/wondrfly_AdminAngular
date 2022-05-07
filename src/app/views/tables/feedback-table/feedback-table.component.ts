import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { ApiService } from 'app/shared/services/api.service.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { DataService } from 'app/shared/services/dataservice.service';
import { DataPopupComponent } from '../data-popup/data-popup.component';

@Component({
  selector: 'app-feedback-table',
  templateUrl: './feedback-table.component.html',
  styleUrls: ['./feedback-table.component.scss']
})
export class FeedbackTableComponent implements OnInit {
  feedback: any =[];
  feedbackList: any;
  searchText = '';

  constructor(private apiservice: ApiService,
    private dialog: MatDialog,
    private snack: MatSnackBar, 
    private dataservice: DataService, 
    private loader: AppLoaderService, 
    private route: Router) { }



  getFeedback() {
    this.loader.open();
    this.apiservice.feedbackList().subscribe((res:any) => {
      this.loader.close();
      console.log('feedback ress', res)
      this.feedback = res;
    });
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
    this.getFeedback()
  }

}
