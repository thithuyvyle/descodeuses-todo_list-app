import { Component, OnInit } from '@angular/core';
import { Todo } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-todo-table',
  standalone: false,
  templateUrl: './todo-table.component.html',
  styleUrl: './todo-table.component.css'
})

export class TodoTableComponent implements OnInit{
  todos: Todo []= [];
  users: User [] = [];
  
constructor ( private todoService: TodoService, private userService: UserService) {
}

  ngOnInit(): void {
    this.fetchTodo();
    this.fetchUsers();
  }

  fetchTodo() {
    this.todoService.getTodos().subscribe((data) => {
      this.todos = data;
    })
  }

  fetchUsers() {
    this.userService.getAllUsers().subscribe((data) => {
      this.users=data;
    })
  }

  getUsernameById(userId: number | null): string {
    return this.users.find(u => u.id === userId)?.username || '';
  }

}


