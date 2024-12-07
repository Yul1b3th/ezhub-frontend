import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'help',
    title: 'EZHub | Help',
    loadComponent: () => import('./help/help.component'),
  },
  {
    path: 'contact',
    title: 'EZHub | Contact',
    loadComponent: () => import('./help/help.component'),
  },
  {
    path: '**',
    redirectTo: 'help',
  },
];

export default routes;
