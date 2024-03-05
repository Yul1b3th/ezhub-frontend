import { Routes } from '@angular/router';

import {
  isAuthenticatedGuard,
  isNotAuthenticatedGuard,
} from './components/auth/guards';

export const routes: Routes = [
  // Home
  {
    path: '',
    title: 'EZHub',
    // pathMatch: 'full',
    loadComponent: () => import('./components/home/home.component'),
    children: [
      {
        path: 'list',
        title: 'EZHub | List',
        loadComponent: () => import('./components/rooms/list/list.component'),
      },
      {
        path: 'map',
        title: 'EZHub | Map',
        loadComponent: () => import('./components/rooms/map/map.component'),
      },
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
    ],
  },

  {
    path: 'rooms',
    children: [
      {
        path: 'edit/:id',
        title: 'EZHub | Room',
        loadComponent: () => import('./components/rooms/edit/edit.component'),
      },
      {
        path: ':id',
        title: 'EZHub | Room',
        loadComponent: () =>
          import('./components/rooms/details/details.component'),
      },
    ],
  },

  // Publish
  {
    path: 'publish',
    canActivate: [isAuthenticatedGuard],
    title: 'EZHub | Publish ',
    loadComponent: () => import('./components/publish/publish.component'),
    children: [
      {
        path: 'properties',
        loadComponent: () =>
          import('./components/properties/list/list.component'),
      },
      {
        path: 'rooms',
        loadComponent: () =>
          import('./components/rooms/list-jwt/list-jwt.component'),
      },
      {
        path: '',
        redirectTo: 'properties',
        pathMatch: 'full',
      },
    ],
  },

  // Contact
  {
    path: 'contact',
    canActivate: [isAuthenticatedGuard],
    title: 'EZHub | Contact ',
    loadComponent: () => import('./components/contact/contact.component'),
  },

  // Log In
  {
    path: 'log-in',
    //canActivate: [isNotAuthenticatedGuard],
    title: 'EZHub | Log In',
    loadComponent: () => import('./components/auth/login/login.component'),
  },

  // Sign Up
  {
    path: 'sign-up',
    //canActivate: [isNotAuthenticatedGuard],
    title: 'EZHub | Sign Up',
    loadComponent: () =>
      import('./components/auth/register/register.component'),
  },

  // About
  {
    path: 'about',
    title: 'EZHub | About',
    loadComponent: () => import('./pages/ezhub/about/about.component'),
  },

  // Legal notice
  {
    path: 'legal-notice',
    title: 'EZHub | Legal notice',
    loadComponent: () =>
      import('./pages/ezhub/legal-notice/legal-notice.component'),
  },

  // terms-conditions
  {
    path: 'terms-conditions',
    title: 'EZHub | Terms',
    loadComponent: () =>
      import('./pages/ezhub/terms-conditions/terms-conditions.component'),
  },

  // Contact
  {
    path: 'contact',
    title: 'EZHub | Contact',
    loadComponent: () => import('./pages/ezhub/contact/contact.component'),
  },

  // help-contact
  {
    path: 'help-contact',
    children: [
      {
        path: 'help',
        title: 'EZHub | Help',
        loadComponent: () => import('./pages/help-contact/help/help.component'),
      },
      {
        path: 'contact',
        title: 'EZHub | Contact',
        loadComponent: () =>
          import('./pages/help-contact/contact/contact.component'),
      },
    ],
  },

  // error404
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
