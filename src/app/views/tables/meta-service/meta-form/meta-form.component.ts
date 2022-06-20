import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { ApiService } from 'app/shared/services/api.service.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { KeywordFormComponent } from 'app/views/forms/keyword-form/keyword-form.component';

@Component({
  selector: 'app-meta-form',
  templateUrl: './meta-form.component.html',
  styleUrls: ['./meta-form.component.scss']
})
export class MetaFormComponent implements OnInit {
  metaForm: FormGroup;
  editData: boolean;
  submitted: boolean;
  providerResponse: any;
  message: string = 'Meta-service Added Successfully !';
  action: boolean = true;
  setAutoHide: boolean = true;
  autoHide: number = 4000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  isEmpty: any;
  metaData: any
  constructor(
    private apiservice: ApiService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<KeywordFormComponent>,
    private loader: AppLoaderService,
    private snack: MatSnackBar,
    private route: Router,
  ) {
    this.metaData = data;
    this.isEmpty = Object.keys(this.metaData).length === 0;
  }

  ngOnInit() {
    if (this.isEmpty) {
      this.editData = false;
    } else { this.editData = true }
    this.metaForm = new FormGroup({
      pageName: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      keywords: new FormControl('', Validators.required),
    });
  }
  addMetaService() {
    this.apiservice.addMetaService(this.metaForm.value).subscribe((res: any) => {
      if (res.isSuccess === true) {
        this.snack.open(this.message, 'OK', { duration: 7000 });
        this.dialogRef.close();
        this.route.navigate(['tables/meta-service']);
      } else {
        let msg = 'Somthing went wrong!';
        this.snack.open(msg, 'OK', { duration: 7000 });
      }
    })
  }
  updateMetaService() {
    this.apiservice.updateMetaService(this.metaData._id, this.metaData).subscribe((res: any) => {
      if (res.isSuccess === true) {
        this.dialogRef.close();
        this.snack.open('Data Updated', 'OK', { duration: 7000 });
        this.route.navigate(['tables/meta-service']);
      } else {
        let msg = 'Somthing went wrong!';
        this.snack.open(msg, 'OK', { duration: 7000 });
      }
    })
  }
  onSubmit() {
    this.submitted = true;
    if (this.editData) {
      this.updateMetaService();
    } else {
      this.addMetaService();
    }
  }
}
