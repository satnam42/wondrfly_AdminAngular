import { Component, OnInit, Output, ɵConsole, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'app/shared/services/dataservice.service';
import { ApiService } from 'app/shared/services/api.service.service';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBarConfig, MatSnackBar, MatAutocompleteSelectedEvent } from '@angular/material';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';


@Component({
  selector: 'app-update-activity',
  templateUrl: './update-activity.component.html',
  styleUrls: ['./update-activity.component.scss']
})
export class UpdateActivityComponent implements OnInit {
  activity: any;
  userResponse: any;
  message = "Activity Updated Succesfully";
  activityForm: FormGroup;

  constructor(
    public route: Router,
    private snack: MatSnackBar,
    private apiservice: ApiService,
    private loader: AppLoaderService,
    private dataService: DataService,
  ) {
    this.activity = dataService.getOption();
   
  }

  ngOnInit() {
    this.activityForm = new FormGroup({
      point: new FormControl('', Validators.required),
      activity: new FormControl('', Validators.required),
    });
  }
 
  onSubmit() {
    this.loader.open();
    this.apiservice.updateActivity(this.activity).subscribe(res => {
      this.userResponse = res;
      console.log('response ', this.userResponse)
      this.loader.close();
      if (this.userResponse.isSuccess === true) {
        this.snack.open(this.message, 'OK', { duration: 4000 })
        this.route.navigate(['tables/ambassadorList']);
      } else {
        let msg = "Something Went Wrong";
        this.snack.open(msg, 'OK', { duration: 2000 })
      }
    });
  }
  back(){
    this.route.navigateByUrl('tables/ambassadorList')
  } 
}
