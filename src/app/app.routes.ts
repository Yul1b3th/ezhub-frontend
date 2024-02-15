import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'EZHub',
    loadComponent: () => import('./components/home/home.component'),
  },
  {
    path: '404',
    title: 'EZHub | 404',
    loadComponent: () =>
      import('./components/shared/error404/error404.component'),
  },
  {
    path: '**',
    redirectTo: '404',
  },
];
