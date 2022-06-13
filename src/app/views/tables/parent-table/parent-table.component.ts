import { Component, OnInit, OnChanges } from '@angular/core';
import { TablesService } from '../tables.service';
import { Router } from '@angular/router';
import { DataService } from 'app/shared/services/dataservice.service';
import { ApiService } from 'app/shared/services/api.service.service';
import { MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar, MatDialogRef, MatDialog, MatCheckboxChange } from '@angular/material';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { FileUploader } from 'ng2-file-upload';
import { AppConfirmService } from '../../../shared/services/app-confirm/app-confirm.service';
import { AppLoaderService } from '../../../shared/services/app-loader/app-loader.service';
import { DataPopupComponent } from '../data-popup/data-popup.component';
import { AuthsService } from 'app/shared/services/auth.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-parent-table',
  templateUrl: './parent-table.component.html',
  styleUrls: ['./parent-table.component.css'],
  providers: [TablesService]
})
export class ParentTableComponent implements OnInit, OnChanges {
  defaultFilter: string = 'name'
  keyword = "";
  filterColumns: string[] = [
    'name',
    'email',
  ];
  multiFilter = new FormControl();
  isLoading: boolean;
  usersData: any = {};
  rows: any = [];
  temp: any = [];
  ColumnMode = ColumnMode;
  isScrol = true;
  loaderPostion = 'center-center';
  loaderType = 'ball-spin-clockwise';
  pageNo: number = 1;
  pageSize: number = 20;
  submitted: any;

  public uploader: FileUploader = new FileUploader({ url: 'upload_url' });
  public hasBaseDropZoneOver: boolean = false;
  parentResponse: any;


  message: string = 'Parent Deleted Successfully!';
  action: boolean = true;
  setAutoHide: boolean = true;
  autoHide: number = 4000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  categoryResponse: any;
  searchText: '';
  selectedValue: any;
  status: boolean;
  isDeactivated: boolean;
  isActive: boolean;

  constructor(private service: TablesService,
    public route: Router,
    private dataservice: DataService,
    private snack: MatSnackBar,
    private apiservice: ApiService, private dialog: MatDialog,
    private confirmService: AppConfirmService,
    private loader: AppLoaderService,
    private authservice: AuthsService
  ) {
    this.usersData = authservice.currentUser();
    let config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.setAutoHide ? this.autoHide : 0;
  }

  edit(data) {
    this.dataservice.setOption(data);
    this.route.navigate(['forms/parent-update']);

  }

  showAnalytics(data) {
    this.route.navigate(['user-analytics', data.id]);

  }

  pagination(pageNo) {
    this.pageNo = pageNo;
    this.getParents();
  }


  activeSkill(event) {
    event.target.setAttribute('color', 'accent');
  }
  parentProfile(data) {
    this.dataservice.setOption(data);
    this.route.navigate(['profile/child', data.id]);

  }
  add() {
    this.route.navigate(['forms/parent']);
  }


  onScroll() {
    if (this.isScrol && this.selectedValue !== "status" && this.keyword == '') {
      this.isScrol = false;
      this.loadMore();
    }
  }

  addRemoveAmbassador(event, parent) {
    var addRemove: any = {
      userId: parent.id,
      isAmbassador: event.checked
    }
    this.apiservice.addRemoveAmbassador(addRemove).subscribe((res: any) => {
      if (res.isSuccess === true) {
        this.snack.open(res.data.description, 'OK', { duration: 4000 });
      }
    });
  }

  parentLogin(data) {
    this.apiservice.parentLoginById(data.id).subscribe((res: any) => {
      if (res.isSuccess) {
        this.authservice.setUserById(res.data)
      }
    })
  }

  getParents() {
    this.isLoading = true;
    this.loader.open()
    this.apiservice.getParents(this.pageNo, this.pageSize).subscribe(res => {
      this.temp = res;
      console.log('res getParent', res)
      if (this.temp.items) {
        this.rows = this.temp.items;
        this.isScrol = true;
      }
      this.isLoading = false;
      this.loader.close()
    });
  }
  loadMore() {
    this.loaderType = 'three-bounce';
    this.loaderPostion = 'bottom-center';
    this.pageSize += 20;
    this.getParents();
  }

