import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl: string = environment.baseUrl;

  private http = inject(HttpClient);

  login(usernameOrEmail: string, password: string) {
    return this.http
      .post<{ token: string; email: string }>(
        'http://localhost:8000/api/auth/login',
        {
          usernameOrEmail,
          password,
        }
      )
      .pipe(tap(({ token }) => localStorage.setItem('auth_token', token)));
  }

  logout() {
    localStorage.removeItem('auth_token');
  }

  /* getToken() {
    return localStorage.getItem('auth_token');
  } */
}
