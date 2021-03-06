import { UpdateFormComponent } from './../components/update-form/update-form.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { FlexLayoutModule } from '@angular/flex-layout';
import { QuillModule } from 'ngx-quill';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import { FormsRoutes } from './forms.routing';
import { WizardComponent } from './wizard/wizard.component';
import { ParentFormComponent } from './parent-form/parent-form.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { ChildFormComponent } from './child-form/child-form.component';
import { EditProgramComponent } from './edit-program/edit-program.component';
import { ParentUpdateFormComponent } from './parent-update-form/parent-update-form.component';
import { Ng5SliderModule } from 'ng5-slider';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { UpdateBatchPopupComponent } from './edit-program/update-batch-popup/update-batch-popup.component';
import { AddBatchComponent } from './program-form/add-batch/add-batch-.component';
import { AgmCoreModule } from '@agm/core';
import { AddFormComponent } from '../components/add-form/add-form.component';
import { SharedMaterialModule } from 'app/shared/shared-material.module';
import { ProgramFormComponent } from '../tables/all-program-table/program-form/program-form.component';
import { ProviderFormComponent } from './provider-form/provider-form.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    Ng5SliderModule,
    AutocompleteLibModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    FlexLayoutModule,
    QuillModule,
    NgxDatatableModule,
    FileUploadModule,
    SharedMaterialModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD_5P0pxn1q9hvvTeCr3YCsDhLJoHwxs2c',
      libraries: ['places']
    }),
    RouterModule.forChild(FormsRoutes)
  ],
  declarations: [
    EditProgramComponent,
    WizardComponent,
    ParentFormComponent,
    ParentUpdateFormComponent,
    CategoryFormComponent,
    ChildFormComponent,
    AddBatchComponent,
    AddFormComponent,
    ProgramFormComponent,
    UpdateBatchPopupComponent,
    UpdateFormComponent,
    ProviderFormComponent,],
  providers: [],
  entryComponents: [AddBatchComponent, UpdateBatchPopupComponent]
})
export class AppFormsModule { }