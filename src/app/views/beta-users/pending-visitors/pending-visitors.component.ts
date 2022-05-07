import { MatDialog, MatDialogRef, MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { Userr } from 'app/shared/models/user.model';
import { ApiService } from 'app/shared/services/api.service.service';
import { DataPopupComponent } from 'app/views/tables/data-popup/data-popup.component';
import { environment } from 'environments/environment';
import { DataService } from 'app/shared/services/dataservice.service';

@Component({
  selector: 'app-pending-visitors',
  templateUrl: './pending-visitors.component.html',
  styleUrls: ['./pending-visitors.component.scss']
})
export class PendingVisitorsComponent implements OnInit {

  users:Userr[] = []
  action: boolean = true;
  setAutoHide: boolean = true;
  autoHide: number = 4000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  response: any;
  disableApproveBtn=false
  IPtoLocation = environment.IPtoLocationURL
  constructor(private api:ApiService,
    private dialog: MatDialog,
    private snack:MatSnackBar,
    private dataservice: DataService) { 
      let config = new MatSnackBarConfig();
      config.verticalPosition = this.verticalPosition;
      config.horizontalPosition = this.horizontalPosition;
      config.duration = this.setAutoHide ? this.autoHide : 0;
    }
betaProgramUsers(){
this.api.betaProgramUsers().subscribe((res:any)=>{
  this.response = res;
  if(res.isSuccess){
    this.users= res.items.filter(item=>item.status.pending)
  }
})
}
approveAllBetaUsers(){
  this.disableApproveBtn=true
  this.api.approveAllBetaUsers().subscribe((res:any)=>{
if(res.isSuccess){
  this.disableApproveBtn=false
  this.snack.open('Approved all Users', 'OK', { duration: 4000 });
  this.dataservice.setOption("changed");
}  })
  }


  approveOrDeclineById(type,user,indx){
    this.disableApproveBtn=true
    this.api.approveOrDeclineById(type,user.invitation).subscribe((res:any)=>{
      if(res.isSuccess){
        this.users.splice(indx, 1);
        this.disableApproveBtn=false
        if(type==='approve')
        this.snack.open('User Approved', 'OK', { duration: 4000 });
      }
      if(type==='decline'){
      this.snack.open('User Declined', 'OK', { duration: 4000 });
    }
    this.dataservice.setOption("changed")
    })
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
  ngOnInit() {
    this.betaProgramUsers()
  }
}
