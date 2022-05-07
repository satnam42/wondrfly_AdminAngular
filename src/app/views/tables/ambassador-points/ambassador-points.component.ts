import { Component, OnInit, OnChanges, } from '@angular/core';
import { TablesService } from '../tables.service';
import { Router } from '@angular/router';
import { ApiService } from 'app/shared/services/api.service.service';
import { MatSnackBar } from '@angular/material';
import { AppLoaderService } from '../../../shared/services/app-loader/app-loader.service';
import { DataService } from 'app/shared/services/dataservice.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ambassador-points',
  templateUrl: './ambassador-points.component.html',
  styleUrls: ['./ambassador-points.component.scss']
})
export class AmbassadorPointsComponent implements OnInit {
  ambassadorspoints: any = [];
  ambassadorsPointsList: any = [];
  message: string = 'Ambassador points !';
  action: boolean = true;
  setAutoHide: boolean = true;
  userResponse: any;
  autoHide: number = 4000;
  categoryResponse: any;
  searchText: '';
  ambss: any = [];
  pointss: any = [];
  rewardpointIds: any = [];
  activityForm: FormGroup;
  ForumResponse: any;
  constructor(private service: TablesService,
    public route: Router,
    private snack: MatSnackBar,
    private apiservice: ApiService,
    private loader: AppLoaderService,
    private dataService: DataService
  ) 
  {
    this.ambss = dataService.getOption();
  }
      
  ngOnInit() {
    this.kk();
    this.activityForm = new FormGroup({
      // ambassadorId: new FormControl(''),
      point: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      activity: new FormControl('', Validators.required),
    })
  }
  kk(){
    
    this.ambss.rewardpointIds.reverse();
  }
  Activity() {
        const simar: any = {
          ambassadorId: this.ambss._id,
          point : this.activityForm.value.point,
          description : this.activityForm.value.description,
          activity : this.activityForm.value.activity,
    
    }
        this.apiservice.addAdjust(simar).subscribe(res => {
          this.ForumResponse = res;
          this.loader.close();
          if (this.ForumResponse.statusCode == 200) {
            this.snack.open(this.message, 'OK', { duration: 4000 })
            this.route.navigate(['tables/ambassadors']);
          } else {
            let msg = "Activity Name Already Exists";
            this.snack.open(msg, 'OK', { duration: 2000 })
          }
        });
      }

  // getAmbassadorPoints() {
  //   this.loader.open();
  //   this.apiservice.ambassadorsList().subscribe(res => {
  //     this.ambassadorspoints = res;
  //     this.ambassadorsPointsList = this.ambassadorspoints.data;
  //     this.loader.close();
  //   });
  // }

  goto(data) {
    this.dataService.setOption(data);
    this.route.navigateByUrl('tables/addActivity')
  }
}
