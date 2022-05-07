import { Component, OnInit, OnChanges, ViewChild } from '@angular/core';
import { TablesService } from '../tables.service';
import { Router } from '@angular/router';
import { DataService } from 'app/shared/services/dataservice.service';
import { ApiService } from 'app/shared/services/api.service.service';
import { MatSort, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar, MatDialogRef, MatDialog } from '@angular/material';
import { SortType, ColumnMode } from '@swimlane/ngx-datatable';
import { FileUploader } from 'ng2-file-upload';
import { AppConfirmService } from '../../../shared/services/app-confirm/app-confirm.service';
import { AppLoaderService } from '../../../shared/services/app-loader/app-loader.service';
import { Claim } from 'app/shared/models/claim.model';
import { FormGroup } from '@angular/forms';
import { DataPopupComponent } from '../data-popup/data-popup.component';
@Component({
  selector: 'app-claim-table',
  templateUrl: './claims-table.component.html',
  styleUrls: ['./claims-table.component.css'],
  providers: [TablesService]
})
export class ClaimsTableComponent implements OnInit, OnChanges {
  // @ViewChild(MatSort, {static: false}) sort: MatSort;
  // columns:any = [];

  isLoading: boolean;
  usersData: any = {};
  claimsList: any = [];
  temp: any = [];
  ColumnMode = ColumnMode;
  submitted: any;
  claimsForm: FormGroup;
  claims = new Claim;

  public uploader: FileUploader = new FileUploader({ url: 'upload_url' });
  public hasBaseDropZoneOver: boolean = false;
  parentResponse: any;


  message: string = 'claim approved!';
  // actionButtonLabel: string = 'Retry';
  action: boolean = true;
  searchText: '';
  setAutoHide: boolean = true;
  autoHide: number = 4000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  categoryResponse: any;

  // addExtraClass: boolean = false;
  constructor(private service: TablesService,
    public route: Router,
    private dialog: MatDialog,
    private dataservice: DataService,
    private snack: MatSnackBar,
    private apiservice: ApiService,
    private confirmService: AppConfirmService,
    private loader: AppLoaderService,
  ) {

    let config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.setAutoHide ? this.autoHide : 0;
    // config.extraClasses = this.addExtraClass ? ['test'] : undefined;
  }

  getClaimsList() {
    this.loader.open();
    this.apiservice.getClaimsList().subscribe(res => {
      this.temp = res;
      this.claimsList = this.temp;
   
      this.loader.close();
    });
  }


  claimActionToApprove(data) {
    this.claims._id = data.id;
    this.claims.status = data.status = "approve";
    this.claims.requestBy = data.requestBy;
    this.claims.requestOn = data.requestOn.requestOnId;
    this.loader.open();
    this.apiservice.claimAction(this.claims).subscribe((res:any) => {
      this.loader.close();
   
      if(res.isSuccess===true){
        this.snack.open(this.message, 'OK', { duration: 4000 });
      }else{
        this.snack.open(res.error, 'OK', { duration: 4000 });
      this.loader.close();
      }
      this.getClaimsList();
    });

  }


  claimActionToReject(data) { 
  
    this.claims._id = data.id;
    this.claims.status = data.status = "reject";
    this.claims.requestBy = data.requestBy;
    this.claims.requestOn = data.requestOn.requestOnId;
    this.loader.open();
    this.apiservice.claimAction(this.claims).subscribe((res:any) => {
      this.loader.close();
      console.log('claim_res',res)
      if(res.isSuccess===true){
        this.snack.open(this.message, 'OK', { duration: 4000 });
      }else{
        this.snack.open(res.error, 'OK', { duration: 4000 });
      this.loader.close();
      }
      this.getClaimsList();
    });
  }

  ngOnChanges() {

  }
  ngOnInit() {
    this.claimsList;
    this.getClaimsList();

  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }
  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    var columns = Object.keys(this.temp[0]);
    // Removes last "$$index" from "column"
    columns.splice(columns.length - 1);

    if (!columns.length)
      return;

    const rows = this.temp.filter(function (d) {
      for (let i = 0; i <= columns.length; i++) {
        let column = columns[i];
        if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) {
          return true;
        }
      }
    });

    this.claimsList = rows;

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

}
