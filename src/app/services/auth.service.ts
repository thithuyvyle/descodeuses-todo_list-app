import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl +'/auth/login';
  private apiUrl2 = environment.apiUrl +'auth/signup';

  constructor(private http: HttpClient) { }

  /*login(payload : any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, payload);
  }*/
  login(credentials: any): Observable<any> {
    return this.http.post(this.apiUrl, credentials).pipe(
      tap((response: any) => {
        localStorage.setItem('user', JSON.stringify(response.username));
        localStorage.setItem('token', response.token);
      })
    );
  }

  registerUser(userData: any): Observable<any> {
    return this.http.post(this.apiUrl2, userData, { responseType: 'text' });
  }

 
}