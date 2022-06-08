import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
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
  constructor(private apiservice: ApiService,private loader: AppLoaderService,private router:Router,
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
  searchKeyword(txt) {
    //     var stringArray = key.split(" ")
    if (txt) {
      this.apiservice.searchMultipleKeywords(txt).subscribe((res: any) => {
        const uniqueArry: any = [...new Map(res.data.map((item) => [item["keywordName" && "keywordType"], item])).values()];
        if (uniqueArry) {
          let filter = ``
          for (let data of uniqueArry) {
            switch (data.keywordType) {
              case 'category':
                if (filter) {
                  filter += `&categoryId=${data.keywordValue[0].category}`
                } else {
                  filter += `categoryId=${data.keywordValue[0].category}`
                }
                break;
              case 'subCategory':
                if (filter) {
                  filter += `&tagsIds=${data.keywordValue[0].subcategory.toString()}`
                } else {
                  filter += `tagsIds=${data.keywordValue[0].subcategory.toString()}`

                }
                break;
              case 'age':
                if (filter) {
                  filter += `&ageFrom=${data.keywordValue[0].from}&ageTo=${data.keywordValue[0].to}`
                } else {
                  filter += `ageFrom=${data.keywordValue[0].from}&ageTo=${data.keywordValue[0].to}`
                }
                break;
              case 'price':
                if (filter) {
                  filter += `&priceFrom=${data.keywordValue[0].from}&priceTo=${data.keywordValue[0].to}`
                } else {
                  filter += `priceFrom=${data.keywordValue[0].from}&priceTo=${data.keywordValue[0].to}`
                }
                break;
              case 'dates':
                if (filter) {
                  filter += `&fromDate=${data.keywordValue[0].from}&toDate=${data.keywordValue[0].to}`
                } else {
                  filter += `fromDate=${data.keywordValue[0].from}&toDate=${data.keywordValue[0].to}`
                }
                break;
              case 'type':
                if (filter) {
                  filter += `&type=${data.keywordValue[0].type.toString()}`
                } else {
                  filter += `type=${data.keywordValue[0].type.toString()}`
                }
                break;
              case 'time':
                if (filter) {
                  filter += `&time=${data.keywordValue[0].time.toString()}`
                } else {
                  filter += `time=${data.keywordValue[0].time.toString()}`
                }
                break;
              case 'days':
                if (filter) {
                  filter += `&day=${data.keywordValue[0].days.toString()}`
                } else {
                  filter += `day=${data.keywordValue[0].days.toString()}`
                }
                break;
              case 'format':
                if (filter) {
                  filter += `&inpersonOrVirtual=${data.keywordValue[0].format.toString()}`
                } else {
                  filter += `inpersonOrVirtual=${data.keywordValue[0].format.toString()}`
                }
                break;
              case 'topRated':
                if (filter) {
                  filter += `&ratingFrom=${data.keywordValue[0].from}&ratingTo=${data.keywordValue[0].to}`
                } else {
                  filter += `ratingFrom=${data.keywordValue[0].from}&ratingTo=${data.keywordValue[0].to}`
                }
                break;

            }
          }
          if(filter){
            var url = `https://wondrfly.ml/search?filter=${filter}`;
            var win = window.open(url, '_blank');
                win.opener = null;
                win.focus();
          }
          else{
            var url = `https://wondrfly.ml/search`;
            var win = window.open(url, '_blank');
                win.opener = null;
                win.focus();
          }
 
        } else {
          var url = `https://wondrfly.ml/search`;
          var win = window.open(url, '_blank');
              win.opener = null;
              win.focus();
        }
      })
    }
  }
}
