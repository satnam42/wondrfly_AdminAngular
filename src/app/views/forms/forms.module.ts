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
import { BasicFormComponent } from './basic-form/basic-form.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { FormsRoutes } from './forms.routing';
import { WizardComponent } from './wizard/wizard.component';
import { ParentFormComponent } from './parent-form/parent-form.component';
import { ProviderFormComponent } from './provider-form/provider-form.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { ChildFormComponent } from './child-form/child-form.component';
import { AdminFormComponent } from './admin-form/admin-form.component';
import { EditProgramComponent } from './edit-program/edit-program.component';
import { AddcategoryFormComponent } from './addcategory-form/addcategory-form.component';
import { ParentUpdateFormComponent } from './parent-update-form/parent-update-form.component';
import { ProviderUpdateFormComponent } from './provider-update-form/provider-update-form.component';
import { Ng5SliderModule } from 'ng5-slider';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { UpdateBatchPopupComponent } from './edit-program/update-batch-popup/update-batch-popup.component';
import { AddBatchComponent } from './program-form/add-batch/add-batch-.component';
import { ProgramLocationComponent } from './program-form/program-location/program-location.component';
import { AgmCoreModule } from '@agm/core';
import { ProviderQuickFormComponent } from './provider-quick-form/provider-quick-form.component';
import { AddFormComponent } from '../components/add-form/add-form.component';
import { SharedMaterialModule } from 'app/shared/shared-material.module';

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
  declarations: [BasicFormComponent,
    EditProgramComponent,
    FileUploadComponent,
    WizardComponent,
    ParentFormComponent,
    ParentUpdateFormComponent,
    ProviderFormComponent,
    ProviderQuickFormComponent,
    ProviderUpdateFormComponent,
    CategoryFormComponent,
    AddcategoryFormComponent,
    ChildFormComponent,
    AdminFormComponent,
    AddBatchComponent,
    AddBatchComponent,
    AddFormComponent,
    ProgramLocationComponent,
    UpdateBatchPopupComponent,
    UpdateFormComponent,],
  providers: [],
  entryComponents: [ProgramLocationComponent, AddBatchComponent, UpdateBatchPopupComponent]
})
export class AppFormsModule { }