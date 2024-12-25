import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./design-system.component'),
    children: [
      {
        path: 'introduction',
        title: 'Design system | Introduction',
        loadComponent: () =>
          import('./pages/introduction/introduction.component'),
      },
    ],
  },
];

export default routes;
