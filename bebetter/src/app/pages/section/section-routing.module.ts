import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditItemFormComponent } from 'src/app/components/edit-item-form/edit-item-form.component';
import { FriendsComponent } from 'src/app/components/friends/friends.component';
import { ItemsReportsComponent } from 'src/app/components/items-reports/items-reports.component';
import { NewItemFormComponent } from 'src/app/components/new-item-form/new-item-form.component';
import { ProfileComponent } from 'src/app/components/profile/profile.component';
import { UserSettingsComponent } from 'src/app/components/user-settings/user-settings.component';
import { ViewItemComponent } from 'src/app/components/view-item/view-item.component';
import { HomeComponent } from '../../components/home/home.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'Home',
    pathMatch: 'full',
  },
  {
    path: 'Home',
    children: [
      {
        path: '',
        data: { title: 'Home' },
        component: HomeComponent,
      },
      {
        path: 'NewItem',
        data: { title: 'New Item' },
        component: NewItemFormComponent,
      },
      {
        path: 'EditItem/:id',
        data: { title: 'Edit Item' },
        component: EditItemFormComponent,
      },
      {
        path: 'ViewItem/:id',
        data: { title: 'View Item' },
        component: ViewItemComponent,
      },
    ],
  },
  {
    path: 'Reports',
    data: { title: 'Reports' },
    component: ItemsReportsComponent,
  },
  {
    path: 'Friends',
    data: { title: 'Friends' },
    component: FriendsComponent,
  },
  {
    path: 'Profile',
    data: { title: 'My Profile' },
    component: ProfileComponent,
  },
  {
    path: 'Settings',
    data: { title: 'Settings' },
    component: UserSettingsComponent,
  },
  {
    path: 'Reports',
    data: { title: 'Report' },
    loadChildren: () =>
      import('../../components/home/home.component').then(
        (m) => m.HomeComponent
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SectionPageRoutingModule {}
