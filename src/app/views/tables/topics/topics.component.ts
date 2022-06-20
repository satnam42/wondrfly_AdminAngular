import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar, MatDialog, MatSnackBarConfig, MatDialogRef, MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { Router } from '@angular/router';
import { ApiService } from 'app/shared/services/api.service.service';
import { AppConfirmService } from 'app/shared/services/app-confirm/app-confirm.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { environment } from 'environments/environment';
import { DataPopupComponent } from '../data-popup/data-popup.component';
import { TopicFormComponent } from './topic-form/topic-form.component';

export interface Topic {
  Name: string;
  url: string;
}

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss']
})
export class TopicsComponent implements OnInit {
  defaultFilter: string = 'name'
  displayedColumns: any[] = [
    'Name',
    'url',
    'star'
  ];
  dataSource = new MatTableDataSource<Topic>();
  selection = new SelectionModel<Topic>(true, []);

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) set content(sort: MatSort) {
    this.dataSource.sort = sort;
  }
  rows: Topic[];
  temp: any = [];
  submitted: any;
  searchText: '';
  searchControl = new FormControl()
  loaderPostion = 'center-center';
  loaderType = 'ball-spin-clockwise';
  keyword = "";
  message: string = 'Keyword Deleted Successfully!';
  action: boolean = true;
  setAutoHide: boolean = true;
  autoHide: number = 4000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  detailPageUrl: string;
  baseURL = environment.baseURL
  keywordData: any;
  keywordRow: any;
  constructor(
    public route: Router,
    private apiservice: ApiService,
    private snack: MatSnackBar,
    private confirmService: AppConfirmService,
    private loader: AppLoaderService,
    private dialog: MatDialog,
  ) {
    let config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.setAutoHide ? this.autoHide : 0;
    this.getTopics();
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
  getTopics() {
    this.loader.open();
    this.apiservice.getTopics().subscribe(res => {
      this.loader.close();
      this.temp = res;
      if (this.temp.data) {
        this.rows = this.temp.data;
        this.dataSource = new MatTableDataSource(this.rows);
      }
    });
  }

  editDataPopup(data): void {
    let dialogRef: MatDialogRef<any> = this.dialog.open(TopicFormComponent, {
      width: '50%',
      disableClose: true,
      data: data
    })
    dialogRef.afterClosed()
      .subscribe(res => {
        this.getTopics();
      });
  }

  deleteTopic(data, indx) {
    this.confirmService.confirm({ message: `Delete ${data.Name}?` }).subscribe(res => {
      if (res) {
        this.apiservice.deleteTopic(data._id).subscribe(res => {
          var response: any = res;
          if (response.isSuccess === true) {
            this.getTopics();
            this.snack.open(this.message, 'OK', { duration: 4000 });
          } else {
            let msg = "Something Went Wrong!";
            this.snack.open(msg, 'OK', { duration: 4000 });
          }
        })
      }
    })
  }
  activateDeactivateTopic(data, id) {
    var model: any = {
      id: id,
      isActivated: data.checked
    }
    this.apiservice.keyWordActivateDeactivate(model).subscribe((res: any) => {
      if (res.isSuccess) {
        // this.snack.open('Program published', 'OK', { duration: 4000 });
        // this.rows[indx].isPublished = booleanValue
      } else { this.snack.open('Somthing went wrong', 'OK', { duration: 4000 }); }
    });
  }
  copyLink(name) {
    if (name) {
      navigator.clipboard.writeText(`${this.baseURL}topic/${name}`).then().catch(e => console.error(e));
    } else {
      navigator.clipboard.writeText(`${this.baseURL}`).then().catch(e => console.error(e));
    }
  }
  ngOnInit() {
  }
}
