import { Component, OnInit, Output, ɵConsole, EventEmitter, Input } from '@angular/core';
import { TablesService } from '../tables.service';
import { Router } from '@angular/router';
import { ApiService } from 'app/shared/services/api.service.service';
import { AppLoaderService } from '../../../shared/services/app-loader/app-loader.service';
import { DataService } from 'app/shared/services/dataservice.service';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar, MatSnackBarConfig, MatDialogRef, MatDialog } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataPopupComponent } from '../data-popup/data-popup.component';

@Component({
  selector: 'app-ambassador-table',
  templateUrl: './ambassador-table.component.html',
  styleUrls: ['./ambassador-table.component.css'],
  providers: [TablesService]
})
export class AmbassadorTableComponent implements OnInit {
  @Input()
  ambassadorss = '';
  @Output()
  parentResponse: any;
  ambassadors: any = [];
  ambassadorsList: any = [];
  allPointsLists: any = [];
  ambassadorsPoints: any = [];

  message: string = 'Ambassador List Removed!';
  action: boolean = true;
  setAutoHide: boolean = true;
  userResponse: any;
  autoHide: number = 4000;
  categoryResponse: any;
  searchText: '';




  constructor(private service: TablesService,
    public route: Router,
    private snack: MatSnackBar,
    private apiservice: ApiService,
    private loader: AppLoaderService,
    private dataService: DataService,
    private dialog: MatDialog,

  ) { }
  addRemoveAmbassador(ambassador) {

    var addRemove: any = {
      userId: ambassador._id,
      isAmbassador: false
    }
    this.apiservice.addRemoveAmbassador(addRemove).subscribe(res => {
      if (res.isSuccess === true) {
        return this.getAmbassadors();
      }
    });
  }
  ngOnInit() {
    this.getAmbassadors();
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

  getAmbassadors() {
    this.loader.open();
    this.apiservice.ambassadorsList().subscribe(res => {
      this.ambassadors = res;
    
      this.ambassadorsList = this.ambassadors.data;
      this.ambassadorsList.reverse();
      this.loader.close();
    });
  }

  viewPoints(data) {
    this.dataService.setOption(data);
    this.route.navigate(['tables/ambassador_points']);
  }




}