import { Routes } from '@angular/router';
import { WizardComponent } from './wizard/wizard.component';
import { ParentFormComponent } from './parent-form/parent-form.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { ChildFormComponent } from './child-form/child-form.component';
import { EditProgramComponent } from './edit-program/edit-program.component';
import { ParentUpdateFormComponent } from './parent-update-form/parent-update-form.component';
import { ProgramFormComponent } from '../tables/all-program-table/program-form/program-form.component';
import { ProviderFormComponent } from './provider-form/provider-form.component';

export const FormsRoutes: Routes = [
  {
    path: '',
    children: [
      {
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
        path: 'category',
        component: CategoryFormComponent,
        data: { title: 'CATEGORY' }
      },
      {
        path: 'child/:id',
        component: ChildFormComponent,
        data: { title: 'CHILD' }
      },
      // {
      //   path: 'provider-form',
      //   component: AddFormComponent,
      //   data: { title: 'ADD-PROVIDER' }
      // },
      {
        path: 'provider-form/:id',
        component: ProviderFormComponent,
        data: { title: 'ADD-PROVIDER' }
      },
      // {
      //   path: 'provider-form-update/:id',
      //   component: UpdateFormComponent,
      //   data: { title: 'UPDATE-PROVIDER' }
      // },
    ]
  }
];
