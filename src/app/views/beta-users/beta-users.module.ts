import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnrolledUsersComponent } from './enrolled-users/enrolled-users.component';
import { PendingVisitorsComponent } from './pending-visitors/pending-visitors.component';
import { InvitedUsersComponent } from './invited-users/invited-users.component';
import { BetaUsersComponent } from './beta-users.component';
import { BetaUsersRoutingModule } from './beta-users.routing';
import { SharedComponentsModule } from 'app/shared/components/shared-components.module';
import { DeclinedUsersComponent } from './declined-users/declined-users.component';
import { SharedMaterialModule } from 'app/shared/shared-material.module';


@NgModule({
  declarations: [BetaUsersComponent, EnrolledUsersComponent, PendingVisitorsComponent, InvitedUsersComponent, DeclinedUsersComponent],
  imports: [
    CommonModule,
    BetaUsersRoutingModule,
    SharedComponentsModule,
    SharedMaterialModule
  ],

})
export class BetaUsersModule { }
