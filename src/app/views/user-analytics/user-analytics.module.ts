import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAnalyticsRoutingModule } from './user-analytics-routing.module';
import { UserAnalyticsComponent } from './user-analytics.component';
import { SharedMaterialModule } from 'app/shared/shared-material.module';

@NgModule({
  declarations: [UserAnalyticsComponent],
  imports: [
    CommonModule,
    UserAnalyticsRoutingModule,
    SharedMaterialModule
  ]
})
export class UserAnalyticsModule { }
