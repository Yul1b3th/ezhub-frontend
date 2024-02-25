import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, tap, throwError } from 'rxjs';

import { environment } from '../../environments/environment';
import { User } from '../interfaces/user.interface';
import { LoginResponse } from '../interfaces/login-response.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private readonly baseUrl: string = environment.baseUrl;

  private _currentUser = signal<User | null>(null);

  public user = computed(() => this._currentUser());

  private setAuthentication(user: User, token: string): boolean {
    this._currentUser.set(user);
    console.log(this._currentUser());

    // this._authStatus.set(AuthStatus.authenticated);
    localStorage.setItem('auth_token', token);
    return true;
  }

  login(usernameOrEmail: string, password: string): Observable<boolean> {
    const url = `${this.baseUrl}/auth/login`;
    const body = { usernameOrEmail, password };

    return this.http.post<LoginResponse>(url, body).pipe(
      tap((response) => console.log(response)),
      map(({ user, token }) => this.setAuthentication(user, token)),
      catchError((err) => throwError(() => err.error.message))
    );
  }

  logout() {
    localStorage.removeItem('auth_token');
    this._currentUser.set(null);
    // this._authStatus.set(AuthStatus.notAuthenticated);
  }
}

/* getToken() {
    return localStorage.getItem('auth_token');
  } */

/* login(usernameOrEmail: string, password: string) {
    const url = `${this.baseUrl}/auth/login`;
    const body = { usernameOrEmail, password };
    return this.http
      .post<{ token: string; email: string }>(url, body)
      .pipe(tap(({ token }) => localStorage.setItem('auth_token', token)));
  } */
