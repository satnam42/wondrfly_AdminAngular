import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/shared/services/api.service.service';
import { DataService } from 'app/shared/services/dataservice.service';
import { Router } from '@angular/router';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { AppConfirmService } from 'app/shared/services/app-confirm/app-confirm.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar, MatSnackBarConfig, MatDialogRef, MatDialog } from '@angular/material';
import { DataPopupComponent } from '../data-popup/data-popup.component';
import { environment } from 'environments/environment';


@Component({
  selector: 'app-online-programs',
  templateUrl: './online-programs.component.html',
  styleUrls: ['./online-programs.component.scss']
})
export class OnlineProgramsComponent implements OnInit {
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
  setAutoHide: boolean = true;
  autoHide: number = 4000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  pageNo: number = 1;
  pageSize = 20;
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
    this.updateFilter()
  }

  updateFilter() {
    let filter = `inpersonOrVirtual=online&pageNo=${this.pageNo}&pageSize=${700}`
      this.apiservice.programMultiFilter(filter).subscribe((res: any) => {
        console.log('res',res)
        if (res) {
          this.rows = this.rows.concat(res);
          console.log("programList concat",this.rows)
        }
      });
      this.isScrol = true;
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

  edit(data) {
    this.dataservice.setOption(data);
    this.route.navigate(['forms/edit-program', data._id]);
  }
  

  onScroll() {
    console.log('working')
    // if (this.isScrol) {
    //   this.isScrol = false;
    //   this.pageNo += 1;
    //   this.updateFilter();    }
  }


  //  function for publish programs

  publishIt(data) {
    const publishData: any = {
      programId: data.id,
      isPublish: 'true'
    }
    this.apiservice.PublishedProgram(publishData).subscribe(res => {
      this.userResponse = res;
      this.loader.close();
      if (this.userResponse.statusCode == 200) {
        this.snack.open(this.message, 'OK', { duration: 4000 })
      } else {
        let msg = "Please complete this program First";
        this.snack.open(msg, 'OK', { duration: 3000 })
      }
      this.loader.close();
    });
  }
}
