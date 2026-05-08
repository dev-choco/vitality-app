import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap, map } from 'rxjs';
import { LoginRequest, RegisterRequest, LoginResponse, UserInfo } from '../models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  private _currentUser = signal<UserInfo | null>(null);
  readonly currentUser = this._currentUser.asReadonly();

  private readonly ACCESS_KEY = 'vitality_access';
  private readonly REFRESH_KEY = 'vitality_refresh';

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    const access = localStorage.getItem(this.ACCESS_KEY);
    const refresh = localStorage.getItem(this.REFRESH_KEY);
    const user = localStorage.getItem('vitality_user');

    if (access && user) {
      try {
        this._currentUser.set(JSON.parse(user));
      } catch {
        this.logout();
      }
    }
  }

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('auth/login', request).pipe(
      tap((res) => this.handleLoginResponse(res))
    );
  }

  register(request: RegisterRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('auth/register', request).pipe(
      tap((res) => this.handleLoginResponse(res))
    );
  }

  googleLogin(idToken: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('auth/google', { idToken }).pipe(
      tap((res) => this.handleLoginResponse(res))
    );
  }

  refreshToken(): Observable<string> {
    const refreshToken = this.getRefreshToken();
    return this.http.post<LoginResponse>('auth/refresh', { refreshToken }).pipe(
      tap((res) => this.handleLoginResponse(res)),
      map((res) => res.accessToken)
    );
  }

  logout(): void {
    localStorage.removeItem(this.ACCESS_KEY);
    localStorage.removeItem(this.REFRESH_KEY);
    localStorage.removeItem('vitality_user');
    this._currentUser.set(null);
    this.router.navigate(['/auth/login']);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.ACCESS_KEY);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_KEY);
  }

  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }

  private handleLoginResponse(res: LoginResponse): void {
    localStorage.setItem(this.ACCESS_KEY, res.accessToken);
    localStorage.setItem(this.REFRESH_KEY, res.refreshToken);
    localStorage.setItem('vitality_user', JSON.stringify({
      email: res.email,
      name: res.name,
      avatarUrl: '',
    }));
    this._currentUser.set({ email: res.email, name: res.name, avatarUrl: '' });
  }
}
