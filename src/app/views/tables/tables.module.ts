import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TablesRoutes } from './tables.routing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChartsModule } from 'ng2-charts';
import { FileUploadModule } from 'ng2-file-upload';
import { SharedPipesModule } from 'app/shared/pipes/shared-pipes.module';
import { TagTableComponent } from './tag-table/tag-table.component';
import { TagEditTableComponent } from './tag-edit-table/tag-edit-table.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ProgramTableComponent } from './program-table/program-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { SearchProviderPopupComponent } from './all-program-table/search-provider-popup/search-provider-popup.component';
import { AllProgramTableComponent } from './all-program-table/all-program-table.component';
import { ProgramDataPopupComponent } from './program-table/program-data-popup/program-data-popup.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ChildrenTableComponent } from './children-table/children-table.component';
import { UsersComponent } from './users/users.component';
import { AllUserComponent } from './all-user/all-user.component';
import { SharedModule } from 'app/shared/shared.module';
import { ParentTableComponent } from './parent-table/parent-table.component';
import { CategoryTableComponent } from './category-table/category-table.component';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { KeywordComponent } from './keyword/keyword.component';
import { KeywordFormComponent } from '../forms/keyword-form/keyword-form.component';
import { Ng5SliderModule } from 'ng5-slider';
import { TopicsComponent } from './topics/topics.component';
import { TopicFormComponent } from './topics/topic-form/topic-form.component';
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
    ScrollingModule,
    SharedModule,
    SharedMaterialModule,
    // CalendarModule.forRoot({
    //   provide: DateAdapter,
    //   useFactory: adapterFactory,
    // }),
    RouterModule.forChild(TablesRoutes),
    NgxDaterangepickerMd.forRoot(),
  ],

  declarations: [
    ParentTableComponent,
    ChildrenTableComponent,
    CategoryTableComponent,
    TagTableComponent,
    TagEditTableComponent,
    ProgramTableComponent,
    AllProgramTableComponent,
    SearchProviderPopupComponent,
    ProgramDataPopupComponent,
    UsersComponent,
    AllUserComponent,
    KeywordComponent,
    KeywordFormComponent,
    TopicsComponent,
    TopicFormComponent,
    MetaServiceComponent,
    MetaFormComponent,
  ],
  entryComponents: [SearchProviderPopupComponent, MetaFormComponent, TopicFormComponent, KeywordFormComponent, ProgramDataPopupComponent]
})
export class TablesModule { }
