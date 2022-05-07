import { NavigationEnd, Router } from '@angular/router';
import { ApiService } from 'app/shared/services/api.service.service';
import { Component, OnInit} from '@angular/core';
import { DataService } from 'app/shared/services/dataservice.service';

@Component({
  selector: 'app-beta-users',
  template: `<div class="container">

    <div class="beta-program">
      <div class="search-flex">
        <h1 class="beta-heading">Beta user list<span>({{userResponse?.total}}) </span></h1>

        <!-- <div class="search-section search-bar">
          <input type="text" class="search_input" placeholder="Search By Feature Name"/>
          <i class="fa fa-filter filter-icon"></i>
          <span class="back-search">
            <mat-icon style="position:relative;top: 4px; float: right;">search</mat-icon>
          </span>
        </div> -->
      <!-- <div class="">
    <mat-form-field>
      <mat-label>Select Round</mat-label>
      <mat-select >
        <mat-option  *ngFor="let item of filterColumns" [value]="item" (click)="selectedRound(item)">
         {{item}}
        </mat-option>
      </mat-select>
    </mat-form-field>
  </div> -->
        <div class="flex-boxes">
        <div class="box-beta">
            <h1>All Invitation </h1>
            <h2 *ngIf="userResponse?.total">{{userResponse?.total}} </h2>
            <h2 *ngIf="!userResponse?.total">0 </h2>

        </div>
        <div class="box-beta clr">
            <h1>Accepted</h1>
            <h2>{{userResponse?.accepted}}</h2>
        </div>

        <div class="box-beta clr1">
            <h1>Pending</h1>
            <h2>{{userResponse?.pending}}</h2>
        </div>

        <div class="box-beta clr2">
            <h1>Declined</h1>
            <!-- <h2>{{userResponse?.declined}}</h2> -->
            <h2>{{userResponse?.declined}}</h2>

        </div>
      </div>
      </div>
      
     
      <ul class="nav">
        <li class="nav-item">
          <a class="nav-link" (click)="enrolledRouter()"  [class.selected]="routeName=='/beta-program/enrolled'" >Enrolled Users</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" (click)="pendingRouter()" [class.selected]="routeName=='/beta-program/pending'"  >Pending Visitors</a>
        </li>
        <!-- <li class="nav-item">
          <a class="nav-link"  (click)="invitedRouter()"  [class.selected]="routeName=='/beta-program/invited'">Invited Users</a>
        </li> -->
        <li class="nav-item">
          <a class="nav-link"  (click)="declinedRouter()"  [class.selected]="routeName=='/beta-program/declined'">Declined Users</a>
        </li>
      </ul>
    </div>
  <router-outlet></router-outlet>
</div>`,
  styleUrls: ['./beta-users.component.css']
})
export class BetaUsersComponent implements OnInit{
  userResponse:any = []
  routeName = '';
  data: any;
  filterColumns: string[] = [
    'Round-1',
    'Round-2',
    'Round-3',
  ];
 
  constructor(private api:ApiService,
    private router: Router,
    private dataservice: DataService) {
      this.router.events.subscribe((event: any) => {
        if (event instanceof NavigationEnd) {
            this.routeName = event.url;          
        }
    });

    this.dataservice.dataChanges.subscribe( data => {
      this.data = data;
      this.betaProgramUsers();
    });

   }

   selectedRound(){

   }


betaProgramUsers(){
this.api.betaProgramUsers().subscribe((res:any)=>{
  console.log(res)
  if(res.isSuccess){
    this.userResponse = res;
  }
})
}
  ngOnInit() {
    this.betaProgramUsers()
  }
  enrolledRouter(){
  this.router.navigate(['/beta-program/enrolled'])
}
pendingRouter(){
  this.router.navigate(['/beta-program/pending'])
}
invitedRouter(){
  this.router.navigate(['/beta-program/invited'])
   
}
declinedRouter(){
  this.router.navigate(['/beta-program/declined'])
}

}
