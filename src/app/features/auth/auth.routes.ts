import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./auth.component'),
    children: [
      // Log In
      {
        path: 'log-in',
        title: 'EZHub | Log In',
        loadComponent: () => import('./login/login.component'),
      },
      // Sign Up
      {
        path: 'sign-up',
        title: 'EZHub | Sign Up',
        loadComponent: () => import('./register/register.component'),
      },
      {
        path: '**',
        redirectTo: 'log-in',
      },
    ],
  },
];

export default routes;
