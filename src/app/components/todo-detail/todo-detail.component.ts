import { Component, OnInit } from '@angular/core';
import { CheckboxRequiredValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo.model';
import { TodoForm } from '../../models/todo-form';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-todo-detail',
  standalone: false,
  templateUrl: './todo-detail.component.html',
  styleUrl: './todo-detail.component.css'
})

export class TodoDetailComponent implements OnInit {
  todo!: Todo;
  formGroup!: FormGroup;

  listPriority = [
    { priority: 1, value: 1 },
    { priority: 2, value: 2 },
    { priority: 3, value: 3 },
  ]

  constructor(
    private activatedRoute: ActivatedRoute,
    private todoService: TodoService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
  ) { }

  ngOnInit(): void {
    // je récup l'id de mon URL et convertis en nombre pour faire appel au fetch by ID du service CRUD
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    // snapshot: ppté de ActivitedRoute: accès simple/rapide/constant, ne réagit pas aux changements dynamiques

    // appel service pour récup le todo
    this.todoService.getTodo(id).subscribe(data => {
      this.todo = data;

      // initialiser le form avec les valeurs du todo
      this.formGroup = this.fb.group({
        id: [this.todo.id],
        title: [this.todo.title, Validators.required], //1er paramètre "": valeur initiale du champ, 2ème (liste): validators
        priority: [this.todo.priority],
        dueDate: [this.todo.dueDate],
        completed: [this.todo.completed],
        description: [this.todo.description],
      });
      
    });
  }

  //tester si form valide 
  onSubmitTodo() {
    if (this.formGroup.valid) { // paramètre: valeurs du formulaire
      console.log(this.formGroup.value); // vérif si changements bien pris en compte
      this.todoService.updateTodo(this.formGroup.value).subscribe(data => {
        this.snackBar.open('Saved !', "", { duration: 2000 });
        this.router.navigate(['/']); // puis redirige vers page accueil
      })
    }
  }
}

