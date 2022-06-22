import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { environment } from 'environments/environment';
@Component({
  selector: 'app-data-popup',
  templateUrl: './data-popup.component.html',
  styleUrls: ['./data-popup.component.scss']
})
export class DataPopupComponent implements OnInit {
  name: '';
  IPtoLocation = environment.IPtoLocationURL
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DataPopupComponent>,
  ) { }

  ngOnInit() {

    // this.name = this.data.firstname
  }
}