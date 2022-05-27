import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  editData: boolean;
  submitted: boolean;
  providerResponse: any;
  message: string = 'Keyword Added Successfully !';
  action: boolean = true;
  setAutoHide: boolean = true;
  autoHide: number = 4000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  keywordForm: any ={

  };
  keywordFormbody = {
    keywordName: "",
    keywordType: "",
    keywordValue : [
     {ageGroup:{}}
    ]
  }
  daysValue:any = []
  days:any =
  {sunday:false,
  monday:false,
  tuesday:false,
  wednesday:false,
  thursday:false,
  friday:false,
  saturday:false,}
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
  ageGroup :any = {
    from: 0,
    to: 0
  }
  keywordValue:any=[];
  isEmpty: any;

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
       this.isEmpty = Object.keys(this.keywordForm).length === 0;
       console.log('datttttta',this.keywordForm)
  }
 

  ngOnInit() {
    if(this.isEmpty){
      this.editData=false;
    }else{
      this.editData=true;
      if(this.keywordForm.keywordValue.length){
      this.minAge= this.keywordForm.keywordValue[0].ageGroup.from;
      this.maxAge= this.keywordForm.keywordValue[0].ageGroup.to;
      }
    }
    this.editKeyword = new FormGroup({
      keywordName: new FormControl('',Validators.required),
      keywordType: new FormControl('',Validators.required),
      keywordValue: new FormControl([]),
  });
  }

  addKeyword() {
    if (this.daysValue.length==0){
      this.days =  {
        sunday:false,
        monday:false,
        tuesday:false,
        wednesday:false,
        thursday:false,
        friday:false,
        saturday:false,}    }
    for(let i in this.daysValue){
    let dayValue = this.daysValue[i]
    switch (dayValue){
      case 'sunday':
        this.days.sunday=true;
        break;
        case 'monday':
          this.days.monday=true
          break;
          case 'tuesday':
            this.days.tuesday=true
            break;
            case 'wednesday':
              this.days.wednesday=true
              break;
              case 'thursday':
                this.days.thursday=true
                break;
                case 'friday':
                  this.days.friday=true
                  break;
                  case 'saturday':
                    this.days.saturday=true
                    break;
    }}
    this.keywordFormbody.keywordName = this.editKeyword.value.keywordName;
    this.keywordFormbody.keywordType = this.editKeyword.value.keywordType;
    this.ageGroup.from = this.minAge;
    this.ageGroup.to = this.maxAge;
    if(this.ageGroup.from || this.ageGroup.to){
      this.keywordFormbody.keywordValue[0].ageGroup = this.ageGroup;
    }
    console.log('addKeyword before', this.keywordFormbody)
    this.loader.open();
    this.apiservice.addKeyword(this.keywordFormbody).subscribe((res) => {
      console.log("addKeyword res",res)
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
      this.keywordForm.keywordValue[0].ageGroup.from = this.minAge;
      this.keywordForm.keywordValue[0].ageGroup.to = this.maxAge;
      console.log('updateKeyword before',this.keywordForm)
    this.loader.open();
    this.apiservice.updateKeyword(this.keywordForm._id,this.keywordForm).subscribe((res) => {
      console.log("updateKeyword res",res)
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
    if(this.editData){
     this.updateKeyword();
    }else{
     this.addKeyword();
    }
  }
}
