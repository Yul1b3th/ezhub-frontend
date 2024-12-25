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
      {
        path: 'customization',
        title: 'Design system | Customization',
        loadComponent: () =>
          import('./pages/customization/customization.component'),
      },
      {
        path: 'base-styles',
        title: 'Design system | Base Styles',
        loadComponent: () =>
          import('./pages/base-styles/base-styles.component'),
      },
      {
        path: 'layout',
        title: 'Design system | Layout',
        loadComponent: () => import('./pages/layout/layout.component'),
      },
      {
        path: 'themes',
        title: 'Design system | Themes',
        loadComponent: () => import('./pages/themes/themes.component'),
      },
      {
        path: 'utilities',
        title: 'Design system | Utilities',
        loadComponent: () => import('./pages/utilities/utilities.component'),
      },
      {
        path: 'breadcrumb',
        title: 'Design system | Breadcrumb',
        loadComponent: () => import('./pages/breadcrumb/breadcrumb.component'),
      },
      {
        path: 'input',
        title: 'Design system | Input',
        loadComponent: () => import('./pages/input/input.component'),
      },
      {
        path: 'button',
        title: 'Design system | Button',
        loadComponent: () => import('./pages/button/button.component'),
      },
      {
        path: 'modal',
        title: 'Design system | Modal',
        loadComponent: () => import('./pages/modal/modal.component'),
      },
      {
        path: 'spinner',
        title: 'Design system | Spinner',
        loadComponent: () => import('./pages/spinner/spinner.component'),
      },
      {
        path: 'card',
        title: 'Design system | Card',
        loadComponent: () => import('./pages/card/card.component'),
      },
      {
        path: 'dropdown',
        title: 'Design system | Dropdown',
        loadComponent: () => import('./pages/dropdown/dropdown.component'),
      },
      {
        path: 'date-picker',
        title: 'Design system | Date Picker',
        loadComponent: () =>
          import('./pages/date-picker/date-picker.component'),
      },
      {
        path: 'alert',
        title: 'Design system | Alert',
        loadComponent: () => import('./pages/alert/alert.component'),
      },
      {
        path: 'data-table',
        title: 'Design system | Data Table',
        loadComponent: () => import('./pages/data-table/data-table.component'),
      },
      {
        path: 'navbar',
        title: 'Design system | Navbar',
        loadComponent: () => import('./pages/navbar/navbar.component'),
      },
      {
        path: 'search-bar',
        title: 'Design system | Search Bar',
        loadComponent: () => import('./pages/search-bar/search-bar.component'),
      },
      {
        path: 'pagination',
        title: 'Design system | Pagination',
        loadComponent: () => import('./pages/pagination/pagination.component'),
      },
      {
        path: 'slider',
        title: 'Design system | Slider',
        loadComponent: () => import('./pages/slider/slider.component'),
      },
    ],
  },
];

export default routes;
