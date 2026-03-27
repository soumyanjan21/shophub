import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginFormData, SignupFormData } from './auth-form.service';
import { API_ROUTES, LOCAL_STORAGE_KEYS } from '../../constants';

export interface User {
  id: string;
  name?: string;
  email: string;
}

export interface AuthResponse {
  accessToken: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  currentUser = signal<User | null>(null);
  token = signal<string | null>(localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN));
  isAuthenticated = signal<boolean>(!!localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN));

  constructor() {}

  login(credentials: LoginFormData): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(API_ROUTES.AUTH_LOGIN, credentials).pipe(
      tap((response) => {
        this.setSession(response.accessToken);
      }),
    );
  }

  register(data: SignupFormData): Observable<void> {
    return this.http.post<void>(API_ROUTES.AUTH_REGISTER, data);
  }

  logout(): void {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.TOKEN);
    this.currentUser.set(null);
    this.isAuthenticated.set(false);
    this.router.navigate(['/']);
  }

  getToken(): string | null {
    return this.token();
  }

  private setSession(token: string): void {
    localStorage.setItem(LOCAL_STORAGE_KEYS.TOKEN, token);
    this.token.set(token);
    this.isAuthenticated.set(true);
  }
}
