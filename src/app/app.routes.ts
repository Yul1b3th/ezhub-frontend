import { Routes } from '@angular/router';

import PageNotFoundComponent from '@core/components/page-not-found/page-not-found.component';

export const routes: Routes = [
  {
    path: 'rooms',
    title: 'EZHub',
    loadChildren: () => import('./features/home/home.routes'),
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes'),
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./features/dashboard/dashboard.routes'),
  },
  {
    path: 'company-info',
    loadChildren: () => import('./pages/ezhub/ezhub.routes'),
  },
  {
    path: 'help-contact',
    loadChildren: () => import('./pages/help-contact/help-contact.routes'),
  },
  {
    path: '404',
    title: 'EZHub | 404',
    component: PageNotFoundComponent,
  },
  {
    path: '',
    redirectTo: 'rooms',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '404',
  },
];
