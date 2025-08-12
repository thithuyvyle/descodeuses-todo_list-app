import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteTaskDialogComponent } from '../delete-task-dialog/delete-task-dialog.component';


@Component({
  selector: 'app-todo-list',
  standalone: false,
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent implements OnInit {
  formGroup: FormGroup;
  todos: Todo[] = [];
  user: User | null = null;

  constructor(private fb: FormBuilder, private todoService: TodoService, private snackBar: MatSnackBar, private authService: AuthService, private dialog: MatDialog) {
    this.formGroup = this.fb.group({
      title: ["", [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    this.fetchTodo();
  }

  // liste de tous les items
  fetchTodo() {
    this.todoService.getTodos().subscribe((data) => {
      if (!this.user) return;
      // Admin → toutes les tâches
      if (this.user.role === 'ROLE_ADMIN') {
        this.todos = data;
      } else {
        // Utilisateur → ses propres tâches uniquement
        this.todos = data.filter(todo => todo.userConnectedId === this.user!.id);
      }
    })
  }

  //ajouter un item
  onAddTodo() {
    if (this.formGroup.valid && this.user) {
      const formValue = this.formGroup.value;
      const todo: Todo = {
        id: null,
        title: formValue.title,
        completed: false,
        priority: null,
        dueDate: null,
        description: null,
        memberIds: [],
        projectId: null,
        userConnectedId: this.user.id,
      };

      this.todoService.addTodo(todo).subscribe(data => {
        this.fetchTodo();
      });
    }
  }

  // function when click on trash
  onRemoveTodo(todo: Todo) {
    const dialogRef = this.dialog.open(DeleteTaskDialogComponent, {
      data: { todo: todo.title }
    });
    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        if (!todo.id) return;
        this.todoService.deleteTodo(todo.id).subscribe(() => {
          this.fetchTodo();
          this.snackBar.open('Deleted !', "", { duration: 2000 });
        });
      }
    })
  };

  // item updated when checked
  onUpdateTodo(event: MatCheckboxChange, todo: Todo) {
    todo.completed = event.checked;
    this.todoService.updateTodo(todo).subscribe((data) => { 
      this.snackBar.open('Updated!', "", { duration: 2000 });
      this.fetchTodo();
    })
  }

}
