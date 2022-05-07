import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Userr } from 'app/shared/models/user.model';
import { ApiService } from 'app/shared/services/api.service.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { DataService } from 'app/shared/services/dataservice.service';
import { ProgramLocationComponent } from 'app/views/forms/program-form/program-location/program-location.component';
import { TablesService } from 'app/views/tables/tables.service';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css']
})
export class EditFormComponent implements OnInit {
  value: any;
  userId: any;
  user : any;
  sourceUrls:any =[];
  providerResponse: any;
  locationData: any = {
    address: '',
    lat: '',
    lng: ''
  };

  constructor(private service: TablesService,
    public dataRoute: ActivatedRoute,
    private dataservice: DataService,
    private apiservice: ApiService,
    private snack: MatSnackBar,
    private dialog: MatDialog,
    private loader: AppLoaderService,
    private activatedRoute :ActivatedRoute,
    private route: Router,
    public dialogRef: MatDialogRef<EditFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.userId= data.id
    console.log('userIdddddddd',this.userId)
    this.getProviderById() 

  }

  ngOnInit() {
    if (this.data.title === 'firstName') {
      this.value = this.data.data.firstName
    } else if (this.data.title === 'color') {
      this.value = this.data.data.color
    } else if (this.data.title === 'addressLine1') {
      this.value = this.data.data.addressLine1  
    }else if (this.data.title === 'phoneNumber') {
      this.value = this.data.data.phoneNumber   
    }else if (this.data.title === 'isActivated') {
      this.value = this.data.data.isActivated   
    }
    else if (this.data.title === 'state') {
      this.value = this.data.data.state   
    }
    else if (this.data.title === 'country') {
      this.value = this.data.data.country   
    }
    else if (this.data.title === 'zipCode') {
      this.value = this.data.data.zipCode   
    }
    else if (this.data.title === 'updatedOn') {
      this.value = this.data.data.updatedOn   
    }
    else if (this.data.title === 'progress') {
      this.value = this.data.data.progress   
    }
    else if (this.data.title === 'role') {
      this.value = this.data.data.role   
    }


    
  }

  upload(data: any): void {
    this.dialogRef.close(data);
  }

  cancel(): void {
    this.dialogRef.close();
  }

  getProviderById() {
    this.apiservice.getUserById(this.userId).subscribe((res: any) => {
      this.user = res;
      this.sourceUrls = this.user.sourceUrl;
      console.log("providerdata", this.user)
    })
  }

  updateProvider() {
    this.loader.open();
    
    this.user.firstName = this.value
          delete this.user.categories;
          delete this.user.source;
          delete this.user.sourceUrl;
          delete this.user.notices;
          delete this.user.banners;
          delete this.user.permissions;
          this.user.categoryIds=[]
          this.user.subCategoryIds=[]
    console.log('before resss', this.user);
 this.user.sourceUrl=   this.sourceUrls ;
    this.apiservice.updateProvider(this.user).subscribe(res => {
      console.log('after resss', res)
      this.providerResponse = res;
      this.loader.close();
      if (this.providerResponse.isSuccess === true) {
        let message: '';
        this.snack.open(message, 'OK', { duration: 4000 })
        this.route.navigate(['tables/provider']);
      } else {
        let msg = "Something Went Wrong!";
        this.snack.open(msg, 'OK', { duration: 4000 });
      }
    });
  }

}
