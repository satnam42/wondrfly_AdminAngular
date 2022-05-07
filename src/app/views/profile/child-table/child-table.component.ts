import { Component, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { TablesService } from 'app/views/tables/tables.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'app/shared/services/dataservice.service';
import { ApiService } from 'app/shared/services/api.service.service';
import { Userr } from 'app/shared/models/user.model';
import { Child } from 'app/shared/models/child.model';
import { AppConfirmService } from 'app/shared/services/app-confirm/app-confirm.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBarConfig } from '@angular/material';

@Component({
  selector: 'app-child-table',
  templateUrl: './child-table.component.html',
  styleUrls: ['./child-table.component.scss']
})
export class ChildTableComponent implements OnInit {
  isLoading: boolean;
  usersData: any = {};
  rows: any = [];
  temp: any = [];
  child = "child";
  ColumnMode = ColumnMode;
  pageSize: number;
  pageNo = 1;
  submitted: any;
  user = new Userr;

  message: string = 'Child Deleted Successfully!';
  // actionButtonLabel: string = 'Retry';
  action: boolean = true;
  setAutoHide: boolean = true;
  autoHide: number = 4000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  constructor(
    public route: Router,
    private dataservice: DataService,
    private activatedRoute: ActivatedRoute,
    private apiservice: ApiService,
    private confirmService: AppConfirmService,
    private loader: AppLoaderService,
    private snack: MatSnackBar) {
    this.user = dataservice.getOption();
    this.activatedRoute.params.subscribe(params => {
      this.user.id = params['id'];
    });

    let config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.setAutoHide ? this.autoHide : 0;
  }

  edit(data) {
    this.dataservice.setOption(data);

    this.route.navigate(['forms/child', this.user.id]);
  }
  add() {
    var kid = new Child;
    this.dataservice.setOption(kid);
    this.route.navigate(['forms/child', this.user.id]);
  }
  deleteChild(data) {
    var response: any;
    this.confirmService.confirm({ message: `Delete ${data.name}?` }).subscribe(res => {
      if (res) {
        this.loader.open();
        this.isLoading = true;
        this.apiservice.deleteChild(data._id).subscribe(res => {
          response = res;
          this.loader.close();
          if (response.isSuccess === true) {
            this.snack.open(this.message, 'OK', { duration: 4000 });
            this.route.navigateByUrl('/profile', { skipLocationChange: true }).then(() => {
              this.route.navigate(['profile/child',this.user.id]);
            })

          } else {
            let msg = "Something Went Wrong!";
            this.snack.open(msg, 'OK', { duration: 4000 });
          }
        })
      }
    })
  }

  back() {
    this.route.navigate(['tables/paging']);
  }

  getChild() {
    this.isLoading = true;
    this.loader.open();
    this.apiservice.getChildByParentId(this.user.id).subscribe(res => {
      this.loader.close();
      this.temp = res;
      this.rows = this.temp;
      this.isLoading = false;
    });
    this.loader.close();
  }

  ngOnInit() {
    this.rows;
    this.getChild();
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

    this.rows = rows;

  }

}
