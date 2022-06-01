import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatDialog, MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { Category } from 'app/shared/models/category.model';
import { ApiService } from 'app/shared/services/api.service.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { DataService } from 'app/shared/services/dataservice.service';
import * as moment from 'moment';
import { Options } from 'ng5-slider';
import { map } from 'rxjs-compat/operator/map';

@Component({
  selector: 'app-keyword-form',
  templateUrl: './keyword-form.component.html',
  styleUrls: ['./keyword-form.component.scss']
})
export class KeywordFormComponent implements OnInit {
  editKeyword: FormGroup;
  editData: boolean;
  submitted: boolean;
  providerResponse: any;
  message: string = 'Keyword Added Successfully !';
  action: boolean = true;
  setAutoHide: boolean = true;
  autoHide: number = 4000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  keywordForm: any = {};
  keywordFormbody = {
    keywordName: "",
    keywordType: "",
    keywordValue: [
    ]
  }
  daysValue: any = []
  timeValue: any = []
  typeValue: any = []
  formatValue: any = []
  days: any =
    {
      sunday: false,
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
    }
  minAge: number = 3;
  maxAge: number = 10;
  dateFrom: Date
  dateTo: Date
  ageOption: Options = {
    floor: 0,
    ceil: 15,
    step: 0.5,
    translate: (value: number): string => {
      return value + ' YRS';
    }
  };
  minPrice: number = 50;
  maxPrice: number = 300;
  priceOption: Options = {
    floor: 0,
    ceil: 800,
    translate: (value: number): string => {
      return '$' + value;
    }
  };

  minRating: number = 0;
  maxRating: number = 4;
  ratingOption: Options = {
    floor: 0,
    ceil: 5,
    step: 0.5,
    translate: (value: number): string => {
      return '' + value;
    }
  };

  keywordValue: any = [];
  isEmpty: any;
  categories: any = []
  subcategories: any = []
  selectedSubCategories: any = []
  selectedCategory: any = {}
  selectedCategoryIndx = -1
  constructor(
    private apiservice: ApiService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<KeywordFormComponent>,
    private dataservice: DataService,
    private loader: AppLoaderService,
    private snack: MatSnackBar,
    private route: Router,
  ) {
    this.keywordForm = data;
    this.isEmpty = Object.keys(this.keywordForm).length === 0;
    console.log('datttttta', this.keywordForm)
  }

  getCategory() {
    this.apiservice.getCategory().subscribe(res => {
      this.loader.close();
      this.categories = res;
      // this.categories.sort((a,b) => 0 - (a.name > b.name ? -1 : 1)) 
    });
  }
  pushCategory(e, indx) {
    const index = this.selectedSubCategories.indexOf(this.subcategories[indx]._id)
    if (e.checked) {
      if (index === -1) {
        this.selectedSubCategories.push(this.subcategories[indx]._id)
      }
    }
    else {
      if (index >= 0) {
        this.selectedSubCategories.splice(index, 1)
      }
    }

  }
  getTag(e, category) {
    console.log(e.checked)
    if (e.checked) {
      this.selectedCategory = category
      this.loader.open();
      this.apiservice.getTagByCategoryId(category.id).subscribe((res: any) => {
        this.subcategories = res.data
        this.subcategories = this.subcategories.filter((item) => item.isActivated === true && item.programCount);
        this.loader.close();
      });
    }
    else {
      this.selectedSubCategories = []
      this.selectedCategory = {}
      this.subcategories = []
    }

  }
  ngOnInit() {
    this.getCategory()
    if (this.isEmpty) {
      this.editData = false;
    } else {
      this.editData = true;
      switch (this.keywordForm.keywordType) {
        case 'age':
          this.minAge = this.keywordForm.keywordValue[0].from;
        this.maxAge = this.keywordForm.keywordValue[0].to;
          break;
        case 'category':
         
          this.selectedCategory.id = this.keywordForm.keywordValue[0].category;
          break;
        case 'subCategory':
          this.selectedCategory.id = this.keywordForm.keywordValue[0].category
          this.selectedCategory = this.keywordForm.keywordValue[0].subcategory
          break;
        case 'days':
          this.daysValue = this.keywordForm.keywordValue[0].days
          break;
        case 'time':
          this.timeValue =this.keywordForm.keywordValue[0].time;
          break;
        case 'type':
          this.typeValue=this.keywordForm.keywordValue[0].type;
          break;
        case 'format':
         
          this.formatValue = this.keywordForm.keywordValue[0].format;
          break;
        case 'dates':
          this.dateFrom = this.keywordForm.keywordValue[0].from;
          this.dateTo = this.keywordForm.keywordValue[0].to;

          break;
        case 'price':
          this.minPrice = this.keywordForm.keywordValue[0].from;
          this.maxPrice =this.keywordForm.keywordValue[0].to;
          break;
        case 'topRated': 
          this.minRating = this.keywordForm.keywordValue[0].topRated.from;
          this.maxRating =this.keywordForm.keywordValue[0].topRated.to;
          break;
      }
    }
    this.editKeyword = new FormGroup({
      keywordName: new FormControl('', Validators.required),
      keywordType: new FormControl('', Validators.required),
      keywordValue: new FormControl([]),
    });
  }

