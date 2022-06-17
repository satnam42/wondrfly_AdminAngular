import { Routes } from '@angular/router';
import { AnalyticsComponent } from './analytics/analytics.component';
import { DashboardDarkComponent } from './dashboard-dark/dashboard-dark.component';
import { CryptocurrencyComponent } from './cryptocurrency/cryptocurrency.component';
import { DefaultDashboardComponent } from './default-dashboard/default-dashboard.component';
import { UpdateForumComponent } from './update-forum/update-forum.component';
import { PlansComponent } from './plans/plans.component';
import { PlanFeaturesComponent } from './plan-features/plan-features.component';


export const DashboardRoutes: Routes = [
  {
    path: 'default',
    component: DefaultDashboardComponent,
  },
  {
    path: 'analytics',
    component: AnalyticsComponent,
    data: { title: 'WONDRFLY' }
  },
  {
    path: 'crypto',
    component: CryptocurrencyComponent,
  },
  {
    path: 'dark',
    component: DashboardDarkComponent,
  },


  {
    path: 'updateTopic',
    component: UpdateForumComponent,

  },


  {
    path: 'plans',
    component: PlansComponent,
  },

  {
    path: 'featureList',
    component: PlanFeaturesComponent,
  },


];
