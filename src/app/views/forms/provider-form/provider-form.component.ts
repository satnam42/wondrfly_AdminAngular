import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent, MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Program } from 'app/shared/models/program.model';
import { Userr } from 'app/shared/models/user.model';
import { ApiService } from 'app/shared/services/api.service.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { DataService } from 'app/shared/services/dataservice.service';
import * as moment from 'moment';
import { FileUploader } from 'ng2-file-upload';
import { Options } from 'ng5-slider';
import { Observable } from 'rxjs';
import { ProgramLocationComponent } from '../program-form/program-location/program-location.component';

@Component({
  selector: 'app-provider-form',
  templateUrl: './provider-form.component.html',
  styleUrls: ['./provider-form.component.scss']
})
export class ProviderFormComponent implements OnInit, OnDestroy {
  firstFormGroup: FormGroup;
  startDate: any = new Date;
  endDate: any = new Date;
  startTime: number = 8;
  endTime: number = 10;
  extractionDate = new Date;
  imgResponse: any;
  fileData: File = null;
  msg: string;
  imagePath;
  imgURL: any;
  sourceUrls = [];
  duration: any;
  timeArray: any = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24"];
  bookingCancelledIn = {
    days: "",
    hours: ""
  };

  durationTime: any = {
    hours: 0,
    minutes: 0
  }

  catId: any = []

  locationData: any = {
    address: '',
    lat: '',
    lng: ''
  };

  pricePeriod: {
    periodAmount: string,
    periodCount: number
  }
  timePeriodDuration: number
  perTimePeriod: string

  time = {
    from: moment(this.startDate).format('MM-DD-YYYY'),
    to: moment(this.endDate).format('MM-DD-YYYY'),
  };
  date = {
    from: new Date(this.startDate),
    to: new Date(this.endDate)
  };
  stepType = 'Activity Info';
  user = new Userr;
  program: any = new Program;
  sessions: any = {};

  //  ng5slider start age group
  title: string
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

  timeOption: Options = {
    floor: 1,
    ceil: 24,
    step: 0.1,
    translate: (value: number): string => {
      return value + '';
    }

  };

  //  ng5slider start capacity

  minCapacity: number = 0;
  maxCapacity: number = 30;

  capacityOption: Options = {
    floor: 0,
    ceil: 100,
    translate: (value: number): string => {
      return value + '';
    }

  };
  daysValue: any = []
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

  // ng5slider end
  // ---------------autucomplete-------------  
  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = false;
  keyword = 'name';

  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredValues: Observable<any[]>;
  public numbers: Array<number> = [];
  subcatFormcontrol = new FormControl('');
  tags: any = [];
  tag: any = [];
  // sessions: any = [];
  // ng5slider end

