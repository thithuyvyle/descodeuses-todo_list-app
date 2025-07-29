import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

// get liste de tous les utilisateurs
  private apiURL = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient ) { }

  getAllUsers(){
      return this.http.get<User[]>(this.apiURL); 
    }


}

