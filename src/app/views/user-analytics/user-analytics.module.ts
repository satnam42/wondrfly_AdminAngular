import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserAnalyticsRoutingModule } from './user-analytics-routing.module';
import { UserAnalyticsComponent } from './user-analytics.component';
import { MatListModule, MatIconModule, MatButtonModule, MatCardModule, MatMenuModule, MatSlideToggleModule, MatGridListModule, MatChipsModule, MatCheckboxModule, MatRadioModule, MatTabsModule, MatInputModule, MatProgressBarModule, MatTooltipModule } from '@angular/material';

@NgModule({
  declarations: [UserAnalyticsComponent],
  imports: [
    CommonModule,
    UserAnalyticsRoutingModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    MatSlideToggleModule,
    MatGridListModule,
    MatChipsModule,
    MatCheckboxModule,
    MatRadioModule,
    MatTabsModule,
    MatInputModule,
    MatProgressBarModule,
    MatTooltipModule
  ]
})
export class UserAnalyticsModule { }
