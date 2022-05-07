import { Component, OnInit, OnChanges, ViewChild } from '@angular/core';
import { TablesService } from '../tables.service';
import { Router } from '@angular/router';
import { DataService } from 'app/shared/services/dataservice.service';
import { ApiService } from 'app/shared/services/api.service.service';
import { MatSort } from '@angular/material';
import { SortType, ColumnMode } from '@swimlane/ngx-datatable';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-admin-table',
  templateUrl: './admin-table.component.html',
  styleUrls: ['./admin-table.component.scss']
})
export class AdminTableComponent implements OnInit {

  // @ViewChild(MatSort, {static: false}) sort: MatSort;
  // columns:any = [];

  isLoading: boolean;
  usersData: any = {};
  rows: any = [];
  temp: any = [];
  ColumnMode = ColumnMode;

  pageSize: 10;
  pageNo = 0;
  submitted: any;
  parent = "admin";
  searchText = '';

  // isShow=true;

  public uploader: FileUploader = new FileUploader({ url: 'upload_url' });
  public hasBaseDropZoneOver: boolean = false;


  constructor(private service: TablesService,
    public route: Router,
    private dataservice: DataService,
    private apiservice: ApiService) { }

  edit(data) {
    this.dataservice.setOption(data);
    this.route.navigate(['forms/admin']);

  }
  activeSkill(event) {
    event.target.setAttribute('color', 'accent');
  }

  add() {
    this.route.navigate(['forms/admin']);
  }
  // showHideButton1(){
  //   this.isShow = !this.isShow;
  // }
  // showHideButton2(){
  //   this.isShow = !this.isShow;
  // }
  setPage(page) {
    this.pageNo = page.offset;
    this.pageSize = page.pageSize;
    if (page.offset == 1) {
      this.pageNo = 2
    }
    this.getParents();

  }
  getParents() {
    this.isLoading = true;
    this.apiservice.getUsers(this.parent, this.pageNo, this.pageSize
    ).subscribe(res => {
      this.temp = res;
      // this.temp.sort = this.sort; 
      this.rows = this.temp;
      this.isLoading = false;
    });
  }
  ngOnChanges() {
    // this.columns = this.service.getDataConf();
    // this.rows = this.service.getAll();

  }
  ngOnInit() {
    this.rows;
    this.getParents();

    // this.columns = this.service.getDataConf();

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

    this.rows = rows;

  }

}
