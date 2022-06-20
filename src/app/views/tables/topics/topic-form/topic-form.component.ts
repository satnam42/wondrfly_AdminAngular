import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { ApiService } from 'app/shared/services/api.service.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { KeywordFormComponent } from 'app/views/forms/keyword-form/keyword-form.component';
@Component({
  selector: 'app-topic-form',
  templateUrl: './topic-form.component.html',
  styleUrls: ['./topic-form.component.scss']
})
export class TopicFormComponent implements OnInit {
  topicForm: FormGroup;
  editData: boolean;
  submitted: boolean;
  providerResponse: any;
  message: string = 'Keyword Added Successfully !';
  action: boolean = true;
  setAutoHide: boolean = true;
  autoHide: number = 4000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  isEmpty: any;
  topicData: any
  constructor(
    private apiservice: ApiService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<KeywordFormComponent>,
    private loader: AppLoaderService,
    private snack: MatSnackBar,
    private route: Router,
  ) {
    this.topicData = data;
    this.isEmpty = Object.keys(this.topicData).length === 0;
  }

  ngOnInit() {
    if (this.isEmpty) {
      this.editData = false;
    } else { this.editData = true }
    this.topicForm = new FormGroup({
      Name: new FormControl('', Validators.required),
      url: new FormControl('', Validators.required),
    });
  }
  addTopic() {
    this.apiservice.addSearchTopic(this.topicForm.value).subscribe((res: any) => {
      if (res.isSuccess === true) {
        this.snack.open(this.message, 'OK', { duration: 7000 });
        this.dialogRef.close();
        this.route.navigate(['tables/topics']);
      } else {
        let msg = 'Somthing went wrong!';
        this.snack.open(msg, 'OK', { duration: 7000 });
      }
    })
  }
  updateTopic() {
    this.apiservice.updateSearchTopic(this.topicData._id, this.topicData).subscribe((res: any) => {
      if (res.isSuccess === true) {
        this.dialogRef.close();
        this.snack.open(this.message, 'OK', { duration: 7000 });
        this.route.navigate(['tables/topics']);
      } else {
        let msg = 'Somthing went wrong!';
        this.snack.open(msg, 'OK', { duration: 7000 });
      }
    })
  }



  onSubmit() {
    this.submitted = true;
    if (this.editData) {
      this.updateTopic();
    } else {
      this.addTopic();
    }
  }
}
