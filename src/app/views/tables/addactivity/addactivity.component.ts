import { Component, OnInit, Output, ɵConsole, EventEmitter, Input } from '@angular/core';
import { TablesService } from '../tables.service';
import { Router } from '@angular/router';
import { ApiService } from 'app/shared/services/api.service.service';
import { AppLoaderService } from '../../../shared/services/app-loader/app-loader.service';
import { DataService } from 'app/shared/services/dataservice.service';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar, MatSnackBarConfig, MatDialogRef, MatDialog } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Userr } from 'app/shared/models/user.model';
@Component({
  selector: 'app-addactivity',
  templateUrl: './addactivity.component.html',
  styleUrls: ['./addactivity.component.scss']
})
export class AddactivityComponent implements OnInit {
  activityForm: FormGroup;
  message: string = 'Activity Adjusted Successfully!';
  activity: any;
  ambassadorId: string;
  ForumResponse: any;
  adjust: any = new Userr;
  constructor(
    public route: Router,
    private snack: MatSnackBar,
    private apiservice: ApiService,
    private loader: AppLoaderService,
    private dataService: DataService,
    private dialog: MatDialog,
  ) {
    this.adjust = dataService.getOption();
    console.log('jagga ', this.adjust);

  }
  ngOnInit() {
    this.activityForm = new FormGroup({
      // ambassadorId: new FormControl(''),
      point: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      activity: new FormControl('', Validators.required),
    })
  }

  Activity() {
    const simar: any = {
      ambassadorId: this.adjust._id,
      point : this.activityForm.value.point,
      description : this.activityForm.value.description,
      activity : this.activityForm.value.activity,

}
    this.apiservice.addAdjust(simar).subscribe(res => {
      this.ForumResponse = res;
      console.log('response ', this.ForumResponse)
      this.loader.close();
      if (this.ForumResponse.statusCode == 200) {
        this.snack.open(this.message, 'OK', { duration: 4000 })
        this.route.navigate(['tables/ambassadors']);
      } else {
        let msg = "Activity Name Already Exists";
        this.snack.open(msg, 'OK', { duration: 2000 })
      }
    });
  }
}
