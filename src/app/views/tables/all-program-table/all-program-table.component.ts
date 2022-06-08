import { Component, OnInit, ViewChild } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from 'app/shared/services/dataservice.service';
import { ApiService } from 'app/shared/services/api.service.service';
import { FileUploader } from 'ng2-file-upload';
import { Userr } from 'app/shared/models/user.model';
import { AppConfirmService } from 'app/shared/services/app-confirm/app-confirm.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatDialogRef, MatDialog } from '@angular/material';
import { SearchProviderPopupComponent } from './search-provider-popup/search-provider-popup.component';
import { CsvDataService } from 'app/shared/services/excel.service';
import { DataPopupComponent } from '../data-popup/data-popup.component';
import { environment } from 'environments/environment';
import { PopupFormComponent } from 'app/shared/components/popup-form/popup-form.component';
import * as moment from 'moment';
import { DaterangepickerDirective } from 'ngx-daterangepicker-material';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-all-program-table',
  templateUrl: './all-program-table.component.html',
  styleUrls: ['./all-program-table.component.scss']
})
export class AllProgramTableComponent implements OnInit {
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
  montTemp: any;
  stratDate: string;
  endDate: string;
  filteredData: any;
  activeTab: any;
  totalProgramsCount: any;
  publishedUnpublishedList: any =[];
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
  ) {
    this.getSetTabs();
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
        this.allExpiredProgram()
      }
    });
  }

  edit(data) {
    this.dataservice.setOption(data);
    this.route.navigate(['forms/edit-program', data._id]);
  }

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
      this.temp = res;
      if (this.temp.isSuccess) {
        this.rows = this.temp.items;
        this.pageLength = +this.temp.total;
      }
      this.loader.close();
    });
  }
  // =========================================== Pagination =========================================================
  pageChanged(event) {
    event.pageSize
    if(event.pageSize>this.pageSize || event.pageSize<this.pageSize){
      this.pageNo = event.pageIndex+1;
      this.pageSize= event.pageSize;
      this.getSetTabs();
    }
    else if (event.previousPageIndex > event.pageIndex) {
       this.pageNo =  this.pageNo!==0? this.pageNo-1 : this.pageNo
       this.getSetTabs();
    } else {
      this.pageNo = event.pageIndex+1;
      this.getSetTabs();
    }
  }
  // =========================================== montclair programs =========================================================
  getMontclairProgram() {
    this.loader.open();
    this.apiservice.getMontclairProgram(this.pageNo, this.pageSize).subscribe(res => {
      this.montTemp = res;
      if (this.montTemp.items) {
        this.rows = this.rows.concat(this.montTemp.items);
        this.isScrol = true;
      }
      this.loader.close();
    });
  }
  // =========================================== online programs =========================================================
  getOnlinePrograms(){
    let data =[]
    let filter = `inpersonOrVirtual=online&pageNo=${this.pageNo}&pageSize=${this.pageSize}`;
    this.loader.open();
    this.apiservice.programMultiFilter(filter).subscribe((res: any) => {
      if (res) {
        res.map(x => x.programs.map(z=>{
          data.push(z)
          this.pageLength = data.length;
         this.rows = data;
        this.loader.close();
        }))
      }
    });
  }
  // =========================================== published/unpublished programs =========================================================
  getPublishedUnpublished(type) {
    this.loader.open();
    this.apiservice.getPublishedProgram(this.pageNo,this.pageSize,type).subscribe((res:any) => {
    this.publishedUnpublishedList = res;
    this.rows=this.publishedUnpublishedList.items;
    this.pageLength = this.publishedUnpublishedList.total;
    this.loader.close();
    })
  }
  // =========================================== expiring soon programs =========================================================
  getExpiringProgram() {
    this.loader.open();
    this.apiservice.getExpiringProgram('', '',).subscribe((res:any) => {
      this.expiredProgram = res;
      this.rows=this.expiredProgram.items;
      this.loader.close();
    });
  }
  // =========================================== expired programs =========================================================
  allExpiredProgram() {
    this.loader.open();
    this.apiservice.allExpiredProgram().subscribe((res:any) => {
      this.allExpired = res;
      this.rows=this.allExpired.items;
      this.loader.close();
    });
  }
    // =========================================== delete program =========================================================
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
    this.apiservice.getProgram(this.pageNo, this.pageSize).subscribe((res:any) => {
      this.totalProgramsCount = res.message;})

    this.searchControl.valueChanges.subscribe((value) =>{
      this.updateFilter(value)
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
      this.apiservice.programFilterByDate('from',this.stratDate,this.endDate).subscribe((res:any)=>{
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
      this.getMontclairProgram();
    }else if(this.selectedValue=='byDate' && this.selected){
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
      });
  }
  routeToDetailPage(data) {
    var programName = data.name;
    programName = programName.toLowerCase();
    this.detailPageUrl = `${this.baseURL}/program/activity-name/${data._id}`
  
 }
 publishUnpublishProgram(data,program) {
  var model: any = {
    programId: program._id,
    isPublished: data.checked
  }
  this.apiservice.PublishedProgram (model).subscribe((res:any) => {
    if(res.isSuccess){
    }else{this.snack.open('Somthing went wrong', 'OK', { duration: 4000 });}
  });
}
trueFalseFreeTrial(e,indx) {
 this.apiservice.trueFalseFreeTrialProgram(this.rows[indx]._id,e.checked).subscribe((res:any)=>{
  })
}
  // =========================================== programs type Tab =========================================================
getSetTabs(){
  this.activatedRoute.queryParams
    .subscribe((params: any) => {
      this.activeTab = params.activity;
      switch (this.activeTab){
        case  'online': 
        this.getOnlinePrograms()
        break;
        case  'published': 
        this.getPublishedUnpublished('published');
        break;
        case  'unpublished': 
        this.getPublishedUnpublished('unpublished');
        break;
        case  'expiring': 
        this.getExpiringProgram();
        break;
        case  'expired': 
        this.allExpiredProgram();
        break;
        default :
        this.activeTab=''
        this.getProgram();   
      }
     })
}
  // =========================================== change program tabs =========================================================
activeProgramsTab(tab){
  const activetab = tab;
  if(activetab!==''){
  this.route.navigate(
    [],
    { relativeTo: this.activatedRoute, queryParams: {activity:activetab} }
  );
  }else{
    this.route.navigate(
      [],
      { relativeTo: this.activatedRoute, queryParams: {} }
    );
  }
}

}

