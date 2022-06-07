import { Routes } from '@angular/router';
// import { CalenderComponent } from './calender/calender.component';
import { ProviderTableComponent } from './provider-table/provider-table.component';
import { CategoryTableComponent } from './category-table/category-table.component';
import { TagTableComponent } from './tag-table/tag-table.component';
import { ChildReportsComponent } from './child-reports/child-reports.component';
import { ProgramsReportsComponent } from './programs-reports/programs-reports.component';
import { ParentReportsComponent } from './parent-reports/parent-reports.component';
import { TagEditTableComponent } from './tag-edit-table/tag-edit-table.component';
import { AdminTableComponent } from './admin-table/admin-table.component';
import { ProgramTableComponent } from './program-table/program-table.component';
import { ClaimsTableComponent } from './claims-table/claims-table.component';
import { AllProgramTableComponent } from './all-program-table/all-program-table.component';
import { AmbassadorTableComponent } from './ambassador-table/ambassador-table.component';
import { AmbassadorPointsComponent } from './/ambassador-points/ambassador-points.component';
import { AddactivityComponent } from './addactivity/addactivity.component';
import { UpdateActivityComponent } from './update-activity/update-activity.component';
import { ProviderReportComponent } from './provider-report/provider-report.component';
import { ProgramReportComponent } from './program-report/program-report.component';
import { PublishedProgramsComponent } from './published-programs/published-programs.component';
import { EditProviderListComponent } from './edit-provider-list/edit-provider-list.component';
import { UnPublishedProgramsComponent } from './un-published-programs/un-published-programs.component';
import { ForumComponent } from './forum/forum.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { DuplicacyComponent } from './duplicacy/duplicacy.component';
import { BadgesComponent } from './badges/badges.component';
import { UnVerifiedProviderComponent } from './un-verified-provider/un-verified-provider.component';
import { FeedbackTableComponent } from './feedback-table/feedback-table.component';
import { ChildrenTableComponent } from './children-table/children-table.component';
import { UsersComponent } from './users/users.component';
import { FeedbackSurveyComponent } from './feedback-survey/feedback-survey.component';
import { AllUserComponent } from './all-user/all-user.component';
import { OnlineProgramsComponent } from './online-programs/online-programs.component';
import { ExpiredProgramsComponent } from './expired-programs/expired-programs.component';
import { AllExpiredComponent } from './all-expired/all-expired.component';
import { ParentTableComponent } from './parent-table/parent-table.component';
import { KeywordComponent } from './keyword/keyword.component';
import { SearchedKeywordsComponent } from './searched-keywords/searched-keywords.component';
export const TablesRoutes: Routes = [
  {
    path: '',
    children: [
    //   {
    //   path: 'fullscreen',
    //   component: FullscreenTableComponent,
    //   data: { title: 'Fullscreen', breadcrumb: 'FULLSCREEN' }
    // },
     {
      path: 'paging',
      component: ParentTableComponent,
      data: { title: 'PARENT'}
    },
    {
      path: 'admin',
      component: AdminTableComponent,
      data: { title: 'ADMIN'}
    },
    {
      path: 'category',
      component: CategoryTableComponent,
      data: { title: 'CATEGORY'}
    },
    {
      path: 'provider',
      component: ProviderTableComponent,
      data: { title: 'PROVIDER'}
    },
    {
      path: 'children',
      component: ChildrenTableComponent,
      data: { title: 'CHILDREN'}
    },
 
    //  {
    //   path: 'filter',
    //   component: FilterTableComponent,
    //   data: { title: 'Filter', breadcrumb: 'FILTER' }
    // },
    // {
    //   path: 'mat-table',
    //   component: MaterialTableComponent,
    //   data: { title: 'Material TAble', breadcrumb: 'Material Table' }
    // },
    {
      path: 'tag',
      component: TagTableComponent,
      data: { title: 'TAGS'}
    },
    {
      path: 'edit-tag',
      component: TagEditTableComponent,
      data: { title: 'EDIT-TAG', breadcrumb: 'edit-tag' }
    },
    // {
    //   path: 'reports',
    //   component: ReoprtsComponent,
    //   // data: { title: 'Material TAble', breadcrumb: 'Material Table' }
    // },
    {
      path: 'childReports',
      component: ChildReportsComponent,
      // data: { title: 'Material TAble', breadcrumb: 'Material Table' }
    },
    {
      path: 'parentReports',
      component: ParentReportsComponent,
      // data: { title: 'Material TAble', breadcrumb: 'Material Table' }
    }, {
      path: 'programReports',
      component: ProgramsReportsComponent,
      // data: { title: 'Material TAble', breadcrumb: 'Material Table' }
    },
    {
      path: 'program/:id',
      component: ProgramTableComponent,
      data: { title: 'PROGRAM', breadcrumb: 'PROGRAM' }
    },
    {
      path: 'all-program',
      component: AllProgramTableComponent,
      data: { title: 'ALL-PROGRAM'}
    },
    // {
    //   path: 'add-tag',
    //   component: AddTagFormComponent,
    //   data: { title: 'add-tag', breadcrumb: 'add-tag' }
    // },

    {
      path: 'badgeList',
      component: BadgesComponent,
    },
    {
      path: 'feedBack',
      component: FeedbackTableComponent,
    },
    {
      path: 'feedback-survey',
      component: FeedbackSurveyComponent,
    },


    {
      path: 'claims',
      component: ClaimsTableComponent,
      data: { title: 'claims', breadcrumb: 'claims' }
    },
    {
      path: 'ambassadors',
      component: AmbassadorTableComponent,
      data: { title: 'AMBASSADORS'}
    },
    {
      path: 'ambassador_points',
      component: AmbassadorPointsComponent,
      data: { title: 'ambassadors_points', breadcrumb: 'ambassadors_points' }
    },

    {
      path: 'addActivity',
      component: AddactivityComponent,
      data: { title: 'addActivity', breadcrumb: 'addActivity' }
    },
    {
      path: 'updateActivity',
      component: UpdateActivityComponent,
      data: { title: 'addActivity', breadcrumb: 'addActivity' }
    },
    {
      path: 'providerReport',
      component: ProviderReportComponent,
      data: { title: 'providerReport', breadcrumb: 'providerReport' }
    },
    {
      path: 'unverified-providers',
      component: UnVerifiedProviderComponent,
      data: { title: 'unverified-providers', breadcrumb: 'unverified-providers' }
    },
    {
      path: 'programList/:id',
      component: ProgramReportComponent,
      data: { title: 'providerReport', breadcrumb: 'providerReport' }
    },
    {
      path: 'published',
      component: PublishedProgramsComponent,
      data: { title: 'PUBLISHED', breadcrumb: 'published' }
    },
    {
      path: 'unpublish',
      component: UnPublishedProgramsComponent,
      data: { title: 'UNPUBLISHED', breadcrumb: 'unpublish' }
    },
    {
      path: 'expiring',
      component: ExpiredProgramsComponent,
      data: { title: 'EXPIRING', breadcrumb: 'expired' }
    },
    {
      path: 'expired',
      component: AllExpiredComponent,
      data: { title: 'EXPIRED', breadcrumb: 'expired' }
    },
    {
      path: 'online-programs',
      component: OnlineProgramsComponent,
      data: { title: 'online-programs', breadcrumb: 'online-programs' }
    },
    {
      path: 'edit-Provider/:id',
      component: EditProviderListComponent,
      data: { title: 'EDIT-PROVIDER', breadcrumb: 'edit-providersss' }
    },
    {
      path: 'forum',
      component: ForumComponent,
    },
    // {
    //   path: 'addNotifications',
    //   component: AddNotificationComponent,
    // },
    {
      path: 'notifications',
      component: NotificationsComponent,
    },
    {
      path: 'duplicacy',
      component: DuplicacyComponent,
    },
    {
      path: 'providers',
      component: UsersComponent,
      data: { title: 'PROVIDERS'}
    },
    {
      path: 'All-Users',
      component: AllUserComponent,
      data: { title: 'ALL-USERS'}
    },
    {
      path: 'keyword',
      component: KeywordComponent,
      data: { title: 'KEYWORDS'}
    },
    {
      path: 'keyword',
      component: KeywordComponent,
      data: { title: 'KEYWORDS'}
    },
    {
      path: 'keyword-logs',
      component: SearchedKeywordsComponent,
      data: { title: 'SEARCHED KEYWORDS'}
    },
    ]
  },
];
