import { Component, OnInit, ViewChild } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from 'app/shared/services/dataservice.service';
import { ApiService } from 'app/shared/services/api.service.service';
import { FileUploader } from 'ng2-file-upload';
import { Userr } from 'app/shared/models/user.model';
import { AppConfirmService } from 'app/shared/services/app-confirm/app-confirm.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatDialogRef, MatDialog, MatTableDataSource, MatPaginator, MatSort, PageEvent } from '@angular/material';
import { ProgramDataPopupComponent } from './program-data-popup/program-data-popup.component';
import { Program } from 'app/shared/models/program.model';
import { FormControl } from '@angular/forms';
import { DateDifferencePipe } from 'app/shared/pipes/date-difference.pipe';
@Component({
  selector: 'app-program-table',
  templateUrl: './program-table.component.html',
  styleUrls: ['./program-table.component.scss']
})
export class ProgramTableComponent implements OnInit {
  isLoading: boolean;
  rows: Program[];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  searchControl = new FormControl();
  activeTab: any;
  @ViewChild(MatSort, { static: false }) set content(sort: MatSort) {
    this.dataSource.sort = sort;
  }
  displayedColumns: string[] = [
    'name',
    'id',
    'createdOn',
    'isPublished',
    'expiredIn',
    'star',
    'select'
  ];
  pageNo: number = 1;
  pageSize: number = 20;
  pageLength: any;
  temp: any = [];
  ColumnMode = ColumnMode;
  user = new Userr;
  pageLimit = 100;
  submitted: any;
  isShow = true;
  public uploader: FileUploader = new FileUploader({ url: 'upload_url' });
  public hasBaseDropZoneOver: boolean = false;
  selectedActivityIds = {
    programIds: [
    ],
    isPublished: false
  }
  message: string = 'Program Deleted Successfully!';
  // actionButtonLabel: string = 'Retry';
  action: boolean = true;
  setAutoHide: boolean = true;
  autoHide: number = 4000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  constructor(
    public route: Router,
    private dataservice: DataService,
    private apiservice: ApiService,
    private snack: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private confirmService: AppConfirmService,
    private loader: AppLoaderService,
    private dialog: MatDialog,
    private dateDiff: DateDifferencePipe
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.user._id = params['id'];
      this.getSetTabs();
    });
    this.getUserById(this.user._id)
  }

  getUserById(id) {
    this.apiservice.getUserById(id).subscribe((res: any) => {
      this.user = res
      this.user._id = this.user.id
    })
  }
  openPopUp(data) {
    let dialogRef: MatDialogRef<any> = this.dialog.open(ProgramDataPopupComponent, {
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

  edit(data) {
    this.dataservice.setOption(data);
    this.route.navigate(['forms/edit-program', data._id]);
  }
  back() {
    history.back();
  }

  showHideButton() {
    this.isShow = !this.isShow;
  }

  add() {
    // this.route.navigate(['forms/wizard', this.user._id])
    const url = this.route.serializeUrl(
      this.route.createUrlTree(['forms/wizard', this.user._id])
    );
    window.open('#' + url, '_blank');
  }

  getProgram() {
    this.loader.open();
    this.apiservice.getAllProgramByUser(this.user._id, this.pageNo, this.pageSize).subscribe((res: any) => {
      this.temp = res;
      this.pageLength = this.temp.message;
      console.log(res);
      this.temp.items.map(e => e.daysLeft = this.dateDiff.transform(e.date.to));
      this.rows = this.temp.items;
      this.dataSource = new MatTableDataSource(this.rows);
    });
    this.loader.close();
  }

  getExpiredProgram() {
    this.loader.open();
    this.apiservice.getExpiredProgramByUser(this.user._id, this.pageNo, this.pageSize).subscribe((res: any) => {
      this.temp = res;
      this.pageLength = this.temp.message;
      this.temp.items.map(e => e.daysLeft = this.dateDiff.transform(e.date.to));
      this.rows = this.temp.items;
      this.dataSource = new MatTableDataSource(this.rows);
    });
    this.loader.close();
  }

  publishUnpublishMultiplePrograms() {
    if (this.selectedActivityIds.programIds.length < 20) {
      this.apiservice.publishUnpublishMultiplePrograms(this.selectedActivityIds).subscribe((res: any) => {
        if (res.isSuccess) {
          this.snack.open(res.data, 'OK', { duration: 5000 });
          this.selectedActivityIds.programIds = []
          this.getProgram();
        }
      });
    } else {
      this.snack.open('Please select less than 20 Activities!', 'OK', { duration: 5000 });
    }
  }
  publishUnpublishProgram(data, program) {
    var model: any = {
      programId: program._id,
      isPublished: data.checked
    }
    this.apiservice.PublishedProgram(model).subscribe((res: any) => {
      console.log(res)
      if (res.isSuccess) {
        this.snack.open('Program status changed', 'OK', { duration: 4000 });
      } else { this.snack.open('Somthing went wrong', 'OK', { duration: 4000 }); }
    });
  }
  selectPrograms(e, row) {
    let index = this.selectedActivityIds.programIds.indexOf(row._id)
    if (index === -1) {
      this.selectedActivityIds.programIds.push(row._id)
    } else {
      this.selectedActivityIds.programIds.splice(index, 1)
    }
  }

  deleteProgram(data, indx) {
    this.confirmService.confirm({ message: `Delete ${data.name}?` }).subscribe(res => {
      if (res) {
        this.loader.open();
        this.isLoading = true;
        this.apiservice.deleteProgram(data._id).subscribe(res => {
          var response: any = res;
          if (response.isSuccess === true) {
            this.rows.splice(indx, 1);
            this.snack.open(this.message, 'OK', { duration: 4000 });
          } else {
            let msg = "Something Went Wrong!";
            this.snack.open(msg, 'OK', { duration: 4000 });
          }
          this.loader.close();
        })
      }
    })
  }

  // =========================================== Pagination =========================================================
  pageChanged(event: PageEvent) {
    window.scroll(0, 0);
    if (event.previousPageIndex > event.pageIndex) {
      this.pageSize = event.pageSize;
      this.pageNo = this.pageNo !== 0 ? this.pageNo - 1 : this.pageNo
      this.getSetTabs();
    } else {
      this.pageSize = event.pageSize;
      this.pageNo = event.pageIndex + 1;
      this.getSetTabs();
    }
  }

  ngOnInit() {
    this.searchControl.valueChanges.subscribe((value) => {
      this.searchFilter(value);
    });
  }

  searchFilter(key) {
    var response: any;
    if (key) {
      this.loader.open();
      this.apiservice.searchProgramFilter('name', key).subscribe((res: any) => {
        this.loader.close()
        if (res.isSuccess) {
          response = res.data;
          this.rows = response.filter(item => item.user === this.user._id)
          this.dataSource = new MatTableDataSource(this.rows);
        }
      });
    }
    if (!key) {
      this.getProgram();
    }
    this.loader.close()
  }

  // =========================================== change program tabs =========================================================
  activeProgramsTab(tab) {
    const activetab = tab;
    if (activetab !== '') {
      this.route.navigate(
        [],
        { relativeTo: this.activatedRoute, queryParams: { activity: activetab } }
      );
    } else {
      this.route.navigate(
        [],
        { relativeTo: this.activatedRoute, queryParams: {} }
      );
    }
  }

  // =========================================== programs type Tab =========================================================
  getSetTabs() {
    this.activatedRoute.queryParams
      .subscribe((params: any) => {
        this.activeTab = params.activity;
        console.log(this.activeTab)
        switch (this.activeTab) {
          case 'expired':
            this.getExpiredProgram()
            break;
          default:
            this.activeTab = ''
            this.getProgram();
        }
      })
  }


}
