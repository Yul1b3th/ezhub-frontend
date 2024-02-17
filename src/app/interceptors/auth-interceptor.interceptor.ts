import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // debugger;
  const authToken = localStorage.getItem('auth_token');

  const cloneRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  return next(cloneRequest);
};
