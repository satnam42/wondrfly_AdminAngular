import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserAnalyticsComponent } from './user-analytics.component';

const routes: Routes = [{
  path:'', component:UserAnalyticsComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserAnalyticsRoutingModule { }
