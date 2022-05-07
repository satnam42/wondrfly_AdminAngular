import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TablesService } from 'app/views/tables/tables.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'app/shared/services/dataservice.service';
import { ApiService } from 'app/shared/services/api.service.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { Options } from 'ng5-slider';
import { AddBatchComponent } from './add-batch/add-batch-.component';
import { MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import * as moment from 'moment';
import { Userr } from 'app/shared/models/user.model';
import { Program } from 'app/shared/models/program.model';
import { Session } from 'app/shared/models/batch.model';
import { Location } from '@angular/common';
import { ProgramLocationComponent } from './program-location/program-location.component';


@Component({
  selector: 'app-program-form',
  templateUrl: './program-form.component.html',
  styleUrls: ['./program-form.component.scss']
})
export class ProgramFormComponent implements OnInit {

  formData = {};
  programForm: FormGroup;
  FormData: any;
  submitted: boolean;
  usersData: any = {};
  responseData: any;
  isResponse = false;
  res: any[];
  categories: any[];
  locationData: any = {
    address: '',
    lat: '',
    lng: ''
  };

  startDate = new Date;
  endDate = new Date;
  startTime :number;
  endTime : number;
  extractionDate = new Date;
  selectable: boolean = true;
  removable: boolean = true;
  keyword = 'name';
  user = new Userr;
  program:any = new Program;
  sessions: any = {};
  sessionsDate = new Session
  duration:any;

  durationTime: any= {
    hours: 0,
    minutes: 0
  }

  //  ng5slider start age group

  minAge: number = 3;
  maxAge: number = 10;

  ageOption: Options = {
    floor: 0,
    ceil: 21,
    step: 0.5,
    translate: (value: number): string => {
      return value + ' YRS';
    }

  };


  minCapacity: number = 0;
  maxCapacity: number = 30;

  capacityOption: Options = {
    floor: 0,
    ceil: 100,
    translate: (value: number): string => {
      return value + '';
    }

  };

  bookingCancelledIn = {
    days: "",
    hours: ""
  };
  tags:any= [];
  tagByCategory: any;
  public numbers: Array<number> = [];
  title: string
  pricePeriod: {
    periodAmount: string,
    periodCount: number
  }
  timePeriodDuration:number
  perTimePeriod: string
  tag: any =[];
  daysValue:any = []
  days:any =
    {sunday:false,
    monday:false,
    tuesday:false,
    wednesday:false,
    thursday:false,
    friday:false,
    saturday:false,}


  constructor(private service: TablesService,
    public dataRoute: ActivatedRoute,
    private dataservice: DataService,
    private apiservice: ApiService,
    private loader: AppLoaderService,
    private route: Router,
    private snack: MatSnackBar,
    private dialog: MatDialog,
    private location: Location,
    private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(params => {
      this.user._id = params['id'];
    });
  }
  onChange(data) { }
  openPopUp() {
    let dialogRef: MatDialogRef<any> = this.dialog.open(AddBatchComponent, {
      width: '30%',
      disableClose: false,
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
  back() {
    this.location.back();

  }

  addProgram() {
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

    this.program.duration = this.durationTime
    this.program.sessions = this.dataservice.getOption();
    this.program.pricePeriod.periodAmount = this.perTimePeriod
    this.program.pricePeriod.periodCount = this.timePeriodDuration
    this.program.subCategoryIds = this.tag
    this.program.capacity.min = this.minCapacity
    this.program.capacity.max = this.maxCapacity
    this.program.ageGroup.from = this.minAge
    this.program.ageGroup.to = this.maxAge
    this.program.userId = this.user._id;
    this.program.days= this.days
    this.program.bookingCancelledIn = this.bookingCancelledIn;
    this.program.time.from = this.startTime;
    this.program.time.to = this.endTime;
    this.program.realTime.from = this.startTime;
    this.program.realTime.to =this.endTime;
    this.program.date.from = moment(this.startDate).format('YYYY-MM-DD');
    this.program.date.to = moment(this.endDate).format("YYYY-MM-DD");
    this.program.extractionDate = moment(this.extractionDate).format("YYYY-MM-DD");
    console.log('before hit api' , this.program)
    if(this.durationTime.hours>24 || this.durationTime.hours==null){
      this.durationTime.hours=0
      let msg = "Please enter valid hours";
        this.snack.open(msg, 'ERROR', { duration: 4000 });
    }
    else if(this.durationTime.minutes>59 || this.durationTime.minutes==null){
      this.durationTime.minutes=0
      let msg = "Please enter valid minutes";
        this.snack.open(msg, 'ERROR', { duration: 4000 });
    }else{
    this.loader.open();
    this.apiservice.addProgram(this.program).subscribe((res:any) => {
      console.log('After hit api' , res)
      this.loader.close();
      if (res.isSuccess === true) {
        this.location.back();
      }
    });
  }
  }

  getProviderById() {
    this.loader.open();
    this.apiservice.getProviderById(this.user._id).subscribe(res => {
      this.responseData = res;
      if (this.responseData.isSuccess === true) {
        this.isResponse = true;
      }
      this.loader.close();

    });
  }

  ngOnInit() {
    this.getCategoryList();
    this.getProviderById();

    this.programForm = new FormGroup({

      type: new FormControl(['',]),
      indoorOroutdoor: new FormControl(['']),
      inpersonOrVirtual: new FormControl(['']),
      extractionDate: new FormControl(['']),
      name: new FormControl(['',]),
      alias: new FormControl(['',]),
      address: new FormControl(['']),
      description: new FormControl(['',]),
      startDate: new FormControl(['',]),
      endDate: new FormControl(['',]),
      startTime: new FormControl(['',]),
      duration: new FormControl(['']),
      endTime: new FormControl(['',]),
      dayss: new FormControl(['',]),
      isDateNotMention: new FormControl(false),
      isTimeNotMention: new FormControl(false),
      isFree: new FormControl(false),
      category: new FormControl(['',]),
      ageGroup: new FormControl(['',]),
      pricePerParticipant: new FormControl(['',]),
      priceForSiblings: new FormControl(['',]),
      presenter: new FormControl(['',]),
      joiningLink: new FormControl(['',]),
      emails: new FormControl(['', Validators.email]),
      location: new FormControl(['',]),
      perTimePeriod: new FormControl(['',]),
      timePeriodDuration: new FormControl(['',]),
    });
  }

  updateParent() {
    this.loader.open();
    this.apiservice.updateParent(this.user.id, this.user).subscribe(res => {
      this.loader.close();
      alert('data updated successfully');
      this.route.navigate(['tables/paging']);
      // }
    });
  };


  getCategoryList() {
    this.apiservice.getCategory().subscribe((res: any) => { 
      this.categories = res;
      this.categories = this.categories.filter((item) => item.isActivated === true);
    });
  }

  changeItem(event){
    
    // event.foreach((element) => {
    //   this.categories = this.categories.filter((element1) => {
    //     let a;
    //     element1.id !== element;
    //     return element1.id !== element;
    //   })
    //   console.log('array r matched',this.categories)
    // })  
    console.log('selected cat id', event)
    this.program.categoryId=event
    // this.getTagsByCategory()
  }


  changetags(event){
    this.tags=event
    console.log('selected cat id', this.tags)
  }
  
  // getTagsByCategory(){
  //   console.log('cat id', this.program.categoryId)
  //   if(this.program.categoryId.length){
  //   if(this.program.categoryId.length>1){
  //    for(let id of this.program.categoryId){
  //     this.apiservice.getTagsByCategory(id).subscribe((res:any) => {
  //       console.log('tag list', res)
  //       this.tagByCategory.push(res.data);
  //     })
  //    }
  //   }
  //   if(this.program.categoryId.length==1){
  //     this.apiservice.getTagsByCategory(this.program.categoryId).subscribe((res:any) => {
  //       console.log('tag list', res)
  //       this.tagByCategory = res.data;
  //     })
  //   }
  // }   else{
  //   this.tagByCategory = [];
  // }
  // }

  getQuantity(event) {
    this.numbers= []
     this.title = ''
    console.log('event limit', event )
    let n
    if(event==='Month'){
      n=12
      this.title= 'SELECT NUMBER OF MONTHS'
    }
    else if(event==='Hour'){
      n=24
      this.title= 'SELECT NUMBER OF HOURS'
    }
    else if(event==='Day'){
      n=31
      this.title= 'SELECT NUMBER OF DAYS'
    }
    else if(event==='Week'){
      n=52
      this.title= 'SELECT NUMBER OF weeks'
    }else{
      n=50
      this.title ='SELECT LIMIT'
    }
    for (let i = 1; i <= n; i++) {
      this.numbers.push(i)
  
    }
  
  }

  onChangeSearch(key: string) {
    console.log('searchTag key', key);
    this.tags = []
    this.apiservice.searchTag(key).subscribe((res: any) => {
      this.tags = res;
      this.tags.tags = this.tags.tags.filter((item) => item.isActivated === true);
      console.log('searchTag list categories', res);
    });

    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  remove(t) {
    const index = this.tag.indexOf(t);

    if (index >= 0) {
      this.tag.splice(index, 1);
    }
    console.log('remove intrest', this.tag)
   
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


  onSubmit() {
    this.submitted = true;
    this.addProgram();
  }
}

