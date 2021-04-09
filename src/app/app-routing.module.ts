import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SectionPage } from './pages/section/section.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'section',
    pathMatch: 'full'
  },
  {
    path: 'section',
    component: SectionPage,
    loadChildren: () => import('./pages/section/section.module').then( m => m.SectionPageModule)
  },
  {
    path: 'singin',
    loadChildren: () => import('./pages/singin/singin.module').then( m => m.SinginPageModule)
  },
  {
    path: 'singup',
    loadChildren: () => import('./pages/singup/singup.module').then( m => m.SingupPageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules,enableTracing: false })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
