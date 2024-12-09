import { CanActivateFn, Router } from '@angular/router';
import { effect, inject } from '@angular/core';

import { AuthService } from '../../../services/auth.service';
import { AuthStatus } from '../interfaces/auth-status.enum';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {
  const url = state.url;
  const authService = inject(AuthService);
  const router = inject(Router);
  //console.log({ status: authService.authStatus() });
  if (authService.authStatus() === AuthStatus.notAuthenticated) {
    //console.log(url);

    //localStorage.setItem('url', url);
    //console.log({ url });
    localStorage.setItem('state-url', url);
  }

  if (authService.authStatus() === AuthStatus.authenticated) {
    return true;
  }

  if (authService.authStatus() === AuthStatus.checking) {
    // Aquí puedes decidir qué hacer cuando el estado de autenticación está "checking"
    return false;
  }

  router.navigateByUrl('/log-in');

  return false;
};
