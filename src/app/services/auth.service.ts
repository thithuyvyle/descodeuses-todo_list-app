import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl + '/auth/login';
  private apiUrl2 = environment.apiUrl + '/auth/signup';

  constructor(private http: HttpClient) { }

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
        localStorage.setItem('token', response.token);
      })
    );
  }

  registerUser(userData: any): Observable<any> {
    return this.http.post(this.apiUrl2, userData, { responseType: 'text' });
  }

  logout(): void {
    localStorage.removeItem('token');
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

}
