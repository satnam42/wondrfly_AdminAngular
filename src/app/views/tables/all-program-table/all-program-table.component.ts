import { Component, OnInit, ViewChild } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from 'app/shared/services/dataservice.service';
import { ApiService } from 'app/shared/services/api.service.service';
import { FileUploader } from 'ng2-file-upload';
import { AppConfirmService } from 'app/shared/services/app-confirm/app-confirm.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatDialogRef, MatDialog, MatTableDataSource, MatPaginator, PageEvent, MatSort, Sort } from '@angular/material';
import { SearchProviderPopupComponent } from './search-provider-popup/search-provider-popup.component';
import { CsvDataService } from 'app/shared/services/excel.service';
import { DataPopupComponent } from '../data-popup/data-popup.component';
import { environment } from 'environments/environment';
import { PopupFormComponent } from 'app/shared/components/popup-form/popup-form.component';
import * as moment from 'moment';
import { DaterangepickerDirective } from 'ngx-daterangepicker-material';
import { FormControl } from '@angular/forms';
import { Program } from 'app/shared/models/program.model';
import { DateDifferencePipe } from 'app/shared/pipes/date-difference.pipe';
@Component({
  selector: 'app-all-program-table',
  templateUrl: './all-program-table.component.html',
  styleUrls: ['./all-program-table.component.scss']
})
export class AllProgramTableComponent implements OnInit {
  defaultFilter: string = 'name'
  isLoading: boolean;
  displayedColumns: string[] = [
    'name',
    'programOwner',
    'addresses',
    'pricePerParticipant',
    'isPublished',
    'type',
    'daysLeft',
    'isFreeTrial',
    'star',
  ];
  rows: Program[];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  isEmpty: any;
  @ViewChild(MatSort, { static: false }) set content(sort: MatSort) {
    this.dataSource.sort = sort;
  }
  temp: any;
  ColumnMode = ColumnMode;
  submitted: any;
  @ViewChild(DaterangepickerDirective, { static: true }) picker: DaterangepickerDirective;
  selected: { startDate: moment.Moment, endDate: moment.Moment };
  searchText: '';
  isShow = true;
  searchControl = new FormControl();
  loaderPostion = 'center-center';
  loaderType = 'ball-spin-clockwise';
  pageNo: number = 1;
  pageSize = 20;
  keyword = "";
  isScrol = true;
  public uploader: FileUploader = new FileUploader({ url: 'upload_url' });
  public hasBaseDropZoneOver: boolean = false;
  message: string = 'Program Deleted Successfully!';
  action: boolean = true;
  setAutoHide: boolean = true;
  autoHide: number = 4000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  fileData: File = null;
  formData = new FormData();
  detailPageUrl: string;
  baseURL = environment.baseURL
  expiredProgram: any;
  filterColumns: string[] = [
    'name',
    'address',
    'type',
    'montclair',
    'byDate'
  ];
  selectedValue: any;
  allExpired: any;
  montTemp: any;
  stratDate: string;
  endDate: string;
  filteredData: any;
  activeTab: any;
  totalProgramsCount: any;
  publishedUnpublishedList: any = [];
  pageLength: any;
  constructor(
    public route: Router,
    private dataservice: DataService,
    private apiservice: ApiService,
    private snack: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private confirmService: AppConfirmService,
    private loader: AppLoaderService,
    private dialog: MatDialog,
    private csvService: CsvDataService,
    private dateDiff: DateDifferencePipe
  ) {
    this.getSetTabs();
    let config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.setAutoHide ? this.autoHide : 0;
  }

