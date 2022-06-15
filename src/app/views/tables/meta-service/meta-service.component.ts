import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar, MatDialog, MatSnackBarConfig, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { ApiService } from 'app/shared/services/api.service.service';
import { AppConfirmService } from 'app/shared/services/app-confirm/app-confirm.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { environment } from 'environments/environment';
import { DataPopupComponent } from '../data-popup/data-popup.component';
import { MetaFormComponent } from './meta-form/meta-form.component';
export interface metaData {
  pageName: string;
  title: string;
  keywords: string;
  description: string;
}

@Component({
  selector: 'app-meta-service',
  templateUrl: './meta-service.component.html',
  styleUrls: ['./meta-service.component.scss']
})
export class MetaServiceComponent implements OnInit {
  defaultFilter: string = 'name'
  displayedColumns: any[] = [
    'pageName',
    'title',
    'keywords',
    'description',
    'star'
  ];
  filterColumns: string[] = [
    'firstName',
    'montclair',
    'byDate'
  ];
  dataSource = new MatTableDataSource<metaData>();
  selection = new SelectionModel<any>(true, []);

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) set content(sort: MatSort) {
    this.dataSource.sort = sort;
  }
  isLoading: boolean;
  rows: any = [];
  temp: any = [];
  ColumnMode = ColumnMode;
  submitted: any;
  publishedPrograms: any;
  searchText: '';
  isShow = true;
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
  fileData: File = null;
  formData = new FormData();
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
    this.getMetaService();
    let config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.setAutoHide ? this.autoHide : 0;
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

  getMetaService() {
    this.loader.open();
    this.apiservice.getMetaService().subscribe(res => {
      this.loader.close();
      this.temp = res;
      if (this.temp.data) {
        this.rows = this.temp.data.reverse();
        this.dataSource = new MatTableDataSource(this.rows);
      }
    });
  }

  editDataPopup(data): void {
    let dialogRef: MatDialogRef<any> = this.dialog.open(MetaFormComponent, {
      width: '50%',
      disableClose: true,
      data: data
    })
    dialogRef.afterClosed()
      .subscribe(res => {
        this.getMetaService();
      });
  }

  deleteMetaData(data, indx) {
    this.confirmService.confirm({ message: `Delete ${data.pageName}?` }).subscribe(res => {
      if (res) {
        this.isLoading = true;
        this.apiservice.deleteMetaService(data._id).subscribe(res => {
          var response: any = res;
          if (response.isSuccess === true) {
            this.getMetaService();
            this.snack.open(this.message, 'OK', { duration: 4000 });
          } else {
            let msg = "Something Went Wrong!";
            this.snack.open(msg, 'OK', { duration: 4000 });
          }
        })
      }
    })
  }

  ngOnInit() {

  }
}
