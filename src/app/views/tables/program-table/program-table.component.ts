import { Component, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from 'app/shared/services/dataservice.service';
import { ApiService } from 'app/shared/services/api.service.service';
import { FileUploader } from 'ng2-file-upload';
import { Userr } from 'app/shared/models/user.model';
import { AppConfirmService } from 'app/shared/services/app-confirm/app-confirm.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatDialogRef, MatDialog } from '@angular/material';
import { ProgramDataPopupComponent } from './program-data-popup/program-data-popup.component';
@Component({
  selector: 'app-program-table',
  templateUrl: './program-table.component.html',
  styleUrls: ['./program-table.component.scss']
})
export class ProgramTableComponent implements OnInit {
  isLoading: boolean;
  usersData: any = {};
  rows: any = [];
  pageNo: number = 1;
  pageSize: number;
  temp: any = [];
  ColumnMode = ColumnMode;
  user = new Userr;
  pageLimit = 10;
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
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.user._id = params['id'];
    });
    this.getUserById(this.user._id)
  }

  getUserById(id) {
    this.apiservice.getUserById(id).subscribe((res: any) => {
      console.log('resss', res)
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
    this.route.navigate(['tables/all-program']);
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

  addProgram() {
    // this.route.navigate(['forms/program', this.user._id]);
    const url = this.route.serializeUrl(
      this.route.createUrlTree(['forms/program', this.user._id])
    );
    window.open('#' + url, '_blank');
  }

  getProgram() {
    this.isLoading = true;
    this.pageSize = 200;
    this.loader.open();
    this.apiservice.getAllProgramByUser(this.user._id, this.pageNo, this.pageSize).subscribe(res => {
      this.temp = res;
      this.rows = this.temp.reverse();
      this.loader.close();
      this.isLoading = false;
    });
  }
  publishUnpublishMultiplePrograms() {
    console.log(this.selectedActivityIds.programIds)
    if(this.selectedActivityIds.programIds.length<20){
      this.apiservice.publishUnpublishMultiplePrograms(this.selectedActivityIds).subscribe((res: any) => {
        console.log(res)
        if(res.isSuccess){
          this.snack.open(res.data, 'OK', { duration: 5000 });
          this.selectedActivityIds.programIds=[]
          this.getProgram();
        }
      });
    }else{
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
        // this.snack.open('Program published', 'OK', { duration: 4000 });
        // this.rows[indx].isPublished = booleanValue
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
  publishOrUnpublishMultiple() {
  }
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

  ngOnInit() {
    this.rows;
    this.getProgram();

  }
  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  updateFilter(event) {
    const val = event.target.value;
    if (val) {
      this.apiservice.searchProgram(val).subscribe((res: any) => {
        this.rows = res.filter(item=>item.user===this.user._id)
      });
    } else {
      this.getProgram();
    }
  }
  onFileChange(ev) {
    const reader = new FileReader();
    const file = ev.target.files[0];
  }

}