  deleteParent(data, indx) {
    this.confirmService.confirm({ message: `Delete ${data.firstName}?` }).subscribe(res => {
      if (res) {
        this.isLoading = true;
        this.apiservice.deleteUser(data.id).subscribe(res => {
          this.parentResponse = res;
          if (this.parentResponse.isSuccess === true) {
            this.snack.open(this.message, 'OK', { duration: 4000 });
            this.rows.splice(indx, 1)
            // this.route.navigateByUrl('/tables', { skipLocationChange: true }).then(() => {
            //   this.route.navigate(['tables/paging']);
            // })
          } else {
            let msg = "Something Went Wrong!";
            this.snack.open(msg, 'OK', { duration: 4000 });
          }
        })
      }
    })
  }

  parentActiveInActive(parent) {
    let isActivated: boolean;
    if (parent.isActivated === true) {
      isActivated = false;
      this.apiservice.userActiveInActive(parent.id, isActivated).subscribe(res => {
        this.getParents();
      });

    }
    else {
      isActivated = true;
      this.apiservice.userActiveInActive(parent.id, isActivated).subscribe(res => {
        this.getParents();
      });

    }
  }
  ngOnChanges() {
  }

  ngOnInit() {
    window.scroll(0, 0);
    this.getParents();
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  updateFilter(key) {
    var response: any;
    let filter = ``;
    if (!this.selectedValue) {
      this.selectedValue = this.defaultFilter;
    }
    if (this.selectedValue == 'name') {
      filter += `name=${key}`
    }
    else if (this.selectedValue == 'email') {
      filter = `email=${key}`
    }
    if (this.isDeactivated) {
      filter += `&status=false`
    }
    else if (this.isActive) {
      filter += `&status=true`
    }
    console.log('searched value', filter)
    this.apiservice.searchParentFilter(filter).subscribe((res: any) => {
      response = res.data;
      console.log('res search', res)
      this.rows = response;
      this.isScrol = false;
    });

    if (!key && !this.isActive && !this.isDeactivated) {
      this.rows = [];
      this.getParents();
    }
  }


  isActiveChange(ob: MatCheckboxChange) {
    this.isActive = ob.checked
    this.isDeactivated = false;
    if (this.isActive) {
      this.updateFilter('');
    }
    else if (!this.isActive && !this.isDeactivated) {
      this.getParents()
    }
  }

  isDeactivatedChange(ob: MatCheckboxChange) {
    this.isDeactivated = ob.checked;
    this.isActive = false;
    if (this.isDeactivated) {
      this.updateFilter('');
    }
    else if (!this.isActive && !this.isDeactivated) {
      this.getParents()
    }
  }

  // updateFilter(event) {
  //   const val = event.target.value.toLowerCase();
  //   var columns = Object.keys(this.temp[0]);
  //   columns.splice(columns.length - 1);
  //   if (!columns.length)
  //     return;

  //   const rows = this.temp.filter(function (d) {
  //     for (let i = 0; i <= columns.length; i++) {
  //       let column = columns[i];
  //       if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) {
  //         return true;
  //       }
  //     }
  //   });
  //   this.rows = rows;
  // }

  selectedFilter(value: any) {
    this.selectedValue = value;
    // let response
    // if(this.selectedValue=="active"){
    //   this.selectedValue= 'status';
    //   this.loader.open();
    //   this.apiservice.searchParentFilter(this.selectedValue, true).subscribe((res: any) => {
    //     this.loader.close();
    //     response = res;
    //     this.rows = response;
    //   });
    // }else if(this.selectedValue=="inactive"){
    //   this.selectedValue= 'status';
    //   this.loader.open();
    //   this.apiservice.searchParentFilter(this.selectedValue, false).subscribe((res: any) => {
    //     this.loader.close();
    //     response = res;
    //     this.rows = response;
    //   });
    // }
    // this.loader.close();
  }

  reset() {
    this.rows = [];
    this.keyword = '';
    this.defaultFilter = 'name';
    this.selectedValue = '';
    this.isActive = false;
    this.isDeactivated = false;
    this.getParents();
  }

  openPopUp(data) {
    data.round = 'new Jersey';
    let dialogRef: MatDialogRef<any> = this.dialog.open(DataPopupComponent, {
      width: '60%',
      disableClose: true,
      data: data,
    })
    dialogRef.afterClosed()
      .subscribe(res => {
        if (!res) {
          return;
        }
      });
  }

}