  public uploader: FileUploader = new FileUploader({ url: 'upload_url' });
  public hasBaseDropZoneOver: boolean = false;
  action: boolean = true;
  setAutoHide: boolean = true;
  autoHide: number = 4000;
  categoriesList: any = [];
  tagByCategory: any[];
  source: any = ['Combined', 'Facebook', 'Linkedin', 'Library', 'Recreation', 'Instagram', 'Google', 'Indeed', 'Craiglist'];
  editFormData: any;
  isEmpty: any;
  isEditData: boolean;
  isEdit: boolean = false;
  id = ''
  providerResponse: any;
  constructor(
    private apiservice: ApiService,
    private loader: AppLoaderService,
    private activatedRoute: ActivatedRoute,
    private route: Router,
    public dialog: MatDialog,
    private dataservice: DataService,
    private snack: MatSnackBar) {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
    });


    this.activatedRoute.queryParams
      .subscribe((params: any) => {
        let form = params['form']
        if (form == 'add') {
          this.isEdit = false
        } else if (form == 'edit') {
          this.getProgramById(this.id)
          this.isEdit = true;
        }
      })
  }
  

  onChangeSearch(key: string) {
    this.tags = []
    this.apiservice.searchTag(key).subscribe((res: any) => {
      this.tags = res;
      this.tags.tags = this.tags.tags.filter((item) => item.isActivated === true);
    });
  }

  remove(t) {
    const index = this.tag.indexOf(t);
    if (index >= 0) {
      this.tag.splice(index, 1);
    }
  }

  getProgramById(id) {
    this.changeItem(this.program.category)
    this.apiservice.getProgramById(id).subscribe(res => {
      this.program = res;
      this.days = this.program.days;
      this.minAge = this.program.ageGroup.from
      this.maxAge = this.program.ageGroup.to
      this.minCapacity = this.program.capacity.min
      this.maxCapacity = this.program.capacity.max
      this.tag = this.program.subCategoryIds
      this.perTimePeriod = this.program.pricePeriod.periodAmount;
      this.timePeriodDuration = this.program.pricePeriod.periodCount
      if (this.program.date.from == null || this.program.date.from == undefined || this.program.date.from == '') {
        this.startDate = new Date();
        this.endDate = new Date();
      } else {
        this.startDate = this.program.date.from;
        this.endDate = this.program.date.to;
      }
      let timestart = this.program.time.from;
      let timeend = this.program.time.to;
      this.startTime = timestart;
      this.endTime = timeend;
      if (this.program.category.length) {
        for (let category of this.program.category) {
          this.catId.push(category._id)
          this.program.categoryId = this.catId
        }
      } else {
        this.catId.push(this.program.category._id)
        this.program.categoryId = this.catId
      }
    })
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

  onFocused(e) {
    // do something when input is focused
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
          this.program.lat = this.locationData.lat;
          this.program.lng = this.locationData.lng;
          this.program.location = this.locationData.address;
          return;
        }
      });
  }

  ngOnInit() {
    this.getCategories();
    this.subcatFormcontrol.valueChanges.subscribe(value => {
      this.onChangeSearch(value);
    })
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

  // public fileOverBase(e: any): void {
  //   this.hasBaseDropZoneOver = e;
  // }

  fileSelect(event) {
    let formData = new FormData();
    this.fileData = event.target.files[0];
    formData.append('image', this.fileData);
    this.loader.open();
    this.apiservice.getPicUrl(formData).subscribe(res => {
      this.imgResponse = res;
      this.loader.close();
      if (this.imgResponse.isSuccess === true) {
        this.program.programCoverPic = this.imgResponse.data;
      } else {
        let msg = "Something Went Wrong!";
        this.snack.open(msg, 'OK', { duration: 4000 });
      }
    });

    // --------------------preview image before upload ------------------------
    if (event.target.files.length === 0)
      return;
    var reader = new FileReader();
    this.imagePath = event.target.files;
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
    var mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.msg = " only images are supported";
      return;
    }
  }

  addProgram() {
    this.program.duration = this.durationTime
    this.program.pricePeriod.periodAmount = this.perTimePeriod
    this.program.pricePeriod.periodCount = this.timePeriodDuration
    this.sessions = this.dataservice.getOption();
    this.program.capacity.min = this.minCapacity
    this.program.capacity.max = this.maxCapacity
    this.program.ageGroup.from = this.minAge
    this.program.ageGroup.to = this.maxAge
    this.program.userId = this.id;
    this.program.bookingCancelledIn = this.bookingCancelledIn;
    this.program.time.from = this.startTime;
    this.program.time.to = this.endTime;
    this.program.realTime.from = this.program.time.from;
    this.program.realTime.to = this.program.time.to;
    this.program.date.from = this.startDate;
    this.program.date.to = this.endDate;
    this.program.extractionDate = this.extractionDate;
    this.program.subCategoryIds = this.tag;

    var datesDiff: any = Math.round((this.endDate - this.startDate) / (1000 * 60 * 60 * 24));
    var days: any = [];
    let i = 0;
    let loop: any = new Date(this.startDate);
    if (datesDiff == 0) {
      days.push(moment(loop).format('dddd'))
    }
    else {
      while (i <= datesDiff) {
        days.push(moment(loop).format('dddd'))
        let newDate = loop.setDate(loop.getDate() + 1);
        i++;
        loop = new Date(newDate);
      }
    }

    this.program.days = this.days
    if (this.sessions.length > 0) {
      this.program.sessions = this.sessions;
    }
    if (this.durationTime.hours > 24 || this.durationTime.hours == null) {
      this.durationTime.hours = 0
      let msg = "Please enter valid hours";
      this.snack.open(msg, 'ERROR', { duration: 4000 });
    }
    else if (this.durationTime.minutes > 59 || this.durationTime.minutes == null) {
      this.durationTime.minutes = 0
      let msg = "Please enter valid minutes";
      this.snack.open(msg, 'ERROR', { duration: 4000 });
    } else {
      this.loader.open();
      this.apiservice.addProgram(this.program).subscribe((res: any) => {
        this.loader.close();
        if (res.isSuccess === true) {
          this.snack.open('Program Added successfully', 'OK', { duration: 5000 });
          this.route.navigate(['tables/program', this.id]);
        }
      });
    }
    this.loader.close();
  }

 

  submit() {
    if (this.isEdit) {
      this.updateProvider();
    } else {
      this.addProgram();
    }
  }

  getCategories() {
    this.apiservice.getCategory().subscribe(res => {
      this.categoriesList = res;
      this.categoriesList = this.categoriesList.filter((item) => item.isActivated === true);

    })
  }

  changeItem(event) {
    this.program.categoryId = event
  }

  changetags(event) {
    this.tags = event
  }


  getQuantity(event) {
    this.numbers = []
    this.title = ''
    let n
    if (event === 'Month') {
      n = 12
      this.title = 'SELECT NUMBER OF MONTHS'
    }
    else if (event === 'Hour') {
      n = 24
      this.title = 'SELECT NUMBER OF HOURS'
    }
    else if (event === 'Day') {
      n = 31
      this.title = 'SELECT NUMBER OF DAYS'
    }
    else if (event === 'Week') {
      n = 52
      this.title = 'SELECT NUMBER OF weeks'
    } else {
      n = 50
      this.title = 'SELECT LIMIT'
    }
    for (let i = 1; i <= n; i++) {
      this.numbers.push(i)
    }
  }

  nextStep(step) {

    switch (step) {
      case 'Provider Info':
        this.stepType = step;

        break;
      case 'Address Info':
        this.stepType = step;
        break;
      case 'Provider Details':
        this.stepType = step;
        break;
      case 'Website and other':
        this.stepType = step;
        break;
      case 'Source and Ratings':
        this.stepType = step;
        break;
      case 'Cycle Info':
        this.stepType = step;
        break;
      default:
        this.stepType;
        break
    }
  }

  scrollToElement($element): void {
    $element.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
  }

  //==========================================Provider=============================================>
  getUserById() {
    this.apiservice.getUserById(this.user.id).subscribe((res: any) => {
      this.user = res;
      this.user.sourceUrl;
    })
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
      links: this.user.sourceUrl,
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
      rating: this.user.rating
    }
    this.loader.open();
    this.apiservice.updateProvider(user).subscribe(res => {
      this.providerResponse = res;
      this.loader.close();
      if (this.providerResponse.isSuccess === true) {
        this.snack.open('Provider Updated', 'OK', { duration: 4000 })
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

  }

}



