import { UpdateFormComponent } from './../components/update-form/update-form.component';
import { Routes } from '@angular/router';
import { BasicFormComponent } from './basic-form/basic-form.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { WizardComponent } from './wizard/wizard.component';
import { ParentFormComponent } from './parent-form/parent-form.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { ChildFormComponent } from './child-form/child-form.component';
import { AdminFormComponent } from './admin-form/admin-form.component';
import { EditProgramComponent } from './edit-program/edit-program.component';
import { AddcategoryFormComponent } from './addcategory-form/addcategory-form.component';
import { ParentUpdateFormComponent } from './parent-update-form/parent-update-form.component';
import { AddFormComponent } from '../components/add-form/add-form.component';
import { ProgramFormComponent } from '../tables/all-program-table/program-form/program-form.component';

export const FormsRoutes: Routes = [
  {
    path: '',
    children: [{
      path: 'basic',
      component: BasicFormComponent,
      data: { title: '', breadcrumb: 'BASIC' }
    },
    {
      path: 'upload',
      component: FileUploadComponent,
      data: { title: 'Upload' }
    }, {
      path: 'wizard/:id',
      component: WizardComponent,
      data: { title: 'ADD-PROGRAM' }
    },
    {
      path: 'edit-program/:id',
      component: EditProgramComponent,
      data: { title: 'EDIT-PROGRAM' }
    },
    {
      path: 'program-form/:id',
      component: ProgramFormComponent,
      data: { title: 'PROGRAM-FORM' }
    },
    {
      path: 'parent',
      component: ParentFormComponent,
      data: { title: 'PARENT' }
    },
    {
      path: 'parent-update',
      component: ParentUpdateFormComponent,
      data: { title: 'UPDATE-PARENT' }
    },
    {
      path: 'add-category',
      component: AddcategoryFormComponent,
      data: { title: 'ADD-CATEGORY' }
    },
    {
      path: 'category',
      component: CategoryFormComponent,
      data: { title: 'CATEGORY' }
    },
    {
      path: 'child/:id',
      component: ChildFormComponent,
      data: { title: 'CHILD' }
    },
    {
      path: 'admin',
      component: AdminFormComponent,
      data: { title: 'ADMIN' }
    },
    {
      path: 'provider-form',
      component: AddFormComponent,
      data: { title: 'ADD-PROVIDER' }
    },
    {
      path: 'provider-form-update/:id',
      component: UpdateFormComponent,
      data: { title: 'UPDATE-PROVIDER' }
    },
    ]
  }
];
