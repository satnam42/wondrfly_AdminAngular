import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar, MatDialog, MatSnackBarConfig, MatDialogRef, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { ApiService } from 'app/shared/services/api.service.service';
import { AppConfirmService } from 'app/shared/services/app-confirm/app-confirm.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { KeywordFormComponent } from 'app/views/forms/keyword-form/keyword-form.component';
import { environment } from 'environments/environment';
import { DataPopupComponent } from '../data-popup/data-popup.component';

export interface Keywords {
  keywordName: string;
  keywordType: string;
  isActivated: boolean;
}
@Component({
  selector: 'app-keyword',
  templateUrl: './keyword.component.html',
  styleUrls: ['./keyword.component.scss']
})
export class KeywordComponent implements OnInit {
  defaultFilter: string = 'name'
  displayedColumns: any[] = [
    'keywordName',
    'keywordType',
    'isActivated',
    'star'
  ];
  dataSource = new MatTableDataSource<Keywords>();
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) set content(sort: MatSort) {
    this.dataSource.sort = sort;
  }
  isLoading: boolean;
  usersData: any = {};
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
    this.getKeywords();
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

  getKeywords() {
    this.loader.open();
    this.apiservice.getKeyword().subscribe(res => {
      this.loader.close();
      this.temp = res;
      if (this.temp.data) {
        this.rows = this.temp.data;
        this.dataSource = new MatTableDataSource(this.rows.reverse());
      }
    });
  }

  editDataPopup(data): void {
    let dialogRef: MatDialogRef<any> = this.dialog.open(KeywordFormComponent, {
      width: '50%',
      disableClose: true,
      data: data
    })
    dialogRef.afterClosed()
      .subscribe(res => {
        this.getKeywords();
      });
  }

  logs() {
    this.route.navigate(['/tables/logs'])
    // let dialogRef: MatDialogRef<any> = this.dialog.open(SearchedKeywordsComponent, {
    //   width: '70%',
    //   disableClose: true,
    // })
    // dialogRef.afterClosed()
  }

  deleteKeyword(data, indx) {
    this.confirmService.confirm({ message: `Delete ${data.keywordName}?` }).subscribe(res => {
      if (res) {
        this.isLoading = true;
        this.apiservice.deleteKeyword(data._id).subscribe(res => {
          var response: any = res;
          if (response.isSuccess === true) {
            this.getKeywords();
            this.snack.open(this.message, 'OK', { duration: 4000 });
          } else {
            let msg = "Something Went Wrong!";
            this.snack.open(msg, 'OK', { duration: 4000 });
          }
        })
      }
    })
  }
  activateDeactivateKeyword(data, id) {
    var model: any = {
      id: id,
      isActivated: data.checked
    }
    this.apiservice.keyWordActivateDeactivate(model).subscribe((res: any) => {
      if (res.isSuccess) {
      } else { this.snack.open('Somthing went wrong', 'OK', { duration: 4000 }); }
    });
  }
  ngOnInit() {
  }
}
