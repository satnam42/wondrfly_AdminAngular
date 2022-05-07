
import { COMMA, ENTER, SEMICOLON } from '@angular/cdk/keycodes';
import { Component } from '@angular/core';
import { MatChipInputEvent, MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBarConfig, MatAutocompleteSelectedEvent } from '@angular/material';
import { Router } from '@angular/router';
import { DataService } from 'app/shared/services/dataservice.service';
import { ApiService } from 'app/shared/services/api.service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { environment } from 'environments/environment';

export interface Fruit {
  name: string;
  imagePath;
  imgURL: any;
  iconURL: any;
}

@Component({
  selector: 'app-tag-edit-table',
  templateUrl: './tag-edit-table.component.html',
  styleUrls: ['./tag-edit-table.component.scss']
})
export class TagEditTableComponent {
  logoFormData = new FormData();
  iconFormData = new FormData();
  imageFormData = new FormData();
  patternFormData = new FormData();
  iconMimeType;
  imageMimeType;
  logoMimeType
  patternMimeType
  submitted = false;
  updatetagForm: FormGroup;
  visible: boolean = true;
  selectable = "selectable"
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA, SEMICOLON];
  categoryCtrl = new FormControl();
  filteredCategories: Observable<any[]>;
  allCategories = [];
  tag: any = [];
  message: string = 'Tag Updated !';
  action: boolean = true;
  setAutoHide: boolean = true;
  autoHide: number = 4000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  categoryInput: any;
  tagResponse: any;
  iconURL:any
  imageURL:any
  logoURL:any
  patternURL:any
  baseURL = environment.baseURL
  // addExtraClass: boolean = false;
  constructor(private route: Router, private dataservice: DataService,
    private apiservice: ApiService,
    private snack: MatSnackBar,
    private loader: AppLoaderService
  ) {
    this.tag = dataservice.getOption();
    if(this.tag.icon){
      this.iconURL = this.baseURL+this.tag.icon
    }
    if(this.tag.image){
      this.imageURL = this.baseURL+this.tag.image
    }
    if(this.tag.logo){
      this.logoURL = this.baseURL+this.tag.logo
    }
    if(this.tag.pattern){
      this.patternURL = this.baseURL+this.tag.pattern
    }
       this.filteredCategories = this.categoryCtrl.valueChanges.pipe(
      startWith(null),
      map((category: string | null) => category ? this.filter(category) : this.allCategories.slice()));

    let config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.setAutoHide ? this.autoHide : 0;
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.tag.categoryIds.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.categoryCtrl.setValue(null);
  }

  remove(category: any): void {
    const index = this.tag.categoryIds.indexOf(category);

    if (index >= 0) {
      this.tag.categoryIds.splice(index, 1);
    }
  }

  filter(name: string) {
    return this.allCategories.filter(category =>
      category.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tag.categoryIds.push(event.option.value);
    this.categoryInput.nativeElement.value = '';
    this.categoryCtrl.setValue(null);
  }

  back() {
    this.route.navigate(['tables/tag']);

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
    console.log('iconMimeType',this.iconMimeType)
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
    console.log('imageMimeType',imageMimeType)    // if (mimeType.match(/image\/*/) == null) {
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
    console.log('logoMimeType',this.logoMimeType)
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
    console.log('patternMimeType',this.patternMimeType)
    // var mimeType = event.target.files[0].type;
    // if (mimeType.match(/image\/*/) == null) {
    //   // this.msg = " only images are supported";
    //   return;
    // }
    // -------------------------------------------------------------------------------

  }

  updateTag() {
    this.loader.open();
    if(this.imageFormData.has('image')){this.imageUpload()}
    if(this.iconFormData.has('icon')){this.iconUpload()}
    if(this.logoFormData.has('logo')){this.logoUpload()}
    if(this.patternFormData.has('pattern')){this.patternUpload()}
    this.apiservice.updateTag(this.tag._id, this.tag).subscribe(res => {
      this.tagResponse = res;
      this.loader.close(); if (this.tagResponse.isSuccess === true) {
        this.snack.open(this.message, 'OK', { duration: 4000 });
        this.route.navigate(['tables/tag']);

      } else {
        let msg = "Something Went Wrong!";
        this.snack.open(msg, 'OK', { duration: 4000 });
      }
    });

  }
  imageUpload(){
    this.apiservice.subCategoryImageUpload('tags',this.imageFormData,this.tag._id).subscribe(res => {
      console.log('imageUpload Response',res)
          });
  }
  iconUpload(){
    this.apiservice.subCategoryIconUpload('tags',this.iconFormData,this.tag._id).subscribe(res => {
      console.log('iconUpload Response',res)
          });
        }
  logoUpload(){
                this.apiservice.subCategoryLogoUpload('tags',this.logoFormData,this.tag._id).subscribe(res => {
                  console.log('logoUpload Response',res)
                      });
  }
  patternUpload(){
    this.apiservice.subCategoryPatternUpload('tags',this.patternFormData,this.tag._id).subscribe(res => {
      console.log('logoUpload Response',res)
          });
}
  ngOnInit() {
    this.apiservice.getCategory().subscribe(res => {
      this.allCategories = res;
    });
    this.updatetagForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    this.submitted = true;
    return this.updateTag();
  }

}

