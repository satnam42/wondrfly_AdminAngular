import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatDialog, MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { ApiService } from 'app/shared/services/api.service.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { DataService } from 'app/shared/services/dataservice.service';
import { Options } from 'ng5-slider';

@Component({
  selector: 'app-keyword-form',
  templateUrl: './keyword-form.component.html',
  styleUrls: ['./keyword-form.component.scss']
})
export class KeywordFormComponent implements OnInit {
  editKeyword:FormGroup;
  editData: boolean = false;
  submitted: boolean;
  providerResponse: any;
  message: string = 'Provider Added Successfully !';
  action: boolean = true;
  setAutoHide: boolean = true;
  autoHide: number = 4000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  keywordForm: any;
  daysValue:any = []
  minAge: number = 3;
  maxAge: number = 10;
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

  constructor(
    private apiservice: ApiService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<KeywordFormComponent>,
    private dataservice :DataService,
    private loader: AppLoaderService,
    private snack: MatSnackBar,
    private route: Router,
  ) {
       this.keywordForm = data;
  }
 

  ngOnInit() {
    if(this.keywordForm){
      this.editData=true;
    }else{
      this.editData=false;
    }
    this.editKeyword = new FormGroup({
      kewordName: new FormControl('',),
      kewordType: new FormControl(''),
  });
  }

  addProvider() {
    console.log('providerData before')
    this.loader.open();
    this.apiservice.addProvider('').subscribe((res) => {
      console.log("Provider res",res)
      this.providerResponse = res;
      this.loader.close();
      if (this.providerResponse.isSuccess === true) {
        this.snack.open(this.message, 'OK', { duration: 7000 });
        this.route.navigate(['tables/providers']);
      } else {
        if (this.providerResponse.isSuccess === false && this.providerResponse.error === 'Email already resgister') {
          let msg = 'Email already registered!';
          this.snack.open(msg, 'OK', { duration: 7000 });
        }
        else {
          let msg = 'Something Went Wrong!';
          this.snack.open(msg, 'OK', { duration: 7000 });
        }
      }
    });

  }
  onSubmit() {
    this.submitted = true;
    return this.addProvider();  
  }
}
