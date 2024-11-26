import { Routes } from '@angular/router';
import { clearStateUrlGuard, isAuthenticatedGuard } from '@features/auth/guards';

export const routes: Routes = [
  // Home
  {
    path: 'rooms',
    canActivate: [clearStateUrlGuard],
    title: 'EZHub',
    loadChildren: () => import('./features/rooms/rooms.routes'),
  },

  // Auth
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes'),
  },

  // Dashboard
  // Profile
  // Properties
  // Rooms

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

  // Publish-Properties
  {
    path: 'publish/properties',
    canActivate: [isAuthenticatedGuard],
    title: 'EZHub | Publish ',
    children: [
      {
        path: 'add',
        loadComponent: () =>
          import('./components/properties/add/add.component'),
      },
      {
        path: 'edit/:id',
        canActivate: [isAuthenticatedGuard],
        loadComponent: () =>
          import('./components/properties/edit/edit.component'),
      },
      {
        path: ':id',
        loadComponent: () =>
          import('./components/properties/details/details.component'),
      },
    ],
  },

  // Publish-Rooms
  {
    path: 'publish/rooms',
    canActivate: [isAuthenticatedGuard],
    title: 'EZHub | Publish ',
    children: [
      {
        path: 'add',
        loadComponent: () => import('./components/rooms/add/add.component'),
      },
      {
        path: 'edit/:id',
        canActivate: [isAuthenticatedGuard],
        loadComponent: () => import('./components/rooms/edit/edit.component'),
      },
      {
        path: 'delete/:id',
        canActivate: [isAuthenticatedGuard],
        loadComponent: () =>
          import('./components/rooms/delete/delete.component'),
      },
      {
        path: ':id',
        loadComponent: () =>
          import(
            './components/rooms/publish-details/publish-details.component'
          ),
      },
      {
        path: '',
        redirectTo: 'rooms',
        pathMatch: 'full',
      },
    ],
  },


  // About
  {
    path: 'about',
    canActivate: [clearStateUrlGuard],
    title: 'EZHub | About',
    loadComponent: () => import('./pages/ezhub/about/about.component'),
  },

  // Legal notice
  {
    path: 'legal-notice',
    canActivate: [clearStateUrlGuard],
    title: 'EZHub | Legal notice',
    loadComponent: () =>
      import('./pages/ezhub/legal-notice/legal-notice.component'),
  },

  // terms-conditions
  {
    path: 'terms-conditions',
    canActivate: [clearStateUrlGuard],
    title: 'EZHub | Terms',
    loadComponent: () =>
      import('./pages/ezhub/terms-conditions/terms-conditions.component'),
  },

  // Contact
  {
    path: 'contactus',
    canActivate: [clearStateUrlGuard],
    title: 'EZHub | Contact',
    loadComponent: () => import('./pages/ezhub/contact/contact.component'),
  },

  // help-contact
  {
    path: 'help-contact',
    canActivate: [clearStateUrlGuard],
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
    canActivate: [clearStateUrlGuard],
    title: 'EZHub | 404',
    loadComponent: () =>
      import('./core/components/page-not-found/page-not-found.component'),
  },

  {
    path: '**',
    redirectTo: '404',
  },
];
