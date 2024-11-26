import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

import { AuthService } from '../../../services/auth.service';
import { AuthStatus } from '../interfaces/auth-status.enum';
import { map } from 'rxjs';

// PublicGuard - PrivateGuard

export const isNotAuthenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.checkAuthStatus().pipe(
    map((isAuthenticated) => {
      if (isAuthenticated) {
        const savedUrl = localStorage.getItem('state-url');
        if (savedUrl) {
          // Si hay una URL guardada, redirige al usuario a esa URL
          router.navigateByUrl(savedUrl);
          localStorage.removeItem('state-url'); // Limpiamos la URL guardada
        } else {
          // Si no hay una URL guardada, redirige al usuario a la página de la lista
          router.navigateByUrl('/list');
        }
        return false;
      }
      return true;
    })
  );
};
