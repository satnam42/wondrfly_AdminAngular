import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar, MatDialog, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { RolespopupComponent } from 'app/rolespopup/rolespopup.component';
import { Userr } from 'app/shared/models/user.model';
import { ApiService } from 'app/shared/services/api.service.service';
import { AppConfirmService } from 'app/shared/services/app-confirm/app-confirm.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { DataService } from 'app/shared/services/dataservice.service';
import { EditFormComponent } from 'app/views/components/edit-form/edit-form.component';
import { Observable } from 'rxjs';
import { finalize, share } from 'rxjs/operators';
import { DataPopupComponent } from '../data-popup/data-popup.component';
@Component({
  selector: 'app-all-user',
  templateUrl: './all-user.component.html',
  styleUrls: ['./all-user.component.scss']
})
export class AllUserComponent implements OnInit {
  user: Userr[];
  displayedColumns: any[] = [
    'firstName',
    'role',
    'email',
    'addressLine1',
    'phoneNumber',
    'updatedOn',
    'isActivated',
    'star',
  ];
  filterColumns: string[] = [
    'id',
    'firstName',
    'email',
    'addressLine1',
    'phoneNumber',
    'country',
    'progress',
    'zipCode',
    'role',
    'updatedOn',
    'state',
    'isActivated',

  ];
  dataSource = new MatTableDataSource<Userr>();
  selection = new SelectionModel<Userr>(true, []);

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) set content(sort: MatSort) {
    this.dataSource.sort = sort;
  }
  selectedValue: any;

  isLoading: boolean;
  rows: any = [];
  temp: any = [];
  provider = "provider";
  isShow = true;
  isScrol = true;
  showReset = false;
  pageNo = 1;
  pageSize = 20;
  users: any = [];
  public news: Array<any> = [];

  private currentPage = 1;

  private request$!: any;

  data: any;
  total: any;

  constructor(
    private apiservice: ApiService,
    private http: HttpClient,
    private router: Router,
    private confirmService: AppConfirmService,
    private loader: AppLoaderService,
    private snack: MatSnackBar,
    private dataservice: DataService,
    public dialog: MatDialog,
    // private confirmationDialogService: ConfirmationDialogService,
    // private spinner: NgxSpinnerService
  ) {
    this.getUser()
  }

  ngOnInit() {

  }

  getUser() {
    this.loader.open()
    this.apiservice.getUsers('all', this.pageNo, this.pageSize).subscribe((res: any) => {
      this.loader.close()
      this.total = res.total;
      this.user = res.items;
      this.dataSource = new MatTableDataSource(this.user);
    })
  }

  // =========================================== Pagination =========================================================
  pageChanged(event) {
    event.pageSize
    if (event.pageSize > this.pageSize || event.pageSize < this.pageSize) {
      this.pageNo = event.pageIndex + 1;
      this.pageSize = event.pageSize;
      this.getUser();
    }
    else if (event.previousPageIndex > event.pageIndex) {
      this.pageNo = this.pageNo !== 0 ? this.pageNo - 1 : this.pageNo
      this.getUser();
    } else {
      this.pageNo = event.pageIndex + 1;
      this.getUser();
    }
  }

  reset() {
    this.getUser()
  }

  activateDeactivate(data, user) {
    this.apiservice.userActiveInActive(user.id, data.checked).subscribe((res: any) => {
      if (res.isSuccess) {
        this.snack.open('User status changed', 'OK', { duration: 4000 });
        // this.snack.open('Program published', 'OK', { duration: 4000 });
        // this.rows[indx].isPublished = booleanValue
      } else { this.snack.open('Somthing went wrong', 'OK', { duration: 4000 }); }
    });
  }

  add() {
    // this.router.navigate(['form']);
    this.router.navigate(['/forms/provider-form']);
  }
  edit(data) {
    this.dataservice.setOption(data);
    if (data._id) {
      data.id = data._id
    } if (data.role == "parent") {
      this.router.navigate(['forms/parent-update']);
    } else {
      this.router.navigate(['forms/provider-update', data.id]);
    }
  }
  removeSelectedRows() {
    // this.confirmationDialogService.confirm({
    //     title: 'Please confirm..',
    //     message: 'Do you really want to Delete ... ?',
    //   }).subscribe((result: any) => {
    //     if (result) {
    //       this.selection.selected.forEach((item) => {
    //         let index: number = this.data.findIndex((d: any) => d === item);
    //         this.data.splice(index, 1);
    //         this.dataSource = new MatTableDataSource<UserData>(this.data);
    //       });
    //       this.selection = new SelectionModel<UserData>(true, []);
    //     }
    //   });
  }

  openDialog(data: any, title: any): void {
    const dialogRef = this.dialog.open(EditFormComponent, {
      // disableClose : true,
      width: '650px',
      data: { data: data, title: title, id: data.id },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
      }
    });
  }

  openPopUp(data) {
    const dialogRef = this.dialog.open(RolespopupComponent, {
      width: '40%',
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



  getList() {
    // this.spinner.show();
    this.getNews(this.currentPage)
      .pipe(finalize(() => this.onFinalize()))
      .subscribe((news) => {
        this.currentPage++;
        this.news = this.news.concat(news.items);
        // this.spinner.hide();
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

    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: Userr): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1
      }`;
  }

  selectedFilter(value: any) {
    this.selectedValue = value;
  }

  applyFilter($event: any) {
    let filterValue = $event.target.value;
    // console.log( 'filterValue',filterValue)
    // const tableFilters = [];
    // tableFilters.push({
    //   id: this.selectedValue,
    //   value: filterValue,
    // });
    // console.log( 'tableFilters',tableFilters)
    // this.dataSource.filter = JSON.stringify(tableFilters);
    // console.log(this.dataSource)
    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
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

  onScrollDown(): void {
    this.getNews(this.currentPage)
      .pipe(finalize(() => this.onFinalize()))
      .subscribe((news: any) => {
        this.currentPage++;
        this.news = this.news.concat(news.items);
      });
  }

  getNews(page: number = 1): Observable<any> {
    if (this.request$) {
      return this.request$;
    } else {
      this.request$ = this.http.get(``).pipe(share());
      return this.request$;
    }
  }

  onFinalize(): void {
    this.request$ = null;
  }


  deleteUser(user) {
    this.confirmService.confirm({ message: `Delete ${user.firstName}?` }).subscribe(res => {
      if (res) {
        this.isLoading = true;
        this.loader.open()
        this.apiservice.deleteUser(user.id).subscribe(res => {
          this.loader.close()
          var response: any = res;
          if (response.isSuccess) {
            this.getUser()
            this.snack.open('User Deleted', 'OK', { duration: 4000 });
          } else {
            let msg = "Something Went Wrong!";
            this.snack.open(msg, 'OK', { duration: 4000 });
          }
        })
      }
    })
  }





}