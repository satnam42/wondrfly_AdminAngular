import { Component, OnInit, Output, ɵConsole, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TablesService } from 'app/views/tables/tables.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from 'app/shared/services/dataservice.service';
import { ApiService } from 'app/shared/services/api.service.service';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBarConfig, MatSnackBar, MatAutocompleteSelectedEvent } from '@angular/material';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Forum } from 'app/shared/models/forum.model';

@Component({
  selector: 'app-update-forum',
  templateUrl: './update-forum.component.html',
  styleUrls: ['./update-forum.component.scss']
})
export class UpdateForumComponent implements OnInit {
  @Input()
  topic = new Forum;
  @Output()
  keyword = 'name';
  selectable: boolean = true;
  removable: boolean = true;
    separatorKeysCodes: number[] = [ENTER, COMMA];
  tags: any = [];
  isChanged: EventEmitter<any> = new EventEmitter();
  formData = {};
  categoryForm: FormGroup;
  FormData: any;
  submitted: boolean;
  usersData: any = {};
  responseData: any;
  res: any[];
  tagIds: any= [];
  selectFeature: any = [];
  tagsData: any = [];
  features: any = [];
  isLoading: boolean;
  selectedFeature: any ;
  toppings = new FormControl();
  // selected: any = {};
  message: string = 'Topic Updated Successfully!';
  action: boolean = true;
  setAutoHide: boolean = true;
  autoHide: number = 4000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  ForumResponse: any;
  changeForum: any = [];

  constructor(private service: TablesService,
    public dataRoute: ActivatedRoute,
    private dataservice: DataService,
    private apiservice: ApiService,
    private snack: MatSnackBar,
    private route: Router,
    private apiService : ApiService,
    private loader: AppLoaderService) {
    this.topic = dataservice.getOption();
    console.log('dataaadd ', this.topic);
    let config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.setAutoHide ? this.autoHide : 0;
  }

  back() {
    this.route.navigate(['dashboard/forum']);
  }

  updateForum() {
    // this.topic.tagIds = this.selectFeature     
    this.loader.open();
    this.apiservice.updateForum(this.topic).subscribe(res => {
      this.ForumResponse = res;
        console.log('response ', this.ForumResponse)
      this.loader.close();
      if (this.ForumResponse.isSuccess === true) {
        this.snack.open(this.message, 'OK', { duration: 4000 })
        this.route.navigate(['dashboard/forum']);
      } else {
        let msg = "Something Went Wrong";
        this.snack.open(msg, 'OK', { duration: 2000 })
      }
    });   
  } 

  remove(f, indx): void {
    this.topic.tagIds.splice(indx, 1);
    console.log('tagsssss', this.topic.tagIds);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.topic.tagIds.push(event.option.value);
  }



  selectEvent(item) {
    this.topic.tagIds.push(item)
    console.log('selectEvent', item);
    console.log(' this.topic.tagIds', this.topic.tagIds);
  }

  onChangeSearch(key: string) {
    this.apiservice.searchTag(key).subscribe((res: any) => {
      this.tags = res;
      console.log('this.tags', this.tags);
    });

  }


  ngOnInit() {
    this.categoryForm = new FormGroup({
      postFor: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      
    });
  } 

  onSubmit() {
    this.submitted = true;
    // this.topic.tags = this.selected;
    return this.updateForum();
  }
 
} 
  