import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TablesRoutes } from './tables.routing';
import { ProviderTableComponent } from './provider-table/provider-table.component';
import { ReoprtsComponent } from './reoprts/reoprts.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChartsModule } from 'ng2-charts';
import { FileUploadModule } from 'ng2-file-upload';
import { SharedPipesModule } from 'app/shared/pipes/shared-pipes.module';
import { TagTableComponent } from './tag-table/tag-table.component';
import { ChildReportsComponent } from './child-reports/child-reports.component';
import { ProgramsReportsComponent } from './programs-reports/programs-reports.component';
import { ParentReportsComponent } from './parent-reports/parent-reports.component';
import { TagEditTableComponent } from './tag-edit-table/tag-edit-table.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AdminTableComponent } from './admin-table/admin-table.component';
import { ProgramTableComponent } from './program-table/program-table.component';
import { AddTagFormComponent } from './add-tag-form/add-tag-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClaimsTableComponent } from './claims-table/claims-table.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { SearchProviderPopupComponent } from './all-program-table/search-provider-popup/search-provider-popup.component';
import { AllProgramTableComponent } from './all-program-table/all-program-table.component';
import { ProviderDataPopupComponent } from './provider-table/provider-data-popup/provider-data-popup.component';
import { ProgramDataPopupComponent } from './program-table/program-data-popup/program-data-popup.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { NgxEchartsModule } from 'ngx-echarts';
import { AmbassadorTableComponent } from './ambassador-table/ambassador-table.component';
import { AmbassadorPointsComponent } from './ambassador-points/ambassador-points.component';
import { AddactivityComponent } from './addactivity/addactivity.component';
import { UpdateActivityComponent } from './update-activity/update-activity.component';
import { ProgramReportComponent } from './program-report/program-report.component';
import { ProviderReportComponent } from './provider-report/provider-report.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { EditProviderListComponent } from './edit-provider-list/edit-provider-list.component';
import { ForumComponent } from './forum/forum.component';
import { AddNotificationComponent } from './add-notification/add-notification.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { DuplicacyDataPopupComponent } from './duplicacy/duplicacy-data-popup/duplicacy-data-popup.component';
import { DuplicacyComponent } from './duplicacy/duplicacy.component';
import { BadgesComponent } from './badges/badges.component';
// import { CalenderComponent } from './calender/calender.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { UnVerifiedProviderComponent } from './un-verified-provider/un-verified-provider.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FeedbackTableComponent } from './feedback-table/feedback-table.component';
import { ChildrenTableComponent } from './children-table/children-table.component';
import { UsersComponent } from './users/users.component';
import { EditFormComponent } from '../components/edit-form/edit-form.component';
import { FeedbackSurveyComponent } from './feedback-survey/feedback-survey.component';
import { AllUserComponent } from './all-user/all-user.component';
import { SharedModule } from 'app/shared/shared.module';
import { ExpiredProgramsComponent } from './expired-programs/expired-programs.component';
import { AllExpiredComponent } from './all-expired/all-expired.component';
import { ParentTableComponent } from './parent-table/parent-table.component';
import { CategoryTableComponent } from './category-table/category-table.component';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { KeywordComponent } from './keyword/keyword.component';
import { KeywordFormComponent } from '../forms/keyword-form/keyword-form.component';
import { Ng5SliderModule } from 'ng5-slider';
import { TopicsComponent } from './topics/topics.component';
import { TopicFormComponent } from './topics/topic-form/topic-form.component';
import { ProgramFormComponent } from './all-program-table/program-form/program-form.component';
import { AgmCoreModule } from '@agm/core';
import { MetaServiceComponent } from './meta-service/meta-service.component';
import { MetaFormComponent } from './meta-service/meta-form/meta-form.component';
import { SharedMaterialModule } from 'app/shared/shared-material.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    Ng5SliderModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NgxDatatableModule,
    InfiniteScrollModule,
    FlexLayoutModule,
    ChartsModule,
    FileUploadModule,
    SharedPipesModule,
    AutocompleteLibModule,
    NgxEchartsModule,
    ScrollingModule,
    SharedModule,
    SharedMaterialModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    RouterModule.forChild(TablesRoutes),
    NgxDaterangepickerMd.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD_5P0pxn1q9hvvTeCr3YCsDhLJoHwxs2c',
      libraries: ['places']
    }),
  ],

  declarations: [
    ParentTableComponent,
    ChildrenTableComponent,
    ProviderTableComponent,
    CategoryTableComponent,
    AddTagFormComponent,
    ReoprtsComponent,
    TagTableComponent,
    TagEditTableComponent,
    ChildReportsComponent,
    ProgramsReportsComponent,
    ParentReportsComponent,
    AdminTableComponent,
    ProgramTableComponent,
    AllProgramTableComponent,
    ClaimsTableComponent,
    SearchProviderPopupComponent,
    ProviderDataPopupComponent,
    ProgramDataPopupComponent,
    AmbassadorTableComponent,
    AmbassadorPointsComponent,
    AddactivityComponent,
    UpdateActivityComponent,
    ProgramReportComponent,
    ProviderReportComponent,
    EditProviderListComponent,
    ForumComponent,
    AddNotificationComponent,
    NotificationsComponent,
    DuplicacyComponent,
    DuplicacyDataPopupComponent,
    BadgesComponent,
    UnVerifiedProviderComponent,
    FeedbackTableComponent,
    UsersComponent,
    EditFormComponent,
    FeedbackSurveyComponent,
    AllUserComponent,
    ExpiredProgramsComponent,
    AllExpiredComponent,
    KeywordComponent,
    KeywordFormComponent,
    TopicsComponent,
    TopicFormComponent,
    ProgramFormComponent,
    MetaServiceComponent,
    MetaFormComponent,
  ],
  entryComponents: [SearchProviderPopupComponent, MetaFormComponent, DuplicacyDataPopupComponent, TopicFormComponent, ProgramFormComponent, ProviderDataPopupComponent, KeywordFormComponent, ProgramDataPopupComponent, UsersComponent, EditFormComponent, AllUserComponent]
})
export class TablesModule { }
