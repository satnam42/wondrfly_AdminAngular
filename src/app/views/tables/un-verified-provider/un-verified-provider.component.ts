import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/shared/services/api.service.service';
import { DataService } from 'app/shared/services/dataservice.service';
import { Router } from '@angular/router';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { FileUploader } from 'ng2-file-upload';
import { AppConfirmService } from 'app/shared/services/app-confirm/app-confirm.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar, MatSnackBarConfig, MatDialogRef, MatDialog } from '@angular/material';
import { DataPopupComponent } from '../data-popup/data-popup.component';
// import { ProviderDataPopupComponent } from './provider-report-popup/provider-report-popup.component';

@Component({
  selector: 'app-un-verified-provider',
  templateUrl: './un-verified-provider.component.html',
  styleUrls: ['./un-verified-provider.component.scss']
})
export class UnVerifiedProviderComponent implements OnInit {
  isLoading: boolean;
  rows: any = [];
  temp: any = [];
  provider = "provider";
  ColumnMode = ColumnMode;
  isShow = true;
  searchText: '';
  showReset = false;
  isScrol = true;
  pType = 'unverified'
  loaderPostion = 'center-center';
  loaderType = 'ball-spin-clockwise';
  pageNo: number = 1;
  pageSize = 20;
  hint: any;
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
        this.getUnVerifiedProviders();
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


  getUnVerifiedProviders() {
    this.loader.open();
    this.apiservice.getProviderVerifiedOrNot(this.pageNo,this.pageSize,'unverified').subscribe((res: any) => {
      this.loader.close();
      this.temp= res
     
      if (res.isSuccess === true) {
        this.rows=  this.temp.items
      }
      this.loader.close();
      this.isScrol = true;

    });

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



  providerProfile(data) {
    // this.dataservice.setOption(data);
    if (data.id) {
      this.route.navigate(['tables/program', data.id]);
    }
    if (data._id) {
      this.route.navigate(['tables/program', data._id]);

    }

  }

  providerPrograms(data) {
    let model = {
      programType: 'published',
      userId: data.id
    }
    this.dataservice.setOption(model);
    this.route.navigate(['tables/published']);
  }

  providerUnPrograms(data) {
    let model = {
      programType: 'unpublished',
      userId: data.id
    }

    this.dataservice.setOption(model);
    this.route.navigate(['tables/unpublish']);
  }


  setPage(page) {
    this.pageNo = page.offset;
    this.pageSize = page.pageSize;
    if (page.offset == 1) {
      this.pageNo = 2
    }
    this.getUnVerifiedProviders();
  }

  edit(data) {
    this.dataservice.setOption(data);
    // this.route.navigate(['/requests/fill', JSON.stringify(data)]);
    this.route.navigate(['tables/edit-Provider', data.id]);
  }
  add() {
    this.route.navigate(['forms/provider']);
  }
  reportSection() {
    this.route.navigate(['tables/reports']);

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
  deleteProvider(data) {
    if (data._id) {
      data.id = data._id;
    }
    this.confirmService.confirm({ message: `Delete ${data.firstName}?` }).subscribe(res => {
      if (res) {
        this.loader.open();
        this.isLoading = true;
        this.apiservice.deleteUser(data.id).subscribe(res => {
          this.loader.close();
          var response: any = res;
          if (response.isSuccess === true) {
            this.loader.close();
            // this.snack.open('Member deleted!', 'OK', { duration: 4000 })
            this.snack.open(this.message, 'OK', { duration: 4000 });
            this.route.navigateByUrl('/tables', { skipLocationChange: true }).then(() => {
              this.route.navigate(['tables/provider']);
            })
            this.loader.close();
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
        this.getUnVerifiedProviders();

      });

    }
    else if (provider.isActivated === false) {
      isActivated = true;
      this.apiservice.userActiveInActive(provider.id, isActivated).subscribe(res => {
        this.getUnVerifiedProviders();
      });

    }
  }

  onScroll() {
    if (this.isScrol) {
      this.isScrol = false
      this.loadMore()
    }
  }
  loadMore() {
    this.pageSize += 20;
    this.getUnVerifiedProviders();
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
    this.getUnVerifiedProviders()
    this.rows;

    // this.columns = this.service.getDataConf();

  }
  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }



  updateFilter(key) {
    var response: any;
    if (key) {
      this.apiservice.searchVerifiedUnverfiedProviders(key, 'unverified').subscribe((res: any) => {
       
        response = res;
        let id = response._id
        this.rows.push(id)
        this.rows = response;
      });
    }
    if (!key) {
      this.getUnVerifiedProviders()
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
  //     this.getUnVerifiedProviders();
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
  // if (filter === 'sex') {
  //   this.sex = val;
  //   this.city = ''; this.state = ''; this.country = ''; this.source = ''; this.type = '';
  // }

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


}
