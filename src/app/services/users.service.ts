// users.service.ts

import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';

import { Observable, map, tap } from 'rxjs';

import { User } from '../interfaces/user.interface';
import { environment } from '../../environments/environment';

interface State {
  users: User[];
  loading: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly _http = inject(HttpClient);
  private readonly baseUrl: string = environment.baseUrl;

  stateSignal = signal<State>({
    loading: true,
    users: [],
  });

  // Señales computadas
  public users = computed(() => this.stateSignal().users);
  public loading = computed(() => this.stateSignal().loading);

  constructor() {}

  getUsers(): Observable<User[]> {
    return this._http.get<User[]>(`${this.baseUrl}/users`).pipe(
      tap((res) => {
        console.log(res);

        this.stateSignal.set({
          loading: false,
          users: res,
        });
      })
    );
  }

  getUserById(id: string) {
    return this._http.get<User[]>(`${this.baseUrl}/users/${id}`).pipe(
      map((res) => {
        console.log(res);
        return res;
      })
    );
  }

  getUserByEmail(email: string): Observable<User> {
    return this._http.get<User>(`${this.baseUrl}/users?email=${email}`);
  }

  createUser(user: User) {
    return this._http.post<User>(`${this.baseUrl}/users`, user).pipe(
      tap((res) => {
        this.stateSignal.update((state) => ({
          ...state,
          users: [...state.users, res],
        }));
      })
    );
  }

  updateUser(id: string, user: User) {
    return this._http.patch<User>(`${this.baseUrl}/users/${id}`, user).pipe(
      tap((res) => {
        this.stateSignal.update((state) => ({
          ...state,
          users: state.users.map((u) => (u.id === res.id ? res : u)),
        }));
      })
    );
  }

  deleteUser(id: string) {
    return this._http.delete(`${this.baseUrl}/users/${id}`).pipe(
      tap(() => {
        this.stateSignal.update((state) => ({
          ...state,
          users: state.users.filter((u) => u.id !== +id),
        }));
      })
    );
  }
}
