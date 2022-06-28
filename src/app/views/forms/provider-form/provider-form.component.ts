import { ENTER, COMMA, SEMICOLON, SPACE, TAB } from '@angular/cdk/keycodes';
import { Component, HostListener, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent, MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Userr } from 'app/shared/models/user.model';
import { ApiService } from 'app/shared/services/api.service.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { DataService } from 'app/shared/services/dataservice.service';
import { ProgramLocationComponent } from '../program-form/program-location/program-location.component';

@Component({
  selector: 'app-provider-form',
  templateUrl: './provider-form.component.html',
  styleUrls: ['./provider-form.component.scss']
})
export class ProviderFormComponent implements OnInit, OnDestroy {
  firstFormGroup: FormGroup;
  user: any = new Userr;
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
  id: any;
  isEdit: any;
  stepType: string = 'General Info'
  listener;
  constructor(
    private apiservice: ApiService,
    private loader: AppLoaderService,
    private activatedRoute: ActivatedRoute,
    private route: Router,
    public dialog: MatDialog,
    private dataservice: DataService,
    private snack: MatSnackBar,
    private renderer2: Renderer2) {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      if (this.id == 'add') {
        this.isEdit = false;
      } else {
        this.getUserById(this.id)
        this.isEdit = true;
      }
    });
    this.listener = this.renderer2.listen('window', 'scroll', (e) => {
      const sections = document.querySelectorAll("div[id]");
      let scrollY = window.pageYOffset;
      sections.forEach((current: any) => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        let sectionId = current.getAttribute("id");
        if (
          scrollY > sectionTop &&
          scrollY <= sectionTop + sectionHeight
        ) {
          document.querySelector(".prog_text a[href*=" + sectionId + "]").classList.add("active");
        } else {
          document.querySelector(".prog_text a[href*=" + sectionId + "]").classList.remove("active");
        }
      });
    });
  }

  // @HostListener("window:scroll", [])
  // onWindowScroll() {
  //   console.log('workingggg')
  //   // Get current scroll position

  // }

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

  ngOnInit() {
    // this.subcatFormcontrol.valueChanges.subscribe(value => {
    //   this.onChangeSearch(value);
    // })
    this.firstFormGroup = new FormGroup({
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
      proof_reader_notes: new FormControl('',),
      cancellation_and_refund: new FormControl('',),
      cycle_time: new FormControl(Number),
      last_reviewed: new FormControl(Date,),
    });
  }

  submit() {
    if (this.isEdit) {
      this.updateProvider();
    } else {
      this.addProvider();
    }
  }


  // scrollToElement($element, stepType): void {
  //   this.stepType = stepType
  //   console.log($element.div)
  //   $element.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
  // }

  //==========================================Provider=============================================>
  getUserById(id) {
    this.apiservice.getUserById(id).subscribe((res: any) => {
      console.log('getByid user', res)
      this.user = res;
      this.user.sourceUrl;
      this.sourceUrls = this.user.sourceUrl;
    })
  }

  addProvider() {
    this.user.password = "123456";
    this.user.role = "provider";
    this.user.subCategoryIds = [];
    this.user.categoryIds = [];
    this.user.sourceUrl = this.sourceUrls;
    this.loader.open();
    console.log('before add', this.user)
    this.apiservice.addProvider(this.user).subscribe((res) => {
      this.providerResponse = res;
      this.loader.close();
      if (this.providerResponse.isSuccess === true) {
        localStorage.removeItem('provider');
        this.snack.open('Provider Added', 'OK', { duration: 7000 });
        this.route.navigate(['tables/providers']);
      } else {
        if (this.providerResponse.isSuccess === false && this.providerResponse.error === 'Email already resgister') {
          let msg = 'Email already registered!';
          this.snack.open(msg, 'OK', { duration: 7000 });
        } else
          if (this.providerResponse.isSuccess === false && this.providerResponse.error === 'userName already resgister') {
            let msg = 'UserId is already registered!';
            this.snack.open(msg, 'OK', { duration: 7000 });
          }
          else {
            let msg = 'Something Went Wrong!';
            this.snack.open(msg, 'OK', { duration: 7000 });
          }
      }
    });

  }

  updateProvider() {
    var user: any = {
      id: this.user.id,
      firstName: this.user.firstName,
      userName: this.user.userName,
      email: this.user.email,
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
    console.log('before update', user)
    this.apiservice.updateProvider(user).subscribe(res => {
      this.providerResponse = res;
      this.loader.close();
      if (this.providerResponse.isSuccess === true) {
        localStorage.removeItem('provider');
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


  ngOnDestroy(): void {
    this.listener();
    localStorage.removeItem('provider');
  }

}



