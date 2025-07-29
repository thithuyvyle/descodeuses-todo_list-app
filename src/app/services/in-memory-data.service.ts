import { Injectable } from '@angular/core';
import { Todo } from '../models/todo.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})

// API virtuelle mock 'InMemoryData' : données initialisées à chaque démarrage
export class InMemoryDataService implements InMemoryDataService{ //package in-memory-data installé

  constructor() { }

  createDb() {
    const todos : Todo[] = [
    /*  {id:1, title: 'Learn Angular', completed: false, priority: 1, dueDate: new Date(), description: "learn Angular",memberIds:[] , projectId:null, userConnected: false},
  
    */
      ];
    const users : User[] = [
      /*{id: 123456 ,lastName:'Dupont', firstName:'Marie', genre:'F'},*/
    ];
    return {todos, users}; // lien endpoint api/todos
    
  }
}