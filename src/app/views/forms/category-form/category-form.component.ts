import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { TablesService } from 'app/views/tables/tables.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from 'app/shared/services/dataservice.service';
import { ApiService } from 'app/shared/services/api.service.service';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBarConfig, MatSnackBar } from '@angular/material';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { Category } from 'app/shared/models/category.model';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {
  formData = {};
  categoryForm: FormGroup;
  FormData: any;
  submitted: boolean;
  usersData: any = {};
  responseData: any;
  res: any[];
  category: any = [];
  baseURL = environment.baseURL
  imgResponse: any;
  fileData: File = null;
  msg: string;
  message: string = 'Category Updated Successfully!';
  // actionButtonLabel: string = 'Retry';
  action: boolean = true;
  setAutoHide: boolean = true;
  autoHide: number = 4000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  categoryResponse: any;

  // addExtraClass: boolean = false;

  iconURL: any
  imageURL: any
  logoURL: any
  patternURL: any
  logoFormData = new FormData();
  iconFormData = new FormData();
  imageFormData = new FormData();
  patternFormData = new FormData();
  iconMimeType;
  imageMimeType;
  logoMimeType
  patternMimeType
  constructor(private service: TablesService,
    public dataRoute: ActivatedRoute,
    private dataservice: DataService,
    private apiservice: ApiService,
    private snack: MatSnackBar,
    private route: Router,
    private loader: AppLoaderService) {
    this.category = this.dataservice.getOption();
    if (this.category.iconUrl) {
      this.iconURL = this.baseURL + this.category.iconUrl
    }
    if (this.category.imageUrl) {
      this.imageURL = this.baseURL + this.category.imageUrl
    }
    if (this.category.logoUrl) {
      this.logoURL = this.baseURL + this.category.logoUrl
    }
    if (this.category.pattern) {
      this.patternURL = this.baseURL + this.category.pattern
    }

    let config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.setAutoHide ? this.autoHide : 0;
    // config.extraClasses = this.addExtraClass ? ['test'] : undefined;
  }
  back() {
    this.route.navigate(['tables/category']);
  }

  updateCategory() {
    this.loader.open();
    if (this.imageFormData.has('image')) { this.imageUpload() }
    if (this.iconFormData.has('icon')) { this.iconUpload() }
    if (this.logoFormData.has('logo')) { this.logoUpload() }
    if (this.patternFormData.has('pattern')) { this.patternUpload() }
    this.apiservice.updateCategory(this.category.id, this.category).subscribe(res => {
      this.loader.close();
      this.categoryResponse = res;
      if (this.categoryResponse.isSuccess === true) {
        this.loader.close();
        this.snack.open(this.message, 'OK', { duration: 4000 })
        this.route.navigate(['tables/category']);
      } else {
        this.loader.close();
        let msg = "Something Went Wrong";
        this.snack.open(msg, 'OK', { duration: 4000 })
      }
    });

  }
  imageUpload() {
    this.apiservice.categoryImageUpload(this.imageFormData, this.category.id).subscribe(res => {
    });
  }
  iconUpload() {
    this.apiservice.subCategoryIconUpload('categories', this.iconFormData, this.category.id).subscribe(res => {
    });
  }
  logoUpload() {
    this.apiservice.subCategoryLogoUpload('categories', this.logoFormData, this.category.id).subscribe(res => {
    });
  }
  patternUpload() {
    this.apiservice.subCategoryPatternUpload('categories', this.patternFormData, this.category.id).subscribe(res => {
    });
  }



  iconSelect(event) {
    this.iconFormData = new FormData();
    let iconFileData = event.target.files[0];
    this.iconFormData.append('icon', iconFileData);


    // --------------------preview image before upload ------------------------

    if (event.target.files.length === 0)
      return;
    var reader = new FileReader();
    // this.iconPath = event.target.files;
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.iconURL = reader.result;
    }
    this.iconMimeType = event.target.files[0].type;
    // if (iconMimeType.match(/image\/*/) == null) {
    //   // this.msg = " only images are supported";
    //   return;
    // }
    // -------------------------------------------------------------------------------

  }

  imageSelect(event) {
    this.imageFormData = new FormData();
    let imageFileData = event.target.files[0];
    this.imageFormData.append('image', imageFileData);


    // --------------------preview image before upload ------------------------

    if (event.target.files.length === 0)
      return;
    var reader = new FileReader();
    // this.iconPath = event.target.files;
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.imageURL = reader.result;
    }
    var imageMimeType = event.target.files[0].type;
    //   // this.msg = " only images are supported";
    //   return;
    // }
    // -------------------------------------------------------------------------------

  }
  logoSelect(event) {
    this.logoFormData = new FormData();
    let logoFileData = event.target.files[0];
    this.logoFormData.append('logo', logoFileData);


    // --------------------preview image before upload ------------------------

    if (event.target.files.length === 0)
      return;
    var reader = new FileReader();
    // this.iconPath = event.target.files;
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.logoURL = reader.result;
    }
    this.logoMimeType = event.target.files[0].type;
    // if (mimeType.match(/image\/*/) == null) {
    //   // this.msg = " only images are supported";
    //   return;
    // }
    // -------------------------------------------------------------------------------

  }

  patternSelect(event) {
    this.patternFormData = new FormData();
    let patternFileData = event.target.files[0];
    this.patternFormData.append('pattern', patternFileData);


    // --------------------preview image before upload ------------------------

    if (event.target.files.length === 0)
      return;
    var reader = new FileReader();
    // this.iconPath = event.target.files;
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.patternURL = reader.result;
    }
    this.patternMimeType = event.target.files[0].type;
    // var mimeType = event.target.files[0].type;
    // if (mimeType.match(/image\/*/) == null) {
    //   // this.msg = " only images are supported";
    //   return;
    // }
    // -------------------------------------------------------------------------------

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
    return this.updateCategory();
  }
}


