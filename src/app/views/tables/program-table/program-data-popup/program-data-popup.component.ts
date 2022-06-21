import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Session } from 'app/shared/models/batch.model';
import * as moment from 'moment';
import { DataService } from 'app/shared/services/dataservice.service';
import { ApiService } from 'app/shared/services/api.service.service';
import { Userr } from 'app/shared/models/user.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'program-data-popup',
  templateUrl: './program-data-popup.component.html'
})
export class ProgramDataPopupComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ProgramDataPopupComponent>,
    private dp: DatePipe
  ) {
    data.date.to = dp.transform(data.date.to, 'M/d/yy')
    data.date.from = dp.transform(data.date.from, 'M/d/yy')
  }
  ngOnInit() {
  }
}
