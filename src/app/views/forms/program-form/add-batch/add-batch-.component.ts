import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Session } from 'app/shared/models/batch.model';
import * as moment from 'moment';
import { DataService } from 'app/shared/services/dataservice.service';

@Component({
  selector: 'add-batch',
  templateUrl: './add-batch.component.html'
})
export class AddBatchComponent implements OnInit {
  public itemForm: FormGroup;
  tags: any = [];
  tag: any = [];
  sessions: any = [];
  startDate = new Date;
  endDate = new Date;
  startTime = new Date;
  endTime = new Date;
  batch = new Session;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddBatchComponent>,
    private fb: FormBuilder,
    private dataservice: DataService,
  ) { }

  addBatch() {
    this.sessions.push(this.batch);
    this.dataservice.setOption(this.sessions);
    this.batch = new Session;
  }

  ngOnInit() {
    let data = this.dataservice.getOption();
    if (data.length) {
      this.sessions = data
    }
  }
  submit() {
    this.dialogRef.close();
    this.batch.sessionStartTime = moment(new Date(this.startTime)).format('MM-DD-YYYY HH:mm:ss');
    this.batch.sessionEndTime = moment(new Date(this.endTime)).format('MM-DD-YYYY HH:mm:ss');
    this.batch.sessionStartDate = moment(new Date(this.startDate)).format('MM-DD-YYYY');
    this.batch.sessionEndDate = moment(new Date(this.endDate)).format("MM-DD-YYYY");
    this.addBatch();

  }
}
