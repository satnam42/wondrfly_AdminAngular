import { COMMA, ENTER, SEMICOLON, SPACE, TAB } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MatChipInputEvent, MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Userr } from 'app/shared/models/user.model';
import { ApiService } from 'app/shared/services/api.service.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { DataService } from 'app/shared/services/dataservice.service';
import { ProgramLocationComponent } from 'app/views/forms/program-form/program-location/program-location.component';
import { Observable } from 'rxjs';
import * as XLSX from 'xlsx';
import { map, startWith } from 'rxjs/operators';
@Component({
  selector: 'add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})
export class AddFormComponent implements OnInit {
  // displayedColumns: string[] = ['firstName', 'lastName', 'email', 'city', 'address', 'phoneNumber', 'country', 'state', 'location', 'action'];

  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions!: Observable<string[]>;

  addUserForm:FormGroup;
  user = new Userr;
  tag: any = [];
  keyword = 'name';
  FormData: any;
  submitted: boolean;
  usersData: any = {};
  formData={};
  responseData: any;
  res: any[];
  providerResponse: any;
  message: string = 'Provider Added Successfully !';
  // actionButtonLabel: string = 'Retry';
  action: boolean = true;
  setAutoHide: boolean = true;
  autoHide: number = 4000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  tags: [];
  categoryIds:[]
  categoriesList: any;
  subCategories: any;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER,COMMA,SPACE,TAB,SEMICOLON] as const;
  sourceUrls=[];
  locationData: any = {
    address: '',
    lat: '',
    lng: ''
  };
  source:any=['Combined','Facebook','Linkedin','Library','Recreation','Instagram','Google','Indeed','Craiglist'];

 
  // dataSource: any = [];
  // isTable: Boolean = false;
  // localdata: any;
  email = new FormControl('', [Validators.required, Validators.email]);
  hide = true;

  constructor(
    private apiservice: ApiService,
    public dialog: MatDialog,
    private dataservice :DataService,
    private loader: AppLoaderService,
    private snack: MatSnackBar,
    private route: Router,
  ) {

  }
  providerFromExcel(ev) {
    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = ev.target.files[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
    
      // for(let user of json)
      // const dataString = JSON.stringify(jsonData);
      // console.log('excel data', dataString)
      // document.getElementById('output').innerHTML = dataString.slice(0, 300).concat("...");
    }
    reader.readAsBinaryString(file);

  }

  ngOnInit() {
    
    this.getCategories()
       this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    this.addUserForm = new FormGroup({
      type: new FormControl('',),
      firstName: new FormControl('', Validators.required),
      userName: new FormControl('', Validators.pattern(/^\S*$/)),
      lastName: new FormControl('',),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl('',),
      sex: new FormControl('',),
      addressLine1: new FormControl('',),
      addressLine2: new FormControl('',),
      city: new FormControl('',),
      facebook: new FormControl('',),
      website: new FormControl('',),
      instagram: new FormControl('',),
      twitter: new FormControl('',),
      taxNumber: new FormControl('',),
      country: new FormControl('',),
      zipCode: new FormControl('',),
      lat: new FormControl('',),
      lng: new FormControl('',),
      stripeToken: new FormControl('',),
      stripeKey: new FormControl('',),
      ssn: new FormControl('',),
      deviceToken: new FormControl('',),
      location: new FormControl('',),
      source: new FormControl([],),
      sourceLinks: new FormControl([],),

      state: new FormControl('',),
      note: new FormControl('',),
      subCategoryIds: new FormControl('',),
      activeStatus: new FormControl('',),
      cycle: new FormControl('',),
      categoryIds: new FormControl('',),
      facebookRating: new FormControl('',),
      numberOfFacebook: new FormControl('',),
      googleRating: new FormControl('',),
      numberOfGoogle: new FormControl('',),
      yelpRating: new FormControl('',),
      numberOfYelp: new FormControl('',),
      instagramFollowers: new FormControl('',),
  });
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  back() {
    history.back();
  }


  getCategories(){
    this.apiservice.getCategory().subscribe(res => {
      this.categoriesList = res;
    })
  }
  
  changeItem(event){
    this.categoryIds=event
  }


  remove(t) {
    const index = this.tag.indexOf(t);
    if (index >= 0) {
      this.tag.splice(index, 1);
    } 
  }

 
// ----------------------------------------------sub category---------------------------------------------------------
  selectEvent(item) {
    const index: number = this.tag.indexOf(item);
    if (this.tag.indexOf(item) === -1) {
      this.tag.push(item);
    }
    else if (index !== -1) {
      this.tag.splice(index, 1);
    }
  }

  onChangeSearch(key: string) {
    this.tags = []
    this.apiservice.searchTag(key).subscribe((res: any) => {
      this.tags = res.tags.filter((item) => item.isActivated === true);
    });

    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

 
  // ----------------------------------------map location--------------------------------------------------
  openMap() {
    let dialogRef: MatDialogRef<any> = this.dialog.open(ProgramLocationComponent, {
      width: '50%',
      disableClose: true,
    })
    dialogRef.afterClosed()
      .subscribe(res => {
        if (!res) {
          // If user press cancel
          this.locationData = this.dataservice.getOption();
          this.user.lat = this.locationData.lat;
          this.user.lng = this.locationData.lng;
          this.user.location = this.locationData.address;
          return;
        }
      });
  }




  // openDialog(data: any): void {
  //   const dialogRef = this.dialog.open(EditFormComponent, {
  //     width: '650px',
  //     data: data
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       this.dataSource = result;
  //       localStorage.setItem('user', JSON.stringify(this.dataSource))
  //     } else {
  //       this.localdata = localStorage.getItem('user');
  //       this.dataSource = JSON.parse(this.localdata);
  //     }
  //   });
  // }
  addProvider() {
    this.user.password = "123456";
    this.user.role = "provider";
    this.user.subCategoryIds= this.tag
    this.user.categoryIds= this.categoryIds
    this.user.sourceUrl = this.sourceUrls;
    console.log('providerData before', this.user)
    this.loader.open();
    this.apiservice.addProvider(this.user).subscribe((res) => {
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
  removeSourceUrl(sourceUrl) {
  const index = this.sourceUrls.indexOf(sourceUrl);

  if (index >= 0) {
    this.sourceUrls.splice(index, 1);
  }
  console.log('sourceUrls',this.sourceUrls)
 
}
  addSourceUrl(event: MatChipInputEvent) {
    const value = (event.value || '').trim();
    if (value) {
      //console.dir(event);
      this.sourceUrls.push(value);
    }
    // Reset the input value
    if (event.input) {
      event.input.value = '';
    }
    console.log('sourceUrls',this.sourceUrls)
  
  }
  pasteSourceUrl(event: ClipboardEvent): void {
    event.preventDefault();
    event.clipboardData
    .getData('Text')
    .split(/;|,|\n/)
    .forEach(value => {
    if(value.trim()){
    this.sourceUrls.push(value.trim());
    }
    })
    }

}
