import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiURL =  environment.apiUrl +'/api/users';

  constructor(private http: HttpClient ) { }
// get ALL
  getAllUsers(){
      return this.http.get<User[]>(this.apiURL); 
  }
// get user
 getUser(id: number) {
    return this.http.get<User>(this.apiURL + '/' + id); 
  }

//create user
  addUser(item: User) {
      return this.http.post<User>(this.apiURL, item); 
  }
 // Update 
  updateUser(item: User) {
    return this.http.put<User>(this.apiURL + '/' + item.id, item);
  }
  // Delete 
  deleteUser(id: number) {
    return this.http.delete(this.apiURL + '/' + id)
  }

}

