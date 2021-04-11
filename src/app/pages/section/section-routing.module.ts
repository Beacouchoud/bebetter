import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditItemFormComponent } from 'src/app/components/edit-item-form/edit-item-form.component';
import { NewItemFormComponent } from 'src/app/components/new-item-form/new-item-form.component';
import { HomeComponent } from '../../components/home/home.component';

import { SectionPage } from './section.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'Home',
    pathMatch: 'full'
  },
  {
    path: 'Home',
    data: {title: 'Home'},
    component: HomeComponent
  },
  {
    path: 'Reports',
    data: {title: 'Report'},
    loadChildren: () => import('../../components/home/home.component').then( m => m.HomeComponent)
  },
  {
    path: 'Home/NewItem',
    data: {title: 'New Item'},
    component: NewItemFormComponent
  },
  {
    path: 'Home/EditItem/:id',
    data: {title: 'Edit Item'},
    component: EditItemFormComponent
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SectionPageRoutingModule {}
