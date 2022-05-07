import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/shared/services/api.service.service';
import { DataService } from 'app/shared/services/dataservice.service';
import { Router } from '@angular/router';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { FileUploader } from 'ng2-file-upload';
import { AppConfirmService } from 'app/shared/services/app-confirm/app-confirm.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar, MatSnackBarConfig, MatDialogRef, MatDialog } from '@angular/material';
import { ProviderDataPopupComponent } from './provider-data-popup/provider-data-popup.component';
import { DataPopupComponent } from '../data-popup/data-popup.component';

@Component({
  selector: 'app-provider-table',
  templateUrl: './provider-table.component.html',
  styleUrls: ['./provider-table.component.scss']
})
export class ProviderTableComponent implements OnInit {
  isLoading: boolean;
  formData= new FormData()
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
  city = ''; state = ''; country = ''; source = ''; type = ''; sex = '';
  public uploader: FileUploader = new FileUploader({ url: 'upload_url' });
  public hasBaseDropZoneOver: boolean = false;
  selectedFilter = 'Name';
  filters = [
    { 'name': 'Email' },
    { 'name': 'Id' },
    { 'name': 'City' },
    { 'name': 'State' },
    { 'name': 'County' },
    { 'name': 'Source' },
    // { 'name': 'Sex', 'checked': false },
    { 'name': 'Type' },
    { 'name': 'Name' },

  ]

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
    private confirmService: AppConfirmService,
    private loader: AppLoaderService,
    private snack: MatSnackBar,
    private dialog: MatDialog,

  ) {
    let config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.setAutoHide ? this.autoHide : 0;
  }




  providerImageSelect(event, row) {
    if (row._id) {
      row.id = row._id;
    }
    let formData = new FormData();
    this.fileData = event.target.files[0];
    formData.append('image', this.fileData);

    this.apiservice.uploadUserImage(row.id, formData).subscribe((res: any) => {
      if (res) {
        this.getProviders();
      }
    });
  }


  filterChange(event: Event) {
    this.selectedFilter = (event.target as HTMLSelectElement).value;
    this.hint = '';
    if (this.selectedFilter == 'Type') {
      this.hint = '(hint: solo or agency)';
    }
    if (this.selectedFilter == 'Source') {
      this.hint = '(hint: facebook,google etc)';
    }
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

  getProviders() {
    this.loader.open();
    this.apiservice.getUsers(this.provider, this.pageNo, this.pageSize).subscribe(res => {
      this.loader.close();
      console.log('resss', res)
      this.temp = res;
      if (this.temp.items) {
        this.rows = this.temp.items;
        this.isScrol = true;
      }
      this.loader.close();
      this.isLoading = false;
    });
  }

  getParents() {
    this.isLoading = true;
    this.loader.open();
    this.apiservice.getParents(this.pageNo, this.pageSize).subscribe(res => {
      this.temp = res;
      if (this.temp.items) {
        this.rows = this.temp.items;
        this.isScrol = true;
      }
      this.loader.close();
      this.isLoading = false;
    });
  }

  providerProfile(data) {
    if (data.id) {
      this.route.navigate(['tables/program', data.id]);
    }
    if (data._id) {
      this.route.navigate(['tables/program', data._id]);
    }
  }


  openPopUp(data) {
    let dialogRef: MatDialogRef<any> = this.dialog.open(DataPopupComponent, {
      width: '60%',
      disableClose: true,
      data: data,
    })
    dialogRef.afterClosed()
      .subscribe(res => {
        if (!res) {
          return;
        }
      });
  }

  setPage(page) {
    this.pageNo = page.offset;
    this.pageSize = page.pageSize;
    if (page.offset == 1) {
      this.pageNo = 2
    }
    this.getProviders();
  }

  edit(data) {
    this.dataservice.setOption(data);
    if(data._id){
      data.id = data._id
    }
    this.route.navigate(['forms/provider-update', data.id]);
  }
  add() {
    this.route.navigate(['forms/provider']);
  }
  addQuick() {
    this.route.navigate(['forms/provider-quick']);
  }
  showHideButton() {
    this.isShow = !this.isShow;
  }
  activeSkill(event) {
    event.target.setAttribute('color', 'accent');
  }

  setOrUnsetFreeTrial(data,indx) {
    // this.rows[indx].isFreeTrial=data
    }
  deleteProvider(data) {
    if (data._id) {
      data.id = data._id;
    }
    this.confirmService.confirm({ message: `Delete ${data.firstName}?` }).subscribe(res => {
      if (res) {
        this.loader.open();
        this.isLoading = true;
        this.apiservice.deleteUser(data.id).subscribe(res => {
          var response: any = res;
          if (response.isSuccess === true) {
            this.loader.close();
            this.snack.open(this.message, 'OK', { duration: 4000 });
            this.route.navigateByUrl('/tables', { skipLocationChange: true }).then(() => {
              this.route.navigate(['tables/provider']);
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

  providerActiveInActive(provider) {
    if (provider._id) {
      provider.id = provider._id;
    }
    let isActivated: boolean;
    if (provider.isActivated === true) {
      isActivated = false;
      this.apiservice.userActiveInActive(provider.id, isActivated).subscribe(res => {
        this.getProviders();
      });
    }
    else if (provider.isActivated === false) {
      isActivated = true;
      this.apiservice.userActiveInActive(provider.id, isActivated).subscribe(res => {
        this.getProviders();
      });
    }
  }
  loadMore() {
    this.pageSize += 20;
    if (this.showReset) {
    } else {
      this.getProviders();
    }
  }
  onScroll() {
    if (this.isScrol) {
      this.isScrol = false
      this.loadMore()
    }
  }
  addRemoveAmbassador(event, provider) {
    if (provider._id) {
      provider.id = provider._id;
    }
    var addRemove: any = {
      userId: provider.id,
      isAmbassador: event.checked

    }
    this.apiservice.addRemoveAmbassador(addRemove).subscribe(res => {
    });
  }
  ngOnInit() {
    window.scroll(0, 0);
    this.getProviders();
    this.rows;

    // this.columns = this.service.getDataConf();

  }
  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  updateFilter(key) {
    var response: any;
    if (key) {
      this.apiservice.searchProviderByName(key).subscribe((res: any) => {
        response = res;
        this.rows = response;
      });
    }
    if (!key) {
      this.getProviders();
    }
  }

  // updateFilter(event) {
  //   var response: any;
  //   let emptyArray: any = [];
  //   const val = event.target.value.toLowerCase();

  //   const filter = this.selectedFilter.toLowerCase();
  //   console.log('filterChange', filter);

  //   if (filter === 'name') {
  //     this.apiservice.searchProviderByName(val).subscribe((res: any) => {
  //       response = res;
  //       if (response.length > 0) {
  //         this.temp.items = response;
  //         this.rows = this.temp.items;
  //         for (let i = 0; i <= 10; i++) {
  //           let row = this.temp.items[i];
  //           this.rows.push(row);
  //         }
  //       }
  //       console.log('search list', this.rows);
  //     });
  //   }
  //   if (filter === 'email') {
  //     this.apiservice.searchProviderByEmail(val).subscribe((res: any) => {
  //       console.log('search by email data', res);
  //       response = res;
  //       if (response.isSuccess) {
  //         this.rows = emptyArray;
  //         let row = response.data;
  //         this.rows.push(row);
  //         console.log('rows by email', this.rows);
  //       }

  //     });

  //   }

  //   if (filter === 'id') {
  //     this.apiservice.searchProviderById(val).subscribe((res: any) => {
  //       console.log('search provider by id data', res);
  //       response = res;
  //       if (response.isSuccess) {
  //         this.rows = emptyArray;
  //         let row = response.data;
  //         this.rows.push(row);
  //         console.log('rows by id', this.rows);
  //       }
  //     });
  //   }
  //   if (!val) {
  //     this.getProviders();
  //   }

  //   if (val) {
  //     if (filter === 'city') {
  //       this.city = val;
  //       this.state = ''; this.country = ''; this.source = ''; this.type = ''; this.sex = '';
  //     }
  //     if (filter === 'state') {
  //       this.state = val;
  //       this.city = ''; this.country = ''; this.source = ''; this.type = ''; this.sex = '';

  //     }
  //     if (filter === 'county') {
  //       this.country = val;
  //       this.city = ''; this.state = ''; this.source = ''; this.type = ''; this.sex = '';

  //     }
  //     if (filter === 'source') {
  //       this.source = val;
  //       this.city = ''; this.state = ''; this.country = ''; this.type = ''; this.sex = '';

  //     }
  //     if (filter === 'type') {
  //       this.type = val;
  //       this.city = ''; this.state = ''; this.country = ''; this.source = ''; this.sex = '';

  //     }
  //     // if (filter === 'sex') {
  //     //   this.sex = val;
  //     //   this.city = ''; this.state = ''; this.country = ''; this.source = ''; this.type = '';
  //     // }

  //     this.apiservice.providerListByFilter(this.city, this.state, this.country, this.source, this.type, this.sex, this.pageSize, this.pageNo).subscribe((res: any) => {
  //       console.log('filterresponse', res);
  //       response = res;
  //       if (response.isSuccess) {
  //         this.rows = emptyArray;
  //         for (let i = 0; i <= 10; i++) {
  //           let row = response.data[i];
  //           this.rows.push(row);
  //         }
  //       }
  //     });
  //   }
  // }
  onFileChange(ev) {
    this.fileData= ev.target.files[0];
    this.formData.append('csv',this.fileData);
    console.log('formData>>>',this.formData);
      this.apiservice.providerCSVupload(this.formData).subscribe(res => {
        this.getProviders();
        console.log('res',res)
      });
  }
}
