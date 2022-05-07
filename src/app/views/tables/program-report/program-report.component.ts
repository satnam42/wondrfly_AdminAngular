import { Component, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from 'app/shared/services/dataservice.service';
import { ApiService } from 'app/shared/services/api.service.service';
import { FileUploader } from 'ng2-file-upload';
import { Userr } from 'app/shared/models/user.model';
import { AppConfirmService } from 'app/shared/services/app-confirm/app-confirm.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatDialogRef, MatDialog } from '@angular/material';
import { ProgramDataPopupComponent } from '../program-table/program-data-popup/program-data-popup.component';
import { DataPopupComponent } from '../data-popup/data-popup.component';

@Component({
  selector: 'app-program-report',
  templateUrl: './program-report.component.html',
  styleUrls: ['./program-report.component.scss']
})
export class ProgramReportComponent implements OnInit {
  isLoading: boolean;
  usersData: any = {};
  rows: any = [];
  pageNo: number = 0;
  pageSize: number = 20;
  temp: any = [];
  ColumnMode = ColumnMode;
  user = new Userr;
  searchText:'';
  submitted: any;
  isShow = true;
  public uploader: FileUploader = new FileUploader({ url: 'upload_url' });
  public hasBaseDropZoneOver: boolean = false;



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
    let config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.setAutoHide ? this.autoHide : 0;
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
      });
  }

  edit(data) {
    this.dataservice.setOption(data);
    this.route.navigate(['forms/edit-program', this.user._id]);
  }

  back() {
    this.route.navigate(['tables/provider']);
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
    this.isLoading = true;
    this.apiservice.getProgram(this.pageNo, this.pageSize).subscribe(res => {
      this.temp = res;
      this.rows = this.temp.items;
      this.loader.close();
      this.isLoading = false;
    });
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

  deleteProgram(data) {
    this.confirmService.confirm({ message: `Delete ${data.name}?` }).subscribe(res => {
      if (res) {
        this.loader.open();
        this.isLoading = true;
        this.apiservice.deleteProgram(data._id).subscribe(res => {
          var response: any = res;
          if (response.isSuccess === true) {
            this.loader.close();
            this.snack.open(this.message, 'OK', { duration: 4000 });
            this.route.navigateByUrl('/tables', { skipLocationChange: true }).then(() => {
              this.route.navigate(['tables/all-program', this.user._id]);
            })

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
    this.rows;
    this.getProgram();

  }
  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  updateFilter(event) {
    var response: any;
    const val = event.target.value;
    if (val) {
      this.apiservice.searchProgram(val).subscribe((res: any) => {
        response = res;
        this.rows = response;
        // this.rows = this.temp;
        for (let i = 0; i >= 10; i++) {
          this.rows.push(response[i]);
        }
      });
    }
    if (!val) {
      this.getProgram();
    }

  }

}