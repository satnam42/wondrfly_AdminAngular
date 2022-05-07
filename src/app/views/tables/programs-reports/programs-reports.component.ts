import { Component, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';
import { DataService } from 'app/shared/services/dataservice.service';

@Component({
  selector: 'app-programs-reports',
  templateUrl: './programs-reports.component.html',
  styleUrls: ['./programs-reports.component.scss']
})
export class ProgramsReportsComponent implements OnInit {
  rows = [];
  ColumnMode = ColumnMode;

  temp = [
    { name: 'example1', date: '08-01-2020', time: '8:20 am' },
    { name: 'example2', date: '08-01-2020', time: '8:25 am' },
    { name: 'example3', date: '08-01-2020', time: '7:20 am' },
    { name: 'example4', date: '08-01-2020', time: '3:30 pm' },
    { name: 'example5', date: '08-01-2020', time: '6:22 am' },
    { name: 'example6', date: '08-01-2020', time: '5:05 am' },
    { name: 'example7', date: '08-01-2020', time: '9:29 am' },
    { name: 'example8', date: '08-01-2020', time: '1:00 am' },
    { name: 'example9', date: '08-01-2020', time: '2:00 pm' },
  ]

  constructor(private route: Router, private dataservice: DataService) { }
  edit(data) {
    this.dataservice.setOption(data);

    this.route.navigate(['forms/category']);
  }

  ngOnInit() {
    this.rows = this.temp;
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
