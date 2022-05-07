import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { TablesService } from 'app/views/tables/tables.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'app/shared/services/api.service.service';
import { DataService } from 'app/shared/services/dataservice.service';
import { CustomValidators } from 'ng2-validation';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar, MatSnackBarConfig, MatAutocompleteSelectedEvent, MatChipInputEvent, MatDialog, MatDialogRef } from '@angular/material';
import { Userr } from 'app/shared/models/user.model';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { COMMA, ENTER, SEMICOLON, SPACE, TAB } from '@angular/cdk/keycodes';
import { ProgramLocationComponent } from '../program-form/program-location/program-location.component';

@Component({
  selector: 'app-provider-update-form',
  templateUrl: './provider-update-form.component.html',
  styleUrls: ['./provider-update-form.component.css']
})
export class ProviderUpdateFormComponent implements OnInit {


  formData = {};
  providerUpdateForm: FormGroup;

  user = new Userr;

  locationData: any = {
    address: '',
    lat: '',
    lng: ''
  };
  FormData: any;
  submitted: boolean;
  usersData: any = {};
  responseData: any;
  res: any[];
  keyword = 'name';
  providerResponse: any;
  message: string = 'Provider Updated Successfully !';
  // actionButtonLabel: string = 'Retry';
  action: boolean = true;
  setAutoHide: boolean = true;
  autoHide: number = 4000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  subCategories: any;
  tags: [];
  tag: any = [];
  categoryIds:[]
  categoriesList: any
  selectable: boolean = true;
  removable: boolean = true;
  sourceUrls:any =[];
  readonly separatorKeysCodes = [ENTER,COMMA,SPACE,TAB,SEMICOLON] as const;
  constructor(private service: TablesService,
    public dataRoute: ActivatedRoute,
    private dataservice: DataService,
    private apiservice: ApiService,
    private snack: MatSnackBar,
    private dialog: MatDialog,
    private loader: AppLoaderService,
    private activatedRoute :ActivatedRoute,
    private route: Router) {
      this.activatedRoute.params.subscribe(params => {
        this.user.id = params['id'];
      });
    console.log('dataService', this.user.id)
  }
  back() {
    this.route.navigate(['tables/provider']);
  }

  getProviderById() {
    this.apiservice.getUserById(this.user.id).subscribe((res: any) => {
      this.user = res;
      this.sourceUrls = this.user.sourceUrl;
      console.log("providerdata", this.user)
    })
  }

  updateProvider() {
    this.loader.open();

     var user:any = {
       id:this.user.id,
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      phoneNumber: this.user.phoneNumber,
      secondaryPhonenumber: this.user.secondaryPhonenumber,
      category: this.user.category,
      description: this.user.description,
      facebook: this.user.facebook,
      website: this.user.website,
      youtube: this.user.youtube,
      lat: this.user.lat,
      lng: this.user.lng,
      activeStatus: this.user.activeStatus,
      instagram: this.user.instagram,
      linkedin: this.user.linkedin,
      addressLine1: this.user.addressLine1,
      addressLine2: this.user.addressLine2,
      about: this.user.about,
      bio: this.user.bio,
      categoryIds:this.user.categoryIds,
      subCategoryIds: this.tag,
      links: this.sourceUrls,
      cycle: this.user.cycle,
      tagsId:[],
      isAmbassador: this.user.isAmbassador,
      interests:this.user.interests,
      healthAndSafety:this.user.healthAndSafety,
      city: this.user.city,
      country: this.user.country,
      state: this.user.state,
      street: this.user.street,
      location: this.user.location,
      note: this.user.note,
      securityQuestion: this.user.securityQuestion,
      answer:this.user.answer ,
      zipCode:this.user.zipCode ,
      logo:this.user.logo ,
      source: this.user.source,
      sourceUrl:this.sourceUrls,
      rating:this.user.rating
    }
    if(this.user.categoryIds==undefined){
      user.categoryIds=[]
      console.log('bug')
    }
    console.log('before resss', user);
 this.user.sourceUrl=   this.sourceUrls ;
    this.apiservice.updateProvider(user).subscribe(res => {
      console.log('after resss', res)
      this.providerResponse = res;
      this.loader.close();
      if (this.providerResponse.isSuccess === true) {
        this.snack.open(this.message, 'OK', { duration: 4000 })
        this.route.navigate(['tables/providers']);
      } else {
        let msg = "Something Went Wrong!";
        this.snack.open(msg, 'OK', { duration: 4000 });
      }
    });
  }
  ngOnChange() {
  }

  ngOnInit() {
    this.getCategories();
    this.getProviderById()
    if (this.user === undefined) {
      this.route.navigate(['tables/provider']);
    }    // console.log('kkkkkkkkkkk', JSON.parse(this.dataRoute.snapshot.params['objectProducts']))
    // let user = JSON.parse(this.dataRoute.snapshot.params['objectProducts'])
    // tslint:disable-next-line:prefer-const
    // let password = new FormControl('', Validators.required);
    // tslint:disable-next-line:prefer-const
    // let confirmPassword = new FormControl('', CustomValidators.equalTo(password));


    this.providerUpdateForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('',),
      email: new FormControl('',),
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
      long: new FormControl('',),
      stripeToken: new FormControl('',),
      stripeKey: new FormControl('',),
      ssn: new FormControl('',),
      deviceToken: new FormControl('',),
      location: new FormControl('',),
      source: new FormControl([],),
      sourceUrl: new FormControl([],),
      state: new FormControl('',),
      tier: new FormControl('',),
      note: new FormControl('',),
      fullAddress: new FormControl('',),
      subCategoryIds: new FormControl('',),
      activeStatus: new FormControl('',),
      cycle: new FormControl('',),
      categoryIds: new FormControl('',),
      youtube: new FormControl('',),
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

                                // search tags
   remove(item): void {
    const index = this.tag.indexOf(item);

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
    console.log('formData', this.providerUpdateForm.value)
    this.submitted = true;
    return this.updateProvider();
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

