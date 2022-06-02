import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar, MatDialog, MatSnackBarConfig, MatDialogRef } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { PopupFormComponent } from 'app/shared/components/popup-form/popup-form.component';
import { Userr } from 'app/shared/models/user.model';
import { ApiService } from 'app/shared/services/api.service.service';
import { AppConfirmService } from 'app/shared/services/app-confirm/app-confirm.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { DataService } from 'app/shared/services/dataservice.service';
import { CsvDataService } from 'app/shared/services/excel.service';
import { KeywordFormComponent } from 'app/views/forms/keyword-form/keyword-form.component';
import { environment } from 'environments/environment';
import * as moment from 'moment';
import { FileUploader } from 'ng2-file-upload';
import { DaterangepickerDirective } from 'ngx-daterangepicker-material';
import { SearchProviderPopupComponent } from '../all-program-table/search-provider-popup/search-provider-popup.component';
import { DataPopupComponent } from '../data-popup/data-popup.component';
import { ProgramDataPopupComponent } from '../program-table/program-data-popup/program-data-popup.component';

@Component({
  selector: 'app-keyword',
  templateUrl: './keyword.component.html',
  styleUrls: ['./keyword.component.scss']
})
export class KeywordComponent implements OnInit {
  defaultFilter: string='name'
  isLoading: boolean;
  usersData: any = {};
  rows: any = [];
  temp: any = [];
  ColumnMode = ColumnMode;
  user = new Userr;
  submitted: any;
  publishedPrograms:any;
  searchText: '';
  isShow = true;
  searchControl = new FormControl()
  loaderPostion = 'center-center';
  loaderType = 'ball-spin-clockwise';
  pageNo: number = 1;
  pageSize = 20;
  keyword="";
  isScrol = true;
  message: string = 'Keyword Deleted Successfully!';
  action: boolean = true;
  setAutoHide: boolean = true;
  autoHide: number = 4000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  fileData: File = null;
  formData=new FormData();
  detailPageUrl:string;
  baseURL = environment.baseURL
  keywordData: any;
  keywordRow: any;
  constructor(
    public route: Router,
    private dataservice: DataService,
    private apiservice: ApiService,
    private snack: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private confirmService: AppConfirmService,
    private loader: AppLoaderService,
    private dialog: MatDialog,
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.user._id = params['id'];
    });
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

  onScroll() {
    if (this.isScrol && this.keyword=='') {
      this.isScrol = false;
      this.loadMore();
    }
  }

  loadMore() {
    this.loaderType = 'three-bounce';
    this.loaderPostion = 'bottom-center';
    // this.pageSize += 20;
    this.pageNo += 1;
  }

  setPage(page) {
    this.pageNo = page.offset;
    this.pageSize = page.pageSize;
    if (page.offset == 1) {
      this.pageNo = 2
    }
    this.getKeywords();
  }

  getKeywords() {
    this.loader.open();
    this.apiservice.getKeyword().subscribe(res => {
      this.temp = res;
      if (this.temp.data) {
        this.rows = this.temp.data;
        this.rows.reverse()
        this.isScrol = true;
      }
      this.loader.close();
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
        if (!res) {
          return;
        }
      });
  }
  
  deleteKeyword(data,indx) {
    this.confirmService.confirm({ message: `Delete ${data.keywordName}?` }).subscribe(res => {
      if (res) {
        this.loader.open();
        this.isLoading = true;
        this.apiservice.deleteKeyword(data._id).subscribe(res => {
          var response: any = res;
          if (response.isSuccess === true) {
            this.rows.splice(indx, 1);
            this.loader.close();
            this.snack.open(this.message, 'OK', { duration: 4000 });
          } else {
            this.loader.close();
            let msg = "Something Went Wrong!";
            this.snack.open(msg, 'OK', { duration: 4000 });
          }
        })
      }
    })
  }
  activateDeactivateKeyword(){
    
  }
  ngOnInit() {
    this.getKeywords();
  }
}
