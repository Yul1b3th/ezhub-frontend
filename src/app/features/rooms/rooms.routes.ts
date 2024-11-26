import { Routes } from '@angular/router';
import { isAuthenticatedGuard } from '@features/auth/guards';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./rooms.component'),
    children: [
      {
        path: 'list',
        title: 'EZHub',
        loadComponent: () => import('./list/list.component'),
      },
      {
        path: 'map',
        title: 'EZHub',
        loadComponent: () => import('./map/map.component'),
      },
    ],
  },
  {
    path: ':id',
    title: 'EZHub | Room',
    loadComponent: () =>
    import('./details/details.component'),
  },
  {
    path: 'contact/:id',
    canActivate: [isAuthenticatedGuard],
    title: 'EZHub | Contact ',
    loadComponent: () => import('./contact/contact.component'),
  },
];

export default routes;
