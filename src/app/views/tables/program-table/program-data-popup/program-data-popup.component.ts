import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Session } from 'app/shared/models/batch.model';
import * as moment from 'moment';
import { DataService } from 'app/shared/services/dataservice.service';
import { ApiService } from 'app/shared/services/api.service.service';
import { Userr } from 'app/shared/models/user.model';

@Component({
  selector: 'program-data-popup',
  templateUrl: './program-data-popup.component.html'
})
export class ProgramDataPopupComponent implements OnInit {
  public itemForm: FormGroup;
  provider = new Userr;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ProgramDataPopupComponent>,
    private fb: FormBuilder,
    private apiservice: ApiService
  ) { }

  getProviderById() {
    var response: any;
    this.apiservice.getProviderById(this.data.user).subscribe((res) => {
      response = res;
      console.log('provider detail', response);

      if (response.isSuccess) {
        this.provider = response.data;
      }
    });

  }
  ngOnInit() {
    this.getProviderById();

  }
}
