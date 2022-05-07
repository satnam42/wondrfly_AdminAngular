import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'app/shared/services/api.service.service';

@Component({
  selector: 'app-user-analytics',
  templateUrl: './user-analytics.component.html',
  styleUrls: ['./user-analytics.component.scss']
})
export class UserAnalyticsComponent implements OnInit {
  id: any;
  searchedData: any[];
  programs: any[];
  providers: any[];
  categories: any[];
  subCategories: any[];

  constructor(private apiservice: ApiService,private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
     }) 
   }

  ngOnInit() {
    this.getAnalyticsData();
  }

  getAnalyticsData(){
    console.log(this.id)
    this.apiservice.getParentAnalytics(this.id).subscribe(res =>{
     this.searchedData =  res;
     this.programs= this.searchedData.filter(e => e.program);
     this.categories= this.searchedData.filter(e => e.category);
     this.providers= this.searchedData.filter(e => e.provider);
     this.subCategories= this.searchedData.filter(e => e.subCategory);
     console.log('this.programs',this.programs)
     console.log('this.categories',this.categories)
     console.log('this.providers',this.providers)
     console.log('this.subCategories',this.subCategories)
     console.log('this.searchedData',this.searchedData)
    })
  }

}
