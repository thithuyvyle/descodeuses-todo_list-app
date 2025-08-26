import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl + '/auth/login';
  private apiUrl2 = environment.apiUrl + '/auth/signup';


  private currentUserSubject = new BehaviorSubject<any>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
  }

  login(credentials: any): Observable<any> {
    return this.http.post(this.apiUrl, credentials).pipe(
      tap((response: any) => {

        const token = response.token;
        const decoded: any = jwtDecode(token);
        const user: User = {
          id: decoded.id,
          username: decoded.sub,
          lastName: null,
          firstName: null,
          genre: null,
          role: decoded.role,
        };

        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('authToken', token);
        localStorage.setItem('role', decoded.role);

        this.currentUserSubject.next(user);
      })
    );
  }

  registerUser(userData: any): Observable<any> {
    return this.http.post(this.apiUrl2, userData, { responseType: 'text' });
  }

  logout(): void {

    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    this.currentUserSubject.next(null);
  }

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch (error) {
      console.error('Erreur de parsing du user dans localStorage:', error);
      return null;
    }

  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  loadUserFromStorage() {
    const user = localStorage.getItem('user');
    if (user) {
      this.currentUserSubject.next(JSON.parse(user));
    }
  }

  get isAdmin(): boolean {
    const user = this.getCurrentUser();
    if (!user) return false;

    if (Array.isArray(user.role)) {
      return user.role.includes('ROLE_ADMIN');
    }

    return user.role === 'ROLE_ADMIN';
  }


  checkEmailAvailability(email: string): Observable<boolean> {
    return this.http.get<boolean>(`${environment.apiUrl}/api/users`, { params: { email } });
  }

}
