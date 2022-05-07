
import { COMMA, ENTER, SEMICOLON } from '@angular/cdk/keycodes';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { MatChipInputEvent, MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBarConfig, MatAutocompleteSelectedEvent } from '@angular/material';
import { Router } from '@angular/router';
import { DataService } from 'app/shared/services/dataservice.service';
import { ApiService } from 'app/shared/services/api.service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
@Component({
  selector: 'app-add-tag-form',
  templateUrl: './add-tag-form.component.html',
  styleUrls: ['./add-tag-form.component.scss']
})
export class AddTagFormComponent {
  categoryInput: ElementRef;  // @ViewChild('categoryInput') categoryInput: ElementRef;
  tagForm: FormGroup;
  submitted: boolean = false;
  visible: boolean = true;
  selectable = "selectable"
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA, SEMICOLON];
  categoryCtrl = new FormControl();

  filteredCategories: Observable<any[]>;


  allCategories = [];

  addtag = {
    name: '',
    description: '',
    categoryIds: []

  }



  message: string = 'Tag Added !';
  action: boolean = true;
  setAutoHide: boolean = true;
  autoHide: number = 4000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  tagResponse: any;

  // addExtraClass: boolean = false;
  constructor(private route: Router, private dataservice: DataService,
    private apiservice: ApiService,
    private snack: MatSnackBar,
    private loader: AppLoaderService,
  ) {
    // this.filteredCategories = this.categoryCtrl.valueChanges.pipe(
    //   startWith(null),
    //   map((category: string | null) => category ? this.filter(category) : this.allCategories.slice()));

    // let config = new MatSnackBarConfig();
    // config.verticalPosition = this.verticalPosition;
    // config.horizontalPosition = this.horizontalPosition;
    // config.duration = this.setAutoHide ? this.autoHide : 0;
  }
  // add(event: MatChipInputEvent): void {
  //   const input = event.input;
  //   const value = event.value;
  //   // Add our fruit
  //   if ((value || '').trim()) {
  //     this.addtag.categoryIds.push(value.trim());
  //   }
  //   // Reset the input value
  //   if (input) {
  //     input.value = '';
  //   }

  //   this.categoryCtrl.setValue(null);

  // }

  // remove(category: any): void {
  //   const index = this.addtag.categoryIds.indexOf(category);

  //   if (index >= 0) {
  //     this.addtag.categoryIds.splice(index, 1);
  //   }
  // }

  // filter(name: string) {
  //   return this.allCategories.filter(category =>
  //     category.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  // }

  // selected(event: MatAutocompleteSelectedEvent): void {
  //   this.addtag.categoryIds.push(event.option.value);
  //   this.categoryInput.nativeElement.value = '';
  //   this.categoryCtrl.setValue(null);
  //   console.log('selected categories', this.addtag.categoryIds);
  // }


  back() {
    this.route.navigate(['tables/tag']);

  }

  addTag() {
    this.loader.open();
    this.apiservice.addTag(this.addtag).subscribe(res => {
      this.tagResponse = res;
      this.loader.close();
      if (this.tagResponse.isSuccess === true) {
        this.snack.open(this.message, 'OK', { duration: 4000 });
        this.route.navigate(['tables/tag']);
      } else {
        let msg = "Something Went Wrong!";
        this.snack.open(msg, 'OK', { duration: 4000 });
      }

    });


  }
  ngOnInit() {
    // this.apiservice.getCategory().subscribe(res => {
    //   this.allCategories = res;
    //   console.log('category list', this.allCategories);

    // });
    this.tagForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      // category: new FormControl('', Validators.required),



    });
  }

  onSubmit() {

    this.submitted = true;
    return this.addTag();
  }

}

