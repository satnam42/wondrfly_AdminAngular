import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MatSnackBar, MatSpinner } from '@angular/material';
import { Router } from '@angular/router';
import { Userr } from 'app/shared/models/user.model';
import { ApiService } from 'app/shared/services/api.service.service';
import { AppConfirmService } from 'app/shared/services/app-confirm/app-confirm.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { DataService } from 'app/shared/services/dataservice.service';
import { DataPopupComponent } from 'app/views/tables/data-popup/data-popup.component';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-declined-users',
  templateUrl: './declined-users.component.html',
  styleUrls: ['./declined-users.component.scss']
})
export class DeclinedUsersComponent implements OnInit {
  users:Userr[] = []
  response: any;
  disableApproveBtn = false
  IPtoLocation = environment.IPtoLocationURL
  constructor(private api:ApiService,
    private dialog: MatDialog,
    private snack:MatSnackBar,
    private loader:AppLoaderService,
    private route : Router,
    private dataservice: DataService,
    private confirmService: AppConfirmService) { }
  betaProgramUsers(){
    this.loader.open();
    this.api.betaProgramUsers().subscribe((res:any)=>{
      this.response = res;
      this.loader.close();
      if(res.isSuccess){
       this.users= res.items.filter(item=>item.status.declined)
      }
    })
    this.loader.close();
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

    approveOrDeleteById(type,user,indx){
        this.disableApproveBtn = true
            if(type=="delete"){
        this.confirmService.confirm({ message: `Delete ${user.name}?` }).subscribe(res => {
          if (res) {
            this.api.deleteUser(user.user).subscribe((res:any) => {
              if (res.isSuccess === true) {
                this.users.splice(indx, 1);
                this.disableApproveBtn = false
                this.snack.open('User Deleted', 'OK', { duration: 3000 });
                this.dataservice.setOption("changed");
              } else {
                this.snack.open(res.error, 'OK', { duration: 3000 });
              }
            })
          }
        })
      }
      else{

      this.api.approveOrDeclineById(type,user.invitation).subscribe((res:any)=>{
        if(res.isSuccess){
          this.users.splice(indx, 1);
          this.disableApproveBtn = false
          this.snack.open('User Approved', 'OK', { duration: 4000 });
          this.dataservice.setOption("changed");
      }
      })
      }
    }
  ngOnInit() {
    this.betaProgramUsers()
  }

}