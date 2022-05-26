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
  @ViewChild(DaterangepickerDirective, {static: true}) picker: DaterangepickerDirective;
  selected: {startDate: moment.Moment, endDate: moment.Moment};
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
  users: any = new Userr
  public uploader: FileUploader = new FileUploader({ url: 'upload_url' });
  public hasBaseDropZoneOver: boolean = false;
  message: string = 'Program Deleted Successfully!';
  action: boolean = true;
  setAutoHide: boolean = true;
  autoHide: number = 4000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  fileData: File = null;
  formData=new FormData();
  detailPageUrl:string;
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
  unpublished: number;
  montTemp: any;
  stratDate: string;
  endDate: string;
  filteredData: any;
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
    private csvService: CsvDataService,
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
  
  ProgramDataPopUp(data) {
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
        this.loader.open();
      });
  }

  form(data,i) {
    let dialogRef: MatDialogRef<any> = this.dialog.open(PopupFormComponent, {
      width: '60%',
      disableClose: true,
      data: data
    })
    dialogRef.afterClosed()
    .subscribe(res => {
      if (!res) {
        // If user press cancel
        this.rows[i].isExpired=true
        console.log('called');
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

  // edit(data) {
  //   this.route.navigate(['forms/keyword-form', data._id]);
  // }

  manage(data){
    this.route.navigate(['tables/program',data.user]);
  }


  createDuplicate(data) {
    this.dataservice.setOption(data);
    this.apiservice.createDuplicateProgram(data._id).subscribe((res:any) => {
if(res.isSuccess){
  this.getProgram()
}   });
  }

  

  showHideButton() {
    this.isShow = !this.isShow;
  }

  setPage(page) {
    this.pageNo = page.offset;
    this.pageSize = page.pageSize;
    if (page.offset == 1) {
      this.pageNo = 2
    }
    this.getProgram();
  }

  getProgram() {
    this.loader.open();
    this.apiservice.getProgram(this.pageNo, this.pageSize).subscribe(res => {
      console.log(res)
      this.temp = res;
      if (this.temp.items) {
        this.rows = this.rows.concat(this.temp.items);
        this.isScrol = true;
      }
      this.loader.close();
    });
    this.loader.close();
  }


  





  editDataPopup(data): void {
    let dialogRef: MatDialogRef<any> = this.dialog.open(KeywordFormComponent, {
      width: '50%',
      disableClose: true,
      data: data
    })
    dialogRef.afterClosed()
      .subscribe(res => {
        if (!res) {
          // If user press cancel
          this.keywordData = this.dataservice.getOption();
          console.log('from keywordData form',this.keywordData)
          return;
        }
      });
  }

  // getUnpublishCount() {
  //   this.apiservice.getPublishedProgram(this.pageNo, this.pageSize,'unpublished').subscribe(res => {
  //   this.UnPublishedPrograms = res;
  //   console.log("getUnpublishCount",res)
  //   })
  // }

  programActiveInActive(program) {
    let programStatus = '';
    if (program.status === 'active') {
      programStatus = 'inactive';
      this.apiservice.programActiveInActive(program._id, programStatus).subscribe(res => {
        this.getProgram();
      });
    }
    else {
      programStatus = 'active';
      this.apiservice.programActiveInActive(program._id, programStatus).subscribe(res => {
        this.getProgram();
      });
    }
  }
  deleteProgram(data,indx) {
    this.confirmService.confirm({ message: `Delete ${data.name}?` }).subscribe(res => {
      if (res) {
        this.loader.open();
        this.isLoading = true;
        this.apiservice.deleteProgram(data._id).subscribe(res => {
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
  ngOnInit() {
    this.searchControl.valueChanges.subscribe((value) =>{
      this.updateFilter(value)
    })
    this.getProgram();
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
      this.apiservice.programFilterByDate('from',this.stratDate,this.endDate).subscribe((res:any)=>{
        console.log(res)
        if(res.isSuccess){
          response = res.data;
          this.rows= response
          this.filteredData = response;
          this.isScrol = false;
          this.loader.close();
        } 
      })
    }
  }

  selectedFilter(value: any) {
    this.selectedValue = value;
    if(this.selectedValue=='montclair'){
      this.rows=[];
    }else if(this.selectedValue=='byDate' && this.selected){
      console.log(this.selected)
      // this.apiservice.programFilterByDate('from',)
    }
  }

  reset(){
    this.rows=[];
    this.keyword='';
    this.defaultFilter='name';
    this.selectedValue='';
    this.stratDate=null;
    this.endDate=null;
    // this.picker.clear();
    this.filteredData=[];
    this.getProgram();
  }

  updateFilter(key) {
    var response: any;
    if (key) {
      if(!this.selectedValue){
      this.selectedValue=this.defaultFilter;
    }
    console.log(this.selectedValue)
    this.loader.open();
    this.apiservice.searchProgramFilter(this.selectedValue, key).subscribe((res: any) => {
      if(res.isSuccess){
        response = res.data;
        this.rows = response;
        this.filteredData = response;
      } 
      this.loader.close()
    });
    }
    if (!key) {
      this.rows=[];
      this.getProgram();
    }
    this.loader.close()
  }
  download() {
    this.csvService.downloadFile(this.rows, 'Total programs');
  }
  onFileChange(ev) {
    this.fileData= ev.target.files[0];
    this.formData.append('csv',this.fileData);
      this.apiservice.programCSVupload(this.formData).subscribe(res => {
        this.getProgram();
        console.log('res',res)
      });
  }
}