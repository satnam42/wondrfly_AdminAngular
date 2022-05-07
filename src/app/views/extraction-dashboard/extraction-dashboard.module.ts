import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { ExtrationRoutes } from './extraction-dashboard.routing';
import { ChartsModule } from 'ng2-charts';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatAutocompleteModule, MatButtonModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatDialogModule, MatExpansionModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatOptionModule, MatPaginatorModule, MatProgressBarModule, MatRadioModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatTableModule, MatTabsModule, MatTooltipModule } from '@angular/material';
import { SharedPipesModule } from 'app/shared/pipes/shared-pipes.module';
import { NgxEchartsModule } from 'ngx-echarts';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    Ng2SearchPipeModule,
    MatButtonModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    MatMenuModule,
    MatButtonModule,
    MatChipsModule,
    MatListModule,
    MatTooltipModule,
    MatDialogModule,
    MatDatepickerModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    NgxDatatableModule,
    MatListModule,
    MatIconModule,
    InfiniteScrollModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    MatSlideToggleModule,
    MatGridListModule,
    MatCheckboxModule,
    MatRadioModule,
    MatTabsModule,
    MatProgressBarModule,
    FlexLayoutModule,
    ChartsModule,
    MatOptionModule,
    MatAutocompleteModule,
    MatSnackBarModule,
    SharedPipesModule,
    MatExpansionModule,
    NgxEchartsModule,
    ScrollingModule, 
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    RouterModule.forChild(ExtrationRoutes)

  ],
})
export class ExtractionDashboardModule { }
