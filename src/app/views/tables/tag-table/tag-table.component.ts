import { Component, OnInit, ElementRef } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { COMMA, ENTER, SEMICOLON } from '@angular/cdk/keycodes';
import { Router } from '@angular/router';
import { DataService } from 'app/shared/services/dataservice.service';
import { ApiService } from 'app/shared/services/api.service.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { DataPopupComponent } from '../data-popup/data-popup.component';
import { MatDialogRef, MatDialog, MatSnackBar, MatSnackBarVerticalPosition, MatSnackBarHorizontalPosition, MatAutocompleteSelectedEvent, MatSnackBarConfig, MatChipInputEvent } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { environment } from 'environments/environment.prod';


@Component({
  selector: 'app-tag-table',
  templateUrl: './tag-table.component.html',
  styleUrls: ['./tag-table.component.scss']
})
export class TagTableComponent implements OnInit {
  baseUrl = environment.baseURL
  tagsList = [];
  categoryI = [];
  ColumnMode = ColumnMode;
  tag: any;
  searchText: '';
  allCategories = [];
  categoryInput: ElementRef;
  addtag = {
    name: '',
    description: '',
    categoryIds: []

  }
  categoryData: any[] = [];

  tagForm: FormGroup;
  submitted: boolean = false;
  visible: boolean = true;
  selectable = "selectable"
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA, SEMICOLON];
  categoryCtrl = new FormControl();
  filteredCategories: Observable<any[]>;
  message: string = 'Tag Added ';
  messages: string = 'Tag Deleted Succesfully';
  action: boolean = true;
  setAutoHide: boolean = true;
  autoHide: number = 4000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  tagResponse: any;
  temp = []
  isLoading: boolean;
  rows: any;
  logoFormData = new FormData();
  iconFormData = new FormData();
  imageFormData = new FormData();
  patternFormData = new FormData();
  iconMimeType;
  imageMimeType;
  logoMimeType
  patternMimeType
  iconURL: any
  imageURL: any
  logoURL: any
  patternURL: any
  constructor(private route: Router,
    private snack: MatSnackBar,
    private loader: AppLoaderService,
    private dataservice: DataService, private dialog: MatDialog,
    private apiservice: ApiService
  ) {
    this.filteredCategories = this.categoryCtrl.valueChanges.pipe(
      startWith(null),
      map((category: string | null) => category ? this.filter(category) : this.allCategories.slice()));

    let config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.setAutoHide ? this.autoHide : 0;
  }

  edit(data) {
    this.dataservice.setOption(data);
    this.route.navigate(['tables/edit-tag']);
  }

  add() {
    this.route.navigate(['tables/add-tag']);
  }


  // view data 
  openPopUp(data) {
    let dialogRef: MatDialogRef<any> = this.dialog.open(DataPopupComponent, {
      width: '60%',
      disableClose: true,
      data: data,
      // this.name: this.data.firstName
    })
    dialogRef.afterClosed()
      .subscribe(res => {
        if (!res) {
          return;
        }
      });
  }

  getTag() {
    this.loader.open();
    this.apiservice.getTag().subscribe(res => {
      this.temp = res;
      this.tagsList = this.temp;
      this.tagsList = this.tagsList.sort((a, b) => 0 - (a.name > b.name ? -1 : 1));
      this.loader.close();
    });
  }

  updateFilter(key) {
    var response: any;
    if (key) {
      this.apiservice.searchTag(key).subscribe((res: any) => {
        this.rows = [];
        response = res;
        this.rows = response;
      });
    }
    if (!key) {
      this.getTag();
    }
  }
  activateDeactivate(data, tag) {
    let tagId = tag._id;
    let status = data.checked
    this.apiservice.activateDeactivateTag(tagId, status).subscribe((res: any) => {
    })
  }

  ngOnInit() {
    this.getTag();
    this.tagsList;
    this.apiservice.getCategory().subscribe(res => {
      this.allCategories = res;
    });
    this.tagForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      categoryIds: new FormControl([], Validators.required),
    });
  }

  adds(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add our fruit
    if ((value || '').trim()) {
      this.addtag.categoryIds.push(value.trim());
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.categoryCtrl.setValue(null);

  }

  remove(category: any): void {
    const index = this.addtag.categoryIds.indexOf(category);

    if (index >= 0) {
      this.addtag.categoryIds.splice(index, 1);
    }
  }

  filter(name: string) {
    return this.allCategories.filter(category =>
      category.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.addtag.categoryIds.push(event.option.value);
    this.categoryInput.nativeElement.value = '';
    this.categoryCtrl.setValue(null);
  }

  deleteTag(data) {
    this.loader.open();
    this.isLoading = true;
    this.apiservice.deleteTags(data._id).subscribe(res => {
      var response: any = res;
      if (response.isSuccess === true) {
        this.loader.close();
        this.snack.open(this.messages, 'OK', { duration: 4000 });
        this.getTag();

      } else {
        this.loader.close();
        let msg = "Something Went Wrong!";
        this.snack.open(msg, 'OK', { duration: 4000 });
      }
    })
  }
  // add tags function

  onSubmit() {
    var CategoryId = this.tagForm.value.categoryIds;
    this.categoryData.push(CategoryId)
    let body = {
      name: this.tagForm.value.name,
      description: this.tagForm.value.description,
      categoryIds: this.categoryData,
    }
    this.submitted = true;
    this.loader.open();
    this.apiservice.addTag(body).subscribe((res) => {
      this.tagResponse = res;
      this.loader.close();
      let id = this.tagResponse.data._id;
      if (this.tagResponse.isSuccess) {
        if (this.imageFormData.has('image')) { this.imageUpload(id) }
        if (this.iconFormData.has('icon')) { this.iconUpload(id) }
        if (this.logoFormData.has('logo')) { this.logoUpload(id) }
        if (this.patternFormData.has('pattern')) { this.patternUpload(id) }
        this.snack.open(this.message, 'OK', { duration: 4000 });
        this.getTag();
      } else {
        this.snack.open(this.tagResponse.error, 'OK', { duration: 4000 });
      }
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
  imageUpload(id) {
    this.apiservice.subCategoryImageUpload('tags', this.imageFormData, id).subscribe(res => {
    });
  }
  iconUpload(id) {
    this.apiservice.subCategoryIconUpload('tags', this.iconFormData, id).subscribe(res => {
    });
  }
  logoUpload(id) {
    this.apiservice.subCategoryLogoUpload('tags', this.logoFormData, id).subscribe(res => {
    });
  }
  patternUpload(id) {
    this.apiservice.subCategoryPatternUpload('tags', this.patternFormData, id).subscribe(res => {
    });
  }

  // updateFilter(event) {
  //   const val = event.target.value.toLowerCase();
  //   var columns = Object.keys(this.temp[0]);
  // Removes last "$$index" from "column"
  // columns.splice(columns.length - 1);
  // console.log(columns);
  // if (!columns.length)
  //   return;
  // const rows = this.temp.filter(function (d) {
  //   for (let i = 0; i <= columns.length; i++) {
  //     let column = columns[i];
  // console.log(d[column]);
  //       if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) {
  //         return true;
  //       }
  //     }
  //   });
  //   this.tagsList = rows;
  // }
  changeItem(event) {

  }

}



