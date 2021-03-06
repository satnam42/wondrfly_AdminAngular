import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Userr } from 'app/shared/models/user.model';
import { ApiService } from 'app/shared/services/api.service.service';
import { AppConfirmService } from 'app/shared/services/app-confirm/app-confirm.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { environment } from 'environments/environment';
import * as moment from 'moment';
import { DataPopupComponent } from '../data-popup/data-popup.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  userr: Userr;
  baseUrl = environment.baseURL;
  displayedColumns: any[] = [
    'select',
    'firstName',
    'email',
    'addressLine1',
    'phoneNumber',
    'isActivated',
    'freeTrial',
    'star',
  ];
  filterColumns: string[] = [
    'firstName',
    'montclair',
    'byDate'
  ];
  defaultFilter: string = 'firstName';
  dataSource = new MatTableDataSource();
  selection = new SelectionModel<Userr>(true, []);
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) set content(sort: MatSort) {
    this.dataSource.sort = sort;
  }
  selectedValue: any;
  byDate = new FormControl();
  searchDate: any;
  isLoading: boolean;
  rows: any = [];
  temp: any = [];
  provider = "provider";
  isShow = true;
  isScrol = true;
  showReset = false;
  pageNo = 1;
  pageSize = 20;
  pageLength: any;
  users: any = [];
  public news: Array<any> = [];

  private request$!: any;
  activeTab: any;
  data: any;
  total: any;

  constructor(
    private apiservice: ApiService,
    private router: Router,
    private confirmService: AppConfirmService,
    private loader: AppLoaderService,
    private activatedRoute: ActivatedRoute,
    private snack: MatSnackBar,
    public dialog: MatDialog,
    // private confirmationDialogService: ConfirmationDialogService,
    // private spinner: NgxSpinnerService
  ) {
    // this.users = Array.from({ length: 100 }, (_, k) => createNewUser(k + 1));
    // this.data = Object.assign(this.users);
    // this.dataSource = new MatTableDataSource(this.users);
    this.getSetTabs();
  }

  ngOnInit() {
    // this.spinner.show();
    // this.byDate.valueChanges.subscribe((value)=>{
    //   this.searchDate = moment(value).format("YYYY-MM-DD");
    //   this.getProviderByDate(this.searchDate)
    // })
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
    // this.dataSource.filterPredicate = (data: any, filtersJson: string) => {
    //   const matchFilter: any[] = [];
    //   const filters = JSON.parse(filtersJson);

    //   filters.forEach((filter: any) => {
    //     const val = data[filter.id] === null ? '' : data[filter.id];
    //     matchFilter.push(
    //       val.toLowerCase().includes(filter.value.toLowerCase())
    //     );
    //   });
    //   return matchFilter.every(Boolean);
    // };
    // this.spinner.hide();
  }

  activateDeactivate(data, user) {
    let id = user.id ? user.id : user._id;
    this.apiservice.userActiveInActive(id, data.checked).subscribe((res: any) => {
      if (res.isSuccess) {
        this.snack.open('User status changed', 'OK', { duration: 4000 });
      } else { this.snack.open('Somthing went wrong', 'OK', { duration: 4000 }); }
    });
  }

  // =========================================== Get provider List =========================================================
  getProvider() {
    this.loader.open()
    this.apiservice.getUsers(this.provider, this.pageNo, this.pageSize).subscribe((res: any) => {
      console.log(res)
      this.total = res.total;
      this.temp = res;
      this.pageLength = this.temp.message;
      if (this.temp.items) {
        this.users = this.temp.items;
        this.dataSource = new MatTableDataSource(this.users);
        this.isScrol = true;
        this.selectedValue = this.defaultFilter;
      }
    })
    this.loader.close()
  }


  // =========================================== Get provider Count =========================================================
  getProgramCount() {
    this.loader.open()
    this.apiservice.getActiveProgramCount(this.pageNo, this.pageSize).subscribe((res: any) => {
      this.total = res.total;
      this.temp = res;
      this.pageLength = this.temp.message;
      if (this.temp.items) {
        this.users = this.temp.items;
        this.dataSource = new MatTableDataSource(this.users);
        this.isScrol = true;
      }
    })
    this.loader.close()
  }

  // =========================================== Pagination =========================================================
  pageChanged(event) {
    event.pageSize
    if (event.pageSize > this.pageSize || event.pageSize < this.pageSize) {
      this.pageNo = event.pageIndex + 1;
      this.pageSize = event.pageSize;
      this.getSetTabs();
    }
    else if (event.previousPageIndex > event.pageIndex) {
      this.pageNo = this.pageNo !== 0 ? this.pageNo - 1 : this.pageNo
      this.getSetTabs();
    } else {
      this.pageNo = event.pageIndex + 1;
      this.getSetTabs();
    }
  }

  reset() {
    this.defaultFilter = 'firstName';
    this.selectedValue = '';
    this.getProvider();
  }

  getMontclairProvider() {
    this.apiservice.getMontclairProvider(this.pageNo, this.pageSize).subscribe((res: any) => {
      this.temp = res;
      console.log(this.temp)
      this.pageLength = this.temp.total;
      this.users = this.temp.items;
      this.dataSource = new MatTableDataSource(this.users);
    })
  }

  getProviderByDate() {
    this.loader.open()
    this.searchDate = moment(this.searchDate).format("YYYY-MM-DD");
    this.apiservice.providerByDate(this.searchDate).subscribe((res: any) => {
      this.total = res.data.length;
      this.users = this.news.concat(res.data);
      // this.data = res.items;
      this.dataSource = new MatTableDataSource(this.users);
      this.isScrol = true;
      this.loader.close();
    })
  }

  // add() {
  //   const url = this.router.serializeUrl(
  //     this.router.createUrlTree(['/forms/provider-form'])
  //   );
  //   window.open('#' + url, '_blank');
  // }
  newForm(data?) {
    if (data) {
      let id = data._id ? data._id : data.id;
      const url = this.router.serializeUrl(
        this.router.createUrlTree(['/forms/provider-form', id])
      );
      window.open('#' + url, '_blank');
    } else {
      const url = this.router.serializeUrl(
        this.router.createUrlTree(['/forms/provider-form', 'add'])
      );
      window.open('#' + url, '_blank');
    }
  }
  // edit(data) {
  //   this.dataservice.setOption(data);
  //   let id = data._id ? data._id : data.id;
  //   const url = this.router.serializeUrl(
  //     this.router.createUrlTree(['forms/provider-form-update', id])
  //   );
  //   window.open('#' + url, '_blank');
  // }

  deleteProvider(user) {
    this.confirmService.confirm({ message: `Delete ${user.firstName}?` }).subscribe(res => {
      if (res) {
        this.isLoading = true;
        this.loader.open()
        if (user._id) {
          user.id = user._id
        }
        this.apiservice.deleteUser(user.id).subscribe(res => {
          this.loader.close()
          var response: any = res;
          if (response.isSuccess) {
            this.getProvider()
            this.snack.open('User Deleted', 'OK', { duration: 4000 });
          } else {
            let msg = "Something Went Wrong!";
            this.snack.open(msg, 'OK', { duration: 4000 });
          }
        })
      }
    })
  }

  manage(data) {
    if (data) {
      let id = data._id ? data._id : data.id;
      const url = this.router.serializeUrl(
        this.router.createUrlTree(['tables/program', id])
      );
      window.open('#' + url, '_blank');
    }
    // this.router.navigate(['tables/program', data.id]);
  }

  openPopUp(data) {
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

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    // this.selection.select(this.dataSource.data);
  }

  // checkboxLabel(row?: UserData): string {
  //   if (!row) {
  //     return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
  //   }
  //   return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
  //     row.id + 1
  //   }`;
  // }

  selectedFilter(value: any) {
    this.selectedValue = value;
    if (this.selectedValue == 'montclair') {
      this.users = [];
      this.dataSource = new MatTableDataSource(this.users);
      this.getMontclairProvider();
    }
  }

  applyFilter($event: any) {
    let filterValue = $event.target.value;
    if (filterValue) {
      this.apiservice.searchProviderByName(filterValue).subscribe((res: any) => {
        this.data = res;
        this.dataSource = new MatTableDataSource(this.data);
      })
    }
    else {
      this.reset()
    }
  }

  trueFalseFreeTrial(e, row) {
    this.apiservice.trueFalseFreeTrialProvider(row.id, e.checked).subscribe((res: any) => {
    })
  }
  copyLink(username) {
    if (username) {
      navigator.clipboard.writeText(`${this.baseUrl}p/${username}`).then().catch(e => console.error(e));
    } else {
      navigator.clipboard.writeText(`${this.baseUrl}`).then().catch(e => console.error(e));
    }
  }

  // =========================================== change program tabs =========================================================
  activeProgramsTab(tab) {
    const activetab = tab;
    if (activetab !== '') {
      this.router.navigate(
        [],
        { relativeTo: this.activatedRoute, queryParams: { activity: activetab } }
      );
    } else {
      this.router.navigate(
        [],
        { relativeTo: this.activatedRoute, queryParams: {} }
      );
    }
  }

  // =========================================== programs type Tab =========================================================
  getSetTabs() {
    let displayedColumns: any[] = [
      'select',
      'firstName',
      'email',
      'addressLine1',
      'phoneNumber',
      'isActivated',
      'allPrograms',
      'activePrograms',
      'expiredPrograms',
      'freeTrial',
      'updatedOn',
      'star',
    ];
    this.activatedRoute.queryParams
      .subscribe((params: any) => {
        this.activeTab = params.activity;
        switch (this.activeTab) {
          case 'montclair':
            this.displayedColumns = displayedColumns;
            this.getMontclairProvider();
            break;
          case 'pcount':
            let column = [
              'providerName',
              'programCount',
              'star']
            this.displayedColumns = column;
            this.getProgramCount();

            break;
          default:
            this.activeTab = ''
            this.displayedColumns = displayedColumns;
            this.getProvider();
        }
      })
  }
}


