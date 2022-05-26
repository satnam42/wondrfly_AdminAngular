import { UpdateFormComponent } from './../components/update-form/update-form.component';
import { Routes } from '@angular/router';
import { BasicFormComponent } from './basic-form/basic-form.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { WizardComponent } from './wizard/wizard.component';
import { ProviderFormComponent } from './provider-form/provider-form.component';
import { ParentFormComponent } from './parent-form/parent-form.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { ChildFormComponent } from './child-form/child-form.component';
import { ProgramFormComponent } from './program-form/program-form.component';
import { AdminFormComponent } from './admin-form/admin-form.component';
import { EditProgramComponent } from './edit-program/edit-program.component';
import { AddcategoryFormComponent } from './addcategory-form/addcategory-form.component';
import { ParentUpdateFormComponent } from './parent-update-form/parent-update-form.component';
import { ProviderUpdateFormComponent } from './provider-update-form/provider-update-form.component';
import { ProviderQuickFormComponent } from './provider-quick-form/provider-quick-form.component';
import { AddFormComponent } from '../components/add-form/add-form.component';
import { KeywordFormComponent } from './keyword-form/keyword-form.component';

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
      data: { title: 'Upload'}
    }, {
      path: 'wizard/:id',
      component: WizardComponent,
      data: { title: 'ADD-PROGRAM'}
    },
    {
      path: 'edit-program/:id',
      component: EditProgramComponent,
      data: { title: 'EDIT-PROGRAM'}
    },
    {
      path: 'parent',
      component: ParentFormComponent,
      data: { title: 'PARENT'}
    },
    {
      path: 'parent-update',
      component: ParentUpdateFormComponent,
      data: { title: 'UPDATE-PARENT'}
    },
    {
      path: 'add-category',
      component: AddcategoryFormComponent,
      data: { title: 'ADD-CATEGORY'}
    },
    {
      path: 'category',
      component: CategoryFormComponent,
      data: { title: 'CATEGORY'}
    },
    {
      path: 'child/:id',
      component: ChildFormComponent,
      data: { title: 'CHILD'}
    },
    {
      path: 'provider',
      component: ProviderFormComponent,
      data: { title: 'PROVIDER'}
    },
    {
      path: 'provider-update/:id',
      component: ProviderUpdateFormComponent,
      data: { title: 'UPDATE-PROVIDER'}
    },
    {
      path: 'program/:id',
      component: ProgramFormComponent,
      data: { title: 'PROGRAM'}
    },
    {
      path: 'provider-quick',
      component: ProviderQuickFormComponent,
      data: { title: 'ADD-PROVIDER'}
    },
    {
      path: 'admin',
      component: AdminFormComponent,
      data: { title: 'ADMIN'}
    },
    {
      path:'new-form',
      component: AddFormComponent,
      data: { title: 'ADD-PROVIDER'}
    },
    {
      path:'new-form/:id',
      component: UpdateFormComponent,
      data: { title: 'UPDATE-PROVIDER'}
    },
    {
      path:'keyword-form/:id',
      component: KeywordFormComponent,
      data: { title: 'KEYWORD-FORM'}
    },
   ]
  }
];
