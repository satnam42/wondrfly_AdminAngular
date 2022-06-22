import { Routes } from '@angular/router';
import { CategoryTableComponent } from './category-table/category-table.component';
import { TagTableComponent } from './tag-table/tag-table.component';
import { TagEditTableComponent } from './tag-edit-table/tag-edit-table.component';
import { ProgramTableComponent } from './program-table/program-table.component';
import { AllProgramTableComponent } from './all-program-table/all-program-table.component';
import { ChildrenTableComponent } from './children-table/children-table.component';
import { UsersComponent } from './users/users.component';
import { AllUserComponent } from './all-user/all-user.component';
import { ParentTableComponent } from './parent-table/parent-table.component';
import { KeywordComponent } from './keyword/keyword.component';
import { TopicsComponent } from './topics/topics.component';
import { MetaServiceComponent } from './meta-service/meta-service.component';
export const TablesRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'paging',
        component: ParentTableComponent,
        data: { title: 'PARENT' }
      },
      {
        path: 'category',
        component: CategoryTableComponent,
        data: { title: 'CATEGORY' }
      },
      {
        path: 'children',
        component: ChildrenTableComponent,
        data: { title: 'CHILDREN' }
      },
      {
        path: 'tag',
        component: TagTableComponent,
        data: { title: 'TAGS' }
      },
      {
        path: 'edit-tag',
        component: TagEditTableComponent,
        data: { title: 'EDIT-TAG' }
      },
      {
        path: 'program/:id',
        component: ProgramTableComponent,
        data: { title: 'PROGRAM' }
      },
      {
        path: 'all-program',
        component: AllProgramTableComponent,
        data: { title: 'ALL-PROGRAM' }
      },
      {
        path: 'providers',
        component: UsersComponent,
        data: { title: 'PROVIDERS' }
      },
      {
        path: 'All-Users',
        component: AllUserComponent,
        data: { title: 'ALL-USERS' }
      },
      {
        path: 'keyword',
        component: KeywordComponent,
        data: { title: 'KEYWORDS' }
      },
      {
        path: 'topics',
        component: TopicsComponent,
        data: { title: 'TOPICS' }
      },
      {
        path: 'meta-service',
        component: MetaServiceComponent,
        data: { title: 'META-SERVICE' }
      },
    ]
  },
];
