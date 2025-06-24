import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo } from '../models/todo.model';

//le service fait lien entre front et back: fait les opérations CRUD: Create Read Update Delete
@Injectable({
  providedIn: 'root'
})

export class TodoService {
  private apiURL = 'api/todos';

  constructor(private http: HttpClient) { // HttpClient pour communiquer avec le API/Backend
  }  
//Create item
  addTodo(item: Todo){
    // <Todo>: type de retour de l'appel HTTP
    return this.http.post<Todo>(this.apiURL, item); // au serveur : objet de type Todo
  }

 //Read : fetch list 
  getTodos(){
    return this.http.get<Todo[]>(this.apiURL); // GET: pas de 2è paramètre car pas de body, utilisée uniquement pour lire des données.
  }
// Read: fetch 1 item de Todo
  getTodo(id:number){
    return this.http.get<Todo>(this.apiURL + '/' + id); // en précisant id : me donne que info de l'id
  }
// Update liste
  updateTodo(item:Todo) {
     return this.http.put<Todo>(this.apiURL +'/'+ item.id, item); 
  }
 // Delete 1 item
  deleteTodo(id:number){
    return this.http.delete(this.apiURL+'/'+ id)
  } 
}
