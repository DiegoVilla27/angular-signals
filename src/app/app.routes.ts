import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    title: 'Home',
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'counter'
      },
      {
        title: 'Counter Example',
        path: 'counter',
        loadComponent: () => import('./pages/counter/counter.component').then(c => c.CounterComponent)
      },
      {
        title: 'Users Example',
        path: 'users',
        loadComponent: () => import('./pages/users/users.component').then(c => c.UsersComponent)
      },
      // {
      //   title: 'Cases Example',
      //   path: 'cases',
      //   loadComponent: () => import('./pages/cases/cases.component').then(c => c.CasesComponent)
      // },
      // {
      //   title: 'Defer Example',
      //   path: 'defer',
      //   loadComponent: () => import('./pages/defer/defer.component').then(c => c.DeferComponent)
      // },
      {
        path: '**',
        redirectTo: 'counter'
      }
    ]
  }
];