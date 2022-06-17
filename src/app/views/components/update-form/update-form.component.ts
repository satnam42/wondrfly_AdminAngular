import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'app/shared/services/api.service.service';
import { DataService } from 'app/shared/services/dataservice.service';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar, MatChipInputEvent, MatDialog, MatDialogRef } from '@angular/material';
import { Userr } from 'app/shared/models/user.model';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { COMMA, ENTER, SEMICOLON, SPACE, TAB } from '@angular/cdk/keycodes';
import { ProgramLocationComponent } from 'app/views/forms/program-form/program-location/program-location.component';

@Component({
  selector: 'update-new-form',
  templateUrl: './update-form.component.html',
  styleUrls: ['./update-form.component.css']
})
export class UpdateFormComponent implements OnInit {
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
  source: any = ['Combined', 'Facebook', 'Linkedin', 'Library', 'Recreation', 'Instagram', 'Google', 'Indeed', 'Craiglist'];
  tags: [];
  tag: any = [];
  categoryIds: any = []
  categoriesList: any
  selectable: boolean = true;
  removable: boolean = true;
  sourceUrls: any = [];
  readonly separatorKeysCodes = [ENTER, COMMA, SPACE, TAB, SEMICOLON] as const;
  constructor(
    public dataRoute: ActivatedRoute,
    private dataservice: DataService,
    private apiservice: ApiService,
    private snack: MatSnackBar,
    private dialog: MatDialog,
    private loader: AppLoaderService,
    private activatedRoute: ActivatedRoute,
    private route: Router) {
    this.activatedRoute.params.subscribe(params => {
      this.user.id = params['id'];
    });
  }
  back() {
    history.back();
  }

  getUserById() {
    this.apiservice.getUserById(this.user.id).subscribe((res: any) => {
      this.user = res;
      this.tag = this.user.subCategoryIds;
      if (this.user.categories.length) {
        for (let category of this.user.categories) {
          this.categoryIds.push(category._id)
          this.user.categoryIds = this.categoryIds
        }
      }
      this.sourceUrls = this.user.sourceUrl;
    })
  }

  updateProvider() {
    var user: any = {
      id: this.user.id,
      firstName: this.user.firstName,
      userName: this.user.userName,
      lastName: this.user.lastName,
      phoneNumber: this.user.phoneNumber,
      secondaryPhonenumber: this.user.secondaryPhonenumber,
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
      categoryIds: [],
      subCategoryIds: [],
      links: this.sourceUrls,
      cycle: this.user.cycle,
      tagsId: [],
      isAmbassador: this.user.isAmbassador,
      interests: this.user.interests,
      healthAndSafety: this.user.healthAndSafety,
      city: this.user.city,
      country: this.user.country,
      state: this.user.state,
      street: this.user.street,
      location: this.user.location,
      note: this.user.note,
      securityQuestion: this.user.securityQuestion,
      answer: this.user.answer,
      zipCode: this.user.zipCode,
      logo: this.user.logo,
      source: this.user.source,
      sourceUrl: this.sourceUrls,
      rating: this.user.rating
    }
    this.user.sourceUrl = this.sourceUrls;
    this.loader.open();
    this.apiservice.updateProvider(user).subscribe(res => {
      this.providerResponse = res;
      this.loader.close();
      if (this.providerResponse.isSuccess === true) {
        this.snack.open(this.message, 'OK', { duration: 4000 })
        this.route.navigate(['tables/providers']);
      } else
        if (this.providerResponse.isSuccess === false && this.providerResponse.error === 'userName already resgister') {
          let msg = 'UserId is already registered!';
          this.snack.open(msg, 'OK', { duration: 7000 });
        }
        else {
          let msg = "Something Went Wrong!";
          this.snack.open(msg, 'OK', { duration: 4000 });
        }
    });
  }
  ngOnChange() {
  }

  ngOnInit() {
    this.getUserById()
    this.getCategories();
    this.getTags()
    if (this.user === undefined) {
      this.route.navigate(['tables/provider']);
    }
    // let user = JSON.parse(this.dataRoute.snapshot.params['objectProducts'])
    // tslint:disable-next-line:prefer-const
    // let password = new FormControl('', Validators.required);
    // tslint:disable-next-line:prefer-const
    // let confirmPassword = new FormControl('', CustomValidators.equalTo(password));
  }

  getCategories() {
    this.apiservice.getCategory().subscribe(res => {
      this.categoriesList = res;
    })
  }

  changeItem(event) {
    this.categoryIds = event
  }

  // changetags(event){
  //   this.tags=event
  // }

  getTags() {
    this.apiservice.getTags().subscribe((res: any) => {
      this.subCategories = res;
    })
  }

  // search tags
  remove(item): void {
    const index = this.tag.indexOf(item);

    if (index >= 0) {
      this.tag.splice(index, 1);
    }
  }


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

  onFocused(e) {
    // do something when input is focused
  }




  removeSourceUrl(sourceUrl) {
    const index = this.sourceUrls.indexOf(sourceUrl);

    if (index >= 0) {
      this.sourceUrls.splice(index, 1);
    }

  }
  addSourceUrl(event: MatChipInputEvent) {
    const value = (event.value || '').trim();
    if (value) {
      this.sourceUrls.push(value);
    }
    // Reset the input value
    if (event.input) {
      event.input.value = '';
    }
  }
  pasteSourceUrl(event: ClipboardEvent): void {
    event.preventDefault();
    event.clipboardData
      .getData('Text')
      .split(/;|,|\n/)
      .forEach(value => {
        if (value.trim()) {
          this.sourceUrls.push(value.trim());
        }
      })
  }


  onSubmit() {
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

