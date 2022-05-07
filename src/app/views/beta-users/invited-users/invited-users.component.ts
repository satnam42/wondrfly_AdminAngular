import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Userr } from 'app/shared/models/user.model';
import { ApiService } from 'app/shared/services/api.service.service';
import { DataPopupComponent } from 'app/views/tables/data-popup/data-popup.component';
import { Subscription, timer } from 'rxjs';
import { map, share } from 'rxjs/operators';

@Component({
  selector: 'app-invited-users',
  templateUrl: './invited-users.component.html',
  styleUrls: ['./invited-users.component.scss']
})
export class InvitedUsersComponent implements OnInit {
  users:Userr[] = []
  response: any;
  constructor(private api:ApiService,
    private dialog: MatDialog,) { }
  betaProgramUsers(){
    this.api.betaProgramUsers().subscribe((res:any)=>{
      this.response = res;
      if(res.isSuccess){
        res.items.forEach(item => {
        if(item.isInvited==='invited'){
          this.users.push(item);
        }
      });
      }
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