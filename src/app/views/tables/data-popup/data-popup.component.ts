import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Session } from 'app/shared/models/batch.model';
import * as moment from 'moment';
import { environment } from 'environments/environment';
@Component({
  selector: 'app-data-popup',
  templateUrl: './data-popup.component.html',
  styleUrls: ['./data-popup.component.scss']
})
export class DataPopupComponent implements OnInit {
  public itemForm: FormGroup;
  name: '';
  IPtoLocation = environment.IPtoLocationURL
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DataPopupComponent>,
    private fb: FormBuilder,
  ) { console.log(data)}

  ngOnInit() {

    // this.name = this.data.firstname
  }
}