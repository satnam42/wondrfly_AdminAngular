import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import { Router } from '@angular/router';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { ApiService } from 'app/shared/services/api.service.service';
import { AppConfirmService } from 'app/shared/services/app-confirm/app-confirm.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { DataService } from 'app/shared/services/dataservice.service';
import { environment } from 'environments/environment';
import { DataPopupComponent } from '../data-popup/data-popup.component';

@Component({
  selector: 'app-expired-programs',
  templateUrl: './expired-programs.component.html',
  styleUrls: ['./expired-programs.component.scss']
})
export class ExpiredProgramsComponent implements OnInit {
  isLoading: boolean;
  rows: any = [];
  temp: any = [];
  provider = "provider";
  ColumnMode = ColumnMode;
  publishing: any;
  isPublish: any;
  isScrol = true;
  programId: any;
  message: string = 'Program Published Successfully!';
  action: boolean = true;
  userResponse: any;
  searchText: '';
  setAutoHide: boolean = true;
  autoHide: number = 4000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  pageSize: number = 20;
  pageNo= 1;
  detailPageUrl: string;
  baseURL = environment.baseURL
  constructor(private apiservice: ApiService,
    private dataservice: DataService,
    private route: Router,
    private confirmService: AppConfirmService,
    private loader: AppLoaderService,
    private snack: MatSnackBar,
    private dialog: MatDialog,

  ) {
   
  }

  ngOnInit() {
    this.getExpiredProgram();
  }

  updateFilter(key) {
    var response: any;
    if (key) {
      this.apiservice.searchProgram(key).subscribe((res: any) => {
        response = res;
        this.rows = response;
        console.log('searched',this.rows)
      });
    }
    if (!key) {
      this.rows=[];
      this.getExpiredProgram();
    }
  }

  getExpiredProgram() {
    this.loader.open();
    console.log(this.pageNo)
    this.apiservice.getExpiredProgram('', '').subscribe((res:any) => {
      console.log('datttt expired', res)
      this.loader.close();
      this.temp = res;
      this.rows = res.items;
    });
    this.loader.close();
  }

  routeToDetailPage(data) {
    var programName = data.name;
    programName = programName.toLowerCase();
    this.detailPageUrl = `${this.baseURL}program/activity-name/${data._id}`
  
 }

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
 
  publishUnpublishProgram(data,program) {
    console.log(data)
    var model: any = {
      programId: program._id,
      isPublished: data.checked
    }
    console.log('publish model', model)
    this.apiservice.PublishedProgram (model).subscribe((res:any) => {
      console.log(res)
      if(res.isSuccess){
        // this.snack.open('Program published', 'OK', { duration: 4000 });
        // this.rows[indx].isPublished = booleanValue
      }else{this.snack.open('Somthing went wrong', 'OK', { duration: 4000 });}
    });
  }
 
  loadMore(){
    console.log("scrolled");
    this.pageNo += 1;
    this.getExpiredProgram();
  }


  edit(data) {
    this.dataservice.setOption(data);
    this.route.navigate(['forms/edit-program', data._id]);
  }
  

  //  function for publish programs

  // publishIt(data) {
  //   const publishData: any = {
  //     programId: data.id,
  //     isPublish: 'true'
  //   }
  //   this.apiservice.PublishedProgram(publishData).subscribe(res => {
  //     this.userResponse = res;
  //     this.loader.close();
  //     if (this.userResponse.statusCode == 200) {
  //       this.snack.open(this.message, 'OK', { duration: 4000 })
  //     } else {
  //       let msg = "Please complete this program First";
  //       this.snack.open(msg, 'OK', { duration: 3000 })
  //     }
  //     this.loader.close();
  //   });
  // }
}
