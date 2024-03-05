import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

import { AuthService } from '../../../services/auth.service';
import { AuthStatus } from '../interfaces/auth-status.enum';
import { map } from 'rxjs';

// PublicGuard - PrivateGuard

export const isNotAuthenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  console.log('isNotAuthenticatedGuard');
  console.log(authService.authStatus());

  return authService.checkAuthStatus().pipe(
    map((isAuthenticated) => {
      if (isAuthenticated) {
        router.navigateByUrl('/list');
        console.log('yuli');
        return false;
      }
      console.log('isNotAuthenticatedGuard');
      return true;
    })
  );
};
