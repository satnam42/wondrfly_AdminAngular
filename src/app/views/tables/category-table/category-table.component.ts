import { Component, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';
import { DataService } from 'app/shared/services/dataservice.service';
import { ApiService } from 'app/shared/services/api.service.service';
import { AppLoaderService } from '../../../shared/services/app-loader/app-loader.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBarConfig, MatSnackBar, MatDialogRef, MatDialog } from '@angular/material';
import { DataPopupComponent } from '../data-popup/data-popup.component';
import { Category } from 'app/shared/models/category.model';
import { environment } from 'environments/environment.prod';


@Component({
  selector: 'app-category-table',
  templateUrl: './category-table.component.html',
  styleUrls: ['./category-table.component.scss']
})
export class CategoryTableComponent implements OnInit {
  baseUrl = environment.baseURL
  categoryForm: FormGroup;
  CategoriesList = [];
  ColumnMode = ColumnMode;
  searchText: '';
  temp = [];
  message: string = 'Category Added Successfully !';
  responseData: any;
  category = new Category

  imgResponse: any;
  fileData: File = null;
  msg: string;
  imagePath;
  imgURL: any;

  iconURL:any
  imageURL:any
  logoURL:any
  patternURL:any
  logoFormData = new FormData();
  iconFormData = new FormData();
  imageFormData = new FormData();
  patternFormData = new FormData();
  iconMimeType;
  imageMimeType;
  logoMimeType
  patternMimeType



  constructor(private route: Router, private dialog: MatDialog, private dataservice: DataService, private loader: AppLoaderService,
    private snack: MatSnackBar,
    private apiservice: ApiService,) { }

  edit(data) {
    this.dataservice.setOption(data);
    this.route.navigate(['forms/category']);
  }

  addCategory() {
    this.loader.open();
    this.apiservice.addCategory(this.category).subscribe(res => {
      this.loader.close();
      this.responseData = res;
      if (this.responseData.isSuccess === true) {
        this.categoryForm.reset();
        let id = this.responseData.data._id
        console.log('add cat res',this.responseData)
        if(this.imageFormData.has('image')){this.imageUpload(id)}
        if(this.iconFormData.has('icon')){this.iconUpload(id)}
        if(this.logoFormData.has('logo')){this.logoUpload(id)}
        if(this.patternFormData.has('pattern')){this.patternUpload(id)}
        this.getCategory();
        this.snack.open(this.message, 'OK', { duration: 4000 });
        this.route.navigate(['tables/category']);
      } else {
        this.loader.close();
        let msg = "Something Went Wrong!"
        this.snack.open(msg, 'OK', { duration: 4000 });
      }
    });
    this.loader.close();
  }


  // fileSelect(event) {
  //   let formData = new FormData();
  //   this.fileData = event.target.files[0];
  //   formData.append('image', this.fileData);
  //   this.loader.open();
  //   this.apiservice.getPicUrl(formData).subscribe(res => {
  //     this.imgResponse = res;
  //     this.loader.close();
  //     if (this.imgResponse.isSuccess === true) {
  //       this.category.imageUrl = this.imgResponse.data;


  //     } else {
  //       let msg = "Something Went Wrong!";
  //       this.snack.open(msg, 'OK', { duration: 4000 });

  //     }
  //   });

  //   // --------------------preview image before upload ------------------------

  //   if (event.target.files.length === 0)
  //     return;
  //   var reader = new FileReader();
  //   this.imagePath = event.target.files;
  //   reader.readAsDataURL(event.target.files[0]);
  //   reader.onload = (_event) => {
  //     this.imgURL = reader.result;
  //   }
  //   var mimeType = event.target.files[0].type;
  //   if (mimeType.match(/image\/*/) == null) {
  //     this.msg = " only images are supported";
  //     return;
  //   }
  //   // -------------------------------------------------------------------------------

  // }


  // iconSelect(event) {
  //   let formData = new FormData();
  //   this.fileData = event.target.files[0];
  //   formData.append('image', this.fileData);
  //   this.loader.open();
  //   this.apiservice.getPicUrl(formData).subscribe(res => {
  //     this.imgResponse = res;
  //     this.loader.close();
  //     if (this.imgResponse.isSuccess === true) {
  //       this.category.iconUrl = this.imgResponse.data;


  //     } else {
  //       let msg = "Something Went Wrong!";
  //       this.snack.open(msg, 'OK', { duration: 4000 });

  //     }
  //   });

  //   // --------------------preview image before upload ------------------------

  //   if (event.target.files.length === 0)
  //     return;
  //   var reader = new FileReader();
  //   this.imagePath = event.target.files;
  //   reader.readAsDataURL(event.target.files[0]);
  //   reader.onload = (_event) => {
  //     this.iconURL = reader.result;
  //   }
  //   var mimeType = event.target.files[0].type;
  //   if (mimeType.match(/image\/*/) == null) {
  //     this.msg = " only images are supported";
  //     return;
  //   }
  //   // -------------------------------------------------------------------------------

  // }



  deleteCategory(category) {
    var response: any;
    this.loader.open();
    this.apiservice.deleteCategory(category.id).subscribe(res => {
      this.loader.close();
      response = res;
      this.getCategory();
      if (response.isSuccess === true) {
        this.loader.close();
        this.getCategory();
      }
      this.loader.close();
    })
  }

  add() {
    this.route.navigate(['forms/add-category']);
  }

  getCategory() {
    this.loader.open();
    this.apiservice.getCategory().subscribe(res => {
      this.loader.close();
      this.CategoriesList = res;
      console.log('==>>',this.CategoriesList.sort((a,b) => 0 - (a.name > b.name ? -1 : 1)))
    });
    this.loader.close();
  }
  activateDeactivateCategory(isActivated,indx)
  {
if(isActivated)
{
 this.CategoriesList[indx].isActivated=isActivated
}
else { this.CategoriesList[indx].isActivated=isActivated }
    this.apiservice.activateDeactivateCategory(isActivated,this.CategoriesList[indx].id).subscribe((res: any) => {
      
    })
  }
  ngOnInit() {
    this.getCategory();
    this.CategoriesList;
    this.categoryForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
  }

  imageUpload(id){
    this.apiservice.categoryImageUpload(this.imageFormData,id).subscribe(res => {
      console.log('imageUpload Response',res)
          });this.imageFormData=new FormData();
  }
  iconUpload(id){
    this.apiservice.subCategoryIconUpload('categories',this.iconFormData,id).subscribe(res => {
      console.log('iconUpload Response',res)
          });this.iconFormData=new FormData();
        }
  logoUpload(id){
                this.apiservice.subCategoryLogoUpload('categories',this.logoFormData,id).subscribe(res => {
                  console.log('logoUpload Response',res)
                      });this.logoFormData=new FormData();
  }
  patternUpload(id){
    this.apiservice.subCategoryPatternUpload('categories',this.patternFormData,id).subscribe(res => {
      console.log('logoUpload Response',res)
          });this.patternFormData=new FormData();
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

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    if (this.CategoriesList.length > 1) {
      var columns = Object.keys(this.CategoriesList[0]);
      columns.splice(columns.length - 1);
      if (!columns.length)
        return;

      const CategoriesList = this.temp.filter(function (d) {
        for (let i = 0; i <= columns.length; i++) {
          let column = columns[i];
          if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) {
            return true;
          }
        }
      });
      this.CategoriesList = CategoriesList;
    }
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
}
