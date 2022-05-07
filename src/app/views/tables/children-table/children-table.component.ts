import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { FileUploader } from 'ng2-file-upload';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar, MatSnackBarConfig, MatDialogRef, MatDialog } from '@angular/material';
import { DataPopupComponent } from '../data-popup/data-popup.component';
import { ApiService } from 'app/shared/services/api.service.service';
import { DataService } from 'app/shared/services/dataservice.service';

@Component({
  selector: 'app-children-table',
  templateUrl: './children-table.component.html',
  styleUrls: ['./children-table.component.scss']
})
export class ChildrenTableComponent implements OnInit {
  isLoading: boolean;
  rows: any = [];
  temp: any = [];
  provider = "provider";
  ColumnMode = ColumnMode;
  isShow = true;
  isScrol = true;
  showReset = false;
  pageNo = 1;
  pageSize = 20;
  hint: any;
  searchText: '';
  fileData: File = null;
  public uploader: FileUploader = new FileUploader({ url: 'upload_url' });
  public hasBaseDropZoneOver: boolean = false;
  selectedFilter = 'Name';

  message: string = 'Provider Deleted Successfully!';
  // actionButtonLabel: string = 'Retry';
  action: boolean = true;
  setAutoHide: boolean = true;
  autoHide: number = 4000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private apiservice: ApiService,
    private dataservice: DataService,
    private route: Router,
    private snack: MatSnackBar,
    private dialog: MatDialog,

  ) {
    let config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.setAutoHide ? this.autoHide : 0;
  }

  ngOnInit() {
    window.scroll(0, 0);
    this.getChildren();
    this.rows;
  }


  loadMore() {
    this.pageSize += 20;
    if (this.showReset) {
    } else {
      this.getChildren();
    }
  }
  onScroll() {
    if (this.isScrol) {
      this.isScrol = false
      this.loadMore()
    }
  }
  getChildren(){
    this.apiservice.getChildren(this.pageNo, this.pageSize).subscribe(res => {
      console.log('children list response ', res)
      this.temp = res;
      if (this.temp.items) {
        this.rows = this.temp.items;
        this.isScrol = true;
      }
      this.isLoading = false;
    });
  }

}
