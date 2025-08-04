import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {

// get liste de tous les utilisateurs
  private apiURL =  environment.apiUrl +'/api/users';

  constructor(private http: HttpClient ) { }

  getAllUsers(){
      return this.http.get<User[]>(this.apiURL); 
    }


}

