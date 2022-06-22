import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Session } from 'app/shared/models/batch.model';
import * as moment from 'moment';
import { DataService } from 'app/shared/services/dataservice.service';
import { Program } from 'app/shared/models/program.model';
import { ApiService } from 'app/shared/services/api.service.service';

@Component({
  selector: 'update-batch-popup',
  templateUrl: './update-batch-popup.component.html'
})
export class UpdateBatchPopupComponent implements OnInit {
  public itemForm: FormGroup;
  // startDate = new Date;
  // endDate = new Date;
  batch = new Session;
  program = new Program;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<UpdateBatchPopupComponent>,
    private fb: FormBuilder,
    private apiservice: ApiService,
    private dataservice: DataService,
  ) {
    this.batch = data;
    this.program = dataservice.getOption();

  }

  updateBatch() {

    this.dialogRef.close();
    // this.batch.startDate = moment(this.startDate).format('MM-DD-YYYY');
    // this.batch.endDate = moment(this.endDate).format("MM-DD-YYYY");


    var batch: any;
    var response: any;
    let totalBatch = this.program.sessions.length - 1
    if (this.batch) {
      for (let i = 0; i <= totalBatch; i++) {
        batch = this.program.sessions[i];

        if (this.batch._id === batch._id) {
          this.program.sessions[i] = this.batch;
        }
      }
    }

    this.apiservice.updateProgram(this.program._id, this.program).subscribe(res => {
      response = res;

      if (response.isSuccess === true) {

      } else {
        // this.snack.open(this.updateProgramResponse.error, 'OK', { duration: 5000 });
      }
    });

  }



  ngOnInit() {
    // let data = this.dataservice.getOption();
    // if (data) {
    //   this.sessions = data
    // }


    // this.buildItemForm(this.data.payload)
  }
  // buildItemForm(item) {
  //   this.itemForm = this.fb.group({
  //     name: [item.name || '', Validators.required],
  //     age: [item.age || ''],
  //     email: [item.email || ''],
  //     company: [item.company || ''],
  //     phone: [item.phone || ''],
  //     address: [item.address || ''],
  //     balance: [item.balance || ''],
  //     isActive: [item.isActive || false]
  //   })
  // }
  submit() {
    // this.dialogRef.close();
    // this.batch.startDate = moment(this.startDate).format('MM-DD-YYYY');
    // this.batch.endDate = moment(this.endDate).format("MM-DD-YYYY");
    this.updateBatch();

    // or
    // this.dialogRef.close(this.itemForm.value)
  }
}
