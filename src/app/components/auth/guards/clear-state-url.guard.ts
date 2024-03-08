import { CanActivateFn } from '@angular/router';

export const clearStateUrlGuard: CanActivateFn = (route, state) => {
  const url = state.url;

  if (url) {
    localStorage.removeItem('state-url');
  }
  return true;
};
