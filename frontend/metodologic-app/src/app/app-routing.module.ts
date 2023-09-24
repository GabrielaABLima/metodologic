import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/landing/landing.module').then(m => m.LandingModule)
  },
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
  },
  {
    path: 'homeworks',
    loadChildren: () => import('./dashboard/homeworks/homeworks.module').then(m => m.HomeworksModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./dashboard/profile/profile.module').then(m => m.ProfileModule)
  },
  {
    path: 'question/:type/:id',
    loadChildren: () => import('./dashboard/questao-container/questao-container.module').then(m => m.QuestaoContainerModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
