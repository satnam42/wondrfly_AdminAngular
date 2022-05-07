import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { TablesService } from 'app/views/tables/tables.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'app/shared/services/api.service.service';
import { DataService } from 'app/shared/services/dataservice.service';
import { CustomValidators } from 'ng2-validation';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar, MatSnackBarConfig, MatAutocompleteSelectedEvent, MatChipInputEvent, MatDialogRef, MatDialog } from '@angular/material';
import { Userr } from 'app/shared/models/user.model';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { COMMA, ENTER, SEMICOLON, SPACE, TAB } from '@angular/cdk/keycodes';
import { ProgramLocationComponent } from '../program-form/program-location/program-location.component';

@Component({
  selector: 'app-providerquick-form',
  templateUrl: './provider-quick-form.component.html',
  styleUrls: ['./provider-quick-form.component.css']
})
export class ProviderQuickFormComponent implements OnInit {


  formData = {};
  providerForm: FormGroup;

  user = new Userr;
  tag: any = [];
  keyword = 'name';
  FormData: any;
  submitted: boolean;
  usersData: any = {};
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
  subCategories: any;
  tags: [];
  categoryIds:[]
  categoriesList: any
  selectable: boolean = true;
  removable: boolean = true;
  sourceUrls = [];
  locationData: any = {
    address: '',
    lat: '',
    lng: ''
  };
  readonly separatorKeysCodes = [ENTER,COMMA,SPACE,TAB,SEMICOLON] as const;
  source:any=['Combined','Facebook','Linkedin','Library','Recreation','Instagram','Google','Indeed','Craiglist'];
 constructor(private service: TablesService,
    public dataRoute: ActivatedRoute,
    private apiservice: ApiService,
    private snack: MatSnackBar,
    private loader: AppLoaderService,
    private route: Router,
    private dialog: MatDialog,
    private dataservice: DataService) {
  }
  back() {
    this.route.navigate(['tables/provider']);
  }

  addProvider() {
    if(this.user.age===null){
      
    }
    this.loader.open();
    this.user.password = "123456";
    this.user.role = "provider";
    this.user.subCategoryIds= this.tag
    this.user.categoryIds= this.categoryIds
    this.user.sourceUrl =  this.sourceUrls;
    this.apiservice.addProvider(this.user).subscribe((res) => {
      this.providerResponse = res;
      this.loader.close();
      if (this.providerResponse.isSuccess === true) {
        this.snack.open(this.message, 'OK', { duration: 7000 });
        this.route.navigate(['tables/provider']);
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


  ngOnInit() {
    this.getCategories();
    this.user.type = 'Solo';
    this.providerForm = new FormGroup({
      type: new FormControl('',),
      firstName: new FormControl('', Validators.required),
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




      // date: new FormControl(),
      // company: new FormControl('', [
      //    CustomValidators.creditCard
      // ]),
      // phone: new FormControl('', CustomValidators.phone('BD')),
      // password: password,
      // confirmPassword: confirmPassword,
      // gender: new FormControl('', [
      //   Validators.required
      // ]),
      // agreed: new FormControl('', (control: FormControl) => {
      //   const agreed = control.value;
      //   if (!agreed) {
      //     return { agreed: true };
      //   }
      //   return null;
      // })
    });
  }


  getCategories(){
    this.apiservice.getCategory().subscribe(res => {
      console.log('cat list', res)
      this.categoriesList = res;
    })
  }
  
  changeItem(event){
    console.log('selected cat id', event)
    this.categoryIds=event
  }
  
  // changetags(event){
  //   this.tags=event
  //   console.log('selected cat id', this.tags)
  // }
  
  // getTags(){
  //   console.log('cat id', this.user.categoryIds)
  //   this.apiservice.getTags().subscribe((res:any) => {
  //     console.log('tag list', res)
  //     this.subCategories = res;
  //   })
  // }

  remove(t) {
    const index = this.tag.indexOf(t);

    if (index >= 0) {
      this.tag.splice(index, 1);
    }
    console.log('remove intrest', this.tag)

  }

  selected(event: MatAutocompleteSelectedEvent): void {
    // this.tag.push(event.option.value);
  }



  selectEvent(item) {
    const index: number = this.tag.indexOf(item);
    if (this.tag.indexOf(item) === -1) {
      this.tag.push(item);
    }
    else if (index !== -1) {
      this.tag.splice(index, 1);
    }
    console.log('intrests', this.tag)
  }

  onChangeSearch(key: string) {
    this.tags = []
    this.apiservice.searchTag(key).subscribe((res: any) => {
      this.tags = res;
      console.log('searchTag list categories', this.tags);
    });

    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e) {
    console.log('onFocused', e)
    // do something when input is focused
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
  
  onSubmit() {
    this.submitted = true;
    return this.addProvider();
  }
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
}

