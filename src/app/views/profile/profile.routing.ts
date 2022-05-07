import { Routes } from '@angular/router';
import { ProfileComponent } from "./profile.component";
import { ProfileOverviewComponent } from "./profile-overview/profile-overview.component";
import { ProfileSettingsComponent } from "./profile-settings/profile-settings.component";
import { ProfileBlankComponent } from "./profile-blank/profile-blank.component";
import { ChildTableComponent } from './child-table/child-table.component';

export const ProfileRoutes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [{
      path: 'overview',
      component: ProfileOverviewComponent,
      data: { title: 'Overview'}
    },
    {
      path: 'settings/:id',
      component: ProfileSettingsComponent,
      data: { title: 'Settings'}
    },
    {
      path: 'blank',
      component: ProfileBlankComponent,
      data: { title: 'Blank'}
    },
    {
      path: 'child/:id',
      component: ChildTableComponent,
      data: { title: 'Child'}
    },
    ]
  }
];