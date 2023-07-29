import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./home/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./home/register/register.module').then(m => m.RegisterModule)
  },
  {
    path: 'journey',
    loadChildren: () => import('./dashboard/journey/journey.module').then(m => m.JourneyModule)
  },
  {
    path: 'classes',
    loadChildren: () => import('./dashboard/classes/classes.module').then(m => m.ClassesModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
