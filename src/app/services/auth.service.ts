import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';

import { environment } from '../../environments/environment';
import { User } from '../interfaces/user.interface';
import { LoginResponse } from '../components/auth/interfaces/login-response.interface';
import { AuthStatus } from '../components/auth/interfaces/auth-status.enum';
import { CheckTokenResponse } from '../components/auth/interfaces/check-token.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);

  private _currentUser = signal<User | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());

  constructor() {
    this.checkAuthStatus().subscribe();
  }

  private setAuthentication(user: User, token: string): boolean {
    this._currentUser.set(user);
    //console.log(this._currentUser());
    this._authStatus.set(AuthStatus.authenticated);
    localStorage.setItem('token', token);
    return true;
  }

  login2(usernameOrEmail: string, password: string): Observable<boolean> {
    const url = `${this.baseUrl}/auth/login`;
    const body = { usernameOrEmail, password };

    return this.http.post<LoginResponse>(url, body).pipe(
      //tap((response) => console.log(response)),
      map(({ user, token }) => this.setAuthentication(user, token)),
      catchError((err) => throwError(() => err.error.message))
    );
  }

  login(usernameOrEmail: string, password: string): Observable<boolean> {
    const url = `${this.baseUrl}/auth/login`;
    const body = { usernameOrEmail, password };

    return this.http.post<LoginResponse>(url, body).pipe(
      //tap(({ token }) => console.log('Token:', token)),
      map(({ user, token }) => this.setAuthentication(user, token)),
      catchError((err) => throwError(() => err.error.message))
    );
  }

  checkAuthStatus(): Observable<boolean> {
    const url = `${this.baseUrl}/auth/check-token`;
    const token = localStorage.getItem('token');

    if (!token) {
      this.logout();
      return of(false);
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<CheckTokenResponse>(url, { headers }).pipe(
      //tap((response) => console.log('Response:', response)),
      map(({ user, token }) => {
        localStorage.setItem('token', token);
        return this.setAuthentication(user, token);
      }),
      catchError(() => {
        this._authStatus.set(AuthStatus.notAuthenticated);
        return of(false);
      })
    );
  }

  register(username: string, email: string, password: string) {
    const url = `${this.baseUrl}/auth/register`;
    const body = { username, email, password };
    return this.http.post(url, body);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('url');
    this._currentUser.set(null);
    this._authStatus.set(AuthStatus.notAuthenticated);
  }
}
