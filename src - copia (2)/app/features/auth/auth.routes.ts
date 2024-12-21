import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./auth.component'),
    children: [
      {
        path: 'log-in',
        title: 'EZHub | Log In',
        loadComponent: () => import('./login/login.component'),
      },
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