  ngOnInit() {
    this.apiservice.getProgram(this.pageNo, this.pageSize).subscribe((res: any) => {
      this.totalProgramsCount = res.message;
    })
    this.searchControl.valueChanges.subscribe((value) => {
      this.updateFilter(value);
    });
  }
  // view data 
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
  // view data 
  openPopUps(data) {
    let dialogRef: MatDialogRef<any> = this.dialog.open(SearchProviderPopupComponent, {
      width: '30%',
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

  // view data 

  copyText(val: string) {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.snack.open('Copied', 'OK', { duration: 500 });
  }

  form(data, i) {
    let dialogRef: MatDialogRef<any> = this.dialog.open(PopupFormComponent, {
      width: '60%',
      disableClose: true,
      data: data
    })
    dialogRef.afterClosed()
      .subscribe(res => {
        if (!res) {
          // If user press cancel
          this.rows[i].isExpired = true
          this.allExpiredProgram()
        }
      });
  }

  edit(data) {
    this.dataservice.setOption(data);
    const url = this.route.serializeUrl(
      this.route.createUrlTree(['forms/edit-program/', data._id])
    );
    window.open('#' + url, '_blank');
  }

  newForm(data) {
    this.isEmpty = Object.keys(data).length === 0;
    if (this.isEmpty) {
      const url = this.route.serializeUrl(
        this.route.createUrlTree(['forms/program-form/', 'id'])
      );
      window.open('#' + url, '_blank');
    }
    else {
      let id = data.id ? data.id : data._id;
      const url = this.route.serializeUrl(
        this.route.createUrlTree(['forms/program-form/', id])
      );
      window.open('#' + url, '_blank');
    }
  }

  manage(data) {
    let id = data.user ? data.user : data.userId;
    const url = this.route.serializeUrl(
      this.route.createUrlTree(['tables/program', id])
    );
    window.open('#' + url, '_blank');
  }

  createDuplicate(data) {
    this.dataservice.setOption(data);
    this.apiservice.createDuplicateProgram(data._id).subscribe((res: any) => {
      if (res.isSuccess) {
        this.getProgram()
      }
    });
  }

  back() {
    this.route.navigate(['tables/provider']);
  }

  showHideButton() {
    this.isShow = !this.isShow;
  }

  // =========================================== All programs =========================================================
  getProgram() {
    this.loader.open();
    this.apiservice.getProgram(this.pageNo, this.pageSize).subscribe(res => {
      this.loader.close();
      this.temp = res;
      this.pageLength = +this.temp.message;
      if (this.temp.isSuccess) {
        this.temp.items.map(e => e.daysLeft = this.dateDiff.transform(e.date.to));
        this.rows = this.temp.items;
        this.dataSource = new MatTableDataSource(this.rows);
      }
    });
    this.loader.close();
  }
  // =========================================== montclair programs =========================================================
  getMontclairProgram() {
    this.loader.open();
    this.apiservice.getMontclairProgram(this.pageNo, this.pageSize).subscribe(res => {
      this.temp = res;
      console.log(res)
      if (this.temp.isSuccess) {
        this.temp.items.map(e => e.daysLeft = this.dateDiff.transform(e.date.to));
        console.log(this.temp.items)
        this.pageLength = +this.temp.message;
        this.rows = this.temp.items;
        this.dataSource = new MatTableDataSource(this.rows);
      }
    });
    this.loader.close();
  }
  // =========================================== online programs =========================================================
  getOnlinePrograms() {
    let data = []
    let filter = `inpersonOrVirtual=online&pageNo=${this.pageNo}&pageSize=${this.pageSize}`;
    this.loader.open();
    this.apiservice.programMultiFilter(filter).subscribe((res: any) => {
      this.loader.close();
      if (res) {
        res.map(x => x.programs.map(z => {
          data.push(z)
          this.pageLength = data.length;
          this.rows = data;
          this.rows.map(e => e.daysLeft = this.dateDiff.transform(e.date.to));
          this.dataSource = new MatTableDataSource(this.rows);
        }))
      }
    });
    this.loader.close();
  }
  // =========================================== published/unpublished programs =========================================================
  getPublishedUnpublished(type) {
    this.loader.open();
    this.apiservice.getPublishedProgram(this.pageNo, this.pageSize, type).subscribe((res: any) => {
      this.loader.close();
      this.publishedUnpublishedList = res;
      this.pageLength = +this.publishedUnpublishedList.total;
      this.publishedUnpublishedList.items.map(e => e.daysLeft = this.dateDiff.transform(e.date.to));
      this.rows = this.publishedUnpublishedList.items;
      this.dataSource = new MatTableDataSource(this.rows);
    })
    this.loader.close();
  }
  // =========================================== expiring soon programs =========================================================
  getExpiringProgram() {
    this.loader.open();
    this.apiservice.getExpiringProgram('', '',).subscribe((res: any) => {
      this.loader.close();
      this.expiredProgram = res;
      this.expiredProgram.items.map(e => e.daysLeft = this.dateDiff.transform(e.date.to));
      this.rows = this.expiredProgram.items;
      this.dataSource = new MatTableDataSource(this.rows);
    });
    this.loader.close();
  }
  // =========================================== expired programs =========================================================
  allExpiredProgram() {
    this.loader.open();
    this.apiservice.allExpiredProgram().subscribe((res: any) => {
      this.loader.close();
      this.allExpired = res;
      this.allExpired.items.map(e => e.daysLeft = this.dateDiff.transform(e.date.to));
      this.rows = this.allExpired.items;
      this.dataSource = new MatTableDataSource(this.rows);
    });
    this.loader.close();
  }
  // =========================================== delete program =========================================================
  deleteProgram(data, indx) {
    this.confirmService.confirm({ message: `Delete ${data.name}?` }).subscribe(res => {
      if (res) {
        this.apiservice.deleteProgram(data._id).subscribe(res => {
          var response: any = res;
          if (response.isSuccess === true) {
            this.getProgram();
            this.snack.open(this.message, 'OK', { duration: 4000 });
          } else {
            let msg = "Something Went Wrong!";
            this.snack.open(msg, 'OK', { duration: 4000 });
          }
        })
      }
    })
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  choosedDate(e) {
    let response
    if (e.startDate == null || e.endDate == null) {
      return;
    }
    {
      this.stratDate = moment(e.startDate._d).format('YYYY-MM-DD');
      this.endDate = moment(e.endDate._d).format('YYYY-MM-DD')
      this.loader.open();
      this.apiservice.programFilterByDate('from', this.stratDate, this.endDate).subscribe((res: any) => {
        if (res.isSuccess) {
          response = res.data;
          this.rows = response
          this.filteredData = response;
          this.isScrol = false;
          this.loader.close();
        }
      })
    }
  }

  selectedFilter(value: any) {
    this.selectedValue = value;
    if (this.selectedValue == 'montclair') {
      this.rows = [];
      this.getMontclairProgram();
    } else if (this.selectedValue == 'byDate' && this.selected) {
    }
  }

  reset() {
    this.rows = [];
    this.keyword = '';
    this.defaultFilter = 'name';
    this.selectedValue = '';
    this.stratDate = null;
    this.endDate = null;
    // this.picker.clear();
    this.filteredData = [];
    this.getProgram();
  }

  updateFilter(key) {
    var response: any;
    if (key) {
      if (!this.selectedValue) {
        this.selectedValue = this.defaultFilter;
      }
      this.loader.open();
      this.apiservice.searchProgramFilter(this.selectedValue, key).subscribe((res: any) => {
        this.loader.close()
        if (res.isSuccess) {
          response = res.data;
          response.map(e => e.daysLeft = this.dateDiff.transform(e.date.to));
          this.dataSource = new MatTableDataSource(response);
          this.filteredData = response;
        }
      });
    }
    if (!key) {
      this.rows = [];
      this.getSetTabs();
    }
    this.loader.close()
  }
  download() {
    this.csvService.downloadFile(this.rows, 'Total programs');
  }
  onFileChange(ev) {
    this.fileData = ev.target.files[0];
    this.formData.append('csv', this.fileData);
    this.apiservice.programCSVupload(this.formData).subscribe(res => {
      this.getProgram();
    });
  }
  routeToDetailPage(data) {
    var programName = data.name;
    programName = programName.toLowerCase();
    this.detailPageUrl = `${this.baseURL}/program/activity-name/${data._id}/filter`
  }
  publishUnpublishProgram(data, program) {
    var model: any = {
      programId: program._id,
      isPublished: data.checked
    }
    this.apiservice.PublishedProgram(model).subscribe((res: any) => {
      if (res.isSuccess) {
        this.snack.open('Activity Status changed', 'OK', { duration: 4000 });
      } else { this.snack.open('Somthing went wrong', 'OK', { duration: 4000 }); }
    });
  }
  trueFalseFreeTrial(e, indx) {
    this.apiservice.trueFalseFreeTrialProgram(this.rows[indx]._id, e.checked).subscribe((res: any) => {
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
  // =========================================== programs type Tab =========================================================
  getSetTabs() {
    this.activatedRoute.queryParams
      .subscribe((params: any) => {
        this.activeTab = params.activity;
        switch (this.activeTab) {
          case 'online':
            this.getOnlinePrograms();
            break;
          case 'published':
            this.getPublishedUnpublished('published');
            break;
          case 'unpublished':
            this.getPublishedUnpublished('unpublished');
            break;
          case 'expiring':
            this.getExpiringProgram();
            break;
          case 'expired':
            this.allExpiredProgram();
            break;
          case 'montclair':
            this.getMontclairProgram();
            break;
          default:
            this.activeTab = ''
            this.getProgram();
        }
      })
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
}

