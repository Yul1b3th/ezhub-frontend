import { Routes } from '@angular/router';

const routes: Routes = [
  // About
  {
    path: 'about',
    title: 'EZHub | About',
    loadComponent: () => import('./about/about.component'),
    // canActivate: [clearStateUrlGuard],
  },
  // Legal notice
  {
    path: 'legal-notice',
    title: 'EZHub | Legal notice',
    loadComponent: () => import('./legal-notice/legal-notice.component'),
    // canActivate: [clearStateUrlGuard],
  },
  // terms-conditions
  {
    path: 'terms-conditions',
    title: 'EZHub | Terms',
    loadComponent: () =>
      import('./terms-conditions/terms-conditions.component'),
    // canActivate: [clearStateUrlGuard],
  },
  // Contact Us
  {
    path: 'contactus',
    title: 'EZHub | Contact',
    loadComponent: () => import('./contact/contact.component'),
    // canActivate: [clearStateUrlGuard],
  },
  {
    path: '**',
    redirectTo: 'about',
  },
];

export default routes;
