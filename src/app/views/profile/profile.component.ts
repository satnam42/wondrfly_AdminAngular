import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { DataService } from 'app/shared/services/dataservice.service';
import { ApiService } from 'app/shared/services/api.service.service';
import { Userr } from 'app/shared/models/user.model';
import { AuthsService } from 'app/shared/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

  activeView: string = 'overview';

  // Doughnut
  doughnutChartColors: any[] = [{
    backgroundColor: ['#fff', 'rgba(0, 0, 0, .24)',]
  }];

  total1: number = 500;
  data1: number = 200;
  doughnutChartData1: number[] = [this.data1, (this.total1 - this.data1)];

  total2: number = 1000;
  data2: number = 400;
  doughnutChartData2: number[] = [this.data2, (this.total2 - this.data2)];

  doughnutChartType = 'doughnut';
  doughnutOptions: any = {
    cutoutPercentage: 85,
    responsive: true,
    maintainAspectRatio: true,
    legend: {
      display: false,
      position: 'bottom'
    },
    elements: {
      arc: {
        borderWidth: 0,
      }
    },
    tooltips: {
      enabled: false
    }
  };
  user: any = new Userr;

  constructor(private router: ActivatedRoute, private route: Router, private dataservice: DataService,
    private apiservice: ApiService,
    private auth: AuthsService) {
    this.user = dataservice.getOption();
      this.auth.userChanges.subscribe( data => {
        this.user = data;
      });
      this.dataservice.userChanges.subscribe( data => {
        this.user = data;
      });
      // this.user =dataservice.getOption()    
    this.router.params.subscribe(params => {
      this.user.id = params['id'];
    });
  }
  getUserById() {
    this.apiservice.getUserById(this.user.id).subscribe(res => {
      this.user = res;
  })
  }
  resetPasswordLink(data) {
    data = this.user
    this.route.navigate(['profile/settings', data.id]);
  }

  ngOnInit() {
    this.activeView = this.router.snapshot.params['view']
  this.getUserById()
  }

}
