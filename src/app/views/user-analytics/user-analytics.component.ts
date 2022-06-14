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
  freeText: any[];
  constructor(private apiservice: ApiService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
    })
  }

  ngOnInit() {
    this.getAnalyticsData();
    this.getfreeTextByParentId();
  }

  getAnalyticsData() {
    console.log(this.id)
    this.apiservice.getParentAnalytics(this.id).subscribe(res => {
      this.searchedData = res;
      this.programs = this.searchedData.filter(e => e.program);
      this.categories = this.searchedData.filter(e => e.category);
      this.providers = this.searchedData.filter(e => e.provider);
      this.subCategories = this.searchedData.filter(e => e.subCategory);
      this.programs.reverse();
      this.categories.reverse();
      this.providers.reverse();
      this.subCategories.reverse();
      this.searchedData.reverse();
    })
  }
  getfreeTextByParentId() {
    this.apiservice.getfreeTextByParentId(this.id).subscribe(res => {
      this.freeText= res.reverse()    })
  }
}
