import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';
import { MatAutocompleteSelectedEvent, MatSliderChange, MatDialogRef, MatDialog, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material';
import { FileUploader } from 'ng2-file-upload';
import { ActivatedRoute, Router } from '@angular/router';
import { Userr } from 'app/shared/models/user.model';
import { Program } from 'app/shared/models/program.model';
import { Options } from 'ng5-slider';
import { ApiService } from 'app/shared/services/api.service.service';
import * as moment from 'moment';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { DataService } from 'app/shared/services/dataservice.service';
import { UpdateBatchPopupComponent } from './update-batch-popup/update-batch-popup.component';
import { ProgramLocationComponent } from '../program-form/program-location/program-location.component';
import { Globals } from 'app/shared/helpers/globalfunctions';
@Component({
  selector: 'app-edit-program',
  templateUrl: './edit-program.component.html',
  styleUrls: ['./edit-program.component.css']
})
export class EditProgramComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  startDate:any = new Date;
  endDate:any = new Date;
  startTime:number;
  endTime:number;
  source:any=['Combined','Facebook','Linkedin','Library','Recreation','Instagram','Google','Indeed','Craiglist'];
  user = new Userr;
  program = new Program;
  duration:any;
  programDetail:any;
  programTOBatchPopup = new Program;
  imgResponse: any;
  fileData: File = null;
  msg: string;
  imagePath;
  imgURL: any;
intrests: any =[];

  //  ng5slider start age group
ageGroup:any={
  from: 0,
  to: 0,
}

capacity:any={
  minCapacity: 0,
  maxCapacity: 0,
}

  locationData: any = {
    address: '',
    lat: '',
    lng: ''
  };

  durationTime: any= {
    hours: 0,
    minutes: 0
  }

  ageOption: Options = {
    floor: 0,
    ceil: 21,
    step: 0.5,
    translate: (value: number): string => {
      return value + ' YRS';
    }

  };


  capacityOption: Options = {
    floor: 0,
    ceil: 100,
    translate: (value: number): string => {
      return value + '';
    }

  };
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

  tags: any = [];
  sessions: any = [];

  daysValue: any=[];
  days:any={};
  
  // ng5slider end

  public uploader: FileUploader = new FileUploader({ url: 'upload_url' });
  public hasBaseDropZoneOver: boolean = false;
  public numbers: Array<number> = [];
  title: string
  pricePeriod: {
    periodAmount: string,
    periodCount: number
  }
  timePeriodDuration:number
  perTimePeriod: string
  catId:any=[]
  action: boolean = true;
  setAutoHide: boolean = true;
  autoHide: number = 4000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  categoriesList:any = [];
  isResponse = false;
  tag: any = [];
  constructor(
    private apiservice: ApiService,
    private dialog: MatDialog,
    private loader: AppLoaderService,
    private activatedRoute: ActivatedRoute,
    private dataservice: DataService,
    private route: Router,
    private snack: MatSnackBar,
    private timechange: Globals) {


    this.activatedRoute.params.subscribe(params => {
      this.program._id = params['id'];
      if(this.program._id){  this.getProgramById() }
    });
    let config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.setAutoHide ? this.autoHide : 0;

  }
  openPopUp(batch) {
    this.dataservice.setOption(this.programTOBatchPopup)
    let dialogRef: MatDialogRef<any> = this.dialog.open(UpdateBatchPopupComponent, {
      width: '30%',
      disableClose: true,
      data: batch
    })
    dialogRef.afterClosed()
      .subscribe(res => {
        if (!res) {
          return;
        }


      });
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    // this.intrests.push(event.option.value);
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

  // -------------------------------------get categories------------------------------------------
 



  ngOnInit() {
  
    this.getCategories()
    if (this.program === undefined) {
      this.route.navigate(['tables/all-program/id']);
    }

    this.firstFormGroup = new FormGroup({
      name: new FormControl(['',]),
      type: new FormControl(['',]),
      categoryId: new FormControl(['',]),
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
      daysValue: new FormControl(['',]),
      isExpired: new FormControl(false),
     
    });

    this.secondFormGroup = new FormGroup({ 
      isproRated: new FormControl(false),
      isFree: new FormControl(false),
      days: new FormControl(['',]),
      pricePerParticipant: new FormControl(['',]),
      priceForSiblings: new FormControl(['',]),
      perTimePeriod: new FormControl(['',]),
      timePeriodDuration: new FormControl(['',]),
      extractionDate: new FormControl(['',]),
      duHours: new FormControl(['',Validators.required]),
      duMinutes: new FormControl(['',Validators.required]),
      adultAssistanceIsRequried: new FormControl(false),
      addresses: new FormControl(['',]),
      hours: new FormControl(['',]),
      joiningLink: new FormControl(['',]),
      location: new FormControl(['']),
      city: new FormControl(['']),
      source: new FormControl(['',]),
      sourceUrl: new FormControl(['',]),
      cycle: new FormControl(['']),
      activeStatus: new FormControl(['']),
    });



    // this.firstFormGroup = new FormGroup({
    //   type: new FormControl(['',]),
    // });
    // this.secondFormGroup = new FormGroup({
    //   name: new FormControl(['',]),
    //   description: new FormControl(['',]),
    //   startDate: new FormControl(['',]),
    //   endDate: new FormControl(['',]),
    //   startTime: new FormControl(['',]),
    //   endTime: new FormControl(['',]),
    //   city: new FormControl(['',]),
    //   isFree: new FormControl(false),
    //   isDateNotMention: new FormControl(false),
    //   isTimeNotMention: new FormControl(false),
    //   category: new FormControl(['',]),
    //   pricePerParticipant: new FormControl(['',]),
    //   perTimePeriod: new FormControl(['',]),
    //   timePeriodDuration: new FormControl(['',]),
    //   priceForSiblings: new FormControl(['',]),
    //   categoryId: new FormControl(['']),
    //   subCategoryIds : new FormControl(['']),
    //   location: new FormControl(['']),
    // });
    // this.thirdFormGroup = new FormGroup({
    //   email: new FormControl(['', Validators.email]),
    //   specialInstructions: new FormControl(['',]),
    //   adultAssistanceIsRequried: new FormControl(false),
    //   addresses: new FormControl(['',]),
    //   daysValue: new FormControl(['',]),
    //   hours: new FormControl(['',]),
    //   presenter: new FormControl(['',]),
    //   joiningLink: new FormControl(['',]),
    //   indoorOroutdoor: new FormControl(['',]),
    //   inpersonOrVirtual: new FormControl(['',]),

    // });
    // this.fourthFormGroup = new FormGroup({
    //   sourceUrl: new FormControl(['',]),
    //   source: new FormControl(['',]),
    //   cycle: new FormControl(['']),
    //   activeStatus: new FormControl(['']),
    //   duration: new FormControl(['']),
    //   type: new FormControl(['']),
    // })

  }

  updateProgram() {  
    const dateFormat = "YYYY-MM-DD";
    this.program.ageGroup =this.ageGroup
    this.program.capacity.min =this.capacity.minCapacity
    this.program.capacity.max =this.capacity.maxCapacity
    this.program.duration = this.durationTime
    this.program.pricePeriod.periodAmount = this.perTimePeriod
    this.program.pricePeriod.periodCount = this.timePeriodDuration
    this.program.subCategoryIds = this.tag
    this.program.time.from = this.timechange.tools_replaceAll(this.startTime, ":",".");
    this.program.time.to = this.timechange.tools_replaceAll(this.endTime, ":",".");
    this.program.realTime.from = this.timechange.tools_replaceAll(this.startTime, ":",".");
    this.program.realTime.to = this.timechange.tools_replaceAll(this.endTime, ":",".");
    this.program.date.from = moment(this.startDate).format(dateFormat)
    this.program.date.to = moment(this.endDate).format(dateFormat)
    var datesDiff:any =  Math.round((this.endDate - this.startDate)/(1000*60*60*24));
    var days:any = [];
    let i = 0;
let loop:any = new Date(this.startDate);
if(datesDiff==0){
  days.push(moment(loop).format('dddd'))
 }
else{
while (i <= datesDiff) {
       days.push(moment(loop).format('dddd')) 
 let newDate = loop.setDate(loop.getDate() + 1);
 i++;
 loop = new Date(newDate);
}
}

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
  this.program.days= this.days
    if(typeof this.program.isFree==='string'){this.program.isFree=false}
    if(typeof this.program.isFav==='string'){this.program.isFav=false}
    if(typeof this.program.adultAssistanceIsRequried==='string'){this.program.adultAssistanceIsRequried=false}
    if(typeof this.program.isFree==='string'){this.program.isFav=false}
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
        this.route.navigate(['tables/all-program','id'])
      } else {
        let msg = "Somthing went wrong";
        this.snack.open(msg, 'ERROR', { duration: 4000 });
        this.loader.close();
      }
    });

  }


  getCategories(){
    this.apiservice.getCategory().subscribe(res => {
      this.categoriesList = res;
    })
  }
  
  changeItem(event){
    this.program.categoryId=event
  }
  
  changetags(event){
    this.tags=event
  }
 

  getQuantity(event) {
    this.numbers= []
     this.title = ''
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
  


  submit() {
    this.updateProgram();
  }
  getProgramById() {
    this.changeItem(this.program.category)
    this.apiservice.getProgramById(this.program._id).subscribe(res => {
      this.program = res;
      let daysValue:any= []
      daysValue = Object.keys(this.program.days);
   this.daysValue = daysValue.filter((key)=> {
        return this.program.days[key]
    })
      this.ageGroup.from=this.program.ageGroup.from 
      this.ageGroup.to=this.program.ageGroup.to 
      this.capacity.minCapacity=this.program.capacity.min 
      this.capacity.maxCapacity=this.program.capacity.max 
      this.tag =this.program.subCategoryIds
      this.perTimePeriod =this.program.pricePeriod.periodAmount;
      this.timePeriodDuration=this.program.pricePeriod.periodCount
      if(this.program.date.from==null || this.program.date.from==undefined || this.program.date.from==''){
      this.startDate=new Date();
      this.endDate=new Date();
      }else{
        this.startDate = this.program.date.from;
        this.endDate = this.program.date.to;
      }
      let timestart =this.program.time.from ; 
      let timeend = this.program.time.to;
      this.startTime = this.timechange.tools_replaceAll(timestart.toFixed(2), ".",":"); 
      this.endTime = this.timechange.tools_replaceAll(timeend.toFixed(2), ".",":"); 
      this.durationTime.hours= this.program.duration.hours;
      this.durationTime.minutes= this.program.duration.minutes;  
      // this.startTime.getHours() + ':' + this.endTime.getMinutes()
      if(this.program.category.length){
      for(let category of this.program.category){
        this.catId.push(category._id)
        this.program.categoryId=this.catId
   }} else
   {this.catId.push(this.program.category._id)
     this.program.categoryId=this.catId
    }
    })
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

}
