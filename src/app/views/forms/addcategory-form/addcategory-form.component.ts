import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { TablesService } from 'app/views/tables/tables.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from 'app/shared/services/dataservice.service';
import { ApiService } from 'app/shared/services/api.service.service';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBarConfig, MatSnackBar } from '@angular/material';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';

@Component({
  selector: 'app-addcategory-form',
  templateUrl: './addcategory-form.component.html',
  styleUrls: ['./addcategory-form.component.scss']
})
export class AddcategoryFormComponent implements OnInit {
  formData = {};
  categoryForm: FormGroup;
  FormData: any;
  submitted: boolean;
  usersData: any = {};
  responseData: any;
  category: any = {
    name: '',
    description: ''
  };
  message: string = 'Category Added Successfully !';
  action: boolean = true;
  setAutoHide: boolean = true;
  autoHide: number = 4000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private service: TablesService,
    public dataRoute: ActivatedRoute,
    private dataservice: DataService,
    private apiservice: ApiService,
    private snack: MatSnackBar,
    private route: Router,
    private loader: AppLoaderService) {
    // this.category = dataservice.getOption();
    // console.log('dataaa', this.category);
    let config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.setAutoHide ? this.autoHide : 0;
  }
  back() {
    this.route.navigate(['tables/category']);
  }

  addCategory() {
    this.loader.open();
    this.apiservice.addCategory(this.category).subscribe(res => {
      this.responseData = res;
      this.loader.close();
      if (this.responseData.isSuccess === true) {
        this.snack.open(this.message, 'OK', { duration: 4000 });
        this.route.navigate(['tables/category']);
      } else {
        let msg = "Something Went Wrong!"
        this.snack.open(msg, 'OK', { duration: 4000 });
      }
    });
  }
  ngOnInit() {
    this.categoryForm = new FormGroup({
      name: new FormControl('', Validators.required
        // Validators.minLength(4),
        // Validators.maxLength(9)
      ),

      description: new FormControl('', Validators.required),

    });
  }

  onSubmit() {

    this.submitted = true;
    return this.addCategory();
  }
}


