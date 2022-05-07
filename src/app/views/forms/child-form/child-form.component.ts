import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { TablesService } from 'app/views/tables/tables.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from 'app/shared/services/dataservice.service';
import { ApiService } from 'app/shared/services/api.service.service';
import { MatSnackBarConfig, MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, throwMatDuplicatedDrawerError } from '@angular/material';
import { Child } from 'app/shared/models/child.model';
import { Userr } from 'app/shared/models/user.model';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';

@Component({
  selector: 'app-child-form',
  templateUrl: './child-form.component.html',
  styleUrls: ['./child-form.component.scss']
})
export class ChildFormComponent implements OnInit {
  formData = {};
  childForm: FormGroup;

  child: any = new Child;
  FormData: any;
  submitted: boolean;
  usersData: any = {};
  responseData: any;
  res: any[];

  user: any = new Userr;
  message: string = 'Child/Children Updated !';
  // actionButtonLabel: string = 'Retry';
  action: boolean = true;
  setAutoHide: boolean = true;
  autoHide: number = 4000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  user_id: any;

  // addExtraClass: boolean = false;



  constructor(private service: TablesService,
    public dataRoute: ActivatedRoute,
    private dataservice: DataService,
    private apiservice: ApiService,
    private snack: MatSnackBar,
    private route: Router,
    private loader: AppLoaderService,
    private activatedRoute: ActivatedRoute) {
    this.child = dataservice.getOption();
    this.activatedRoute.params.subscribe(params => {
      this.user._id = params['id'];
    });
    let config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.setAutoHide ? this.autoHide : 0;


  }
  back() {
    this.route.navigate(['profile/child',this.user._id]);
  }

  ngOnInit() {
    this.child;
    this.childForm = new FormGroup({
      name: new FormControl('', [
      ]),
      lname: new FormControl('', [
      ]),
      age: new FormControl('', [
      ]),
      sex: new FormControl('',),
      info: new FormControl('', [
      ]),

    });
  }


  updateChild() {
    var response: any;
    if (this.child._id) {
      this.loader.open();
      this.apiservice.updateChild(this.child._id, this.child).subscribe(res => {
        response = res;
        this.loader.close();
        if (response.isSuccess === true) {
          // this.child = response.data;
          this.dataservice.setOption(this.user);
          this.snack.open(this.message, 'OK', { duration: 4000 });
          this.route.navigateByUrl('/profile', { skipLocationChange: true }).then(() => {
            this.route.navigate(['profile/child',this.user._id]);
          })

        } else {
          this.snack.open(response.error, 'OK', { duration: 4000 });
        }
      });
    } else {
      if (this.child.name, this.child.age, this.child.sex) {
        this.child.parentId = this.user._id;
        this.loader.close();
        this.apiservice.addChild(this.child).subscribe(res => {
          response = res;
          this.loader.close();
          if (response.isSuccess === true) {
            let msg = 'child added !';
            this.dataservice.setOption(this.user);
            this.snack.open(msg, 'OK', { duration: 4000 });
            this.route.navigateByUrl('/profile', { skipLocationChange: true }).then(() => {
              this.route.navigate(['profile/child',this.user._id]);
            })

          } else {
            this.snack.open('', response.error, { duration: 4000 });
          }
        });
      } else {
        let msg = 'please fill required fields!';
        this.snack.open(msg, 'OK', { duration: 4000 });
      }
    }

  }



  onSubmit() {
    this.submitted = true;
    return this.updateChild();
  }
}


