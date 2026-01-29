import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

interface User {
  id: string;
  name?: string;
  email: string;
}

interface AuthResponse {
  accessToken: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  currentUser = signal<User | null>(null);
  token = signal<string | null>(localStorage.getItem('token'));
  isAuthenticated = signal<boolean>(!!localStorage.getItem('token'));

  constructor() {}

  login(credentials: any) {
    return this.http.post<AuthResponse>('/api/auth/login', credentials).pipe(
      tap((response) => {
        this.setSession(response.accessToken);
      }),
    );
  }

  register(data: any) {
    return this.http.post<any>('/api/auth/register', data);
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUser.set(null);
    this.isAuthenticated.set(false);
    this.router.navigate(['/']);
  }

  private setSession(token: string) {
    localStorage.setItem('token', token);
    this.token.set(token);
    this.isAuthenticated.set(true);
  }

  getToken() {
    return this.token();
  }
}
