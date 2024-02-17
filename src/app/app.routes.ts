import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'EZHub',
    pathMatch: 'full',
    loadComponent: () => import('./components/home/home.component'),
  },

  {
    path: 'publish',
    title: 'EZHub | Publish ',
    loadComponent: () => import('./components/properties/add/add.component'),
  },

  {
    path: 'log-in',
    title: 'EZHub | Log In',
    loadComponent: () => import('./components/account/login/login.component'),
  },

  {
    path: 'sign-up',
    title: 'EZHub | Sign Up',
    loadComponent: () =>
      import('./components/account/register/register.component'),
  },

  {
    path: 'about',
    title: 'EZHub | About',
    loadComponent: () => import('./pages/ezhub/about/about.component'),
  },

  {
    path: 'legal-notice',
    title: 'EZHub | Legal notice',
    loadComponent: () =>
      import('./pages/ezhub/legal-notice/legal-notice.component'),
  },

  {
    path: 'terms-conditions',
    title: 'EZHub | Terms',
    loadComponent: () =>
      import('./pages/ezhub/terms-conditions/terms-conditions.component'),
  },

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
