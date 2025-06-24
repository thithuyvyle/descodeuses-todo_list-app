import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCheckboxChange } from '@angular/material/checkbox';


@Component({
  selector: 'app-todo-list',
  standalone: false,
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent implements OnInit {
  formGroup: FormGroup;
  todos: Todo[] = [];

  constructor(private fb: FormBuilder, private todoService: TodoService, private snackBar: MatSnackBar) {
    this.formGroup = this.fb.group({
      title: ["", [Validators.required]]  // input obligatoire et relié au todo.title 
    });
  }

  ngOnInit(): void {
    this.fetchTodo();
  }
  // liste de tous les items
  fetchTodo() {
    this.todoService.getTodos().subscribe((data) => {
      this.todos = data;
    })
  }

  //ajouter un item
  onAddTodo() {
    if (this.formGroup.valid) {
      const formValue = this.formGroup.value;
      const todo: Todo = {
        id: null,
        title: formValue.title,
        completed: false,
        priority: null,
        dueDate: null,
        description: null,
      };

      this.todoService.addTodo(todo).subscribe(data => {
        this.fetchTodo(); //actualise liste après ajout
      });
    }
  }

  // function when click on trash
  onRemoveTodo(id: number | null) { // peut etre null car pas créé par nous ms généré par serveur plus tard
    if (id == null) return;

    this.todoService.deleteTodo(id).subscribe(() => {
      this.fetchTodo();
      this.snackBar.open('Deleted !', "", { duration: 2000 }); // open(): méthode de Matsnackbar pour afficher msg
    });
  }
  // item updated when checked
  onUpdateTodo(event: MatCheckboxChange, todo: Todo) {
    todo.completed = event.checked;
    console.log(todo);
    this.todoService.updateTodo(todo).subscribe((data) => { // maj ds  l'API
      this.snackBar.open('Updated!', "", { duration: 2000 });
      this.fetchTodo();
    })
  }
  
}
