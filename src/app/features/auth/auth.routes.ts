import { Routes } from '@angular/router';
import { clearStateUrlGuard, isNotAuthenticatedGuard } from './guards';


export const routes: Routes = [
 // Log In
  {
    path: 'log-in',
    canActivate: [isNotAuthenticatedGuard],
    title: 'EZHub | Log In',
    loadComponent: () => import('./login/login.component'),
  },

  // Sign Up
  {
    path: 'sign-up',
    canActivate: [clearStateUrlGuard, isNotAuthenticatedGuard],
    title: 'EZHub | Sign Up',
    loadComponent: () =>
      import('./register/register.component'),
  },
];

export default routes;
