import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'app/shared/services/dataservice.service';
import { ApiService } from 'app/shared/services/api.service.service';
import { MatSort, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar, MatDialogRef, MatDialog } from '@angular/material';
import { SortType, ColumnMode } from '@swimlane/ngx-datatable';
import { FileUploader } from 'ng2-file-upload';
import { AppConfirmService } from '../../../shared/services/app-confirm/app-confirm.service';
import { AppLoaderService } from '../../../shared/services/app-loader/app-loader.service';
import { Userr } from 'app/shared/models/user.model';
import { DataPopupComponent } from '../data-popup/data-popup.component';
@Component({
  selector: 'app-child-reports',
  templateUrl: './child-reports.component.html',
  styleUrls: ['./child-reports.component.scss']
})
export class ChildReportsComponent implements OnInit {
  isLoading: boolean;
  usersData: any = {};
  rows: any = [];
  temp: any = [];
  programList: any = [];
  programs: any = [];
  ColumnMode = ColumnMode;
  isScrol = true;
  searchText: '';
  loaderPostion = 'center-center';
  loaderType = 'ball-spin-clockwise';
  pageNo: number = 1;
  pageSize = 10;
  submitted: any;


  constructor(public route: Router,
    private dataservice: DataService,
    private snack: MatSnackBar, private dialog: MatDialog,
    private apiservice: ApiService,
    private confirmService: AppConfirmService,
    private loader: AppLoaderService) { }
  edit(data) {
    this.dataservice.setOption(data);
    this.route.navigate(['forms/category']);
  }

  ngOnInit() {
    window.scroll(0, 0);
    this.getPublishedProgram();
    this.rows = this.temp;
    this.rows
  }

  getPublishedProgram() {
    this.isLoading = true;
    this.loader.open();
    this.apiservice.getPublishedProgram(this.pageNo, this.pageSize, 'published').subscribe(res => {
      this.programList = res;
      if (this.programList.items) {
        this.programs = this.programList.items;
        this.isScrol = true;
      }
      this.loader.close();

    });
  }


  onScroll() {
    if (this.isScrol) {
      this.isScrol = false;
      this.loadMore();
    }
  }

  loadMore() {
    this.loaderType = 'three-bounce';
    this.loaderPostion = 'bottom-center';
    this.pageSize += 10;
    this.getPublishedProgram();
  }

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

  // updateFilter(event) {
  //   const val = event.target.value.toLowerCase();
  //   var columns = Object.keys(this.temp[0]);
  //   // Removes last "$$index" from "column"
  //   columns.splice(columns.length - 1);

  //   // console.log(columns);
  //   if (!columns.length)
  //     return;

  //   const rows = this.temp.filter(function (d) {
  //     for (let i = 0; i <= columns.length; i++) {
  //       let column = columns[i];
  //       // console.log(d[column]);
  //       if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) {
  //         return true;
  //       }
  //     }
  //   });

  //   this.rows = rows;

  // }
}

