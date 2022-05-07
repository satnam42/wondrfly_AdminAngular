import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './shared/components/layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './shared/components/layouts/auth-layout/auth-layout.component';
import { UserGuard } from './shared/services/auth/auth.guard';
export const rootRouterConfig: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'home',
  //   pathMatch: 'full'
  // },
  // {
  //   path: 'home',
  //   loadChildren: () => import('./views/home/home.module').then(m => m.HomeModule),
  //   data: { title: 'Choose A Demo' }
  // },
  {
    path: '',
    redirectTo: 'sessions/signin',
    pathMatch: 'full'
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'sessions',
        loadChildren: () => import('./views/sessions/sessions.module').then(m => m.SessionsModule),
      }
    ]
  },
  {
    path: '',
    component: AdminLayoutComponent, canActivate: [UserGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule),
      },
      {
        path: 'homes',
        loadChildren: () => import('./views/extraction-dashboard/extraction-dashboard.module').then(m => m.ExtractionDashboardModule),
        data: { title: 'HOMES' }
      },
      {
        path: 'profile',
        loadChildren: () => import('./views/profile/profile.module').then(m => m.ProfileModule),
        data: { title: 'PROFILE' }
      },

      {
        path: 'beta-program',
        loadChildren: () => import('./views/beta-users/beta-users.module').then(m => m.BetaUsersModule),
        data: { title: 'BETA' }
      },
      {
        path: 'tables',
        loadChildren: () => import('./views/tables/tables.module').then(m => m.TablesModule),
      },
      {
        path: 'user-analytics/:id',
        loadChildren: () => import('./views/user-analytics/user-analytics.module').then(m => m.UserAnalyticsModule),
      },
      {
        path: 'forms',
        loadChildren: () => import('./views/forms/forms.module').then(m => m.AppFormsModule),
      },
      {
        path: 'calendar',
        loadChildren: () => import('./views/app-calendar/app-calendar.module').then(m => m.AppCalendarModule),
      },
      {
        path: 'chat',
        loadChildren: () => import('./views/app-chats/app-chats.module').then(m => m.AppChatsModule),
      },

    ]
  },
  {
    path: '**',
    redirectTo: 'sessions/404'
  }
];

