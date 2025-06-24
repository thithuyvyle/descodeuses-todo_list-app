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
      {id:1, title: 'Learn Angular', completed: false, priority: 1, dueDate: new Date(), description: "learn Angular "},
      {id:2, title: 'Apply Angular', completed: false, priority: 2, dueDate: new Date(), description: "apply angular"},
      {id:3, title: 'Learn CSS ', completed: false, priority: 3, dueDate: new Date(2025, 5, 1), description: "CSS"},
      {id:4, title: 'Learn JavaScript', completed: false, priority: 3, dueDate: new Date(2025, 5, 4), description: "JS"},
    ];
    const users : User[] = [
      {id: 123456 ,lastName:'Dupont', firstName:'Marie', genre:'F'},
    ];
    return {todos, users}; // lien endpoint api/todos
    
  }
}