  addKeyword() {
    if (this.daysValue.length == 0) {
      this.days = {
        sunday: false,
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
      }
    }
    for (let i in this.daysValue) {
      let dayValue = this.daysValue[i]
      switch (dayValue) {
        case 'sunday':
          this.days.sunday = true;
          break;
        case 'monday':
          this.days.monday = true
          break;
        case 'tuesday':
          this.days.tuesday = true
          break;
        case 'wednesday':
          this.days.wednesday = true
          break;
        case 'thursday':
          this.days.thursday = true
          break;
        case 'friday':
          this.days.friday = true
          break;
        case 'saturday':
          this.days.saturday = true
          break;
      }
    }
    this.keywordFormbody.keywordName = this.editKeyword.value.keywordName;
    this.keywordFormbody.keywordType = this.editKeyword.value.keywordType;
    switch (this.keywordFormbody.keywordType) {
      case 'age':
        let ageGroup: any = {
          from: this.minAge,
          to: this.maxAge
        }
        this.keywordFormbody.keywordValue[0] = ageGroup;
        break;
      case 'category':
        this.selectedCategoryIndx = this.keywordFormbody.keywordValue[0].category.category;
        this.selectedCategory.id = this.keywordFormbody.keywordValue[0].category.category;
        break;
      case 'subCategory':
        let subcategory: any = {
          category: this.selectedCategory.id,
          subcategory: this.selectedSubCategories
        }
        this.keywordFormbody.keywordValue[0] = subcategory;
        break;
      case 'days':
        let days: any = {
          days: this.daysValue
        }
        this.keywordFormbody.keywordValue[0] = days;
        break;
      case 'time':
        let time: any = {
          time: this.timeValue
        }
        this.keywordFormbody.keywordValue[0] = time;
        break;
      case 'type':
        let type: any = {
          type: this.typeValue
        }
        this.keywordFormbody.keywordValue[0] = type;
        break;
      case 'format':
        let format: any = {
          format: this.formatValue
        }
        this.keywordFormbody.keywordValue[0] = format;
        break;
      case 'dates':
        const dateFormat = "YYYY-MM-DD";
        let dates: any = {
          from: moment(this.dateFrom).format(dateFormat),
          to: moment(this.dateTo).format(dateFormat)
        }
        this.keywordFormbody.keywordValue[0] = dates;
        break;
      case 'price':
        let price: any = {
          from: this.minPrice,
          to: this.maxPrice
        }
        this.keywordFormbody.keywordValue[0] = price;
        break;
      case 'topRated':
        let topRated: any = {
          from: this.minRating,
          to: this.maxRating
        }
        this.keywordFormbody.keywordValue[0] = topRated;
        break;
    }
    console.log('addKeyword before', this.keywordFormbody)
    this.loader.open();
    this.apiservice.addKeyword(this.keywordFormbody).subscribe((res) => {
      console.log("addKeyword res", res)
      this.providerResponse = res;
      this.loader.close();
      if (this.providerResponse.isSuccess === true) {
        this.dialogRef.close();
        this.snack.open(this.message, 'OK', { duration: 7000 });
        this.route.navigate(['tables/keyword']);
      } else {

        let msg = 'Somthing went wrong!';
        this.snack.open(msg, 'OK', { duration: 7000 });
      }
    });
  }

  updateKeyword() {
    // this.keywordForm.keywordValue[0].ageGroup.from = this.minAge;
    // this.keywordForm.keywordValue[0].ageGroup.to = this.maxAge;
    // console.log('updateKeyword before', this.keywordForm)
    // this.keywordFormbody.keywordName = this.editKeyword.value.keywordName;
    // this.keywordFormbody.keywordType = this.editKeyword.value.keywordType;
    switch (this.keywordForm.keywordType) {
      case 'age':
        let ageGroup: any = {
          from: this.minAge,
          to: this.maxAge
        }
        this.keywordForm.keywordValue[0] = ageGroup;
        break;
      case 'category':
        let category: any = {
          category: this.selectedCategory.id
        }
        this.keywordForm.keywordValue[0] = category;
        break;
      case 'subCategory':
        let subcategory: any = {
          category: this.selectedCategory.id,
          subcategory: this.selectedSubCategories
        }
        this.keywordForm.keywordValue[0] = subcategory;
        break;
      case 'days':
        let days: any = {
          days: this.daysValue
        }
        this.keywordForm.keywordValue[0] = days;
        break;
      case 'time':
        let time: any = {
          time: this.timeValue
        }
        this.keywordForm.keywordValue[0] = time;
        break;
      case 'type':
        let type: any = {
          type: this.typeValue
        }
        this.keywordForm.keywordValue[0] = type;
        break;
      case 'format':
        let format: any = {
          format: this.formatValue
        }
        this.keywordForm.keywordValue[0] = format;
        break;
      case 'dates':
        const dateFormat = "YYYY-MM-DD";
        let dates: any = {
          from: moment(this.dateFrom).format(dateFormat),
          to: moment(this.dateTo).format(dateFormat)
        }
        this.keywordForm.keywordValue[0] = dates;
        break;
      case 'price':
        let price: any = {
          from: this.minPrice,
          to: this.maxPrice
        }
        this.keywordForm.keywordValue[0] = price;
        break;
      case 'topRated':
        let topRated: any = {
          from: this.minRating,
          to: this.maxRating
        }
        this.keywordForm.keywordValue[0] = topRated;
        break;
    }
    this.loader.open();
    this.apiservice.updateKeyword(this.keywordForm._id, this.keywordForm).subscribe((res) => {
      console.log("updateKeyword res", res)
      this.providerResponse = res;
      this.loader.close();
      if (this.providerResponse.isSuccess === true) {
        this.dialogRef.close();
        this.snack.open('Keyword updated successfully', 'OK', { duration: 7000 });
        this.route.navigate(['tables/keyword']);
      } else {

        let msg = 'Somthing went wrong!';
        this.snack.open(msg, 'OK', { duration: 7000 });
      }
    });
  }



  onSubmit() {
    this.submitted = true;
    if (this.editData) {
      this.updateKeyword();
    } else {
      this.addKeyword();
    }
  }
}
