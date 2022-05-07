import { Component, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';
import { DataService } from 'app/shared/services/dataservice.service';
import { ChartType } from 'chart.js';
import { ApiService } from 'app/shared/services/api.service.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import * as moment from 'moment';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar, } from '@angular/material';

@Component({
  selector: 'app-reoprts',
  templateUrl: './reoprts.component.html',
  styleUrls: ['./reoprts.component.css'],
})
export class ReoprtsComponent implements OnInit {
  filterForm: FormGroup;
  response: any;
  rows = [];
  ColumnMode = ColumnMode;
  fromDate = new Date('10/24/2020');
  // fromDate = new Date('');
  toDate = new Date;
  isResponse: boolean = false;
  isBarData: boolean = false;
  isRecord: boolean = false;
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  barChartData: any[] = [{}]
  public barChartLabels = [];
  // public barChartData = [];
  public barChartType = 'bar';
  public barChartLegend = true;



  constructor(private route: Router,
    private dataservice: DataService,
    private apiservice: ApiService,
    private loader: AppLoaderService,
    private snack: MatSnackBar,

  ) {

  }
  edit(data) {
    this.dataservice.setOption(data);
    this.route.navigate(['forms/category']);
  }

  getReport() {
    var fromDate: any = moment(this.fromDate).format("MM-DD-YYYY");
    var toDate: any = moment(this.toDate).format("MM-DD-YYYY");
    this.loader.open();
    this.apiservice.getProviderReport(fromDate, toDate).subscribe(res => {
      this.response = res;
      console.log('res fromback end',this.response)
      this.loader.close();
      if (this.response.isSuccess === true) {
        this.isResponse = true;
        if (this.response.data.labels.length) {
          this.isBarData = true;
          let item = {
            data: this.response.data.data
          }
          let ChartData = []
          ChartData.push(item)
          this.barChartData = ChartData;
          this.barChartLabels = this.response.data.labels;
        }

      } else {
        this.isResponse = false;
        this.isBarData = false;
        this.isRecord = true;
      }
      this.loader.close();
    });
  }
  ngOnInit() {
    this.getReport();
    this.filterForm = new FormGroup({
      fromDate: new FormControl(['',]),
      toDate: new FormControl(['',]),
    });

  }

}
