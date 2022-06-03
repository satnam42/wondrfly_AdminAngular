import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ApiService } from 'app/shared/services/api.service.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { KeywordFormComponent } from 'app/views/forms/keyword-form/keyword-form.component';

@Component({
  selector: 'app-searched-keywords',
  templateUrl: './searched-keywords.component.html',
  styleUrls: ['./searched-keywords.component.scss']
})
export class SearchedKeywordsComponent implements OnInit {
   data:any;
  constructor(private apiservice: ApiService,private loader: AppLoaderService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<KeywordFormComponent>,) { }

  ngOnInit() {
    this.getKeywordSearchedList()
  }

  getKeywordSearchedList() {
    this.apiservice.getKeywordSearchedList().subscribe(res => {
      this.data= res.data;
    });
  }

}
