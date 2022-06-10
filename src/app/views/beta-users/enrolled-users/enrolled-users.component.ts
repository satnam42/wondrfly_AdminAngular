import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { Userr } from 'app/shared/models/user.model';
import { ApiService } from 'app/shared/services/api.service.service';
import { CsvDataService } from 'app/shared/services/excel.service';
import { DataPopupComponent } from 'app/views/tables/data-popup/data-popup.component';
import { environment } from 'environments/environment';
import * as moment from 'moment';

@Component({
  selector: 'app-enrolled-users',
  templateUrl: './enrolled-users.component.html',
  styleUrls: ['./enrolled-users.component.scss']
})
export class EnrolledUsersComponent implements OnInit {
  users:Userr[]
  response: any;
  downloadJsonHref: any;
  IPtoLocation = environment.IPtoLocationURL
  filtredUsers:any =[ ]
  constructor(private api:ApiService,
 private dialog: MatDialog,
 private sanitizer: DomSanitizer,
 private exportService: CsvDataService,) { }

 ngOnInit() {
  this.betaProgramUsers();
}

betaProgramUsers(){
this.api.betaProgramUsers().subscribe((res:any)=>{
  if(res.isSuccess){
    this.response = res;
    this.users = res.items;
    this.users.forEach(user => {
      let filtredUser:any={
        Name:user.name,
        Email:user.email,
        approvedBy:user.approvedBy,
        Status:this.checkUserStatus(user.status),
        Occupation:user.occupation,
        Why_Beta_User:user.wantWondrflyBetaUserBecause,
        Bookings_Last_6_Months:user.bookedActivityInLastMonths.replace(/-/g, ' to '),
      Date:moment(user.date).format('DD-MM-YYYY'),
      IP_Address:user.ipAddress,
      Activity_Location:user.lookingkidsActivityIn.replace(/,/g, ''),
    }
      this.filtredUsers.push(filtredUser)
    });
  }
})
}
checkUserStatus(status){
if(status.accepted){
  return 'approved'
}
else if(status.declined){
  return 'declined'
}
else{
  return 'pending'
}
 }

exportElmToExcel() {
  this.exportService.downloadFile(this.filtredUsers);
}
// generateDownloadJsonUri() {
//   var theJSON = JSON.stringify(this.users);
//   var uri = this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(theJSON));
//   const items = this.users
//   const replacer = (key, value) => value === null ? '' : value // specify how you want to handle null values here
//   const header = Object.keys(items[0])
//   const csv = [
//   header.join(','), // header row first
//   ...items.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
// ].join('\r\n')

//   this.downloadJsonHref = uri;
// }

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
}