import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChartsModule } from 'ng2-charts';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedPipesModule } from 'app/shared/pipes/shared-pipes.module';
import { DashboardRoutes } from './dashboard.routing';
import { AnalyticsComponent } from './analytics/analytics.component';
import { DashboardDarkComponent } from './dashboard-dark/dashboard-dark.component';
import { CryptocurrencyComponent } from './cryptocurrency/cryptocurrency.component';
import { DefaultDashboardComponent } from './default-dashboard/default-dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateForumComponent } from './update-forum/update-forum.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { PlansComponent } from './plans/plans.component';
import { PlanFeaturesComponent } from './plan-features/plan-features.component';
import { SharedMaterialModule } from 'app/shared/shared-material.module';

@NgModule({
  imports: [
    CommonModule,
    Ng2SearchPipeModule,
    FlexLayoutModule,
    ChartsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxEchartsModule,
    NgxDatatableModule,
    SharedPipesModule,
    SharedMaterialModule,
    AutocompleteLibModule,
    RouterModule.forChild(DashboardRoutes)
  ],
  declarations: [AnalyticsComponent,
    DashboardDarkComponent, CryptocurrencyComponent,
    DefaultDashboardComponent, UpdateForumComponent, PlansComponent, PlanFeaturesComponent],
  exports: [],
  entryComponents: []

})
export class DashboardModule {

}
