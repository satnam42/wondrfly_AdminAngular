import { Component, OnInit } from '@angular/core';
// import { TablesService } from '../tables.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DataService } from 'app/shared/services/dataservice.service';
import { ApiService } from 'app/shared/services/api.service.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { Userr } from 'app/shared/models/user.model';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBarConfig, MatSnackBar, MatDialogRef, MatDialog } from '@angular/material';
import { DataPopupComponent } from '../data-popup/data-popup.component';
@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit {
  isLoading: boolean;
  usersData: any = {};
  forum: any = new Userr;
  forums: any = [];
  allforums: any = [];
  tagss: any = [];
  tagsData: any = [];
  features: any = [];
  selectedPostFor: string;
  isPostFor = false;
  userResponse: any;
  messages: string = 'Topic Added Successfully!';
  searchText = '';
  userData: any;
  forumForm: FormGroup;
  message: string = 'Topic Deleted Successfully!';
  data: any;
  submitted = false;
  display = 'none'; //default Variable
  id: string;

  constructor(private apiservice: ApiService, private dialog: MatDialog, private fb: FormBuilder, private snack: MatSnackBar, private dataservice: DataService, private loader: AppLoaderService, private route: Router) {
    var retrievedObject = localStorage.getItem('userData');
    this.userData = JSON.parse(retrievedObject);

    this.forumForm = this.fb.group({
      postFor: ['',],
      title: ["", Validators.required],
      description: ["", Validators.required],
      tagIds: ["", [Validators.required]],
      comments: [""],
    });

  }

  ngOnInit() {
    this.getAllForums();
    this.getTagsList();
  }

  getAllForums() {
    // this.loader.open();
    this.apiservice.forumList().subscribe(res => {
      this.forums = res;
      this.allforums = this.forums
      this.allforums.reverse();
      this.tagss = this.allforums._id
      this.loader.close();
    });
  }

  addedpost(postFor: string) {
    this.selectedPostFor = postFor
    this.isPostFor = true;
  }

  getTagsList() {
    this.isLoading = true;
    this.apiservice.getTags().subscribe(res => {
      this.tagsData = res;
      this.isLoading = false;
    });
  }

  deletePost(data) {
    this.loader.open();
    this.apiservice.deletePost(data._id).subscribe(res => {
      this.userResponse = res;
      this.loader.close();
      if (this.userResponse.isSuccess === true) {
        this.snack.open(this.message, 'OK', { duration: 4000 })
        this.getAllForums();
      }
    })
  }

  editTopic(data) {
    let model = {
      title: data.title,
      description: data.description,
      tagIds: data.tags,
      postFor: data.postFor,
      _id: data._id
    }
    this.dataservice.setOption(model);
    this.route.navigate(['dashboard/updateTopic']);
  }

  onSubmit() {
    this.submitted = true;
    if (this.forumForm.invalid) {
      return;
    }
    this.loader.open();
    this.forumForm.value.postFor = this.selectedPostFor;
    this.apiservice.addForums(this.forumForm.value).subscribe(res => {
      this.userResponse = res;
      this.loader.close();
      this.forums = this.userResponse.data
      if (this.userResponse.isSuccess === true) {
        this.snack.open(this.messages, 'OK', { duration: 4000 })
        this.route.navigate(['dashboard/forum']);
        this.getAllForums();
        this.forumForm.reset();
        this.selectedPostFor = '';
      } else {
        this.loader.close();
        let msg = "Something Went Wrong";
        this.snack.open(msg, 'OK', { duration: 2000 })
      }
    });
  }

  // view data 
  openPopUp(data) {
    let dialogRef: MatDialogRef<any> = this.dialog.open(DataPopupComponent, {
      width: '60%',
      disableClose: true,
      data: data,
      // this.name: this.data.firstName
    })
    dialogRef.afterClosed()
      .subscribe(res => {
        if (!res) {
          return;
        }
      });
  }
} 
