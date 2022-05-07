import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Session } from 'app/shared/models/batch.model';
import * as moment from 'moment';
import { DataService } from 'app/shared/services/dataservice.service';

@Component({
  selector: 'provider-data-popup',
  templateUrl: './provider-data-popup.component.html'
})
export class ProviderDataPopupComponent implements OnInit {
  public itemForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ProviderDataPopupComponent>,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {

  }
}
