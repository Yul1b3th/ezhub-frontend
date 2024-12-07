import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home.component'),
    children: [
      {
        path: 'list',
        title: 'EZHub',
        loadComponent: () => import('./rooms-list/rooms-list.component'),
      },
      {
        path: 'map',
        title: 'EZHub',
        loadComponent: () => import('./rooms-map/rooms-map.component'),
      },
      {
        path: 'contact/:id',
        //canActivate: [isAuthenticatedGuard],
        title: 'EZHub | Contact ',
        loadComponent: () => import('./contact/contact.component'),
      },
      {
        path: ':id',
        title: 'EZHub | Room',
        loadComponent: () => import('./details/details.component'),
      },
      {
        path: '**',
        redirectTo: 'list',
      },
    ],
  },
];

export default routes;
