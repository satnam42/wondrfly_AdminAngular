import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BetaUsersComponent } from './beta-users.component';
import { DeclinedUsersComponent } from './declined-users/declined-users.component';
import { EnrolledUsersComponent } from './enrolled-users/enrolled-users.component';
import { InvitedUsersComponent } from './invited-users/invited-users.component';
import { PendingVisitorsComponent } from './pending-visitors/pending-visitors.component';

export const betaRoutes: Routes = [
  {
    path:'',component:BetaUsersComponent,
    children: [
       {
        path: 'enrolled',
        component:EnrolledUsersComponent,
      },
      {
        path: 'invited',
        component: InvitedUsersComponent,
      },
      {
        path: 'pending',
        component: PendingVisitorsComponent,
      },
      {
        path: 'declined',
        component: DeclinedUsersComponent,
      },
    ]  
  }
];

@NgModule({
  imports: [RouterModule.forChild(betaRoutes)],
  exports: [RouterModule]
})
export class BetaUsersRoutingModule { }
