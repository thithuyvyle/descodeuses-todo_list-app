import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo } from '../models/todo.model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Contact } from '../models/contact.model';
import { Project } from '../models/project.model';


@Injectable({
  providedIn: 'root'
})

export class TodoService {
  private apiURL = environment.apiUrl + '/api/action';
  private apiURL2 = environment.apiUrl + '/api/contact';
  private apiURL3 = environment.apiUrl + '/api/project';


  constructor(private http: HttpClient) { 
  }
  //Create item
  addTodo(item: Todo) {
    return this.http.post<Todo>(this.apiURL, item); 
  }

  //Read : fetch list 
  getTodos() {
    return this.http.get<Todo[]>(this.apiURL); 
  }
  // Read: fetch 1 item de Todo
  getTodo(id: number) {
    return this.http.get<Todo>(this.apiURL + '/' + id); 
  }
  // Update liste
  updateTodo(item: Todo) {
    return this.http.put<Todo>(this.apiURL + '/' + item.id, item);
  }
  // Delete 1 item
  deleteTodo(id: number) {
    return this.http.delete(this.apiURL + '/' + id)
  }

  //get ALL contacts
  getAllContacts() {
    return this.http.get<Contact[]>(this.apiURL2);
  }

  //get projects
  getAllProjects() {
    return this.http.get<Project[]>(this.apiURL3);
  }

  // filtrer par user connected
  getTodosByUser(userId: number): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.apiURL}/user`, { params: { userId } });
  }


}
