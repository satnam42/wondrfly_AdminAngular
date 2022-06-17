import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatDialog, MatSnackBar, MatSnackBarConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Globals } from 'app/shared/helpers/globalfunctions';
import { Program } from 'app/shared/models/program.model';
import { Userr } from 'app/shared/models/user.model';
import { ApiService } from 'app/shared/services/api.service.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { DataService } from 'app/shared/services/dataservice.service';
import { AddBatchComponent } from 'app/views/forms/program-form/add-batch/add-batch-.component';
import { ProgramLocationComponent } from 'app/views/forms/program-form/program-location/program-location.component';
import * as moment from 'moment';
import { FileUploader } from 'ng2-file-upload';
import { Options } from 'ng5-slider';
import { Observable } from 'rxjs';
import { LocationDialogComponent } from '../../location-dialog/location-dialog.component';

@Component({
  selector: 'app-program-form',
  templateUrl: './program-form.component.html',
  styleUrls: ['./program-form.component.css']
})
export class ProgramFormComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
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
  step1 = true;
  step2 = false;
  step3 = false;
  step4 = false;
  step5 = false;
  step6 = false;
  step7 = false
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

  fruitCtrl = new FormControl();

  filteredFruits: Observable<any[]>;
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
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  categoriesList: any = [];
  tagByCategory: any[];
  source: any = ['Combined', 'Facebook', 'Linkedin', 'Library', 'Recreation', 'Instagram', 'Google', 'Indeed', 'Craiglist'];
  editFormData: any;
  isEmpty: any;
  isEditData: boolean;
  constructor(private fb: FormBuilder,
    private apiservice: ApiService,
    private loader: AppLoaderService,
    private activatedRoute: ActivatedRoute,
    private route: Router,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ProgramFormComponent>,
    private dataservice: DataService,
    private snack: MatSnackBar) {
    this.activatedRoute.params.subscribe(params => {
      this.user._id = params['id'];
    });
    // this.sessions = dataservice.getOption();
    let config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.setAutoHide ? this.autoHide : 0;
    this.editFormData = data;
    this.isEmpty = Object.keys(this.editFormData).length === 0;
    this.getProgram();
  }
  openPopUp() {
    let dialogRef: MatDialogRef<any> = this.dialog.open(AddBatchComponent, {
      width: '30%',
      disableClose: true,
      // data: this.sessions
    })
    dialogRef.afterClosed()
      .subscribe(res => {
        if (!res) {
          // If user press cancel
          return;
        }
        // this.loader.open();
      });
  }

  onChangeSearch(key: string) {
    this.tags = []
    this.apiservice.searchTag(key).subscribe((res: any) => {
      this.tags = res;
      this.tags.tags = this.tags.tags.filter((item) => item.isActivated === true);
    });

    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  remove(t) {
    const index = this.tag.indexOf(t);
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

  onFocused(e) {
    // do something when input is focused
  }

  openMap() {
    let dialogRef: MatDialogRef<any> = this.dialog.open(LocationDialogComponent, {
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
      name: new FormControl(['',]),
      type: new FormControl(['',]),
      categoryId: new FormControl(['',]),
      phoneNumber: new FormControl(['']),
      subCategory: new FormControl(['']),
      inpersonOrVirtual: new FormControl(['',]),
      indoorOroutdoor: new FormControl(['',]),
      description: new FormControl(['',]),
      specialInstructions: new FormControl(['',]),
      email: new FormControl(['', Validators.email]),
      presenter: new FormControl(['',]),
      ageGroup: new FormControl(['',]),
      startDate: new FormControl(['',]),
      endDate: new FormControl(['',]),
      startTime: new FormControl(['',]),
      endTime: new FormControl(['',]),
      isDateNotMention: new FormControl(false),
      isTimeNotMention: new FormControl(false),
      isproRated: new FormControl(false),
      dayss: new FormControl(['',]),
      isFree: new FormControl(false),
      days: new FormControl(['',]),
      pricePerParticipant: new FormControl(['',]),
      priceForSiblings: new FormControl(['',]),
      perTimePeriod: new FormControl(['',]),
      timePeriodDuration: new FormControl(['',]),
      extractionDate: new FormControl(['',]),
      duration: new FormControl(['', Validators.required]),
      adultAssistanceIsRequried: new FormControl(false),
      addresses: new FormControl(['',]),
      hours: new FormControl(['',]),
      joiningLink: new FormControl(['',]),
      location: new FormControl(['']),
      city: new FormControl(['']),
      source: new FormControl(['',]),
      sourceUrl: new FormControl(['',]),
      cycle: new FormControl(['']),
      isExpired: new FormControl([Boolean]),
      zip: new FormControl(['']),
      activeStatus: new FormControl(['']),
    });





    // email: ['',],
    // special_instruction: ['',],
    // isAdult_assistance: [true,],
    // booking_cancle_before: ['',],
    // address: ['',]

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
    // -------------------------------------------------------------------------------

  }

  getProgram() {
    if (this.isEmpty) {
      this.isEditData = false;
    } else {
      this.isEditData = true
      console.log(this.editFormData)
      this.program = this.editFormData;
      this.days = this.program.days;
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
    this.program.userId = this.user._id;
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
      console.log(this.program)
      this.apiservice.addProgram(this.program).subscribe((res: any) => {
        this.loader.close();
        if (res.isSuccess === true) {
          this.snack.open('Program Added successfully', 'OK', { duration: 5000 });
          this.route.navigate(['tables/program', this.user._id]);
        }
      });
    }
    this.loader.close();
  }

  updateProgram() {
    this.program.ageGroup.from = this.minAge
    this.program.ageGroup.to = this.maxAge
    this.program.capacity.min = this.minCapacity
    this.program.capacity.max = this.maxCapacity
    this.program.duration = this.durationTime
    this.program.pricePeriod.periodAmount = this.perTimePeriod
    this.program.pricePeriod.periodCount = this.timePeriodDuration
    this.program.subCategoryIds = this.tag
    this.program.time.from = this.startTime;
    this.program.time.to = this.endTime;
    this.program.realTime.from = this.startTime;
    this.program.realTime.to = this.endTime;
    this.program.date.from = this.startDate;
    this.program.date.to = this.endDate;
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
    var response: any;
    // if (this.batchData) {
    //   for (let i = 0; i <= totalBatch; i++) {
    //     batch = this.program.sessions[i];

    //     if (this.batchData._id === batch._id) {
    //       this.program.sessions[i] = this.batchData;
    //       console.log('batchData in for loop', this.batchData);
    //       console.log('program.sessions[i] in for loop', this.program.sessions[i]);
    //     }
    //   }
    // }
    // this.loader.open();

    this.apiservice.updateProgram(this.program._id, this.program).subscribe(res => {
      response = res;
      this.loader.close();
      if (response.isSuccess === true) {
        let msg = "Program Updated successfully";
        this.snack.open(msg, 'OK', { duration: 4000 });
        this.route.navigate(['tables/program', response.data.user])
      } else {
        let msg = "Somthing went wrong";
        this.snack.open(msg, 'ERROR', { duration: 4000 });
        this.loader.close();
      }
    });
  }


  submit() {
    if (this.isEditData) {
      this.updateProgram();
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
    // this.getTagsByCategory()
  }

  changetags(event) {
    this.tags = event
  }

  // getTagsByCategory(){
  //   this.apiservice.getTagsByCategory(this.program.categoryId).subscribe((res:any) => {
  //     this.tagByCategory = res.data;
  //   })
  // }

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

  nextStep(step: number) {

    switch (step) {
      case 1:
        this.step1 = true;
        this.step2 = false;
        this.step3 = false;
        this.step4 = false;
        this.step5 = false;
        this.step6 = false;
        this.step7 = false;
        break;
      case 2:
        this.step1 = false;
        this.step2 = true;
        this.step3 = false;
        this.step4 = false;
        this.step5 = false;
        this.step6 = false;
        this.step7 = false;
        break;
      case 3:
        this.step1 = false;
        this.step2 = false;
        this.step3 = true;
        this.step4 = false;
        this.step5 = false;
        this.step6 = false;
        this.step7 = false;
        break;
      case 4:
        this.step1 = false;
        this.step2 = false;
        this.step3 = false;
        this.step4 = true;
        this.step5 = false;
        this.step6 = false;
        this.step7 = false;
        break;
      case 5:
        this.step1 = false;
        this.step2 = false;
        this.step3 = false;
        this.step4 = false;
        this.step5 = true;
        this.step6 = false;
        this.step7 = false;
        break;
      case 6:
        this.step1 = false;
        this.step2 = false;
        this.step3 = false;
        this.step4 = false;
        this.step5 = false;
        this.step6 = true;
        this.step7 = false;
        break;
      case 7:
        this.step1 = false;
        this.step2 = false;
        this.step3 = false;
        this.step4 = false;
        this.step5 = false;
        this.step6 = false;
        this.step7 = true;
        break;
    }
  }

  scrollToElement($element): void {
    console.log($element);
    $element.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
  }

  onDayChange(event) {
    console.log(event);
    console.log('days', this.days)
  }

}
