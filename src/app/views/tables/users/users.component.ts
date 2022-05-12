import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiService } from 'app/shared/services/api.service.service';
import { AppConfirmService } from 'app/shared/services/app-confirm/app-confirm.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { DataService } from 'app/shared/services/dataservice.service';
import { EditFormComponent } from 'app/views/components/edit-form/edit-form.component';
import * as moment from 'moment';
// import { ConfirmationDialogService } from 'app/shared/services/confirmation-dialog.service';
// import { EditFormComponent } from 'app/views/components/edit-form/edit-form.component';
import { Observable } from 'rxjs';
import { finalize, share } from 'rxjs/operators';
import { DataPopupComponent } from '../data-popup/data-popup.component';



export interface UserData {
  id: string;
  firstName: string;
  isActivated: boolean;
  isFreeTrial: boolean;
  phoneNumber: string;
  email: string;
  addressLine1: string;
  country:string;
  progress:string;
  updatedOn:string;
  state:string;
}


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  displayedColumns: any[] = [
    'id',
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
  defaultFilter: string ='firstName';
  dataSource: MatTableDataSource<UserData>;
  selection = new SelectionModel<UserData>(true, []);

  @ViewChild(MatPaginator,{static:false}) paginator!: MatPaginator;
  @ViewChild(MatSort,{static:false}) sort!: MatSort;
  selectedValue: any;
  byDate= new FormControl();
  searchDate:any;
  isLoading: boolean;
  rows: any = [];
  temp: any = [];
  provider = "provider";
  isShow = true;
  isScrol = true;
  showReset = false;
  pageNo = 1;
  pageSize = 20;

  users: any=[];
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
    // this.users = Array.from({ length: 100 }, (_, k) => createNewUser(k + 1));
    // this.data = Object.assign(this.users);
    // this.dataSource = new MatTableDataSource(this.users);
    this.getProvider()
   
  }

  activateDeactivate(data,user) {
    this.apiservice.userActiveInActive(user.id,data.checked).subscribe((res:any) => {
      if(res.isSuccess){
       this.snack.open('User status changed', 'OK', { duration: 4000 });
        // this.snack.open('Program published', 'OK', { duration: 4000 });
        // this.rows[indx].isPublished = booleanValue
      }else{this.snack.open('Somthing went wrong', 'OK', { duration: 4000 });}
    });
  }
  
  setOrUnsetFreeTrial(data,user) {

  }
  ngOnInit() {
    // this.spinner.show();
    this.getList();
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

  getProvider(){
    this.loader.open()
    this.apiservice.getUsers(this.provider, this.pageNo, 130).subscribe((res:any) => {
      this.loader.close()
      this.total = res.total;
      this.temp=res;
      if (this.temp.items) {
        this.users = this.rows.concat(this.temp.items);
        this.dataSource = new MatTableDataSource(this.users);
        this.isScrol = true;
        this.selectedValue=this.defaultFilter;
      }
    })
  }
  reset() {
    this.defaultFilter='firstName';
    this.selectedValue='';
    this.getProvider();
  }

  getMontclairProvider(){
    this.loader.open()
    this.apiservice.getMontclairProvider(this.pageNo, 120).subscribe((res:any) => {
      this.total = res.total
      this.users = this.news.concat(res.items);
      this.loader.close()
      // this.data = res.items;
      this.dataSource = new MatTableDataSource(this.users);
      this.isScrol=true;
    })
  }

  getProviderByDate(){
    this.loader.open()
    this.searchDate =  moment(this.searchDate).format("YYYY-MM-DD");
    this.apiservice.providerByDate(this.searchDate).subscribe((res:any) => {
      this.total = res.data.length;
      this.users = this.news.concat(res.data);
      // this.data = res.items;
      this.dataSource = new MatTableDataSource(this.users);
      this.isScrol=true;
      this.loader.close();
    })
  }



  add() {
    // this.router.navigate(['form']);
    this.router.navigate(['/forms/new-form']);
  }
  edit(data) {
    this.dataservice.setOption(data);
    if(data._id){
      data.id = data._id
    }
    this.router.navigate(['forms/new-form', data.id]);
  }


  manage(data){
    if(data._id){
      data.id = data._id
    }
    this.router.navigate(['tables/program',data.id]);
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

  checkboxLabel(row?: UserData): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.id + 1
    }`;
  }


  selectedFilter(value: any) {
    this.selectedValue = value;
    if(this.selectedValue=='montclair'){
      this.users=[];
      this.dataSource = new MatTableDataSource(this.users);
      this.getMontclairProvider();
    }
  }

  applyFilter($event: any) {
    let filterValue = $event.target.value;
    if(filterValue){
      this.apiservice.searchProviderByName(filterValue).subscribe((res:any) => {
        this.data = res;
        this.dataSource = new MatTableDataSource(this.data);
      })
    }
    else{
      this.reset()
    }

  }

  onScrollDown() {
    // if (this.isScrol) {
    //   this.isScrol = false;
    //   this.loadMore();
    // }
  }


  loadMore() {
    // this.pageSize += 20;
    this.pageNo += 1;
    if(this.selectedValue=='montclair'){
      this.getMontclairProvider();
    }else{this.getProvider();}
  }
    // this.getNews(this.currentPage)
    //   .pipe(finalize(() => this.onFinalize()))
    //   .subscribe((news: any) => {
    //     this.currentPage++;
    //     this.news = this.news.concat(news.items);
    //   });

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


  deleteProvider(user) {
    this.confirmService.confirm({ message: `Delete ${user.firstName}?` }).subscribe(res => {
      if (res) {
        this.isLoading = true;
        this.loader.open()
        if(user._id){
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



  trueFalseFreeTrial(e,row) {
    this.apiservice.trueFalseFreeTrialProvider(row.id,e.checked).subscribe((res:any)=>{
     })
   }

}


