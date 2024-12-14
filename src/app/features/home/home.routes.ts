import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home.component'),
    children: [
      {
        path: 'list',
        title: 'EZHub | List',
        loadComponent: () => import('./rooms-list/rooms-list.component'),
      },
      {
        path: 'map',
        title: 'EZHub | Map',
        loadComponent: () => import('./rooms-map/rooms-map.component'),
      },
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'contact/:id',
    title: 'EZHub | Contact',
    loadComponent: () => import('./contact/contact.component'),
  },
  {
    path: 'details/:id',
    title: 'EZHub | Room Details',
    loadComponent: () => import('./details/details.component'),
  },
  {
    path: '**',
    redirectTo: 'rooms/list',
    pathMatch: 'full',
  },
  // {
  //   path: '**',
  //   redirectTo: '/404',
  //   pathMatch: 'full',
  // },
];

export default routes;
